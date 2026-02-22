import React from "react";
import style from "./LibraryPage.module.css";

function LibraryPage() {
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
          <p>Recommended books</p>
        </div>
      </div>
      <div className={style.lib_right}>
        <div>
          <p>My library</p>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;
