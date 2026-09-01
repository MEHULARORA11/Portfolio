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
  SiVercel,
  SiReactquery,
  SiMongodb,
  SiPrisma,
  SiDrizzle,
  SiMongoose,
  SiGithub,
  SiGit,
  SiSocketdotio,
  SiQdrant
} from "react-icons/si";
import { Bot, Zap, Key, Brain, Wand2, Rocket, DatabaseZap, Activity, Pin } from "lucide-react";

const CUSTOM_ORBITS = [
  {
    id: "inner",
    name: "Frontend Core",
    radiusClass: "var(--radius-inner)",
    radiusPx: 120,
    speed: 30,
    items: [
      { id: "react", label: "React", color: "#61DAFB", svg: <SiReact className="w-4 h-4" /> },
      { id: "nextjs", label: "Next.js", color: "#ffffff", svg: <SiNextdotjs className="w-4 h-4" /> },
      { id: "tailwind", label: "Tailwind CSS", color: "#06B6D4", svg: <SiTailwindcss className="w-4 h-4" /> },
      { id: "typescript", label: "TypeScript", color: "#3178C6", svg: <SiTypescript className="w-4 h-4" /> },
      { id: "tanstack", label: "TanStack Query", color: "#FF4154", svg: <SiReactquery className="w-4 h-4" /> },
    ],
  },
  {
    id: "mid1",
    name: "State & Fullstack",
    radiusClass: "var(--radius-mid)",
    radiusPx: 210,
    speed: 42,
    items: [
      { id: "zustand", label: "Zustand", color: "#8b5cf6", svg: <Zap className="w-4 h-4" /> },
      { id: "websockets", label: "Web Sockets", color: "#ffffff", svg: <SiSocketdotio className="w-4 h-4" /> },
      { id: "nodejs", label: "Node.js", color: "#339933", svg: <SiNodedotjs className="w-4 h-4" /> },
      { id: "express", label: "Express", color: "#ffffff", svg: <SiExpress className="w-4 h-4" /> },
      { id: "better-auth", label: "Better-Auth", color: "#4F46E5", svg: <Key className="w-4 h-4" /> },
      { id: "vercel", label: "Vercel", color: "#ffffff", svg: <SiVercel className="w-4 h-4" /> },
    ],
  },
  {
    id: "mid2",
    name: "Databases",
    radiusClass: "var(--radius-outer)",
    radiusPx: 300,
    speed: 55,
    items: [
      { id: "postgresql", label: "PostgreSQL", color: "#4169E1", svg: <SiPostgresql className="w-4 h-4" /> },
      { id: "mongodb", label: "MongoDB", color: "#47A248", svg: <SiMongodb className="w-4 h-4" /> },
      { id: "redis", label: "Redis", color: "#DC382D", svg: <SiRedis className="w-4 h-4" /> },
      { id: "prisma", label: "Prisma", color: "#ffffff", svg: <SiPrisma className="w-4 h-4" /> },
      { id: "drizzle", label: "Drizzle", color: "#C5F74F", svg: <SiDrizzle className="w-4 h-4" /> },
      { id: "mongoose", label: "Mongoose", color: "#880000", svg: <SiMongoose className="w-4 h-4" /> },
      { id: "qdrant", label: "Qdrant", color: "#DC143C", svg: <SiQdrant className="w-4 h-4" /> },
      { id: "pinecone", label: "Pinecone", color: "#00C4A0", svg: <Pin className="w-4 h-4" /> },
    ],
  },
  {
    id: "outer",
    name: "AI & Infrastructure",
    radiusClass: "var(--radius-outermost)",
    radiusPx: 390,
    speed: 68,
    items: [
      { id: "openai", label: "OpenAI SDK", color: "#412991", svg: <Bot className="w-4 h-4" /> },
      { id: "vercelai", label: "Vercel AI SDK", color: "#ffffff", svg: <Wand2 className="w-4 h-4" /> },
      { id: "aiengineer", label: "AI Engineer", color: "#a855f7", svg: <Brain className="w-4 h-4" /> },
      { id: "docker", label: "Docker", color: "#2496ED", svg: <SiDocker className="w-4 h-4" /> },
      { id: "git", label: "Git", color: "#F05032", svg: <SiGit className="w-4 h-4" /> },
      { id: "octokit", label: "Octokit", color: "#ffffff", svg: <SiGithub className="w-4 h-4" /> },
      { id: "bullmq", label: "BullMQ", color: "#FF4154", svg: <DatabaseZap className="w-4 h-4" /> },
      { id: "inngest", label: "Inngest", color: "#ffffff", svg: <Activity className="w-4 h-4" /> },
      { id: "cicd", label: "CI/CD Pipelines", color: "#E91E63", svg: <Rocket className="w-4 h-4" /> },
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

      {/* --- DESKTOP VIEW: Solar System (flat, always visible) --- */}
      <FadeIn delay={200} className="w-full hidden md:flex justify-center mt-4">
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
