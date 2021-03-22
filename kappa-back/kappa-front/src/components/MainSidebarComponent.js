import React from "react";
import { useIntl } from "react-intl";
import { FaHeart, FaBars } from "react-icons/fa";
import Map from "./MapComponent";
import NavbarMap from "./NavbarMapComponent";

const MainSidebar = ({ handleToggleSidebar }) => {
  const intl = useIntl();
  return (
    <main>
      <NavbarMap handleToggleSidebar={handleToggleSidebar} />
      <Map />
    </main>
  );
};

export default MainSidebar;
