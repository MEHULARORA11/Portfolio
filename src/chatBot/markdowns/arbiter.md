# Arbiter — Self-Consistency AI Agent

## What is Arbiter?
Arbiter is a **self-consistency agent** built by Mehul Arora. It uses the self-consistency prompting technique where multiple LLM calls generate diverse reasoning chains, and the agent then picks the most consistent / best answer — significantly improving accuracy over single-pass generation.

## Live Demo
- **Website:** https://arbiter.mehularora.dev/
- **GitHub:** https://github.com/MEHULARORA11/Arbiter

## Tech Stack
- **PostgreSQL** — persistent data storage
- **OpenAI, Claude, Gemini SDKs** — multi-model support (Arbiter can query multiple LLMs)
- **Next.js** — full-stack framework
- **JavaScript**
- **Node.js**

## How Self-Consistency Works
1. The agent sends the same query to the LLM **multiple times** (typically 3–5 parallel calls) with temperature > 0 so each run produces a different reasoning chain
2. All responses are compared and the **most consistent answer** (the one that appears most frequently or has the strongest logical backing) is selected
3. This dramatically reduces hallucinations and wrong answers, especially for math, logic, and complex reasoning tasks

## Why Multi-Model?
Arbiter supports OpenAI, Claude, and Gemini simultaneously. This means:
- You can run the same query across different model families
- Compare which model gives the most consistent results
- Get a "best of breed" answer across the AI ecosystem

## Why It's Impressive
- Demonstrates Mehul's understanding of **advanced prompting techniques** (self-consistency, chain-of-thought)
- Shows ability to integrate **multiple AI provider SDKs** in one project
- Uses Next.js for a full-stack architecture with PostgreSQL for persistence
- Real-world applicable — self-consistency is used in production AI systems to improve reliability
