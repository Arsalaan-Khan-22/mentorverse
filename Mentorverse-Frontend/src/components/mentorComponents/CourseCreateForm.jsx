import React from "react";
import { FiArrowRight, FiUpload, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const CourseCreateForm = ({
  handleForm: {
    register,
    handleSubmit,
    submitHandler,
    errors,
    categories,
    loading,
    handleCancel,
    isDirty,
  },
  handleImage: {
    handleDeleteImagePreview,
    getRootProps,
    getInputProps,
    isDragActive,
    image,
    error,
    isThumbnailChanged,
  },
  mode,
  courseId,
}) => {
  return (
    <form
      className="bg-white p-10 mt-15 rounded-2xl shadow-(--shadow-primary)"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex justify-between font-medium">
        <h3 className="text-2xl font-semibold">Course Information</h3>
        {mode == "edit" && (
          <Link
            className="flex items-center gap-2 text-(--primary-color)"
            to={`/mentor/course/${courseId}/update-videos`}
          >
            Next <FiArrowRight />
          </Link>
        )}
      </div>
      <div className="flex flex-row-reverse gap-10 py-10">
        <div className="w-full">
          <div className="flex flex-col gap-3">
            <label className="font-medium" htmlFor="course-title">
              Course Title
            </label>
            <input
              {...register("title", { required: true, minLength: 3 })}
              className={
                "w-full border-2 border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 " +
                (errors.title
                  ? "focus:outline-red-600"
                  : "focus:outline-(--primary-color)")
              }
              type="text"
              id="course-title"
              placeholder="Enter course title"
            />
            <p className="text-red-600">
              {(errors.title?.type == "required" &&
                "Course Title is Required") ||
                (errors.title?.type == "minLength" &&
                  "Minimum 3 characters required")}
            </p>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <label htmlFor="course-description">Description</label>
            <textarea
              {...register("description", { required: true, minLength: 10 })}
              className={
                "w-full border-2 border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 " +
                (errors.description
                  ? "focus:outline-red-600"
                  : "focus:outline-(--primary-color)")
              }
              id="course-description"
              placeholder="Describe what students will learns"
              rows={3}
            ></textarea>
            <p className="text-red-600">
              {(errors.description?.type == "required" &&
                "Description is Required") ||
                (errors.description?.type == "minLength" &&
                  "Minimum 10 characters required")}
            </p>
          </div>
          <div className="mt-3 flex gap-6">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="course-category">Category</label>
              <select
                {...register("category", { required: true })}
                className={
                  "w-full border-2 border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 " +
                  (errors.category
                    ? "focus:outline-red-600"
                    : "focus:outline-(--primary-color)")
                }
                id="course-category"
                defaultValue=""
              >
                <option disabled value="">
                  Select Category
                </option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              <p className="text-red-600">
                {errors.category?.type == "required" && "Select Category"}
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="course-level">Level</label>
              <select
                {...register("level")}
                className="w-full border-2 border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color)"
                id="course-level"
              >
                <option value={"BEGINNER"}>Beginner</option>
                <option value={"INTERMEDIATE"}>Intermediate</option>
                <option value={"ADVANCED"}>Advanced</option>
              </select>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <label htmlFor="course-price">Price</label>
            <input
              {...register("price", { required: true })}
              className={
                "w-full border-2 border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 " +
                (errors.price
                  ? "focus:outline-red-600"
                  : "focus:outline-(--primary-color)")
              }
              type="number"
              id="course-price"
              placeholder="0"
            />
            <p className="text-red-600">
              {errors.price?.type == "required" && "Enter Price"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <label className="font-medium">Course Thumbnail</label>
          {image && (
            <div className="relative w-60 shadow-(--card-shadow) rounded-2xl p-6 bg-(--bg-color) text-center">
              <FiX
                className="text-red-600 absolute right-2 top-3 text-lg cursor-pointer w-5 h-5 hover:-translate-y-px hover:scale-105 transition-all"
                onClick={handleDeleteImagePreview}
              />
              <div className="flex flex-col items-center">
                <img
                  className="w-40 rounded-2xl"
                  src={image.url}
                  alt="uploaded image"
                />
                {image.name && <p className="mt-2 text-sm">{image.name}</p>}
              </div>
            </div>
          )}
          <div
            {...getRootProps()}
            className={
              "border-2 border-dashed border-[rgba(0,0,0,0.15)] rounded-2xl flex flex-col items-center py-10 gap-3 transition-all duration-300 cursor-pointer " +
              (error ? "border-red-600 " : "hover:border-(--primary-color) ") +
              (isDragActive && "bg-[#e7f0ff]")
            }
          >
            <input {...getInputProps()} />
            <FiUpload className="text-[2.5rem] text-gray-600 mb-3" />
            <p className="font-medium">
              {isDragActive
                ? "Drop the file here..."
                : "Click to upload or drag and drop"}
            </p>
            <span className="text-sm text-gray-600">
              PNG, JPG, Etc up to 10MB
            </span>
          </div>
          <p className="text-red-600 text-center">
            {error && "Upload course thumbnail"}
          </p>
        </div>
      </div>

      <hr className="text-[rgba(0,0,0,0.25)]" />

      <div className="mt-7 w-full text-end">
        <button
          onClick={handleCancel}
          className="border-2 border-gray-200 text-sm font-semibold px-8 py-4 rounded-lg text-gray-600 cursor-pointer hover:border-red-600 hover:text-red-600 transition-all duration-300 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-600"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className={
            "ms-4 bg-linear-(--gradient-secondary) text-white text-sm font-semibold px-8 py-4 rounded-lg cursor-pointer disabled:cursor-not-allowed " +
            (loading ? "opacity-70 " : "") +
            (mode === "edit" &&
              (isDirty || isThumbnailChanged
                ? "hover:-translate-y-0.5 hover:shadow-[0_10px_15px_rgba(0,0,0,0.15)] transition-all duration-300"
                : "opacity-70"))
          }
          type="submit"
          disabled={
            mode === "edit"
              ? (!isDirty && !isThumbnailChanged) || loading
              : loading
          }
        >
          {mode == "create" && (loading ? "Creating..." : "Create Course")}
          {mode == "edit" && (loading ? "Updating..." : "Update Course")}
        </button>
      </div>
    </form>
  );
};

export default CourseCreateForm;
