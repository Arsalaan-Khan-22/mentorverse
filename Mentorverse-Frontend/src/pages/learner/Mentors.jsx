import React, { useEffect, useState } from "react";
import FilterMentors from "../../components/learnerComponents/FilterMentors";
import MentorCard from "../../components/learnerComponents/MentorCard";
import api from "../../api/axios";
import useDebounce from "../../utils/useDebounce";
import { useNavigate } from "react-router-dom";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("highestRating");
  const [allSkills, setAllSkills] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();

  const fetchAllMentors = async () => {
    let response = await api.get("/mentors", {
      params: {
        search: debouncedSearch,
        skill: filter,
        sortBy: sortBy,
        page,
        size,
      },
    });
    setMentors(response.data.data.content);
    setTotalPages(response.data.data.totalPages);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const fetchSkills = async () => {
    try {
      const res = await api.get("/learners/mentors/skills");
      setAllSkills(res.data.data);
    } catch (err) {
      console.error("Failed to fetch skills", err);
    }
  };

  const handleReset = () => {
    setSearch("");
    setFilter("all");
    setSortBy("highestRating");
  };

  useEffect(() => {
    fetchAllMentors();
  }, [debouncedSearch, filter, sortBy, page, size]);

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="bg-(--bg-color) px-6 sm:px-12 lg:px-24 py-32">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">
        Find Your Perfect Mentor
      </h2>

      <FilterMentors
        filteration={{
          search,
          filter,
          sortBy,
          setSearch,
          setFilter,
          setSortBy,
          handleReset,
        }}
        allSkills={allSkills}
      />

      <p className="text-gray-600 my-6 sm:my-8 text-sm sm:text-base">
        Found <span className="font-bold">{mentors.length}</span>{" "}
        {mentors.length > 1 ? "mentors" : "mentor"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} onNavigate={navigate} />
        ))}
      </div>

      <div className="flex flex-row justify-between items-center gap-4 sm:gap-0 mt-8 text-sm sm:text-base">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="py-2 px-4 bg-(--primary-color) text-white rounded disabled:bg-gray-300 cursor-pointer"
        >
          Previous
        </button>
        <div>
          Page {page + 1} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
          className="py-2 px-4 bg-(--primary-color) text-white rounded disabled:bg-gray-300 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Mentors;