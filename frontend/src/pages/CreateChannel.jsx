import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const [form, setForm] = useState({
    channelName: "",
    description: "",
    channelBanner: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) return setMessage("You must be logged in.");

    try {
      const res = await axios.post("http://localhost:5000/api/channels", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Channel created successfully!");
      navigate("/my-channel"); // ✅ Redirect to channel page
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create channel");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Your Channel</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="channelName"
          value={form.channelName}
          onChange={handleChange}
          placeholder="Channel Name"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Channel Description"
          className="border p-2 rounded"
        />
        <input
          name="channelBanner"
          value={form.channelBanner}
          onChange={handleChange}
          placeholder="Banner Image URL"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Create Channel
        </button>
        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  );
};

export default CreateChannel;
