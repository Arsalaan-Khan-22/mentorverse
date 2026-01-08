import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ register, handleSubmit, watch, errors, navigate, checkPassword, submitForm }) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-(image:--gradient-primary) px-6 md:px-12 py-32">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 mx-2 sm:mx-4">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center bg-(image:--gradient-primary) bg-clip-text text-transparent mb-2">
          Become a Mentor
        </h2>
        <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
          Share your knowledge and help others grow
        </p>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-5 sm:space-y-6">

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">
              Full Name
            </label>
            <input
              {...register("name", { required: true, minLength: 3 })}
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none text-sm sm:text-base"
            />
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.name?.type === "required" && "Full Name is required"}
              {errors.name?.type === "minLength" && "Minimum 3 characters required"}
            </p>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none text-sm sm:text-base"
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">
              Password
            </label>
            <input
              {...register("password", { required: true, minLength: 3, maxLength: 20 })}
              type="password"
              placeholder="Create your password"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none text-sm sm:text-base"
            />
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Password is required</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                validate: (value) => value === checkPassword || "Passwords must match",
              })}
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none text-sm sm:text-base"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">
              Skills (comma-separated)
            </label>
            <input
              {...register("skills", { required: true })}
              type="text"
              placeholder="e.g., React, Node.js, TypeScript"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none text-sm sm:text-base"
            />
            {errors.skills && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Skills are required</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">
              Years of Experience
            </label>
            <input
              {...register("experience", { required: true, min: 1 })}
              type="number"
              placeholder="5"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none text-sm sm:text-base"
            />
            {errors.experience?.type === "required" && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Enter years of experience</p>
            )}
            {errors.experience?.type === "min" && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Min 1 year of experience required</p>
            )}

            <label className="block font-medium text-gray-700 mb-1 mt-3 text-sm sm:text-base">
              Hourly Rate (₹)
            </label>
            <input
              {...register("ratePerHour", { required: true, min: 50 })}
              type="number"
              placeholder="500"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none text-sm sm:text-base"
            />
            {errors.ratePerHour?.type === "required" && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Enter your rate per hour</p>
            )}
            {errors.ratePerHour?.type === "min" && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Min ₹50/hour</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">
              Bio
            </label>
            <input
              {...register("bio", { required: true })}
              type="text"
              placeholder="Tell us about your expertise and teaching experience"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none text-sm sm:text-base"
            />
            {errors.bio && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Bio is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 rounded-lg text-white font-semibold shadow-md px-6 sm:px-7 text-sm sm:text-base cursor-pointer relative bg-(image:--gradient-primary) bg-size-[200%_200%] animate-[gradient-shift_3s_infinite] transition-all duration-300 overflow-hidden hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-linear-[90deg,transparent,rgba(255,255,255,0.2),transparent] before:transition-[left] before:duration-500 hover:before:left-full"
          >
            Create Mentor Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;