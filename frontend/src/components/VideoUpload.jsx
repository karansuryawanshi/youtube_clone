import { useState } from "react";
import axios from "axios";

const VideoUpload = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    thumbnailUrl: "",
    video: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) return setMessage("Please login to upload.");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category.toLowerCase());
    data.append("thumbnailUrl", formData.thumbnailUrl);
    data.append("video", formData.video); // matches backend: upload.single("video")

    try {
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

      setMessage("Video uploaded successfully!");
      setFormData({ title: "", category: "", thumbnailUrl: "", video: null });
      onUploadSuccess();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Upload failed.");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-x-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border p-2 rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Music, Travel)"
            className="border p-2 rounded"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="space-x-6">
          <input
            type="text"
            name="thumbnailUrl"
            placeholder="Thumbnail Image URL"
            className="border p-2 rounded"
            value={formData.thumbnailUrl}
            onChange={handleChange}
          />
          <input
            type="file"
            name="video"
            accept="video/*"
            className="border p-2 rounded w-53"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Upload
        </button>

        {message && <p className="text-sm mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default VideoUpload;
