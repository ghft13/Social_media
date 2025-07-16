import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import React from "react";

function PrivateRoute({ children, fallback }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || <Navigate to="/Login" />;
  }

  return children;
}

export default PrivateRoute;
