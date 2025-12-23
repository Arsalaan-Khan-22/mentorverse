import React from 'react'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { FiClock, FiStar, FiUsers } from 'react-icons/fi'

const MentorViewCard = ({mentorData, onNavigate}) => {
  return (
    <div className="bg-white shadow-(--shadow-primary) p-10 rounded-2xl flex gap-10">
        <div className="shrink-0">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
            alt="Tutor avatar"
            className="w-48 h-48 rounded-full border-4 border-(--primary-color)"
          />
        </div>

        <div className="flex flex-col gap-5 w-full mt-3">
          <h1 className="text-4xl font-bold tracking-wide">{mentorData.name}</h1>

          <div className="flex items-center gap-2 text-xl">
            <FiStar className="text-yellow-400" />
            <span className="font-semibold">{mentorData.avgRating.toFixed(2)}</span>
            <span className="text-gray-500 text-sm font-medium">
              ({mentorData.totalRating} reviews)
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {mentorData.bio}
          </p>

          <div className="flex flex-wrap gap-6 mt-2 text-gray-700 font-semibold">
            <span className="flex items-center gap-2 bg-(--bg-color) px-5 py-3 shadow-xs rounded-xl">
              <FiUsers className="text-(--primary-color)" />
              {mentorData.totalStudents} Students
            </span>

            <span className="flex items-center gap-2 bg-(--bg-color) px-5 py-3 shadow-xs rounded-xl">
              <FiClock className="text-(--primary-color)" />
              {mentorData.experience} Years Experience
            </span>

            <span className="flex items-center gap-2 bg-(--bg-color) px-5 py-3 shadow-xs rounded-xl">
              <FaIndianRupeeSign className="text-(--primary-color)" />
              {mentorData.ratePerHour}/hour
            </span>
          </div>

          <button onClick={() => onNavigate(`/learner/book-session/${mentorData.id}`)} className="mt-5 bg-linear-(--gradient-secondary) text-white px-8 py-4 rounded-xl font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-(--shadow-secondary) transition-all duration-300 w-fit">
            Book a Session
          </button>
        </div>
      </div>
  )
}

export default MentorViewCard
