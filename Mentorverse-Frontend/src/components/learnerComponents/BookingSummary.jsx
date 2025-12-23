import React from "react";

const BookingSummary = ({
  handlePayment,
  selectedSlot,
  selectedSlotDetails,
  loading
}) => {
  return (
    <div 
      className="mt-8 h-fit bg-white p-8 rounded-2xl flex flex-col gap-6 sticky top-25 left-0"
      style={{ boxShadow: 'var(--shadow-primary)' }}
    >
      <h3 className="text-2xl font-semibold">Booking Summary</h3>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span>Mentor:</span>
          <span>Michael Chen</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Date & Time</span>
          {selectedSlotDetails 
          ? <span>
            {selectedSlotDetails.dayOfWeek[0] + selectedSlotDetails.dayOfWeek.slice(1).toLowerCase()},{" "}
            {selectedSlotDetails.startTime.slice(0, 5)}-
            {selectedSlotDetails.endTime.slice(0, 5)}
          </span>
          : <span>
            Not Selected
          </span>}
        </div>
        <div className="flex justify-between items-center">
          <span>Duration</span>
          <span>1 hour</span>
        </div>
      </div>
      <div 
        className="text-xl font-semibold flex items-center justify-between pb-6 border-b border-gray-300"
        style={{ color: 'var(--primary-color)' }}
      >
        <span>Total:</span>
        <span>₹{selectedSlotDetails ? selectedSlotDetails.price : 0}</span>
      </div>
      <button
        onClick={handlePayment}
        disabled={!selectedSlot || loading}
        className="text-white bg-linear-(--gradient-secondary) py-3 font-semibold rounded-xl cursor-pointer hover:-translate-y-0.5 transition-all duration-300 disabled:cursor-not-allowed disabled:hover:translate-none disabled:hover:shadow-none disabled:opacity-70"
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-secondary)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default BookingSummary;
