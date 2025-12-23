import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const UpcomingSessions = ({ upcomingSessions, onCancelSession, mode }) => {
  return (
    <div className="px-8 py-10 rounded-2xl bg-white w-1/2 shadow-(--card-shadow) outline-(--primary-color) hover:outline-2 hover:outline-(--primary-color) hover:shadow-2xl transition-all duration-100">
      <div className="flex justify-between gap-15 mb-12">
        <h3 className="text-3xl font-bold tracking-wide">Upcoming Sessions</h3>
        <Link to={mode === "mentor" ? "/mentor/bookings" : "/learner/bookings"} className="flex gap-3 items-center text-(--primary-color) font-semibold text-sm">
          View All <FiArrowRight />
        </Link>
      </div>

      {(upcomingSessions.length == 0 && (
        <div className="text-center text-gray-700">
          There are no upcoming sessions available
        </div>
      )) ||
        upcomingSessions.map((session, index) => {
          const date = new Date(session.sessionDate);
          const sessionMonth = date.toLocaleString("default", {
            month: "long",
          });
          const sessionDate = date.getDate();
          const sessionYear = date.getFullYear();
          let [hours, minutes] = session.sessionTime.split(":");
          hours = parseInt(hours);
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || hours;
          return (
            <div
              key={index}
              className="flex justify-between items-center bg-(--bg-color) p-5 rounded-2xl mb-4"
            >
              <div className="flex items-center gap-5">
                <img
                  className="w-15 border-2 border-(--primary-color) rounded-full"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="dummy image"
                />
                <div>
                  <h4 className="text-lg font-bold mb-3">
                    {session.userName}
                  </h4>
                  {/* <p className="text-gray-700 text-sm">March 15, 2024 at 2:00 PM</p> */}
                  <p className="text-gray-700 text-sm">
                    {sessionMonth} {sessionDate}, {sessionYear} at {hours}:
                    {minutes} {ampm}
                  </p>
                </div>
              </div>
              {
                mode == "learner" && <button
                onClick={() => onCancelSession(session.bookingId)}
                className="border-2 rounded-md text-sm font-semibold text-red-500 px-7 h-fit py-3 cursor-pointer"
              >
                Cancel
              </button>
              }
            </div>
          );
        })}
    </div>
  );
};

export default UpcomingSessions;
