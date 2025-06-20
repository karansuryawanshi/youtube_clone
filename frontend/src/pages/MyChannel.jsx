import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { useNavigate } from "react-router-dom";
import VideoUpload from "../components/VideoUpload";

const MyChannel = () => {
  const [videos, setVideos] = useState([]);
  const [myVideos, setMyVideos] = useState([]);
  const [dialog, setDialog] = useState(false);

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
    console.log(res.data);
  };

  useEffect(() => {
    fetchMyVideos();
  }, []);

  return (
    <div className="w-full">
      <div className="p-4 flex h-auto ">
        <img
          className="w-40 h-40 rounded-full"
          src="https://images.unsplash.com/photo-1750126833705-ba98013f16f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="flex flex-col items-start ml-6 space-y-2 my-4 ">
          <h1 className="text-3xl font-bold">The Walking India</h1>
          <p className="font-semibold">@The Walking India</p>
          <p>Hello This is Description</p>
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
      <div className="p-4">
        <p className="text-lg border-b w-22">My Videos</p>
        <div className="flex flex-wrap gap-6 my-4">
          {myVideos.map((item) => {
            return (
              <div
                className="bg-neutral-100 flex flex-col w-96 p-2 rounded-lg"
                onClick={() => {
                  navigate(`/videos/${item._id}`);
                }}
              >
                <img className="w-96 h-48" src={item.thumbnailUrl} alt="" />
                <p className="my-2">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyChannel;
