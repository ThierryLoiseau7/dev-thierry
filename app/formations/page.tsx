"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FORMATIONS, MEMBERSHIP_PLANS } from "@/lib/constants";

const TELEGRAM_URL = "https://t.me/haiticoin7";
const WHATSAPP_URL = "https://wa.me/33646899310";

const FAQ_DATA = [
  {
    q: "Comment souscrire au DEV PASS ?",
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
    q: "Y a-t-il une periode d'essai ?",
    a: "Le plan GRATUIT te donne acces a 3 formations d'introduction pour tester le contenu avant de souscrire au DEV PASS.",
  },
  {
    q: "Puis-je annuler mon abonnement ?",
    a: "L'abonnement est annuel. En cas de probleme, contacte-moi directement — je gere chaque situation personnellement.",
  },
];

type CategoryId = "tous" | "ia" | "webdev" | "web3";

const CATEGORY_TABS: { id: CategoryId; label: string; icon: string }[] = [
  { id: "tous", label: "Toutes", icon: "📚" },
  { id: "ia", label: "IA & Outils", icon: "🤖" },
  { id: "webdev", label: "Web Dev", icon: "⚡" },
  { id: "web3", label: "Web3", icon: "⛓️" },
];

const ACCENT_COLORS: Record<string, { from: string; to: string; glow: string }> = {
  "ai-website":       { from: "#6366f1", to: "#8b5cf6", glow: "rgba(99,102,241,0.12)" },
  "ai-design":        { from: "#ec4899", to: "#f43f5e", glow: "rgba(236,72,153,0.12)" },
  "ai-video":         { from: "#f59e0b", to: "#ef4444", glow: "rgba(245,158,11,0.12)" },
  "ai-telegram":      { from: "#0088cc", to: "#0ea5e9", glow: "rgba(0,136,204,0.12)" },
  "ai-emploi":        { from: "#10b981", to: "#059669", glow: "rgba(16,185,129,0.12)" },
  "webdev-nextjs":    { from: "#00d4ff", to: "#0077bb", glow: "rgba(0,212,255,0.12)" },
  "webdev-typescript":{ from: "#3b82f6", to: "#6366f1", glow: "rgba(59,130,246,0.12)" },
  "web3-solidity":    { from: "#7c3aed", to: "#4f46e5", glow: "rgba(124,58,237,0.12)" },
  "web3-dapp":        { from: "#06b6d4", to: "#0891b2", glow: "rgba(6,182,212,0.12)" },
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

const ARROW_SVG = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function FormationsPage() {
  const [activeTab, setActiveTab] = useState<CategoryId>("tous");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        {/* Background blobs */}
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

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-block text-[11px] font-black tracking-[0.28em] uppercase px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(0,212,255,0.08)",
              color: "#009ab8",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            DEV PASS · Programme de Formation
          </motion.span>

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
            className="text-[#666] text-lg max-w-xl mx-auto leading-relaxed mb-10"
          >
            Des formations pratiques sur l&apos;IA, le Web Dev et le Web3 — par un
            developpeur qui{" "}
            <strong className="text-[#1a1a1a] font-semibold">build vraiment</strong>.
            Un acces illimite pour{" "}
            <strong className="text-[#1a1a1a] font-semibold">$20/mois</strong>, facture
            annuellement.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex items-center justify-center gap-8 flex-wrap"
          >
            {[
              { value: `${FORMATIONS.length}+`, label: "Formations" },
              { value: "3", label: "Categories" },
              { value: "$20", label: "/mois · annuel" },
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
      </section>

      {/* ═══════════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#eaeae4]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#909090] mb-3">
              Tarifs
            </p>
            <h2
              className="font-heading font-bold text-[#1a1a1a] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
            >
              Un seul abonnement, un acces total
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 items-start">
            {MEMBERSHIP_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={plan.highlight ? "md:-mt-5" : ""}
              >
                <div
                  className="rounded-3xl p-7 flex flex-col relative overflow-hidden"
                  style={
                    plan.highlight
                      ? { background: "#1a1a1a", boxShadow: "0 20px 60px rgba(0,0,0,0.22)" }
                      : {
                          background: "white",
                          border: "1px solid rgba(0,0,0,0.07)",
                          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                        }
                  }
                >
                  {/* Glow for highlighted card */}
                  {plan.highlight && (
                    <>
                      <div
                        className="absolute -top-12 -right-12 w-52 h-52 rounded-full blur-3xl opacity-25 pointer-events-none"
                        style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }}
                      />
                      <div
                        className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full blur-3xl opacity-18 pointer-events-none"
                        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
                      />
                    </>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Plan header */}
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className={`text-[10px] font-black tracking-[0.2em] uppercase ${
                          plan.highlight ? "text-[#00d4ff]" : "text-[#888]"
                        }`}
                      >
                        {plan.name}
                      </span>
                      {plan.highlight && (
                        <span
                          className="text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(0,212,255,0.1)",
                            color: "#00c4ef",
                            border: "1px solid rgba(0,212,255,0.22)",
                          }}
                        >
                          Populaire
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-1">
                      {plan.priceMonthly === 0 ? (
                        <span
                          className={`text-4xl font-black ${
                            plan.highlight ? "text-white" : "text-[#1a1a1a]"
                          }`}
                        >
                          Gratuit
                        </span>
                      ) : (
                        <>
                          <span
                            className={`text-4xl font-black ${
                              plan.highlight ? "text-white" : "text-[#1a1a1a]"
                            }`}
                          >
                            ${plan.priceMonthly}
                          </span>
                          <span
                            className={`text-base ml-1 ${
                              plan.highlight ? "text-[rgba(255,255,255,0.4)]" : "text-[#aaa]"
                            }`}
                          >
                            /mois
                          </span>
                        </>
                      )}
                    </div>

                    <p
                      className={`text-xs mb-1 ${
                        plan.highlight ? "text-[rgba(255,255,255,0.35)]" : "text-[#aaa]"
                      }`}
                    >
                      {plan.billedAnnually
                        ? `Facture $${plan.billedAnnually}/an`
                        : "Sans engagement"}
                    </p>
                    <p
                      className={`text-sm mb-6 ${
                        plan.highlight ? "text-[rgba(255,255,255,0.55)]" : "text-[#666]"
                      }`}
                    >
                      {plan.tagline}
                    </p>

                    {/* Divider */}
                    <div
                      className={`h-px mb-5 ${
                        plan.highlight
                          ? "bg-[rgba(255,255,255,0.07)]"
                          : "bg-[rgba(0,0,0,0.06)]"
                      }`}
                    />

                    {/* Features */}
                    <ul className="space-y-2.5 mb-7 flex-1">
                      {plan.features.map((f) => (
                        <li key={f.text} className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                            style={
                              f.included
                                ? plan.highlight
                                  ? {
                                      background: "rgba(0,212,255,0.12)",
                                      border: "1px solid rgba(0,212,255,0.25)",
                                    }
                                  : {
                                      background: "rgba(26,26,26,0.07)",
                                      border: "1px solid rgba(26,26,26,0.12)",
                                    }
                                : { background: "transparent" }
                            }
                          >
                            {f.included ? (
                              <svg
                                className="w-2.5 h-2.5"
                                fill="none"
                                stroke={plan.highlight ? "#00d4ff" : "#1a1a1a"}
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-2.5 h-2.5"
                                fill="none"
                                stroke="#ccc"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`text-sm ${
                              f.included
                                ? plan.highlight
                                  ? "text-[rgba(255,255,255,0.78)]"
                                  : "text-[#444]"
                                : "text-[#bbb]"
                            }`}
                          >
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA button */}
                    {plan.id === "gratuit" ? (
                      <a
                        href="#catalog"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:border-[rgba(0,0,0,0.28)] hover:text-[#1a1a1a]"
                        style={{
                          border: "1px solid rgba(0,0,0,0.14)",
                          color: "#666",
                        }}
                      >
                        {plan.cta}
                      </a>
                    ) : plan.highlight ? (
                      <a
                        href={TELEGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                        style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
                      >
                        {plan.cta}
                        {ARROW_SVG}
                      </a>
                    ) : (
                      <a
                        href={TELEGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
                        style={{
                          background: "rgba(124,58,237,0.07)",
                          color: "#7c3aed",
                          border: "1px solid rgba(124,58,237,0.18)",
                        }}
                      >
                        {plan.cta}
                        {ARROW_SVG}
                      </a>
                    )}

                    {plan.id !== "gratuit" && (
                      <p
                        className={`text-center text-[10px] mt-3 ${
                          plan.highlight
                            ? "text-[rgba(255,255,255,0.25)]"
                            : "text-[#bbb]"
                        }`}
                      >
                        Paiement par contact direct · reponse &lt;24h
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Payment methods note */}
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
            <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#909090] mb-3">
              Catalogue
            </p>
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
              const count =
                tab.id === "tous"
                  ? FORMATIONS.length
                  : FORMATIONS.filter((f) => f.category === tab.id).length;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                  style={
                    isActive
                      ? { background: "#1a1a1a", color: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }
                      : {
                          background: "white",
                          color: "#555",
                          border: "1px solid rgba(0,0,0,0.08)",
                        }
                  }
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={
                      isActive
                        ? { background: "rgba(255,255,255,0.15)", color: "white" }
                        : { background: "#f0f0ec", color: "#888" }
                    }
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((formation, i) => {
                const accent =
                  ACCENT_COLORS[formation.id] ?? ACCENT_COLORS["ai-website"];
                return (
                  <motion.div
                    key={formation.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, delay: i * 0.04 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="bg-white rounded-3xl overflow-hidden h-full shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                      {/* Gradient top bar */}
                      <div
                        className="h-1 w-full"
                        style={{
                          background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                        }}
                      />

                      <div className="p-6 flex flex-col gap-4">
                        {/* Icon + badges */}
                        <div className="flex items-start justify-between">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}28)`,
                            }}
                          >
                            {formation.icon}
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            {formation.isNew && (
                              <span
                                className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full"
                                style={{
                                  background: "rgba(0,212,255,0.08)",
                                  color: "#0099bb",
                                  border: "1px solid rgba(0,212,255,0.18)",
                                }}
                              >
                                Nouveau
                              </span>
                            )}
                            <span
                              className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full"
                              style={{
                                background: "rgba(16,185,129,0.07)",
                                color: "#059669",
                                border: "1px solid rgba(16,185,129,0.16)",
                              }}
                            >
                              Inclus DEV PASS
                            </span>
                          </div>
                        </div>

                        {/* Title + description */}
                        <div className="flex-1">
                          <h3 className="font-bold text-[#1a1a1a] text-base mb-1.5 leading-snug">
                            {formation.title}
                          </h3>
                          <p className="text-[#777] text-sm leading-relaxed">
                            {formation.description}
                          </p>
                        </div>

                        {/* Meta: level + modules + duration */}
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1"
                            style={{ background: accent.glow, color: accent.from }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full inline-block"
                              style={{ background: accent.from }}
                            />
                            {formation.level}
                          </span>
                          {formation.modules && (
                            <span className="text-[11px] text-[#aaa] font-medium">
                              {formation.modules} modules
                            </span>
                          )}
                          {formation.duration && (
                            <span className="text-[11px] text-[#aaa] font-medium">
                              · {formation.duration}
                            </span>
                          )}
                        </div>

                        {/* Topics chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {formation.topics.map((topic) => (
                            <span
                              key={topic}
                              className="text-[11px] text-[#888] bg-[#f4f4f2] rounded-lg px-2 py-0.5 font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
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
            <p className="text-xs font-bold tracking-[0.28em] uppercase text-[#909090] mb-3">
              FAQ
            </p>
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
                    boxShadow:
                      openFaq === i ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-semibold text-[#1a1a1a] text-sm pr-4">
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-[#f4f4f2]"
                    >
                      <svg
                        className="w-3 h-3 text-[#555]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 5v14M5 12h14"
                        />
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
                        <p className="px-6 pb-5 text-sm text-[#666] leading-relaxed">
                          {item.a}
                        </p>
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
              {/* Blobs */}
              <div
                className="absolute -top-14 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-18 pointer-events-none"
                style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }}
              />
              <div
                className="absolute bottom-0 right-0 w-44 h-44 rounded-full blur-3xl opacity-14 pointer-events-none"
                style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
              />

              <div className="relative z-10">
                <div className="text-3xl mb-4">🚀</div>
                <h2 className="font-heading font-black text-white text-3xl tracking-tight mb-3">
                  Pret a commencer ?
                </h2>
                <p className="text-[rgba(255,255,255,0.5)] text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                  Contacte-moi sur Telegram ou WhatsApp. J&apos;active ton acces dans les
                  24h suivant le paiement.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
                  >
                    {TELEGRAM_SVG}
                    Telegram
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 hover:opacity-80"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {WHATSAPP_SVG}
                    WhatsApp
                  </a>
                </div>

                <p className="text-[rgba(255,255,255,0.22)] text-[11px] mt-5 tracking-wide">
                  Reponse garantie en moins de 24h · Activation immediate apres paiement
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-10">
            <a
              href="/"
              className="text-xs font-semibold tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-200 hover:text-[#1a1a1a]"
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                color: "#888",
              }}
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
