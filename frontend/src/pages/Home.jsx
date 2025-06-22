import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { Link } from "react-router-dom";
import { Dot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
// import { useUser } from "../context/UserContext";
import { useUser } from "../context/UserContext";
import { HomeIcon } from "lucide-react";
// import { LogIn } from "lucide-react";
import { LogIn } from "lucide-react"; // Optional icon

// import { UserProvider } from "./context/UserContext";

const categories = [
  "All",
  "Code",
  "Music",
  "Sports",
  "Gaming",
  "Podcasts",
  "Cricket",
];

const Home = () => {
  const [videos, setVideos] = useState([]);
  // const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { search } = useSearch();

  // const [videoId, setVideoId] = useState();

  const [selected, setSelected] = useState("All");
  const { user } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const categoryQuery =
        selected.trim().toLowerCase() === "all"
          ? ""
          : selected.trim().toLowerCase();

      try {
        const res = await axios.get("http://localhost:5000/api/videos", {
          params: {
            search,
            category: categoryQuery,
          },
        });
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos", err);
      }
    };

    fetchVideos();
  }, [search, selected]);

  if (!user) {
    return (
      <div className="w-[-webkit-fill-available] flex items-center justify-center">
        <div className="w-auto flex flex-col items-center justify-center">
          <div className="px-4">
            <div className="bg-neutral-200 p-4 rounded-xl">
              <div className="text-4xl font-semibold mb-4">
                You're not signed in
              </div>
              <p className="text-gray-600 text-lg mb-6">
                Sign in to like videos, comment, and subscribe.
              </p>
              <Link
                to="/login"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
              >
                <LogIn className="w-6 h-6" />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  {
    return (
      <div className="w-[-webkit-fill-available] h-screen overflow-y-scroll scroll-m-0 [scrollbar-width:none]">
        <div className="px-4">
          <ul className="flex gap-6 overflow-x-scroll scroll-m-0 [scrollbar-width:none]">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => setSelected(category)}
                className={`border-2 px-2 rounded-lg cursor-pointer border-black transition-colors duration-200 ${
                  selected === category
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="my-6 flex items-center">
          <section className="flex flex-wrap gap-8 mx-auto w-screen items-center justify-center lg:justify-start">
            {videos.map((item) => {
              return (
                <article
                  onClick={() => {
                    navigate(`/videos/${item._id}`);
                  }}
                  className="w-[20rem] rounded-lg overflow-hidden bg-neutral-100 p-1 hover:scale-105 duration-300"
                >
                  <img
                    src={item.thumbnailUrl}
                    alt="image"
                    className="rounded-lg w-96 h-48"
                  />
                  <div className="p-2">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-neutral-600 cursor-pointer hover:text-neutral-900 duration-200">
                      {item.channelId.channelName}
                    </p>
                    <p className="text-neutral-600 flex">
                      <span>33M views</span>
                      <Dot></Dot>
                      <span>1 Year ago</span>
                    </p>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </div>
    );
  }
};

export default Home;
