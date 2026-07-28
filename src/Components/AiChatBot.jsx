import React, { useState, useRef, useEffect, useCallback } from "react";
import { FiSend, FiX, FiTrash2 } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { TbSparkles } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ─── Config ───────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_CLIENT_URL || "http://localhost:4000";
const MAX_CHARS = 500;

// ─── Real project quick-reply chips ──────────────────────────────────────────
const PROJECT_CHIPS = [
  {
    label: "Personic",
    icon: "🤖",
    text: "Tell me about Personic — what is it and how does it work?",
  },
  {
    label: "Arbiter",
    icon: "⚖️",
    text: "What is Arbiter and how does the self-consistency agent work?",
  },
  {
    label: "1M Checkboxes",
    icon: "✅",
    text: "How did Mehul scale 1 Million Checkboxes? Walk me through the architecture.",
  },
  {
    label: "TalwinderCSS",
    icon: "🎨",
    text: "Explain TalwinderCSS and what makes it unique.",
  },
  {
    label: "Hire Mehul",
    icon: "💼",
    text: "Is Mehul available for work? How can I hire or contact him?",
  },
  {
    label: "Tech Stack",
    icon: "🛠",
    text: "What is Mehul's tech stack and core skills?",
  },
];

// ─── Light-weight client-side jailbreak / abuse guard ─────────────────────────
// (server runs the full check — this is an early UX-level filter)
const CLIENT_BLOCK_PATTERNS = [
  /ignore\s+(previous|all|prior|your)\s+(instructions?|prompts?|rules?)/i,
  /forget\s+(your|previous|all)\s+(instructions?|rules?)/i,
  /jailbreak/i,
  /developer\s+mode/i,
  /\bDAN\b/i,
  /override\s+(safety|restrictions?)/i,
  /reveal\s+(your\s+)?(system\s+prompt|instructions?)/i,
  /api[\s_-]?key/i,
  /password/i,
  /\.env\b/i,
];
function clientBlockCheck(text) {
  return CLIENT_BLOCK_PATTERNS.some((p) => p.test(text));
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ─── ChatHeader ───────────────────────────────────────────────────────────────
const ChatHeader = ({ onClear, onClose }) => (
  <div
    className="flex items-center justify-between px-5 py-4 flex-shrink-0"
    style={{ borderBottom: "1px solid var(--divider)" }}
  >
    <div className="flex items-center gap-3">
      <div
        className="flex items-center justify-center w-9 h-9 rounded-xl text-xl relative"
        style={{
          background: "var(--accent-muted)",
          border: "1px solid var(--accent-border)",
          color: "var(--accent-light)",
        }}
      >
        <RiRobot2Line />
        <span
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
          style={{
            background: "var(--accent)",
            borderColor: "var(--card-bg)",
            animation: "pulse 2s infinite",
          }}
        />
      </div>
      <div>
        <p className="font-bold text-sm theme-text leading-tight">Mehul's AI</p>
        <p
          className="text-xs flex items-center gap-1.5"
          style={{ color: "var(--accent-light)" }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--accent)" }}
          />
          Powered by Mistral
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={onClear}
        title="Clear chat"
        className="flex items-center justify-center w-8 h-8 rounded-xl theme-icon-btn transition-all duration-200 hover:scale-105"
      >
        <FiTrash2 className="text-sm" />
      </button>
      <button
        onClick={onClose}
        title="Close"
        className="flex items-center justify-center w-8 h-8 rounded-xl theme-icon-btn transition-all duration-200 hover:scale-105"
      >
        <FiX className="text-sm" />
      </button>
    </div>
  </div>
);

// ─── Markdown renderer config ─────────────────────────────────────────────────
const markdownComponents = {
  p: ({ children }) => (
    <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
  ),
  strong: ({ children }) => (
    <strong style={{ color: "var(--accent-light)", fontWeight: 700 }}>
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="italic opacity-90">{children}</em>,
  ul: ({ children }) => (
    <ul className="list-disc pl-4 mb-2 flex flex-col gap-0.5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-4 mb-2 flex flex-col gap-0.5">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  code: ({ inline, children }) =>
    inline ? (
      <code
        className="px-1.5 py-0.5 rounded text-[11px] font-mono"
        style={{
          background: "var(--accent-muted)",
          color: "var(--accent-light)",
          border: "1px solid var(--accent-border)",
        }}
      >
        {children}
      </code>
    ) : (
      <pre
        className="my-2 p-3 rounded-xl overflow-x-auto text-[11px] font-mono"
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid var(--accent-border)",
          color: "var(--accent-light)",
        }}
      >
        <code>{children}</code>
      </pre>
    ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "var(--accent-light)", textDecoration: "underline", textUnderlineOffset: "2px" }}
      className="hover:opacity-80 transition-opacity"
    >
      {children}
    </a>
  ),
  h1: ({ children }) => (
    <h1 className="text-base font-bold mb-2 theme-text">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-sm font-bold mb-1.5 theme-text">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xs font-bold mb-1 theme-text">{children}</h3>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="pl-3 my-2 text-xs italic"
      style={{
        borderLeft: "3px solid var(--accent-border)",
        color: "var(--text-muted)",
      }}
    >
      {children}
    </blockquote>
  ),
  hr: () => <hr style={{ borderColor: "var(--divider)", margin: "8px 0" }} />,
};

// ─── ChatMessage ──────────────────────────────────────────────────────────────
const ChatMessage = ({ msg, onSend, isStreaming }) => {
  const isUser = msg.role === "user";

  return (
    <div
      className={`flex flex-col gap-1 max-w-[88%] ${
        isUser ? "self-end items-end" : "self-start items-start"
      }`}
    >
      <span
        className="text-[10px] uppercase tracking-wide px-1"
        style={{ color: "var(--text-muted)" }}
      >
        {isUser ? "You" : "Mehul's AI"}
      </span>

      <div
        className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
        style={
          isUser
            ? {
                background: "var(--accent-muted)",
                border: "1px solid var(--accent-border)",
                color: "var(--text-primary)",
                borderBottomRightRadius: "4px",
              }
            : {
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--text-primary)",
                borderBottomLeftRadius: "4px",
              }
        }
      >
        {isUser ? (
          <span>{msg.text}</span>
        ) : (
          <div className="prose-custom">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {msg.text}
            </ReactMarkdown>
            {isStreaming && (
              <span
                className="inline-block w-[2px] h-[14px] ml-0.5 align-middle rounded-sm"
                style={{
                  background: "var(--accent)",
                  animation: "blink 0.8s step-end infinite",
                }}
              />
            )}
          </div>
        )}
      </div>

      <span
        className="text-[10px] px-1"
        style={{ color: "var(--text-muted)" }}
      >
        {msg.time}
      </span>

      {/* Project quick-reply chips (only on the first welcome message) */}
      {msg.quickReplies && (
        <div className="flex flex-wrap gap-2 mt-2 max-w-[260px]">
          {msg.quickReplies.map((chip, qi) => (
            <button
              key={qi}
              onClick={() => onSend(chip.text)}
              className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_12px_var(--accent-glow-soft)] active:scale-95"
              style={{
                background: "var(--accent-muted)",
                border: "1px solid var(--accent-border)",
                color: "var(--accent-light)",
              }}
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── TypingIndicator ──────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="self-start flex flex-col gap-1 items-start">
    <span
      className="text-[10px] uppercase tracking-wide px-1"
      style={{ color: "var(--text-muted)" }}
    >
      Mehul's AI
    </span>
    <div
      className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderBottomLeftRadius: "4px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{
            background: "var(--accent)",
            animationDelay: `${i * 0.18}s`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  </div>
);

// ─── ChatInput ────────────────────────────────────────────────────────────────
const ChatInput = ({
  textareaRef,
  input,
  onChange,
  onKeyDown,
  onSend,
  isSendDisabled,
  charCount,
}) => (
  <div
    className="flex flex-col gap-2 px-4 py-3 flex-shrink-0 w-full min-w-0"
    style={{ borderTop: "1px solid var(--divider)" }}
  >
    <div className="flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Ask anything about Mehul..."
        rows={1}
        className="flex-1 resize-none rounded-xl px-3 py-2.5 text-sm leading-relaxed theme-input focus:outline-none scroll-hide"
        style={{ maxHeight: "120px", overflowY: "auto" }}
      />
      <button
        onClick={() => onSend()}
        disabled={isSendDisabled}
        className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
        style={{
          background: isSendDisabled ? "var(--card-bg)" : "var(--accent)",
          color: isSendDisabled ? "var(--text-muted)" : "var(--button-text)",
          border: "1px solid var(--accent-border)",
          boxShadow: isSendDisabled
            ? "none"
            : "0 0 12px var(--accent-glow-soft)",
        }}
      >
        <FiSend className="text-sm" />
      </button>
    </div>

    <div className="flex items-center justify-between">
      <span
        className="text-[10px] flex items-center gap-1"
        style={{ color: "var(--text-muted)" }}
      >
        <TbSparkles className="text-xs" style={{ color: "var(--accent)" }} />
        Mistral AI
      </span>
      <span
        className="text-[10px]"
        style={{
          color: charCount > MAX_CHARS * 0.85 ? "var(--accent)" : "var(--text-muted)",
        }}
      >
        {charCount} / {MAX_CHARS}
      </span>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════════
// AiChatBot — Main Component
// ════════════════════════════════════════════════════════════════════════════════
const AiChatBot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm Mehul's Portfolio Assistant. What would you like to know?",
      time: getTime(),
      quickReplies: PROJECT_CHIPS,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);   // waiting for first chunk
  const [streamingId, setStreamingId] = useState(null); // which msg is streaming
  const [charCount, setCharCount] = useState(0);

  // conversation history for context (passed to backend)
  const historyRef = useRef([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const abortRef = useRef(null); // AbortController for in-flight requests

  // ─── Auto-scroll ─────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ─── Input handlers ───────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val.length > MAX_CHARS) return;
    setInput(val);
    setCharCount(val.length);
    // Auto-grow textarea
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ─── Send + stream ────────────────────────────────────────────────────────
  const handleSend = useCallback(
    async (overrideText) => {
      const text = (overrideText ?? input).trim();
      if (!text || isTyping) return;

      // Client-side early block
      if (clientBlockCheck(text)) {
        const blockMsgId = Date.now();
        setMessages((prev) => [
          ...prev,
          { role: "user", text, time: getTime() },
          {
            id: blockMsgId,
            role: "ai",
            text: "I'm designed exclusively to help you learn about Mehul's portfolio. I can't help with that request. Ask me about his projects, skills, or how to get in touch!",
            time: getTime(),
          },
        ]);
        return;
      }

      // Optimistically add user message
      const aiMsgId = Date.now();
      setMessages((prev) => [
        ...prev,
        { role: "user", text, time: getTime() },
        { id: aiMsgId, role: "ai", text: "", time: getTime() },
      ]);
      setInput("");
      setCharCount(0);
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      setIsTyping(true);

      // Abort any previous in-flight request
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const resp = await fetch(`${BASE_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: text,
            history: historyRef.current,
          }),
          signal: controller.signal,
        });

        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        }

        setIsTyping(false);
        setStreamingId(aiMsgId);

        // ─── Read SSE stream ──────────────────────────────────────────────
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop(); // keep incomplete line in buffer

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (raw === "[DONE]") break;
            try {
              const parsed = JSON.parse(raw);
              if (parsed.chunk) {
                fullText += parsed.chunk;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === aiMsgId ? { ...m, text: fullText } : m
                  )
                );
              } else if (parsed.error) {
                fullText = parsed.error;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === aiMsgId ? { ...m, text: fullText } : m
                  )
                );
              }
            } catch {
              // malformed SSE line — skip
            }
          }
        }

        // Save turn to history for context
        historyRef.current = [
          ...historyRef.current,
          { role: "user", content: text },
          { role: "assistant", content: fullText },
        ].slice(-20); // cap history at last 20 turns

      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Chat error:", err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId
              ? { ...m, text: "Something went wrong. Please try again." }
              : m
          )
        );
      } finally {
        setIsTyping(false);
        setStreamingId(null);
      }
    },
    [input, isTyping]
  );

  // ─── Clear chat ───────────────────────────────────────────────────────────
  const clearChat = () => {
    if (abortRef.current) abortRef.current.abort();
    historyRef.current = [];
    setStreamingId(null);
    setIsTyping(false);
    setMessages([
      {
        role: "ai",
        text: "Hi! I'm Mehul's Portfolio Assistant. What would you like to know?",
        time: getTime(),
        quickReplies: PROJECT_CHIPS,
      },
    ]);
  };

  // ─── Cleanup on unmount ───────────────────────────────────────────────────
  useEffect(() => {
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, []);

  // ─── Lenis scroll isolation ───────────────────────────────────────────────
  // When pointer is inside the chat panel, pause Lenis so the panel's own
  // overflow scroll works normally and the portfolio page does not scroll.
  const chatPanelRef = useRef(null);

  useEffect(() => {
    const el = chatPanelRef.current;
    if (!el) return;

    const pauseLenis = () => {
      if (window.lenis) window.lenis.stop();
    };
    const resumeLenis = () => {
      if (window.lenis) window.lenis.start();
    };

    el.addEventListener("mouseenter", pauseLenis);
    el.addEventListener("mouseleave", resumeLenis);

    return () => {
      el.removeEventListener("mouseenter", pauseLenis);
      el.removeEventListener("mouseleave", resumeLenis);
      // Always resume on unmount so we don't leave Lenis paused
      if (window.lenis) window.lenis.start();
    };
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Blink keyframe injected once */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* ── CHAT PANEL ── */}
      <div
        ref={chatPanelRef}
        className="fixed top-0 bottom-0 right-0 h-full w-[380px] max-w-full flex flex-col z-40 chatbot-panel print:hidden"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col h-full w-full max-w-full flex-shrink-0">
          <ChatHeader onClear={clearChat} onClose={() => setIsOpen(false)} />

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 scroll-bar w-full min-w-0">
            {/* Date divider */}
            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
              <span
                className="text-[10px] uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Today
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
            </div>

            {messages.map((msg, i) => (
              <ChatMessage
                key={msg.id ?? i}
                msg={msg}
                onSend={handleSend}
                isStreaming={msg.id === streamingId}
              />
            ))}

            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            textareaRef={textareaRef}
            input={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onSend={handleSend}
            isSendDisabled={!input.trim() || isTyping || streamingId !== null}
            charCount={charCount}
          />
        </div>
      </div>

      {/* ── FAB ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed z-50 flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-105 bottom-6 right-6 print:hidden ${
          isOpen ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
        }`}
        style={{
          background: "var(--accent-muted)",
          border: "1px solid var(--accent-border)",
          color: "var(--accent-light)",
          boxShadow: "0 0 24px var(--accent-glow-soft)",
          backdropFilter: "blur(14px)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "var(--accent)" }}
        />
        <IoChatbubblesOutline className="text-lg" />
        <span>Chat with AI</span>
      </button>
    </>
  );
};

export default AiChatBot;