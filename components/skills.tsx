"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { SolarSystem } from "@/components/ui/solar-system";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiNodedotjs, 
  SiExpress, 
  SiPostgresql, 
  SiRedis, 
  SiDocker, 
  SiVercel 
} from "react-icons/si";
import { Bot } from "lucide-react";

const CUSTOM_ORBITS = [
  {
    id: "inner",
    name: "Frontend",
    radiusClass: "var(--radius-inner)",
    radiusPx: 175,
    speed: 20,
    items: [
      { id: "react", label: "React", color: "#61DAFB", svg: <SiReact className="w-5 h-5" /> },
      { id: "nextjs", label: "Next.js", color: "#ffffff", svg: <SiNextdotjs className="w-5 h-5" /> },
      { id: "tailwind", label: "Tailwind CSS", color: "#06B6D4", svg: <SiTailwindcss className="w-5 h-5" /> },
      { id: "typescript", label: "TypeScript", color: "#3178C6", svg: <SiTypescript className="w-5 h-5" /> },
    ],
  },
  {
    id: "mid",
    name: "Backend & DB",
    radiusClass: "var(--radius-mid)",
    radiusPx: 285,
    speed: 32,
    items: [
      { id: "nodejs", label: "Node.js", color: "#339933", svg: <SiNodedotjs className="w-5 h-5" /> },
      { id: "express", label: "Express", color: "#ffffff", svg: <SiExpress className="w-5 h-5" /> },
      { id: "postgresql", label: "PostgreSQL", color: "#4169E1", svg: <SiPostgresql className="w-5 h-5" /> },
      { id: "redis", label: "Redis", color: "#DC382D", svg: <SiRedis className="w-5 h-5" /> },
    ],
  },
  {
    id: "outer",
    name: "AI & Tools",
    radiusClass: "var(--radius-outer)",
    radiusPx: 395,
    speed: 48,
    items: [
      { id: "openai", label: "OpenAI SDK", color: "#412991", svg: <Bot className="w-5 h-5" /> },
      { id: "docker", label: "Docker", color: "#2496ED", svg: <SiDocker className="w-5 h-5" /> },
      { id: "vercel", label: "Vercel", color: "#ffffff", svg: <SiVercel className="w-5 h-5" /> },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="pt-24 pb-12 border-t border-border/15">
      <div className="flex flex-col items-center text-center gap-6 mb-16">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
            Capabilities
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
            A comprehensive toolkit for building robust, scalable applications.
          </p>
        </FadeIn>
      </div>

      {/* --- DESKTOP VIEW: Solar System --- */}
      <FadeIn delay={200} className="w-full hidden md:flex justify-center mt-12 md:mt-20">
        <SolarSystem orbits={CUSTOM_ORBITS} />
      </FadeIn>

      {/* --- MOBILE VIEW: Clean Minimalist Grid --- */}
      <FadeIn delay={200} className="md:hidden mt-8 w-full flex flex-col gap-6">
        {CUSTOM_ORBITS.map((orbit) => (
          <div key={orbit.id} className="flex flex-col items-center gap-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
              {orbit.name}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {orbit.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/50 backdrop-blur-sm shadow-sm"
                >
                  <span style={{ color: item.color }}>{item.svg}</span>
                  <span className="text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </FadeIn>
    </section>
  );
}
