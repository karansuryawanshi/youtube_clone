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
        <Sidebar collapsed={sidebarCollapsed} className="w-58" />
        <Outlet context={{ sidebarCollapsed }} />
      </div>
    </>
  );
}

export default App;
