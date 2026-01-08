import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "./FeaturedCourses.css";
import FeaturedCourseCard from "./FeaturedCourseCard";
import { Link } from "react-router-dom";

const FeaturedCourses = ({ courses, loading, error, onNavigate }) => {
  if (loading) return <p>Loading featured courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    courses.length === 0 ? "No Courses found" :
    <div className="text-center flex flex-col items-center px-6 sm:px-12 lg:px-24 py-10 lg:py-15">
      <h2 className="featured-mentors-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold relative w-fit justify-self-center pb-4">
        Featured Courses
      </h2>

      <Link
        to={"/learner/courses"}
        className="mentor-view-all-link flex w-fit px-3 py-2 justify-center rounded-xl font-bold mt-6 sm:mt-10 items-center self-start text-(--primary-color) hover:bg-[rgba(0,0,0,0.03)]"
      >
        View All <FiArrowRight className="mentor-view-all-arrow ms-2" />
      </Link>

      <div className="py-8 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full">
        {courses.map((course, index) => (
          <FeaturedCourseCard key={index} course={course} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;