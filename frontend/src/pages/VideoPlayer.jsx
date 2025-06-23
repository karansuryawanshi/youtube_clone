import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentBox from "../components/CommentBox";
import { jwtDecode } from "jwt-decode";
import { useOutletContext } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Share,
  Download,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import DummySuggession from "../components/DummySuggession";
import { toast } from "react-toastify";

const VideoPlayer = ({}) => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [channelId, setChannelId] = useState();
  const [channelName, setChannelName] = useState();
  const [channelThumbnail, setChannelThumbnail] = useState();
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);
  const [commentDetails, setCommentDetails] = useState([]);
  const [likedComments, setLikedComments] = useState({});
  const [dislikedComments, setDislikedComments] = useState({});
  const [videoDescription, setVideoDescription] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const { sidebarCollapsed } = useOutletContext();

  const { user } = useUser();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos/${id}`)
      .then((res) => setVideo(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleLike = async () => {
    if (liked) return;

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/videos/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setVideo((prev) => ({
        ...prev,
        likes: prev.likes + 1,
      }));
      setLiked(true);

      if (disLiked) {
        setVideo((prev) => ({
          ...prev,
          dislikes: prev.dislikes - 1,
        }));
        setDisLiked(false);
      }
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleDislike = async () => {
    if (disLiked) return;

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/videos/${id}/dislike`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setVideo((prev) => ({
        ...prev,
        dislikes: prev.dislikes + 1,
      }));

      setDisLiked(true);
      if (liked) {
        setVideo((prev) => ({
          ...prev,
          likes: prev.likes - 1,
        }));
        setLiked(false);
      }
    } catch (err) {
      console.error("Dislike failed", err);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/videos/${id}`).then((res) => {
      setVideo(res.data);
      setComments(res.data.comments);
      setChannelId(res.data.channelId);
      setVideoDescription(res.data.videoDescription);
      // console.log(res.data);
    });
  }, [id]);

  useEffect(() => {
    {
      channelId &&
        axios
          .get(`http://localhost:5000/api/channels/${channelId}`)
          .then((res) => {
            setChannelName(res.data.channelName);
            setChannelThumbnail(res.data.channelBanner);
          });
    }
  });

  const handleNewComment = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.error("Comment Deleted");
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  }

  const handleSaveEdit = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token || !editedText.trim()) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/comments/${commentId}`,
        { text: editedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, text: res.data.comment.text } : c
        )
      );

      setEditingCommentId(null);
      toast.success("comment updated");
      setEditedText("");
    } catch (err) {
      console.error("Failed to update comment", err);
    }
  };

  const handleLikeChange = () => {
    setLiked(!liked);
    handleLike();
  };

  const handledisLikeChange = () => {
    setDisLiked(!disLiked);
    handleDislike();
  };

  if (!video) return <p>Loading...</p>;

  // console.log(videoDescription);

  return (
    <div className="h-screen w-screen grid grid-cols-1 xl:grid-cols-[70%_30%] mx-2 overflow-x-hidden overflow-y-scroll scroll-m-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden my-4">
      <div className="flex w-100%">
        <div className="p-4">
          <video
            className={`rounded-lg p-0 w-screen`}
            controls
            src={`http://localhost:5000${video.videoUrl}`}
          />
          <h2 className="text-xl font-bold mt-2">{video.title}</h2>
          <div className="flex flex-wrap gap-2 my-4">
            <div className="flex gap-2">
              <img
                src={channelThumbnail}
                alt="channel thumbnail"
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full"
              />
              <div>
                <p className=" font-semibold">{channelName}</p>
                <p className="font-light text-sm">2.4k subscribers</p>
              </div>
              <div className="flex items-center bg-black hover:bg-neutral-800 duration-300 rounded-full my-2 px-2 sm:px-4 text-white ml-2">
                <button>Subscribe</button>
              </div>
            </div>
            <div className="flex gap-2 mx-auto">
              <div className="flex ">
                <span
                  className=" px-2 sm:px-4 flex border-r items-center justify-center my-2 rounded-l-lg gap-1 bg-neutral-200"
                  onClick={() => {
                    handleLikeChange();
                  }}
                >
                  <ThumbsUp
                    className={`w-5 cursor-pointer ${
                      liked ? "fill-neutral-700" : "fill-none"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike();
                    }}
                  />
                  <span className="text-sm md:text-lg">{video.likes}</span>
                </span>
                <span
                  className=" px-2 sm:px-4 flex items-center my-2 rounded-r-lg justify-center gap-1 bg-neutral-200"
                  onClick={() => {
                    handledisLikeChange();
                  }}
                >
                  <ThumbsDown
                    className={`w-5 cursor-pointer ${
                      disLiked ? "fill-neutral-700" : "fill-none"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDislike();
                    }}
                  />
                  <span className="text-sm md:text-lg">{video.dislikes}</span>
                </span>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center bg-neutral-200 my-2 px-2 rounded-lg text-neutral-700 text-sm sm:text-normal  ">
                  <Share className="w-4 sm:w-6"></Share>
                  Share
                </span>
                <span className="flex items-center bg-neutral-200 my-2 px-2 rounded-lg text-neutral-700 text-sm sm:text-normal ">
                  <Download className="w-4 sm:w-6"></Download>
                  Download
                </span>
              </div>
            </div>
          </div>
          <div className={` `}>
            <div className="bg-neutral-200 p-2 rounded-lg">
              <p className="flex gap-2 text-sm font-semibold">
                <span>379,650 views</span>
                <span>11 May 2023</span>
              </p>
              <div className="flex flex-col">
                {videoDescription && <p>{videoDescription.slice(0, 275)}</p>}
              </div>
            </div>
            <CommentBox
              videoId={id}
              onCommentAdded={handleNewComment}
              commentDetails={setCommentDetails}
            />

            <div className="mt-4 space-y-4">
              {comments.map((c) => {
                // console.log("[c]", c.userId._id);
                return (
                  <div
                    key={c._id}
                    className="flex flex-col gap-2 bg-neutral-200 rounded-lg p-2"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex gap-10 items-center">
                          <p>@{c.userId.username}</p>
                          <small className="text-xs hidden sm:block">
                            {new Date(c.timestamp).toLocaleString()}
                          </small>
                        </div>

                        {editingCommentId === c._id ? (
                          <div className="flex flex-wrap gap-2 mt-2">
                            <input
                              type="text"
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                              className="border p-1 rounded w-auto"
                            />
                            <button
                              onClick={() => handleSaveEdit(c._id)}
                              className="text-blue-600 text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="text-gray-500 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <p>{c.text}</p>
                        )}
                      </div>
                      {user._id == c.userId._id ? (
                        <div>
                          <button
                            onClick={() => handleDeleteComment(c._id)}
                            className="text-red-400 text-sm ml-2"
                          >
                            <Trash2 />
                          </button>
                          <button
                            onClick={() => {
                              setEditingCommentId(c._id);
                              setEditedText(c.text);
                            }}
                            className="text-neutral-700 text-sm ml-2"
                          >
                            <Pencil />
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <ThumbsUp
                        className={`w-5 cursor-pointer ${
                          likedComments[c._id] ? "fill-black" : ""
                        }`}
                        onClick={() =>
                          setLikedComments((prev) => ({
                            ...prev,
                            [c._id]: !prev[c._id],
                          }))
                        }
                      />

                      <ThumbsDown
                        className={`w-5 cursor-pointer ${
                          dislikedComments[c._id] ? "fill-black" : ""
                        }`}
                        onClick={() =>
                          setDislikedComments((prev) => ({
                            ...prev,
                            [c._id]: !prev[c._id],
                          }))
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-4 mx-auto">
        <DummySuggession></DummySuggession>
      </div>
    </div>
  );
};

export default VideoPlayer;
