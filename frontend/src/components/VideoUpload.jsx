import { useState } from "react";
import axios from "axios";

const VideoUpload = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    video: null,
  });

  const [imageUrl, setImageUrl] = useState(""); // Cloudinary thumbnail URL
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change (text & video)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle Cloudinary thumbnail upload
  const handleImageUpload = async (e) => {
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
      setImageUrl(data.secure_url);
      setUploadMessage("Thumbnail uploaded ✅");
    } catch (err) {
      console.error("Thumbnail upload failed:", err);
      setUploadMessage("❌ Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  // Submit full video + metadata
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadMessage("");

    const token = localStorage.getItem("token");
    if (!token) return setUploadMessage("⚠️ Please login to upload.");

    if (!formData.title || !formData.category || !formData.video || !imageUrl) {
      return setUploadMessage("⚠️ All fields are required.");
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category.toLowerCase());
    data.append("thumbnailUrl", imageUrl);
    data.append("video", formData.video); // must match backend: upload.single("video")

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/videos/upload",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadMessage("✅ Video uploaded successfully!");
      setFormData({ title: "", category: "", video: null });
      setImageUrl("");
      onUploadSuccess(); // refresh parent video list
    } catch (err) {
      console.error("Video upload failed", err);
      setUploadMessage(err.response?.data?.message || "❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <h2 className="text-xl font-bold">Upload New Video</h2> */}
        <div className="flex gap-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Travel, Coding)"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 rounded"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Thumbnail Preview"
              className="w-64 h-36 rounded object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Video File</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>

        {uploadMessage && (
          <p className="text-sm text-center text-gray-700">{uploadMessage}</p>
        )}
      </form>
    </div>
  );
};

export default VideoUpload;
