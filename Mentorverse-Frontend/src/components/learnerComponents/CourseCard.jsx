import React from 'react'
import { FiStar } from 'react-icons/fi'

const CourseCard = ({ course, onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-(--card-shadow) hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
      <div
        style={{
          backgroundImage: `url(${course.thumbnail})`,
        }}
        className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-cover bg-center"
      ></div>

      <div className="px-4 sm:px-5 py-5 sm:py-7 flex flex-col gap-3 text-sm">
        <div className="flex justify-between mb-px">
          <span className="w-fit px-3 py-[0.4rem] text-xs font-semibold rounded-2xl bg-linear-(--gradient-secondary) text-white">
            {course.category.name}
          </span>
          <div className="flex items-center gap-2">
            <FiStar className="text-[#fbbf24]" />
            <span className="text-gray-800">{course.avgRating.toFixed(2)}</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          {course.title}
        </h3>

        <div className="flex items-center gap-2">
          <img
            className="w-7 h-7 rounded-full"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden"
            alt=""
          />
          <span className="text-sm text-gray-600 font-medium">
            {course.mentorName}
          </span>
        </div>

        <p className="text-gray-600 mt-1 line-clamp-2">{course.description}</p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 gap-3">
          <span className="text-xl sm:text-2xl font-bold text-(--primary-color)">
            ₹{course.price}
          </span>
          <button
            onClick={() =>
              onNavigate(`/learner/courses/view/${course.id}`)
            }
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-linear-(--gradient-secondary) text-white font-bold cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
          >
            View Course
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseCard