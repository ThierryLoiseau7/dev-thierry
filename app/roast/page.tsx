"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SHARE_URL = "dev-thierry.vercel.app/roast";

function ResultLine({ line }: { line: string }) {
  if (line.startsWith("## Overall Verdict")) {
    return (
      <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#888888] mt-2 mb-1">
        Overall Verdict
      </p>
    );
  }
  if (line.startsWith("## 🔥")) {
    return (
      <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#888888] mt-6 mb-1">
        🔥 The Roast
      </p>
    );
  }
  if (line.startsWith("## 💡")) {
    return (
      <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#888888] mt-6 mb-1">
        💡 Fix It
      </p>
    );
  }
  if (line.startsWith("## Final Score")) {
    const score = line.replace("## Final Score:", "").trim();
    return (
      <div className="flex items-baseline gap-3 mt-6 mb-1">
        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#888888]">Final Score</span>
        <span className="text-4xl font-black text-[#1a1a1a]">{score}</span>
      </div>
    );
  }
  if (line.startsWith("## ")) {
    return <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#888888] mt-6 mb-1">{line.replace("## ", "")}</p>;
  }
  if (line.includes("**")) {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p className="text-sm text-[#444444] leading-relaxed">
        {parts.map((p, j) =>
          p.startsWith("**") && p.endsWith("**")
            ? <strong key={j} className="text-[#1a1a1a]">{p.slice(2, -2)}</strong>
            : p
        )}
      </p>
    );
  }
  if (/^\d+\. /.test(line) || line.startsWith("- ")) {
    return <p className="text-sm text-[#444444] leading-relaxed pl-1">{line}</p>;
  }
  if (!line.trim()) return <div className="h-1" />;
  return <p className="text-sm text-[#444444] leading-relaxed">{line}</p>;
}

export default function RoastPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [roastedUrl, setRoastedUrl] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const roast = async () => {
    if (loading || !url.trim()) return;
    setResult("");
    setDone(false);
    setError("");
    setLoading(true);
    setRoastedUrl(url.trim());
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        const msg = await res.text();
        setError(msg || "Something went wrong. Try again.");
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
        setError("Could not fetch this URL. Make sure the site is public.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Build share text — this is the promotional mechanic
  const getShareText = () => {
    const excerpt = result.split("\n").find((l) => l.trim().length > 60 && !l.startsWith("#")) ?? "";
    const short = excerpt.slice(0, 160).trim();
    return `🔥 My website just got AI roasted:\n\n"${short}..."\n\nTry yours 👉 ${SHARE_URL}\n\n#AIRoast #WebDesign`;
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const copyResult = async () => {
    const text = `${result}\n\n─────────────────────\n🔥 Roasted by Dev Thierry\n👉 ${SHARE_URL}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-[#555555] hover:text-[#1a1a1a] transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Portfolio
          </Link>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#888888] mb-3">Free Tool — by Dev Thierry</p>
          <h1
            className="font-heading font-black text-[#1a1a1a] leading-[1.02] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 7vw, 4.8rem)" }}
          >
            AI Roast My<br />
            <span className="text-[#888888]">Website 🔥</span>
          </h1>
          <p className="text-sm text-[#888888] max-w-lg mx-auto">
            Colle l&apos;URL de ton site → l&apos;IA te dit la vérité brutale sur ton design, ton copy et ton UX.
            <strong className="text-[#1a1a1a]"> Gratuit. Sans pitié.</strong>
          </p>
        </motion.div>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && roast()}
            placeholder="https://monsite.com"
            className="flex-1 px-5 py-4 rounded-2xl text-sm text-[#1a1a1a] placeholder-[#aaaaaa] outline-none bg-white"
            style={{ border: "1px solid rgba(26,26,26,0.12)" }}
          />
          <button
            onClick={roast}
            disabled={loading || !url.trim()}
            className="px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shrink-0"
            style={{
              background: loading || !url.trim() ? "rgba(26,26,26,0.15)" : "#1a1a1a",
              color: loading || !url.trim() ? "rgba(26,26,26,0.35)" : "#ffffff",
              cursor: loading || !url.trim() ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Roasting...
              </>
            ) : (
              <>🔥 Roast It</>
            )}
          </button>
        </motion.div>

        <p className="text-[11px] text-[#aaaaaa] text-center mb-10">Free · No login · Public URLs only</p>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl px-5 py-4 mb-6 text-sm text-[#dc2626]"
              style={{ background: "#fee2e2", border: "1px solid rgba(220,38,38,0.15)" }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {(result || (loading && !result)) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(26,26,26,0.1)" }}
            >
              {/* Result header */}
              <div className="flex items-center justify-between px-5 py-3 bg-[#1a1a1a]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-[11px] font-mono text-white/40 tracking-wider truncate max-w-[200px]">
                    {roastedUrl}
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#ff5f57]">
                  🔥 Roasted
                </span>
              </div>

              {/* Loading state */}
              {loading && !result && (
                <div className="flex items-center justify-center gap-3 py-16 bg-white">
                  <svg className="w-5 h-5 animate-spin text-[#aaaaaa]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-sm text-[#aaaaaa]">Fetching and roasting your site...</span>
                </div>
              )}

              {/* Result text */}
              {result && (
                <div className="bg-white px-6 py-6">
                  {result.split("\n").map((line, i) => (
                    <ResultLine key={i} line={line} />
                  ))}
                  {loading && (
                    <span className="inline-block w-[3px] h-4 bg-[#1a1a1a] animate-pulse ml-0.5 align-middle" />
                  )}
                </div>
              )}

              {/* Watermark + Share — always visible at bottom */}
              {result && (
                <div
                  className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  style={{ background: "#f5f5f0", borderTop: "1px solid rgba(26,26,26,0.08)" }}
                >
                  {/* Branding */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center shrink-0">
                      <span className="text-white text-[10px] font-black">DT</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#1a1a1a]">Roasted by Dev Thierry</p>
                      <p className="text-[10px] text-[#aaaaaa]">{SHARE_URL}</p>
                    </div>
                  </div>

                  {/* Share buttons */}
                  {done && (
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Copy */}
                      <button
                        onClick={copyResult}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          background: copied ? "rgba(40,200,64,0.12)" : "rgba(26,26,26,0.08)",
                          color: copied ? "#28c840" : "#1a1a1a",
                        }}
                      >
                        {copied ? (
                          <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied!</>
                        ) : (
                          <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy</>
                        )}
                      </button>

                      {/* Twitter/X share */}
                      <button
                        onClick={shareOnTwitter}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1a1a1a] text-white hover:bg-[#333] transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Partager sur X
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }}
          >
            <div>
              <p className="font-heading font-bold text-[#1a1a1a] text-lg">Ton site a besoin d&apos;un vrai fix ?</p>
              <p className="text-sm text-[#888888] mt-0.5">Je construis et j&apos;améliore des sites — Web, Web3 &amp; AI.</p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-3 rounded-xl bg-[#1a1a1a] text-white text-sm font-semibold hover:bg-[#333] transition-colors whitespace-nowrap shrink-0"
            >
              Me contacter
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
}
