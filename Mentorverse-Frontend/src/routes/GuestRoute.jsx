// src/routes/GuestRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = () => {
  const { user, loading } = useAuth();

  // Still loading auth state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is logged in, redirect to dashboard based on role
  if (user) {
    if (user.role.toLowerCase() === "mentor") return <Navigate to="/mentor/dashboard" replace />;
    if (user.role.toLowerCase() === "learner") return <Navigate to="/learner/dashboard" replace />;
    return <Navigate to="/" replace />; // fallback
  }

  // Otherwise, render children (login/register)
  return <Outlet />;
};

export default GuestRoute;
