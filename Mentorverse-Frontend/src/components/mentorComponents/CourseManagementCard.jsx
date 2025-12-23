import React from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

const CourseManagementCard = ({ course, onNavigate, onDelete }) => {
  return (
    <div className="flex items-center gap-7 bg-white shadow-(--card-shadow) p-6 w-full rounded-xl">
      <div style={{backgroundImage: `url(${course.course.thumbnail})`}} className="w-30 h-17 bg-cover bg-top rounded-lg">
      </div>
      <div className="flex flex-col gap-3 grow">
        <h2 className="text-xl font-semibold tracking-wide">
          {course.course.title}
        </h2>
        <div className="text-gray-500 text-sm font-medium">
          <span>{course.totalStudents} {course.totalStudents > 1 ? "students" : "student"}</span>
          <span className="mx-3">•</span>
          <span>Rating: {course.rating.toFixed(2)}</span>
          <span className="mx-3">•</span>
          <span>₹{course.course.price}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          className="block bg-(--bg-color) p-3 rounded-lg cursor-pointer"
          onClick={() => onNavigate(`/mentor/course/view/${course.course.id}`)}
        >
          <FiEye className="text-lg text-(--primary-color)" />
        </button>
        <button
          className="block bg-(--bg-color) p-3 rounded-lg cursor-pointer"
          onClick={() =>
            onNavigate(`/mentor/course/update/${course.course.id}`)
          }
        >
          <FiEdit className="text-lg text-[#eab308]" />
        </button>
        <button
          className="block bg-(--bg-color) p-3 rounded-lg cursor-pointer"
          onClick={() => onDelete(course.course.id)}
        >
          <FiTrash2 className="text-lg text-[#ef4444]" />
        </button>
      </div>
    </div>
  );
};

export default CourseManagementCard;
