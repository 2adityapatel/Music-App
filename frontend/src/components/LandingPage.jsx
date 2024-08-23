import React from "react";
import HeroSection from "./landingpage/HeroSection";
import FeatureSection from "./landingpage/FeatureSection";
import Workflow from "./landingpage/Workflow";
import Footer from "./landingpage/Footer";
import Testimonials from "./landingpage/Testimonials";
import Navbar from "./landingpage/Navbar";
import ArtistSection from "./landingpage/ArtistSection";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <ArtistSection/>
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;