import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const GLITCH_CHARS = "01█▓▒░▲▼<>[]{}__+$%#@!*";

/**
 * HolographicText
 * Glitches text on mount or on interval, resolving character-by-character.
 */
export default function HolographicText({
  text,
  className = "",
  glitchInterval = 4000,
  glitchSpeed = 40,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      return;
    }

    let isMounted = true;
    let iteration = 0;
    let interval = null;

    const runGlitch = () => {
      clearInterval(interval);
      iteration = 0;

      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              // Random character
              if (Math.random() < 0.3) {
                return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
              }
              return char;
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          if (isMounted) setDisplayText(text);
        }

        iteration += 1 / 3;
      }, glitchSpeed);
    };

    runGlitch();

    // Loop the glitch effect
    const outerInterval = setInterval(() => {
      if (isMounted) runGlitch();
    }, glitchInterval);

    return () => {
      isMounted = false;
      clearInterval(interval);
      clearInterval(outerInterval);
    };
  }, [text, glitchInterval, glitchSpeed, shouldReduceMotion]);

  return (
    <div className={`font-mono text-lg sm:text-2xl font-bold tracking-wider text-[var(--accent-light)] ${className}`}>
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
        className="inline-block ml-1 w-2.5 h-5 bg-[var(--accent-light)] align-middle shadow-[0_0_8px_var(--accent)]"
      />
    </div>
  );
}
