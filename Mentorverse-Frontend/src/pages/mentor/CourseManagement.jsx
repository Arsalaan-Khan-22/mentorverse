import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import CourseManagementCard from "../../components/mentorComponents/CourseManagementCard";
import CreateCourseButton from "../../components/mentorComponents/CreateCourseButton";
import { useAuth } from "../../context/AuthContext";

const CourseManagement = () => {
  const {user} = useAuth();
  const mentorId = user?.id;
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchMentorCourses = async () => {
    try {
      //prettier-ignore
        let response = await api.get(`/mentors/courses/${mentorId}`);
        console.log(response.data.data);
        setCourses(response.data.data);
    } catch(err) {
      console.log(err.response?.data);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      let confirmDelete = confirm("Are you sure you want to delete this course");
      if (confirmDelete) {
        let response = await api.delete(`/mentors/courses/delete/${courseId}`);
        fetchMentorCourses();
      }
    } catch(err) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    fetchMentorCourses();
  }, []);

  return (
    <div className="px-24 py-32 bg-(--bg-color)">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl tracking-wider font-bold">
          Course Management
        </h2>
        <CreateCourseButton />
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {courses.length === 0 && <h2 className="text-lg">You haven't created any course yet</h2>}
        {courses.map((course) => {
          return (
            <CourseManagementCard
              key={course.course.id}
              course={course}
              onNavigate={navigate}
              onDelete={deleteCourse}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseManagement;
