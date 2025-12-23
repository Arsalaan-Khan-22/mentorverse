import React from "react";
import { FiPlay } from "react-icons/fi";

const MyCoursesCard = ({course, onNavigate}) => {
  console.log(course)
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-(--card-shadow) hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div style={{backgroundImage: `url(${course.courseThumbnail})`}} className="w-full h-50 bg-cover bg-top-left"></div>
      <div className="py-7 px-5">
        <div className="flex justify-between items-center">
          <span className="border rounded-2xl px-[0.9rem] py-[0.35rem] text-xs font-semibold bg-(image:--gradient-primary) text-white">
            {course.categoryName.toUpperCase()}
          </span>
          <span className="text-sm text-gray-600 font-medium">
            {course.completionPercentage}% Complete
          </span>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <h3 className="text-xl font-semibold w">
            {course.courseTitle}
          </h3>
          <p className="text-gray-600 text-sm">by {course.mentorName}</p>
          <div className="bg-(--bg-color) border border-gray-200 w-full h-[0.6rem] rounded-full overflow-hidden mt-1">
            <div style={{ width: `${course.completionPercentage}%` }} className="bg-(--primary-color) h-full"></div>
          </div>
          <button onClick={() => onNavigate(`/learner/courses/watch/${course.id}`)} className="mt-2 py-3 rounded-lg flex items-center justify-center font-semibold gap-2 bg-linear-(--gradient-secondary) text-white cursor-pointer hover:-translate-y-0.5 translate-all duration-300">
            <FiPlay /> Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesCard;
