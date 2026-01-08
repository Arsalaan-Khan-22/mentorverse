import React from "react";
import { FiStar } from "react-icons/fi";

const MentorCard = ({ mentor, onNavigate }) => {
  let skills = mentor.skills.split(",").map((skill) => skill.trim());

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-(--card-shadow) hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col p-4 sm:p-6 lg:p-7">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <img
            className="w-16 sm:w-20 border-2 border-(--primary-color) rounded-full"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden"
            alt="profile picture"
          />
          <div className="flex flex-col gap-2 sm:gap-3 mt-2 sm:mt-0">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
              {mentor.name}
            </h3>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <FiStar className="text-[#fbbf24]" />
              <span className="text-gray-800">{mentor.avgRating.toFixed(2)}</span>
              <span className="text-gray-600">
                {/* ({mentor.totalRating} reviews) */}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 mt-5 sm:mt-7">
          <p className="text-gray-600 font-normal line-clamp-3 text-sm sm:text-base">
            {mentor.bio}
          </p>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-xs sm:text-sm">Skills:</span>
            <div className="flex items-center gap-2 sm:gap-3 border-b pb-3 sm:pb-4 pt-1 border-b-gray-300 overflow-auto no-scrollbar">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-[0.35rem] bg-(image:--gradient-primary) shrink-0"
                >
                  {skill[0].toUpperCase() + skill.slice(1)}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex flex-col">
              <span className="text-gray-600 text-xs sm:text-sm">Experience:</span>
              <span className="font-semibold text-sm sm:text-base">
                {mentor.experience} Years
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 text-xs sm:text-sm">Rate:</span>
              <span className="font-semibold text-sm sm:text-base">
                ₹{mentor.ratePerHour}/hr
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5">
          <button
            onClick={() => onNavigate(`/learner/mentors/view/${mentor.id}`)}
            className="w-full py-2 sm:py-3 rounded-lg bg-(image:--gradient-primary) text-xs sm:text-sm text-white font-bold cursor-pointer hover:-translate-y-0.5 transition-all duration-300 animate-[gradient-shift_4s_ease_infinite] bg-size-[200%]"
          >
            View Profile
          </button>
          <button
            onClick={() => onNavigate(`/learner/book-session/${mentor.id}`)}
            className="relative w-full py-2 sm:py-3 rounded-lg text-xs sm:text-sm text-(--primary-color) border border-(--primary-color) font-bold cursor-pointer hover:-translate-y-0.5 hover:text-white transition-all duration-300 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-linear-(--gradient-secondary) before:opacity-0 hover:before:opacity-100 before:-z-10 before:transition-all before:duration-300 overflow-hidden"
          >
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;