import React from "react";
import NavbarLanding from "./NavbarLandingComponent";
import LandingFirstSection from "./LandingFirstSectionComponent";
import LandingSecondSection from "./LandingSecondSectionComponent";
import LandingThirdSection from "./LandingThirdSectionComponent";
import LandingFourthSection from "./LandingFourthSectionComponent";
import LandingFifthSection from "./LandingFifthSectionComponent";
import LandingSixthSection from "./LandingSixthSectionComponent";
import HomeModalDisclaimer from "./HomeModalDisclaimer";

export default function Landing() {
  return (
    <>
      <NavbarLanding />
      <LandingFirstSection />
      <LandingSecondSection />
      <LandingThirdSection />
      <LandingFourthSection />
      <LandingFifthSection />
      <LandingSixthSection />
      <HomeModalDisclaimer />
    </>
  );
}
