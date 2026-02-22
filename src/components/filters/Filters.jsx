import React from "react";
import style from "./Filters.module.css";
import Back from "../../icons/Back";
import { useNavigate } from "react-router-dom";
function Filters({ setAppliedFilters, setFormFilters, formFilters, setPage }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedFilters = {
      title: formFilters.title.trim(),
      author: formFilters.author.trim(),
    };
    setPage(1);
    setAppliedFilters(cleanedFilters);
  };

  return (
    <div className={style.filters}>
      <form onSubmit={handleSubmit} className={style.rec_form}>
        <p className={style.fil}>Filters:</p>

        <div className={style.input_group}>
          <label className={style.input_label}>Book title:</label>
          <input
            value={formFilters.title}
            onChange={(e) =>
              setFormFilters((b) => ({
                ...b,
                title: e.target.value,
              }))
            }
            className={style.form_input}
            placeholder="Enter text"
            type="text"
          />
        </div>
        <div className={style.input_group}>
          <label className={style.input_label}>The author:</label>
          <input
            value={formFilters.author}
            onChange={(e) =>
              setFormFilters((b) => ({
                ...b,
                author: e.target.value,
              }))
            }
            className={style.form_input_}
            placeholder="Enter text"
            type="text"
          />
        </div>
        <button className={style.form_button} type="submit">
          To apply
        </button>
      </form>

      <div className={style.start_div}>
        <h3 className={style.start_h3}>Start your workout</h3>
        <div className={style.div_ru_text}>
          <div className={style.div_ru}>1</div>
          <p>
            Create a personal library:
            <span>add the books you intend to read to it</span>
          </p>
        </div>
        <div className={style.div_ru_text}>
          <div className={style.div_ru}>2</div>
          <p>
            Create your first workout:
            <span>define a goal, choose a period, start training.</span>
          </p>
        </div>
        <div
          onClick={() => navigate("/library")}
          className={style.lib_navigate_div}
        >
          <button className={style.mylib_button}>My Library</button>
          <Back />
        </div>
      </div>
      <div className={style.books_div}>
        <img className={style.books} src="/books.png" alt="books" />
        <p className={style.b_text}>
          "Books are<span className={style.b_span}> windows </span>to the world,
          and reading is a journey into the unknown."
        </p>
      </div>
    </div>
  );
}

export default Filters;
