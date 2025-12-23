import React, { useEffect, useState } from "react";
import MyCoursesCard from "../../components/learnerComponents/MyCoursesCard";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MyCourses = () => {
  const { user } = useAuth();
  const learnerId = user?.id;
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const coursesWithProgress = courses.map((course) => ({
    ...course,
    completionPercentage: Math.round(
      (course.completedVideos / course.totalVideos) * 100
    ),
  }));

  const fetchCourses = async () => {
    let response = await api.get(`/learners/${learnerId}/courses`);
    console.log(response.data);
    setCourses(response.data.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="px-24 py-32 bg-(--bg-color)">
      <h2 className="text-4xl tracking-wider font-bold">My Courses</h2>

      {courses.length === 0 && (
        <h3 className="text-center mt-10 text-lg text-gray-600">
          You haven't enrolled in any courses yet.{" "}
          <Link
            className="text-(--primary-color) font-semibold underline underline-offset-4"
            to={"/learner/courses"}
          >
            Purchase course
          </Link>
        </h3>
      )}

      <div className="mt-10 grid grid-cols-4 gap-8">
        {coursesWithProgress.map((course) => {
          return <MyCoursesCard key={course.id} course={course} onNavigate={navigate} />;
        })}
      </div>
    </div>
  );
};

export default MyCourses;
