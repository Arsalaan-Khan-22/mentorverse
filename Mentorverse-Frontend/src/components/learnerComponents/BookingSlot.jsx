import React from 'react'
import SlotsSection from './SlotsSection'

const BookingSlot = ({mentorSlots, selectedSlot, onHandleSelectedSlot}) => {
  return (      
    <div className="mt-8 bg-white shadow-(--shadow-primary) p-8 rounded-2xl flex flex-col gap-6 col-start-1 col-end-3">
        <h3 className="text-2xl font-semibold">Select Day & Time</h3>
        {mentorSlots.length === 0 && <p className='text-center mt-5 text-gray-600 text-lg'>There are no slots available</p>}
        <SlotsSection mentorSlots={mentorSlots} selectedSlot={selectedSlot} onHandleSelectedSlot={onHandleSelectedSlot} />
    </div>
  )
}

export default BookingSlot
