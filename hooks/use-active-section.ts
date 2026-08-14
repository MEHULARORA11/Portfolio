"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Silently update URL without triggering scroll jump
            if (entry.target.id === "hero") {
              window.history.replaceState(null, "", window.location.pathname);
            } else if (entry.target.id) {
              window.history.replaceState(null, "", `#${entry.target.id}`);
            } else {
              window.history.replaceState(null, "", window.location.pathname);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px", // Trigger when section is near top of screen
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Also observe the top of the page (hero) to clear hash if needed
    const hero = document.getElementById("hero");
    if (hero) observer.observe(hero);

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
      if (hero) observer.unobserve(hero);
    };
  }, [sectionIds]);

  return activeSection;
}
