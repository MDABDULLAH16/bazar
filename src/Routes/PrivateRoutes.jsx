import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // If no user, redirect to login with current path saved
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user exists, show the page
  return children;
};

export default PrivateRoute;
