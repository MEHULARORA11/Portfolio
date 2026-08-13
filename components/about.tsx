"use client";

import { motion } from "motion/react";
import { BookOpen, Cpu, MapPin } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Education", value: "B.Tech · First Year" },
  { icon: Cpu, label: "Specialization", value: "Backend & Scaling" },
  { icon: MapPin, label: "Location", value: "Faridabad, India" },
];

export function About() {
  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
    >
      <div className="space-y-3">
        <p className="text-[15px] leading-relaxed text-foreground/90">
          I design and build full-stack applications with a strong focus on backend
          engineering, scalability, security, and performance. I care about systems
          that are not just functional — but robust and production-ready.
        </p>
        <p className="text-[15px] leading-relaxed text-foreground/90">
          Currently in my first year of B.Tech, I continuously explore modern web
          technologies, APIs, databases, authentication systems, and high-performance
          workflows to craft fast, scalable digital solutions.
        </p>
      </div>

      {/* Bento stats */}
      <div className="grid grid-cols-3 gap-3 pt-1">
        {stats.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: "easeOut" }}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3 hover:-translate-y-0.5 transition-transform duration-200"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-muted">
              <Icon className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest font-mono font-semibold text-muted-foreground/60">
                {label}
              </p>
              <p className="text-xs font-semibold text-foreground mt-0.5 leading-tight">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
