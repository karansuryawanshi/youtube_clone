// https://github.com/karansuryawanshi/youtube_clone

import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Sidebar toggle state

  return (
    <>
      <div className="">
        <Navbar onHamburgerClick={() => setSidebarCollapsed((prev) => !prev)} />{" "}
        {/* Toggle sidebar */}
        <div className="flex">
          <Sidebar collapsed={sidebarCollapsed} className="w-58" />{" "}
          {/* Conditional sidebar */}
          <Outlet context={{ sidebarCollapsed }} /> {/* Render child routes */}
        </div>
      </div>
    </>
  );
}

export default App;
