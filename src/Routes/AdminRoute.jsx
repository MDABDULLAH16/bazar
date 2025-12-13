import { Navigate } from "react-router";
import useLoggedUser from "../hooks/useLoggedUser";

const AdminRoute = ({ children }) => {
  const { loggedUser, loading } = useLoggedUser();

  if (loading) return null; // or spinner

  if (loggedUser?.role === "admin" || loggedUser?.role === "super-admin") {
    return children;
  }

  return <Navigate to="/" replace />;
};
export default AdminRoute;