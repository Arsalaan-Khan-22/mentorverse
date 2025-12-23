import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import AddVideosForm from "../../components/mentorComponents/AddVideosForm";
import ShowVideos from "../../components/mentorComponents/ShowVideos";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const UpdateVideos = () => {
  const { user } = useAuth();
  const mentorId = user?.id;
  const { courseId } = useParams();
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState({ image: false, video: false });
  //prettier-ignore
  const {register, handleSubmit, formState: { errors }, reset} = useForm({ reValidateMode: "onsubmit" });
  const [videoList, setVideoList] = useState([]);
  const [videoOrder, setVideoOrder] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [originalVideoList, setOriginalVideoList] = useState([]);
  const navigate = useNavigate();

  //Handle video thumbnail
  const onThumbnailDrop = useCallback((acceptedFiles, fileRejection) => {
    if (fileRejection.length > 0) {
      fileRejection[0].errors[0].code == "file-invalid-type" &&
        alert("Invalid image type");
      fileRejection[0].errors[0].code == "file-too-large" &&
        alert("Image size exceeded 10MB");
    }
    const file = acceptedFiles[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage({ url, name: file.name, file });
    setError((prev) => ({ ...prev, image: false }));
  }, []);

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
    isDragActive: isThumbnailDragActive,
  } = useDropzone({
    onDrop: onThumbnailDrop,
    accept: { "image/*": [] },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  //Handle Video
  const onVideoDrop = useCallback((acceptedFiles, fileRejection) => {
    if (fileRejection.length > 0) {
      fileRejection[0].errors[0].code == "file-invalid-type" &&
        alert("Invalid video type");
      fileRejection[0].errors[0].code == "file-too-large" &&
        alert("Video size exceeded 50MB");
      return;
    }
    const file = acceptedFiles[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideo({ url, name: file.name, file });
    setError((prev) => ({ ...prev, video: false }));
  }, []);

  const {
    getRootProps: getVideoRootProps,
    getInputProps: getVideoInputProps,
    isDragActive: isVideoDragActive,
  } = useDropzone({
    onDrop: onVideoDrop,
    accept: { "video/*": [] },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const handleDeleteImagePreview = () => {
    setImage(null);
  };

  const handleDeleteVideo = (identifier) => {
    const updatedList = videoList
      .filter((v) => v.id !== identifier && v.videoUrl?.url !== identifier)
      .map((v, idx) => ({ ...v, videoOrder: idx + 1 }));

    setVideoList(updatedList);
    setIsChanged(true);
  };

  const submitHandler = (data) => {
    if (!image || !video) {
      setError({ image: !image, video: !video });
      return;
    }

    const newVideo = {
      ...data,
      videoUrl: { url: video.url, file: video.file },
      thumbnail: { url: image.url, file: image.file },
    };

    const updatedList = [...videoList, newVideo].map((v, idx) => ({
      ...v,
      videoOrder: idx + 1,
    }));

    setVideoList(updatedList);
    setIsChanged(true);
    reset();
    setVideo(null);
    setImage(null);
  };

  const uploadThumbnailToCloud = async (thumbnailFile) => {
    // const formData = new FormData();
    // formData.append("file", thumbnailFile);
    // formData.append("upload_preset", "my_upload_preset");
    // formData.append("folder", "images/thumbnail");

    // let response = await axios.post(
    //   "https://api.cloudinary.com/v1_1/djcme4guh/image/upload",
    //   formData
    // );
    // console.log(response.data);
    // return {
    //   url: response.data.secure_url,
    //   publicId: response.data.public_id,
    // };

    return {
      url: "dummyurl.com",
      publicId: "dummyId"
    };
  };

  const uploadVideoToCloud = async (videoFile) => {
    // const formData = new FormData();
    // formData.append("file", videoFile);
    // formData.append("upload_preset", "my_upload_preset_video");
    // formData.append("folder", "videos");

    // let response = await axios.post(
    //   "https://api.cloudinary.com/v1_1/djcme4guh/video/upload",
    //   formData
    // );
    // console.log(response.data);
    // return {
    //   url: response.data.secure_url,
    //   publicId: response.data.public_id,
    // };

    return {
      url: "dummyurl.com",
      publicId: "dummyId"
    };
  };

  const addVideosToDatabase = async (videoObject) => {
    let response = await api.post(
      `/mentors/${mentorId}/courses/${courseId}/videos`,
      videoObject
    );
    console.log(response.data);
  };

  const handleSaveVideos = async () => {
    if (videoList.length === 0) {
      alert("No videos added, please add the video first");
      return;
    }

    setLoading(true);

    const deletedVideos = originalVideoList.filter(
      (orig) => !videoList.some((v) => v.id === orig.id)
    );

    const deleteTasks = deletedVideos.map(async (video) =>
     await api.delete(`/mentors/courses/delete-video/${video.id}`)
    );

    const newVideos = videoList.filter((v) => !v.id);
    const uploadTasks = newVideos.map(async (video) => {
      let thumbnailInfo = await uploadThumbnailToCloud(video.thumbnail.file);
      let videoInfo = await uploadVideoToCloud(video.videoUrl.file);
      let videoObject = {
        title: video.title,
        durationMinute: video.durationMinute,
        videoOrder: video.videoOrder,
        videoUrl: videoInfo.url,
        thumbnail: thumbnailInfo.url,
        videoPublicId: videoInfo.publicId,
        thumbnailPublicId: thumbnailInfo.publicId,
      };
      await addVideosToDatabase(videoObject);
    });

    await Promise.all([...deleteTasks, ...uploadTasks]);

    videoList.forEach((v) => {
      if (v.videoUrl?.url) URL.revokeObjectURL(v.videoUrl.url);
      if (v.thumbnail?.url) URL.revokeObjectURL(v.thumbnail.url);
    });

    setOriginalVideoList(videoList); // update original after save
    setIsChanged(false);
    setLoading(false);
    alert("Changes saved successfully!");
  };

  // New
  const fetchAllVideos = async () => {
    let response = await api.get(`/mentors/courses/${courseId}/videos`);
    setVideoList(response.data.data);
    setOriginalVideoList(response.data.data);
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <div className="px-24 py-32 bg-(--bg-color)">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl tracking-wider font-bold">Manage Videos</h2>
        {isEditing ? (
          <button
            onClick={handleSaveVideos}
            disabled={!isChanged || loading} // disabled if no changes or loading
            className={`bg-linear-(--gradient-secondary) text-white font-semibold px-6 py-2 text-lg rounded-lg cursor-pointer disabled:cursor-not-allowed ${
              !isChanged || loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:-translate-y-0.5 transition-all duration-300"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-linear-(--gradient-secondary) text-white font-semibold px-6 py-2 text-lg rounded-lg cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing && (
        <AddVideosForm
          handleForm={{ handleSubmit, submitHandler, register, errors, error }}
          //prettier-ignore
          handleThumbnail={{getThumbnailRootProps, getThumbnailInputProps, isThumbnailDragActive, image, handleDeleteImagePreview}}
          //prettier-ignore
          handleVideo={{getVideoRootProps, getVideoInputProps, isVideoDragActive, video}}
        />
      )}

      <ShowVideos
        videoList={videoList}
        handleDeleteVideo={handleDeleteVideo}
        mode={"edit"}
        isEditing={isEditing}
      />
    </div>
  );
};

export default UpdateVideos;

// import axios from "axios";
// import React, { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import AddVideosForm from "../../components/mentorComponents/AddVideosForm";
// import ShowVideos from "../../components/mentorComponents/ShowVideos";
// import api from "../../api/axios";

// const UpdateVideos = () => {
//   const mentorId = 1;
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const [image, setImage] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [uploadError, setUploadError] = useState({ image: false, video: false });
//   const { register, handleSubmit, formState: { errors }, reset } = useForm({ reValidateMode: "onsubmit" });

//   const [videoList, setVideoList] = useState([]);
//   const [videoOrder, setVideoOrder] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isChanged, setIsChanged] = useState(false);

//   // Thumbnail drop
//   const onThumbnailDrop = useCallback((acceptedFiles, fileRejection) => {
//     if (fileRejection.length > 0) {
//       const code = fileRejection[0].errors[0].code;
//       if (code === "file-invalid-type") alert("Invalid image type");
//       if (code === "file-too-large") alert("Image size exceeded 10MB");
//     }
//     const file = acceptedFiles[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     setImage({ url, name: file.name, file });
//     setUploadError(prev => ({ ...prev, image: false }));
//     setIsChanged(true);
//   }, []);

//   const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps, isDragActive: isThumbnailDragActive } =
//     useDropzone({ onDrop: onThumbnailDrop, accept: { "image/*": [] }, maxSize: 10 * 1024 * 1024 });

//   // Video drop
//   const onVideoDrop = useCallback((acceptedFiles, fileRejection) => {
//     if (fileRejection.length > 0) {
//       const code = fileRejection[0].errors[0].code;
//       if (code === "file-invalid-type") alert("Invalid video type");
//       if (code === "file-too-large") alert("Video size exceeded 50MB");
//       return;
//     }
//     const file = acceptedFiles[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     setVideo({ url, name: file.name, file });
//     setUploadError(prev => ({ ...prev, video: false }));
//     setIsChanged(true);
//   }, []);

//   const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isVideoDragActive } =
//     useDropzone({ onDrop: onVideoDrop, accept: { "video/*": [] }, maxSize: 50 * 1024 * 1024 });

//   const handleDeleteImagePreview = () => {
//     setImage(null);
//     setIsChanged(true);
//   };

//   const handleDeleteVideo = (videoOrder, videoId) => {
//     const updatedList = videoList
//       .filter(v => v.videoOrder !== videoOrder)
//       .map((v, index) => ({ ...v, videoOrder: index + 1 }));
//     setVideoList(updatedList);
//     setVideoOrder(updatedList.length ? updatedList[updatedList.length - 1].videoOrder + 1 : 1);
//     setIsChanged(true);
//   };

//   // Parse mm:ss into minutes
//   const parseDuration = (value) => {
//     const [mm, ss] = value.split(":").map(Number);
//     return mm + ss / 60;
//   };

//   const submitHandler = (data) => {
//     if (!image || !video) {
//       setUploadError({ image: !image, video: !video });
//       return;
//     }
//     data.videoOrder = videoOrder;
//     data.durationMinute = parseDuration(data.durationMinute);
//     data.videoUrl = { url: video.url, file: video.file };
//     data.thumbnail = { url: image.url, file: image.file };
//     setVideoList([...videoList, data]);
//     setVideoOrder(prev => prev + 1);
//     reset();
//     setVideo(null);
//     setImage(null);
//     setIsChanged(true);
//   };

//   // Cloudinary upload helpers
//   const uploadThumbnailToCloud = async (thumbnailFile) => {
//     const formData = new FormData();
//     formData.append("file", thumbnailFile);
//     formData.append("upload_preset", "my_upload_preset");
//     formData.append("folder", "images/thumbnail");
//     const response = await axios.post("https://api.cloudinary.com/v1_1/djcme4guh/image/upload", formData);
//     return { url: response.data.secure_url, publicId: response.data.public_id };
//   };

//   const uploadVideoToCloud = async (videoFile) => {
//     const formData = new FormData();
//     formData.append("file", videoFile);
//     formData.append("upload_preset", "my_upload_preset_video");
//     formData.append("folder", "videos");
//     const response = await axios.post("https://api.cloudinary.com/v1_1/djcme4guh/video/upload", formData);
//     return { url: response.data.secure_url, publicId: response.data.public_id };
//   };

//   const handleSaveVideos = async () => {
//     if (!isChanged) return;
//     if (videoList.length === 0) {
//       alert("No videos added");
//       return;
//     }
//     setLoading(true);

//     const uploadTasks = videoList.map(async (video) => {
//       let thumbnailInfo, videoInfo;
//       if (video.thumbnail?.file) thumbnailInfo = await uploadThumbnailToCloud(video.thumbnail.file);
//       if (video.videoUrl?.file) videoInfo = await uploadVideoToCloud(video.videoUrl.file);

//       const videoObject = {
//         id: video.id,
//         title: video.title,
//         durationMinute: video.durationMinute,
//         videoOrder: video.videoOrder,
//         videoUrl: videoInfo ? videoInfo.url : video.videoUrl,
//         thumbnail: thumbnailInfo ? thumbnailInfo.url : video.thumbnail,
//         videoPublicId: videoInfo ? videoInfo.publicId : video.videoPublicId,
//         thumbnailPublicId: thumbnailInfo ? thumbnailInfo.publicId : video.thumbnailPublicId,
//       };

//       if (video.id) {
//         await api.put(`/mentors/${mentorId}/courses/${courseId}/videos/${video.id}`, videoObject);
//       } else {
//         await api.post(`/mentors/${mentorId}/courses/${courseId}/videos`, videoObject);
//       }
//     });

//     await Promise.all(uploadTasks);

//     videoList.forEach(v => {
//       if (v.videoUrl?.url) URL.revokeObjectURL(v.videoUrl.url);
//       if (v.thumbnail?.url) URL.revokeObjectURL(v.thumbnail.url);
//     });

//     setLoading(false);
//     setIsEditing(false);
//     setIsChanged(false);
//     navigate("/mentor/courses");
//   };

//   // Fetch existing videos
//   useEffect(() => {
//     const fetchAllVideos = async () => {
//       const response = await api.get(`/mentors/courses/${courseId}/videos`);
//       setVideoList(response.data.data);
//       setVideoOrder(response.data.data.length + 1);
//     };
//     fetchAllVideos();
//   }, [courseId]);

//   return (
//     <div className="px-24 py-32 bg-(--bg-color)">
//       <div className="flex justify-between items-center">
//         <h2 className="text-4xl tracking-wider font-bold">Manage Course Videos</h2>
//         {isEditing ? (
//           <button
//             onClick={handleSaveVideos}
//             className={"bg-linear-(--gradient-secondary) text-white font-semibold px-6 py-2 text-lg rounded-lg cursor-pointer disabled:cursor-not-allowed " +
//               (loading ? "opacity-70 " : "hover:-translate-y-0.5 transition-all duration-300")}
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         ) : (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="bg-linear-(--gradient-secondary) text-white font-semibold px-6 py-2 text-lg rounded-lg cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
//           >
//             Edit
//           </button>
//         )}
//       </div>

//       {isEditing && (
//         <AddVideosForm
//           handleForm={{ handleSubmit, submitHandler, register, errors, error: uploadError }}
//           handleThumbnail={{ getThumbnailRootProps, getThumbnailInputProps, isThumbnailDragActive, image, handleDeleteImagePreview }}
//           handleVideo={{ getVideoRootProps, getVideoInputProps, isVideoDragActive, video }}
//         />
//       )}

//       <ShowVideos
//         videoList={videoList}
//         handleDeleteVideo={handleDeleteVideo}
//         mode={isEditing ? "edit" : "view"}
//         isEditing={isEditing}
//       />
//     </div>
//   );
// };

// export default UpdateVideos;
