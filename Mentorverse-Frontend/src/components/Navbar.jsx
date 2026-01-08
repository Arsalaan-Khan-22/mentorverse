import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    isActive
      ? 'relative py-2 text-[var(--primary-color)] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[image:var(--gradient-primary)] after:rounded-[50px] transition-all duration-300'
      : 'relative py-2 transition-all duration-300 hover:text-[var(--primary-color)] hover:-translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[image:var(--gradient-primary)] after:rounded-[50px] after:transition-[width] after:duration-300 hover:after:w-full';

  return (
    <nav className="flex justify-between px-6 lg:px-24 md:px-12 items-center w-full bg-white fixed top-0 left-0 shadow-[0_2px_10px_rgba(0,0,0,0.05)] z-20">
      
      <h2 className="text-[1.75rem] font-extrabold cursor-pointer relative bg-(image:--gradient-primary) text-transparent bg-clip-text leading-[200%] transition-all duration-300 hover:scale-[1.03]">
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
          <NavLink to="/" className={linkClasses} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/login" className={linkClasses} onClick={() => setIsOpen(false)}>
            Login
          </NavLink>

          <NavLink to="/learner/register" className={linkClasses} onClick={() => setIsOpen(false)}>
            Register
          </NavLink>

          <Link
            className="px-7 py-3 rounded-3xl text-white text-sm cursor-pointer relative bg-(image:--gradient-primary) bg-size-[200%_200%] animate-[gradient-shift_3s_infinite] transition-all duration-300 overflow-hidden hover:-translate-y-0.5"
            to={"/mentor/register"}
            onClick={() => setIsOpen(false)}
          >
            Become a Mentor
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;