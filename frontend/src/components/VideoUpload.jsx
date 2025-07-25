// https://github.com/karansuryawanshi/youtube_clone

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VideoUpload = ({ onClose, fetchMyVideos }) => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    video: null,
  });

  // Thumbnail image state
  const [imageUrl, setImageUrl] = useState("");

  // Feedback & loading states
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Upload thumbnail to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", "oxqufdxz");

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
      onClose();
    } finally {
      setLoading(false);
    }
  };

  // Handle full form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadMessage("");

    const token = localStorage.getItem("token");
    if (!token) return setUploadMessage("⚠️ Please login to upload.");

    // Field validation
    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      !formData.video ||
      !imageUrl
    ) {
      return setUploadMessage("⚠️ All fields are required.");
    }

    // Prepare form data for backend
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category.toLowerCase());
    data.append("videoDescription", formData.description);
    data.append("thumbnailUrl", imageUrl);
    data.append("video", formData.video);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://youtube-clone-phfd.onrender.com/api/videos/upload",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // On success
      setUploadMessage("Video uploaded successfully!");
      toast.success("Video uploaded successfully!");
      setFormData({ title: "", category: "", description: "", video: null });
      setImageUrl("");
      fetchMyVideos(); // Refresh list
      onClose(); // Close modal
    } catch (err) {
      // On error
      toast.error("Video upload failed");
      console.error("Video upload failed", err);
      onClose();
      setUploadMessage(err.response?.data?.message || "❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title & Category */}
        <div className="flex gap-6 flex-wrap sm:flex-nowrap">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Travel, Coding)"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          cols={30}
          rows={3}
          className="border p-2 rounded"
        />

        {/* Thumbnail Upload */}
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

        {/* Video Upload */}
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

        {/* Submit & Cancel Buttons */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>

        <button
          onClick={onClose}
          className="bg-neutral-400 text-black py-2 rounded hover:bg-neutral-500 transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
