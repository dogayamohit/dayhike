import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Not logged in → go to sign-in
  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // Logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;
