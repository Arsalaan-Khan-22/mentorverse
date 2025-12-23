import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const DashboardCourses = ({ courseDetails, onNavigate }) => {
  return (
    <div className="px-8 py-10 rounded-2xl bg-white w-1/2 shadow-(--card-shadow) outline-(--primary-color) hover:outline-2 hover:outline-(--primary-color) hover:shadow-2xl transition-all duration-75">
      <div className="flex justify-between gap-15 mb-12">
        <h3 className="text-3xl font-bold tracking-wide">My Courses</h3>
        <Link to={"/learner/my-courses"} className="flex gap-3 items-center text-(--primary-color) font-semibold text-sm">
          View All <FiArrowRight />
        </Link>
      </div>
      {(courseDetails.length === 0 && (
        <div className="text-center text-gray-700">
          There are no courses available
        </div>
      )) || (
        
      <div className="flex justify-between bg-(--bg-color) p-5 rounded-2xl mb-4">
        {courseDetails.map((course, index) => {
          return (
            <div key={index} className="flex gap-4 items-center">
              <div className="w-30 h-17 rounded-lg overflow-hidden">
                <img
                  src={course.courseThumbnail}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-lg font-semibold">
                  {course.courseTitle}
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-sm font-medium me-5">
                    by {course.mentorName}
                  </p>
                  <button onClick={() => onNavigate(`/learner/courses/watch/${course.id}`)} className="text-(--primary-color) font-medium text-sm cursor-pointer">
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}

    </div>
  );
};

export default DashboardCourses;
