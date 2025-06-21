import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { useNavigate } from "react-router-dom";
import VideoUpload from "../components/VideoUpload";
import { Pencil } from "lucide-react";

const MyChannel = () => {
  const [videos, setVideos] = useState([]);
  const [myVideos, setMyVideos] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [channelName, setChannelName] = useState();
  const [editForm, setEditForm] = useState({
    channelName: "",
    description: "",
    channelBanner: "",
  });

  const navigate = useNavigate();

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
    console.log(res.data.channelBanner);
  };

  useEffect(() => {
    fetchMyVideos();
  }, []);

  return (
    <div className="w-full">
      <div className="p-4 flex h-auto ">
        <img
          className="w-40 h-40 rounded-full"
          src={videos.channelBanner}
          alt=""
        />
        <div className="flex flex-col items-start ml-6 space-y-2 my-4">
          <div className="flex gap-6 justify-center items-center">
            <h1 className="text-3xl font-bold">{videos.channelName}</h1>
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
          <p className="font-semibold">@{videos.channelName}</p>
          <p>{videos.description}</p>
          <button
            onClick={() => {
              setDialog(!dialog);
            }}
            className="bg-neutral-200 hover:bg-neutral-300 duration-300 py-1 px-4 rounded-lg"
          >
            Upload Video
          </button>
          {dialog && (
            <VideoUpload onUploadSuccess={fetchMyVideos}></VideoUpload>
          )}
        </div>
      </div>
      <div className="border-b-1 mx-4 border-neutral-500"></div>
      {/* /////////////////////////////////////////////////////////// */}

      {showEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow w-96">
            <h2 className="text-xl font-bold mb-4">Edit Channel</h2>

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

            {/* 👇 Cloudinary Upload for Banner */}
            <div className="mb-4">
              <label className="text-sm block mb-1 font-medium">
                Upload New Banner Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", "oxqufdxz"); // your unsigned preset

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
                }}
                className="border p-2 rounded w-full"
              />

              {/* ✅ Show banner preview */}
              {editForm.channelBanner && (
                <img
                  src={editForm.channelBanner}
                  alt="Banner Preview"
                  className="w-full h-28 object-cover rounded mt-2"
                />
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-1 rounded"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded"
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  try {
                    await axios.put(
                      "http://localhost:5000/api/channels/my/channel",
                      editForm,
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );
                    await fetchMyVideos();
                    setShowEditDialog(false);
                  } catch (err) {
                    console.error("Update failed", err);
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ////////////////////////////////////////////////////////// */}

      <div className="p-4">
        <p className="text-lg border-b w-22">My Videos</p>
        <div className="flex flex-wrap gap-6 my-4">
          {myVideos.map((item) => {
            return (
              <>
                <div
                  className="bg-neutral-100 flex flex-col w-96 p-2 rounded-lg"
                  onClick={() => {
                    navigate(`/videos/${item._id}`);
                  }}
                >
                  <img className="w-96 h-48" src={item.thumbnailUrl} alt="" />
                  <p className="my-2">{item.title}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyChannel;
