// import React, { useEffect, useState } from "react";
// import { FiCheck } from "react-icons/fi";
// import Videos from "../../components/learnerComponents/Videos";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";

// const WatchCourse = () => {
//    const {user} = useAuth();
//     const learnerId = user?.id;
//     const {courseId} = useParams();
//     const [videoList, setVideoList] = useState([]);
//     const [selectedVideo, setSelectedVideo] = useState(null);
//     const navigate = useNavigate();

//     const fetchAllVideos = async () => {
//         let response = await api.get(`learner/${learnerId}/courses/${courseId}/videos`);
//         console.log(response.data.data);
//         setVideoList(response.data.data);
//         setSelectedVideo(response.data.data[0]);
//     }

//     const handleVideoSelect = (video) => {
//         setSelectedVideo(video);
//     }

//     const checkEnrollment = async () => {
//     let response = await api.get(
//       `/enrollments/learner/${learnerId}/course/${courseId}`
//     );

//     if (response.data.data === 0) {
//       alert("You are not enrolled in this course.");
//       navigate(-1); // redirect back
//     }
//   };

//     useEffect(() => {
//         checkEnrollment();
//         fetchAllVideos();
//     }, [])

//   return (
//     <div className=" grid grid-cols-3 gap-10 pe-8 pb-32">
//       <Videos videoList={videoList} selectedVideo={selectedVideo} handleVideoSelect={handleVideoSelect} />
//     </div>
//   );
// };

// export default WatchCourse;

import React, { useEffect, useState } from "react";
import Videos from "../../components/learnerComponents/Videos";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const WatchCourse = () => {
  const { user } = useAuth();
  const learnerId = user?.id;
  const { courseId } = useParams();

  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [completedVideos, setCompletedVideos] = useState(new Set());

  const navigate = useNavigate();

  const fetchAllVideos = async () => {
    const response = await api.get(
      `/learner/${learnerId}/courses/${courseId}/videos`
    );

    setVideoList(response.data.data);
    setSelectedVideo(response.data.data[0]);
  };

  const fetchCompletedVideos = async () => {
    const response = await api.get(
      `/progress/course/${courseId}/learner/${learnerId}`
    );

    setCompletedVideos(new Set(response.data.data));
  };

  const handleVideoCompleted = async () => {
    if (!selectedVideo || completedVideos.has(selectedVideo.id)) return;

    await api.put(
      `/progress/complete?learnerId=${learnerId}&videoId=${selectedVideo.id}`
    );

    setCompletedVideos((prev) => new Set(prev).add(selectedVideo.id));

    const currentIndex = videoList.findIndex((v) => v.id === selectedVideo.id);
    if (currentIndex < videoList.length - 1) {
      setSelectedVideo(videoList[currentIndex + 1]);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const checkEnrollment = async () => {
    const response = await api.get(
      `/enrollments/learner/${learnerId}/course/${courseId}`
    );

    if (response.data.data === 0) {
      toast.error("You are not enrolled in this course.");
      navigate(-1);
    }
  };

  useEffect(() => {
    checkEnrollment();
    fetchAllVideos();
    fetchCompletedVideos();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-10 pe-8 pb-32">
         <Videos
          videoList={videoList}
          selectedVideo={selectedVideo}
          handleVideoSelect={handleVideoSelect}
          completedVideos={completedVideos}
          onVideoCompleted={handleVideoCompleted}
        />
    </div>
  );
};

export default WatchCourse;
