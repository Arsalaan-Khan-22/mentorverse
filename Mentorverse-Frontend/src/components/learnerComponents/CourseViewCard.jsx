import React from "react";
import {
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiPlay,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const CourseViewCard = ({ courseData, isEnrolled, handleEnrollment, handleViewCourse }) => {
  return (
    <div className="mt-6 flex bg-white shadow-(--shadow-primary) items-center p-7 rounded-2xl">
      <div
        style={{ backgroundImage: `url(${courseData.course.thumbnail})` }}
        className="w-150 min-h-[383px] rounded-2xl bg-cover bg-top-left shrink-0"
      ></div>

      <div className="px-10 flex flex-col gap-3 w-full">
        <span className="w-fit bg-(--primary-color) text-white px-3 py-2 rounded-full text-xs font-semibold">
          {courseData.course.category.name}
        </span>
        <h2 className="text-3xl font-bold tracking-wide leading-12">
          {courseData.course.title}
        </h2>
        <p className="text-gray-600 text-sm">{courseData.course.description}</p>
        <div className="flex text-gray-600 items-center gap-7 my-2 text-sm">
          <span className="flex items-center gap-2">
            <FiStar className="text-yellow-400" />{" "}
            {courseData.rating.toFixed(2)} ({courseData.totalRatingCount}{" "}
            review)
          </span>
          {/* <span className="flex items-center gap-2">
                    <FiUsers /> {courseData.totalStudents}{" "}
                    {courseData.totalStudents < 2 ? "student" : "students"}
                  </span> */}
          <span className="flex items-center gap-2">
            <FiUsers />
            {courseData.totalStudents} students
          </span>
          <span className="flex items-center gap-2">
            <FiClock /> {courseData.totalHours} hours
          </span>
        </div>
        <div className="flex items-center gap-5 bg-(--bg-color) w-full p-4 rounded-lg shadow">
          <img
            className="w-10 border-3 border-(--primary-color) rounded-full"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden"
            alt=""
          />
          <div className="flex flex-col gap-1 text-sm">
            <span>Instuctor</span>
            <span className="font-semibold">
              {courseData.course.mentor.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-3">
          <h3 className="text-(--primary-color) text-4xl font-bold">
            ₹{courseData.course.price}
          </h3>
          {isEnrolled && <span
            className="text-[#059669] flex items-center gap-2 text-xl"
          >
            Enrolled
            <FiCheckCircle className="text-xl" />
          </span>}
          <button
            onClick={isEnrolled ? handleViewCourse : handleEnrollment}
            className="relative border bg-linear-(--gradient-secondary) text-white px-7 py-3 font-semibold rounded-xl cursor-pointer hover:-translate-y-0.5 hover:shadow-(--shadow-secondary) transition-all duration-300 flex items-center gap-2"
          >
            {isEnrolled ? "View Course" : "Enroll Now"}
          </button>


          {/* <button
            disabled={isEnrolled}
            className="relative border bg-linear-(--gradient-secondary) text-white px-7 py-3 font-semibold rounded-xl cursor-pointer hover:-translate-y-0.5 hover:shadow-(--shadow-secondary) transition-all duration-300 disabled:cursor-auto disabled:hover:shadow-none disabled:hover:translate-none disabled:text-[#059669] disabled:bg-linear-0  disabled:border-none flex items-center gap-2 disabled:text-xl"
          >
            {isEnrolled ? "Enrolled" : "Enroll Now"} */}
            {/* <FiCheckCircle className="absolute -top-2 -right-2 text-2xl text-[#059669]" /> */}
            {/* {isEnrolled && <FiCheckCircle className="text-xl" />}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CourseViewCard;
