import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = ({ role, setRole, register, handleSubmit, errors, onSubmit }) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-(image:--gradient-primary) px-6 sm:px-6 md:px-12 py-32">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center bg-(image:--gradient-primary) bg-clip-text text-transparent mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
          Sign in to continue your learning journey
        </p>

        <div className="flex bg-gray-100 rounded-xl py-1 sm:py-2 px-1 mb-6 sm:mb-8">
          <button
            onClick={() => setRole("learner")}
            className={`w-1/2 py-2 rounded-lg font-medium transition-all duration-300 ${
              role === "learner"
                ? "text-white bg-(image:--gradient-primary)"
                : "text-gray-600"
            }`}
          >
            Learner
          </button>

          <button
            onClick={() => setRole("mentor")}
            className={`w-1/2 py-2 rounded-lg font-medium transition-all duration-300 ${
              role === "mentor"
                ? "text-white bg-(image:--gradient-primary)"
                : "text-gray-600"
            }`}
          >
            Mentor
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none text-sm sm:text-base"
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none text-sm sm:text-base"
            />
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Password is required</p>
            )}
          </div>

          {/* Remember me and Forgot Password */}
                     {/* <div className="flex justify-between items-center text-sm">
             <div className="flex items-center gap-2">
               <input type="checkbox" id="remember" className="accent-teal-600" />
               <label htmlFor="remember" className="text-gray-600">
                 Remember me
               </label>
             </div>
             <a href="#" className="text-teal-600 hover:underline">
               Forgot password?
             </a>
           </div> */}

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 rounded-lg text-white font-semibold shadow-md px-6 sm:px-7 text-sm sm:text-base cursor-pointer relative bg-(image:--gradient-primary) bg-size-[200%_200%] animate-[gradient-shift_3s_infinite] transition-all duration-300 overflow-hidden hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-linear-[90deg,transparent,rgba(255,255,255,0.2),transparent] before:transition-[left] before:duration-500 hover:before:left-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;