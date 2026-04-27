"use client";

import { motion } from "framer-motion";
import { FORMATIONS } from "@/lib/constants";

const CATEGORY_COUNTS = {
  ia: 0,
  webdev: 0,
  web3: 0,
};

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

const PASS_FEATURES = [
  "Toutes les formations incluses",
  "Sessions live coding mensuelles",
  "Discord + ressources telechargeable",
  "Nouvelles formations chaque mois",
  "Certificat de completion",
];

export function Formations() {
  const counts = FORMATIONS.reduce(
    (acc, f) => {
      if (f.category) acc[f.category] = (acc[f.category] ?? 0) + 1;
      return acc;
    },
    { ...CATEGORY_COUNTS }
  );

  const categories = [
    { label: "IA & Outils", count: counts.ia },
    { label: "Web Dev", count: counts.webdev },
    { label: "Web3", count: counts.web3 },
  ];

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
          Formations
        </motion.p>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: headline + category pills + stats */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="font-heading font-bold text-[#1a1a1a] tracking-tight mb-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
            >
              Apprends avec<br />Dev Thierry
            </h2>
            <p className="text-[#666666] text-base leading-relaxed mb-8 max-w-md">
              Des formations pratiques sur l&apos;IA, le Web Dev et le Web3.
              Un seul abonnement, un acces illimite, un prix fixe.
            </p>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="flex items-center gap-2 bg-white border border-[rgba(0,0,0,0.08)] rounded-full px-4 py-2 text-sm font-medium text-[#444444]"
                >
                  <span>{cat.label}</span>
                  <span className="text-xs font-bold text-[#888] bg-[#f0f0ec] rounded-full px-2 py-0.5">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 flex-wrap">
              <div>
                <p className="font-black text-2xl text-[#1a1a1a]">{FORMATIONS.length}+</p>
                <p className="text-xs text-[#888] uppercase tracking-wide">Formations</p>
              </div>
              <div className="h-8 w-px bg-[rgba(0,0,0,0.1)]" />
              <div>
                <p className="font-black text-2xl text-[#1a1a1a]">7</p>
                <p className="text-xs text-[#888] uppercase tracking-wide">Ans d&apos;exp.</p>
              </div>
              <div className="h-8 w-px bg-[rgba(0,0,0,0.1)]" />
              <div>
                <p className="font-black text-2xl" style={{ color: "#7c3aed" }}>100%</p>
                <p className="text-xs text-[#888] uppercase tracking-wide">Pratique</p>
              </div>
            </div>
          </motion.div>

          {/* Right: DEV PASS dark card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative bg-[#1a1a1a] rounded-3xl p-8 overflow-hidden">
              {/* Glow orbs */}
              <div
                className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,212,255,0.22), transparent)" }}
              />
              <div
                className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent)" }}
              />

              <div className="relative z-10">
                {/* Badges */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full text-[#00d4ff] border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)]">
                    DEV PASS
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.06)] px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)]">
                    Populaire
                  </span>
                </div>

                {/* Price */}
                <div className="mb-1">
                  <span className="text-5xl font-black text-white">$20</span>
                  <span className="text-[rgba(255,255,255,0.45)] text-lg ml-1">/mois</span>
                </div>
                <p className="text-[rgba(255,255,255,0.35)] text-sm mb-7">
                  Facture annuellement — $240/an
                </p>

                {/* Features list */}
                <div className="space-y-3 mb-7">
                  {PASS_FEATURES.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: "rgba(0,212,255,0.12)",
                          border: "1px solid rgba(0,212,255,0.28)",
                        }}
                      >
                        {CHECK_ICON}
                      </div>
                      <span className="text-sm text-[rgba(255,255,255,0.72)]">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="/formations"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl"
                  style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
                >
                  Voir toutes les formations
                  {ARROW_ICON}
                </a>

                <p className="text-center text-[rgba(255,255,255,0.22)] text-[11px] mt-3">
                  Paiement par contact direct — reponse en moins de 24h
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
