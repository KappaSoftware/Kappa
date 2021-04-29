import React, { useState } from "react";
import SidebarMap from "./SidebarMapComponent";
import "react-pro-sidebar/dist/css/styles.css";
import MainSidebar from "./MainSidebarComponent";

export default function Layout({ setLocale }) {
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
    setLocale(checked ? "es" : "en");
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${rtl ? "rtl" : ""} ${toggled ? "toggled" : ""}`}>
      <SidebarMap
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
      />
      <MainSidebar handleToggleSidebar={handleToggleSidebar} />
    </div>
  );
}
