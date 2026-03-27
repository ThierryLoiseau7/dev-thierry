"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { useChat } from "@/hooks/useChat";

export function AIAgent() {
  const { messages, input, setInput, isLoading, error, sendMessage, clearHistory } =
    useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="agent" className="py-24 md:py-32 bg-[#0B0E14]">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          label="AI Integration"
          title="Talk to My Agent"
          subtitle="Ask anything about my skills, projects, or how I can help. Powered by Claude."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0F1219] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(57,255,20,0.06)]"
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#131820] border-b border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
              <span className="font-mono text-[11px] text-[#8892a4]">
                dev-thierry-agent
              </span>
            </div>
            <button
              onClick={clearHistory}
              className="font-mono text-[10px] text-[#4a5568] hover:text-[#8892a4] tracking-widest uppercase transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto px-5 py-5 scroll-smooth"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(57,255,20,0.15) transparent" }}
          >
            {messages.map((msg, i) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                isStreaming={isLoading && i === messages.length - 1 && msg.role === "assistant"}
              />
            ))}
            {error && (
              <div className="text-center font-mono text-xs text-red-400 py-2">
                Error: {error}
              </div>
            )}
          </div>

          {/* Suggested prompts */}
          <div className="px-5 py-3 border-t border-[rgba(255,255,255,0.05)] flex gap-2 overflow-x-auto">
            {[
              "What's your Web3 experience?",
              "Tell me about your AI projects",
              "Are you available for hire?",
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInput(prompt)}
                className="shrink-0 font-mono text-[11px] text-[#8892a4] border border-[rgba(255,255,255,0.07)] rounded-lg px-3 py-1.5 hover:border-[rgba(57,255,20,0.3)] hover:text-[#39FF14] transition-all duration-200 whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-[rgba(255,255,255,0.05)] flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              disabled={isLoading}
              className="flex-1 bg-[#131820] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 font-sans text-sm text-[#FFFFFF] placeholder-[#4a5568] resize-none focus:outline-none focus:border-[rgba(57,255,20,0.3)] transition-colors duration-200 disabled:opacity-50"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#39FF14] to-[#FF007F] flex items-center justify-center hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 text-[#0B0E14] translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-mono text-[11px] text-[#4a5568] mt-4"
        >
          Powered by Claude API · Anthropic
        </motion.p>
      </div>
    </section>
  );
}
