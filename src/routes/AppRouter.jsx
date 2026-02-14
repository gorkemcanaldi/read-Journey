import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecommendedPage from "../pages/RecommendedPage";
import LibraryPage from "../pages/LibraryPage";
import ReadingPage from "../pages/ReadingPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recommended" element={<RecommendedPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/reading" element={<ReadingPage />} />
    </Routes>
  );
}

export default AppRouter;
