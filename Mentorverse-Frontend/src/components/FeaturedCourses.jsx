import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "./FeaturedCourses.css";
import FeaturedCourseCard from "./FeaturedCourseCard";
import { Link } from "react-router-dom";

const FeaturedCourses = ({ courses, loading, error, onNavigate }) => {

  if (loading) return <p>Loading featured courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="text-center flex flex-col items-center px-24 py-15">
      <h2 className="featured-mentors-heading text-5xl font-extrabold relative w-fit justify-self-center pb-4">
        Featured Courses
      </h2>
      <Link
       to={"/learner/courses"}
        className="mentor-view-all-link flex w-30 px-3 py-2 justify-center rounded-xl font-bold mt-10 items-center self-start text-(--primary-color) hover:bg-[rgba(0,0,0,0.03)]"
      >
        View All <FiArrowRight className="mentor-view-all-arrow ms-2" />
      </Link>
      <div className="py-8 flex gap-10 w-full">
        {courses.map((course, index) => (
          <FeaturedCourseCard key={index} course={course} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;
