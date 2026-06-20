import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import ThemeToggle from "./Components/ThemeToggle";
import PortfolioLoader from "./Components/Portfolioloader";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

const AiChatBot = lazy(() => import("./Components/AiChatBot"));

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "dark";
  });
  const [showIntro, setShowIntro] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <Navbar logoRef={logoRef} theme={theme} />

      {showIntro && (
        <PortfolioLoader
          theme={theme}
          name="Mehul Arora"
          tagline="Full Stack Engineer"
          targetRef={logoRef}
          onFinish={() => setShowIntro(false)}
        />
      )}

      <div className="min-h-screen transition-colors duration-500">
        <ThemeToggle theme={theme} onToggle={toggleTheme} hide={isChatOpen} />
        <Home />
        <Suspense fallback={null}>
          <AiChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
        </Suspense>
      </div>
    </>
  );
}