// import { icons } from "lucide-react";
import React from "react";
import { Home } from "lucide-react";
import { Zap } from "lucide-react";
import { useLocation } from "react-router-dom";
import { MonitorPlay } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { History } from "lucide-react";
import { ListVideo } from "lucide-react";
import { SquarePlay } from "lucide-react";
import { Clock } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import {
  Flame,
  ShoppingBag,
  Music,
  Clapperboard,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  GraduationCap,
  Shirt,
  Podcast,
} from "lucide-react";

import { Settings, Flag, HelpCircle, MessageSquareWarning } from "lucide-react";

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  // console.log("[sidebar]", collapsed);
  function isHome() {
    if (location.pathname === "/") {
      return true;
    } else {
      return false;
    }
  }

  const sidebarLinks = [
    {
      name: "Home",
      Icons: Home,
      active: isHome(),
    },
    {
      name: "Shorts",
      Icons: Zap,
      active: false,
    },
    {
      name: "Subscription",
      Icons: MonitorPlay,
      active: false,
    },
  ];

  const sidebarLinksYou = [
    {
      name: "History",
      Icons: History,
      active: false,
    },
    {
      name: "Playlist",
      Icons: ListVideo,
      active: false,
    },
    {
      name: "Your Videos",
      Icons: SquarePlay,
      active: false,
    },
    {
      name: "Watch Later",
      Icons: Clock,
      active: false,
    },
    {
      name: "Liked Videos",
      Icons: ThumbsUp,
      active: false,
    },
  ];

  const categories = [
    { name: "Trending", Icons: Flame },
    { name: "Shopping", Icons: ShoppingBag },
    { name: "Music", Icons: Music },
    { name: "Films", Icons: Clapperboard },
    { name: "Live", Icons: Radio },
    { name: "Gaming", Icons: Gamepad2 },
    { name: "News", Icons: Newspaper },
    { name: "Sport", Icons: Trophy },
    { name: "Courses", Icons: GraduationCap },
    { name: "Fashion & beauty", Icons: Shirt },
    { name: "Podcasts", Icons: Podcast },
  ];

  const settingsMenu = [
    { name: "Settings", Icons: Settings },
    { name: "Report history", Icons: Flag },
    { name: "Help", Icons: HelpCircle },
    { name: "Send feedback", Icons: MessageSquareWarning },
  ];

  if (collapsed) {
    return (
      <div
        className={`transition-all duration-300 bg-gray-200 ${
          collapsed ? "w-0" : ""
        }`}
      ></div>
    );
  } else {
    return (
      <>
        <div className="bg-white z-50 absolute md:relative left-0 t-0 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-100">
          <div className="border-b-1 border-neutral-400 py-2">
            {sidebarLinks.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    item.active
                      ? "flex mx-4 gap-4 px-2 py-2 bg-neutral-500/10 rounded-lg cursor-pointer"
                      : "flex mx-4 gap-4 px-2 py-2 bg-white rounded-lg hover:bg-neutral-500/10 duration-300 cursor-pointer"
                  }
                >
                  <span className="">
                    <item.Icons
                      className={item.active ? "text-black" : "font-semibold"}
                    />
                  </span>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>

          <div className="border-b border-neutral-400">
            <div>
              <span className="flex items-center mx-4 px-2 py-2 rounded-lg cursor-pointer">
                <span className="text-lg">You</span>
                <ChevronRight></ChevronRight>
              </span>
            </div>
            {sidebarLinksYou.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    item.active
                      ? "flex mx-4 gap-4 px-2 py-2 bg-neutral-500/10 rounded-lg cursor-pointer"
                      : "flex mx-4 gap-4 px-2 py-2 bg-white rounded-lg hover:bg-neutral-500/10 duration-300 cursor-pointer"
                  }
                >
                  <span className="">
                    <item.Icons
                      className={item.active ? "text-black" : "font-semibold"}
                    />
                  </span>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>

          <div className="border-b border-neutral-400">
            <div>
              <span className="flex items-center mx-4 px-2 py-2 rounded-lg cursor-pointer">
                <span className="text-lg">Explore</span>
              </span>
            </div>
            {categories.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    item.active
                      ? "flex mx-4 gap-4 px-2 py-2 bg-neutral-500/10 rounded-lg cursor-pointer"
                      : "flex mx-4 gap-4 px-2 py-2 bg-white rounded-lg hover:bg-neutral-500/10 duration-300 cursor-pointer"
                  }
                >
                  <span className="">
                    <item.Icons
                      className={item.active ? "text-black" : "font-semibold"}
                    />
                  </span>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>

          <div className="border-b border-neutral-400 my-4">
            {settingsMenu.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    item.active
                      ? "flex mx-4 gap-4 px-2 py-2 bg-neutral-500/10 rounded-lg cursor-pointer"
                      : "flex mx-4 gap-4 px-2 py-2 bg-white rounded-lg hover:bg-neutral-500/10 duration-300 cursor-pointer"
                  }
                >
                  <span className="">
                    <item.Icons
                      className={item.active ? "text-black" : "font-semibold"}
                    />
                  </span>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default Sidebar;
