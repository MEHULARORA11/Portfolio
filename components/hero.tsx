"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, FileText } from "lucide-react";
import { ViewCounter } from "@/components/view-counter";
import { Socials } from "@/components/socials";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-primary/5 to-transparent pointer-events-none opacity-50 dark:opacity-20" />

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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[1.1]">
              Building scalable
              <br className="hidden md:block" />
              <span className="text-muted-foreground"> systems & agents.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium mt-6">
              Hi, I'm <span className="text-foreground">Mehul Arora</span>. I build production-grade web applications, highly concurrent systems, and AI-driven agents.
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
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:scale-105 active:scale-95 transition-all duration-300"
            >
              View Work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="/Mehul_Arora_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 hover:bg-muted text-foreground font-semibold hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm"
            >
              Resume
              <FileText className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Profile & Status */}
        <div className="flex flex-col items-center gap-6 shrink-0">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-border/50 shadow-xl"
          >
            <Image
              src="/pfp.png"
              alt="Mehul Arora"
              fill
              sizes="(max-width: 768px) 128px, 192px"
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-background/50 backdrop-blur-md shadow-sm">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Available for work
              </span>
            </div>
            <ViewCounter />
            <Socials hideResume />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
