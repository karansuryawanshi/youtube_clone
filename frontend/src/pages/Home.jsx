// https://github.com/karansuryawanshi/youtube_clone

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useUser } from "../context/UserContext";
import { LogIn } from "lucide-react";

// Category filter list
const categories = [
  "All",
  "Code",
  "Science",
  "Sports",
  "Gaming",
  "Podcast",
  "Nature",
];

const Home = () => {
  const [videos, setVideos] = useState([]); // Stores fetched videos
  const [selected, setSelected] = useState("All"); // Tracks selected category

  const { search } = useSearch(); // Search query from context
  const { user } = useUser(); // Current user from context

  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    const fetchVideos = async () => {
      // Prepare category filter (empty string for 'All')
      const categoryQuery =
        selected.trim().toLowerCase() === "all"
          ? ""
          : selected.trim().toLowerCase();

      try {
        // Fetch videos from backend with optional search and category filter
        const res = await axios.get("http://localhost:5000/api/videos", {
          params: {
            search,
            category: categoryQuery,
          },
        });
        setVideos(res.data); // Set videos in state
      } catch (err) {
        console.error("Error fetching videos", err);
      }
    };
    fetchVideos(); // Call on mount and when search/category changes
  }, [search, selected]);

  // If user is not logged in, show sign-in prompt
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
              {/* Link to login page */}
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

  // If user is signed in, show video list with categories
  {
    return (
      <div className="w-[-webkit-fill-available] h-screen mx-0 sm:mx-4 overflow-y-scroll scroll-m-0 [scrollbar-width:none]">
        {/* Category buttons */}
        <div className="px-4">
          <ul className="flex gap-6 overflow-x-scroll scroll-m-0 [scrollbar-width:none]">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => setSelected(category)} // Set selected category on click
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

        {/* Video grid */}
        <div className="my-6 flex items-center">
          <section className="flex flex-wrap gap-8 mx-auto w-screen items-center justify-center lg:justify-start">
            {videos.map((item, index) => {
              return (
                <article
                  key={index}
                  onClick={() => {
                    navigate(`/videos/${item._id}`); // Navigate to video page
                  }}
                  className="w-[20rem] rounded-lg overflow-hidden bg-neutral-100 p-1 hover:scale-105 duration-300"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.thumbnailUrl}
                    alt="image"
                    className="rounded-lg w-96 h-48"
                  />
                  <div className="p-2">
                    {/* Video title */}
                    <p className="font-semibold">{item.title}</p>

                    {/* Channel name */}
                    <p className="text-neutral-600 cursor-pointer hover:text-neutral-900 duration-200">
                      {item.channelId.channelName}
                    </p>

                    {/* Views and time */}
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
