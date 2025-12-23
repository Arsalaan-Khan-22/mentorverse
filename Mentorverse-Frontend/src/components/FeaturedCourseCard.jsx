import React from 'react'
import { FiStar } from 'react-icons/fi'

const FeaturedCourseCard = ({ course, onNavigate }) => {
  return (
     <div className="course-card rounded-2xl overflow-hidden bg-white hover:border border-(--primary-color) w-75">
      <div className="h-50 overflow-hidden">
        <img className="course-image w-full h-full" src={course.thumbnail} alt="" />
      </div>
      <div className="flex flex-col px-8 py-10 gap-3">
        <div className="w-fit text-xs font-medium border px-3 py-1.5 rounded-3xl text-white bg-(image:--gradient-primary)">
          <span>{course.category.name.toUpperCase()}</span>
        </div>
        <h3 className="text-lg text-left font-bold">{course.title}</h3>
        <div className="flex items-center gap-3 mt-2">
          <img
            className="w-10 h-10 border-2 border-(--primary-color) rounded-full"
            src={course.mentorProfilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
            alt=""
          />
          <p className="font-light text-sm">{course.mentorName}</p>
        </div>
        <div className="flex flex-col items-center gap-6 mt-2">
          <div className="flex w-full justify-between gap-3">
            <div className="flex items-center gap-1 font-light text-sm">
              <FiStar className="text-[#fbbf24]" />
              <span>
                {course.avgRating}
              </span>
            </div>
            {/* <span className="text-sm font-light">
              {course.totalStudentsEnrolled} students
            </span> */}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl font-bold bg-(image:--gradient-primary) text-transparent bg-clip-text">₹{course.price}</span>
            <button onClick={() => onNavigate(`/learner/courses/view/${course.id}`)} className="view-course-btn shrink-0 bg-(image:--gradient-primary) py-2 px-5 text-white rounded-xl cursor-pointer font-bold">View Course</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCourseCard
