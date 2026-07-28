# Personic — AI Persona Agent

## What is Personic?
Personic is an AI agent built by Mehul Arora that talks **exactly like Hitesh Choudhary (Hitesh Sir) and Piyush Garg (Piyush Sir)** — two of India's most popular programming educators. It replicates their teaching style, vocabulary, humor, code-explanation approach, and even their characteristic phrases.

## Live Demo
- **Website:** https://personic.mehularora.dev/
- **GitHub:** https://github.com/MEHULARORA11/PersonicAi
- **YouTube Explanation Video:** https://www.youtube.com/watch?v=ZRYxrHojqDE (Mehul made a full video explaining how he built it)

## Tech Stack
- **OpenAI SDK** — GPT models for persona simulation
- **Node.js** — backend runtime
- **JavaScript** — primary language

## How It Works
1. Mehul crafted highly detailed **persona-specific system prompts** that capture Hitesh Sir's and Piyush Sir's exact speech patterns, teaching methodology, preferred analogies, and personality quirks.
2. The agent uses **manual guardrails** (not OpenAI's Agentic SDK built-in guardrails) because Mehul found that manual prompt engineering gave more precise control over the persona boundary — keeping the bot in-character at all times.
3. Users can ask coding questions and get answers in Hitesh Sir's or Piyush Sir's style — complete with their typical encouragement, chai references, and "bhai" expressions.

## Why It's Interesting
- Demonstrates advanced **prompt engineering** and **persona simulation**
- Shows Mehul's ability to think about AI safety and boundaries
- The choice of manual guardrails over SDK-built-in ones reflects his engineering judgment
- Mehul even made a **YouTube video** explaining his approach and reasoning

## Key Technical Decision
Mehul deliberately chose **manual guardrails over the OpenAI Agentic SDK's built-in guardrails** because he wanted fine-grained control over exactly what the persona would and wouldn't say, rather than relying on generic moderation that could break the persona experience.
