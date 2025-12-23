import React from "react";
import { FiCheck } from "react-icons/fi";

const WhatWillLearn = () => {

    const items = [
    "Master React fundamentals",
    "Build real-world projects",
    "Understand state management",
    "Deploy applications",
  ];

  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 ">
      <h2 className="text-3xl font-semibold mb-6">What you'll learn</h2>

      <div className="grid grid-cols-2 gap-y-4 gap-x-10">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <FiCheck className="text-(--primary-color) mt-1 text-lg" />
            <span className="text-gray-700 text-[15px]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWillLearn;
