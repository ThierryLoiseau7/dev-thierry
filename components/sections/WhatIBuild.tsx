"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PILLARS = [
  {
    icon: "🌐",
    era: "Web",
    years: "2018 – 2021",
    headline: "I build websites & apps",
    plain:
      "The platforms you use every day — from blazing-fast online stores to powerful business software used by thousands. If it runs in a browser, I can build it.",
    tech: "React · Next.js · Node.js · PostgreSQL",
    color: "#39FF14",
    glow: "rgba(57,255,20,0.12)",
    border: "rgba(57,255,20,0.15)",
  },
  {
    icon: "⛓",
    era: "Blockchain",
    years: "2021 – 2024",
    headline: "I build on the blockchain",
    plain:
      "Financial tools without banks in the middle. Send money across the world instantly, trade digital assets, or prove you own something unique — I build the software behind all of that.",
    tech: "Solidity · Ethereum · DeFi · NFTs",
    color: "#FF007F",
    glow: "rgba(255,0,127,0.12)",
    border: "rgba(255,0,127,0.18)",
  },
  {
    icon: "🤖",
    era: "Artificial Intelligence",
    years: "2024 – Now",
    headline: "I build AI that thinks & acts",
    plain:
      "AI that doesn't just chat — it researches, codes, decides, and executes tasks on your behalf. Autonomous agents that work while you sleep.",
    tech: "Claude API · LLM Agents · AI Workflows",
    color: "#00D1FF",
    glow: "rgba(0,209,255,0.12)",
    border: "rgba(0,209,255,0.15)",
  },
];

export function WhatIBuild() {
  return (
    <section className="py-24 md:py-32 bg-[#0B0E14] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,0,127,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeading
          label="What I Do"
          title="Three Eras. One Vision."
          subtitle="Whether you're a developer or have never written a line of code — here's what I actually build, in plain English."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.era}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border p-8 flex flex-col gap-5 transition-all duration-500 cursor-default"
              style={{
                borderColor: p.border,
                backgroundColor: `${p.color}05`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${p.glow} 0%, transparent 70%)`,
                }}
              />

              {/* Top row */}
              <div className="flex items-center justify-between">
                <span className="text-5xl select-none">{p.icon}</span>
                <span
                  className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border"
                  style={{
                    color: p.color,
                    borderColor: p.border,
                    backgroundColor: `${p.color}0d`,
                  }}
                >
                  {p.years}
                </span>
              </div>

              {/* Label + Headline */}
              <div>
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-2"
                  style={{ color: p.color }}
                >
                  {p.era}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-[#FFFFFF] leading-tight">
                  {p.headline}
                </h3>
              </div>

              {/* Plain English */}
              <p className="text-[#8892a4] text-sm leading-relaxed flex-1">
                {p.plain}
              </p>

              {/* Tech hint */}
              <div
                className="pt-4 border-t"
                style={{ borderColor: `${p.color}12` }}
              >
                <p className="font-mono text-[11px] text-[#4a5568] tracking-wide">
                  {p.tech}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
