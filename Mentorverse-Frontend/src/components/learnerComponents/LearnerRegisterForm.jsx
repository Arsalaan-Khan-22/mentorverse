import { useForm } from "react-hook-form";

const LearnerRegisterForm = ({register, handleSubmit, watch, errors, checkPassword, onSubmit}) => {

  return (
    <div className="min-h-screen flex justify-center items-center bg-(image:--gradient-primary) p-30">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 mx-4">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center bg-(image:--gradient-primary) bg-clip-text text-transparent mb-2">
          Join as a Learner
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Start your learning journey today
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">Full name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
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
              type="password"
              placeholder="Create a password"
              {...register("password", { required: true })}
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
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === checkPassword || "Passwords must match",
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              placeholder="Tell us a little about yourself..."
              rows={3}
              {...register("bio")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            ></textarea>
          </div>

          {/* Interests */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Interests (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. web dev, design, AI"
              {...register("interests")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold shadow-md px-7 text-sm cursor-pointer relative bg-(image:--gradient-primary) bg-size-[200%_200%] animate-[gradient-shift_3s_infinite] transition-all duration-300 overflow-hidden hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-linear-[90deg,transparent,rgba(255,255,255,0.2),transparent] before:transition-[left] before:duration-500 hover:before:left-full"
          >
            Create Account
          </button>

        </form>
      </div>
    </div>
  );
};

export default LearnerRegisterForm;
