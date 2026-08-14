"use client";

import { FadeIn } from "@/components/ui/fade-in";

export function About() {
  return (
    <section id="about" className="pt-16 pb-8 border-t border-border/15">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
        
        {/* Sticky Title Column */}
        <FadeIn>
          <div className="md:sticky md:top-24">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              About Me
            </h2>
            <div className="w-12 h-1 bg-primary/40 mt-4 rounded-full" />
          </div>
        </FadeIn>

        {/* Editorial Content Column */}
        <FadeIn delay={100} className="space-y-8">
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-foreground leading-snug">
            I am a full-stack developer based in India, obsessed with building high-performance software.
          </p>
          
          <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              My journey started with a fascination for how systems scale. I don't just build UI; I architect complete solutions—from robust Node.js backends and real-time WebSockets to fluid, beautiful React frontends.
            </p>
            <p>
              I recently built a system handling <strong className="text-foreground font-semibold">1 Million real-time checkboxes</strong> using Redis, and an AI Agent (<strong className="text-foreground font-semibold">Arbiter</strong>) that cross-validates LLM responses for accuracy. 
            </p>
            <p>
              When I'm not coding, I'm usually diving into system design patterns, playing video games, or making content about software engineering on YouTube.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
