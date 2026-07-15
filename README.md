# Portfolio

The source code for Mehul Arora's personal developer portfolio — a React + Vite single-page site showcasing projects, blogs, certificates, and reels/videos, backed by a small Express API for the contact form and a persistent visitor counter.

The frontend leans into a distinctive visual identity (custom loaders, animated backgrounds, 3D elements, and scroll-driven motion) rather than a generic template, and ships with its own resume generator that produces a downloadable PDF straight from the portfolio's data.

## Features

- **Multi-section portfolio** — Home, Projects, Blogs, Certificates, Reels, Videos, and Resume pages, all driven from a single structured data source (`src/data/portfolioData.js`).
- **Rich motion & visuals** — GSAP and Framer Motion for animation, `three` / `@react-three/fiber` / `@react-three/drei` for 3D elements, `tsparticles` for particle backgrounds, `lenis` for smooth scrolling, and `aos` for scroll-reveal effects.
- **Custom themed loaders** — dedicated animated loading states per section (blogs, certificates, projects, reels, videos).
- **Search everywhere** — fuzzy search (via `fuse.js`) across blogs, certificates, YouTube, and Instagram content.
- **Light/dark theme toggle**.
- **AI chatbot widget** — an in-page assistant that answers common visitor questions about Mehul (projects, skills, contact, availability), currently running on canned responses pending a live backend.
- **Working contact form** — messages are emailed directly to Mehul via [Resend](https://resend.com), with a clean HTML email template.
- **Persistent view counter** — page views are tracked in Redis (`/api/views`), with an in-memory fallback if Redis is unreachable.
- **Resume generation** — a Node script (`scripts/generate-resume.js`) builds a polished PDF resume with `pdfkit` from the portfolio's own data, output to `public/resume/`.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| Routing | React Router |
| Animation / 3D | GSAP, Framer Motion, Three.js (`@react-three/fiber`, `@react-three/drei`), tsParticles, Lenis, AOS |
| Search | Fuse.js |
| Backend | Node.js, Express 5 |
| Email | Resend + HTML email templates |
| Data store | Redis / ioredis (view counter) |
| PDF generation | PDFKit |
| Deployment | Docker, Caddy, Traefik (author's own production infra) |

## Prerequisites

- Node.js 20+
- A [Resend](https://resend.com) API key (for the contact form to actually send email)
- Access to a Redis instance (optional — the view counter falls back to an in-memory counter if Redis isn't configured or reachable)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/MEHULARORA11/Portfolio.git
cd Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Port the Express API listens on
PORT=8000

# Frontend origin allowed by CORS on the backend
CLIENT_URL=http://localhost:5173

# Resend API key used to send contact-form emails
RESEND_API_KEY=

# Redis connection string for the persistent view counter (optional)
REDIS_CONNECTION_STRING=redis://localhost:6379
```

The frontend (Vite) reads the backend's URL from its own env variable — add this to the same `.env` file, or a `.env` picked up by Vite at the project root:

```env
# URL of the Express API, used by the React app
VITE_CLIENT_URL=http://localhost:8000
```

> The contact form and view counter will work without `RESEND_API_KEY` / `REDIS_CONNECTION_STRING` set, but emails won't actually send and views will just count in memory rather than persisting.

### 4. (Optional) Start Redis locally

If you want persistent view counts, run a local Redis instance — a compose file for a password-protected Redis is included:

```bash
docker compose -f docker-compose.radis.yml up -d
```

Then set `REDIS_CONNECTION_STRING` accordingly (include the password if you used one, e.g. `redis://:yourpassword@localhost:6379`).

### 5. Run the backend

```bash
npm start
```

This starts the Express API (`index.js`) with `nodemon`, listening on `PORT` (default from `.env`, or `80`).

### 6. Run the frontend

In a separate terminal:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

### 7. (Optional) Generate the resume PDF

```bash
npm run generate-resume
```

This writes `Mehul_Arora_Resume.pdf` to `public/resume/`.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server for the frontend |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production frontend build locally |
| `npm start` | Start the Express backend with `nodemon` (`index.js`) |
| `npm run lint` | Run ESLint |
| `npm run generate-resume` | Generate a PDF resume into `public/resume/` |

## Project structure

```
index.js                        # Express API: views counter, contact form endpoint, health check
email.js                        # Resend integration + HTML email template for contact messages
redis.js                        # Redis/ioredis client setup
scripts/
  generate-resume.js            # Builds a PDF resume from portfolio data using pdfkit
src/
  App.jsx                       # Root app component / router
  main.jsx                      # React entry point
  index.css                     # Global styles (Tailwind)
  data/portfolioData.js         # Central content source: projects, skills, certificates, etc.
  hooks/                        # Custom React hooks
  Pages/                        # Route-level pages: Home, Projects, Blogs, Certificates, Reels, Videos, Resume
  Components/                   # UI components
    loaders/                    # Section-specific animated loading states
    search/                     # Fuzzy search bars per content type
    shared/                     # Reusable building blocks (buttons, wrappers, section headings)
    Blogs/, Certificates/, Instagram/, Youtube/  # Section-specific card + list components
    AiChatBot.jsx                # In-page assistant widget
    ContactSection.jsx           # Contact form
public/
  resume/                       # Generated resume PDF output
docker-compose*.yml              # Author's production deployment configs (Traefik, Redis, logs, n8n)
Caddyfile / nginx.conf / Dockerfile  # Production reverse proxy / container configs
```

## Deployment

The various `docker-compose.*.yml` files, `Caddyfile`, and `nginx.conf` reflect the author's own self-hosted production setup (Traefik as an API gateway with automatic TLS, a dedicated Redis container, log aggregation via Dozzle, and an n8n automation instance) — none of these are required to run the project locally, but they're a useful reference for deploying it yourself. `vercel.json` is also included for deploying the frontend to Vercel.

## License

No license has been specified for this repository. All rights reserved by the author unless a license file is added.