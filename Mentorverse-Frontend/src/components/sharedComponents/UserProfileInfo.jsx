import React from "react";
import { FiCamera, FiEdit2, FiX } from "react-icons/fi";

const UserProfileInfo = ({
  userInfo,
  profilePhoto,
  preview,
  selectedFile,
  handleFileChange,
  isUpdating,
  isDisabled,
  handleForm: { handleUpdate, isDirty, register },
  handleLogout,
}) => {
  return (
    <div className="bg-white p-6 sm:p-10 md:p-12 flex flex-col sm:flex-row gap-6 sm:gap-10 rounded-2xl shadow-(--shadow-primary)">
      <div className="relative shrink-0 self-center sm:self-start">
        <img
          {...register("profilePic")}
          className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover object-center border-4 sm:border-[5px] rounded-full border-(--primary-color)"
          src={
            preview ||
            profilePhoto ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
          }
          alt="profile"
        />

        <label className="absolute right-1 bottom-2 sm:bottom-3 border w-fit p-2 sm:p-[0.85rem] rounded-full bg-(--primary-color) text-white cursor-pointer">
          <FiCamera className="text-xs sm:text-sm" />
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl md:text-[2.5rem] font-bold tracking-wide">
          {userInfo.userName}
        </h2>
        <p className="text-gray-500 font-medium text-sm sm:text-base md:text-lg mt-3 mb-5">
          {userInfo.userEmail}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className={`flex justify-center items-center text-sm font-semibold gap-2 rounded-lg 
              bg-linear-(--gradient-secondary) text-white w-full sm:w-fit px-4 sm:px-[1.4rem] py-2 sm:py-[0.6rem]
              cursor-pointer hover:shadow-(--shadow-primary) hover:-translate-y-0.5
              transition-all duration-300
              ${isUpdating ? "opacity-70 cursor-not-allowed hover:translate-y-0" : ""}`}
          >
            {isUpdating && "Updating..."}

            {!isUpdating && isDisabled && (
              <>
                <FiEdit2 /> Edit Profile
              </>
            )}

            {!isUpdating && !isDisabled && !isDirty && !selectedFile && (
              <>
                <FiX /> Cancel
              </>
            )}

            {!isUpdating && !isDisabled && (isDirty || selectedFile) && (
              <>
                <FiEdit2 /> Update
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="flex justify-center items-center text-sm font-semibold gap-2 rounded-lg border-2 border-red-600 text-red-600 w-full sm:w-fit px-4 sm:px-[1.4rem] py-2 sm:py-[0.6rem] cursor-pointer hover:shadow-(--shadow-primary) hover:-translate-y-0.5 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;

