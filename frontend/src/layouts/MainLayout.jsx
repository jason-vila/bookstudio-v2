import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const MainLayout = () => {
  useEffect(() => {
    document.body.classList.add("main-layout");
    return () => {
      document.body.classList.remove("main-layout");
    };
  }, []);

  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("sidebarCollapsed", !isCollapsed);
  };

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <Header />
      <Outlet context={{ isCollapsed }} />
      <div className="toast-container" id="toast-container"></div>
    </>
  );
};

export default MainLayout;
