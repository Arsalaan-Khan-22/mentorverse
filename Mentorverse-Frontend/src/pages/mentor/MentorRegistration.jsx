import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import RegistrationForm from "../../components/mentorComponents/RegistrationForm"
import { toast } from "react-toastify";

const MentorRegistration = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // To validate confirm password
  const checkPassword = watch("password");

  // Send data to backend
  const submitForm = async (data) => {
    try {
      data.role = "MENTOR";
      await api.post("/auth/register", data);

      toast.success("Mentor registered successfully!");

      navigate("/login"); // Redirect after registration
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  return (
    <RegistrationForm
      register={register}
      handleSubmit={handleSubmit}
      watch={watch}
      errors={errors}
      navigate={navigate}
      checkPassword={checkPassword}
      submitForm={submitForm}
    />
  );
};

export default MentorRegistration;
