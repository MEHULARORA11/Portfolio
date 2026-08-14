"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { skillCategories } from "@/lib/data";

export function Skills() {
  // Flatten all skills for a fluid, organic cloud look
  const allSkills = Array.from(new Set(skillCategories.flatMap((cat) => cat.skills)));

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

      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 md:gap-4">
        {allSkills.map((skill, idx) => (
          <FadeIn key={skill} delay={idx * 40}>
            <div className="px-5 py-3 md:px-6 md:py-4 rounded-full border border-border/60 bg-background/50 hover:bg-muted/80 backdrop-blur-sm text-foreground md:text-lg font-medium tracking-tight transition-all duration-300 hover:scale-105 hover:border-foreground/30 shadow-sm">
              {skill}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
