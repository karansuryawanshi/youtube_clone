import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentBox from "../components/CommentBox";
import { jwtDecode } from "jwt-decode";
import { Dot } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Share, Download } from "lucide-react";
import { Edit } from "lucide-react";
import { DeleteIcon } from "lucide-react";
import { Ellipsis } from "lucide-react";
// import { ThumbsUp, ThumbsDown } from "lucide-react";

const dummyData = [
  {
    thumbnail:
      "https://i.ytimg.com/vi/Y1J9_9-vNcU/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAvlGqjh19grGmCslzUsFq4XvrB4A",
    title:
      "India Claim Thrilling Win! | England v India - Day 5 Highlights | 2nd LV= Insurance Test 2021",
    channelName: "England & whales cricket boards",
    views: "57M",
    uploaded: "3 years",
  },
  {
    thumbnail:
      "https://i.ytimg.com/vi/KdWPGqT5GwE/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCPJY1gX1djgrLJtWd75Mrkr3gaUQ",
    title: "Mastering HTML Tags for Web Development || Episode - 5",
    channelName: "CodeHelp - by Babbar",
    views: "596K",
    uploaded: "2 years",
  },
  {
    thumbnail:
      "https://i.ytimg.com/vi/JgDNFQ2RaLQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAfepbadY1CtatUH_d22OgkC1Q4-g",
    title: "Ed Sheeran - Sapphire (Official Music Video)",
    channelName: "Ed Sheeran",
    views: "47M",
    uploaded: "12 days",
  },
  {
    thumbnail:
      "https://i.ytimg.com/vi/4IOJW5-n0_8/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCCfSumHiembyTsmMum94bS7NSxjA",
    title: "Fake Podcast with Pakistani General | जनाब मक़सद",
    channelName: "satish ray",
    views: "4.5M",
    uploaded: "1 month",
  },
  {
    thumbnail:
      "https://i.ytimg.com/vi/1gukvtH_a3I/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGBsgTSh_MA8=&rs=AOn4CLC3ZDnb8cs0SeF0QE2hAzMi4gOJwA",
    title:
      "Chaudhary - Amit Trivedi feat Mame Khan, Coke Studio @ MTV Season 2",
    channelName: "Coke Studio India ",
    views: "111M",
    uploaded: "12 years",
  },
  {
    thumbnail:
      "https://i.ytimg.com/vi/ZDW94jpG-L4/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7oZEFxXeTWON3lr9jGOPzQ6bIw",
    title:
      "Foreign Secretary Vikram Misri on India-Canada Reset, Envoys to Return",
    channelName: "NewX Live",
    views: "140M",
    uploaded: "2 hours",
  },
];

const VideoPlayer = ({}) => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [channelId, setChannelId] = useState();
  const [channelName, setChannelName] = useState();
  const [channelThumbnail, setChannelThumbnail] = useState();
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);
  const [viewMore, setViewMore] = useState(true);
  const [commentDetails, setCommentDetails] = useState([]);
  const [commentLike, setCommentLike] = useState(false);
  const [commentDislike, setCommentDislike] = useState(false);
  const [videoDescription, setVideoDescription] = useState(false);

  const { sidebarCollapsed } = useOutletContext();

  // console.log(sidebarCollapsed);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos/${id}`)
      .then((res) => setVideo(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // const handleLike = async () => {
  //   const token = localStorage.getItem("token");
  //   await axios.put(`http://localhost:5000/api/videos/${id}/like`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //     credentials: true,
  //     allowedHeaders: ["Content-Type", "Authorization"],
  //   });
  //   setVideo((prev) => ({ ...prev, likes: prev.likes + 1 }));
  // };

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/api/videos/${id}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setVideo((prev) => ({ ...prev, likes: prev.likes + 1 }));
  };

  const handleDislike = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/api/videos/${id}/dislike`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setVideo((prev) => ({ ...prev, dislikes: prev.dislikes + 1 }));
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/videos/${id}`).then((res) => {
      setVideo(res.data);
      setComments(res.data.comments);
      setChannelId(res.data.channelId);
      setVideoDescription(res.data.videoDescription);
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

  const handleLikeChange = () => {
    setLiked(!liked);
    handleLike();
  };

  const handledisLikeChange = () => {
    setDisLiked(!disLiked);
    handleDislike();
  };

  if (!video) return <p>Loading...</p>;

  console.log(videoDescription.length);

  return (
    <>
      <div className="flex ">
        <div className="p-4">
          <video
            className={`rounded-lg p-4 ${
              sidebarCollapsed ? "min-w-[65rem]" : "min-w-[55rem]"
            }`}
            controls
            src={`http://localhost:5000${video.videoUrl}`}
          />
          <h2 className="text-xl font-bold mt-2">{video.title}</h2>
          <div className="flex gap-4 my-4">
            <img
              src={channelThumbnail}
              alt="channel thumbnail"
              className="w-12 rounded-full"
            />
            <div>
              <p className=" font-semibold">{channelName}</p>
              <p className="font-light text-sm">2.4k subscribers</p>
            </div>
            <div className="flex items-center bg-black rounded-full my-2 px-4 py-1 text-white mx-6">
              <button>Subscribe</button>
            </div>
            <div className="flex gap-4 mx-auto">
              <div className="flex ">
                <span
                  className=" px-4 flex border-r items-center justify-center my-2 rounded-l-lg gap-1 bg-neutral-200"
                  onClick={() => {
                    handleLikeChange();
                  }}
                >
                  <ThumbsUp
                    className={liked ? "fill-neutral-700" : "fill-none"}
                  ></ThumbsUp>
                  <span className="text-lg">{video.likes}</span>
                </span>
                <span
                  className=" px-4 flex items-center my-2 rounded-r-lg justify-center gap-1 bg-neutral-200"
                  onClick={() => {
                    handledisLikeChange();
                  }}
                >
                  <ThumbsDown
                    className={disLiked ? "fill-neutral-700" : "fill-none"}
                  ></ThumbsDown>
                  <span className="text-lg">{video.dislikes}</span>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center bg-neutral-200 my-2 px-2 rounded-lg text-neutral-700">
                  <Share></Share>
                  Share
                </span>
                <span className="flex items-center bg-neutral-200 my-2 px-2 rounded-lg text-neutral-700">
                  <Download></Download>
                  Download
                </span>
                <span>
                  <Ellipsis className="flex items-center justify-center mt-2 bg-neutral-200 h-8 w-8 rounded-full text-neutral-700" />
                </span>
              </div>
            </div>
          </div>
          <div
            className={`w-[54rem] ${
              sidebarCollapsed ? "w-[65rem]" : "w-[55rem]"
            }`}
          >
            <div className="bg-neutral-200 p-2 rounded-lg">
              <p className="flex gap-2 text-sm font-semibold">
                <span>379,650 views</span>
                <span>11 May 2023</span>
              </p>
              <div className="flex flex-col">
                {videoDescription.length > 275 ? (
                  <p>{videoDescription.slice(0, 275)}</p>
                ) : (
                  <p>{videoDescription}</p>
                )}
              </div>
            </div>
            <CommentBox
              videoId={id}
              onCommentAdded={handleNewComment}
              commentDetails={setCommentDetails}
            />

            <div className="mt-4 space-y-4">
              {comments.map((c) => {
                console.log("[c]", c.userId.username);
                return (
                  <div
                    key={c._id}
                    className="flex flex-col gap-2 bg-neutral-200 rounded-lg p-2"
                  >
                    <div className="flex justify-between">
                      <div className="">
                        <div className="flex gap-10 items-center">
                          <p>@{c.userId.username}</p>
                          <small className="text-xs">
                            {new Date(c.timestamp).toLocaleString()}
                          </small>
                        </div>
                        <p className="">{c.text}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-red-500 text-sm ml-2"
                        >
                          <DeleteIcon></DeleteIcon>
                        </button>
                        <button
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-neutral-800 text-sm ml-2"
                        >
                          <Edit />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <ThumbsUp
                        className={`w-5 ${commentLike ? "fill-black" : ""}`}
                        onClick={() => {
                          setCommentLike(!commentLike);
                        }}
                      />
                      <ThumbsDown
                        className={`w-5 ${commentDislike ? "fill-black" : ""}`}
                        onClick={() => {
                          setCommentDislike(!commentDislike);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[25em] mt-4 mx-2">
        <section className="flex flex-col gap-3 ">
          {dummyData.map((item) => {
            return (
              <article className="flex">
                <img
                  className="w-[17rem] h-[6rem] mr-2 rounded-lg"
                  src={item.thumbnail}
                  alt=""
                />
                <div className="text-sm">
                  {item.title.length > 52 ? (
                    <p className="mb-1">{item.title.slice(0, 45)}...</p>
                  ) : (
                    <p className="mb-1">{item.title}</p>
                  )}
                  <p className="mb-1 text-neutral-600 hover:text-neutral-800 duration-300 cursor-pointer">
                    {item.channelName}
                  </p>
                  <div className="flex">
                    <span className="text-neutral-600">{item.views} Views</span>
                    <span>
                      <Dot className="text-neutral-600"></Dot>
                    </span>
                    <span className="text-neutral-600">
                      {item.uploaded} ago
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default VideoPlayer;
