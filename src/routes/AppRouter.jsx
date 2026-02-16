import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecommendedPage from "../pages/RecommendedPage";
import LibraryPage from "../pages/LibraryPage";
import ReadingPage from "../pages/ReadingPage";
import PrivateRoute from "./PrivateRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/recommended"
        element={
          <PrivateRoute>
            <RecommendedPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/library"
        element={
          <PrivateRoute>
            <LibraryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/reading"
        element={
          <PrivateRoute>
            <ReadingPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
