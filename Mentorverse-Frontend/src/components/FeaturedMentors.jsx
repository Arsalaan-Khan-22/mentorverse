import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "./FeaturedMentors.css";
import FeaturedMentorCard from "./FeaturedMentorCard";
import { Link } from "react-router-dom";

const FeaturedMentors = ({ mentors, loading, error, onNavigate }) => {

  if (loading) return <p>Loading featured mentors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-(--bg-color) text-center flex flex-col items-center px-24 pb-15">
      <h2 className="featured-mentors-heading text-5xl font-extrabold relative w-fit justify-self-center pb-4">
        Featured Mentors
      </h2>
      <Link
        to={"/learner/mentors"}
        className="mentor-view-all-link flex w-30 px-3 py-2 justify-center rounded-xl font-bold mt-10 items-center self-start text-(--primary-color) hover:bg-[rgba(0,0,0,0.03)]"
      >
        View All <FiArrowRight className="mentor-view-all-arrow ms-2" />
      </Link>
      <div className="pt-8 flex gap-10 w-full">
        {/* {mentorContent.map((mentor, index) => {
          return <FeaturedMentorCard key={index} mentor={mentor} />;
        })} */}
        {mentors.map((mentor, index) => {
          return <FeaturedMentorCard key={index} mentor={mentor} onNavigate={onNavigate} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedMentors;
