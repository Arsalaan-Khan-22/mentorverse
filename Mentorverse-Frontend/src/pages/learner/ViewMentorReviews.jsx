import React, { useEffect, useState } from 'react'
import ReviewsSection from '../../components/learnerComponents/ReviewsSection'
import { useParams } from 'react-router-dom';
import api from '../../api/axios';

const ViewMentorReviews = () => {

    const {mentorId} = useParams();
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
    let response = await api.get(`/reviews/mentor/${mentorId}`);
    setReviews(response.data.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (  
    <div className="bg-(--bg-color) py-32 px-24">
        <h2 className="text-4xl tracking-wider font-bold">Reviews</h2>
      <ReviewsSection reviews={reviews} mode={"view"} />
    </div>
  )
}

export default ViewMentorReviews
