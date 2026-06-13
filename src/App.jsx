import React, { useState, useEffect } from "react";
import Home from "./Pages/Home";
import ThemeToggle from "./Components/ThemeToggle";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Home />
    </div>
  );
}