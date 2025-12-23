import React from 'react'
import { FiStar } from 'react-icons/fi'

const CourseCard = ({course, onNavigate}) => {
  return (
    <>
    <div className="bg-white rounded-2xl overflow-hidden shadow-(--card-shadow) hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
          <div
            style={{
              backgroundImage:
                `url(${course.thumbnail})`,
            }}
            className="w-full h-50 bg-cover bg-top-left"
          ></div>
          <div className="px-5 py-7 flex flex-col gap-[0.8rem] text-sm">
            <div className="flex justify-between mb-px">
              <span className="w-fit px-3 py-[0.4rem] text-xs font-semibold rounded-2xl bg-linear-(--gradient-secondary) text-white">
                {course.category.name}
              </span>
              <div className="flex items-center gap-2">
                <FiStar className="text-[#fbbf24]" />
                <span className="text-gray-800">{course.avgRating.toFixed(2)}</span>
                {/* <span className="text-gray-600">({course.totalReviews})</span> */}
              </div>
            </div>
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <div className="flex items-center gap-2">
              <img
                className="w-7"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden"
                alt=""
              />
              <span className="text-sm text-gray-600 font-medium">
                {course.mentorName}
              </span>
            </div>
            <p className="text-gray-600 mt-1 line-clamp-2">
              {course.description}
            </p>
                {/* <div className="flex items-center gap-3  border-b pb-4 pt-1 border-b-gray-300 overflow-auto no-scrollbar">
                <span className="border border-gray-200 rounded-full text-(--primary-color) text-xs font-semibold px-3 py-[0.35rem] bg-(--bg-color) shrink-0">
                    UI/UX
                </span>
                <span className="border border-gray-200 rounded-full text-(--primary-color) text-xs font-semibold px-3 py-[0.35rem] bg-(--bg-color) shrink-0">
                    Figma
                </span>
                <span className="border border-gray-200 rounded-full text-(--primary-color) text-xs font-semibold px-3 py-[0.35rem] bg-(--bg-color) shrink-0">
                    Design Thinking
                </span>
                <span className="border border-gray-200 rounded-full text-(--primary-color) text-xs font-semibold px-3 py-[0.35rem] bg-(--bg-color) shrink-0">
                    Design Thinking
                </span>
                </div> */}
            {/* <div className="flex items-center gap-5 text-sm text-gray-600 border-t border-t-gray-300 pt-2">
              <span>{course.totalStudentsEnrolled} {course.totalStudentsEnrolled > 1 ? "Students" : "Student"}</span>
              <span>{course.totalHours} Hours</span>
              <span>{course.level[0] + course.level.slice(1).toLowerCase()}</span>
            </div> */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-2xl font-bold text-(--primary-color)">
                ₹{course.price}
              </span>
              <button onClick={() => onNavigate(`/learner/courses/view/${course.id}`)} className="px-5 py-3 rounded-lg bg-linear-(--gradient-secondary) text-white font-bold cursor-pointer hover:-translate-y-0.5 translate-all duration-300">
                View Course
              </button>
            </div>
          </div>
        </div>
        </>
  )
}

export default CourseCard
