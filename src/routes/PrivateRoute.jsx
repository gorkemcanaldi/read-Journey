import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ childeren }) {
  const token = useSelector((s) => s.auth.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return childeren;
}

export default PrivateRoute;
