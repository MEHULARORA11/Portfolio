"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { projects } from "@/lib/data";

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Projects() {
  return (
    <section id="projects" className="pt-24 pb-12">
      <FadeIn>
        <div className="flex flex-col gap-2 mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
            Selected Work
          </h2>
          <p className="text-muted-foreground max-w-lg text-lg">
            A collection of my recent projects ranging from AI agents to real-time high-concurrency systems.
          </p>
        </div>
      </FadeIn>

      <div className="flex flex-col gap-24 md:gap-40">
        {projects.map((project, idx) => (
          <FadeIn key={project.title} delay={100} className="group">
            <div
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div className="w-full md:w-[60%] relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted/30 border border-border/40 shadow-sm">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  priority={idx === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text Side */}
              <div className="w-full md:w-[40%] flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-muted/30 text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground mb-6">
                  {project.status === "live" ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {project.status.replace("-", " ")}
                    </>
                  )}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-background border border-border rounded-md text-xs font-medium text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-3 py-1.5 bg-transparent text-xs font-medium text-muted-foreground">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-70 transition-opacity"
                    >
                      Visit Live <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Source Code <GitHubIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
