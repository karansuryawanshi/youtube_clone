import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { token } = res.data;

      // ✅ Store token
      localStorage.setItem("token", token);

      // ✅ Redirect to home or dashboard
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center my-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4  rounded-lg "
        >
          <h2 className="text-2xl font-semibold text-center">Login</h2>

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

          <button type="submit" className="bg-blue-600 text-white py-2 rounded">
            Login
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
