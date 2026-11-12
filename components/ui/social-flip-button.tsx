"use client";

import React from "react";
import { motion } from "framer-motion";
import posthog from "posthog-js";
import { cn } from "@/lib/utils";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaDiscord,
  FaEnvelope,
} from "react-icons/fa";

export interface SocialItem {
  icon: React.ReactNode;
  label: string;
  platform: string;
  href?: string;
  onClick?: () => void;
  color?: string;
}

interface SocialIconsProps {
  items?: SocialItem[];
  className?: string;
}

const defaultItems: SocialItem[] = [
  {
    icon: <FaGithub size={18} />,
    label: "GitHub",
    platform: "github",
    href: "https://github.com/MEHULARORA11",
    color: "#333",
  },
  {
    icon: <FaLinkedin size={18} />,
    label: "LinkedIn",
    platform: "linkedin",
    href: "https://www.linkedin.com/in/mehul-arora-32674b238",
    color: "#0077B5",
  },
  {
    icon: <FaTwitter size={18} />,
    label: "Twitter / X",
    platform: "twitter",
    href: "https://x.com/MehulArora121",
    color: "#1DA1F2",
  },
  {
    icon: <FaInstagram size={18} />,
    label: "Instagram",
    platform: "instagram",
    href: "https://www.instagram.com/mehularora505/",
    color: "#E1306C",
  },
  {
    icon: <FaYoutube size={18} />,
    label: "YouTube",
    platform: "youtube",
    href: "https://www.youtube.com/@Mehul_Arora",
    color: "#FF0000",
  },
  {
    icon: <FaDiscord size={18} />,
    label: "Discord",
    platform: "discord",
    href: "https://discord.com/users/mehularora0243",
    color: "#5865F2",
  },
  {
    icon: <FaEnvelope size={18} />,
    label: "Email",
    platform: "mail",
    href: "mailto:mehularora505@gmail.com",
    color: "#EA4335",
  },
];

function SocialIconButton({ item }: { item: SocialItem }) {
  const Tag = item.href ? "a" : "button";
  const props = item.href
    ? {
        href: item.href,
        target: item.href.startsWith("mailto") ? undefined : "_blank",
        rel: item.href.startsWith("mailto") ? undefined : "noopener noreferrer",
        onClick: () => posthog.capture("social_link_clicked", { platform: item.platform }),
      }
    : { onClick: item.onClick };

  return (
    <motion.div
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative group"
    >
      {/* Tooltip */}
      <div
        className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-[11px] font-medium text-background opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none select-none shadow-md"
        aria-hidden="true"
      >
        {item.label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
      </div>

      <Tag
        {...(props as React.HTMLAttributes<HTMLElement>)}
        aria-label={item.label}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl",
          "border border-border/60 bg-muted/60 text-muted-foreground",
          "hover:border-transparent hover:text-white",
          "transition-all duration-200 backdrop-blur-sm"
        )}
        style={{
          ["--hover-bg" as string]: item.color ?? "var(--foreground)",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          const el = e.currentTarget as HTMLElement;
          el.style.backgroundColor = item.color ?? "var(--foreground)";
          el.style.boxShadow = `0 4px 20px ${item.color ?? "rgba(0,0,0,0.3)"}44`;
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          const el = e.currentTarget as HTMLElement;
          el.style.backgroundColor = "";
          el.style.boxShadow = "";
        }}
      >
        {item.icon}
      </Tag>
    </motion.div>
  );
}

export default function SocialFlipButton({
  items = defaultItems,
  className,
}: SocialIconsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map((item, i) => (
        <SocialIconButton key={i} item={item} />
      ))}
    </div>
  );
}
