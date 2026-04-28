"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useChat } from "@/hooks/useChat";

const MAX_QUESTIONS = 3;
const STORAGE_KEY = "agent_q_count";

export function AIAgent() {
  const { messages, input, setInput, isLoading, sendMessage } = useChat();
  const [questionCount, setQuestionCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [mounted, setMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMounted = useRef(false);

  // Read count from localStorage after mount
  useEffect(() => {
    setMounted(true);
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
    setQuestionCount(saved);
    if (saved >= MAX_QUESTIONS) setLimitReached(true);
  }, []);

  // Auto-scroll on new messages only — skip the first render
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (isLoading || !input.trim() || questionCount >= MAX_QUESTIONS) return;
    const newCount = questionCount + 1;
    setQuestionCount(newCount);
    localStorage.setItem(STORAGE_KEY, String(newCount));
    sendMessage();
    if (newCount >= MAX_QUESTIONS) setLimitReached(true);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const remaining = Math.max(0, MAX_QUESTIONS - questionCount);

  return (
    <section id="agent" className="py-24 md:py-32 bg-[#efefea]">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          label="AI Integration"
          title="Talk to My Agent"
          subtitle="Un vrai chatbot IA entraîné sur mon parcours, mon stack et mes projets. Pose-lui tes questions — il répond en direct."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden bg-white border border-[rgba(0,0,0,0.08)] shadow-sm"
        >
          {/* Terminal top bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#f5f5f0] border-b border-[rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: limitReached ? 1 : [1, 0.3, 1] }}
                transition={limitReached ? {} : { duration: 2.5, repeat: Infinity }}
                className={`w-2 h-2 rounded-full ${limitReached ? "bg-[#ef4444]" : "bg-[#28c840]"}`}
              />
              <span className="text-[11px] text-[#aaaaaa] tracking-wider">
                dev-thierry-agent —{" "}
                <span className={limitReached ? "text-[#ef4444]" : "text-[#28c840]"}>
                  {limitReached ? "offline" : "online"}
                </span>
              </span>
            </div>
            <span className="text-[10px] text-[#cccccc] tracking-widest uppercase select-none">v2.0</span>
          </div>

          {/* Messages area */}
          <div
            className="flex flex-col gap-4 px-5 py-6 overflow-y-auto"
            style={{ minHeight: "320px", maxHeight: "420px" }}
          >
            {mounted && messages.map((msg) => (
              <AnimatePresence key={msg.id}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* Avatar for assistant */}
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center shrink-0 mr-2.5 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                    </div>
                  )}

                  <div
                    className="max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? { background: "#1a1a1a", color: "#ffffff", borderBottomRightRadius: "6px" }
                        : { background: "#f5f5f0", color: "#333333", borderBottomLeftRadius: "6px" }
                    }
                  >
                    {msg.content || (
                      // Typing indicator
                      <span className="flex items-center gap-1 h-4">
                        {[0, 0.2, 0.4].map((delay, i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#aaaaaa] inline-block"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}

            {/* Limit reached message in chat */}
            {limitReached && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center shrink-0 mr-2.5 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
                <div
                  className="max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                  style={{ background: "#f5f5f0", color: "#333333", borderBottomLeftRadius: "6px" }}
                >
                  Tu as utilisé tes 3 questions gratuites. Pour continuer à discuter du projet,{" "}
                  <a href="#contact" className="text-[#1a1a1a] font-semibold underline underline-offset-2">
                    contacte-moi directement
                  </a>{" "}
                  — je réponds en moins de 24h.
                </div>
              </motion.div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-[rgba(0,0,0,0.06)] bg-[#f5f5f0]">
            {!limitReached ? (
              <div className="flex items-center gap-3 px-4 py-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 bg-white rounded-xl px-4 py-2.5 text-sm text-[#1a1a1a] placeholder-[#aaaaaa] outline-none border border-[rgba(0,0,0,0.08)] disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="w-9 h-9 rounded-xl bg-[#1a1a1a] flex items-center justify-center shrink-0 transition-opacity hover:opacity-75 disabled:opacity-30"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
                {/* Questions counter */}
                <span className="text-[10px] text-[#cccccc] shrink-0 tabular-nums">
                  {remaining}/{MAX_QUESTIONS}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between px-5 py-3">
                <span className="text-[11px] text-[#aaaaaa]">Session terminée</span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a1a1a] text-white text-xs font-semibold hover:bg-[#333333] transition-colors"
                >
                  Me contacter
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="px-5 py-2.5 bg-[#f5f5f0] border-t border-[rgba(0,0,0,0.04)] flex items-center justify-between">
            <span className="text-[10px] text-[#cccccc] tracking-widest uppercase">
              Powered by Claude API · Anthropic
            </span>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${limitReached ? "bg-[#ef4444]" : "bg-[#28c840]"} opacity-60`} />
              <span className="text-[10px] text-[#cccccc] tracking-widest uppercase">
                {limitReached ? "session closed" : "3 questions free"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
