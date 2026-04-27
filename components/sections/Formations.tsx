"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FORMATIONS } from "@/lib/constants";
import { useLang } from "@/lib/i18n/context";


const CHECK_ICON = (
  <svg className="w-3 h-3" fill="none" stroke="#00d4ff" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

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

          {/* LEFT: Crypto Experience Package — même style dark */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative bg-[#1a1a1a] rounded-3xl p-8 overflow-hidden h-full flex flex-col">
              <div
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,212,255,0.2), transparent)" }}
              />
              <div
                className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent)" }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Badges */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full text-[#00d4ff] border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)]">
                    {f.cryptoLabel}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.06)] px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)]">
                    {f.cryptoTag}
                  </span>
                </div>

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
                  >
                    ₿
                  </div>
                  <h3 className="font-heading font-black text-white text-xl leading-tight">
                    {f.cryptoTitle.split(" ").slice(0, -1).join(" ")}<br />{f.cryptoTitle.split(" ").slice(-1)}
                  </h3>
                </div>

                <p className="text-[rgba(255,255,255,0.5)] text-sm leading-relaxed mb-6">
                  {f.cryptoDesc}
                </p>

                {/* Topics */}
                <div className="space-y-2.5 mb-6 flex-1">
                  {f.cryptoTopics.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.28)" }}
                      >
                        {CHECK_ICON}
                      </div>
                      <span className="text-sm text-[rgba(255,255,255,0.72)]">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Disclaimer */}
                <p
                  className="text-[10px] leading-relaxed mb-5 px-3 py-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {f.cryptoDisclaimer}
                </p>

                {/* Price + CTA */}
                <div className="mt-auto">
                  <div className="mb-1">
                    <span className="text-5xl font-black text-white">{f.cryptoPrice}</span>
                    <span className="text-base text-[rgba(255,255,255,0.4)] ml-1.5">{f.cryptoPriceSub}</span>
                  </div>
                  <p className="text-[rgba(255,255,255,0.35)] text-sm mb-5">
                    {f.cryptoPriceDesc}
                  </p>
                  <a
                    href="https://t.me/haiticoin7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl"
                    style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
                  >
                    {f.cryptoCta}
                    {ARROW_ICON}
                  </a>
                  <p className="text-center text-[rgba(255,255,255,0.22)] text-[11px] mt-3">
                    {f.payNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Plan à Vie */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative bg-[#1a1a1a] rounded-3xl p-8 overflow-hidden h-full flex flex-col">
              <div
                className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,212,255,0.22), transparent)" }}
              />
              <div
                className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent)" }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full text-[#00d4ff] border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)]">
                    {f.planLabel}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.06)] px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)]">
                    {f.planTag}
                  </span>
                </div>

                <div className="mb-1">
                  <span className="text-5xl font-black text-white">$2000</span>
                </div>
                <p className="text-[rgba(255,255,255,0.35)] text-sm mb-7">
                  {f.planDesc}
                </p>

                <div className="space-y-3 mb-7 flex-1">
                  {f.planFeatures.map((feat) => (
                    <div key={feat} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.28)" }}
                      >
                        {CHECK_ICON}
                      </div>
                      <span className="text-sm text-[rgba(255,255,255,0.72)]">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <a
                    href="/formations"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl"
                    style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
                  >
                    {f.planCta}
                    {ARROW_ICON}
                  </a>
                  <p className="text-center text-[rgba(255,255,255,0.22)] text-[11px] mt-3">
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
