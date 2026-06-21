import React, { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";

import HomeCard from "../Components/HomeCard";

const SkillsSection = lazy(() => import("../Components/SkillsSection"));
const ContactSection = lazy(() => import("../Components/ContactSection"));

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.toLowerCase() === "/contact") {
      const timer = setTimeout(() => {
        const element = document.getElementById("contact");
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo("#contact");
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 250); // Wait slightly for lazy loaded components to mount
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

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
