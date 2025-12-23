import React from 'react'

const ViewCourseReviews = () => {

    const {courseId} = useParams();
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
    let response = await api.get(`/reviews/course/${courseId}`);
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

export default ViewCourseReviews
