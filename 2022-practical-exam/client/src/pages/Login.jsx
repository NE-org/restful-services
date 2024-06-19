import { useState } from "react";
import { errorToast, successToast } from "../utils/Toast";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/Api";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormDataFilled = Object.values(formData).every(
      (value) => value !== ""
    );

    if (!isFormDataFilled) {
      errorToast("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL + "/users/login", formData);
      if (response?.data?.status == 200) {
        successToast("Successfully logged in");

        setFormData({
          email: "",
          password: "",
        });

        const token = response?.data?.data?.access_token;
        localStorage.setItem("token", token);
        navigate("/dashboard");

        setLoading(false);
      } else {
        errorToast(
          response?.data?.message || "Error occurred while registering"
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message || "An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="pb-12">
      <h1 className="text-xl text-[#2272C3] font-extrabold text-center my-12">
        Vehicle Tracking System
      </h1>
      <div className="flex flex-col items-center mt-8 border w-full md:w-[35vw] mx-auto py-8 px-16">
        <h1 className="font-black text-black mb-4 text-xl">Login</h1>
        <p className="text-xs font-light text-gray-400 mb-8">
          To start using Vehicle Tracking System, you need to login.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full mb-6 flex justify-center mx-auto text-base px-4 py-3 text-white rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don&rsquo;t have an account?{" "}
          <Link to="/signup" className="text-[#2272C3] font-bold">
            Signup
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
