"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XSocialIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setFormState("loading");
    try {
      const res = await fetch(`${API_URL}/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setFormState("success");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 4000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  }

  return (
    <section id="contact" className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Get in Touch</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Have a project in mind? Let&apos;s talk.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left — Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col gap-5"
        >
          <div className="space-y-3">
            <a
              href="mailto:mehularora506@gmail.com"
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors duration-200 group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                <Mail className="size-4 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-mono font-semibold text-muted-foreground/60">
                  Email
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                  mehularora506@gmail.com
                </span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                <MapPin className="size-4 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-mono font-semibold text-muted-foreground/60">
                  Location
                </span>
                <span className="text-sm font-medium text-foreground">
                  Faridabad, Haryana, India
                </span>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest font-mono font-semibold text-muted-foreground/60">
              Socials
            </p>
            <div className="flex gap-2">
              {[
                { href: "https://github.com/MEHULARORA11", icon: GitHubIcon, label: "GitHub" },
                { href: "https://www.linkedin.com/in/mehul-arora-32674b238/", icon: LinkedInIcon, label: "LinkedIn" },
                { href: "https://x.com/MehulArora121", icon: XSocialIcon, label: "X" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-muted hover:scale-105 active:scale-95"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-name" className="text-xs font-semibold text-muted-foreground/80">
                Name
              </Label>
              <Input
                id="contact-name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={formState === "loading"}
                className="rounded-lg text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-email" className="text-xs font-semibold text-muted-foreground/80">
                Email
              </Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={formState === "loading"}
                className="rounded-lg text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-message" className="text-xs font-semibold text-muted-foreground/80">
                Message
              </Label>
              <Textarea
                id="contact-message"
                placeholder="Tell me about your project..."
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={formState === "loading"}
                className="rounded-lg text-sm resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={formState === "loading" || formState === "success"}
              className="w-full rounded-lg font-semibold gap-2"
            >
              {formState === "loading" ? (
                "Sending..."
              ) : formState === "success" ? (
                "Sent! I\u2019ll be in touch."
              ) : (
                <>
                  Send Message
                  <Send size={14} />
                </>
              )}
            </Button>

            {formState === "error" && (
              <p className="text-xs text-destructive text-center">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
