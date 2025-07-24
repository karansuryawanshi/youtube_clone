// https://github.com/karansuryawanshi/youtube_clone

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditVideo = () => {
  const { id } = useParams(); // Get video ID from URL
  const navigate = useNavigate();

  const [video, setVideo] = useState({
    title: "",
    videoDescription: "",
    category: "",
    thumbnailUrl: "",
    videoUrl: "",
  }); // Video form state

  const [newVideoFile, setNewVideoFile] = useState(null); // For new video file
  const [loading, setLoading] = useState(true); // Loading state

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(
          `https://youtube-clone-phfd.onrender.com/api/videos/${id}`
        );
        setVideo(res.data); // Set video data
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch video", err);
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value }); // Handle input change
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "oxqufdxz"); // Cloudinary preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwr7lrgso/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      if (data.secure_url) {
        setVideo((prev) => ({
          ...prev,
          thumbnailUrl: data.secure_url, // Set thumbnail
        }));
      } else {
        toast.error("Failed to get image URL from Cloudinary");
      }
    } catch (err) {
      console.error("Thumbnail upload failed", err);
      toast.error("Thumbnail upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", video.title);
    formData.append("description", video.videoDescription);
    formData.append("category", video.category);
    formData.append("thumbnailUrl", video.thumbnailUrl);
    if (newVideoFile) {
      formData.append("video", newVideoFile); // Append new video file if selected
    }

    try {
      await axios.put(
        `https://youtube-clone-phfd.onrender.com/api/videos/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Video Updated Successfully");
      navigate("/my-channel"); // Navigate after update
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>; // Show loading

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Video</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          value={video.title || ""}
          onChange={handleChange}
          placeholder="Video Title"
          className="w-full border px-4 py-2 rounded"
          required
        />

        <textarea
          name="videoDescription"
          value={video.videoDescription || ""}
          onChange={handleChange}
          placeholder="Video Description"
          className="w-full border px-4 py-2 rounded"
          rows="4"
        />

        <input
          type="text"
          name="category"
          id="category"
          value={video.category || ""}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border px-4 py-2 rounded"
        />

        <div className="space-y-2">
          <label className="block font-medium">Upload New Thumbnail</label>
          <input
            type="file"
            className="border w-full px-2 py-2 bg-blue-500 text-white rounded-lg"
            accept="image/*"
            onChange={handleThumbnailUpload}
          />

          {video.thumbnailUrl && (
            <img
              src={video.thumbnailUrl}
              alt="Thumbnail Preview"
              className="mt-2 w-full h-40 object-cover rounded"
            />
          )}
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Replace Video</label>
          <input
            type="file"
            accept="video/*"
            className="border w-full px-2 py-2 bg-blue-500 text-white rounded-lg"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const tempUrl = URL.createObjectURL(file);
                setVideo((prev) => ({ ...prev, videoUrl: tempUrl })); // Show temp video preview
                setNewVideoFile(file);
              }
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditVideo;
