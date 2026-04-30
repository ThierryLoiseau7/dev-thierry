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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="bg-white rounded-xl h-full flex flex-col"
              style={{ border: "1px solid #e0e0da", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-5 border-b border-[#ebebeb]">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#666]">
                    {f.cryptoLabel}
                  </span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded text-white shrink-0"
                    style={{ background: "#e11d48" }}
                  >
                    38% OFF
                  </span>
                </div>
                <h3 className="font-heading font-bold text-[#1a1a1a] text-lg leading-snug mb-1">
                  {f.cryptoTitle}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">{f.cryptoDesc}</p>
              </div>

              {/* Features */}
              <div className="px-6 py-5 flex-1">
                <div className="space-y-3">
                  {f.cryptoTopics.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#16a34a" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-[#444]">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#aaa] leading-relaxed mt-5">{f.cryptoDisclaimer}</p>
              </div>

              {/* Price + CTA */}
              <div className="px-6 pb-6 border-t border-[#ebebeb] pt-5">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-bold text-[#1a1a1a]">{f.cryptoPrice}</span>
                  <span className="text-base text-[#aaa] line-through">$8,000</span>
                </div>
                <p className="text-xs text-[#aaa] mb-4">{f.cryptoPriceDesc}</p>
                <a
                  href="https://t.me/haiticoin7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
                  style={{ background: "#1a1a1a" }}
                >
                  {f.cryptoCta}
                  {ARROW_ICON}
                </a>
                <p className="text-center text-[#bbb] text-[11px] mt-3">{f.payNote}</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Plan à Vie */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div
              className="bg-white rounded-xl h-full flex flex-col"
              style={{ border: "2px solid #7c3aed", boxShadow: "0 2px 20px rgba(124,58,237,0.12)" }}
            >
              {/* Popular badge */}
              <div className="bg-[#7c3aed] px-6 py-2.5 flex items-center justify-between rounded-t-[10px]">
                <span className="text-white text-[11px] font-bold tracking-widest uppercase">{f.planTag}</span>
                <span className="text-[rgba(255,255,255,0.7)] text-[11px]">⭐ {f.planLabel}</span>
              </div>

              {/* Card header */}
              <div className="px-6 pt-5 pb-5 border-b border-[#ebebeb]">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#666]">
                    Plan à Vie
                  </span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded text-white shrink-0"
                    style={{ background: "#e11d48" }}
                  >
                    43% OFF
                  </span>
                </div>
                <h3 className="font-heading font-bold text-[#1a1a1a] text-lg leading-snug mb-1">
                  Plan à Vie
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">{f.planDesc}</p>
              </div>

              {/* Features */}
              <div className="px-6 py-5 flex-1">
                <div className="space-y-3">
                  {f.planFeatures.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#16a34a" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-[#444]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price + CTA */}
              <div className="px-6 pb-6 border-t border-[#ebebeb] pt-5">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-bold text-[#1a1a1a]">$2,000</span>
                  <span className="text-base text-[#aaa] line-through">$3,500</span>
                </div>
                <p className="text-xs text-[#aaa] mb-4">{f.cryptoPriceDesc}</p>
                <a
                  href="/formations"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
                  style={{ background: "#7c3aed" }}
                >
                  {f.planCta}
                  {ARROW_ICON}
                </a>
                <p className="text-center text-[#bbb] text-[11px] mt-3">{f.planPayNote}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
