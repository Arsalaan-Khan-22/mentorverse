import React from "react";
import { FiFilter, FiRefreshCw, FiSearch } from "react-icons/fi";

const FilterMentors = ({ filteration, allSkills }) => {
  return (
    <div className="flex flex-col gap-6 w-full bg-white mt-8 sm:mt-12 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-(--card-shadow)">
      <div className="flex items-center rounded-xl border-2 border-gray-200 focus-within:border-(--primary-color) focus-within:shadow-(--shadow-primary) transition-all duration-300">
        <FiSearch className="text-lg sm:text-xl text-gray-600 mx-2 sm:mx-3" />
        <input
          onChange={(e) => filteration.setSearch(e.target.value)}
          value={filteration.search}
          className="w-full focus:outline-none py-2 sm:py-3 text-sm sm:text-base"
          type="text"
          placeholder="Search courses by title, mentor, or skill..."
        />
      </div>

      <div className="flex flex-col md:flex-row sm:items-center gap-6 sm:gap-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <FiFilter className="text-(--primary-color)" />
          <span className="font-medium text-sm sm:text-base">Skills:</span>
          <select
            onChange={(e) => filteration.setFilter(e.target.value)}
            className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg border-2 border-gray-200 cursor-pointer focus:border-(--primary-color) focus:shadow-(--card-shadow) focus:outline-none transition-all duration-300 text-sm sm:text-base"
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

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-medium text-sm sm:text-base">Sort by:</span>
          <select
            onChange={(e) => filteration.setSortBy(e.target.value)}
            className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg border-2 border-gray-200 cursor-pointer focus:border-(--primary-color) focus:shadow-(--card-shadow) focus:outline-none transition-all duration-300 text-sm sm:text-base"
            name="category"
            value={filteration.sortBy}
          >
            <option value="all">Highest Rating</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="mostExperience">Most Experience</option>
          </select>
        </div>

        <button
          onClick={filteration.handleReset}
          className="cursor-pointer text-gray-600 hover:text-(--primary-color) transition-colors duration-200 self-end sm:self-auto"
        >
          <FiRefreshCw className="text-base sm:text-lg" />
        </button>
      </div>
    </div>
  );
};

export default FilterMentors;