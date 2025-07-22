// https://github.com/karansuryawanshi/youtube_clone

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import VideoUpload from "../components/VideoUpload";
import { Pencil, EllipsisVertical } from "lucide-react";
import channelBanner from "../assets/channel_banner.jpg";
import { toast } from "react-toastify";
import { lazy, Suspense } from "react";

// Lazy load VideoUpload component for performance
const VideoUpload = lazy(() => import("../components/VideoUpload"));

const MyChannel = () => {
  // State declarations
  const [videos, setVideos] = useState([]);
  const [myVideos, setMyVideos] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [channelName, setChannelName] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    channelName: "",
    description: "",
    channelBanner: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Update channel info
  const updateChannel = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      await axios.put(
        "http://localhost:5000/api/channels/my/channel",
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchMyVideos(); // refresh updated videos
      toast.success("Channel Updated Successfully");
      setShowEditDialog(false);
      setLoading(false);
    } catch (err) {
      toast.success("Something went wrong");
      console.error("Update failed", err);
    }
  };

  // Fetch current user's videos
  const fetchMyVideos = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://localhost:5000/api/channels/my/channel",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setVideos(res.data);
    setMyVideos(res.data.videos);
    setChannelName(res.data.channelName);
  };

  // Fetch videos on mount
  useEffect(() => {
    fetchMyVideos();
  }, []);

  // Navigate to edit page
  const handleEdit = (video) => {
    navigate(`/edit-video/${video._id}`);
  };

  // Delete a video
  const handleDelete = async (videoId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.error("Video Deleted!");
      fetchMyVideos(); // refresh videos
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  // Upload a new banner to Cloudinary
  const handleBannerUpload = async (e) => {
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
      setEditForm((prev) => ({
        ...prev,
        channelBanner: data.secure_url,
      }));
    } catch (err) {
      console.error("Banner upload failed", err);
    }
  };

  return (
    <div className="w-full">
      {/* Banner image */}
      <div className="flex items-center justify-center">
        <img
          className="w-11/12 h-28 sm:h-64 rounded-2xl"
          src={channelBanner}
          alt="channel Banner"
        />
      </div>

      {/* Channel info section */}
      <div className="p-4 flex h-auto w-full">
        <img
          className="w-16 h-16 sm:w-40 sm:h-40 rounded-full mt-4"
          src={videos.channelBanner}
          alt="Video Thumbnail"
        />
        <div className="flex flex-col items-start ml-6 space-y-2 my-4">
          <div className="flex gap-6 justify-center items-center">
            <h1 className="text-normal sm:text-3xl font-bold">
              {videos.channelName}
            </h1>
            {/* Open edit modal */}
            <Pencil
              className="cursor-pointer"
              onClick={() => {
                setEditForm({
                  channelName: videos.channelName,
                  description: videos.description,
                  channelBanner: videos.channelBanner,
                });
                setShowEditDialog(true);
              }}
            />
          </div>

          <p className="font-semibold text-sm">@{videos.channelName}</p>
          <p className="">{videos?.description?.slice(0, 18)}...</p>

          {/* Subscribe and upload buttons */}
          <div className="flex gap-4 flex-wrap sm:flex-nowrap w-full">
            <button className="bg-neutral-900 w-full hover:bg-neutral-700 text-white duration-300 py-1 px-4 rounded-lg">
              Subscribe
            </button>
            <button
              onClick={() => {
                setDialog(!dialog);
              }}
              className="bg-neutral-200 w-full hover:bg-neutral-300 duration-300 py-1 px-4 rounded-lg"
            >
              Upload Video
            </button>
          </div>

          {/* Upload Video modal */}
          {dialog && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
                <Suspense fallback={<div>Loading...</div>}>
                  <VideoUpload
                    onClose={() => setDialog(false)}
                    dialog={dialog}
                    fetchMyVideos={fetchMyVideos}
                  ></VideoUpload>
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal separator */}
      <div className="border-b-1 mx-4 border-neutral-500"></div>

      {/* Edit Channel modal */}
      {showEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow w-96">
            <h2 className="text-xl font-bold mb-4">Edit Channel</h2>

            {/* Edit inputs */}
            <input
              type="text"
              name="channelName"
              placeholder="Channel Name"
              className="border p-2 rounded w-full mb-2"
              value={editForm.channelName}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  channelName: e.target.value,
                }))
              }
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              className="border p-2 rounded w-full mb-2"
              value={editForm.description}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            {/* Banner uploader */}
            <div className="mb-4">
              <label className="text-sm block mb-1 font-medium">
                Upload New Banner Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="border p-2 rounded w-full"
              />
              {editForm.channelBanner && (
                <img
                  src={editForm.channelBanner}
                  alt="Banner Preview"
                  className="w-full h-28 object-cover rounded mt-2"
                />
              )}
            </div>

            {/* Save / Cancel buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-1 rounded"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded"
                onClick={() => {
                  updateChannel();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* My Videos Section */}
      <div className="p-4">
        <p className="text-lg border-b w-22">My Videos</p>
        <div className="flex flex-wrap gap-6 my-4">
          {myVideos.map((item, index) => {
            return (
              <div
                className="bg-neutral-100 flex flex-col w-96 p-2 rounded-lg relative"
                key={index}
                onClick={() => navigate(`/videos/${item._id}`)}
              >
                <img
                  className="w-96 h-48"
                  src={item.thumbnailUrl}
                  alt={item.title}
                />
                <div className="flex justify-between my-2">
                  <p>{item.title}</p>
                  <EllipsisVertical
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu((prev) =>
                        prev === item._id ? null : item._id
                      );
                    }}
                    className="cursor-pointer"
                  />
                </div>

                {/* Dropdown menu for edit/delete */}
                {showMenu === item._id && (
                  <div
                    className="absolute right-4 top-58 bg-white rounded shadow z-10 p-2 space-y-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="block w-full text-left cursor-pointer px-2 py-1 rounded"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full text-left text-red-600 cursor-pointer px-2 py-1 rounded"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyChannel;
