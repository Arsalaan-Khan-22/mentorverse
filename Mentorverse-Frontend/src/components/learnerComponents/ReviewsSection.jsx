import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const ReviewsSection = ({
  hover,
  setHover,
  rating,
  setRating,
  isEnrolled,
  isBooked,
  reviews,
  onSubmitReview,
  comment,
  setComment,
  onNavigate,
  type,
  id,
  mode
}) => {
  return (
    <div className="mt-8 grid grid-cols-3 gap-8">
      <div className="bg-white shadow-lg p-6 rounded-2xl col-start-1 col-end-3">
        {mode != "view" &&  <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-semibold">Reviews</h3>
          {reviews.length >=3 && <button onClick={() => onNavigate(`/learner/${type}/${id}/reviews`)} className="text-(--primary-color) font-medium">View All Reviews</button>}
        </div> }
        <div className="flex flex-col gap-5">
          {reviews.length == 0 && <p className="text-center my-5 text-gray-600">{(isEnrolled || isBooked) ? "There are no reviews yet, be the first!" : "There are no reviews yet"}</p>}
          {reviews.map((review) => {
            const reviewDate = review.reviewDate.split("T")[0];
            return (
              <div key={review.id} className="flex gap-5 bg-(--bg-color) shadow-sm p-5 rounded-xl">
                <img
                  className="w-12 h-full border-2 border-(--primary-color) rounded-full"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden"
                  alt=""
                />
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold">{review.learnerName}</span>
                    <span className="text-gray-600 text-xs shrink-0">{reviewDate} </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {
                        [...Array(review.rating)].map((_, index) => <AiFillStar key={index} className="text-yellow-400 text-xl" />)
                    }
                  </div>
                  <p className="text-gray-600 text-sm ">
                    {review.comment}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* Add logic if user is not logged in then he can not add review */}
      {(isEnrolled || isBooked) && (
        <div className="bg-white shadow-lg p-6 rounded-2xl h-fit">
          <h3 className="text-2xl font-semibold mb-5">Write a Review</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) =>
                rating >= star ? (
                  <AiFillStar
                    key={star}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setRating(star)}
                    className={`text-4xl cursor-pointer transition-all duration-300 text-yellow-400`}
                  />
                ) : (
                  <AiOutlineStar
                    key={star}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setRating(star)}
                    className={`text-4xl cursor-pointer transition-all duration-300 ${
                      (hover || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                )
              )}
            </div>
            <textarea
            onChange={e => setComment(e.target.value)}
            value={comment}
              className="w-full outline-2 outline-gray-300 rounded-lg text-sm p-3 focus:outline-(--primary-color) focus:shadow-md transition-all duration-300"
              rows={3}
              placeholder="Write your review..."
              name=""
              id=""
            ></textarea>
            <button onClick={onSubmitReview} disabled={rating == 0} className="bg-linear-(--gradient-secondary) text-white font-semibold px-6 py-2 rounded-xl cursor-pointer mt-3 w-fit hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:hover:translate-none disabled:hover:shadow-none disabled:cursor-not-allowed">
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
