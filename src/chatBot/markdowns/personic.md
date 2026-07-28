# Personic — AI Persona Chat Agent

## What is Personic?

Personic is a full-stack AI agent application that lets you have a real conversation with an AI that talks, reasons, and responds exactly like one of two famous Indian coding educators: **Hitesh Choudhary** (founder of LearnCodeOnline / ChaiCode) or **Piyush Garg** (popular Node.js & full-stack educator). The AI replicates their teaching style, vocabulary, use of Hindi-English mix (Hinglish), and personality — not just their answers.

Live: https://personic.mehularora.dev/
GitHub: https://github.com/MEHULARORA11/PersonicAi

---

## Architecture

### Backend (Bun + TypeScript + Express)

The backend is a Bun runtime TypeScript Express application. Each persona has its own independent agent pipeline:

**Two main agents** (one per persona):
- `hiteshAgent` — built with `@openai/agents` SDK, powered by `gpt-4o-mini`
- `piyushAgent` — identical agent structure, separate persona instructions

Each main agent has **4 tools** it can call during a conversation:
- `weatherTool` — fetches current weather for any location
- `sendEmailToUserTool` — can send emails on behalf of the persona
- `youtubeVideoSearchingTool` — searches YouTube for videos (e.g., "Hitesh's video on Node.js")
- `youtubePlaylistSearchingTool` — searches YouTube playlists

**Two guardrail agents** (one per persona):
- Run before the main agent on every request
- Use a custom `isSafeQuery` tool that calls the slang/abuse detection module
- Return a structured Zod output: `{ isValidQuery: boolean, reason?: string }`
- If query is invalid, the request is rejected before the main agent is ever called

### BYOK (Bring Your Own Key) System

Personic is a **BYOK application** — it does not use a shared OpenAI API key for all users. Each user must provide their own OpenAI API key.

How it works:
1. User pastes their `sk-...` OpenAI API key in the UI
2. The backend validates the key format (regex) and tests it against `openai.models.list()`
3. If valid, the key is stored in an **httpOnly cookie** (`personic_byok_key`) for 10 years
4. Every chat request reads the key from the cookie and uses it to clone the agents with a scoped `OpenAI` client via `OpenAIChatCompletionsModel`
5. If no key is stored, the API returns a `401` with an error in Hindi/English: "are bhai pehele valid key use karo phir baat karenge"

Security: cookies use `SameSite=None; Secure` in production (cross-site between frontend and backend domains), `SameSite=Lax` in development.

### Streaming

Agent responses are streamed to the browser in real time using the OpenAI Agents SDK's `stream: true` mode. The `response.toTextStream()` async generator is piped directly to the HTTP response. No SSE wrapper — raw chunked HTTP streaming.

### Request Flow

```
Browser → POST /api/post { message, persona }
  → Read BYOK cookie
  → Clone guardrail agent with user's key
  → Run guardrail: isSafeQuery(message)
    → If invalid: throw, return 401
  → Clone main agent with user's key
  → Run main agent with system prompt (persona) + user message
  → Stream response chunks back to browser
  → res.end()
```

### Frontend (React + TanStack Router + Vite)

- **Framework**: React 19 with Vite, TypeScript
- **Routing**: TanStack Router
- **UI**: Shadcn/ui components, Lucide icons, Sonner for toasts
- **Docs section**: in-app documentation with DocHeader component and reading time indicators

### Tech Stack Summary

| Layer | Technology |
|---|---|
| Runtime | Bun v1.3.14 |
| Framework | Express 5 (TypeScript) |
| AI SDK | `@openai/agents` v0.12.0, `openai` v6.45.0 |
| Model | gpt-4o-mini (per-user BYOK) |
| Frontend | React 19, Vite, TanStack Router |
| Email | Resend SDK |
| Validation | Zod v4 |

---

## Key Design Decisions

- **Stateless agents**: agents are cloned fresh per request using `OpenAIChatCompletionsModel` (Chat Completions, not Responses API). This avoids state corruption when the server restarts on Render free tier.
- **Persona via system prompt**: the persona voice is injected as a `role: "system"` message alongside the user's query, not baked into agent instructions — this allows the same agent base to be reused for both personas.
- **Guardrail before main agent**: the guardrail agent runs and resolves fully before the main agent starts, adding one extra LLM call per request but preventing the persona agent from processing abusive queries.
- **BYOK prevents abuse**: since users pay with their own API key, Mehul doesn't bear the cost of API usage — also means no rate limit pooling problems.

---

## Common Questions

**Q: Which AI model does Personic use?**
A: GPT-4o-mini via the OpenAI API. Users must bring their own OpenAI API key.

**Q: Can Personic actually send emails?**
A: Yes, via the `sendEmailToUserTool` using the Resend email service.

**Q: Can it search YouTube?**
A: Yes, both individual videos and playlists via dedicated tools.

**Q: Is the API key stored securely?**
A: It's stored in an httpOnly cookie — not accessible to JavaScript — with SameSite=None;Secure in production.

**Q: What happens if I don't provide a key?**
A: The backend returns a 401 with a humorous Hindi-English error message.
