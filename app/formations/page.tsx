"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FORMATIONS, MEMBERSHIP_PLANS } from "@/lib/constants";

const TELEGRAM_URL = "https://t.me/haiticoin7";
const WHATSAPP_URL = "https://wa.me/33646899310";

const FAQ_DATA = [
  {
    q: "Comment obtenir le Plan a Vie ?",
    a: "Contacte-moi directement via Telegram ou WhatsApp. Je t'envoie les instructions de paiement et t'active l'acces dans les 24h suivant le paiement.",
  },
  {
    q: "Quels modes de paiement sont acceptes ?",
    a: "MonCash (Haiti), Zelle & Cash App (USA), Interac (Canada), Wise (international), PayPal, et USDT/USDC crypto.",
  },
  {
    q: "Les formations sont-elles en francais ?",
    a: "Oui, toutes les formations sont 100% en francais, avec des exemples adaptes a la diaspora haitienne et francophone.",
  },
  {
    q: "Puis-je acceder aux formations a mon rythme ?",
    a: "Oui, toutes les formations sont enregistrees et disponibles 24h/24. Tu avances a ton propre rythme, sans deadline.",
  },
  {
    q: "Le plan gratuit donne acces a quoi ?",
    a: "Le plan GRATUIT inclut un meeting 1h de presentation de la plateforme, l'acces au canal Telegram, et une consultation gratuite de 10 minutes maximum.",
  },
  {
    q: "Les futures formations sont-elles incluses ?",
    a: "Oui, le Plan a Vie inclut toutes les formations qui existent aujourd'hui ET toutes celles qui arriveront dans le futur — sans frais supplementaires.",
  },
];

type CategoryId = "tous" | "ia" | "webdev" | "web3";

const CATEGORY_TABS: { id: CategoryId; label: string; icon: string }[] = [
  { id: "tous", label: "Toutes", icon: "📚" },
  { id: "ia", label: "IA & Outils", icon: "🤖" },
  { id: "webdev", label: "Web Dev", icon: "⚡" },
  { id: "web3", label: "Web3", icon: "⛓️" },
];

const CATEGORY_LABELS: Record<string, string> = {
  ia: "IA & Outils",
  webdev: "Web Dev",
  web3: "Web3",
};

const ACCENT_COLORS: Record<string, { from: string; to: string; glow: string }> = {
  "ai-website":         { from: "#6366f1", to: "#8b5cf6", glow: "rgba(99,102,241,0.12)" },
  "ai-design":          { from: "#ec4899", to: "#f43f5e", glow: "rgba(236,72,153,0.12)" },
  "ai-video":           { from: "#f59e0b", to: "#ef4444", glow: "rgba(245,158,11,0.12)" },
  "ai-telegram":        { from: "#0088cc", to: "#0ea5e9", glow: "rgba(0,136,204,0.12)" },
  "ai-emploi":          { from: "#10b981", to: "#059669", glow: "rgba(16,185,129,0.12)" },
  "ai-automatisation":  { from: "#f59e0b", to: "#f97316", glow: "rgba(245,158,11,0.12)" },
  "ai-marketing":       { from: "#ec4899", to: "#a855f7", glow: "rgba(236,72,153,0.12)" },
  "ai-nodejs":          { from: "#22c55e", to: "#16a34a", glow: "rgba(34,197,94,0.12)" },
  "ai-smartcontrat":    { from: "#7c3aed", to: "#4f46e5", glow: "rgba(124,58,237,0.12)" },
  "crypto-experience":  { from: "#f59e0b", to: "#f97316", glow: "rgba(245,158,11,0.12)" },
};

const TELEGRAM_SVG = (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.617l-2.967-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942h-.557z" />
  </svg>
);

const WHATSAPP_SVG = (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function FormationsPage() {
  const [activeTab, setActiveTab] = useState<CategoryId>("tous");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filtered =
    activeTab === "tous"
      ? FORMATIONS
      : FORMATIONS.filter((f) => f.category === activeTab);

  return (
    <main className="min-h-screen bg-[#f5f5f0] overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-[120px] opacity-20"
            style={{ background: "radial-gradient(ellipse, #00d4ff, transparent 65%)" }}
          />
          <div
            className="absolute top-12 right-0 w-[350px] h-[350px] rounded-full blur-[100px] opacity-12"
            style={{ background: "radial-gradient(ellipse, #7c3aed, transparent 65%)" }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Texte */}
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="font-heading font-black text-[#1a1a1a] tracking-tight mb-5 leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
              >
                Apprends. Build.{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ship.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-[#666] text-lg leading-relaxed mb-10 max-w-xl lg:mx-0 mx-auto"
              >
                Des formations pratiques sur l&apos;IA, le Web Dev et le Web3 — par un
                developpeur qui{" "}
                <strong className="text-[#1a1a1a] font-semibold">build vraiment</strong>.
                Un acces illimite a vie pour{" "}
                <strong className="text-[#1a1a1a] font-semibold">$2000</strong> — paiement
                unique, formations actuelles et futures incluses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="flex items-center justify-center lg:justify-start gap-8 flex-wrap"
              >
                {[
                  { value: `${FORMATIONS.length}+`, label: "Formations" },
                  { value: "3", label: "Categories" },
                  { value: "$2000", label: "a vie · paiement unique" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-black text-2xl text-[#1a1a1a]">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-[#999] mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "clamp(220px, 28vw, 360px)",
                  height: "clamp(280px, 36vw, 460px)",
                  borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
                  overflow: "hidden",
                  border: "1px solid rgba(26,26,26,0.1)",
                  boxShadow: "0 20px 60px rgba(0,212,255,0.1), 0 8px 30px rgba(0,0,0,0.08)",
                }}
              >
                <Image
                  src="/thierry.jpg"
                  alt="Dev Thierry"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#eaeae4]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#909090] mb-3">Tarifs</p>
            <h2
              className="font-heading font-bold text-[#1a1a1a] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
            >
              Un seul paiement, un acces a vie
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 items-stretch">

            {/* Plan GRATUIT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="bg-white rounded-xl h-full flex flex-col overflow-hidden"
                style={{ border: "1px solid #e0e0da", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
              >
                <div className="h-1 bg-[#1a1a1a]" />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-[#666]">GRATUIT</span>
                  </div>
                  <h3 className="font-heading font-bold text-[#1a1a1a] text-lg mb-1">Decouvre la plateforme</h3>
                  <p className="text-[#888] text-sm mb-5">Sans engagement · acces immediat</p>
                  <div className="border-t border-[#ebebeb] mb-5" />
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {MEMBERSHIP_PLANS[0].features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2.5">
                        <svg
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: f.included ? "#16a34a" : "#d1d5db" }}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          {f.included
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          }
                        </svg>
                        <span className={`text-sm ${f.included ? "text-[#444]" : "text-[#bbb]"}`}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[#ebebeb] mb-5" />
                  <div className="mb-5">
                    <span className="text-3xl font-bold text-[#1a1a1a]">Gratuit</span>
                  </div>
                  <a
                    href="#catalog"
                    className="flex items-center justify-center w-full py-3.5 rounded-lg text-sm font-semibold text-[#444] transition-opacity duration-200 hover:opacity-75"
                    style={{ border: "1.5px solid #d0d0ca" }}
                  >
                    Commencer gratuitement
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Plan a Vie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div
                className="bg-white rounded-xl h-full flex flex-col overflow-hidden"
                style={{ border: "2px solid #7c3aed", boxShadow: "0 2px 20px rgba(124,58,237,0.12)" }}
              >
                <div className="bg-[#7c3aed] px-5 py-2.5 flex items-center justify-between rounded-t-[10px]">
                  <span className="text-white text-[11px] font-bold tracking-widest uppercase">PLAN A VIE</span>
                  <span className="text-[rgba(255,255,255,0.75)] text-[11px]">⭐ Meilleure valeur</span>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-[#7c3aed]">ACCES ILLIMITE</span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded text-white" style={{ background: "#e11d48" }}>
                      43% OFF
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-[#1a1a1a] text-lg mb-1">
                    Tout ce qui est la et tout ce qui arrive
                  </h3>
                  <p className="text-[#888] text-sm mb-5">Formations actuelles + futures · a vie</p>
                  <div className="border-t border-[#ebebeb] mb-5" />
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {MEMBERSHIP_PLANS[1].features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2.5">
                        <svg
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: "#7c3aed" }}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-[#444]">{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[#ebebeb] mb-5" />
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-bold text-[#1a1a1a]">$2,000</span>
                    <span className="text-base text-[#aaa] line-through">$3,500</span>
                  </div>
                  <p className="text-xs text-[#aaa] mb-5">Paiement unique · acces immediat apres confirmation</p>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
                    style={{ background: "#7c3aed" }}
                  >
                    Obtenir l&apos;acces a vie
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <p className="text-center text-[#bbb] text-[11px] mt-3">
                    Paiement par contact direct · reponse &lt;24h
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-[11px] text-[#aaa] mt-7 tracking-wide"
          >
            Modes de paiement · MonCash · Zelle · Cash App · Interac · Wise · PayPal · USDT/USDC
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          COURSE CATALOG
      ═══════════════════════════════════════════════════ */}
      <section id="catalog" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#909090] mb-3">Catalogue</p>
            <h2
              className="font-heading font-bold text-[#1a1a1a] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
            >
              Toutes les formations incluses
            </h2>
          </motion.div>

          {/* Category tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {CATEGORY_TABS.map((tab) => {
              const count = tab.id === "tous" ? FORMATIONS.length : FORMATIONS.filter((f) => f.category === tab.id).length;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                  style={
                    isActive
                      ? { background: "#1a1a1a", color: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }
                      : { background: "white", color: "#555", border: "1px solid rgba(0,0,0,0.08)" }
                  }
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={isActive ? { background: "rgba(255,255,255,0.15)", color: "white" } : { background: "#f0f0ec", color: "#888" }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── FORMATION CARDS GRID ── */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((formation, i) => {
                const accent = ACCENT_COLORS[formation.id] ?? ACCENT_COLORS["ai-website"];
                const catLabel = CATEGORY_LABELS[formation.category ?? "ia"] ?? "Formation";
                const isHovered = hoveredCard === formation.id;

                return (
                  <motion.div
                    key={formation.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ y: -10, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                    onHoverStart={() => setHoveredCard(formation.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="flex flex-col"
                  >
                    <div
                      className="relative bg-white rounded-3xl overflow-hidden flex flex-col h-full"
                      style={{
                        boxShadow: isHovered
                          ? `0 24px 60px rgba(0,0,0,0.13), 0 0 0 1.5px ${accent.from}50`
                          : "0 2px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)",
                        transition: "box-shadow 0.3s ease",
                      }}
                    >
                      {/* ── GRADIENT HEADER ── */}
                      <div
                        className="relative h-40 flex items-center justify-center overflow-hidden shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                        }}
                      >
                        {/* Dot grid pattern */}
                        <div
                          className="absolute inset-0 opacity-[0.07]"
                          style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
                            backgroundSize: "18px 18px",
                          }}
                        />
                        {/* Light orbs */}
                        <div
                          className="absolute inset-0 opacity-40 pointer-events-none"
                          style={{
                            backgroundImage: `radial-gradient(circle at 15% 80%, rgba(255,255,255,0.5) 0%, transparent 45%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.3) 0%, transparent 45%)`,
                          }}
                        />
                        {/* Hover darken overlay */}
                        <div
                          className="absolute inset-0 bg-black pointer-events-none"
                          style={{
                            opacity: isHovered ? 0.08 : 0,
                            transition: "opacity 0.3s ease",
                          }}
                        />

                        {/* Top badges row */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                          <span
                            className="text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                            style={{
                              background: "rgba(255,255,255,0.18)",
                              backdropFilter: "blur(8px)",
                              color: "rgba(255,255,255,0.92)",
                              border: "1px solid rgba(255,255,255,0.25)",
                            }}
                          >
                            {catLabel}
                          </span>
                          {formation.isNew && (
                            <motion.span
                              animate={{ opacity: [1, 0.55, 1] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              className="text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full"
                              style={{
                                background: "white",
                                color: accent.from,
                                boxShadow: `0 2px 12px ${accent.from}50`,
                              }}
                            >
                              Nouveau
                            </motion.span>
                          )}
                        </div>

                        {/* Central icon — bounces on hover */}
                        <motion.div
                          className="relative z-10 flex items-center justify-center text-3xl"
                          animate={isHovered ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          style={{
                            width: 68,
                            height: 68,
                            borderRadius: 20,
                            background: "rgba(255,255,255,0.2)",
                            backdropFilter: "blur(14px)",
                            WebkitBackdropFilter: "blur(14px)",
                            border: "1.5px solid rgba(255,255,255,0.38)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.4)",
                          }}
                        >
                          {formation.icon}
                        </motion.div>

                        {/* Bottom meta strip */}
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5 flex items-center gap-2.5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.32), transparent)" }}>
                          {/* Instructor avatar */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <div style={{ padding: 1.5, background: "rgba(255,255,255,0.35)", borderRadius: "50%", boxShadow: "0 1px 6px rgba(0,0,0,0.2)" }}>
                              <div className="w-5 h-5 rounded-full overflow-hidden">
                                <Image
                                  src="/thierry3.jpg"
                                  alt="Dev Thierry"
                                  width={20}
                                  height={20}
                                  className="object-cover object-top w-full h-full"
                                />
                              </div>
                            </div>
                            <span className="text-[9px] font-black tracking-wider text-white/80 uppercase">Dev Thierry</span>
                          </div>
                          {/* Divider */}
                          <div className="w-px h-3 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }} />
                          {formation.modules && (
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-white/75">
                              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              {formation.modules}
                            </span>
                          )}
                          {formation.duration && (
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-white/75">
                              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formation.duration}
                            </span>
                          )}
                          <span
                            className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                            style={{ background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)" }}
                          >
                            {formation.level}
                          </span>
                        </div>
                      </div>

                      {/* ── CARD BODY ── */}
                      <div className="p-5 flex flex-col gap-3 flex-1">

                        {/* DEV PASS badge */}
                        <span
                          className="self-start text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(16,185,129,0.08)",
                            color: "#059669",
                            border: "1px solid rgba(16,185,129,0.16)",
                          }}
                        >
                          Inclus Plan a Vie
                        </span>

                        {/* Title */}
                        <h3
                          className="font-bold text-base leading-snug"
                          style={{
                            color: isHovered ? accent.from : "#1a1a1a",
                            transition: "color 0.25s ease",
                          }}
                        >
                          {formation.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[#888] text-sm leading-relaxed flex-1" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {formation.description}
                        </p>

                        {/* Topics chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {formation.topics.map((topic) => (
                            <span
                              key={topic}
                              className="text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all duration-200"
                              style={{
                                background: isHovered ? `${accent.glow}` : "#f4f4f2",
                                color: isHovered ? accent.from : "#777",
                                transition: "background 0.25s ease, color 0.25s ease",
                              }}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-[rgba(0,0,0,0.05)]" />

                        {/* Footer CTA */}
                        <a
                          href={TELEGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between"
                        >
                          <span
                            className="text-xs font-semibold"
                            style={{
                              color: isHovered ? accent.from : "#aaa",
                              transition: "color 0.25s ease",
                            }}
                          >
                            Acceder a la formation
                          </span>

                          <motion.div
                            animate={isHovered ? { x: 3, scale: 1.08 } : { x: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="w-7 h-7 rounded-full flex items-center justify-center"
                            style={{
                              background: isHovered ? `linear-gradient(135deg, ${accent.from}, ${accent.to})` : "#f4f4f2",
                              transition: "background 0.25s ease",
                            }}
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke={isHovered ? "white" : "#aaa"}
                              viewBox="0 0 24 24"
                              style={{ transition: "stroke 0.25s ease" }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.div>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#eaeae4]">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#909090] mb-3">FAQ</p>
            <h2
              className="font-heading font-bold text-[#1a1a1a] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
            >
              Questions frequentes
            </h2>
          </motion.div>

          <div className="space-y-2">
            {FAQ_DATA.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  className="bg-white rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: openFaq === i ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-semibold text-[#1a1a1a] text-sm pr-4">{item.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-[#f4f4f2]"
                    >
                      <svg className="w-3 h-3 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                      </svg>
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="px-6 pb-5 text-sm text-[#666] leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-[#1a1a1a] rounded-3xl p-10 overflow-hidden">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-18 pointer-events-none" style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }} />
              <div className="absolute bottom-0 right-0 w-44 h-44 rounded-full blur-3xl opacity-14 pointer-events-none" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
              <div className="relative z-10">
                <div className="text-3xl mb-4">🚀</div>
                <h2 className="font-heading font-black text-white text-3xl tracking-tight mb-3">Pret a commencer ?</h2>
                <p className="text-[rgba(255,255,255,0.5)] text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                  Contacte-moi sur Telegram ou WhatsApp. J&apos;active ton acces dans les 24h suivant le paiement.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90" style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}>
                    {TELEGRAM_SVG} Telegram
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 hover:opacity-80" style={{ background: "rgba(255,255,255,0.07)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {WHATSAPP_SVG} WhatsApp
                  </a>
                </div>
                <p className="text-[rgba(255,255,255,0.22)] text-[11px] mt-5 tracking-wide">
                  Reponse garantie en moins de 24h · Activation immediate apres paiement
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-10">
            <a href="/" className="text-xs font-semibold tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-200 hover:text-[#1a1a1a]" style={{ border: "1px solid rgba(0,0,0,0.12)", color: "#888" }}>
              ← Retour au site
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
