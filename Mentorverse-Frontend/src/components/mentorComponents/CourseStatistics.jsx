import React from "react";

const CourseStatistics = ({ courseStatistics }) => {
  return (
    <div className="bg-white px-8 py-10 rounded-2xl shadow-(--shadow-primary)">
      <h3 className="text-3xl font-semibold">Course Statistics</h3>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        {courseStatistics.map((stats, index) => {
          if(stats.data.toString().includes("."))
            stats.data = stats.data.toFixed(2);
          return (
            <div key={index} className="flex gap-4 items-end shadow-(--card-shadow) px-6 py-9 rounded-xl border border-gray-300">
              <h3 className="text-3xl font-bold text-(--primary-color) tracking-wider">
                {stats.data}
              </h3>
              <p className="text-gray-600 mb-[0.15rem]">{stats.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseStatistics;
