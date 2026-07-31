// ============================================================
// mistralClient.js  –  Streaming Mistral AI chat client
// Loads all markdown knowledge files at startup,
// streams responses via SSE, enforces guardrails..
// ============================================================

import { Mistral } from '@mistralai/mistralai';
import { readFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { SYSTEM_PROMPT, INSTRUCTION_PROMPT } from './prompt.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MARKDOWNS_DIR = join(__dirname, 'markdowns');

// ─── Load all markdown files at startup ──────────────────────────────────────
function loadMarkdownContext() {
  try {
    const files = readdirSync(MARKDOWNS_DIR).filter(f => f.endsWith('.md'));
    const sections = files.map(file => {
      const content = readFileSync(join(MARKDOWNS_DIR, file), 'utf-8');
      return `\n\n--- PROJECT KNOWLEDGE: ${file.replace('.md', '').toUpperCase()} ---\n${content}`;
    });
    return sections.join('\n');
  } catch (err) {
    console.error('Failed to load markdown context:', err.message);
    return '';
  }
}

const MARKDOWN_CONTEXT = loadMarkdownContext();

// Build the full system message once (expensive string concatenation done once)
const FULL_SYSTEM_CONTENT = SYSTEM_PROMPT + '\n\n' + MARKDOWN_CONTEXT;

// ─── Jailbreak detection patterns (server-side defence in depth) ──────────────
const JAILBREAK_PATTERNS = [
  /ignore\s+(previous|all|prior|your|the)\s+(instructions?|prompts?|rules?|guidelines?)/i,
  /forget\s+(your|previous|all|prior)\s+(instructions?|prompts?|rules?)/i,
  /you\s+are\s+now\s+(an?\s+)?(unrestricted|free|different|new|jailbroken|DAN)/i,
  /pretend\s+(you\s+are|to\s+be|you're)\s+(an?\s+)?(different|unrestricted|GPT|DAN|AI\s+without)/i,
  /developer\s+mode/i,
  /DAN\s+mode/i,
  /\bDAN\b.*prompt/i,
  /jailbreak/i,
  /override\s+(safety|restrictions?|guidelines?|rules?)/i,
  /act\s+as\s+(if\s+)?(you\s+(have|had)\s+no\s+restrictions?|a\s+different\s+AI)/i,
  /reveal\s+(your\s+)?(system\s+prompt|instructions?|prompt|context|guidelines?)/i,
  /show\s+me\s+(your\s+)?(system\s+prompt|instructions?|prompt)/i,
  /what\s+(are|were)\s+your\s+(exact\s+)?(system\s+prompt|instructions?|rules?)/i,
  /disregard\s+(the\s+)?(above|previous|all|prior)/i,
  /your\s+new\s+(instructions?|rules?|role|task)\s+(is|are)/i,
  /from\s+now\s+on\s+(you\s+)?(are|will|must|should)\s+(be|act|behave|ignore)/i,
  /repeat\s+(after\s+me|the\s+following|everything\s+I\s+say)/i,
  /translate\s+(your\s+)?(system\s+)?prompt/i,
  /summarize\s+(your\s+)?(system\s+)?prompt/i,
  /base64/i,
  /encode\s+your\s+instructions/i,
  /hypothetically\s+(speaking\s+)?,?\s+(if\s+you\s+had?\s+no\s+restrictions?)/i,
  /for\s+educational\s+purposes?\s+only/i,
  /in\s+a\s+(fictional|hypothetical|simulation|roleplay|role-play)\s+(world|scenario|universe|context)/i,
  /api[\s_-]?key/i,
  /secret[\s_-]?key/i,
  /env(ironment)?\s+variable/i,
  /\.env\b/i,
  /password/i,
  /credentials?/i,
  /redis[\s_-]?password/i,
  /smtp/i,
  /private[\s_-]?key/i,
];

export function detectJailbreak(userMessage) {
  const lower = userMessage.toLowerCase().trim();
  return JAILBREAK_PATTERNS.some(pattern => pattern.test(lower));
}

// ─── Mistral client singleton ─────────────────────────────────────────────────
const mistral = new Mistral({ apiKey: process.env.MISTRALAI_API_KEY });

// ─── Build conversation messages array ───────────────────────────────────────
function buildMessages(query, history = []) {
  const messages = [
    { role: 'system', content: FULL_SYSTEM_CONTENT },
  ];

  // Inject last N conversation turns for context (cap at 10 turns to control tokens)
  const MAX_HISTORY_TURNS = 10;
  const recentHistory = history.slice(-MAX_HISTORY_TURNS);
  for (const turn of recentHistory) {
    if (turn.role === 'user' || turn.role === 'assistant') {
      messages.push({ role: turn.role, content: turn.content });
    }
  }

  // Add the current user query with instruction reminder
  messages.push({
    role: 'user',
    content: query + '\n\n[REMINDER]: ' + INSTRUCTION_PROMPT,
  });

  return messages;
}

// ─── Main streaming function ──────────────────────────────────────────────────
// Returns an async generator that yields string chunks.
// The caller (Express route) pipes these chunks as SSE.
export async function* streamChatResponse(query, history = []) {
  // Server-side jailbreak check (defence in depth — frontend also checks)
  if (detectJailbreak(query)) {
    yield "I'm designed exclusively to help you learn about Mehul's portfolio. I can't help with that request. Ask me about his projects, skills, or how to get in touch!";
    return;
  }

  const messages = buildMessages(query, history);

  const stream = await mistral.chat.stream({
    model: 'mistral-large-latest',
    messages,
    maxTokens: 600,
    temperature: 0.4,
    safePrompt: true, // Mistral's built-in safety layer (defence in depth)
  });

  for await (const chunk of stream) {
    const delta = chunk?.data?.choices?.[0]?.delta?.content;
    if (delta) {
      yield delta;
    }
  }
}
