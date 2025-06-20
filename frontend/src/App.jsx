import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import MyChannel from "./pages/MyChannel";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <Navbar onHamburgerClick={() => setSidebarCollapsed((prev) => !prev)} />
      <div className="flex">
        {/* <Sidebar collapsed={sidebarCollapsed}></Sidebar> */}
        {/* <div className="overflow-y-scroll h-full"> */}
        <Sidebar collapsed={sidebarCollapsed} />
        {/* </div> */}
        <Outlet context={{ sidebarCollapsed }} />
      </div>
    </>
  );
}

export default App;
