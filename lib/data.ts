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
    description:
      "Multi-model LLM orchestrator that fans a single prompt out to five providers in parallel and synthesizes one answer through a dedicated evaluator model.",
    longDescription:
      "Arbiter runs the same prompt across OpenAI, Anthropic Claude, Google Gemini, Mistral, and DeepSeek simultaneously, streams every model's output live over Server-Sent Events, and can optionally reconcile all five responses into a single synthesized answer via a separate evaluator model — rather than trusting any one model's first response.\n\nBuilt on Next.js 16 (App Router) and React 19, with Drizzle ORM over PostgreSQL persisting full multi-turn conversation history per session. Auth is Google OAuth with PKCE and short-lived JWT sessions; user-supplied provider API keys (BYOK) are encrypted at rest with AES-256-GCM rather than stored in plaintext. Every run tracks token usage and cost per model against a maintained pricing table, and an in-app documentation site (built with React Flow diagrams) walks through the architecture.",
    thumbnail: "/projects/arbiter-updated.png",
    githubUrl: "https://github.com/MEHULARORA11/Arbiter",
    liveUrl: "https://arbiter.mehularora.dev/",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Google OAuth (PKCE)",
      "Server-Sent Events",
      "Zod",
    ],
    status: "live",
  },
  {
    title: "Personic",
    description:
      "A persona-grounded AI mentor agent that channels the teaching styles of two well-known coding educators, built on the OpenAI Agents SDK with a custom guardrail layer.",
    longDescription:
      "Personic runs two named agents whose responses are grounded in system prompts and reference material modeled on two popular Indian programming educators — not a fine-tuned model, but careful prompt engineering plus a custom Zod-validated guardrail agent that screens every incoming query before it reaches the persona agent.\n\nThe agents can call tools mid-conversation: looking up relevant YouTube videos, pulling a weather report, and dispatching email via Resend. The Express 5 backend streams raw model output to the client as it's generated. The frontend is a React 19 + Vite + TanStack Router app with a dual-theme, CSS-variable-driven UI and an interactive Three.js scene.",
    thumbnail: "/projects/personic-updated.png",
    githubUrl: "https://github.com/MEHULARORA11/PersonicAi",
    liveUrl: "https://personic.mehularora.dev/",
    techStack: [
      "OpenAI Agents SDK",
      "Express",
      "React 19",
      "Vite",
      "TanStack Router",
      "Tailwind CSS",
      "Three.js",
      "Zod",
    ],
    status: "live",
  },
  {
    title: "TalwinderCSS",
    description:
      "A zero-dependency CSS utility engine published to npm with a Hindi-inspired class-naming convention, packaged with an interactive documentation and playground site.",
    longDescription:
      "The engine (published to npm as talwinder-ji-ki-css) parses custom utility class tokens — like bg-laal-500 or chaiPad-p-4 — via a single-pass DOM scan and injects the matching atomic CSS at runtime, with zero dependencies and no build step or framework requirement.\n\nThis repo is the companion documentation and playground site: a React 19 + Vite + TanStack Router app with a live sandbox for building and previewing utility-class combinations in real time, styled with Tailwind CSS and featuring an interactive Three.js scene.",
    thumbnail: "/projects/talwindercss.png",
    githubUrl: "https://github.com/MEHULARORA11/TalwinderCSS",
    liveUrl: "https://talwinder.mehularora.dev/",
    techStack: [
      "JavaScript",
      "npm Package",
      "React 19",
      "Vite",
      "TanStack Router",
      "Tailwind CSS",
      "Three.js",
    ],
    status: "live",
  },
  {
    title: "QuarkAI",
    description:
      "A streaming AI chat app with token-by-token rendering, durable Postgres-backed history, and per-conversation model and system-prompt overrides.",
    longDescription:
      "QuarkAI is a ChatGPT-style interface built on Next.js 16 where every reply streams token-by-token via the Vercel AI SDK and is persisted to Postgres both as it arrives and once it completes, so a dropped connection never loses a reply mid-stream.\n\nEach conversation supports its own model and system-prompt override, with full conversation management — rename, pin, archive, delete — implemented as ownership-checked server actions. Auth is handled by Clerk, data access by Prisma 7 with the pg adapter, and the UI is built with shadcn/ui, Tailwind CSS v4, and TanStack Query.",
    thumbnail: "/projects/quarkai.png",
    githubUrl: "https://github.com/MEHULARORA11/QuarkAI",
    liveUrl: "https://quarkai.mehularora.dev",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL",
      "Prisma 7",
      "Clerk",
      "Vercel AI SDK",
      "TanStack Query",
    ],
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
