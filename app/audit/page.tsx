"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  match: "high" | "medium" | "low" | "none";
  reason: string;
}

interface AnalysisResult {
  projectType: string;
  complexity: "Simple" | "Medium" | "Complex";
  summary: string;
  techStack: string[];
  challenges: string[];
  services: Service[];
  timeline: string;
  budget: string;
  verdict: string;
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  webdev: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  ai: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
    </svg>
  ),
  blockchain: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  bot: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
};

const MATCH_CONFIG = {
  high:   { label: "Essentiel",    bg: "#dcfce7", text: "#16a34a", dot: "#16a34a" },
  medium: { label: "Recommandé",   bg: "#fef9c3", text: "#ca8a04", dot: "#ca8a04" },
  low:    { label: "Optionnel",    bg: "#f1f5f9", text: "#64748b", dot: "#94a3b8" },
  none:   { label: "Non requis",   bg: "#f8f8f8", text: "#bbbbbb", dot: "#dddddd" },
};

const COMPLEXITY_CONFIG = {
  Simple:  { bg: "#dcfce7", text: "#16a34a" },
  Medium:  { bg: "#fef9c3", text: "#ca8a04" },
  Complex: { bg: "#fee2e2", text: "#dc2626" },
};

function AnalysisBoard({ result }: { result: AnalysisResult }) {
  const visibleServices = result.services?.filter((s) => s.match !== "none") ?? [];
  const complexity = COMPLEXITY_CONFIG[result.complexity] ?? COMPLEXITY_CONFIG.Medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      {/* Project type + complexity + summary */}
      <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid rgba(26,26,26,0.1)" }}>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-[#1a1a1a] text-white">
            {result.projectType}
          </span>
          <span
            className="text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: complexity.bg, color: complexity.text }}
          >
            {result.complexity}
          </span>
        </div>
        <p className="text-sm text-[#444] leading-relaxed">{result.summary}</p>
      </div>

      {/* Tech stack */}
      {result.techStack?.length > 0 && (
        <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid rgba(26,26,26,0.1)" }}>
          <p className="text-[9px] font-black tracking-[0.25em] uppercase text-[#999] mb-3">Stack recommandée</p>
          <div className="flex flex-wrap gap-2">
            {result.techStack.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl"
                style={{ background: "rgba(26,26,26,0.06)", color: "#1a1a1a" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Services match */}
      {visibleServices.length > 0 && (
        <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid rgba(26,26,26,0.1)" }}>
          <p className="text-[9px] font-black tracking-[0.25em] uppercase text-[#999] mb-4">
            Ce dont tu as besoin
          </p>
          <div className="space-y-3">
            {visibleServices.map((service) => {
              const m = MATCH_CONFIG[service.match];
              return (
                <div
                  key={service.id}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(26,26,26,0.025)", border: "1px solid rgba(26,26,26,0.07)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(26,26,26,0.08)" }}
                  >
                    <span className="text-[#1a1a1a]">{SERVICE_ICONS[service.id]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-[#1a1a1a]">{service.name}</p>
                      <span
                        className="text-[9px] font-black tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
                        style={{ background: m.bg, color: m.text }}
                      >
                        {m.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#777] leading-relaxed">{service.reason}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Challenges */}
      {result.challenges?.length > 0 && (
        <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid rgba(26,26,26,0.1)" }}>
          <p className="text-[9px] font-black tracking-[0.25em] uppercase text-[#999] mb-3">Points critiques</p>
          <ul className="space-y-2">
            {result.challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#555] leading-relaxed">
                <span className="text-[#e4a400] mt-0.5 shrink-0">▲</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Timeline + Budget */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid rgba(26,26,26,0.1)" }}>
          <p className="text-[9px] font-black tracking-[0.25em] uppercase text-[#999] mb-1.5">Timeline</p>
          <p className="text-lg font-black text-[#1a1a1a]">{result.timeline}</p>
        </div>
        <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid rgba(26,26,26,0.1)" }}>
          <p className="text-[9px] font-black tracking-[0.25em] uppercase text-[#999] mb-1.5">Budget estimé</p>
          <p className="text-lg font-black text-[#1a1a1a]">{result.budget}</p>
        </div>
      </div>

      {/* Verdict */}
      {result.verdict && (
        <div
          className="rounded-2xl p-5"
          style={{ background: "#1a1a1a" }}
        >
          <p className="text-[9px] font-black tracking-[0.25em] uppercase text-white/40 mb-2">Verdict</p>
          <p className="text-sm font-semibold text-white leading-relaxed">{result.verdict}</p>
        </div>
      )}

      {/* CTA */}
      <Link
        href="/#contact"
        className="flex items-center justify-between w-full p-5 rounded-2xl transition-all duration-200 group"
        style={{ background: "#00d4ff" }}
      >
        <div>
          <p className="font-black text-[#0a0a0a] text-base">Travaillons ensemble</p>
          <p className="text-[12px] text-[#0a0a0a]/70 mt-0.5">Dev Thierry peut gérer ce projet de A à Z</p>
        </div>
        <svg className="w-5 h-5 text-[#0a0a0a] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </motion.div>
  );
}

export default function ProjectAnalysisPage() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const analyze = async () => {
    if (loading) return;
    setResult(null);
    setError("");
    setLoading(true);
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
        signal: abortRef.current.signal,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Service unavailable. Please try again.");
        return;
      }

      setResult(data as AnalysisResult);
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError("Une erreur est survenue. Réessaie.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0]">

      {/* Navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div
          className="w-full max-w-5xl flex items-center justify-between px-5 py-3 rounded-2xl"
          style={{
            background: "rgba(205,205,205,0.65)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#1a1a1a] transition-opacity group-hover:opacity-75">
              <span className="font-heading font-black text-sm tracking-tight text-white">DT</span>
            </div>
            <div className="leading-none">
              <p className="font-heading font-bold text-[11px] tracking-[0.14em] uppercase text-[#1a1a1a]">Dev</p>
              <p className="font-heading font-bold text-[11px] tracking-[0.14em] uppercase text-[#1a1a1a]">Thierry</p>
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-[#555555] hover:text-[#1a1a1a] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Portfolio
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#888888] mb-3">
            Outil gratuit — par Dev Thierry
          </p>
          <h1
            className="font-heading font-black text-[#1a1a1a] leading-[1.02] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
          >
            Analyse ton
            <br />
            <span className="text-[#888888]">Projet</span>
          </h1>
          <p className="text-sm text-[#888888] max-w-lg">
            Décris ton idée en quelques lignes. L&apos;IA analyse ton projet, identifie les besoins techniques
            et te dit exactement comment Dev Thierry peut t&apos;aider.
            Propulsé par <strong className="text-[#1a1a1a]">Claude API · Anthropic</strong>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Left — input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 lg:sticky lg:top-28"
          >
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(26,26,26,0.12)" }}>
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[11px] font-mono text-white/30 tracking-wider">mon-projet.txt</span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                spellCheck={false}
                placeholder={`Décris ton projet ici...\n\nEx: Je veux créer une plateforme où les artistes haïtiens peuvent vendre leurs œuvres en NFT. Les acheteurs paient en crypto ou carte bancaire. Je veux aussi un système de royalties automatique et un dashboard pour les artistes.`}
                className="w-full text-sm leading-relaxed resize-none outline-none p-5"
                style={{
                  background: "#ffffff",
                  color: "#1a1a1a",
                  minHeight: "300px",
                  caretColor: "#1a1a1a",
                }}
              />
            </div>

            <button
              onClick={analyze}
              disabled={loading || !description.trim()}
              className="w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: loading || !description.trim() ? "rgba(26,26,26,0.15)" : "#1a1a1a",
                color: loading || !description.trim() ? "rgba(26,26,26,0.35)" : "#ffffff",
                cursor: loading || !description.trim() ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyse en cours...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Analyser mon projet
                </>
              )}
            </button>

            <p className="text-[11px] text-[#aaaaaa] text-center">
              Gratuit · Sans inscription · Plus tu décris, mieux c&apos;est
            </p>
          </motion.div>

          {/* Right — results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {!result && !loading && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl flex flex-col items-center justify-center gap-3 py-24"
                  style={{ background: "rgba(26,26,26,0.03)", border: "1px solid rgba(26,26,26,0.1)" }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(26,26,26,0.06)" }}>
                    <svg className="w-5 h-5 text-[#aaaaaa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <p className="text-sm text-[#aaaaaa]">L&apos;analyse apparaîtra ici</p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl flex flex-col items-center justify-center gap-4 py-24"
                  style={{ background: "rgba(26,26,26,0.03)", border: "1px solid rgba(26,26,26,0.1)" }}
                >
                  <svg className="w-6 h-6 animate-spin text-[#aaaaaa]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-sm text-[#aaaaaa]">Analyse de ton projet...</p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl p-6 flex items-center justify-center"
                  style={{ background: "#fff5f5", border: "1px solid #fecaca" }}
                >
                  <p className="text-sm text-[#dc2626]">{error}</p>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <AnalysisBoard result={result} />
                  <div className="mt-4 flex justify-end px-1">
                    <button
                      onClick={() => { setResult(null); setDescription(""); }}
                      className="text-[11px] text-[#888888] hover:text-[#1a1a1a] transition-colors"
                    >
                      Nouveau projet →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
