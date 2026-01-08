import React from "react";

const StatsCard = ({ stats }) => {
  return (
    <div className="flex items-center bg-white px-7 py-6 sm:py-8 lg:py-10 w-full rounded-2xl shadow-(--card-shadow)">
      <div
        className="flex items-center justify-center px-4 sm:px-5 py-4 sm:py-5 rounded-xl mr-4"
        style={{ backgroundColor: stats.iconBgColor }}
      >
        <stats.icon
          className="text-xl sm:text-2xl lg:text-3xl"
          style={{ color: stats.iconColor }}
        />
      </div>

      <div className="text-center flex-1">
        <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
          {stats.value}
        </h4>
        <span className="text-xs sm:text-sm lg:text-base text-gray-700">
          {stats.label}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;