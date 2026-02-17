import "./App.css";
import Header from "./components/Header/Header";
import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useDispatch } from "react-redux";
import { setUser, logout, setLoading } from "./redux/authSlice";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("AUTH USER:", user);
      console.log("DISPLAY NAME:", user?.displayName);
      if (user) {
        const token = await user.getIdToken();

        dispatch(
          setUser({
            user: {
              name: user.displayName,
              email: user.email,
            },
            token,
          }),
        );
      } else {
        dispatch(logout());
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
}

export default App;
