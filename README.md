# Mehul Arora - Developer Portfolio

A premium, highly-interactive developer portfolio built with Next.js 16, React 19, and Tailwind CSS v4. Designed with a focus on modern aesthetics, glassmorphism, fluid animations (Framer Motion), and real-time backend integrations.

## Features

- **Premium UI/UX:** Clean, dark-mode focused aesthetic with glassmorphic elements, subtle gradients, and scroll-driven animations using Framer Motion.
- **Dynamic View Counter:** Real-time page view tracking powered by a high-performance Redis cache layer, automatically synced to a PostgreSQL database via Inngest background jobs to prevent database bottlenecks.
- **Live GitHub Activity:** Fetches and displays a live 1-year contribution heatmap directly from the GitHub GraphQL API, complete with streak calculations.
- **Automated Resume Generation:** A custom programmatic PDF generation pipeline. Edit the resume layout in pure HTML/CSS and run a script to automatically compile it into a beautifully styled PDF using headless Chromium (Puppeteer).
- **Responsive Layouts:** Bento-box style project cards and content sections perfectly optimized for all viewports.
- **Mistral AI Integration (Planned):** Configured for a custom AI persona chatbot powered by the Mistral AI API.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Lucide Icons, shadcn/ui.
- **Backend:** Node.js, Next.js API Routes, Inngest (Background Jobs).
- **Database & Caching:** PostgreSQL (Neon), Prisma ORM, Redis (Upstash/Docker).
- **Tooling:** Bun, TypeScript, Puppeteer (PDF Generation).

## Getting Started

### Prerequisites

You will need [Bun](https://bun.sh/) installed locally, as well as a local or remote Redis instance and a PostgreSQL database.

### 1. Clone & Install
```bash
git clone https://github.com/MEHULARORA11/portfolio_2.git
cd portfolio_2
bun install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and configure the following variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development

# Database & Cache
DATABASE_URL="postgresql://user:password@host/db"
REDIS_CONNECTION_STRING="redis://localhost:6379"
REDIS_PASSWORD="your-redis-password"

# APIs
GITHUB_TOKEN="your_github_personal_access_token"
RESEND_API_KEY="your_resend_api_key"
MISTRALAI_API_KEY="your_mistral_api_key"
EMAIL_TO="your_email@domain.com"
```

### 3. Database Setup (Prisma)
The Prisma client is configured to generate into a custom `lib/generate` directory.
```bash
# Generate the custom Prisma Client
bunx prisma generate

# Push the schema to your database
bunx prisma db push
```

### 4. Run the Development Server
```bash
# Starts the Next.js app and the Inngest dev server for background jobs
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Custom Scripts

### Automated Resume Generation
Instead of manually exporting PDFs from design software, this portfolio includes a programmatic resume generator.
To edit the resume content, modify `scripts/resume-template.html`.

To compile the updated HTML into the live `public/Mehul_Arora_Resume.pdf` file, run:
```bash
bun run build:resume
```

### Production Build
The production `start` script is wired to ensure the Prisma client is always generated before booting the server:
```bash
bun run build
bun run start
```

## License

Designed and built by [Mehul Arora](https://mehularora.dev). All rights reserved.
