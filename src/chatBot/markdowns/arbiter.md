# Arbiter — Multi-Model LLM Orchestrator

## What is Arbiter?

Arbiter is a full-stack multi-model AI chat platform built on Next.js 16 (App Router). Instead of routing a query to a single AI model, Arbiter fans your question out to **multiple LLM providers simultaneously** — OpenAI, Claude (Anthropic), Gemini (Google), DeepSeek, and Mistral — streams every model's response to the UI in real time so you can watch all of them "think" in parallel, and optionally routes all worker outputs through a dedicated **evaluator model** that synthesizes a single best-of-breed final answer.

Live: https://arbiter.mehularora.dev/
GitHub: https://github.com/MEHULARORA11/Arbiter

---

## Core Concept

Think of it as a panel of expert AI judges. You ask a question:
1. Every selected "worker" model answers it independently and concurrently
2. Their answers stream to your screen in real time (side by side)
3. An optional "evaluator" model reads all their answers and produces one synthesized, corrected, best-quality final response
4. All runs, token counts, latencies, and USD costs are persisted to a PostgreSQL database

---

## Architecture

### Orchestration Pipeline (`lib/orchestrator/runPipeline.ts`)

The heart of Arbiter is `runPipeline()`, which:

1. **Fan-out phase**: calls `Promise.all()` on all selected workers — each worker runs `adapter.streamWorker()` which is a provider-specific streaming generator
2. **Worker streaming**: each worker emits `delta` events (token chunks), a `done` event with full token/latency metadata, and `error` events. Deltas are forwarded to the browser via SSE in real time.
3. **Evaluator phase** (optional): if an evaluator is selected, runs `adapter.streamEvaluator()` with the original query + all worker results as input. The evaluator synthesizes a single final answer.
4. **Fallback**: if no evaluator is selected, picks the first successful worker result as the final answer.
5. **Persistence**: all runs (worker + evaluator) are persisted to `messageModelRuns` table in PostgreSQL.

### Provider Adapters (`lib/agents/`)

5 provider adapters, all implementing the same `AgentAdapter` interface (`lib/agents/types.ts`):
- **OpenAI** (`lib/agents/openai.ts`) — OpenAI Chat Completions API
- **Claude** (`lib/agents/claude.ts`) — Anthropic Messages API
- **Gemini** (`lib/agents/gemini.ts`) — Google Gemini API
- **DeepSeek** (`lib/agents/deepseek.ts`) — DeepSeek API
- **Mistral** (`lib/agents/mistral.ts`) — Mistral AI API

Each adapter implements:
- `streamWorker()` — async generator for worker role (answers directly)
- `streamEvaluator()` — async generator for evaluator role (synthesizes worker outputs)

Adapters are registered in `lib/agents/registry.ts` and looked up by provider string (`"openai"`, `"claude"`, `"gemini"`, `"deepseek"`, `"mistral"`).

### SSE Streaming (`lib/orchestrator/sse.ts`)

Real-time streaming is done via **Server-Sent Events (SSE)**. Events include:
- `worker_start` — a worker has begun generating
- `worker_delta` — a token chunk from a worker
- `worker_done` — worker finished, includes token counts and latency
- `worker_error` — worker failed (key error, rate limit, timeout, etc.)
- `evaluator_start`, `evaluator_delta`, `evaluator_done` — same for evaluator
- `error` — fatal pipeline error

### Prompts (`lib/agents/prompts.ts`)

Two system prompts:
- **`WORKER_SYSTEM_PROMPT`** — instructs workers to answer directly without mentioning other models
- **`EVALUATOR_SYSTEM_PROMPT`** — instructs evaluator to synthesize a single final answer, not produce a comparison table
- **`AUTO_TITLE_SYSTEM_PROMPT`** — generates 2-5 word chat titles (like ChatGPT's naming)

### Database Schema (`db/schema.ts`) — Drizzle ORM + PostgreSQL

5 tables:
- `users` — Google OAuth users, cumulative token/cost counters
- `refreshTokens` — hashed refresh tokens with expiry and revocation
- `chats` — chat sessions with selected workers/evaluator config, title, cost totals
- `messages` — individual messages with sequence number and which model produced them
- `messageModelRuns` — per-model run records: provider, model, role (worker/evaluator), status, input/output/cached tokens, cost in USD, latency, TTFT (time to first token), raw response

### Authentication (`lib/auth/`)

Google OAuth 2.0 with **PKCE flow**:
- Short-lived JWT session tokens (15 minutes) + refresh token rotation
- Refresh tokens are stored hashed in PostgreSQL, not plain text
- JWT signing with `JWT_SECRET` env variable

### Encrypted API Key Storage (`lib/crypto/aesGcm.ts`)

Users can save their own API keys per provider ("Bring Your Own Key"). Keys are encrypted at rest with **AES-256-GCM** before storage:
- The `CREDENTIALS_ENCRYPTION_KEY` env variable is hashed to 32 bytes (SHA-256) to ensure valid key length
- Each key gets a random 12-byte IV and an auth tag (GCM provides authenticated encryption)
- Stored in `apiCredentials` table: `encryptedKey`, `iv`, `authTag`

### Cost Tracking (`config/modelPricing.ts`)

A pricing table maps every supported model to per-token costs (input, output, cached input, cache write). After each run, costs are computed and rolled up:
- Per `messageModelRuns.costUsd`
- Per `chats.totalCostUsd`
- Per `users.totalCostUsd`

### Guest Mode

`/api/guest/message` — allows anyone to send a single message without signing in. No persistence, no history.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Diagrams | @xyflow/react (React Flow) |
| Database | PostgreSQL |
| ORM | Drizzle ORM + drizzle-kit |
| Auth | Google OAuth (PKCE) + JWT + refresh tokens |
| Encryption | AES-256-GCM (Node.js crypto) |
| Validation | Zod |
| Animation | Framer Motion |
| Package manager | Bun |
| Deployment | Docker (Postgres), Vercel (app) |

---

## Common Questions

**Q: What AI models does Arbiter support?**
A: OpenAI (GPT series), Anthropic Claude, Google Gemini, DeepSeek, and Mistral. Each has its own adapter.

**Q: Does Arbiter pick the "best" AI answer automatically?**
A: It can — if you select an evaluator model, it reads all worker outputs and synthesizes the best final answer. Without an evaluator, it uses the first successful worker's response.

**Q: How are API keys stored?**
A: Encrypted with AES-256-GCM before being written to the database. The encryption key is an environment variable on the server — keys are never stored plain text.

**Q: Does Arbiter support multi-turn conversation?**
A: Yes. Full conversation history is threaded through every API call so each model has full context of the chat.

**Q: Can I use Arbiter without signing in?**
A: Yes, there's a guest mode — but conversations are not saved.

**Q: How does Arbiter know what each model costs?**
A: There's a `modelPricing.ts` config file with per-model token pricing. After every run, costs are calculated and persisted per-message and rolled up per-chat and per-user.

**Q: How does real-time streaming work?**
A: Server-Sent Events (SSE). The browser opens an SSE connection and receives events as each model generates tokens. All models stream concurrently — you see them all responding at the same time.
