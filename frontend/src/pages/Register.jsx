// https://github.com/karansuryawanshi/youtube_clone

// Importing necessary dependencies and components
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // States for error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password, confirmPassword } = formData;

    // Check if passwords match
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    // Send POST request to register user
    try {
      const res = await axios.post(
        "https://youtube-clone-green-mu-64.vercel.app/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      // Set success state and clear form
      setSuccess("Registration successful!");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Navigate to login and reload page
      navigate("/login");
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong");
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      {/* Navbar at the top */}
      <Navbar></Navbar>

      {/* Registration form container */}
      <div className="flex items-center justify-center my-10">
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-2xl font-semibold mb-4">Register</h1>

            <div className="flex flex-col gap-4">
              {/* Username input */}
              <div className="flex flex-col">
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border p-2 focus:outline-0 rounded-lg w-64"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              {/* Email input */}
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border p-2 focus:outline-0 rounded-lg w-64"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password input */}
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border p-2 focus:outline-0 rounded-lg w-64"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password input */}
              <div className="flex flex-col">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="border p-2 focus:outline-0 rounded-lg w-64"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
              >
                Submit
              </button>

              {/* Error and success messages */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && (
                <p className="text-green-600 text-sm mt-2">{success}</p>
              )}
            </div>

            {/* Redirect to login */}
            <p className=" my-4">
              If already have an account{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
