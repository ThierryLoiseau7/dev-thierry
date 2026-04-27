"use client";

import { motion } from "framer-motion";

export function QuoteSection() {
  return (
    <section
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "#1a1a1a" }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Quote mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading font-black leading-none select-none mb-[-1rem]"
          style={{
            fontSize: "clamp(5rem, 14vw, 9rem)",
            color: "rgba(245,245,240,0.06)",
            lineHeight: 1,
          }}
        >
          &ldquo;
        </motion.div>

        {/* Quote text */}
        <motion.blockquote
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-black tracking-tight leading-tight"
          style={{
            fontSize: "clamp(1.75rem, 4.5vw, 3.4rem)",
            color: "rgba(245,245,240,0.92)",
          }}
        >
          Le code que tu écriras demain
          <br />
          dépend de ce que tu comprends
          <br />
          <span style={{ color: "rgba(245,245,240,0.38)" }}>aujourd&apos;hui.</span>
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <div
            className="w-8 h-px mb-3"
            style={{ background: "rgba(245,245,240,0.2)" }}
          />
          <p
            className="text-[11px] font-bold tracking-[0.35em] uppercase"
            style={{ color: "rgba(245,245,240,0.3)" }}
          >
            Dev Thierry
          </p>
          <p
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(245,245,240,0.14)" }}
          >
            Full-Stack · Web3 · AI Agent Dev
          </p>
        </motion.div>

      </div>
    </section>
  );
}
