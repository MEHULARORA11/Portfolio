import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiTailwindcss,
  SiRedis,
  SiPostgresql,
} from "react-icons/si";

const skillDetails = {
  redis: {
    icon: SiRedis,
    color: "text-[#DC382D]",

glow: "hover:shadow-[0_0_20px_rgba(220,56,45,0.45)] hover:border-[#DC382D]/40",
  },
  reactjs: {
    icon: FaReact,
    color: "text-[#61DAFB]",
    glow: "hover:shadow-[0_0_20px_rgba(97,218,251,0.45)] hover:border-[#61DAFB]/40",
  },
  express: {
    icon: SiExpress,
    color: "text-[var(--text-secondary)]",
    glow: "hover:shadow-[0_0_20px_var(--accent-glow-soft)] hover:border-[var(--accent-border)]",
  },
  nodejs: {
    icon: FaNodeJs,
    color: "text-[#68A063]",
    glow: "hover:shadow-[0_0_20px_rgba(104,160,99,0.45)] hover:border-[#68A063]/40",
  },
  postgres: {
    icon: SiPostgresql,
    color: "text-[#336791]",
    glow: "hover:shadow-[0_0_20px_rgba(51,103,145,0.45)] hover:border-[#336791]/40",
  },
  mongodb: {
    icon: SiMongodb,
    color: "text-[#47A248]",
    glow: "hover:shadow-[0_0_20px_rgba(71,162,72,0.45)] hover:border-[#47A248]/40",
  },
  sql: {
    icon: FaDatabase,
    color: "text-[#007ACC]",
    glow: "hover:shadow-[0_0_20px_rgba(0,122,252,0.45)] hover:border-[#007ACC]/40",
  },
  javascript: {
    icon: SiJavascript,
    color: "text-[#F7DF1E]",
    glow: "hover:shadow-[0_0_20px_rgba(247,223,30,0.45)] hover:border-[#F7DF1E]/40",
  },
  "tailwind css": {
    icon: SiTailwindcss,
    color: "text-[#38BDF8]",
    glow: "hover:shadow-[0_0_20px_rgba(56,189,248,0.45)] hover:border-[#38BDF8]/40",
  },
  html: {
    icon: FaHtml5,
    color: "text-[#E34C26]",
    glow: "hover:shadow-[0_0_20px_rgba(227,76,38,0.45)] hover:border-[#E34C26]/40",
  },
  css: {
    icon: FaCss3Alt,
    color: "text-[#264DE4]",
    glow: "hover:shadow-[0_0_20px_rgba(38,77,228,0.45)] hover:border-[#264DE4]/40",
  },
};

const SkillsCard = ({ title }) => {
  const normTitle = title.trim().toLowerCase();
  const detail = skillDetails[normTitle] || {
    icon: FaDatabase,
    color: "text-[var(--accent-light)]",
    glow: "hover:shadow-[0_0_20px_var(--accent-glow)] hover:border-[var(--accent-border)]",
  };

  const IconComponent = detail.icon;

  return (
    <div
      className={`group theme-shimmer relative flex items-center gap-4 p-4 rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1.5 ${detail.glow} overflow-hidden`}
    >
      <div className="relative z-10 flex-shrink-0">
        <IconComponent className={`text-4xl ${detail.color} transition-transform duration-300 group-hover:scale-110`} />
      </div>

      <div className="relative z-10">
        <h3 className="font-bold text-lg theme-text group-hover:text-[var(--accent-light)] transition-colors duration-300">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default SkillsCard;
