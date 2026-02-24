import React, { useEffect, useState } from "react";
import style from "./LibraryPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getOwnBooks, getRecommendBooks } from "../api/services";
import { useSelector } from "react-redux";
import Back from "../icons/Back";
import Rubbish from "../icons/rubbish";

function LibraryPage() {
  const { token } = useSelector((s) => s.auth);
  const location = useLocation();
  const currentPage = location.state?.currentPage || 1;
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendBooks(token, {
          page: currentPage,
          limit: 3,
        });
        setBooks(data.results);
      } catch (error) {
        console.log(error);
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
        console.log(error);
      }
    };
    if (token) {
      libBooks();
    }
  }, [token]);

  return (
    <div className={style.lib}>
      <div className={style.filters}>
        <form className={style.lib_form}>
          <p className={style.fil}>Create your library:</p>

          <div className={style.input_group}>
            <label className={style.input_label}>Book title:</label>
            <input
              className={style.form_input}
              required
              placeholder="Enter text"
              type="text"
            />
          </div>
          <div className={style.input_group}>
            <label className={style.input_label}>The author:</label>
            <input
              className={style.form_input_}
              required
              placeholder="Enter text"
              type="text"
            />
          </div>
          <div className={style.input_group}>
            <label className={style.input_label}>Number of pages:</label>
            <input
              className={style.form_input__}
              required
              placeholder=" 664"
              type="text"
            />
          </div>
          <button className={style.form_button} type="submit">
            Add book
          </button>
        </form>

        <div>
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
          <input type="option" />
        </div>

        <div className={style.card}>
          {myBooks.length === 0 ? (
            <div>
              <img src="/books.png" alt="books" />
            </div>
          ) : (
            myBooks.map((book) => (
              <div key={book._id} className={style.rec_card}>
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
                  <div className={style.rub_div}>
                    <Rubbish />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;
