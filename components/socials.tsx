"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { socials } from "@/lib/data";

/* ── Brand SVG icons ────────────────────────────────────────────────── */

function GitHubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XSocialIcon({ size = 17 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

/* ── Icon map ─────────────────────────────────────── */

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const iconMap: Record<string, IconComponent> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: XSocialIcon,
  mail: (props: { size?: number }) => <Mail strokeWidth={1.5} size={props.size} />,
};

const brandColors: Record<string, string> = {
  github: "hover:text-foreground",
  linkedin: "hover:text-[#0A66C2]",
  twitter: "hover:text-foreground",
  mail: "hover:text-foreground",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function Socials({ hideResume = false }: { hideResume?: boolean } = {}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
    >
      <TooltipProvider delay={100}>
        <motion.div
          className="flex flex-wrap items-center gap-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {socials.map((social) => {
            const Icon = iconMap[social.icon];
            const colorClass = brandColors[social.icon] || "hover:text-foreground";
            if (!Icon) return null;
            return (
              <motion.div key={social.name} variants={item}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <a
                        href={social.url}
                        target={social.icon === "mail" ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:scale-110 active:scale-95 ${colorClass}`}
                        aria-label={social.name}
                      >
                        <Icon size={17} />
                      </a>
                    }
                  />
                  <TooltipContent side="bottom" className="text-xs" sideOffset={6}>
                    {social.name}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            );
          })}

          {/* Resume link */}
          {!hideResume && (
            <motion.div variants={item}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href="/Mehul_Arora_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium text-muted-foreground border border-border transition-all duration-200 hover:text-foreground hover:border-foreground/20 hover:bg-muted active:scale-95"
                    >
                      Resume
                    </a>
                  }
                />
                <TooltipContent side="bottom" className="text-xs" sideOffset={6}>
                  View Resume PDF
                </TooltipContent>
              </Tooltip>
            </motion.div>
          )}
        </motion.div>
      </TooltipProvider>
    </motion.section>
  );
}
