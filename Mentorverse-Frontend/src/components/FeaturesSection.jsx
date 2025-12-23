import React from "react";
import "./FeaturesSection.css";
import FeatureCard from "./FeatureCard";
import { FiBook, FiStar, FiTrendingUp, FiUsers } from "react-icons/fi";

const FeaturesSection = () => {
  const cardContent = [
    {
      icon: <FiUsers />,
      title: "Expert Mentors",
      desc: "Learn from industry professionals with years of experience",
    },
    {
      icon: <FiBook />,
      title: "Comprehensive Courses",
      desc: "Access structured courses with video lectures and resources",
    },
    {
      icon: <FiStar />,
      title: "1-on-1 Sessions",
      desc: "Book personalized mentoring sessions tailored to your needs",
    },
    {
      icon: <FiTrendingUp />,
      title: "Track Progress",
      desc: "Monitor your learning journey and achieve your goals",
    },
  ];

  return (
    <div className="bg-(--bg-color) py-30 text-center">
      <h2 className="features-heading text-5xl font-extrabold relative w-fit justify-self-center pb-4">
        Why Choose Mentorverse?
      </h2>
      <div className="pt-18 px-24 flex gap-10">
        {cardContent.map((card, index) => (
          <FeatureCard key={index} icon={card.icon} title={card.title} desc={card.desc} />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
