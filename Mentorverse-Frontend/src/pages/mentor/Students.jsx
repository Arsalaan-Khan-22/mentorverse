import React, { useEffect, useState } from "react";
import StudentCard from "../../components/mentorComponents/StudentCard";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Students = () => {
  const {user} = useAuth();
  const mentorId = user?.id;
  const [studentInfo, setStudentInfo] = useState([]);

  const fetchStudentInfo = async () => {
    try {
      let response = await api.get(`/mentors/students/${mentorId}`);
      setStudentInfo(response.data.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  return (
    <div className="bg-(--bg-color) py-32 px-24 ">
      <h2 className="text-4xl font-bold tracking-wide">My Students</h2>
      <div className="mt-15 flex gap-8 flex-wrap">
        {studentInfo.length === 0 && (
          <h3 className="w-full text-center text-lg text-gray-600">
            You don't have any students yet
          </h3>
        )}
        {studentInfo.map((student) => (
          <StudentCard key={student.learnerId} studentInfo={student} />
        ))}
      </div>
    </div>
  );
};

export default Students;
