"use client";

import { motion } from "framer-motion";
import type { ChatMessage } from "@/lib/types";

interface ChatBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

export function ChatBubble({ message, isStreaming = false }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0891b2] to-[#0e7490] flex items-center justify-center text-[10px] font-mono font-bold text-white mr-3 mt-1 shrink-0">
          AI
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 font-sans text-sm leading-relaxed ${
          isUser
            ? "bg-[#0891b2]/10 border border-[#0891b2]/25 text-[#0f172a]"
            : "bg-[#f8fafc] border border-black/[0.07] text-[#475569]"
        }`}
      >
        {message.content}
        {isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-[#0891b2] ml-1 animate-pulse align-middle" />
        )}
        {!message.content && !isStreaming && (
          <span className="text-[#94a3b8] italic text-xs">thinking...</span>
        )}
      </div>
    </motion.div>
  );
}
