import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import LearnerRegisterForm from "../../components/learnerComponents/LearnerRegisterForm"
import { toast } from "react-toastify";

const LearnerRegistration = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch password for confirm password validation
  const checkPassword = watch("password");

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        name: data.fullName, 
        role: "LEARNER"
      };

      delete formData.fullName;
      delete formData.confirmPassword;

      await api.post("/auth/register", formData);

      toast.success("Learner registered successfully!");

      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    }
  };

  return (
    <LearnerRegisterForm
      register={register}
      handleSubmit={handleSubmit}
      watch={watch}
      errors={errors}
      checkPassword={checkPassword}
      onSubmit={onSubmit}
    />
  );
};

export default LearnerRegistration;
