"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Videos", href: "#videos" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // This hook will automatically update window.location.hash on scroll
  const activeSection = useActiveSection(["skills", "projects", "videos", "certificates", "contact"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key === "d" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        toggleTheme();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleTheme]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      // Force scroll regardless of current URL hash
      element.scrollIntoView({ behavior: "smooth" });
      // Explicitly set hash
      window.history.pushState(null, "", href);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-16 w-full items-center transition-all duration-300",
          isScrolled
            ? "border-b border-border/40 bg-background/70 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex w-full max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  window.history.pushState(null, "", "/");
                  setMobileMenuOpen(false);
                }
              }}
              className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition-colors"
            >
              <div className="flex size-7 items-center justify-center rounded-md bg-foreground text-background font-bold font-mono transition-transform group-hover:scale-105">
                M
              </div>
              <span>Mehul Arora</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 hover:text-foreground",
                    activeSection === link.href.replace("#", "") 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title="Toggle theme (press D)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-muted active:scale-95 backdrop-blur-sm"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={16} strokeWidth={2} />
                ) : (
                  <Moon size={16} strokeWidth={2} />
                )}
              </button>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-muted active:scale-95 backdrop-blur-sm"
            >
              {mobileMenuOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border/40 bg-background/95 backdrop-blur-md shadow-lg md:hidden"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-muted",
                    activeSection === link.href.replace("#", "") 
                      ? "text-foreground bg-muted/50" 
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
