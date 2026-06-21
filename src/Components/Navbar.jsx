/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "blogs", label: "Blogs" },
  { id: "reels", label: "Reels" },
  { id: "videos", label: "Videos" },
];

const MotionLink = motion(Link);

/**
 * Sticky Glassmorphic Navbar with Active Section highlighting based on React Router location.
 * Adapts to mobile devices using a clean dropdown hamburger layout.
 */
function Navbar({ logoRef, theme, toggleTheme, isChatOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const { scrollY } = useScroll();

  // Monitor scroll progress to apply glass styling when scrolled
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Close mobile menu when clicking outside the navbar container
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMobileMenuOpen]);

  // Determine active section based on current path
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    return path.substring(1); // e.g. "/projects" -> "projects"
  };

  const activeSection = getActiveSection();

  // Unified click handler for route transitions and scrolling to top
  const handleNavClick = (id, e) => {
    const targetPath = id === "home" ? "/" : `/${id}`;
    if (location.pathname === targetPath) {
      // If already on this page, scroll to top smoothly
      e.preventDefault();
      if (window.lenis) {
        window.lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const showGlassBg = isScrolled || isMobileMenuOpen;

  return (
    <nav ref={navRef} className="fixed top-4 inset-x-0 z-40 transition-all duration-300">
      <div
        className={`w-[92vw] sm:w-[88vw] lg:w-[80vw] mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 ${
          showGlassBg
            ? "glass-card shadow-lg border-[var(--card-border)] bg-[var(--card-bg)]"
            : "bg-transparent border-transparent border"
        }`}
      >
        {/* Logo (preserved ref for loader) */}
        <Link
          ref={logoRef}
          to="/"
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold cursor-pointer select-none shrink-0"
          style={{ background: "var(--accent)", color: "var(--button-text)" }}
          onClick={(e) => handleNavClick("home", e)}
        >
          MA
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-2 font-semibold text-sm">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id === "home" ? "/" : `/${item.id}`}
              onClick={(e) => handleNavClick(item.id, e)}
              className={`relative py-1.5 px-4 rounded-lg transition-colors duration-300 hover:text-[var(--accent)] ${
                activeSection === item.id ? "text-[var(--accent)]" : "theme-text-secondary"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeNavTab"
                  className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Theme Toggle Integration */}
        <div className="hidden lg:flex items-center">
          <ThemeToggle
            theme={theme}
            onToggle={toggleTheme}
            hide={isChatOpen}
            className="relative z-10 flex items-center"
          />
        </div>

        {/* Mobile Navigation Interface (Theme Toggle + Hamburger) */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle
            theme={theme}
            onToggle={toggleTheme}
            hide={isChatOpen}
            className="relative z-10 flex items-center scale-90"
          />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-xl flex items-center justify-center border theme-icon-btn text-xl transition-all duration-300 active:scale-95"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 mt-3 p-4 rounded-2xl glass-card flex flex-col gap-2 z-30 shadow-2xl border border-[var(--card-border)] bg-[var(--card-bg)] lg:hidden"
            >
              {navItems.map((item, index) => (
                <MotionLink
                  key={item.id}
                  to={item.id === "home" ? "/" : `/${item.id}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`w-full py-3 px-4 rounded-xl text-left font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-between border border-transparent ${
                    activeSection === item.id
                      ? "bg-[var(--accent-muted)] text-[var(--accent)] border-[var(--accent-border)]"
                      : "theme-text-secondary hover:bg-[var(--card-hover-bg)]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-40 font-mono">0{index + 1}</span>
                </MotionLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
