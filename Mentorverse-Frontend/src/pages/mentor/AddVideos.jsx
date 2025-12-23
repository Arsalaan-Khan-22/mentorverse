import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { FiPlus, FiUpload, FiX } from "react-icons/fi";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import AddVideosForm from "../../components/mentorComponents/AddVideosForm";
import ShowVideos from "../../components/mentorComponents/ShowVideos";
import { useAuth } from "../../context/AuthContext";

const AddVideos = () => {
  const {user} = useAuth();
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

  const handleDeleteVideo = (videoOrder) => {
    setVideoList(
      videoList
        .filter((video) => video.videoOrder != videoOrder)
        .map((video, index) => ({ ...video, videoOrder: index + 1 }))
    );
    setVideoOrder(videoList[videoList.length - 1].videoOrder);
  };

  const submitHandler = (data) => {
    if (!image && !video) {
      setError({ ...error, image: true, video: true });
    } else if (!image) {
      setError({ ...error, image: true });
      console.log(error);
    } else if (!video) {
      setError({ ...error, video: true });
    } else {
      data.videoOrder = videoOrder;
      data.videoUrl = { url: video.url, file: video.file };
      data.thumbnail = { url: image.url, file: image.file };
      setVideoList([...videoList, data]);
      setVideoOrder((prev) => prev + 1);
      reset();
      setVideo(null);
      setImage(null);
      console.log(data);
    }
  };

  const uploadThumbnailToCloud = async (thumbnailFile) => {
    const formData = new FormData();
    formData.append("file", thumbnailFile);
    formData.append("upload_preset", "my_upload_preset");
    formData.append("folder", "images/thumbnail");

    let response = await axios.post("https://api.cloudinary.com/v1_1/djcme4guh/image/upload", formData)
    console.log(response.data);
    return {
      url: response.data.secure_url,
      publicId: response.data.public_id
    };
  };

  // const uploadThumbnailToCloud = async (thumbnailFile) => {
  //   return {
  //     url: "https://dummyurl.com",
  //     publicId: "dummy/pubicid",
  //   };
  // };

  const uploadVideoToCloud = async (videoFile) => {
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("upload_preset", "my_upload_preset_video");
    formData.append("folder", "videos");

    let response = await axios.post("https://api.cloudinary.com/v1_1/djcme4guh/video/upload", formData);
    console.log(response.data);
    return {
      url: response.data.secure_url,
      publicId: response.data.public_id
    }
  }

  // const uploadVideoToCloud = async (videoFile) => {
  //   return {
  //     url: "https://dummyurl.com",
  //     publicId: "dummy/pubicid",
  //   };
  // };

  const addVideosToDatabase = async (videoObject) => {
    let response = await api.post(
      `/mentors/${mentorId}/courses/${courseId}/videos`,
      videoObject
    );
    console.log(response.data);
  };

  const handleSaveVideos = async () => {
    if(videoList.length === 0) {
      alert("No videos added, please add the video first");
      return;
    }
    setLoading(true);
    const uploadTasks = videoList.map(async (video) => {
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
    })

    await Promise.all(uploadTasks);

    videoList.forEach(v => {
      URL.revokeObjectURL(v.videoUrl.url)
      URL.revokeObjectURL(v.thumbnail.url)
    });    

    console.log("Videos Added Successfully");
    
    setLoading(false);
    navigate("/mentor/courses");
  };

  // useEffect(() => {
  //   return () => {
  //     if (image) URL.revokeObjectURL(image.url);
  //     if (video) URL.revokeObjectURL(video.url);
  //     videoList.forEach(v => URL.revokeObjectURL(v.videoUrl));

  //   };
  // }, [image, video, videoList]);

  return (
    <div className="px-24 py-32 bg-(--bg-color)">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl tracking-wider font-bold">
          Add Videos to Course
        </h2>
        <button
          onClick={handleSaveVideos}
          className={"bg-linear-(--gradient-secondary) text-white font-semibold px-6 py-2 text-lg rounded-lg cursor-pointer disabled:cursor-not-allowed " + (loading ? "opacity-70 " : "hover:-translate-y-0.5 transition-all duration-300")}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Videos"}
        </button>
      </div>

      <AddVideosForm
        handleForm={{ handleSubmit, submitHandler, register, errors, error }}
        //prettier-ignore
        handleThumbnail={{getThumbnailRootProps, getThumbnailInputProps, isThumbnailDragActive, image, handleDeleteImagePreview}}
        //prettier-ignore
        handleVideo={{getVideoRootProps, getVideoInputProps, isVideoDragActive, video}}
      />

      <ShowVideos videoList={videoList} handleDeleteVideo={handleDeleteVideo} mode={"create"} />
    </div>
  );
};

export default AddVideos;
