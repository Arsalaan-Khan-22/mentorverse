import React from "react";
import { FiStar } from "react-icons/fi";

const FeaturedMentorCard = ({mentor, onNavigate}) => {

  const skillsArr = mentor.skills.split(",");
  // const skillsArr = mentor.skills;

  return (
    <>
      <div className="mentor-card flex flex-col gap-7 bg-white px-6 py-8 border border-[#e2e8f0] rounded-3xl w-75">
        <img
          className="mentor-photo mx-auto w-24 h-24 rounded-full border-3 border-(--primary-color)"
          src={mentor.profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
        />
        <h3 className="text-2xl font-semibold">{mentor.name}</h3>
        <div className="flex justify-center flex-wrap gap-2">
          {skillsArr.map((skill, index) => (
            <span key={index} className="bg-(image:--gradient-primary) px-4 py-2 rounded-full text-white text-xs font-medium    ">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex justify-center gap-7 text-sm font-light">
          <div className="flex items-center gap-1">
            <FiStar className="text-[#fbbf24]" />
            <span>
              {mentor.avgRating}
            </span>
          </div>
          <div>₹{mentor.ratePerHour}/hr</div>
        </div>
        <button onClick={() => onNavigate(`/learner/mentors/view/${mentor.id}`)} className="border w-40 h-14 rounded-xl text-(--primary-color) m-auto font-semibold cursor-pointer relative">
          View Profile
        </button>
      </div>
    </>
  );
};

export default FeaturedMentorCard;
