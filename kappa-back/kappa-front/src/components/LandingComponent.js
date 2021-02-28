import React from "react";
import NavbarLanding from "./NavbarLandingComponent";
import LandingFirstSection from "./LandingFirstSectionComponent";
import LandingSecondSection from "./LandingSecondSectionComponent";
import LandingThirdSection from "./LandingThirdSectionComponent";

export default function Landing() {
  return (
    <>
      <NavbarLanding />
      <LandingFirstSection />
      <LandingSecondSection />
      <LandingThirdSection />
    </>
  );
}
