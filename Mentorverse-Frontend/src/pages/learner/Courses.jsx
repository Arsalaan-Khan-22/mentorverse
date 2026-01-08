import React, { useEffect, useState } from "react";
import FilterCourses from "../../components/learnerComponents/FilterCourses";
import CourseCard from "../../components/learnerComponents/CourseCard";
import api from "../../api/axios";
import useDebounce from "../../utils/useDebounce";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("mostPopular");
  const [level, setLevel] = useState("all");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();

  const fetchAllCourses = async () => {
    let response = await api.get("/courses", {
      params: {
        search: debouncedSearch,
        category,
        sortBy,
        level,
        page,
        size,
      },
    });
    setCourses(response.data.data.content);
    setTotalPages(response.data.data.totalPages);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const fetchAllCategories = async () => {
    let response = await api.get("/courses/categories");
    setCategories(response.data.data);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setSortBy("mostPopular");
    setLevel("all");
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    fetchAllCourses();
  }, [debouncedSearch, category, sortBy, level, page, size]);

  return (
    <div className="bg-(--bg-color) px-6 md:px-12 lg:px-24 py-32">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
        Browse Courses
      </h2>

      <FilterCourses
        categories={categories}
        filteration={{
          search,
          category,
          sortBy,
          level,
          setSearch,
          setCategory,
          setSortBy,
          setLevel,
          handleReset,
        }}
      />

      <p className="text-gray-600 my-6 sm:my-8">
        Found <span className="font-bold">{courses.length}</span>{" "}
        {courses.length > 1 ? "courses" : "course"}
      </p>

      {courses.length === 0 && (
        <p className="text-center text-gray-600">No Courses Found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
        {courses.length > 0 &&
          courses.map((course) => (
            <CourseCard key={course.id} course={course} onNavigate={navigate} />
          ))}
      </div>

      <div className="flex flex-row justify-between items-center mt-8 gap-4 sm:gap-0">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="py-2 px-4 bg-(--primary-color) text-white rounded disabled:bg-gray-300 cursor-pointer w-full sm:w-auto"
        >
          Previous
        </button>
        <div className="text-center sm:text-left">
          Page {page + 1} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
          className="py-2 px-4 bg-(--primary-color) text-white rounded disabled:bg-gray-300 cursor-pointer w-full sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Courses;