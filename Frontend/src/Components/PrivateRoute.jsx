import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import React from "react";

function PrivateRoute({ children, fallback }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return fallback || <Navigate to="/Login" />;
  }

  return children;
}

export default PrivateRoute;
