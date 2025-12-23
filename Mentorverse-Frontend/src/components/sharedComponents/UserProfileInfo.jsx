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
    <div className="bg-white p-12 flex gap-10 rounded-2xl shadow-(--shadow-primary)">
      <div className="relative">
        <img
          {...register("profilePic")}
          className="w-38 h-38 object-cover object-center border-[5px] rounded-full border-(--primary-color)"
          src={
            preview ||
            profilePhoto ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
          }
          alt="profile"
        />

        <label className="absolute right-2 bottom-6 border w-fit p-[0.85rem] rounded-full bg-(--primary-color) text-white cursor-pointer">
          <FiCamera className="text-sm" />
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* User Info */}
      <div>
        <h2 className="text-[2.5rem] font-bold tracking-wide">
          {userInfo.userName}
        </h2>
        <p className="text-gray-500 font-medium text-lg mt-4 mb-7">
          {userInfo.userEmail}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button
  onClick={handleUpdate}
  disabled={isUpdating}
  className={`flex justify-center items-center text-sm font-semibold gap-2 rounded-lg 
    bg-linear-(--gradient-secondary) text-white w-fit px-[1.4rem] py-[0.6rem]
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
            className="flex justify-center items-center text-sm font-semibold gap-2 rounded-lg border-2 border-red-600 text-red-600 w-fit px-[1.4rem] py-[0.6rem] cursor-pointer hover:shadow-(--shadow-primary) hover:-translate-y-0.5 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;

