import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const DashboardCourses = ({ courseDetails, onNavigate }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 rounded-2xl bg-white w-full lg:w-1/2 shadow-(--card-shadow) outline-(--primary-color) hover:outline-2 hover:outline-(--primary-color) hover:shadow-2xl transition-all duration-75">
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-10 mb-6 sm:mb-12">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide">
          My Courses
        </h3>
        <Link
          to={"/learner/my-courses"}
          className="flex gap-2 sm:gap-3 items-center text-(--primary-color) font-semibold text-xs sm:text-sm"
        >
          View All <FiArrowRight />
        </Link>
      </div>

      {courseDetails.length === 0 ? (
        <div className="text-center text-gray-700 text-sm sm:text-base">
          There are no courses available
        </div>
      ) : (
        <div className="space-y-4">
          {courseDetails.map((course, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-(--bg-color) p-4 sm:p-5 rounded-2xl"
            >
              <div className="w-full sm:w-32 h-35 sm:h-20 rounded-lg overflow-hidden">
                <img
                  src={course.courseThumbnail}
                  alt={course.courseTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                <h4 className="text-base sm:text-lg font-semibold">
                  {course.courseTitle}
                </h4>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <p className="text-gray-600 text-xs sm:text-sm font-medium">
                    by {course.mentorName}
                  </p>
                  <button
                    onClick={() => onNavigate(`/learner/courses/watch/${course.id}`)}
                    className="text-(--primary-color) font-medium text-xs sm:text-sm cursor-pointer"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardCourses;