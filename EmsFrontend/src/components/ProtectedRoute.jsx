import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../services/authService";

function ProtectedRoute({ requireAdmin = false }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
