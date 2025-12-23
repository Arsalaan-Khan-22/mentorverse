import React from "react";
import { FiFilter, FiRefreshCw, FiSearch } from "react-icons/fi";

const FilterMentors = ({ filteration, allSkills }) => {
  return (
    <div className="flex flex-col gap-7 w-full bg-white mt-12 p-8 rounded-2xl shadow-(--card-shadow)">
      <div className="flex items-center outline-2 rounded-xl outline-gray-200 focus-within:outline-(--primary-color) focus-within:shadow-(--shadow-primary) transition-all duration-300">
        <FiSearch className="text-xl text-gray-600 mx-3" />
        <input
          onChange={(e) => filteration.setSearch(e.target.value)}
          value={filteration.search}
          className="w-full focus:outline-none py-3"
          type="text"
          placeholder="Search courses by title, mentor, or skill..."
        />
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3">
          <FiFilter className="text-(--primary-color)" />
          <span className="font-medium">Skills:</span>
          <select
            onChange={(e) => filteration.setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border-2 border-gray-200 cursor-pointer focus:border-(--primary-color) focus:shadow-(--card-shadow) focus:outline-none transition-all duration-300"
            name="category"
            value={filteration.filter}
          >
            {allSkills.map((skill) => (
              <option key={skill} value={skill.toLowerCase()}>
                {skill}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium">Sort by:</span>
          <select
            onChange={(e) => filteration.setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border-2 border-gray-200 cursor-pointer focus:border-(--primary-color) focus:shadow-(--card-shadow) focus:outline-none transition-all duration-300"
            name="category"
            value={filteration.sortBy}
          >
            <option value="all">Highest Rating</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="mostExperience">Most Experience</option>
          </select>
        </div>
        <button onClick={filteration.handleReset} className="cursor-pointer">
          <FiRefreshCw />
        </button>
      </div>
    </div>
  );
};

export default FilterMentors;
