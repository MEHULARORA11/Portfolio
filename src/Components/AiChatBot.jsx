import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiX, FiTrash2, FiPaperclip, FiMic } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";

// ─── quick-reply chips shown on the welcome message ───
const QUICK_REPLIES = [
  { label: "🚀 Projects",   text: "Tell me about Mehul's projects" },
  { label: "🛠 Skills",     text: "What are Mehul's skills?" },
  { label: "📬 Contact",    text: "How can I contact Mehul?" },
  { label: "💼 Hire him",   text: "Is Mehul available for work?" },
];

// ─── helper ───
const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ════════════════════════════════════════════════
const AiChatBot = ({ isOpen, setIsOpen }) => {
  const BASE_URL = import.meta.env.VITE_CLIENT_URL; // reuse your existing env var
  const [messages,  setMessages]  = useState([
    {
      role: "ai",
      text: "Hi there! I'm Mehul's AI assistant. Ask me anything about his skills, projects, or how to get in touch.",
      time: getTime(),
      quickReplies: QUICK_REPLIES,
    },
  ]);
  const [input,     setInput]     = useState("");
  const [isTyping,  setIsTyping]  = useState(false);
  const [charCount, setCharCount] = useState(0);

  const messagesEndRef = useRef(null);
  const textareaRef    = useRef(null);
  const MAX_CHARS = 500;

  // auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // handle input change without auto-resizing textarea to prevent expanding the chatbot
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val.length > MAX_CHARS) return;
    setInput(val);
    setCharCount(val.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ─── SEND LOGIC — replace the fetch block with your AI API call ───
  const handleSend = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || isTyping) return;

    // append user message
    setMessages((prev) => [
      ...prev,
      { role: "user", text, time: getTime() },
    ]);
    setInput("");
    setCharCount(0);
    setIsTyping(true);

    try {
      // ── REPLACE THIS BLOCK WITH YOUR AI CALL ──────────────────
      // const res  = await fetch(`${BASE_URL}/api/chat`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message: text }),
      // });
      // const data = await res.json();
      // const reply = data.reply;
      // ── END REPLACE ────────────────────────────────────────────

      // temporary mock so the UI works before you wire the backend
      await new Promise((r) => setTimeout(r, 1000 + Math.random() * 600));
      const reply = getMockReply(text);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: reply, time: getTime() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong. Please try again!",
          time: getTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () =>
    setMessages([
      {
        role: "ai",
        text: "Chat cleared! How can I help you?",
        time: getTime(),
      },
    ]);

  // ─── temporary mock replies (delete once backend is ready) ───
  const getMockReply = (text) => {
    const t = text.toLowerCase();
    if (t.includes("project"))
      return "Mehul's standout project is 1 Million Checkboxes — a real-time app scaled with Redis + WebSockets. He also published a custom CSS framework on npm!";
    if (t.includes("skill") || t.includes("stack") || t.includes("tech"))
      return "His core stack is React, Node.js, Express, MongoDB, Redis and WebSockets. He's strongest in backend architecture and performance optimization.";
    if (t.includes("contact") || t.includes("email"))
      return "You can reach Mehul at mehularora505@gmail.com or connect on LinkedIn and GitHub. He usually replies within 24 hours!";
    if (t.includes("hire") || t.includes("available") || t.includes("work"))
      return "Mehul is in his 1st year of B.Tech and open to freelance projects and internships. Feel free to reach out!";
    return "Great question! I'd recommend reaching out to Mehul directly via the Contact section below.";
  };

  // ════════════════════════════════════════════════
  return (
    <>
      {/* ── CHAT PANEL ── */}
      <div
        className="fixed top-0 bottom-0 right-0 h-full w-[360px] max-w-full flex flex-col z-40"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: isOpen ? "auto" : "none",
          background: "var(--card-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderLeft: "1px solid var(--card-border)",
          boxShadow: "-8px 0 40px var(--accent-glow-soft)",
        }}
      >
        {/* Inner contents wrapper */}
        <div className="flex flex-col h-full w-[360px] flex-shrink-0">
          {/* header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid var(--divider)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl text-xl"
                style={{
                  background: "var(--accent-muted)",
                  border: "1px solid var(--accent-border)",
                  color: "var(--accent-light)",
                }}
              >
                <RiRobot2Line />
              </div>
              <div>
                <p className="font-bold text-sm theme-text leading-tight">Mehul's AI</p>
                <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--accent-light)" }}>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: "var(--accent)" }}
                  />
                  Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* clear */}
              <button
                onClick={clearChat}
                title="Clear chat"
                className="flex items-center justify-center w-8 h-8 rounded-xl theme-icon-btn transition-all duration-200"
              >
                <FiTrash2 className="text-sm" />
              </button>
              {/* close */}
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="flex items-center justify-center w-8 h-8 rounded-xl theme-icon-btn transition-all duration-200"
              >
                <FiX className="text-sm" />
              </button>
            </div>
          </div>

          {/* messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 scroll-bar"
            style={{ minWidth: "320px" }}
          >
            {/* date divider */}
            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Today
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 max-w-[88%] ${
                  msg.role === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <span
                  className="text-[10px] uppercase tracking-wide px-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {msg.role === "user" ? "You" : "AI"}
                </span>

                <div
                  className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    msg.role === "user"
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
                  {msg.text}
                </div>

                <span
                  className="text-[10px] px-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {msg.time}
                </span>

                {/* quick reply chips */}
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.quickReplies.map((qr, qi) => (
                      <button
                        key={qi}
                        onClick={() => handleSend(qr.text)}
                        className="text-[11px] px-3 py-1.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          background: "transparent",
                          border: "1px solid var(--accent-border)",
                          color: "var(--accent-light)",
                        }}
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* typing indicator */}
            {isTyping && (
              <div className="self-start flex flex-col gap-1 items-start">
                <span className="text-[10px] uppercase tracking-wide px-1" style={{ color: "var(--text-muted)" }}>
                  AI
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
                        background: "var(--text-muted)",
                        animationDelay: `${i * 0.18}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* input area */}
          <div
            className="flex flex-col gap-2 px-4 py-3 flex-shrink-0"
            style={{ borderTop: "1px solid var(--divider)", minWidth: "320px" }}
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Mehul..."
                rows={1}
                className="flex-1 resize-none rounded-xl px-3 py-2.5 text-sm leading-relaxed theme-input focus:outline-none scroll-hide"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: "var(--accent)",
                  color: "var(--button-text)",
                  boxShadow: "var(--button-shadow)",
                }}
              >
                <FiSend className="text-sm" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <button
                  title="Attach file"
                  className="flex items-center justify-center w-7 h-7 rounded-lg theme-icon-btn transition-all duration-200"
                >
                  <FiPaperclip className="text-xs" />
                </button>
                <button
                  title="Voice message"
                  className="flex items-center justify-center w-7 h-7 rounded-lg theme-icon-btn transition-all duration-200"
                >
                  <FiMic className="text-xs" />
                </button>
              </div>
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                {charCount} / {MAX_CHARS}
              </span>
            </div>
          </div>
        </div>
      </div>

  {/* ── FAB — bottom-right when closed, fades/scales away when open ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed z-50 flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-105 bottom-6 right-6 ${
          isOpen ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
        }`}
        style={{
          background: "var(--accent-muted)",
          border: "1px solid var(--accent-border)",
          color: "var(--accent-light)",
          boxShadow: "0 0 20px var(--accent-glow-soft)",
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