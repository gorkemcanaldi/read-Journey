import "./App.css";
import Header from "./components/Header/Header";
import AppRouter from "./routes/AppRouter";
import RecommendedPage from "./pages/RecommendedPage";
import { useEffect } from "react";
import { getCurrentUser, refreshUserToken } from "./api/services";
import { useDispatch } from "react-redux";
import { setCredentials, setLoading } from "./redux/authSlice";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      dispatch(setLoading(true));
      const token = localStorage.getItem("token") || null;
      const refreshToken = localStorage.getItem("refreshToken") || null;
      if (!token) {
        dispatch(setLoading(true));
        return;
      }
      try {
        const user = await getCurrentUser(token);
        dispatch(setCredentials(user));
      } catch {
        try {
          const newTokens = await refreshUserToken(refreshToken);
          localStorage.setItem("token", newTokens.token);
          localStorage.setItem("refreshToken", newTokens.refreshToken);
          const user = await getCurrentUser(newTokens.token);
          dispatch(setCredentials(user));
        } catch {
          localStorage.clear();
        }
      } finally {
        dispatch(setLoading(false));
      }
    };
    initAuth();
  }, []);

  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
}

export default App;
