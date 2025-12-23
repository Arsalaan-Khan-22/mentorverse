import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfileInfo from "../../components/sharedComponents/UserProfileInfo";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import LearnerProfileForm from "../../components/learnerComponents/LearnerProfileForm";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LearnerProfile = () => {
  const { user, logout } = useAuth();
  const learnerId = user?.id;

  const [learnerInfo, setLearnerInfo] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);


  const {
    register,
    getValues,
    formState: { errors, isDirty },
    reset,
    trigger,
    setFocus,
  } = useForm();

  const navigate = useNavigate();

  const fetchProfileInfo = async () => {
    const res = await api.get(`/learners/profile/${learnerId}`);
    setLearnerInfo(res.data.data);
    setPreview(null); // reset preview after save
  };

  const setFormValues = () => {
    reset({
      name: learnerInfo.name,
      email: learnerInfo.email,
      bio: learnerInfo.bio,
      interests: learnerInfo.interests,
      profilePic: learnerInfo.profilePic
    });
  };

  const uploadProfilePhotoToCloud = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload_preset");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/djcme4guh/image/upload",
      formData
    );

    console.log(res.data)

    return {
      url: res.data.secure_url,
      publicId: res.data.public_id,
    };
  };

  const handleUpdate = async () => {
  const valid = await trigger();

  if (Object.keys(errors).length === 0) {
    setIsDisabled(!isDisabled);
  }

  if (!isDisabled && (isDirty || selectedFile)) {
    if (!valid) {
      if (errors.name) setFocus("name");
      else if (errors.email) setFocus("email");
      else if (errors.interests) setFocus("interests");
      return;
    }

    try {
      setIsUpdating(true);

      let updatedData = getValues();

      if (selectedFile) {
        const photo = await uploadProfilePhotoToCloud(selectedFile);
        updatedData.profilePic = photo.url;
      }

      await api.put(`/learners/profile/${learnerId}`, updatedData);

      setSelectedFile(null);
      fetchProfileInfo();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  }
};


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setIsDisabled(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  useEffect(() => {
    setFormValues();
  }, [learnerInfo]);

  return (
    <div className="bg-(--bg-color) py-32 px-24 flex flex-col gap-8">
      <UserProfileInfo
        userInfo={{
          userName: learnerInfo.name,
          userEmail: learnerInfo.email,
        }}
        profilePhoto={learnerInfo.profilePic}
        preview={preview}
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
        isUpdating={isUpdating}
        isDisabled={isDisabled}
        handleForm={{ handleUpdate, isDirty, register }}
        handleLogout={handleLogout}
      />

      <LearnerProfileForm
        isDisabled={isDisabled}
        handleForm={{ register, handleUpdate, errors }}
      />
    </div>
  );
};

export default LearnerProfile;
