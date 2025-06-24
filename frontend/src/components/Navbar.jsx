import React, { useEffect, useState } from "react";
import { User, Menu, Search, BadgePlus } from "lucide-react";
import { useChannel } from "../context/ChannelContext";
import { useUser } from "../context/UserContext";
import { useSearch } from "../context/SearchContext";
import { useNavigate, Link } from "react-router-dom";

import YoutubeLogo from "../assets/youtubeLogo.png";

const Navbar = ({ onHamburgerClick }) => {
  const [userLogo, setUserLogo] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const { search, setSearch } = useSearch();
  const { channel } = useChannel();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Update user logo from first letter of username
  useEffect(() => {
    setUserLogo(user?.username?.[0]);
  }, [user]);

  return (
    <>
      <div className="mx-4 flex justify-between">
        {/* Left section: Hamburger + Logo */}
        <div className="flex items-center justify-center gap-2">
          <span onClick={onHamburgerClick}>
            <Menu className="text-neutral-700" />
          </span>
          <span>
            <img
              width={100}
              height={100}
              src={YoutubeLogo}
              alt="youtube Logo"
            />
          </span>
        </div>

        {/* Middle section: Search Bar */}
        <div className="my-4 flex border-2 rounded-full border-neutral-500 items-center px-2 mr-2">
          <input
            id="search"
            type="text"
            className="w-10/12 md:w-[35rem] py-1 sm:py-2 px-2 border-r-1 border-neutral-600 focus:outline-0"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor="search">
            <Search className="text-neutral-600 mx-0 sm:mx-2" />
          </label>
        </div>

        {/* Right section: Create Channel / User Profile / Login */}
        <div className="my-auto flex gap-4">
          {/* Show 'Create Channel' if user has no channel */}
          {channel?.message === "Channel not found" && (
            <Link to="/create-channel">
              <BadgePlus className="text-xl" />
            </Link>
          )}

          {/* If user is logged in, show user logo & dropdown */}
          {userLogo ? (
            <div className="relative">
              <button
                className="bg-purple-800 text-amber-50 rounded-full w-8 h-8 text-2xl flex items-center justify-center"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                {userLogo?.toUpperCase()}
              </button>

              {/* Dropdown menu */}
              {showMenu && (
                <div
                  className="absolute right-0 mt-2 bg-white shadow-md rounded w-36 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {channel?.message == null ? (
                    <button
                      onClick={() => {
                        navigate("/my-channel");
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      My Channel
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/create-channel");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Create Channel
                    </button>
                  )}
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
            // Show login/signup if not logged in
            <Link
              to="/login"
              className="flex border-1 border-neutral-500 px-2 py-1 rounded-full"
            >
              <User className="cursor-pointer text-blue-500" />
              <span className="text-blue-500 cursor-pointer hidden lg:block">
                Sign in
              </span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
