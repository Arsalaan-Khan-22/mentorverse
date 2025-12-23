import React from 'react'
import { FiBook, FiMail } from 'react-icons/fi'

const StudentCard = ({studentInfo}) => {
  return (
    <div className="flex flex-col items-center gap-7 py-7 px-7 bg-white shadow-(--shadow-primary) rounded-2xl w-[23%] hover:-translate-y-[0.3rem] transition-all duration-300 hover:shadow-[0_10px_15px_rgba(0,0,0,0.2)]">
          <img
            className="w-25 border-4 rounded-full border-(--primary-color)"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="dummy image"
          />
          <h3 className="text-2xl font-semibold">{studentInfo.learnerName}</h3>
          <div className="flex flex-col gap-5 text-gray-600">
            <div className="flex items-center gap-3">
              <FiMail />
              <span>{studentInfo.learnerEmail}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiBook />
              <span>{studentInfo.totalCoursesEnrolled} {studentInfo.totalCoursesEnrolled == 1 ? "Course" : "Courses"} enrolled</span>
            </div>
          </div>
          {/* <button className="border w-full bg-linear-(--gradient-secondary) text-white p-[0.7rem] text-sm font-semibold rounded-lg cursor-pointer hover:-translate-y-0.5 transition-all duration-300">View Profile</button> */}
        </div>
  )
}

export default StudentCard
