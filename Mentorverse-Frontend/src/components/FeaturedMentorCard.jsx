
import React from "react";
import { FiStar } from "react-icons/fi";

const FeaturedMentorCard = ({ mentor, onNavigate }) => {
  const skillsArr = mentor.skills.split(",");

  return (
    <div className="mentor-card flex flex-col gap-6 bg-white px-6 py-8 border border-[#e2e8f0] rounded-3xl w-full hover:shadow-lg transition-all duration-300">
      <img
        className="mentor-photo mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-(--primary-color)"
        src={mentor.profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
        alt={mentor.name}
      />
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">{mentor.name}</h3>

      <div className="flex justify-center flex-wrap gap-2">
        {skillsArr.map((skill, index) => (
          <span
            key={index}
            className="bg-(image:--gradient-primary) px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-center gap-5 sm:gap-7 text-xs sm:text-sm font-light">
        <div className="flex items-center gap-1">
          <FiStar className="text-[#fbbf24]" />
          <span>{mentor.avgRating}</span>
        </div>
        <div>₹{mentor.ratePerHour}/hr</div>
      </div>
      
      <button
        onClick={() => onNavigate(`/learner/mentors/view/${mentor.id}`)}
        className="border w-full sm:w-40 h-12 sm:h-14 rounded-xl text-(--primary-color) m-auto font-semibold cursor-pointer relative hover:bg-[rgba(0,0,0,0.02)] transition-all duration-300"
      >
        View Profile
      </button>
    </div>
  );
};

export default FeaturedMentorCard;