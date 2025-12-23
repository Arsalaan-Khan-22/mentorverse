import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({register, handleSubmit, watch, errors, navigate, checkPassword, submitForm}) => {

  return (
    <div className="min-h-screen flex justify-center items-center bg-(image:--gradient-primary) p-30">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 mx-4">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center bg-(image:--gradient-primary) bg-clip-text text-transparent mb-2">
          Become a Mentor
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Share your knowledge and help others grow
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: true, minLength: 3 })}
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.name?.type === "required" && "Full Name is required"}
              {errors.name?.type === "minLength" &&
                "Minimum 3 characters required"}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              type="password"
              placeholder="Create your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                validate: (value) =>
                  value === checkPassword || "Passwords must match",
              })}
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Skills (comma-separated)
            </label>
            <input
              {...register("skills", { required: true })}
              type="text"
              placeholder="e.g., React, Node.js, TypeScript"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">Skills are required</p>
            )}
          </div>

          {/* Experience + Rate */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              {...register("experience", { required: true, min: 1 })}
              type="number"
              placeholder="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
            {errors.experience?.type == "required" && (
              <p className="text-red-500 text-sm mt-1">Enter years of experience</p>
            )}
            {errors.experience?.type == "min" && (
              <p className="text-red-500 text-sm mt-1">Min 1 year of experience required</p>
            )}

            <label className="block font-medium text-gray-700 mb-1 mt-3">
              Hourly Rate (₹)
            </label>
            <input
              {...register("ratePerHour", { required: true, min: 50 })}
              type="number"
              placeholder="500"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
            {errors.ratePerHour?.type == "required" && (
              <p className="text-red-500 text-sm mt-1">Enter your rate per hour</p>
            )}
            {errors.ratePerHour?.type == "min" && (
              <p className="text-red-500 text-sm mt-1">Min ₹50/hour</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Bio
            </label>
            <input
              {...register("bio", { required: true })}
              type="text"
              placeholder="Tell us about your expertise and teaching experience"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">Bio is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold shadow-md px-7 text-sm cursor-pointer relative bg-(image:--gradient-primary) bg-size-[200%_200%] animate-[gradient-shift_3s_infinite] transition-all duration-300 overflow-hidden hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-linear-[90deg,transparent,rgba(255,255,255,0.2),transparent] before:transition-[left] before:duration-500 hover:before:left-full"
          >
            Create Mentor Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
