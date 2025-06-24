import React from "react";
import { useLocation, Link } from "react-router-dom";

// Lucide icons
import {
  ThumbsUp,
  ChevronRight,
  Zap,
  Home,
  MonitorPlay,
  ListVideo,
  History,
  SquarePlay,
  Clock,
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
  CircleUserRound,
  Settings,
  Flag,
  HelpCircle,
  MessageSquareWarning,
} from "lucide-react";

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  // Check if current path is Home to set active styling
  const isHome = () => location.pathname === "/";

  // Top main navigation links
  const sidebarLinks = [
    { name: "Home", Icons: Home, active: isHome(), url: "/" },
    { name: "Shorts", Icons: Zap, active: false },
    { name: "Subscription", Icons: MonitorPlay, active: false },
  ];

  // 'You' section links
  const sidebarLinksYou = [
    { name: "History", Icons: History, active: false },
    { name: "Playlist", Icons: ListVideo, active: false },
    { name: "Your Videos", Icons: SquarePlay, active: false },
    { name: "Watch Later", Icons: Clock, active: false },
    { name: "Liked Videos", Icons: ThumbsUp, active: false },
  ];

  // Explore section categories
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

  // Settings & support links
  const settingsMenu = [
    { name: "Settings", Icons: Settings },
    { name: "Report history", Icons: Flag },
    { name: "Help", Icons: HelpCircle },
    { name: "Send feedback", Icons: MessageSquareWarning },
  ];

  // Render collapsed sidebar for smaller width
  if (collapsed) {
    return (
      <div
        className={`transition-all duration-300 ${
          collapsed ? "w-0 sm:w-14" : ""
        }`}
      >
        <ul className="hidden sm:flex items-center justify-center flex-col gap-8 mt-6">
          <li>
            <Home size={28} />
          </li>
          <li>
            <Zap size={28} />
          </li>
          <li>
            <MonitorPlay size={28} />
          </li>
          <li>
            <CircleUserRound size={28} />
          </li>
        </ul>
      </div>
    );
  }

  // Full sidebar when expanded
  return (
    <div className="bg-white w-62 transition-all duration-300 z-50 absolute md:relative left-0 t-0 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-100">
      {/* Primary section */}
      <div className="border-b-1 border-neutral-400 py-2">
        {sidebarLinks.map((item, index) => (
          <div
            key={index}
            className={`flex mx-4 gap-4 px-2 py-2 rounded-lg cursor-pointer ${
              item.active
                ? "bg-neutral-500/10"
                : "hover:bg-neutral-500/10 duration-300"
            }`}
          >
            {item.url ? (
              <Link to={item.url} className="flex gap-4">
                <item.Icons
                  className={item.active ? "text-black" : "font-semibold"}
                />
                <span>{item.name}</span>
              </Link>
            ) : (
              <>
                <item.Icons
                  className={item.active ? "text-black" : "font-semibold"}
                />
                <span>{item.name}</span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* You section */}
      <div className="border-b border-neutral-400">
        <span className="flex items-center mx-4 px-2 py-2 rounded-lg cursor-pointer">
          <span className="text-lg">You</span>
          <ChevronRight />
        </span>
        {sidebarLinksYou.map((item, index) => (
          <div
            key={index}
            className={`flex mx-4 gap-4 px-2 py-2 rounded-lg cursor-pointer ${
              item.active
                ? "bg-neutral-500/10"
                : "hover:bg-neutral-500/10 duration-300"
            }`}
          >
            <item.Icons
              className={item.active ? "text-black" : "font-semibold"}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Explore section */}
      <div className="border-b border-neutral-400">
        <span className="flex items-center mx-4 px-2 py-2 rounded-lg cursor-pointer text-lg">
          Explore
        </span>
        {categories.map((item, index) => (
          <div
            key={index}
            className="flex mx-4 gap-4 px-2 py-2 rounded-lg hover:bg-neutral-500/10 duration-300 cursor-pointer"
          >
            <item.Icons className="font-semibold" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Settings section */}
      <div className="border-b border-neutral-400 my-4">
        {settingsMenu.map((item, index) => (
          <div
            key={index}
            className="flex mx-4 gap-4 px-2 py-2 rounded-lg hover:bg-neutral-500/10 duration-300 cursor-pointer"
          >
            <item.Icons className="font-semibold" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
