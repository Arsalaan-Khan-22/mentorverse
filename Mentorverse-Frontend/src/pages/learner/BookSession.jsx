import React, { useEffect, useState } from "react";
import MentorBookCard from "../../components/learnerComponents/MentorBookCard";
import BookingSlot from "../../components/learnerComponents/BookingSlot";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import BookingSummary from "../../components/learnerComponents/BookingSummary";
import { useAuth } from "../../context/AuthContext";

const BookSession = () => {
  const { user } = useAuth();
const learnerId = user.id;
  const { mentorId } = useParams();
  const [mentorData, setMentorData] = useState(null);
  const [mentorSlots, setMentorSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSlotDetails, setSelectedSlotDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchMentorByMentorId = async () => {
    let response = await api.get(`/mentors/profile/${mentorId}`);
    console.log(response.data);
    setMentorData(response.data.data);
  };

  const fetchMentorAvailabilty = async () => {
    let response = await api.get(`/slots/mentor/${mentorId}`);
    console.log(response.data.data);
    setMentorSlots(response.data.data);
  };

  const handleSelectedSlot = (slotId) => {
    setSelectedSlot(slotId);
    const slotDetails = mentorSlots.find(slot => slotId == slot.id);
    setSelectedSlotDetails(slotDetails)
  };

  const handlePayment = async () => {
    if (!selectedSlotDetails) {
      alert("Please select a slot first");
      return;
    }
    setLoading(true);

    const { createSlotBookingPayment } = await import('../../utils/paymentService');

    await createSlotBookingPayment({
      api,
      learnerId: user.id,
      mentorId,
      slotDetails: selectedSlotDetails,
      onSuccess: (response) => {
        console.log(response);
        alert("Session Booked Successfully");
        navigate("/learner/bookings");
      },
      onFailure: (error) => {
        console.error(error);
        if (error.response && error.response.status === 302) {
          alert("This slot is already booked");
        } else if (error.response && error.response.status === 403) {
          alert("You are not allowed to book this session");
        } else {
          alert("Booking failed. Please try again.");
        }
      },
    });
    setLoading(false);
  };





  useEffect(() => {
    fetchMentorByMentorId();
    fetchMentorAvailabilty();
  }, []);

  return (
    <div className="bg-(--bg-color) py-32 px-24">
     {mentorData && <MentorBookCard mentorData={mentorData} />}

    <div className="grid grid-cols-3 gap-8">
      <BookingSlot
        mentorSlots={mentorSlots}
        selectedSlot={selectedSlot}
        onHandleSelectedSlot={handleSelectedSlot}
      />

      <BookingSummary handlePayment={handlePayment} selectedSlot={selectedSlot} selectedSlotDetails={selectedSlotDetails} loading={loading} />
    </div>
    </div>
  );
};

export default BookSession;
