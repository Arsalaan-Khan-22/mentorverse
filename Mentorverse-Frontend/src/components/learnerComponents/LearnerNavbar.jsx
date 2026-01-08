import React, { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const LearnerNavbar = () => {
  const { user } = useAuth();
  const learnerId = user?.id;
  const [profilePic, setProfilePic] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fetchProfileInfo = async () => {
    const res = await api.get(`/learners/profile/${learnerId}`);
    setProfilePic(res.data.data.profilePic);
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  return (
    <nav className="flex justify-between px-6 lg:px-24 md:px-12 items-center w-full bg-white fixed top-0 left-0 shadow-[0_2px_10px_rgba(0,0,0,0.05)] z-1">
      <h2 className='text-[1.75rem] font-extrabold cursor-pointer relative bg-(image:--gradient-primary) text-transparent bg-clip-text leading-[200%] transition-all duration-300 hover:scale-[1.03] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2.5px] after:bg-(image:--gradient-primary) after:rounded-[50px] after:transition-[width] after:duration-300 hover:after:w-full'>
        <NavLink to="/">MentorVerse</NavLink>
      </h2>

      <button
        className="lg:hidden text-2xl focus:outline-none z-30 h-22"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`flex-col lg:flex lg:flex-row lg:gap-8 lg:items-center font-semibold text-[15.2px] fixed lg:static bg-white lg:bg-transparent top-0 right-0 h-full lg:h-22 w-3/4 lg:w-auto shadow-md lg:shadow-none transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-20 lg:mt-0 px-6 lg:px-0">
          <NavLink
            to={"/learner/dashboard"}
            className={({ isActive }) =>
              isActive
                ? 'relative py-2 text-(--primary-color) -translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-(image:--gradient-primary) after:rounded-[50px]'
                : 'relative py-2 transition-all duration-300 hover:text-(--primary-color) hover:-translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-(image:--gradient-primary) after:rounded-[50px] after:transition-[width] after:duration-300 hover:after:w-full'
            }
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/learner/mentors"}
            className={({ isActive }) =>
              isActive
                ? 'relative py-2 text-(--primary-color) -translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-(image:--gradient-primary) after:rounded-[50px]'
                : 'relative py-2 transition-all duration-300 hover:text-(--primary-color) hover:-translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-(image:--gradient-primary) after:rounded-[50px] after:transition-[width] after:duration-300 hover:after:w-full'
            }
            onClick={() => setIsOpen(false)}
          >
            Mentors
          </NavLink>
          <NavLink
            to={"/learner/courses"}
            className={({ isActive }) =>
              isActive
                ? 'relative py-2 text-(--primary-color) -translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-(image:--gradient-primary) after:rounded-[50px]'
                : 'relative py-2 transition-all duration-300 hover:text-(--primary-color) hover:-translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-(image:--gradient-primary) after:rounded-[50px] after:transition-[width] after:duration-300 hover:after:w-full'
            }
            onClick={() => setIsOpen(false)}
          >
            Courses
          </NavLink>
          <NavLink
            to={"/learner/bookings"}
            className={({ isActive }) =>
              isActive
                ? 'relative py-2 text-(--primary-color) -translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-(image:--gradient-primary) after:rounded-[50px]'
                : 'relative py-2 transition-all duration-300 hover:text-(--primary-color) hover:-translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-(image:--gradient-primary) after:rounded-[50px] after:transition-[width] after:duration-300 hover:after:w-full'
            }
            onClick={() => setIsOpen(false)}
          >
            My Bookings
          </NavLink>
          <NavLink
            to={"/learner/my-courses"}
            className={({ isActive }) =>
              isActive
                ? 'relative py-2 text-(--primary-color) -translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-(image:--gradient-primary) after:rounded-[50px]'
                : 'relative py-2 transition-all duration-300 hover:text-(--primary-color) hover:-translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-(image:--gradient-primary) after:rounded-[50px] after:transition-[width] after:duration-300 hover:after:w-full'
            }
            onClick={() => setIsOpen(false)}
          >
            My Courses
          </NavLink>
          {/* <a href="/">
              <button className="relative text-xl py-2.5 px-2.5 rounded-xl cursor-pointer bg-[#f1f5f9] border-[1.5px] border-[#e2e8f0] outline-none overflow-hidden hover:rotate-15 hover:text-white transition-all duration-300 hover:scale-105 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-(image:--gradient-primary) before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
                <FiMoon className="relative z-999"/>
              </button>
            </a> */}
          <Link to={"/learner/profile"} onClick={() => setIsOpen(false)}>
            <img
              className="w-12 h-12 border-3 border-(--primary-color) rounded-full cursor-pointer hover:scale-110 hover:shadow-xl transition-all duration-300"
              src={
                profilePic ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
              }
              alt="profile photo"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LearnerNavbar;
