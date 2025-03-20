import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";
import Header from "../components/Header/Header";

const MainLayout = () => {
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
    </>
  );
};

export default MainLayout;
