import React, { lazy, Suspense } from "react";

import HomeCard from "../Components/HomeCard";

const SkillsSection = lazy(() => import("../Components/SkillsSection"));
const ContactSection = lazy(() => import("../Components/ContactSection"));

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div id="home" className="w-full">
        <HomeCard />
      </div>
      
      <Suspense fallback={<div className="h-48 w-full glass-card rounded-[32px] animate-pulse mb-20 lg:mb-36 bg-[var(--card-bg)]" />}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={<div className="h-[450px] w-full glass-card rounded-[32px] animate-pulse mb-20 lg:mb-36 bg-[var(--card-bg)]" />}>
        <div id="contact" className="w-full">
          <ContactSection />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
