import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const CreateCourseButton = () => {
  return (
    <Link to={"/mentor/course/create"} className="mt-5 h-full px-8 py-4 rounded-xl bg-linear-(--gradient-secondary) text-white font-semibold cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_rgba(0,0,0,0.15)] transition-all duration-300">
      <FiPlus className="font-extrabold" /> Create New Course
    </Link>
  );
};

export default CreateCourseButton;
