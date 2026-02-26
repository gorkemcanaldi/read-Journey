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
import DiaryC from "../components/DiaryC";
import Static from "../components/Static";

function ReadingPage() {
  const { token } = useSelector((e) => e.auth);
  const [book, setBook] = useState(null);
  const [startPage, setStartPage] = useState("");
  const [stopPage, setStopPage] = useState("");
  const [readingStarted, setReadingStarted] = useState(false);
  const [readingFinish, setReadingFinish] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Diary");
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state?.bookId;

  const renderComponent = () => {
    if (activeComponent === "Diary") {
      return <DiaryC book={book} />;
    } else if (activeComponent === "Static") {
      return <Static book={book} />;
    }
  };

  useEffect(() => {
    if (!bookId) {
      toast.error("choose a book from the library");
      navigate("/library");
    }
  }, [bookId, navigate]);

  const handleStart = async (e) => {
    e.preventDefault();
    if (!startPage) {
      toast.error("Enter start page");
      return;
    }
    try {
      await startReadingBook(token, bookId, Number(startPage));
      setReadingStarted(true);

      toast.success("Reading started");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStop = async (e) => {
    e.preventDefault();
    if (!stopPage) {
      toast.error("Enter stop page");
      return;
    }

    try {
      await finishReadingBook(token, bookId, Number(stopPage));
      const updatedBook = await getBookId(token, bookId);
      setBook(updatedBook);
      setReadingStarted(false);
      setStartPage("");
      setStopPage("");
      setReadingFinish(true);

      toast.success("reading stopped");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      try {
        const data = await getBookId(token, bookId);
        setBook(data);
        const activeProgress = data.progress.find((p) => p.status === "active");
        if (activeProgress) {
          setReadingStarted(true);
          setStartPage(activeProgress.startPage);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchBook();
  }, [token, bookId]);

  return (
    <div className={style.reading}>
      <div className={style.left_reading}>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!readingStarted) handleStart(e);
              else if (readingStarted) handleStop(e);
            }}
          >
            {!readingStarted && (
              <div>
                <span className={style.start_pag_span}>Start page:</span>
                <div className={style.input_group}>
                  <label className={style.input_label}>Page number:</label>
                  <input
                    value={startPage}
                    className={style.form_input}
                    onChange={(e) => setStartPage(e.target.value)}
                    type="number"
                    placeholder="0"
                  />
                </div>
                <button className={style.form_button} type="submit">
                  To start
                </button>
              </div>
            )}
            {readingStarted && !readingFinish && (
              <div>
                <span className={style.start_pag_span}>Stop page:</span>

                <div className={style.input_group}>
                  <label className={style.input_label}>Page number:</label>
                  <input
                    value={stopPage}
                    onChange={(e) => setStopPage(e.target.value)}
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
        </div>

        {book?.progress?.length > 0 ? (
          <div>
            <div className={style.diarty_static}>
              <div>
                <span className={style.reading_head}>{activeComponent}</span>
              </div>

              <div>
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
          {!readingStarted && <RecStart />}
          {readingStarted && <RecStop />}
        </div>
      )}
    </div>
  );
}

export default ReadingPage;
