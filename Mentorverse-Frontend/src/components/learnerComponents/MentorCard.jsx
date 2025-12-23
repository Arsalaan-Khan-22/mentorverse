import React from "react";
import { FiStar } from "react-icons/fi";

const MentorCard = ({ mentor, onNavigate }) => {
  let skills = mentor.skills.split(",");
  skills = skills.map((skill) => skill.trim());
console.log(mentor)
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-(--card-shadow) hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col p-7">
        <div className="flex items-start justify-between">
          <img
            className="me-3 w-20 border-3 border-(--primary-color) rounded-full"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden"
            alt="profile picture"
          />
          <div className="flex flex-col gap-3 mt-2">
            <h3 className="text-2xl font-semibold">{mentor.name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <FiStar className="text-[#fbbf24]" />
              <span className="text-gray-800">{mentor.avgRating.toFixed(2)}</span>
              <span className="text-gray-600">
                {/* ({mentor.totalRating} reviews) */}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-7">
          <p className="text-gray-600 font-normal line-clamp-3">{mentor.bio}</p>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sm">Skills:</span>
            <div className="flex items-center gap-3  border-b pb-4 pt-1 border-b-gray-300 overflow-auto no-scrollbar">
              {skills.map((skill, index) => {
                return (
                  <span key={index} className="rounded-full text-white text-xs font-semibold px-3 py-[0.35rem] bg-(image:--gradient-primary) shrink-0">
                    {skill[0].toUpperCase() + skill.slice(1)}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-600">Experience:</span>
              <span className="font-semibold">{mentor.experience} Years</span>
            </div>
            {/* <div className="flex flex-col px-3">
              <span className="text-gray-600">Students:</span>
              <span className="font-semibold">{mentor.totalStudents}</span>
            </div> */}
            <div className="flex flex-col">
              <span className="text-gray-600">Rate:</span>
              <span className="font-semibold">₹{mentor.ratePerHour}/hr</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 mt-5">
          <button onClick={() => onNavigate(`/learner/mentors/view/${mentor.id}`)} className="w-full py-3 rounded-lg bg-(image:--gradient-primary) text-sm text-white font-bold cursor-pointer hover:-translate-y-0.5 transition-all duration-300 animate-[gradient-shift_4s_ease_infinite] bg-size-[200%] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-linear-(--gradient-animation) hover:before:left-full before:transition-[left] before:duration-500">
            View Profile
          </button>
          <button onClick={() => onNavigate(`/learner/book-session/${mentor.id}`)} className="relative w-full py-3 rounded-lg text-sm text-(--primary-color) border border-(--primary-color) font-bold cursor-pointer hover:-translate-y-0.5 hover:text-white transition-all duration-300 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-linear-(--gradient-secondary) before:opacity-0 hover:before:opacity-100 before:-z-10 before:transition-all before:duration-300 overflow-hidden">
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
