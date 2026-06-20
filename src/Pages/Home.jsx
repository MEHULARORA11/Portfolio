import React, { useEffect, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "lenis";

import HomeCard from "../Components/HomeCard";
import FloatingTechBackground from "../Components/FloatingTechBackground";

const SkillsSection = lazy(() => import("../Components/SkillsSection"));
const ProjectSection = lazy(() => import("../Components/ProjectSection"));
const CertificatesSection = lazy(() => import("../Components/Certificates/CertificatesSection"));
const YoutubeSection = lazy(() => import("../Components/Youtube/YoutubeSection"));
const InstagramSection = lazy(() => import("../Components/Instagram/InstagramSection"));
const BlogsSection = lazy(() => import("../Components/Blogs/BlogsSection"));
const ContactSection = lazy(() => import("../Components/ContactSection"));

const Home = () => {
  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1500,
    });

    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Scroll trigger synchronization for AOS
    lenis.on("scroll", () => {
      AOS.refresh();
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-[92vw] sm:w-[88vw] lg:w-[80vw] mx-auto overflow-x-hidden">
      <FloatingTechBackground />
      <HomeCard />
      
      <Suspense fallback={<div className="h-48 w-full glass-card rounded-[32px] animate-pulse mb-20 lg:mb-36 bg-[var(--card-bg)]" />}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={<div className="h-[500px] w-full glass-card rounded-[32px] animate-pulse mb-20 lg:mb-36 bg-[var(--card-bg)]" />}>
        <ProjectSection />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] w-full glass-card rounded-[32px] animate-pulse mb-20 lg:mb-36 bg-[var(--card-bg)]" />}>
        <CertificatesSection />
      </Suspense>

      <Suspense fallback={<div className="h-[500px] w-full glass-card rounded-[32px] animate-pulse mb-20 lg:mb-36 bg-[var(--card-bg)]" />}>
        <YoutubeSection />
      </Suspense>

      <Suspense fallback={<div className="h-[500px] w-full glass-card rounded-[32px] animate-pulse mb-20 lg:mb-36 bg-[var(--card-bg)]" />}>
        <InstagramSection />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] w-full glass-card rounded-[32px] animate-pulse mb-20 lg:mb-36 bg-[var(--card-bg)]" />}>
        <BlogsSection />
      </Suspense>

      <Suspense fallback={<div className="h-[450px] w-full glass-card rounded-[32px] animate-pulse mb-20 lg:mb-36 bg-[var(--card-bg)]" />}>
        <ContactSection />
      </Suspense>
    </div>
  );
};

export default Home;