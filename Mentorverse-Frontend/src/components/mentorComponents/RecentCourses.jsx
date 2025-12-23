import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const RecentCourses = ({ recentCourses }) => {
  return (
    <div className="px-8 py-10 rounded-2xl bg-white w-1/2 shadow-(--card-shadow) outline-(--primary-color) hover:outline-2 hover:outline-(--primary-color) hover:shadow-2xl transition-all duration-100">
      <div className="flex justify-between gap-15 mb-12">
        <h3 className="text-3xl font-bold tracking-wide">
          Recent Course Performance
        </h3>
        <Link to={"/mentor/courses"} className="flex gap-3 items-center text-(--primary-color) font-semibold text-sm">
          View All <FiArrowRight />
        </Link>
      </div>
      {(recentCourses.length == 0 && (
        <div className="text-center text-gray-700">
          There are no courses available
        </div>
      )) ||
        recentCourses.map((course, index) => {
          return (
            <div
              key={index}
              className="flex justify-between bg-(--bg-color) p-5 rounded-2xl mb-4"
            >
              <div>
                <h4 className="text-lg font-bold mb-3">{course.courseName} </h4>
                <p className="text-gray-700 text-sm">
                  {course.totalStudentsEnrolled} students enrolled
                </p>
              </div>
              <div className="flex gap-10 items-center">
                <div className="flex flex-col gap-3 text-center">
                  <span className="text-gray-700 text-sm">Rating</span>
                  <span className="text-xl font-bold">
                    {course.courseRating}
                  </span>
                </div>
                <div className="flex flex-col gap-3 text-center">
                  <span className="text-gray-700 text-sm">Revenue</span>
                  <span className="text-xl font-bold">
                    ₹{course.courseRevenue}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RecentCourses;
