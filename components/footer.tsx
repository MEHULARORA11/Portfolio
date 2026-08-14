"use client";

import { useEffect, useState } from "react";
import { socials } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="pt-16 pb-12">
      <FadeIn delay={200}>
        <div className="flex flex-col gap-12">
          
          {/* Top Links */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Socials</h3>
              <div className="flex flex-col gap-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-2xl md:text-4xl font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {social.name}
                    <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:text-right">
              <h3 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Local Time</h3>
              <p className="text-2xl md:text-4xl font-mono text-foreground tabular-nums">
                {time || "..."}
              </p>
            </div>
          </div>

          <hr className="border-border/40" />

          {/* Bottom Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-medium">
            <p>© {new Date().getFullYear()} Mehul Arora. All rights reserved.</p>
            <p>Designed and built with Next.js</p>
          </div>
          
        </div>
      </FadeIn>
    </footer>
  );
}
