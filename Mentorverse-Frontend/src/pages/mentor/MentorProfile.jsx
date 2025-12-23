import React, { useEffect, useState } from "react";
import MentorProfileForm from "../../components/mentorComponents/MentorProfileForm";
import UserProfileInfo from "../../components/sharedComponents/UserProfileInfo";
import api from "../../api/axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MentorManageSlots from "../../components/mentorComponents/MenterManageSlots";
import axios from "axios";
import { toast } from "react-toastify";

const MentorProfile = () => {
  const { user, logout } = useAuth();
  const mentorId = user?.id;
  const navigate = useNavigate();

  const [mentorInfo, setMentorInfo] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    getValues,
    formState: { errors, isDirty },
    reset,
    trigger,
    setFocus,
  } = useForm();

  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
  const [slots, setSlots] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState("MONDAY");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const fetchSlots = async () => {
    const res = await api.get(`/slots/mentor/${mentorId}`);
    console.log(res.data);
    setSlots(res.data.data);
  };

  const addSlot = async () => {
    if (!startTime || !endTime) return toast.warning("Select valid times");

    await api.post(`/slots/mentor/${mentorId}`, {
      dayOfWeek,
      startTime,
      endTime,
    });

    await fetchSlots();
    setStartTime("");
    setEndTime("");
  };

  const deleteSlot = async (slotId) => {
    if (!confirm("Delete this slot?")) return;
    await api.delete(`/slots/${slotId}`);
    fetchSlots();
  };

  useEffect(() => {
    if (!user) return;
    if (user.role !== "MENTOR") navigate("/");
  }, [user, navigate]);

  const fetchProfileInfo = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/mentors/profile/${user.id}`);
      setMentorInfo(response.data.data);
      setPreview(response.data.data.profilePic || "");
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const setFormValues = () => {
    if (mentorInfo) {
      reset({
        name: mentorInfo.name,
        email: mentorInfo.email,
        bio: mentorInfo.bio,
        skills: mentorInfo.skills,
        experience: mentorInfo.experience,
        ratePerHour: mentorInfo.ratePerHour,
        profilePic: mentorInfo.profilePic,
      });
    }
  };

  const uploadProfilePhotoToCloud = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload_preset");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/djcme4guh/image/upload",
      formData
    );

    console.log(res.data);

    return {
      url: res.data.secure_url,
      publicId: res.data.public_id,
    };
  };

  const handleUpdate = async () => {
    const result = await trigger();
    if (Object.keys(errors).length === 0) setIsDisabled(!isDisabled);

    if (!isDisabled && (isDirty || selectedFile)) {
      if (!result) {
        const firstErrorField = Object.keys(errors)[0];
        setFocus(firstErrorField);
      } else {
        try {
          setIsUpdating(true);

          let updatedData = getValues();
          if (selectedFile) {
            const photo = await uploadProfilePhotoToCloud(selectedFile);
            updatedData.profilePic = photo.url;
          }
          await api.put(`/mentors/profile/${user.id}`, updatedData);
          setSelectedFile(null);
          fetchProfileInfo();
          toast.success("Profile updated successfully");
        } catch (err) {
          console.error(err.response?.data);
          toast.error("Failed to update profile");
        } finally {
          setIsUpdating(false);
        }
      }
    }
  };

  const handleLogout = () => {
    if (!confirm("Do you really want to logout")) return;
    logout();
    navigate("/login");
  };

  const handleFileChange = (e) => {
   const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setIsDisabled(false);
  };

  const handleUpload = async () => {
    // if (!selectedFile) return;
    // try {
    //   const formData = new FormData();
    //   formData.append("file", selectedFile);
    //   formData.append("upload_preset", "my_upload_preset");
    //   formData.append("folder", "images/thumbnail");

    //   const response = await api.post(
    //     "https://api.cloudinary.com/v1_1/djcme4guh/image/upload", formData
    //   );
    //   const imageUrl = response.data.secure_url;

    //   await api.put(`/mentors/profile/${user.id}/photo`, { photoUrl: imageUrl });

    //   alert("Profile photo updated successfully!");
    //   setSelectedFile(null);
    //   fetchProfileInfo();
    // } catch (err) {
    //   console.error(err);
    // }
    console.log("Profile uploaded");
  };

  const handleAddSlot = async () => {
    if (!startTime || !endTime) {
      toast.warning("Please select valid start and end times");
      return;
    }
    try {
      await addSlot();
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || "Error adding slot");
    }
  };

  useEffect(() => {
    if (user) fetchProfileInfo();
  }, [user]);

  useEffect(() => {
    setFormValues();
  }, [mentorInfo]);

  useEffect(() => {
    fetchSlots();
  }, []);

  if (!user || user.role !== "MENTOR") return <div>Access Denied</div>;

  return (
    <div className="bg-(--bg-color) py-20 md:py-32 px-6 md:px-24 flex flex-col gap-8">
      <UserProfileInfo
        userInfo={{ userName: mentorInfo.name, userEmail: mentorInfo.email }}
        preview={preview}
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        isUpdating={isUpdating}
        isDisabled={isDisabled}
        handleForm={{ handleUpdate, isDirty, register }}
        handleLogout={handleLogout}
      />
      <MentorProfileForm
        isDisabled={isDisabled}
        handleForm={{ register, handleUpdate, errors }}
      />
      <MentorManageSlots
        mentorId={user.id}
        days={days}
        slots={slots}
        dayOfWeek={dayOfWeek}
        setDayOfWeek={setDayOfWeek}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        deleteSlot={deleteSlot}
        handleAddSlot={handleAddSlot}
      />
    </div>
  );
};

export default MentorProfile;
