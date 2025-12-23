import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import axios from "axios";
import CourseCreateForm from "../../components/mentorComponents/CourseCreateForm";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

const CourseCreatePage = () => {
  //Redirect to Videos upload

  //prettier-ignore
  const {user} = useAuth();
  const {register, handleSubmit, formState: { errors }, reset} = useForm({reValidateMode : "onsubmit"});
  const [categories, setCategories] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const mentorId = user?.id;

  const fetchCategories = async () => {
    //prettier-ignore
    let response = await api.get("courses/categories");
    setCategories(response.data.data);
  };

  const uploadImageToCloud = async () => {
    const formData = new FormData();
    formData.append("file", image.file);
    formData.append("upload_preset", "my_upload_preset");
    formData.append("folder", "images/thumbnail");

    let response = await axios.post(
      "https://api.cloudinary.com/v1_1/djcme4guh/image/upload",
      formData
    );
    return { url: response.data.secure_url, publicId: response.data.public_id };

    // return {url: "https://dummyurl.com", publicId: "dummy/publicid"};
  };

  const addCourseToDatabase = async (data) => {
    let response = await api.post(
      `/mentors/courses/create/${mentorId}`,
      data
    );
    console.log(response.data);
    return response.data.data.id;
  };

  const submitHandler = async (data) => {
    if (!image) {
      setError(true);
    } else {
      setLoading(true);
      // const imageInfo = await uploadImageToCloud();
      const imageInfo = await uploadImageToCloud();
      data.category = { id: data.category };
      data.thumbnail = imageInfo.url;
      data.publicId = imageInfo.publicId;
      const courseId = await addCourseToDatabase(data);
      reset();
      setImage(null);
      setLoading(false);
      navigate(`/mentor/course/${courseId}/add-videos`);
    }
  };

  const handleDeleteImagePreview = () => {
    setImage(null);
  };

  // Handle image preview
  const onDrop = useCallback((acceptedFiles, fileRejection) => {
    if (fileRejection.length > 0) {
      fileRejection[0].errors[0].code == "file-invalid-type" &&
        alert("Invalid file type");
      fileRejection[0].errors[0].code == "file-too-large" &&
        alert("File size exceeded 10MB");
        return;
    }
    const file = acceptedFiles[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage({ url, name: file.name, file });
    setError(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleCancel = (e) => {
    e.preventDefault();
    const isCancelled = confirm("Do you really want to cancel");
    isCancelled && navigate(-1); // Apply logic for where the user came from
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.url);
    };
  }, [image]);

  return (
    <div className="px-24 py-32 bg-(--bg-color)">
      <h2 className="text-4xl tracking-wider font-bold">Create New Course</h2>

      <CourseCreateForm
        handleForm={{
          register,
          handleSubmit,
          submitHandler,
          errors,
          categories,
          loading,
          handleCancel,
        }}
        handleImage={{
          handleDeleteImagePreview,
          getRootProps,
          getInputProps,
          isDragActive,
          image,
          error,
        }}
        mode={"create"}
      />
    </div>
  );
};

export default CourseCreatePage;
