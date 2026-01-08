import React from 'react'
import { FiFilter, FiRefreshCw, FiSearch } from 'react-icons/fi'

const FilterCourses = ({ categories, filteration }) => {
  return (
    <div className="flex flex-col gap-6 w-full bg-white mt-8 sm:mt-12 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-(--card-shadow)">
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

      <div className="flex flex-col md:flex-row sm:items-center gap-6 sm:gap-10 flex-wrap">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <FiFilter className="text-(--primary-color)" />
          <span className="font-medium">Category:</span>
          <select
            onChange={(e) => filteration.setCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border-2 border-gray-200 cursor-pointer focus:border-(--primary-color) focus:shadow-(--card-shadow) focus:outline-none transition-all duration-300"
            name="category"
            value={filteration.category}
          >
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="font-medium shrink-0">Sort by:</span>
          <select
            onChange={(e) => filteration.setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border-2 border-gray-200 cursor-pointer focus:border-(--primary-color) focus:shadow-(--card-shadow) focus:outline-none transition-all duration-300"
            name="sortBy"
            value={filteration.sortBy}
          >
            <option value="mostPopular">Most Popular</option>
            <option value="highestRating">Highest Rating</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="font-medium">Level:</span>
          <select
            onChange={(e) => filteration.setLevel(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border-2 border-gray-200 cursor-pointer focus:border-(--primary-color) focus:shadow-(--card-shadow) focus:outline-none transition-all duration-300"
            name="level"
            value={filteration.level}
          >
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button
          onClick={filteration.handleReset}
          className="cursor-pointer text-gray-600 hover:text-(--primary-color) transition-colors duration-200 self-end sm:self-auto"
        >
          <FiRefreshCw />
        </button>
      </div>
    </div>
  )
}

export default FilterCourses