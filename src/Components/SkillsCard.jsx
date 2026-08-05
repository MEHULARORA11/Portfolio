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

/* ─── Brand icon colors kept (informative), per-tech glow shadows removed ─── */
const skillDetails = {
  redis:         { icon: SiRedis,       color: "text-[#DC382D]" },
  reactjs:       { icon: FaReact,       color: "text-[#61DAFB]" },
  express:       { icon: SiExpress,     color: "text-[var(--text-secondary)]" },
  nodejs:        { icon: FaNodeJs,      color: "text-[#68A063]" },
  postgres:      { icon: SiPostgresql,  color: "text-[#336791]" },
  mongodb:       { icon: SiMongodb,     color: "text-[#47A248]" },
  sql:           { icon: FaDatabase,    color: "text-[#007ACC]" },
  javascript:    { icon: SiJavascript,  color: "text-[#F7DF1E]" },
  "tailwind css":{ icon: SiTailwindcss, color: "text-[#38BDF8]" },
  html:          { icon: FaHtml5,       color: "text-[#E34C26]" },
  css:           { icon: FaCss3Alt,     color: "text-[#264DE4]" },
};

const SkillsCard = ({ title }) => {
  const normTitle = title.trim().toLowerCase();
  const detail = skillDetails[normTitle] || {
    icon: FaDatabase,
    color: "text-[var(--accent-light)]",
  };

  const IconComponent = detail.icon;

  return (
    <div
      className="group theme-shimmer relative flex items-center gap-4 p-4 rounded-2xl glass-card skill-inner-shadow transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative z-10 flex-shrink-0">
        <IconComponent className={`text-4xl ${detail.color} transition-transform duration-200 group-hover:scale-[1.08]`} />
      </div>

      <div className="relative z-10">
        <h3 className="font-semibold text-base theme-text transition-colors duration-300">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default SkillsCard;
