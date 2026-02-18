import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { token, refreshToken, loading } = useSelector((s) => s.auth);

  if (loading) {
    return null;
  }

  if (!token || !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
