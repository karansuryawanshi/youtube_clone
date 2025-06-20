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

import YoutubeLogo from "../assets/youtubeLogo.png";

const Navbar = ({ onHamburgerClick }) => {
  // const [channel, setChannel] = useState(null);
  const { channel, loading } = useChannel();
  const { user } = useUser();
  const { search, setSearch } = useSearch();
  const [userLogo, setUserLogo] = useState("");

  // setUserLogo(user.username);
  useEffect(() => {
    setUserLogo(user?.username[0]);
  });

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
            <BadgePlus className="text-xl" />
          )}
          {userLogo ? (
            <span className="bg-purple-800 text-amber-50 rounded-full w-8 h-8 pb-1 text-3xl flex items-center justify-center">
              {userLogo}
            </span>
          ) : (
            <Link to="/login" className="flex">
              <User className="cursor-pointer"></User>
              <span className="text-blue-500 cursor-pointer">Sign up</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
