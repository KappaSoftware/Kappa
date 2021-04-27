import React from "react";
import NavbarLanding from "./NavbarLandingComponent";
import LandingFirstSection from "./LandingFirstSectionComponent";
import LandingSecondSection from "./LandingSecondSectionComponent";
import LandingThirdSection from "./LandingThirdSectionComponent";
import LandingFourthSection from "./LandingFourthSectionComponent";
import LandingFifthSection from "./LandingFifthSectionComponent";
import LandingSixthSection from "./LandingSixthSectionComponent";
import LandingSeventhSection from "./LandingSeventhSectionComponent";
import LandingFooterComponent from "./LandingFooterComponent";
import Toolbar from "@material-ui/core/Toolbar";

export default function Landing() {
  return (
    <>
      <NavbarLanding />
      <Toolbar />
      <LandingFirstSection />
      <LandingSecondSection />
      <LandingThirdSection />
      <LandingFourthSection />
      <LandingFifthSection />
      <LandingSixthSection />
      <LandingSeventhSection />
      <LandingFooterComponent />
    </>
  );
}
