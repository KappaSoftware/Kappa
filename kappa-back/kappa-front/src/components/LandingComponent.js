import React from "react";
import NavbarLanding from "./NavbarLandingComponent";
import HomeModalDisclaimer from "./HomeModalDisclaimer";
import LandingFirstSection from "./LandingFirstSectionComponent";
import LandingSecondSection from "./LandingSecondSectionComponent";
import LandingThirdSection from "./LandingThirdSectionComponent";
import LandingFourthSection from "./LandingFourthSectionComponent";
import LandingFifthSection from "./LandingFifthSectionComponent";
import LandingSixthSection from "./LandingSixthSectionComponent";
import LandingSeventhSection from "./LandingSeventhSectionComponent copy";

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
      <LandingSeventhSection />
      <HomeModalDisclaimer />
    </>
  );
}
