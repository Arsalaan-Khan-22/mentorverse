import React from "react";
import { FiCheck, FiCheckCircle } from "react-icons/fi";

const CourseSideCard = ({ courseData, isEnrolled, handleEnrollment, handleViewCourse }) => {
  const benefits = [
    "Full lifetime access",
    "Certificate of completion",
    "30-day money-back guarantee",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-sm border border-gray-100 sticky top-25 lef-0 h-fit">
      <div
        className="w-full h-48 rounded-xl bg-cover bg-top-left shadow-sm"
        style={{
          backgroundImage: `url(${courseData.thumbnail})`,
        }}
      ></div>

      <h2 className="text-4xl font-bold text-(--primary-color) text-center mt-6">
        ₹{courseData.price}
      </h2>

      <button
        onClick={isEnrolled ? handleViewCourse : handleEnrollment}
        className="w-full bg-linear-(--gradient-secondary) text-white py-3 mt-4 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 hover:shadow-(--shadow-secondary) transition-all duration-300"
      >
        {isEnrolled ? "View Course" : "Enroll Now"}
      </button>

      <div className="mt-6 space-y-4">
        {benefits.map((item, index) => (
          <div key={index} className="flex gap-3 items-start">
            <FiCheck className="text-(--primary-color) mt-1 text-lg" />
            <span className="text-gray-700 text-[15px]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSideCard;
