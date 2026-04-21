"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SAMPLE_CONTRACT = ``;

const SEVERITY: Record<string, { bg: string; text: string }> = {
  CRITICAL: { bg: "#fee2e2", text: "#dc2626" },
  HIGH:     { bg: "#ffedd5", text: "#ea580c" },
  MEDIUM:   { bg: "#fef9c3", text: "#ca8a04" },
  LOW:      { bg: "#dbeafe", text: "#2563eb" },
  INFO:     { bg: "#f1f5f9", text: "#64748b" },
};

function ResultLine({ line, i }: { line: string; i: number }) {
  // Security Score
  if (line.startsWith("## Security Score:")) {
    const score = line.replace("## Security Score:", "").trim();
    return (
      <div className="flex items-baseline gap-3 mb-5">
        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#888888]">Security Score</span>
        <span className="text-4xl font-black text-[#1a1a1a]">{score}</span>
      </div>
    );
  }

  // Section headers ##
  if (line.startsWith("## ")) {
    return (
      <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#888888] mt-7 mb-2">
        {line.replace("## ", "")}
      </p>
    );
  }

  // Finding headers ### [SEVERITY] — Title
  if (line.startsWith("### ")) {
    const content = line.replace("### ", "");
    const match = content.match(/^\[(CRITICAL|HIGH|MEDIUM|LOW|INFO)\]/);
    if (match) {
      const sev = match[1];
      const title = content.replace(`[${sev}]`, "").replace(/^[\s—–-]+/, "").trim();
      const c = SEVERITY[sev];
      return (
        <div className="flex items-center gap-2 mt-5 mb-1.5">
          <span
            className="text-[10px] font-black tracking-[0.12em] px-2 py-0.5 rounded-md shrink-0"
            style={{ background: c.bg, color: c.text }}
          >
            {sev}
          </span>
          <span className="font-bold text-sm text-[#1a1a1a]">{title}</span>
        </div>
      );
    }
    return <p key={i} className="font-bold text-sm text-[#1a1a1a] mt-4 mb-1">{content}</p>;
  }

  // Bold text
  if (line.includes("**")) {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p className="text-sm text-[#555555] leading-relaxed">
        {parts.map((p, j) =>
          p.startsWith("**") && p.endsWith("**")
            ? <strong key={j} className="text-[#1a1a1a] font-semibold">{p.slice(2, -2)}</strong>
            : p
        )}
      </p>
    );
  }

  // Numbered / bullet
  if (/^\d+\. /.test(line) || line.startsWith("- ") || line.startsWith("* ")) {
    return <p className="text-sm text-[#555555] leading-relaxed pl-1">{line}</p>;
  }

  // Empty
  if (!line.trim()) return <div className="h-1" />;

  // Normal
  return <p className="text-sm text-[#555555] leading-relaxed">{line}</p>;
}

export default function AuditPage() {
  const [code, setCode] = useState(SAMPLE_CONTRACT);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const analyze = async () => {
    if (loading) return;
    setResult("");
    setDone(false);
    setLoading(true);
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        setResult("Service unavailable. Please try again.");
        setDone(true);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;
        setResult((prev) => prev + decoder.decode(value, { stream: true }));
      }
      setDone(true);
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setResult("An error occurred. Please try again.");
        setDone(true);
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

      {/* Page content */}
      <div className="w-full max-w-5xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#888888] mb-3">
            Free Tool — by Dev Thierry
          </p>
          <h1
            className="font-heading font-black text-[#1a1a1a] leading-[1.02] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
          >
            Smart Contract
            <br />
            <span className="text-[#888888]">Security Auditor</span>
          </h1>
          <p className="text-sm text-[#888888] max-w-lg">
            Paste your Solidity contract and get an instant AI security audit.
            Detects reentrancy, access control issues, overflow, and more.
            Powered by <strong className="text-[#1a1a1a]">Llama 3.3 70B</strong>.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Left — code input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(26,26,26,0.12)" }}>
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[11px] font-mono text-white/30 tracking-wider">contract.sol</span>
              </div>
              {/* Code textarea */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                placeholder="// Paste your Solidity contract here..."
                className="w-full font-mono text-xs leading-relaxed resize-none outline-none p-5"
                style={{
                  background: "#111111",
                  color: "#e2e8f0",
                  minHeight: "400px",
                  caretColor: "#28c840",
                }}
              />
            </div>

            <button
              onClick={analyze}
              disabled={loading || !code.trim()}
              className="w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: loading || !code.trim() ? "rgba(26,26,26,0.15)" : "#1a1a1a",
                color: loading || !code.trim() ? "rgba(26,26,26,0.35)" : "#ffffff",
                cursor: loading || !code.trim() ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Scanning vulnerabilities...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Analyze Contract
                </>
              )}
            </button>

            <p className="text-[11px] text-[#aaaaaa] text-center">
              Free · No login required · Max 8,000 chars
            </p>
          </motion.div>

          {/* Right — results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="rounded-2xl p-6 min-h-[500px] flex flex-col"
              style={{
                background: result ? "#ffffff" : "rgba(26,26,26,0.03)",
                border: "1px solid rgba(26,26,26,0.1)",
              }}
            >
              {/* Empty state */}
              {!result && !loading && (
                <div className="flex flex-col items-center justify-center flex-1 gap-3 py-16">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(26,26,26,0.06)" }}>
                    <svg className="w-5 h-5 text-[#aaaaaa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm text-[#aaaaaa]">Audit results will appear here</p>
                </div>
              )}

              {/* Loading */}
              {loading && !result && (
                <div className="flex flex-col items-center justify-center flex-1 gap-3 py-16">
                  <svg className="w-6 h-6 animate-spin text-[#aaaaaa]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-sm text-[#aaaaaa]">Scanning for vulnerabilities...</p>
                </div>
              )}

              {/* Result */}
              {result && (
                <div className="flex-1">
                  {result.split("\n").map((line, i) => (
                    <ResultLine key={i} line={line} i={i} />
                  ))}
                  {loading && (
                    <span className="inline-block w-[3px] h-4 bg-[#1a1a1a] animate-pulse ml-0.5 align-middle" />
                  )}
                  {done && (
                    <div
                      className="mt-6 pt-4 flex items-center justify-between"
                      style={{ borderTop: "1px solid rgba(26,26,26,0.08)" }}
                    >
                      <p className="text-[11px] text-[#aaaaaa]">
                        By <strong className="text-[#1a1a1a]">Dev Thierry</strong> · Llama 3.3 via Groq
                      </p>
                      <button
                        onClick={() => { setResult(""); setDone(false); }}
                        className="text-[11px] text-[#888888] hover:text-[#1a1a1a] transition-colors"
                      >
                        New audit →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }}
        >
          <div>
            <p className="font-heading font-bold text-[#1a1a1a] text-lg">Need a full manual audit?</p>
            <p className="text-sm text-[#888888] mt-0.5">I do thorough security reviews for production contracts.</p>
          </div>
          <Link
            href="/#contact"
            className="px-6 py-3 rounded-xl bg-[#1a1a1a] text-white text-sm font-semibold hover:bg-[#333333] transition-colors whitespace-nowrap shrink-0"
          >
            Contact Me
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
