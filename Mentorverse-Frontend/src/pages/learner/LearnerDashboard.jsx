import React, { useEffect, useState } from "react";
import { FiArrowRight, FiBook, FiCalendar, FiUsers } from "react-icons/fi";
import StatsCard from "../../components/sharedComponents/StatsCard";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import UpcomingSessions from "../../components/sharedComponents/UpcommingSessions";
import QuickActionCard from "../../components/sharedComponents/QuickActionCard";
import DashboardCourses from "../../components/learnerComponents/DashboardCourses";
import { useAuth } from "../../context/AuthContext";

const LearnerDashboard = () => {
  const {user} = useAuth();
  const learnerId = user?.id;
  const [learnerName, setLearnerName] = useState(null);
  const [stats, setStats] = useState([
    {
      label: "Active Bookings",
      value: 0,
      icon: FiCalendar,
      iconColor: "#3b82f6",
      iconBgColor: "rgba(59, 130, 246, 0.1)",
    },
    {
      label: "Enrolled Courses",
      value: 0,
      icon: FiBook,
      iconColor: "#22c55e",
      iconBgColor: "rgba(34, 197, 94, 0.1)",
    },
    {
      label: "Mentors Connected",
      value: 0,
      icon: FiUsers,
      iconColor: "#a855f7",
      iconBgColor: "rgba(168, 85, 247, 0.1)",
    },
    {
      label: "Total Sessions",
      value: 0,
      icon: FiCalendar,
      iconColor: "#f97316",
      iconBgColor: "rgba(249, 115, 22, 0.1)",
    },
  ]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const navigate = useNavigate();
  const [otherLinks, setOtherLinks] = useState([
    {
      icon: FiUsers,
      title: "Find Mentors",
    },
    {
      icon: FiBook,
      title: "Browse Courses",
    },
    {
      icon: FiCalendar,
      title: "My Bookings",
    },
    {
      icon: FiBook,
      title: "My Courses",
    },
  ]);

  const fetchLearnerDashboardStats = async () => {
    let response = await api.get(`/learners/dashboard-stats/${learnerId}`);
    console.log(response.data);
    const values = Object.values(response.data.data);
    setStats((prev) => {
      return prev.map((item, index) => ({ ...item, value: values[index + 1] }));
    });
    setLearnerName(values[0]);
  };

  const fetchUpcomingSessions = async () => {
    try {
      let response = await api.get(
        `/learners/dashboard-upcoming-sessions/${learnerId}`
      );
      setUpcomingSessions(response.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const cancelSession = async (bookingId) => {
    const isCancelled = confirm("Do you really want to cancel this session");
    if (isCancelled) {
      let response = await api.put(
        `/bookings/cancel-session/${learnerId}`,
        bookingId
      );
      console.log(response);
      fetchUpcomingSessions();
    }
  };

  const fetchCourses = async () => {
    let response = await api.get(`/learners/dashboard-courses/${learnerId}`);
    console.log(response.data)
    setCourseDetails(response.data.data);
  };

  useEffect(() => {
    fetchLearnerDashboardStats();
    fetchUpcomingSessions();
    fetchCourses();
  }, []);

  return (
    <div className="bg-(--bg-color) py-32 px-24">
      <div className="flex justify-between px-14">
        <div>
          <h2 className="text-[2.5rem] font-bold tracking-wider">
            Welcome back, {learnerName}
          </h2>
          <p className="text-gray-600 text-lg mt-3 mb-9">
            Continue your learning journey
          </p>
        </div>
      </div>

      <div className="flex justify-around gap-7">
        {stats.map((item) => (
          <StatsCard key={item.label} stats={item} />
        ))}
      </div>

      <div className="py-9 flex justify-between gap-10">
        <UpcomingSessions
          upcomingSessions={upcomingSessions}
          onCancelSession={cancelSession}
          mode={"learner"}
        />

        <DashboardCourses courseDetails={courseDetails} onNavigate={navigate} />
      </div>
      <div className="flex justify-center gap-7">
        {otherLinks.map((data, index) => {
          return <QuickActionCard key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default LearnerDashboard;
