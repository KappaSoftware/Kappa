import React from "react";
import Map from "./MapComponent";
import NavbarMap from "./NavbarMapComponent";

const MainSidebar = ({ handleToggleSidebar }) => {
  return (
    <main>
      <NavbarMap handleToggleSidebar={handleToggleSidebar} />
      <Map />
    </main>
  );
};

export default MainSidebar;
