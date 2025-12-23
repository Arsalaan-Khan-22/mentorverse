import React from "react";
import { FiX } from "react-icons/fi";

const MentorManageSlots = ({ days, slots, dayOfWeek, setDayOfWeek, startTime, setStartTime, endTime, setEndTime, deleteSlot, handleAddSlot }) => {

  return (
    <div className="bg-white p-8 rounded-xl shadow-(--shadow-primary)">
      <h2 className="text-2xl font-semibold mb-4">Manage Availability</h2>
      
      <div className="flex items-center gap-4 mb-8">
        <select
          className="p-2 border rounded-lg"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
        >
          {days.map((d) => (
            <option key={d} value={d}>{d[0] + d.slice(1).toLowerCase()}</option>
          ))}
        </select>

        <input
          type="time"
          className="p-2 border rounded-lg"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <input
          type="time"
          className="p-2 border rounded-lg"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <button
          onClick={handleAddSlot}
          className="bg-(--primary-color) px-4 py-2 text-white rounded-lg cursor-pointer"
        >
          Add Slot
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {days.map(day => {
          const daySlots = slots.filter(s => s.dayOfWeek === day);
          if (daySlots.length === 0) return null;

          return (
            <div key={day}>
              <h3 className="font-semibold text-lg mb-1">{day[0] + day.slice(1).toLowerCase()}</h3>
              <div className="flex gap-3 flex-wrap">
                {daySlots.map(slot => (
                  <div
                    key={slot.id}
                    className="border px-5 py-2 rounded-lg flex items-center gap-3 bg-(--bg-color)"
                  >
                    {slot.startTime.slice(0,5)} - {slot.endTime.slice(0,5)}
                    <button
                      onClick={() => deleteSlot(slot.id)}
                      className="text-red-500 font-bold text-lg cursor-pointer"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default MentorManageSlots;
