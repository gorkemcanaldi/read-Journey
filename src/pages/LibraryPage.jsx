import React, { useEffect, useState } from "react";
import style from "./LibraryPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addNewBook,
  getOwnBooks,
  getRecommendBooks,
  removeBook,
} from "../api/services";
import { useSelector } from "react-redux";
import Back from "../icons/Back";
import Rubbish from "../icons/Rubbish";
import Modal from "../components/Modal/Modal";
import toast from "react-hot-toast";
import Select from "../icons/Select";
import Select_ from "../icons/Select_";

function LibraryPage() {
  const { token } = useSelector((s) => s.auth);
  const location = useLocation();
  const currentPage = location.state?.currentPage || 1;
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState("allBooks");
  const [isOpens, setIsOpens] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    totalPages: "",
  });

  const filteredBooks = filter
    ? myBooks.filter((book) => {
        switch (filter) {
          case "unread":
            return book.status === "unread";
          case "in-progress":
            return book.status === "in-progress";
          case "done":
            return book.status === "done";
          default:
            return true;
        }
      })
    : myBooks;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendBooks(token, {
          page: currentPage,
          limit: 3,
        });
        setBooks(data.results);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (token) {
      fetchBooks();
    }
  }, [token, currentPage]);

  useEffect(() => {
    const libBooks = async () => {
      try {
        const data = await getOwnBooks(token);
        setMyBooks(data.results || data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (token) {
      libBooks();
    }
  }, [token]);

  const handleRemove = async (id) => {
    try {
      const data = await removeBook(token, id);
      setMyBooks((d) => d.filter((b) => b._id !== data.id));
      toast.success("You deleted book");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (location.state?.justAdded) {
      Promise.resolve().then(() => setShowSuccess(true));

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleNewBooks = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      totalPages: Number(formData.totalPages),
    };

    try {
      const newBook = await addNewBook(token, payload);
      setMyBooks((n) => [...n, newBook.book || newBook]);
      setFormData({
        title: "",
        author: "",
        totalPages: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={style.lib}>
      <div className={style.filters}>
        <form onSubmit={handleNewBooks} className={style.lib_form}>
          <p className={style.fil}>Create your library:</p>

          <div className={style.input_group}>
            <label className={style.input_label}>Book title:</label>
            <input
              className={style.form_input}
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
              placeholder="Enter text"
              type="text"
            />
          </div>
          <div className={style.input_group}>
            <label className={style.input_label}>The author:</label>
            <input
              className={style.form_input_}
              value={formData.author}
              required
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              placeholder="Enter text"
              type="text"
            />
          </div>
          <div className={style.input_group}>
            <label className={style.input_label}>Number of pages:</label>
            <input
              className={style.form_input__}
              required
              value={formData.totalPages}
              placeholder=" 664"
              onChange={(e) =>
                setFormData({ ...formData, totalPages: e.target.value })
              }
              type="text"
            />
          </div>
          <button className={style.form_button} type="submit">
            Add book
          </button>
        </form>

        <div className={style.rec_bookss}>
          <p className={style.lib_head_Re}>Recommended books</p>
          <div className={style.libbbb}>
            {books.map((book) => (
              <div className={style.rec_card_lib} key={book._id}>
                <img
                  className={style.img_div_lib}
                  src={book.imageUrl}
                  alt="books"
                />
                <span className={style.title_lib}>{book.title}</span>
                <span className={style.author_lib}>{book.author} </span>
              </div>
            ))}
          </div>
          <div
            onClick={() =>
              navigate("/recommended", {
                state: { currentPage },
              })
            }
            className={style.lib_navigate_div}
          >
            <button className={style.mylib_button}>Home</button>
            <Back />
          </div>
        </div>
      </div>
      <div className={style.lib_right}>
        <div className={style.lib_filter}>
          <p className={style.rec_tit}>My library</p>
          <select
            value={filter}
            onClick={() => setIsOpens(!isOpens)}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All books</option>
            <option value="unread">Unread</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
          <span className={style.custom_arrow}>
            {isOpens ? <Select /> : <Select_ />}
          </span>
        </div>

        <div className={style.card}>
          {filteredBooks.length === 0 ? (
            <div className={style.book_div}>
              <img className={style.book_img} src="/book.png" alt="books" />
              <span className={style.lib_books_span}>
                To start training, add
                <span className={style.lib_books_spann}>
                  some of your books
                </span>
                or from the recommended ones
              </span>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                onClick={() => setSelectedBook(book)}
                className={style.rec_card}
              >
                <img
                  className={style.img_div}
                  src={book.imageUrl}
                  alt={book.title}
                />
                <div className={style.mylib_del}>
                  <div className={style.span_div}>
                    <span className={style.title}>{book.title}</span>
                    <span className={style.author}>{book.author}</span>
                  </div>
                  <div
                    className={style.rub_div}
                    onClick={(e) => {
                      handleRemove(book._id);
                      e.stopPropagation();
                    }}
                  >
                    <Rubbish />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showSuccess && (
        <Modal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          variant="success"
        >
          <div className={style.like_modal}>
            <button
              className={style.m_close_like}
              onClick={() => setShowSuccess(false)}
            >
              X
            </button>
            <div className={style.like_div}>
              <img src="/like.png" className={style.like} />
              <div className={style.like_}>
                <p className={style.like_p}>Good job</p>
                <span className={style.like_span}>
                  Your book is now in
                  <span className={style.like_spann}> the library!</span> The
                  joy knows no bounds and now you can start your training
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {selectedBook && (
        <Modal isOpen={!!selectedBook} onClose={() => setSelectedBook(null)}>
          <div className={style.m_close_div}>
            <button
              className={style.m_close}
              onClick={() => setSelectedBook(null)}
            >
              X
            </button>
          </div>
          <div className={style.rec_divv}>
            <img
              className={style.img_div_m}
              src={selectedBook.imageUrl}
              alt={selectedBook.title}
            />

            <div className={style.des_div}>
              <span className={style.m_title}>{selectedBook.title}</span>
              <span className={style.m_author}>{selectedBook.author}</span>
              <span className={style.m_totalPages}>
                {selectedBook.totalPages} pages
              </span>
            </div>

            <button
              onClick={() => {
                navigate("/reading", { state: { bookId: selectedBook._id } });
              }}
              className={style.lib_nav}
            >
              Start reading
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default LibraryPage;
