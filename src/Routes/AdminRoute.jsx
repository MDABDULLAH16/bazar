import React from "react";
import useLoggedUser from "../hooks/useLoggedUser";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { loggedUser } = useLoggedUser();

  if (!loggedUser) {
    return <Navigate to="/" replace />;
  }

  if (loggedUser.role === "admin" || loggedUser.role === "super-admin") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
