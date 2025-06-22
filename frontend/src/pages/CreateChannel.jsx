import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

const CreateChannel = () => {
  const [form, setForm] = useState({
    channelName: "",
    description: "",
    channelBanner: "", // holds the Cloudinary URL
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle banner image upload to Cloudinary
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", "oxqufdxz"); // your unsigned preset

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
      setForm((prev) => ({ ...prev, channelBanner: data.secure_url }));
      setMessage("✅ Banner uploaded");
    } catch (err) {
      console.error("Banner upload failed:", err);
      setMessage("❌ Failed to upload banner");
    } finally {
      setLoading(false);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) return setMessage("⚠️ You must be logged in.");

    try {
      const res = await axios.post("http://localhost:5000/api/channels", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("🎉 Channel created!");
      navigate("/my-channel");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to create channel");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Create Your Channel</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* <label className="text-sm font-medium">Upload Channel Banner</label> */}
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
            onChange={handleBannerUpload}
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
          {loading ? "uploading..." : "Create Channel"}
        </button>

        {message && (
          <p className="text-sm text-center text-gray-700 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
};

export default CreateChannel;
