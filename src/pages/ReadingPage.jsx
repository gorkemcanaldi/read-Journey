import React, { useEffect, useState } from "react";
import style from "./ReadingPage.module.css";
import Diary from "../icons/Diary";
import Statistics from "../icons/Statistics";
import {
  finishReadingBook,
  getBookId,
  startReadingBook,
} from "../api/services";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import RecStart from "../icons/recStart";
import RecStop from "../icons/recStop";
import DiaryC from "../components/Diary/DiaryC";
import Static from "../components/Static/Static";
import Modal from "../components/Modal/Modal";

function ReadingPage() {
  const { token } = useSelector((e) => e.auth);
  const [book, setBook] = useState(null);
  const [startPage, setStartPage] = useState("");
  const [stopPage, setStopPage] = useState("");
  const [activeComponent, setActiveComponent] = useState("Diary");
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const bookId = location.state?.bookId;

  const updateBook = (updatedBook) => setBook(updatedBook);

  const renderComponent = () => {
    if (!book) return null;
    if (book.progress.length === 0) return null;
    if (activeComponent === "Diary")
      return <DiaryC book={book} updateBook={updateBook} />;
    if (activeComponent === "Static") return <Static book={book} />;
  };

  useEffect(() => {
    if (!book || showModal) return;
    if (hasShownModal) return;
    const totalReadPages = book.progress.reduce(
      (sum, p) => sum + (p.finishPage - p.startPage + 1),
      0,
    );

    if (totalReadPages >= book.totalPages) {
      const timer = setTimeout(() => {
        setShowModal(true);
        setHasShownModal(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [book, showModal]);

  useEffect(() => {
    if (!bookId) {
      toast.error("choose a book from the library");
      navigate("/library");
    }
  }, [bookId, navigate]);

  const handleStart = async (e) => {
    e.preventDefault();
    if (!startPage) return toast.error("Enter start page");
    try {
      await startReadingBook(token, bookId, Number(startPage));
      const updatedBook = await getBookId(token, bookId);
      setBook(updatedBook);
      setStopPage("");
      toast.success("Reading started");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleStop = async (e) => {
    e.preventDefault();
    const stop = Number(stopPage);
    const start = Number(startPage);
    if (!stopPage) return toast.error("Enter stop page");
    if (stop > book.totalPages)
      return toast.error("Stop page can't exceed total pages");
    if (stop < start)
      return toast.error("Stop page can't be less than start page");

    try {
      await finishReadingBook(token, bookId, stop);
      const updatedBook = await getBookId(token, bookId);
      setBook(updatedBook);
      setStartPage("");
      setStopPage("");
      toast.success("Reading stopped");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (!bookId) return;
    const fetchBook = async () => {
      try {
        const data = await getBookId(token, bookId);
        setBook(data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchBook();
  }, [token, bookId]);

  const activeProgress = book?.progress?.find((p) => p.status === "active");

  return (
    <div className={style.reading}>
      <div className={style.left_reading}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            activeProgress ? handleStop(e) : handleStart(e);
          }}
        >
          {!activeProgress && (
            <div className={style.read_div}>
              <span className={style.start_pag_span}>Start page:</span>
              <div className={style.input_group}>
                <label className={style.input_label}>Page number:</label>
                <input
                  value={startPage}
                  onChange={(e) => setStartPage(e.target.value)}
                  className={style.form_input}
                  type="number"
                  placeholder="0"
                />
              </div>
              <button className={style.form_button} type="submit">
                To start
              </button>
            </div>
          )}

          {activeProgress && (
            <div className={style.read_div}>
              <span className={style.start_pag_span}>Stop page:</span>
              <div className={style.input_group}>
                <label className={style.input_label}>Page number:</label>
                <input
                  value={stopPage}
                  min={activeProgress.startPage}
                  max={book.totalPages}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val < activeProgress.startPage)
                      val = activeProgress.startPage;
                    if (val > book.totalPages) val = book.totalPages;
                    setStopPage(val);
                  }}
                  className={style.form_input}
                  type="number"
                  placeholder="0"
                />
              </div>
              <button className={style.form_button} type="submit">
                To stop
              </button>
            </div>
          )}
        </form>

        {book?.progress?.length > 0 ? (
          <div>
            <div className={style.diarty_static}>
              <div>
                <span className={style.reading_head}>{activeComponent}</span>
              </div>
              <div className={style.di_st_div}>
                <button
                  className={style.diary_button}
                  onClick={() => setActiveComponent("Diary")}
                >
                  <Diary />
                </button>
                <button
                  className={style.static_button}
                  onClick={() => setActiveComponent("Static")}
                >
                  <Statistics />
                </button>
              </div>
            </div>
            <div>{renderComponent()}</div>
          </div>
        ) : (
          <div className={style.no_prog_div}>
            <h3 className={style.reading_h3}>Progress</h3>
            <span className={style.reading_span}>
              Here you will see when and how much you read. To record, click on
              the red button above.
            </span>
            <div>
              <img className={style.star} src="/star.png" alt="star" />
            </div>
          </div>
        )}
      </div>

      {book && (
        <div className={style.right_reading}>
          <p className={style.read_head}>My reading</p>
          <img className={style.img_} src={book.imageUrl} alt="book" />
          <span className={style.rec_right_span}>{book.title}</span>
          <span className={style.rec_right_span_}>{book.author}</span>
          {!activeProgress && <RecStart />}
          {activeProgress && <RecStop />}
        </div>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        variant="book"
      >
        <>
          <div className={style.book_modal}>
            <button
              className={style.m_close_book}
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <div className={style.book_div}>
              <img src="/books.png" className={style.b} />
              <div className={style.book_}>
                <p className={style.book_p}>The book is read</p>
                <span className={style.book_span}>
                  <span className={style.book_spann}> exciting journey</span>,
                  where each page revealed new horizons, and the characters
                  became inseparable friends.
                </span>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
}

export default ReadingPage;
