"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const AGENT_ONLINE = false;

export function AIAgent() {
  if (AGENT_ONLINE) return null;

  return (
    <section id="agent" className="py-24 md:py-32 bg-[#efefea]">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          label="AI Integration"
          title="Talk to My Agent"
          subtitle="An AI trained on my work, stack, and thinking — temporarily offline."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden bg-white border border-[rgba(0,0,0,0.08)] shadow-soft"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#f5f5f0] border-b border-[rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[rgba(0,0,0,0.1)]" />
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-[#ef4444]"
              />
              <span className="text-[11px] text-[#aaaaaa] tracking-wider">
                dev-thierry-agent — <span className="text-[#ef4444]">offline</span>
              </span>
            </div>
            <div className="text-[10px] text-[#cccccc] tracking-widest uppercase select-none">
              v2.0
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-12 flex flex-col items-center text-center gap-8">
            {/* Icon */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center border border-[rgba(124,58,237,0.15)] bg-[rgba(124,58,237,0.05)]"
              >
                <svg className="w-9 h-9 text-[#7c3aed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <motion.div
                animate={{ opacity: [0, 1, 0], y: [0, -10, -18], scale: [0.8, 1, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", repeatDelay: 0.8 }}
                className="absolute -top-2 -right-3 text-xs text-[#7c3aed] font-bold select-none"
              >
                z
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 1, 0], y: [0, -14, -24], scale: [0.6, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.5, repeatDelay: 0.8 }}
                className="absolute -top-5 right-0 text-sm text-[#7c3aed] font-bold select-none"
              >
                Z
              </motion.div>
            </motion.div>

            {/* Message */}
            <div className="max-w-md flex flex-col gap-3">
              <h3 className="font-heading text-xl font-bold text-[#1a1a1a]">
                Agent temporairement hors ligne
              </h3>
              <p className="text-[#666666] text-sm leading-relaxed font-work">
                Mon assistant IA est en maintenance. Vous pouvez me contacter directement —
                je réponds généralement sous{" "}
                <span className="text-[#0284c7] font-semibold">24 h</span>.
              </p>
            </div>

            {/* Auto message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-md rounded-xl px-5 py-4 text-left bg-[#f5f5f0] border border-[rgba(0,0,0,0.08)]"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-[#aaaaaa] tracking-wider uppercase font-semibold">
                      Message automatique
                    </span>
                    <span className="text-[9px] text-[#cccccc] tracking-wider">• maintenant</span>
                  </div>
                  <p className="text-[13px] text-[#666666] leading-relaxed font-work">
                    Bonjour ! Mon agent est indisponible pour le moment. Pour discuter d&apos;un projet
                    ou d&apos;une collaboration, utilisez le formulaire de contact ci-dessous.
                    Je vous répondrai dans les plus brefs délais.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#1a1a1a] text-white text-sm font-medium transition-colors hover:bg-[#333333]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Me contacter directement
            </motion.a>
          </div>

          {/* Bottom bar */}
          <div className="px-5 py-3 bg-[#f5f5f0] border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
            <span className="text-[10px] text-[#cccccc] tracking-widest uppercase">
              Powered by Claude API · Anthropic
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] opacity-60" />
              <span className="text-[10px] text-[#cccccc] tracking-widest uppercase">
                Back soon
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
