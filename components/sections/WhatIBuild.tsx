"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLang } from "@/lib/i18n/context";

const SERVICE_META = [
  { icon: "🌐", years: "2018 – 2021", tech: "React · Next.js · Node.js · PostgreSQL", color: "#16a34a", bg: "rgba(22,163,74,0.05)", border: "rgba(22,163,74,0.14)" },
  { icon: "⛓", years: "2021 – 2024", tech: "Solidity · Ethereum · DeFi · NFTs", color: "#7c3aed", bg: "rgba(124,58,237,0.05)", border: "rgba(124,58,237,0.14)" },
  { icon: "🤖", years: "2024 – Now", tech: "Claude API · LLM Agents · AI Workflows", color: "#0284c7", bg: "rgba(2,132,199,0.05)", border: "rgba(2,132,199,0.14)" },
];

export function WhatIBuild() {
  const { t } = useLang();
  const services = t.services.items.map((item, i) => ({ ...item, ...SERVICE_META[i] }));

  return (
    <section id="services" className="py-24 md:py-32 bg-[#f5f5f0]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label={t.services.label}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.era}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border bg-white p-8 flex flex-col gap-5 transition-all duration-300 hover:shadow-card-hover cursor-default"
              style={{
                borderColor: s.border,
                backgroundColor: s.bg,
              }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <span className="text-4xl select-none">{s.icon}</span>
                <span
                  className="text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full border"
                  style={{ color: s.color, borderColor: s.border }}
                >
                  {s.years}
                </span>
              </div>

              {/* Label + Headline */}
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: s.color }}
                >
                  {s.era}
                </p>
                <h3 className="text-xl font-bold text-[#1a1a1a] leading-snug">
                  {s.headline}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[#666666] text-sm leading-relaxed flex-1 font-work">
                {s.plain}
              </p>

              {/* Tech stack */}
              <div className="pt-4 border-t border-[rgba(0,0,0,0.07)]">
                <p className="text-[11px] text-[#aaaaaa] tracking-wide font-medium">
                  {s.tech}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
