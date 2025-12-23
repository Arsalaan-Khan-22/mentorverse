import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import { FiArrowLeft} from "react-icons/fi";
import CourseView from "../../components/mentorComponents/CourseView";
import CourseStatistics from "../../components/mentorComponents/CourseStatistics";
import PriceCard from "../../components/mentorComponents/PriceCard";
import CourseContent from "../../components/mentorComponents/CourseContent";

const ViewCourse = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [courseVideos, setCourseVideos] = useState([]);
  const [courseStatistics, setCourseStatistics] = useState([
    {
      data: null,
      label: "Total Students"
    },
    {
      data: null,
      label: "Average Rating"
    },
    {
      data: null,
      label: "Total Reviews"
    },
    {
      data: null,
      label: "Total Videos"
    }
  ])
  const [priceDetails, setPriceDetails] = useState(null);

  const fetchCourseByCourseId = async () => {
    //prettier-ignore
    let response = await api.get(`course/${courseId}`);
    console.log(response.data);
    setCourseData(response.data.data);
    setPriceDetails(prev => ({...prev, price: response.data.data.course.price, 
      level: response.data.data.course.level,
      duration: response.data.data.totalHours}))
  };

  const fetchCourseVideos = async () => {
    //prettier-ignore
    let response = await api.get(`mentors/courses/${courseId}/videos`);
    console.log(response.data);
    setCourseVideos(response.data.data);
  }

  const fetchCourseStatistics = async () => {
    //prettier-ignore
    let response = await api.get(`mentors/course/${courseId}/statistics`);
    console.log(response.data);
    const dataArray = Object.values(response.data.data);
    setCourseStatistics(prev => prev.map((stats, index) => {
      return {...stats, data: dataArray[index]}
    }))
    setPriceDetails(prev => ({...prev, totalLectures: response.data.data.totalVideos}))
  }

  useEffect(() => {
    fetchCourseByCourseId();
    fetchCourseStatistics();
    fetchCourseVideos();
  }, []);

  return (
    courseData && (
      <div className="px-24 py-32 bg-(--bg-color)">
        <Link
          className="flex items-center gap-2 text-(--primary-color) font-medium"
          to={"/mentor/courses"}
        >
          <FiArrowLeft /> Back to Courses
        </Link>
        {/* <img src={null} alt="dummy image" /> */}

        <CourseView courseData={courseData} />

        <div className="mt-10 grid grid-cols-[2fr_1fr] gap-8">
          <div className="col-start-1 col-end-2 flex flex-col gap-8">

            <CourseContent courseVideos={courseVideos} />

            <CourseStatistics courseStatistics={courseStatistics} />
          </div>

          <PriceCard priceDetails={priceDetails} />
        </div>
      </div>
    )
  );
};

export default ViewCourse;
