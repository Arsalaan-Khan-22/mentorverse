import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CourseCreateForm from "../../components/mentorComponents/CourseCreateForm";
import { useDropzone } from "react-dropzone";
import api from "../../api/axios";
import axios from "axios";

const CourseUpdate = () => {
  //prettier-ignore
  const {register, handleSubmit, formState:{errors, isDirty}, reset} = useForm({reValidateMode : "onsubmit"});
  const [categories, setCategories] = useState(null);
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);

  const fetchCategories = async () => {
    //prettier-ignore
    let response = await api.get("courses/categories");
    setCategories(response.data.data);
  };

  const fetchCourseByCourseId = async () => {
    let response = await api.get(
      `/course/${courseId}`
    );
    console.log(response.data);
    setCourse(response.data.data.course);
    setImage({url: response.data.data.course.thumbnail});
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

  const updateCourseToDatabase = async (data) => {
    //prettier-ignore
    let response = await api.put(`mentors/course/update/${courseId}`, data);
    console.log(response.data);
    return response.data.data.id;
  };

  const submitHandler = async (data) => {
    if(!image) {
      setError(true)
      return;
    }

    setLoading(true);
    data.category = { id: data.category };
    if(isThumbnailChanged) {
      const imageInfo = await uploadImageToCloud();
      data.thumbnail = imageInfo.url;
      data.publicId = imageInfo.publicId;
    } else {
      data.thumbnail = course.thumbnail;
      data.publicId = course.publicId;
    }
      const courseId = await updateCourseToDatabase(data);
      navigate(`/mentor/courses`);  
    };

  const handleCancel = (e) => {
    e.preventDefault();
    const isCancelled = confirm("Do you really want to cancel");
    isCancelled && navigate(-1); // Apply logic for where the user came from
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
      setIsThumbnailChanged(true);
    }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { "image/*": [] },
      maxSize: 10 * 1024 * 1024, // 10MB
    });

  useEffect(() => {
    fetchCourseByCourseId();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (course)
      reset({
        title: course.title,
        description: course.description,
        category: String(course.category.id),
        level: course.level,
        price: String(course.price),
      });
  }, [course]);

  return (
    <div className="px-24 py-32 bg-(--bg-color)">
      <h2 className="text-4xl tracking-wider font-bold">Update Course: {course?.title}</h2>

      <CourseCreateForm
        handleForm={{
          register,
          handleSubmit,
          submitHandler,
          errors,
          categories,
          loading,
          handleCancel,
          isDirty
        }}
        handleImage={{
          handleDeleteImagePreview,
          getRootProps,
          getInputProps,
          isDragActive,
          image,
          error,
          isThumbnailChanged
        }}
        mode={"edit"}
        courseId={courseId}
      />
    </div>
  );
};

export default CourseUpdate;
