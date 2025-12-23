import React from 'react'

const SlotsSection = ({ mentorSlots, selectedSlot, onHandleSelectedSlot }) => {

    const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    const slots = [...new Set(mentorSlots.map(slot => slot.dayOfWeek))]
    const sortedSlots = slots.sort((a, b) => days.indexOf(a) - days.indexOf(b));
  return (
    sortedSlots.map(slotName => <div key={slotName} className="flex flex-col gap-5">
        <h4 className="font-semibold text-lg">{slotName[0].concat(slotName.slice(1).toLowerCase())}</h4>
        <div className="text-sm flex items-center gap-3 font-medium flex-wrap">
          {mentorSlots
          .filter(slot => slot.dayOfWeek == slotName)
          .map((slot) => {
            return (
              <button onClick={() => onHandleSelectedSlot(slot.id)} disabled={!slot.available} key={slot.id} className={"relative overflow-hidden outline-2 px-6 py-3 rounded-lg outline-gray-200 cursor-pointer not-disabled:hover:bg-(--primary-color) not-disabled:hover:text-white not-disabled:hover:outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:before:absolute disabled:before:top-5 disabled:before:left-0 disabled:before:w-[110%] disabled:before:h-[0.1rem] disabled:before:bg-red-600 disabled:before:-rotate-18 disabled:opacity-50 " + ((selectedSlot == slot.id)? "bg-(--primary-color) text-white" : "bg-(--bg-color)")}>
                {slot.startTime.slice(0,5)}-{slot.endTime.slice(0,5)}
              </button>
            );
          })}
        </div>
      </div>)
  )
}

export default SlotsSection
