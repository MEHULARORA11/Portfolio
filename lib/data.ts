// ─── Mehul Arora — Portfolio Data ────────────────────────────────────────────

export const GITHUB_USERNAME = "MEHULARORA11";

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  status: "live" | "building" | "coming-soon";
}

export const projects: Project[] = [
  {
    title: "Arbiter",
    description: "A Self-Consistency Agent that cross-validates AI responses for higher accuracy.",
    longDescription:
      "Arbiter is a self-consistency agent that queries multiple AI models (OpenAI, Claude, Gemini) in parallel and uses a voting mechanism to surface the most accurate response.\n\nBuilt with Next.js on the frontend and Node.js on the backend, it uses PostgreSQL via Prisma for persistence and supports streaming responses for a real-time feel.\n\nThe core idea: rather than trusting a single model, Arbiter runs the same query across multiple models and reconciles the outputs — reducing hallucinations and increasing confidence.",
    thumbnail: "/projects/arbiter-updated.png",
    githubUrl: "https://github.com/MEHULARORA11/Arbiter",
    liveUrl: "https://arbiter.mehularora.dev/",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "OpenAI", "TypeScript"],
    status: "live",
  },
  {
    title: "Personic",
    description: "An AI agent that talks exactly like Hitesh Sir and Piyush Sir.",
    longDescription:
      "Personic is a fine-tuned AI agent trained on transcripts, interviews, and YouTube content from two of India's most popular programming educators — Hitesh Choudhary and Piyush Garg.\n\nIt mimics their exact communication style, vocabulary, and teaching approach. Powered by the OpenAI SDK with a custom system prompt engineering pipeline.\n\nA fun experiment in persona-engineering and LLM customization.",
    thumbnail: "/projects/personic-updated.png",
    githubUrl: "https://github.com/MEHULARORA11/PersonicAi",
    liveUrl: "https://personic.mehularora.dev/",
    techStack: ["OpenAI SDK", "Node.js", "JavaScript"],
    status: "live",
  },
  {
    title: "TalwinderCSS",
    description: "A custom CSS utility framework inspired by Tailwind CSS, with some fun classes.",
    longDescription:
      "TalwinderCSS is a lightweight custom CSS utility framework built from scratch. Inspired by the architecture of Tailwind CSS but with opinionated additions — including fun utility classes that Tailwind doesn't ship.\n\nIt's a pure HTML, CSS, and JavaScript project designed to demonstrate how utility-first frameworks work under the hood.\n\nA great tool for learning — and a fun way to build personal projects without reaching for a 3MB dependency.",
    thumbnail: "/projects/talwindercss.png",
    githubUrl: "https://github.com/MEHULARORA11/TalwinderCSS",
    liveUrl: "https://talwinder.mehularora.dev/",
    techStack: ["HTML", "CSS", "JavaScript"],
    status: "live",
  },
  {
    title: "QuarkAI",
    description: "A streaming AI chat app with persistent conversations and per-thread model overrides.",
    longDescription:
      "QuarkAI is a ChatGPT-style interface built on Next.js 16 where every message is streamed token-by-token from an OpenAI model and persisted to Postgres as it arrives.\n\nIt features per-conversation model and system prompt overrides, authenticated by Clerk, with a robust conversation management system for organizing chats.\n\nThe architecture relies on the Vercel AI SDK for streaming responses, ensuring the assistant's reply renders as it's generated without waiting for the full completion.",
    thumbnail: "/projects/quarkai.png",
    githubUrl: "https://github.com/MEHULARORA11/QuarkAI.git",
    liveUrl: "https://quarkai.mehularora.dev",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "OpenAI"],
    status: "live",
  },
];

// ─── Socials ──────────────────────────────────────────────────────────────────

export interface Social {
  name: string;
  url: string;
  icon: string;
}

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/MEHULARORA11",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mehul-arora-32674b238",
    icon: "linkedin",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/MehulArora121",
    icon: "twitter",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/mehularora505/",
    icon: "instagram",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@Mehul_Arora",
    icon: "youtube",
  },
  {
    name: "Discord",
    url: "https://discord.com/users/mehularora0243",
    icon: "discord",
  },
  {
    name: "Email",
    url: "mailto:mehularora505@gmail.com",
    icon: "mail",
  },
];


// ─── Videos ───────────────────────────────────────────────────────────────────

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  tags: string[];
}

export const youtubeVideos: Video[] = [
  {
    id: "ZRYxrHojqDE",
    title: "How I Made My Own Persona Bot",
    description:
      "In this video I explain how I approached building a Persona Bot that talks exactly like Hitesh Sir and Piyush Sir. I also discuss why I used Manual GuardRails over OpenAI Agentic SDK's built-in guardrails.",
    duration: "24:15",
    thumbnail: "https://i.ytimg.com/vi/ZRYxrHojqDE/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ZRYxrHojqDE",
    tags: ["PersonaAI", "Persona Bot", "ChatBot", "Personic"],
  },
];

// ─── Certificates ─────────────────────────────────────────────────────────────

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  tags: string[];
  thumbnail: string;
  credentialLink: string;
}

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "GenAI Cohort 2026",
    issuer: "chaicode.com",
    date: "2026",
    tags: ["GenAI", "chaicode" , "chai aur code" ,  "cohort", "2026"],
    thumbnail: "https://images.unsplash.com/photo-1789646780994-86275bd84f1a?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    credentialLink: "https://images.unsplash.com/photo-1789646780994-86275bd84f1a?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "cert-2",
    title: "Codefusion Hackathon 2026",
    issuer: "Codeverse",
    date: "2026",
    tags: ["hackathon", "codefusion", "2026"],
    thumbnail: "https://images.unsplash.com/photo-1789647269607-33d45cd9a1ad?q=80&w=1124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    credentialLink: "https://images.unsplash.com/photo-1789647269607-33d45cd9a1ad?q=80&w=1124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "cert-3",
    title: "Web Dev Cohort 2026",
    issuer: "chaicode.com",
    date: "May 2026",
    tags: ["development", "web dev", "coding", "chaicode", "chai aur code"],
    thumbnail: "https://images.pexels.com/photos/38577281/pexels-photo-38577281.jpeg?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    credentialLink: "https://images.pexels.com/photos/38577281/pexels-photo-38577281.jpeg?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
