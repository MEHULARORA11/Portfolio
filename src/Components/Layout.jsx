import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingTechBackground from "./FloatingTechBackground";
import PortfolioLoader from "./Portfolioloader";

const AiChatBot = lazy(() => import("./AiChatBot"));

/**
 * Global layout wrapper for the portfolio. Coordinates global transitions,
 * theme configuration, chatbot drawer state, and initial screen loading HUD.
 * Also configures Lenis smooth scrolling and AOS animations across all routes.
 */
export default function Layout({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "dark";
  });
  const [showIntro, setShowIntro] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const logoRef = useRef(null);
  const location = useLocation();

  // Apply visual theme to document body
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Initialize Scroll Syncing (Lenis) and AOS elements
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync AOS with scrolling ticks
    lenis.on("scroll", () => {
      AOS.refresh();
    });

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Instantly reset scroll layout to the top of screen on page routing changes
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    // Re-check animation triggers after DOM stabilizes
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {showIntro && (
        <PortfolioLoader
          theme={theme}
          name="Mehul Arora"
          tagline="Full Stack Engineer"
          targetRef={logoRef}
          onFinish={() => setShowIntro(false)}
        />
      )}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden relative min-h-screen flex flex-col transition-colors duration-500">
        <div className="absolute inset-0 grid-overlay pointer-events-none -z-10" />
        <FloatingTechBackground />
        
        <Navbar 
          logoRef={logoRef} 
          theme={theme} 
          toggleTheme={toggleTheme} 
          isChatOpen={isChatOpen} 
        />

        {/* Global Main Content Section */}
        <main className="flex-grow w-full">
          {children}
        </main>

        <Footer />

        <Suspense fallback={null}>
          <AiChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
        </Suspense>
      </div>
    </>
  );
}
