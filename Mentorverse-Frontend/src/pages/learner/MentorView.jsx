import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiClock, FiStar, FiUsers } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import MentorViewCard from "../../components/learnerComponents/MentorViewCard";
import MentorSkills from "../../components/learnerComponents/MentorSkills";
import MentorAvailabilty from "../../components/learnerComponents/MentorAvailabilty";
import api from "../../api/axios";
import ReviewsSection from "../../components/learnerComponents/ReviewsSection";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const MentorView = () => {
  const {user} = useAuth();
  const learnerId = user?.id;
  const { mentorId } = useParams();
  const [mentorData, setMentorData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isBooked, setIsBooked] = useState(false);
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mentorSlots, setMentorSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  const fetchMentorByMentorId = async () => {
    //prettier-ignore
    let response = await api.get(`/mentors/profile/${mentorId}`);
    console.log(response.data);
    setMentorData(response.data.data);
  };

  const fetchBooking = async () => {
    let response = await api.get(
      `/bookings/learner/${learnerId}/mentor/${mentorId}`
    );
    console.log(response.data);
    if (response.data.data > 0) setIsBooked(true);
  };

  const fetchReviews = async () => {
    let response = await api.get(`/reviews/mentor/${mentorId}`);
    console.log(response.data.data.slice(0,3));
    setReviews(response.data.data.slice(0,3));
  };

  const fetchMentorAvailabilty = async () => {
    let response = await api.get(`/slots/mentor/${mentorId}`)
    console.log(response.data.data);
    setMentorSlots(response.data.data);
  }

  const handleSubmitReview = async () => {
    const reviewData = {
      rating,
      comment,
    };
    let response = await api.post(
      `/reviews/mentor/${mentorId}/learner/${learnerId}`,
      reviewData
    );
    console.log(response.data);
    setRating(0);
    setComment("");
    toast.success("Review Added Successfully");
    fetchReviews();
    fetchMentorByMentorId();
  };

  const handleSelectedSlot = (slotId) => {
    setSelectedSlot(slotId);
    console.log(slotId);
  }

  useEffect(() => {
    fetchMentorByMentorId();
    fetchBooking();
    fetchReviews();
    fetchMentorAvailabilty();
  }, []);

  return (
    <div className="bg-(--bg-color) py-32 px-24">
      {mentorData && <MentorViewCard mentorData={mentorData} onNavigate={navigate} />}

      {/* Mentor Skills and Expertise */}
      {mentorData && <MentorSkills mentorSkills={mentorData.skills} />}

      {/* <div className="mt-8 grid grid-cols-3 gap-8"> */}
        <MentorAvailabilty mentorSlots={mentorSlots} selectedSlot={selectedSlot} onHandleSelectedSlot={handleSelectedSlot} />
        
      {/* </div> */}
      {mentorId && <ReviewsSection
        hover={hover}
        setHover={setHover}
        isBooked = {isBooked}
        rating={rating}
        setRating={setRating}
        reviews={reviews}
        comment={comment}
        setComment={setComment}
        onSubmitReview={handleSubmitReview}
        onNavigate={navigate}
        type={"mentors"}
        id={mentorId}
      />}
    </div>
  );
};

export default MentorView;
