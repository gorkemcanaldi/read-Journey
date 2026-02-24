import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addBook, getOwnBooks, getRecommendBooks } from "../api/services";
import style from "./RecommendedPage.module.css";
import Filters from "../components/filters/Filters";
import Modal from "../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

function RecommendedPage() {
  const navigate = useNavigate();

  const { token } = useSelector((s) => s.auth);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [libraryIds, setLibraryIds] = useState([]);
  const [addSuccess, setAddSuccess] = useState(false);
  const [formFilters, setFormFilters] = useState({
    title: "",
    author: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    title: "",
    author: "",
  });
  const handleAdd = async () => {
    try {
      const data = await addBook(token, selectedBook._id);
      setAddSuccess(true);
      navigate("/library");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendBooks(token, {
          page: page,
          limit: 10,
          title: appliedFilters.title,
          author: appliedFilters.author,
        });
        setBooks(data.results);
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
  }, [token, page, appliedFilters]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const data = await getOwnBooks(token);

        console.log("FULL LIBRARY DATA:", data);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchLibrary();
    }
  }, [token]);

  if (loading) return;
  if (error) return <p>Error: {error}</p>;
  const isAlreadyAdded = selectedBook && libraryIds.includes(selectedBook._id);

  return (
    <>
      <div className={style.rec}>
        <div>
          <Filters
            currentPage={page}
            formFilters={formFilters}
            setFormFilters={setFormFilters}
            setAppliedFilters={setAppliedFilters}
            setPage={setPage}
          />
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
              <div
                onClick={() => setSelectedBook(s)}
                className={style.rec_card}
                key={s._id}
              >
                <img className={style.img_div} src={s.imageUrl} alt="books" />
                <span className={style.title}>{s.title}</span>
                <span className={style.author}>{s.author} </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedBook && (
        <Modal isOpen={selectedBook} onClose={() => setSelectedBook(null)}>
          {addSuccess ? (
            <div className={style.successWrapper}>
              <div className={style.m_close_div}>
                <button
                  className={style.m_close}
                  onClick={() => setSelectedBook(null)}
                >
                  X
                </button>
              </div>
              <img src="/like-image.png" alt="Added to library" />
              <p>Added to your library!</p>
            </div>
          ) : isAlreadyAdded ? (
            <div className={style.oops_container}>
              <button
                className={style.m_close}
                onClick={() => setSelectedBook(null)}
              >
                X
              </button>
              <img src="/oops-image.png" alt="Oops" />
              <p className={style.already}>
                Oops, this book is already in your library
              </p>
            </div>
          ) : (
            <>
              <div className={style.m_close_div}>
                <button
                  className={style.m_close}
                  onClick={() => setSelectedBook(null)}
                >
                  X
                </button>
              </div>

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

              <button onClick={handleAdd} className={style.lib_nav}>
                Add to library
              </button>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default RecommendedPage;
