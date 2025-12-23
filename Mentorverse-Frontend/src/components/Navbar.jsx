import React from "react";
import { FiMoon } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClasses = ({ isActive }) =>
    isActive
      ? 'relative py-2 text-[var(--primary-color)] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[image:var(--gradient-primary)] after:rounded-[50px] transition-all duration-300'
      : 'relative py-2 transition-all duration-300 hover:text-[var(--primary-color)] hover:-translate-y-px after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[image:var(--gradient-primary)] after:rounded-[50px] after:transition-[width] after:duration-300 hover:after:w-full';

  return (
    <nav className="flex justify-between px-24 items-center w-full bg-white fixed top-0 left-0 shadow-[0_2px_10px_rgba(0,0,0,0.05)] z-10">
      
      {/* Logo */}
      <h2 className='text-[1.75rem] font-extrabold cursor-pointer relative bg-(image:--gradient-primary) text-transparent bg-clip-text leading-[200%] transition-all duration-300 hover:scale-[1.03] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2.5px] after:bg-(image:--gradient-primary) after:rounded-[50px] after:transition-[width] after:duration-300 hover:after:w-full'>
        <NavLink to="/">MentorVerse</NavLink>
      </h2>

      {/* Links */}
      <div className="flex justify-between gap-8 h-22 items-center font-semibold text-[15.2px]">

        <NavLink to="/" className={linkClasses}>
          Home
        </NavLink>

        <NavLink to="/login" className={linkClasses}>
          Login
        </NavLink>

        <NavLink to="/learner/register" className={linkClasses}>
          Register
        </NavLink>

        {/* Become a Mentor Button */}
        <Link
          className="px-7 py-3 rounded-3xl text-white text-sm cursor-pointer relative bg-(image:--gradient-primary) bg-size-[200%_200%] animate-[gradient-shift_3s_infinite] transition-all duration-300 overflow-hidden hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-linear-[90deg,transparent,rgba(255,255,255,0.2),transparent] before:transition-[left] before:duration-500 hover:before:left-full"
          to={"/mentor/register"}
        >
          Become a Mentor
        </Link>

        {/* Theme Button */}
        {/* <Link>
          <button className="relative text-xl py-2.5 px-2.5 rounded-xl cursor-pointer bg-[#f1f5f9] border-[1.5px] border-[#e2e8f0] outline-none overflow-hidden hover:rotate-15 hover:text-white transition-all duration-300 hover:scale-105 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-(image:--gradient-primary) before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
            <FiMoon className="relative z-999" />
          </button>
        </Link> */}

      </div>
    </nav>
  );
};

export default Navbar;
