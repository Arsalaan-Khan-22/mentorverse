import React from "react";
import {
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiX,
} from "react-icons/fi";
import { TbCancel, TbClockCancel } from "react-icons/tb";

const BookingCard = ({ booking, onHandleStatus, onCancelSession, mode }) => {
  console.log(booking)
  const getEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    return endDate.toTimeString().slice(0, 5);
  };

  return (
    <div className="flex items-center gap-7 bg-white shadow-(--card-shadow) p-6 w-full rounded-xl">
      <img
        className="w-20 rounded-full border-3 border-(--primary-color)"
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        alt="dummy image"
      />
      <div className="flex flex-col gap-5 grow">
        <h2 className="text-2xl font-semibold tracking-wide">
          {booking.userName}
        </h2>
        <div className="text-gray-500 text-md font-medium flex gap-7">
          <span className="flex items-center gap-1">
            <FiCalendar /> {booking.slotDate}
          </span>
          <span className="flex items-center gap-1">
            <FiClock /> {booking.slotTime.slice(0, 5)} -{" "}
            {getEndTime(booking.slotTime, 60)}{" "}
            {/* logic for hours */}
          </span>
          <span>₹{booking.price}</span>
        </div>
      </div>

      {/* For Mentors */}
      {mode === "mentor" && booking.status == "ACTIVE" && (
        <div className="flex gap-5">
          <button className="font-semibold bg-[#d1fae5] text-[#059669] py-3 px-5 rounded-2xl cursor-pointer">
            <span className="flex items-center gap-2">
              <FiCheck /> Active
            </span>
          </button>
        </div>
      )}
      {mode === "mentor" && booking.status == "PENDING" && (
        <div className="flex gap-5 items-center">
          <button
            onClick={() => onHandleStatus(booking.id, "APPROVED")}
            className="flex items-center gap-2 font-semibold bg-[#22c55e] text-white text-sm h-11 px-6 rounded-lg cursor-pointer hover:-translate-y-0.5 transition-all duration-300 hover:shadow-(--card-shadow)"
          >
            <FiCheck /> Accept
          </button>
          <button
            onClick={() => onHandleStatus(booking.id, "REJECTED")}
            className="flex items-center gap-2 font-semibold text-[#ef4444] border-2 border-[#ef4444] text-sm h-11 px-6 rounded-lg cursor-pointer hover:bg-[#ef4444] hover:text-white transition-all duration-300"
          >
            <FiX /> Reject
          </button>
        </div>
      )}
      {mode === "mentor" &&
        booking.status == "CANCELLED" && (
          <button className={"font-semibold text-[#ef4444] py-3 px-5 rounded-2xl cursor-pointer " + (booking.status == "REJECTED" && "bg-[#f2c4c4]")}>
              <span className="flex items-center gap-2">
                <TbCancel /> Cancelled
              </span>
          </button>
        )}
      {mode === "mentor" && booking.status == "COMPLETED" && (
        <button className="font-semibold text-[#059669] py-3 px-5 rounded-2xl cursor-pointer">
          <span className="flex items-center gap-2">
            <FiCheckCircle /> Completed
          </span>
        </button>
      )}

      {/* For Learners */}
      {mode === "learner" && (
        <div className="flex gap-5">
          <button
            className={
              "font-semibold py-3 px-5 rounded-2xl cursor-pointer " +
              (booking.status == "ACTIVE"
                ? "bg-[#d1fae5] text-[#059669]"
                : "") +
              (booking.status == "CANCELLED" ? "text-[#ef4444]" : "") +
              (booking.status == "COMPLETED" ? "text-[#059669]" : "")
            }
          >
            {booking.status == "ACTIVE" && (
              <div className="flex items-center gap-2">
                <FiCheck /> Active
              </div>
            )}
            {booking.status == "CANCELLED" && (
              <div className="flex items-center gap-2">
                <TbCancel /> Cancelled
              </div>
            )}
            {booking.status === "COMPLETED" && (
              <div className="flex items-center gap-2">
                <FiCheckCircle /> Completed
              </div>
            )}
          </button>
          {booking.status === "ACTIVE" && (
            <button
              onClick={() => onCancelSession(booking.id)}
              className="flex items-center gap-2 font-semibold text-[#ef4444] border-2 border-[#ef4444] text-sm h-11 px-6 rounded-lg cursor-pointer hover:bg-[#ef4444] hover:text-white transition-all duration-300"
            >
              <FiX /> Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingCard;
