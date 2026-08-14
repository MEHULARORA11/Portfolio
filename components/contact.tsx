"use client";

import { useState } from "react";
import { Send, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setFormState("loading");
    try {
      const res = await fetch("/api/post", {
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
    <section id="contact" className="pt-32 pb-24 border-t border-border/15">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 md:gap-24 items-start">
        
        {/* Massive CTA Column */}
        <FadeIn className="flex flex-col gap-6">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[1.1]">
            Let's build <br />
            <span className="text-muted-foreground">something great.</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mt-4 font-medium leading-snug">
            Whether you have a massive system to scale, or an AI agent to architect, I'm ready to help.
          </p>
          
          <div className="mt-12 inline-flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
              Currently accepting new projects
            </span>
          </div>
        </FadeIn>

        {/* Minimalist Floating Form */}
        <FadeIn delay={100}>
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-6 p-8 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Name</label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={formState === "loading"}
                className="w-full bg-transparent border-b border-border/50 py-3 text-lg font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Email</label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={formState === "loading"}
                className="w-full bg-transparent border-b border-border/50 py-3 text-lg font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Message</label>
              <textarea
                id="message"
                placeholder="Tell me about your vision..."
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={formState === "loading"}
                className="w-full bg-transparent border-b border-border/50 py-3 text-lg font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formState === "loading" || formState === "success"}
              className="mt-6 flex items-center justify-between w-full p-4 rounded-2xl bg-foreground text-background font-bold text-lg hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {formState === "loading" ? "Sending..." : formState === "success" ? "Sent Successfully!" : "Send Message"}
              {formState !== "loading" && formState !== "success" && <ArrowRight className="w-5 h-5" />}
            </button>

            {formState === "error" && (
              <p className="text-sm font-medium text-destructive text-center mt-2">
                Failed to send. Is the backend running?
              </p>
            )}
          </form>
        </FadeIn>

      </div>
    </section>
  );
}
