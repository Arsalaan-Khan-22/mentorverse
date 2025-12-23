import React from "react";

const StatsCard = ({stats}) => {
  return (
    <>
      <div className="flex bg-white ps-10 h-full py-10 w-full rounded-2xl shadow-(--card-shadow)">
        <div className="bg-amber-300 px-5 py-5 rounded-xl me-4 h-full" style={{backgroundColor: stats.iconBgColor}}>
          <stats.icon className="text-2xl" style={{color: stats.iconColor}} />
        </div>
        <div className="text-center">
          <h4 className="text-4xl font-bold mb-2">{stats.value}</h4>
          <span className="text-sm text-gray-700">{stats.label}</span>
        </div>
      </div>
    </>
  );
};

export default StatsCard;
