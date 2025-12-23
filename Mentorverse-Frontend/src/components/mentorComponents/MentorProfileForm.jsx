import React from "react";
import { FiMail, FiUser } from "react-icons/fi";

const MentorProfileForm = ({
  isDisabled,
  handleForm: { register, errors }
}) => {
  return (
    <form className="bg-white p-12 rounded-2xl shadow-(--shadow-primary) flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2" htmlFor="name">
          <FiUser /> Full Name
        </label>
        <input
          {...register("name", { required: true, minLength: 3, validate: value => value.trim() !== "" || "Full name can not be empty or spaces only"})}
          className={
            !errors.name ? "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600 ") :
            "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus-visible:outline-red-600 focus:outline-red-600 " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600")
            
          }
          type="text"
          id="name"
          disabled={isDisabled}
        />
        <div className="text-red-600">
          {errors.name?.type === "required" && "Full Name is Required"}
          {errors.name?.type === "minLength" && "Minimum 3 characters required"}
          {errors.name?.type === "validate" && errors.name.message}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2" htmlFor="email">
          <FiMail /> Email
        </label>
        <input
          {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
          className={
            !errors.email ? "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600 ") :
            "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus-visible:outline-red-600 focus:outline-red-600 " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600")
            
          }
          type="email"
          id="email"
          disabled={isDisabled}
        />
        <div className="text-red-600">
          {errors.email?.type === "required" && "Email is Required"}
          {errors.email?.type === "pattern" && "Invalid Email"}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="bio">Bio</label>
        <textarea
        {...register("bio", { required: true, validate: value => value.trim() !== "" || "Bio can not be empty or spaces only" })}
          className={
            !errors.bio ? "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600 ") :
            "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus-visible:outline-red-600 focus:outline-red-600 " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600")
            
          }
          type="text"
          id="bio"
          rows={3}
          disabled={isDisabled}
        />
        <div className="text-red-600">
          {errors.bio?.type === "required" && "Bio is Required"}
          {errors.bio?.type === "validate" && errors.bio.message}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="skills">Skills (comma-seperated)</label>
        <input
        {...register("skills", { required: true, validate: value => value.trim() !== "" || "Skills can not be empty or spaces only" })}
         className={
            !errors.skills ? "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600 ") :
            "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus-visible:outline-red-600 focus:outline-red-600 " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600")
            
          }
          type="text"
          id="skills"
          disabled={isDisabled}
        />
        <div className="text-red-600">
          {errors.skills?.type === "required" && "At least one skill is Required"}
          {errors.skills?.type === "validate" && errors.skills.message}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="experience">Experience (Years)</label>
        <input
        {...register("experience", { required: true })}
          className={
            !errors.experience ? "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600 ") :
            "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus-visible:outline-red-600 focus:outline-red-600 " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600")
            
          }
          type="number"
          id="experience"
          disabled={isDisabled}
        />
        <div className="text-red-600">
          {errors.experience?.type === "required" && "Experience is Required"}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="rate-per-hour">Rate Per Hour</label>
        <input
        {...register("ratePerHour", { required: true })}
          className={
            !errors.ratePerHour ? "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus:outline-(--primary-color) " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600 ") :
            "w-full border border-[rgba(0,0,0,0.15)] px-5 py-3 rounded-lg focus:shadow-(--shadow-primary) focus:-translate-y-px transition-all duration-100 focus-visible:outline-red-600 focus:outline-red-600 " + 
            (isDisabled && "cursor-not-allowed bg-(--bg-color) text-gray-600")
            
          }
          type="number"
          id="rate-per-hour"
          disabled={isDisabled}
        />
        <div className="text-red-600">
          {errors.ratePerHour?.type === "required" && "Enter Rate Per Hour"}
        </div>
      </div>
    </form>
  );
};

export default MentorProfileForm;
