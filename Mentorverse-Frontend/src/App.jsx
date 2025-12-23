import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import MentorNavbar from "./components/mentorComponents/MentorNavbar";
import LearnerNavbar from "./components/learnerComponents/LearnerNavbar";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useAuth();

  const renderNavbar = () => {
    if (!user) return <Navbar />; // guest
    if (user.role.toLowerCase() === "mentor") return <MentorNavbar />;
    if (user.role.toLowerCase() === "learner") return <LearnerNavbar />;
    return <Navbar />; // fallback
  };

  return (
    <>
      {renderNavbar()}
      <Outlet />
    </>
  );
};

export default App;
