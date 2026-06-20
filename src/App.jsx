import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import ThemeToggle from "./Components/ThemeToggle";
import PortfolioLoader from "./Components/Portfolioloader";
import Navbar from "./Components/Navbar";

const Home = lazy(() => import("./Pages/Home"));

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "dark";
  });
  const [showIntro, setShowIntro] = useState(true);
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
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      </div>
    </>
  );
}