// https://github.com/karansuryawanshi/youtube_clone

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { toast } from "react-toastify";

const CreateChannel = () => {
  const [form, setForm] = useState({
    channelName: "",
    description: "",
    channelBanner: "",
  }); // Form state

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Upload state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // Handle form input change
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", "oxqufdxz"); // Cloudinary preset

    try {
      setLoading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwr7lrgso/image/upload",
        {
          method: "POST",
          body: cloudForm,
        }
      );
      const data = await res.json();
      setForm((prev) => ({ ...prev, channelBanner: data.secure_url })); // Set banner URL
      toast.success("Banner uploaded");
    } catch (err) {
      console.error("Banner upload failed:", err);
      toast.success("Failed to upload banner");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return setMessage("⚠️ You must be logged in.");

    try {
      const res = await axios.post(
        "https://youtube-clone-phfd.onrender.com/api/channels",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Channel created!");
      navigate("/my-channel"); // Redirect to channel
      window.location.reload(); // Refresh page
    } catch (err) {
      toast.error("Failed to create channel");
      setMessage(err.response?.data?.message || "Failed to create channel");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Create Your Channel</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {form.channelBanner ? (
            <img
              src={form.channelBanner}
              alt="Banner Preview"
              className="w-20 h-20 mx-auto rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-sky-200 flex items-center justify-center rounded-full mx-auto">
              <CircleUserRound className="w-20 h-20 p-2 text-blue-600" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerUpload} // Upload banner to Cloudinary
            className="flex mx-auto"
          />
        </div>

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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "uploading..." : "Create Channel"} {/* Submit button */}
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;
