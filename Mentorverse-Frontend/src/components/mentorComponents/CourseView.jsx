import React from "react";
import { FiClock, FiEdit, FiStar, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

const CourseView = ({ courseData }) => {
  return (
    <div className="mt-6 flex bg-white shadow-(--shadow-primary) items-center py-10 px-5 rounded-2xl">
      <div style={{backgroundImage: `url(${courseData.course.thumbnail})`}} className="w-full h-[383px] rounded-2xl bg-cover bg-top"></div>
      <div className="px-10 flex flex-col gap-5">
        <span className="w-fit bg-(--primary-color) text-white px-4 py-[0.6rem] rounded-full text-sm font-semibold">
          {courseData.course.category.name}
        </span>
        <h2 className="text-4xl font-bold tracking-wide leading-12">
          {courseData.course.title}
        </h2>
        <p className="text-gray-600 text-lg">{courseData.course.description}</p>
        <div className="flex text-gray-600 items-center gap-7 my-3">
          <span className="flex items-center gap-2">
            <FiStar className="text-yellow-400" /> {courseData.rating.toFixed(2)} (
            {courseData.totalRatingCount} review)
          </span>
          <span className="flex items-center gap-2">
            <FiUsers /> {courseData.totalStudents}{" "}
            {courseData.totalStudents < 2 ? "student" : "students"}
          </span>
          <span className="flex items-center gap-2">
            <FiClock /> {courseData.totalHours} hours
          </span>
        </div>
        {/* <Link to={`/mentor/course/update/${courseData.course.id}`} className="flex items-center gap-2 bg-linear-(--gradient-secondary) w-fit text-white py-4 px-7 font-semibold rounded-xl cursor-pointer">
          <FiEdit /> Edit Course
        </Link> */}
        <Link to={`/mentor/course/update/${courseData.course.id}`} className="flex items-center gap-2 w-fit bg-linear-(--gradient-secondary) text-white text-sm font-semibold px-8 py-4 rounded-lg cursor-pointer disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-[0_10px_15px_rgba(0,0,0,0.15)] transition-all duration-300">
          <FiEdit /> Edit Course
        </Link>
      </div>
    </div>
  );
};

export default CourseView;
