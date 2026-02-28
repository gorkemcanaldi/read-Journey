import React from "react";
import style from "./DiaryC.module.css";
import Square from "../../icons/Square";
import Diary_graf from "../../icons/Diary_graf";
import Rubbish_read from "../../icons/Rubbish_read";
import { useSelector } from "react-redux";
import { deleteReadBook } from "../../api/services";
import toast from "react-hot-toast";

function DiaryC({ book, updateBook }) {
  const { token } = useSelector((e) => e.auth);

  const handleDelete = async (readingId) => {
    try {
      await deleteReadBook(token, book._id, readingId);

      const updatedProgress = book.progress.filter((p) => p._id !== readingId);

      updateBook({ ...book, progress: updatedProgress });

      toast.success("Reading deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const groupedByDay = book.progress.reduce((acc, p) => {
    const d = new Date(p.startReading);

    const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(d.getDate()).padStart(2, "0")}`;

    if (!acc[day]) acc[day] = [];
    acc[day].push(p);

    return acc;
  }, {});

  return (
    <div className={style.diary_}>
      <div className={style.line}></div>

      {Object.entries(groupedByDay).map(([day, sessions]) => {
        const totalPages = sessions.reduce(
          (sum, s) => sum + (s.finishPage - s.startPage + 1),
          0,
        );

        return (
          <div key={day} className={style.diary_day}>
            <div className={style.day_square}>
              <div className={style.day_square}>
                <Square />
                <span className={style.date_span}>{day}</span>
              </div>
              <span className={style.page_span__}>{totalPages} pages</span>
            </div>

            {sessions.map((s) => {
              const pagesRead = s.finishPage - s.startPage + 1;

              const totalMinutes = Math.round(
                (new Date(s.finishReading) - new Date(s.startReading)) / 60000,
              );

              const percentage = ((pagesRead / book.totalPages) * 100).toFixed(
                2,
              );

              return (
                <div className={style.diary} key={s._id}>
                  <div className={style.diary_gr}>
                    <div className={style.diary_min}>
                      <span className={style.page_span__}>
                        {totalMinutes} minutes
                      </span>
                      <span className={style.rec_span}>{percentage}%</span>
                    </div>

                    <div className={style.diary_per_div}>
                      <div className={style.diary_per}>
                        <Diary_graf />
                        <p className={style.page_span_}>
                          {s.speed} pages per hour
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(s._id)}
                        className={style.diary_Del}
                      >
                        <Rubbish_read />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default DiaryC;
