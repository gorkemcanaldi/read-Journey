import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice.js";
import Logo from "../../icons/Logo.jsx";
import style from "./Header.module.css";
import { logoutUser } from "../../api/services.js";
import toast from "react-hot-toast";
import BurgerMenu from "../../icons/BurgerMenu.jsx";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, token } = useSelector((e) => e.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  if (loading) return null;
  const firstLetter = user?.name?.[0]?.toUpperCase() || "";
  const fullName = user?.name?.toUpperCase() || "";

  if (location.pathname === "/login" || location.pathname === "/register")
    return null;
  const handleLogout = async () => {
    try {
      await logoutUser(token);
      dispatch(logout());
      toast.success("çıkış yapıldı.");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <header>
      <div className={style.headerr}>
        <div className={style.logo}>
          <Logo />
          <p className={style.head}>READ JOURNEY</p>
        </div>
        <div className={style.nav_div}>
          <NavLink
            to="/recommended"
            className={({ isActive }) =>
              isActive ? `${style.nav_link} ${style.active}` : style.nav_link
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive ? `${style.nav_link} ${style.active}` : style.nav_link
            }
          >
            My library
          </NavLink>
        </div>
        <div className={style.header_right}>
          <div className={style.profile}>{firstLetter}</div>
          <div onClick={() => setMenuOpen(true)} className={style.burger}>
            <BurgerMenu />
          </div>
          <span className={style.name}>{fullName}</span>
          <button onClick={handleLogout} className={style.logout} type="button">
            Log out
          </button>
        </div>
        {window.innerWidth < 768 && (
          <div className={`${style.mobile_menu} ${menuOpen ? style.open : ""}`}>
            <div className={style.mobile_header}>
              <button onClick={() => setMenuOpen(false)}>✕</button>
            </div>

            <NavLink
              to="/recommended"
              className={({ isActive }) =>
                isActive ? `${style.nav_link} ${style.active}` : style.nav_link
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/library"
              className={({ isActive }) =>
                isActive ? `${style.nav_link} ${style.active}` : style.nav_link
              }
            >
              My Library
            </NavLink>

            <button
              className={style.logout}
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
