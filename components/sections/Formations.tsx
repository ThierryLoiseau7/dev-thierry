"use client";

import { motion } from "framer-motion";
import { FORMATIONS } from "@/lib/constants";

export function Formations() {
  return (
    <section id="formations" className="py-20 md:py-28 bg-[#eaeae4]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-[0.28em] text-[#909090] uppercase mb-3">
            Formations
          </p>
          <h2
            className="font-heading font-bold text-[#1a1a1a] tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Apprends l&apos;IA avec moi
          </h2>
          <p className="text-[#666666] text-base max-w-2xl mx-auto leading-relaxed">
            Des formations pratiques pour maitriser l&apos;intelligence artificielle dans ton domaine. Contacte-moi pour acceder et connaitre le tarif.
          </p>
        </motion.div>

        {/* Formation topics preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {FORMATIONS.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-2 bg-white border border-[rgba(0,0,0,0.08)] rounded-full px-4 py-2 text-sm font-medium text-[#444444]"
            >
              <span>{f.icon}</span>
              <span>{f.title}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center"
        >
          <a
            href="/formations"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#1a1a1a] text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-[#333333] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
          >
            Me Former
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
