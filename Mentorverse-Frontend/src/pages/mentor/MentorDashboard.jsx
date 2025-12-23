import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/sharedComponents/StatsCard";
import { FiBook, FiCalendar, FiUsers } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import RecentCourses from "../../components/mentorComponents/RecentCourses";
import UpcomingSessions from "../../components/sharedComponents/UpcommingSessions";
import api from "../../api/axios";
import QuickActionCard from "../../components/sharedComponents/QuickActionCard";
import CreateCourseButton from "../../components/mentorComponents/CreateCourseButton";

const MentorDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState([
    {
      label: "Total Courses",
      value: 0,
      icon: FiBook,
      iconColor: "#3b82f6",
      iconBgColor: "rgba(59, 130, 246, 0.1)",
    },
    {
      label: "Total Learners",
      value: 0,
      icon: FiUsers,
      iconColor: "#22c55e",
      iconBgColor: "rgba(34, 197, 94, 0.1)",
    },
    {
      label: "Total Earnings",
      value: 0,
      icon: FaIndianRupeeSign,
      iconColor: "#a855f7",
      iconBgColor: "rgba(168, 85, 247, 0.1)",
    },
    {
      label: "Upcoming Sessions",
      value: 0,
      icon: FiCalendar,
      iconColor: "#f97316",
      iconBgColor: "rgba(249, 115, 22, 0.1)",
    },
  ]);

  const [mentorName, setMentorName] = useState(null);
  const [recentCourses, setRecentCourses] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  const otherLinks = [
  { icon: FiBook, title: "Manage Courses", to: "/mentor/courses" },
  { icon: FiCalendar, title: "View Bookings", to: "/mentor/bookings" },
  { icon: FiUsers, title: "My Students", to: "/mentor/students" },
  { icon: FaIndianRupeeSign, title: "View Earnings", to: "/mentor" },
];


  useEffect(() => {
    if (!user || user.role !== "MENTOR") {
      navigate("/unauthorized"); // or "/login"
    }
  }, [user]);

  const mentorId = user?.id;

  const fetchMentorDashboardStats = async () => {
    try {
      const response = await api.get(`/mentors/dashboard-stats`);
      const values = Object.values(response.data.data);
  
      setStats((prev) =>
        prev.map((item, index) => ({ ...item, value: values[index + 1] }))
      );
      setMentorName(values[0]);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const fetchRecentCourses = async () => {
    try {
      const response = await api.get(`/mentors/dashboard-courses-stats`);
      setRecentCourses(response.data.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const fetchUpcomingSessions = async () => {
    try {
      const response = await api.get(`/mentors/dashboard-upcoming-sessions`);
      setUpcomingSessions(response.data.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const cancelSession = async (bookingId) => {
    if (confirm("Do you really want to cancel this session?")) {
      await api.put(`/bookings/cancel-session/${mentorId}`, bookingId);
      fetchUpcomingSessions();
    }
  };

  useEffect(() => {
    if (mentorId) {
      fetchMentorDashboardStats();
      fetchRecentCourses();
      fetchUpcomingSessions();
    }
  }, [mentorId]);

  return (
    <div className="bg-(--bg-color) py-32 px-24">
      <div className="flex justify-between px-14">
        <div>
          <h2 className="text-[2.5rem] font-bold tracking-wider">
            Welcome back, {mentorName}
          </h2>
          <p className="text-gray-600 text-lg mt-3 mb-9">
            Manage your courses and students
          </p>
        </div>

        <CreateCourseButton />
      </div>

      <div className="flex justify-around gap-7">
        {stats.map((item) => (
          <StatsCard key={item.label} stats={item} />
        ))}
      </div>

      <div className="py-9 flex justify-between gap-10">
        <RecentCourses recentCourses={recentCourses} />
        <UpcomingSessions
          upcomingSessions={upcomingSessions}
          onCancelSession={cancelSession}
          mode="mentor"
        />
      </div>

      <div className="flex justify-center gap-7">
        {otherLinks.map((data) => (
          <QuickActionCard key={data.title} data={data} />
        ))}
      </div>
    </div>
  );
};

export default MentorDashboard;
