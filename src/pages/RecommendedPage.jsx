import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRecommendBooks } from "../api/services";
import style from "./RecommendedPage.module.css";
import Filters from "../components/filters/Filters";

function RecommendedPage() {
  const { token } = useSelector((s) => s.auth);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendBooks(token, {
          page: page,
          limit: 10,
        });
        setBooks(data.results);
        setPage(data.page);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchBooks();
    }
  }, [token, page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className={style.rec}>
        <div>
          <Filters />
        </div>
        <div className={style.rec_right}>
          <div className={style.rec_head}>
            <p className={style.rec_tit}>Recommended</p>
            <div className={style.but_div}>
              <button
                onClick={() => setPage((e) => e - 1)}
                disabled={page === 1}
                className={style.left_}
              >
                &lt;
              </button>
              <button
                onClick={() => setPage((e) => e + 1)}
                disabled={page === totalPages}
                className={style.right_}
              >
                &gt;
              </button>
            </div>
          </div>

          <div className={style.card}>
            {books.map((s) => (
              <div className={style.rec_card} key={s._id}>
                <img className={style.img_div} src={s.imageUrl} alt="" />
                <span className={style.title}>{s.title}</span>
                <span className={style.author}>{s.author} </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendedPage;
