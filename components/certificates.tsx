"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { certificates } from "@/lib/data";

export function Certificates() {
  return (
    <section id="certificates" className="pt-24 pb-12 border-t border-border/15">
      <FadeIn>
        <div className="flex flex-col gap-2 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
            Certifications
          </h2>
          <p className="text-muted-foreground max-w-lg text-lg">
            Continuous learning and official recognitions from industry programs and hackathons.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert, idx) => (
          <FadeIn key={cert.id} delay={idx * 100}>
            <div className="group relative flex flex-col justify-between h-full space-y-4">
              {/* Thumbnail Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-sm">
                <Image
                  src={cert.thumbnail}
                  alt={cert.title}
                  fill
                  priority={idx < 2}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
              </div>

              {/* Certificate Info */}
              <div className="flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
                      {cert.date}
                    </div>
                    <h3 className="text-lg font-bold text-foreground transition-colors line-clamp-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mt-0.5">
                      Issued by <span className="text-foreground/80">{cert.issuer}</span>
                    </p>
                  </div>
                  
                  {cert.credentialLink && (
                    <a
                      href={cert.credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                      aria-label="View Credential"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/40">
                  {cert.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-muted/50 border border-border/50 rounded-md text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
