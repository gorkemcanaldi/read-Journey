import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecommendedPage from "../pages/RecommendedPage";
import LibraryPage from "../pages/LibraryPage";
import ReadingPage from "../pages/ReadingPage";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/Header/Header";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/recommended" element={<RecommendedPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/reading" element={<ReadingPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
