import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import LoginForm from "../components/sharedComponents/LoginForm";
import { toast } from "react-toastify";


const Login = () => {
  const [role, setRole] = useState("learner");
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const response = await api.post("/auth/login", {
      ...data,
      role: role.toUpperCase()
    });

    login(response.data);

    if (role === "mentor") navigate("/mentor/dashboard");
    else navigate("/learner/dashboard");
  } catch (error) {
    toast.error(error.response?.data || "Invalid Credentials");
  }
};


  return (
    <LoginForm
      role={role}
      setRole={setRole}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};

export default Login;