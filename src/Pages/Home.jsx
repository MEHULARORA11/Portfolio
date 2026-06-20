import React, { useEffect, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PortfolioCard = lazy(() => import("../Components/PortfolioCard"));
const HomeCard = lazy(() => import("../Components/HomeCard"));
const AboutCard = lazy(() => import("../Components/AboutCard"));
const SkillsSection = lazy(() => import("../Components/SkillsSection"));
const ProjectSection = lazy(() => import("../Components/ProjectSection"));
const ContactSection = lazy(() => import("../Components/ContactSection"));
const FloatingTechBackground = lazy(() => import("../Components/FloatingTechBackground"));
const AiChatBot = lazy(() => import("../Components/AiChatBot"));

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className="w-[92vw] sm:w-[88vw] lg:w-[80vw] mx-auto overflow-x-hidden">
        <FloatingTechBackground />
        <AiChatBot />
        <PortfolioCard />
        <HomeCard />
        <AboutCard />
        <SkillsSection />
        <ProjectSection />
        <ContactSection />
    </div>
  );
};

export default Home;