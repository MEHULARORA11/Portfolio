"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, FileText } from "lucide-react";
import { ViewCounter } from "@/components/view-counter";
import SocialFlipButton from "@/components/ui/social-flip-button";
import { FlipText } from "@/components/ui/flip-text";
import posthog from "posthog-js";

export function Hero() {
  const headlines = [
    "Building scalable systems & agents.",
    "Architecting full-stack solutions.",
    "Crafting intelligent AI agents."
  ];
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-season-accent/25 via-season-accent/5 to-transparent pointer-events-none opacity-60 dark:opacity-30 transition-colors duration-500" />

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10 max-w-5xl mx-auto">
        
        {/* Left Side: Text & Actions */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          {/* Massive Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-w-3xl"
          >
            <div className="min-h-[120px] md:min-h-[140px] flex flex-col justify-end md:justify-start">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-foreground leading-[1.15]">
                <FlipText key={headlineIndex} className="text-foreground font-semibold tracking-[-0.02em]">
                  {headlines[headlineIndex]}
                </FlipText>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground font-medium mt-2">
              Hi, I'm <span className="text-foreground">Mehul Arora</span>. I build production-grade Web,Mobile and AI applications, highly concurrent systems, and AI-driven agents.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold ring-2 ring-season-accent/35 hover:ring-season-accent/80 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              View Work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="/Mehul_Arora_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("resume_opened", { source: "hero" })}
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 hover:bg-muted hover:border-season-accent/60 text-foreground font-semibold hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm"
            >
              Resume
              <FileText className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Profile & Status */}
        <div className="flex flex-col items-center gap-5 shrink-0">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-season-accent/45 shadow-xl transition-colors duration-500"
          >
            <Image
              src="/light.jpg"
              alt="Mehul Arora"
              fill
              sizes="(max-width: 768px) 128px, 176px"
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Name Display */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 font-medium mb-1">
              Full Stack Developer
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground leading-none">
              <span className="text-season-accent transition-colors duration-500">Mehul</span>
              {" "}
              <span>Arora</span>
            </h2>
          </motion.div>

          {/* Status: Available pill + views + socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <SocialFlipButton />
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-season-accent/30 bg-background/50 backdrop-blur-md shadow-sm transition-colors duration-500">
                <div className="w-2 h-2 rounded-full bg-season-accent animate-pulse" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Available for work
                </span>
              </div>
              <ViewCounter />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
