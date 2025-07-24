// https://github.com/karansuryawanshi/youtube_clone

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  // State for form fields
  const [formData, setFormData] = useState({ email: "", password: "" });
  // State to store error messages
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Navigation hook

  // Handle input changes and update form state
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submit
    setError(""); // Reset error

    try {
      // Send login request to backend
      const res = await axios.post(
        "https://youtube-clone-phfd.onrender.com/api/auth/login",
        formData
      );
      const { token } = res.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      toast.success("Login Successfully");
      navigate("/"); // Redirect to home
      window.location.reload(); // Reload to reflect auth state
    } catch (err) {
      toast.error("Login failed");
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      {/* Navbar at top */}
      <Navbar />

      {/* Centered login form */}
      <div className="flex items-center justify-center my-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg"
        >
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          {/* Email input */}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="border p-2 rounded"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="border p-2 rounded"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="bg-blue-600 text-white py-2 rounded">
            Login
          </button>

          {/* Display error message if any */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Redirect to register page */}
          <span className="mx-auto">
            If not Signup please{" "}
            <Link to="/register" className="text-blue-700">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
