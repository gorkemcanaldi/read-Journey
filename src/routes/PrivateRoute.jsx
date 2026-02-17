import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = useSelector((s) => s.auth.token);
  const loading = useSelector((e) => e.auth.loading);

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
