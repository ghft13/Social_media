import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import React from "react";

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // 👈 Wait while checking auth
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
