import React, { useEffect, useState } from "react";
import CourseViewCard from "../../components/learnerComponents/CourseViewCard";
import WhatWillLearn from "../../components/learnerComponents/WhatWillLearn";
import LearnerCourseContent from "../../components/learnerComponents/LearnerCourseContent";
import CourseSideCard from "../../components/learnerComponents/CourseSideCard";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import ReviewsSection from "../../components/learnerComponents/ReviewsSection";
import { useAuth } from "../../context/AuthContext";

const LearnerCourseView = () => {
  const { user } = useAuth();
  const learnerId = user?.id;
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [courseVideos, setCourseVideos] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const fetchCourseByCourseId = async () => {
    let response = await api.get(`course/${courseId}`);
    console.log(response.data);
    setCourseData(response.data.data);
  };

  const fetchCourseVideos = async () => {
    let response = await api.get(`mentors/courses/${courseId}/videos`);
    console.log(response.data);
    setCourseVideos(response.data.data);
  };

  const fetchEnrollment = async () => {
    let response = await api.get(
      `/enrollments/learner/${learnerId}/course/${courseId}`
    );
    console.log(response.data);
    if (response.data.data > 0) setIsEnrolled(true);
  };

  const fetchReviews = async () => {
    let response = await api.get(`/reviews/course/${courseId}`);
    console.log(response.data.data);
    setReviews(response.data.data.slice(0, 3));
  };

  const handleSubmitReview = async () => {
    const reviewData = {
      rating,
      comment,
    };
    let response = await api.post(
      `/reviews/course/${courseId}/learner/${learnerId}`,
      reviewData
    );
    console.log(response.data);
    setRating(0);
    setComment("");
    alert("Review Added Successfully");
    fetchReviews();
  };

  const handleEnrollment = async () => {
    if (!courseData) return;

    const { createCourseEnrollmentPayment } = await import('../../utils/paymentService');

    await createCourseEnrollmentPayment({
      api,
      courseId,
      learnerId,
      coursePrice: courseData.course.price,
      courseTitle: courseData.course.title,
      onSuccess: (response) => {
        console.log(response);
        setIsEnrolled(true);
        alert("Successfully enrolled!");
        navigate(`/learner/courses/watch/${courseId}`);
      },
      onFailure: (error) => {
        console.error(error);
        alert("Enrollment failed.");
      },
    });
  };

  const handleViewCourse = () => {
    navigate(`/learner/courses/watch/${courseId}`);
  };

  useEffect(() => {
    fetchCourseByCourseId();
    fetchCourseVideos();
    fetchEnrollment();
    fetchReviews();
  }, []);

  return (
    <div className="bg-(--bg-color) py-32 px-24">
      {courseData && (
        <CourseViewCard
          courseData={courseData}
          isEnrolled={isEnrolled}
          handleEnrollment={handleEnrollment}
          handleViewCourse={handleViewCourse}
        />
      )}

      <div className="grid grid-cols-3 mt-10 gap-8">
        <div className="col-start-1 col-end-3 flex flex-col gap-8">

          <LearnerCourseContent courseVideos={courseVideos} />
        </div>

        {courseData && (
          <CourseSideCard
            courseData={{
              thumbnail: courseData.course.thumbnail,
              price: courseData.course.price,
            }}
            isEnrolled={isEnrolled}
            handleEnrollment={handleEnrollment}
            handleViewCourse={handleViewCourse}
          />
        )}
      </div>

      <ReviewsSection
        hover={hover}
        setHover={setHover}
        rating={rating}
        setRating={setRating}
        isEnrolled={isEnrolled}
        reviews={reviews}
        comment={comment}
        setComment={setComment}
        onSubmitReview={handleSubmitReview}
        type={"courses"}
        id={courseId}
      />
    </div>
  );
};

export default LearnerCourseView;
