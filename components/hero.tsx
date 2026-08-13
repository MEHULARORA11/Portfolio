"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const roles = [
  "Full Stack Developer",
  "Backend Engineer",
  "MERN Stack Developer",
  "Open for Projects",
  "B.Tech Student",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((p) => (p + 1) % roles.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      id="home"
      className="flex items-center justify-between gap-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="relative shrink-0">
          <Image
            src="/pfp.png"
            alt="Mehul Arora"
            width={80}
            height={80}
            className="rounded-full object-cover ring-1 ring-border transition-transform duration-300 hover:scale-105"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=Mehul+Arora&background=171717&color=ededed&size=80&bold=true&rounded=true`;
            }}
          />
          {/* Available indicator */}
          <span className="absolute bottom-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-background" />
          </span>
        </div>

        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Mehul Arora
          </h1>
          <div className="h-6 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roles[roleIndex]}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-muted-foreground font-medium leading-6 absolute"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Available badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground shrink-0"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Available
      </motion.div>
    </motion.section>
  );
}
