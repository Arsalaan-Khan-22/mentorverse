import React from "react";
import { FiMail, FiUser } from "react-icons/fi";

const LearnerProfileForm = ({
  isDisabled,
  handleForm: { register, errors },
}) => {
  return (
    <form className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-(--shadow-primary) flex flex-col gap-6 sm:gap-7">
      <div className="flex flex-col gap-2 sm:gap-3">
        <label className="flex items-center gap-2 text-sm sm:text-base md:text-lg" htmlFor="name">
          <FiUser /> Full Name
        </label>
        <input
          {...register("name", {
            required: true,
            minLength: 3,
            validate: (value) =>
              value.trim() !== "" ||
              "Full name can not be empty or spaces only",
          })}
          className={
            !errors.name
              ? "w-full border border-[rgba(0,0,0,0.15)] px-4 sm:px-5 py-2 sm:py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " +
                (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600 ")
              : "w-full border border-[rgba(0,0,0,0.15)] px-4 sm:px-5 py-2 sm:py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus-visible:outline-red-600 focus:outline-red-600 " +
                (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600")
          }
          type="text"
          id="name"
          disabled={isDisabled}
        />
        <div className="text-xs sm:text-sm text-red-600">
          {errors.name?.type === "required" && "Full Name is Required"}
          {errors.name?.type === "minLength" && "Minimum 3 characters required"}
          {errors.name?.type === "validate" && errors.name.message}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        <label className="flex items-center gap-2 text-sm sm:text-base md:text-lg" htmlFor="email">
          <FiMail /> Email
        </label>
        <input
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          className={
            !errors.email
              ? "w-full border border-[rgba(0,0,0,0.15)] px-4 sm:px-5 py-2 sm:py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " +
                (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600 ")
              : "w-full border border-[rgba(0,0,0,0.15)] px-4 sm:px-5 py-2 sm:py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus-visible:outline-red-600 focus:outline-red-600 " +
                (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600")
          }
          type="email"
          id="email"
          disabled={isDisabled}
        />
        <div className="text-xs sm:text-sm text-red-600">
          {errors.email?.type === "required" && "Email is Required"}
          {errors.email?.type === "pattern" && "Invalid Email"}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        <label className="text-sm sm:text-base md:text-lg" htmlFor="bio">Bio</label>
        <textarea
          {...register("bio")}
          className={
            "w-full border border-[rgba(0,0,0,0.15)] px-4 sm:px-5 py-2 sm:py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " +
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600 ")
          }
          id="bio"
          rows={3}
          disabled={isDisabled}
        />
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        <label className="text-sm sm:text-base md:text-lg" htmlFor="interests">
          Interests (comma-separated)
        </label>
        <input
          {...register("interests", {
            required: true,
            validate: (value) =>
              value.trim() !== "" || "Interests can not be empty or spaces only",
          })}
          className={
            !errors.interests
              ? "w-full border border-[rgba(0,0,0,0.15)] px-4 sm:px-5 py-2 sm:py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " +
                (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600 ")
              : "w-full border border-[rgba(0,0,0,0.15)] px-4 sm:px-5 py-2 sm:py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus-visible:outline-red-600 focus:outline-red-600 " +
                (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600")
          }
          type="text"
          id="interests"
          disabled={isDisabled}
        />
        <div className="text-xs sm:text-sm text-red-600">
          {errors.interests?.type === "required" && "At least one skill is Required"}
          {errors.interests?.type === "validate" && errors.interests.message}
        </div>
      </div>
    </form>
  );
};

export default LearnerProfileForm;