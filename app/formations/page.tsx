"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FORMATIONS } from "@/lib/constants";

const TELEGRAM_URL = "https://t.me/haiticoin7";
const WHATSAPP_URL = "https://wa.me/33646899310";

const accentColors: Record<string, { from: string; to: string; glow: string }> = {
  "ai-website":  { from: "#6366f1", to: "#8b5cf6", glow: "rgba(99,102,241,0.18)" },
  "ai-design":   { from: "#ec4899", to: "#f43f5e", glow: "rgba(236,72,153,0.18)" },
  "ai-video":    { from: "#f59e0b", to: "#ef4444", glow: "rgba(245,158,11,0.18)" },
  "ai-telegram": { from: "#0088cc", to: "#0ea5e9", glow: "rgba(0,136,204,0.18)" },
  "ai-emploi":   { from: "#10b981", to: "#059669", glow: "rgba(16,185,129,0.18)" },
};

export default function FormationsPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f0] overflow-x-hidden">
      <Navbar />

      <section className="pt-36 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase px-4 py-1.5 rounded-full bg-[rgba(124,58,237,0.08)] text-[#7c3aed] border border-[rgba(124,58,237,0.15)] mb-5">
              Formations IA
            </span>
            <h1
              className="font-heading font-bold text-[#1a1a1a] tracking-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Apprends l&apos;IA avec moi
            </h1>
            <p className="text-[#777777] text-base max-w-xl mx-auto leading-relaxed">
              Des formations 100% pratiques pour utiliser l&apos;IA au quotidien. Contacte-moi pour connaitre le tarif et commencer.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FORMATIONS.map((formation, i) => {
              const accent = accentColors[formation.id] ?? accentColors["ai-website"];
              return (
                <motion.div
                  key={formation.id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="h-full"
                >
                  <div className="group relative bg-white rounded-3xl overflow-hidden flex flex-col h-full shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300">

                    {/* Gradient top band */}
                    <div
                      className="h-1.5 w-full"
                      style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
                    />

                    <div className="p-7 flex flex-col gap-5 flex-1">

                      {/* Icon + badge */}
                      <div className="flex items-start justify-between">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
                          style={{ background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}28)` }}
                        >
                          {formation.icon}
                        </div>
                        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-[#d97706] bg-[rgba(217,119,6,0.08)] border border-[rgba(217,119,6,0.18)]">
                          Payant
                        </span>
                      </div>

                      {/* Title + desc */}
                      <div className="flex-1">
                        <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 leading-snug">
                          {formation.title}
                        </h2>
                        <p className="text-[#777777] text-sm leading-relaxed">
                          {formation.description}
                        </p>
                      </div>

                      {/* Level badge */}
                      <div
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full self-start"
                        style={{ background: `${accent.glow}`, color: accent.from }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: accent.from }} />
                        {formation.level}
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2">
                        {formation.topics.map((topic) => (
                          <span
                            key={topic}
                            className="text-[11px] text-[#888888] bg-[#f4f4f2] rounded-lg px-2.5 py-1 font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-[rgba(0,0,0,0.06)]" />

                      {/* CTA buttons */}
                      <div className="flex gap-2">
                        <a
                          href={TELEGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-[#0088cc] text-white hover:bg-[#0077bb] hover:shadow-[0_4px_16px_rgba(0,136,204,0.3)]"
                        >
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.617l-2.967-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942h-.557z"/>
                          </svg>
                          Telegram
                        </a>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-[#25d366] text-white hover:bg-[#1eb859] hover:shadow-[0_4px_16px_rgba(37,211,102,0.3)]"
                        >
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          WhatsApp
                        </a>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Back */}
          <div className="flex justify-center mt-16">
            <a
              href="/"
              className="text-xs font-semibold tracking-widest uppercase px-6 py-2.5 rounded-full border border-[rgba(0,0,0,0.15)] text-[#888888] hover:border-[rgba(0,0,0,0.3)] hover:text-[#1a1a1a] transition-all duration-200"
            >
              ← Retour au site
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
