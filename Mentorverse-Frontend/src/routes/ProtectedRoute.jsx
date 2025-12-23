import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { user, token, loading } = useAuth();

  // Still loading auth state, don't redirect yet
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  // Not logged in
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access
  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // render child routes
};

export default ProtectedRoute;
