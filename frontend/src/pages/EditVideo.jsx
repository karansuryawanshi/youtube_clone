import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState({
    title: "",
    videoDescription: "",
    category: "",
    thumbnailUrl: "",
    videoUrl: "",
  });

  const [newVideoFile, setNewVideoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);
        console.log("[Res.data]", res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch video", err);
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "oxqufdxz");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwr7lrgso/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setVideo((prev) => ({
        ...prev,
        thumbnailUrl: data.secure_url,
      }));
    } catch (err) {
      console.error("Thumbnail upload failed", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", video.title);
    formData.append("description", video.description);
    formData.append("category", video.category);
    formData.append("thumbnailUrl", video.thumbnailUrl);
    if (newVideoFile) {
      formData.append("video", newVideoFile); // handled by multer backend
    }

    try {
      await axios.put(`http://localhost:5000/api/videos/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Video Updated Successfully");

      navigate("/my-channel"); // redirect to homepage after update
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

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
        {/* {video.title} */}
        <textarea
          name="description"
          value={video.videoDescription || ""}
          onChange={handleChange}
          placeholder="Video Description"
          className="w-full border px-4 py-2 rounded"
          rows="4"
        />
        <input
          type="text"
          name="category"
          value={video.category || ""}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border px-4 py-2 rounded"
        />
        {/* Thumbnail Upload & Preview */}
        <div className="space-y-2">
          <label className="block font-medium">Upload New Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="border p-2 rounded w-full"
          />
          {video.thumbnailUrl && (
            <img
              src={video.thumbnailUrl}
              alt="Thumbnail Preview"
              className="mt-2 w-full h-40 object-cover rounded"
            />
          )}
        </div>
        {/* Video Upload & Preview */}
        <div className="space-y-2">
          <label className="block font-medium">Replace Video (Optional)</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setNewVideoFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
          {video.videoUrl && (
            <video
              controls
              src={`http://localhost:5000${video.videoUrl}`}
              className="mt-2 w-full rounded"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Video
        </button>
      </form>
    </div>
  );
};

export default EditVideo;
