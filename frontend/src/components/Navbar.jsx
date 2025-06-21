import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
// import { Youtube } from "lucide-react";
import { User } from "lucide-react";
import { Search } from "lucide-react";
import { BadgePlus } from "lucide-react";
import { useChannel } from "../context/ChannelContext";
import { useUser } from "../context/UserContext";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import YoutubeLogo from "../assets/youtubeLogo.png";

const Navbar = ({ onHamburgerClick }) => {
  // const [channel, setChannel] = useState(null);
  const { channel, loading } = useChannel();
  const { user } = useUser();
  const { search, setSearch } = useSearch();
  const [userLogo, setUserLogo] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  // setUserLogo(user.username);
  useEffect(() => {
    setUserLogo(user?.username[0]);
  });

  const navigate = useNavigate();
  const { logout } = useUser();

  return (
    <>
      <div className="mx-4 flex justify-between">
        <div className="flex items-center justify-center gap-2">
          <span onClick={onHamburgerClick}>
            <Menu className="text-neutral-700" />
          </span>
          <span>
            <img width={100} height={100} src={YoutubeLogo} alt="" />
          </span>
        </div>
        <div className="my-4 flex border-2 rounded-full border-neutral-500 items-center px-2">
          <input
            id="search"
            type="text"
            className=" w-[35rem] py-2 px-2 border-r-1 border-neutral-600 focus:outline-0"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor="search">
            <Search className="text-neutral-600 mx-2"></Search>
          </label>
        </div>
        <div className="my-auto flex gap-4">
          {channel?.message == "Channel not found" && (
            <Link to="/create-channel">
              <BadgePlus className="text-xl" />
            </Link>
          )}
          {userLogo ? (
            <div className="relative">
              {/* Avatar Button */}
              <button
                className="bg-purple-800 text-amber-50 rounded-full w-8 h-8 pb-1 text-2xl flex items-center justify-center"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                {userLogo}
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div
                  className="absolute right-0 mt-2 bg-white shadow-md rounded w-36 z-50"
                  onClick={(e) => e.stopPropagation()} // prevent menu from closing
                >
                  <button
                    onClick={() => {
                      navigate("/my-channel");
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Channel
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex border-1 border-neutral-500 px-2 py-1 rounded-full"
            >
              <User className="cursor-pointer text-blue-500"></User>
              <span className="text-blue-500 cursor-pointer">Sign up</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
