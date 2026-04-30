"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FORMATIONS } from "@/lib/constants";
import { useLang } from "@/lib/i18n/context";


const ARROW_ICON = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);


export function Formations() {
  const { t } = useLang();
  const f = t.formations;


  return (
    <section id="formations" className="py-20 md:py-28 bg-[#eaeae4]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold tracking-[0.28em] text-[#909090] uppercase mb-10 text-center"
        >
          {f.label}
        </motion.p>

        {/* Top row: headline + instructor card */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2
              className="font-heading font-bold text-[#1a1a1a] tracking-tight leading-tight mb-3"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
            >
              {f.title.split("Dev Thierry")[0]}<br />Dev Thierry
            </h2>
            <div className="flex items-center gap-5 flex-wrap">
              <div>
                <p className="font-black text-xl text-[#1a1a1a]">{FORMATIONS.length}+</p>
                <p className="text-[10px] text-[#888] uppercase tracking-wide">{f.statsFormations}</p>
              </div>
              <div className="h-6 w-px bg-[rgba(0,0,0,0.1)]" />
              <div>
                <p className="font-black text-xl text-[#1a1a1a]">7</p>
                <p className="text-[10px] text-[#888] uppercase tracking-wide">{f.statsExp}</p>
              </div>
              <div className="h-6 w-px bg-[rgba(0,0,0,0.1)]" />
              <div>
                <p className="font-black text-xl" style={{ color: "#7c3aed" }}>100%</p>
                <p className="text-[10px] text-[#888] uppercase tracking-wide">{f.statsPractice}</p>
              </div>
            </div>
          </motion.div>

          {/* Instructor card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div
              className="inline-flex items-center gap-3.5 bg-white rounded-2xl px-4 py-3"
              style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
            >
              <div style={{ padding: 2.5, background: "linear-gradient(135deg, #00d4ff, #7c3aed)", borderRadius: "50%" }}>
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    src="/thierry3.jpg"
                    alt="Dev Thierry"
                    width={44}
                    height={44}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
              </div>
              <div>
                <p className="font-black text-[#1a1a1a] text-sm tracking-tight leading-none mb-0.5">Dev Thierry</p>
                <p className="text-[#999] text-[11px] font-medium tracking-wider">Pour vous servir ✦</p>
              </div>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
            </div>
          </motion.div>
        </div>

        {/* Two cards: Crypto Experience (left) + Plan à Vie (right) */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">

          {/* LEFT: Crypto Experience Package */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden h-full flex flex-col" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              {/* Accent strip */}
              <div className="h-1 bg-[#00d4ff]" />

              <div className="p-8 flex flex-col h-full">
                {/* Label + tag */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#00d4ff]">
                    {f.cryptoLabel}
                  </span>
                  <span className="text-[10px] font-medium tracking-widest uppercase text-[rgba(255,255,255,0.35)]">
                    {f.cryptoTag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-white text-xl leading-tight mb-2">
                  {f.cryptoTitle}
                </h3>
                <p className="text-[rgba(255,255,255,0.45)] text-sm leading-relaxed mb-6">
                  {f.cryptoDesc}
                </p>

                {/* Topics */}
                <div className="space-y-2.5 mb-6 flex-1">
                  {f.cryptoTopics.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#00d4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-[rgba(255,255,255,0.65)]">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] leading-relaxed mb-6 text-[rgba(255,255,255,0.3)]">
                  {f.cryptoDisclaimer}
                </p>

                {/* Divider */}
                <div className="border-t border-[rgba(255,255,255,0.08)] mb-6" />

                {/* Price + CTA */}
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-white">{f.cryptoPrice}</span>
                    <span className="text-sm text-[rgba(255,255,255,0.4)]">{f.cryptoPriceSub}</span>
                  </div>
                  <p className="text-[rgba(255,255,255,0.3)] text-xs mb-5">{f.cryptoPriceDesc}</p>
                  <a
                    href="https://t.me/haiticoin7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-semibold text-[#0f0f13] transition-opacity duration-200 hover:opacity-85"
                    style={{ background: "#00d4ff" }}
                  >
                    {f.cryptoCta}
                    {ARROW_ICON}
                  </a>
                  <p className="text-center text-[rgba(255,255,255,0.2)] text-[11px] mt-3">
                    {f.payNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Plan à Vie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden h-full flex flex-col" style={{ border: "1px solid rgba(124,58,237,0.5)" }}>
              {/* Accent strip */}
              <div className="h-1 bg-[#7c3aed]" />

              <div className="p-8 flex flex-col h-full">
                {/* Label + tag */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#7c3aed]">
                    {f.planLabel}
                  </span>
                  <span className="text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded bg-[#7c3aed] text-white">
                    {f.planTag}
                  </span>
                </div>

                {/* Title + desc */}
                <h3 className="font-heading font-bold text-white text-xl leading-tight mb-2">
                  Plan à Vie
                </h3>
                <p className="text-[rgba(255,255,255,0.45)] text-sm leading-relaxed mb-6">
                  {f.planDesc}
                </p>

                {/* Features */}
                <div className="space-y-2.5 mb-6 flex-1">
                  {f.planFeatures.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#7c3aed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-[rgba(255,255,255,0.65)]">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-[rgba(255,255,255,0.08)] mb-6" />

                {/* Price + CTA */}
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-4xl font-bold text-white">$2000</span>
                  </div>
                  <a
                    href="/formations"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
                    style={{ background: "#7c3aed" }}
                  >
                    {f.planCta}
                    {ARROW_ICON}
                  </a>
                  <p className="text-center text-[rgba(255,255,255,0.2)] text-[11px] mt-3">
                    {f.planPayNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
