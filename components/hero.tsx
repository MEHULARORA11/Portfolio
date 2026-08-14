"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Download } from "lucide-react";
import { ViewCounter } from "@/components/view-counter";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-20" />

      <div className="flex flex-col items-center text-center gap-8 relative z-10">
        
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-border/50 shadow-xl mb-2"
        >
          <Image
            src="/pfp.png"
            alt="Mehul Arora"
            fill
            sizes="(max-width: 768px) 112px, 128px"
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-background/50 backdrop-blur-md shadow-sm">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Available for work
            </span>
          </div>
          <ViewCounter />
        </motion.div>

        {/* Massive Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[1.1]">
            Building scalable
            <br className="hidden md:block" />
            <span className="text-muted-foreground"> systems & agents.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto mt-6">
            Hi, I'm <span className="text-foreground">Mehul Arora</span>. I build production-grade web applications, highly concurrent systems, and AI-driven agents.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
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
            download
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 hover:bg-muted text-foreground font-semibold hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm"
          >
            Resume
            <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
