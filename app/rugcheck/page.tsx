"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type TrendingToken = {
  address: string;
  chain: string;
  name: string | null;
  icon: string | null;
  url: string | null;
};

type HistoryItem = {
  address: string;
  name: string;
  symbol: string;
  chain: string;
  verdict: "SAFE" | "RISKY" | "SCAM";
  score: number;
  analyzedAt: string;
};

const CHAIN_LABELS: Record<string, string> = {
  ethereum: "ETH",
  bsc: "BSC",
  polygon: "POL",
  base: "BASE",
  arbitrum: "ARB",
  avalanche: "AVAX",
  solana: "SOL",
  optimism: "OP",
};

type RugResult = {
  found: boolean;
  token: {
    name: string;
    symbol: string;
    address: string;
    chain: string;
    createdAt: string | null;
  };
  market: {
    priceUsd: string | null;
    marketCap: number | null;
    liquidity: number | null;
    volume24h: number | null;
    priceChange24h: number | null;
    pairUrl: string | null;
  };
  socials: {
    twitter: string | null;
    telegram: string | null;
    website: string | null;
  };
  security: {
    score: number;
    verdict: "SAFE" | "RISKY" | "SCAM";
    honeypot: boolean;
    ownershipRenounced: boolean;
    mintable: boolean;
    blacklist: boolean;
    transferPausable: boolean;
    openSource: boolean;
    buyTax: number | null;
    sellTax: number | null;
    lpLocked: boolean;
    holderCount: number | string | null;
  };
};

const HISTORY_KEY = "rugcheck_history";

function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]"); } catch { return []; }
}

function saveHistory(item: HistoryItem) {
  const prev = getHistory().filter((h) => h.address !== item.address);
  const next = [item, ...prev].slice(0, 10);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

const VERDICT_STYLE = {
  SAFE:  { bg: "#dcfce7", text: "#16a34a", border: "#bbf7d0" },
  RISKY: { bg: "#fef9c3", text: "#ca8a04", border: "#fde047" },
  SCAM:  { bg: "#fee2e2", text: "#dc2626", border: "#fca5a5" },
};

const CHAIN_LABELS_FULL: Record<string, string> = {
  ethereum: "Ethereum",
  bsc: "BSC",
  polygon: "Polygon",
  base: "Base",
  arbitrum: "Arbitrum",
  avalanche: "Avalanche",
  solana: "Solana",
  optimism: "Optimism",
};

function fmt(n: number | null | undefined, prefix = ""): string {
  if (n == null) return "—";
  if (n >= 1_000_000_000) return `${prefix}${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(2)}K`;
  return `${prefix}${n.toFixed(2)}`;
}

function Check({ ok, label, value }: { ok: boolean | null; label: string; value?: string }) {
  const color = ok === null ? "#aaaaaa" : ok ? "#16a34a" : "#dc2626";
  const icon = ok === null ? "—" : ok ? "✓" : "✗";
  return (
    <div className="flex items-center justify-between py-2.5 px-4 rounded-xl" style={{ background: "rgba(26,26,26,0.03)", border: "1px solid rgba(26,26,26,0.07)" }}>
      <span className="text-sm text-[#555555]">{label}</span>
      <span className="text-sm font-bold" style={{ color }}>
        {value ?? icon}
      </span>
    </div>
  );
}

export default function RugCheckPage() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RugResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trending, setTrending] = useState<TrendingToken[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
    fetch("/api/trending")
      .then((r) => r.json())
      .then((d) => setTrending(d.tokens ?? []))
      .catch(() => {});
  }, []);

  const analyze = async () => {
    if (loading || !address.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/rugcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim() }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? "Analysis failed. Please try again.");
      } else {
        setResult(data);
        if (data.found) {
          const item: HistoryItem = {
            address: data.token.address,
            name: data.token.name,
            symbol: data.token.symbol,
            chain: data.token.chain,
            verdict: data.security.verdict,
            score: data.security.score,
            analyzedAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          };
          saveHistory(item);
          setHistory(getHistory());
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verdict = result?.security.verdict;
  const vs = verdict ? VERDICT_STYLE[verdict] : null;

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
            Memecoin Rug
            <br />
            <span className="text-[#888888]">Pull Detector</span>
          </h1>
          <p className="text-sm text-[#888888] max-w-lg mb-5">
            Paste any token contract address — get instant on-chain data: market cap, liquidity,
            socials, and a full security scan. Supports <strong className="text-[#1a1a1a]">ETH · BSC · Base · Solana · Polygon</strong> and more.
          </p>
          {/* Disclaimer banner */}
          <div
            className="inline-flex items-start gap-2 px-4 py-3 rounded-xl max-w-lg"
            style={{ background: "rgba(202,138,4,0.08)", border: "1px solid rgba(202,138,4,0.2)" }}
          >
            <span className="text-sm shrink-0">⚠️</span>
            <p className="text-xs text-[#92400e] leading-relaxed">
              <strong>Sa se pa konsèy finansye.</strong> Nou kreye zouti sa pou ede kominote ayisyen an konprann risk yo anvan yo envesti. Toujou fè pwòp rechèch ou — <strong>DYOR</strong>.
            </p>
          </div>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            placeholder="0x... or Solana contract address"
            className="flex-1 px-5 py-4 rounded-2xl text-sm font-mono outline-none transition-all"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(26,26,26,0.12)",
              color: "#1a1a1a",
            }}
          />
          <button
            onClick={analyze}
            disabled={loading || !address.trim()}
            className="px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shrink-0"
            style={{
              background: loading || !address.trim() ? "rgba(26,26,26,0.15)" : "#1a1a1a",
              color: loading || !address.trim() ? "rgba(26,26,26,0.35)" : "#ffffff",
              cursor: loading || !address.trim() ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Scanning...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Analyze Token
              </>
            )}
          </button>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 px-5 py-4 rounded-2xl text-sm"
              style={{ background: "#fee2e2", color: "#dc2626", border: "1px solid #fca5a5" }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5"
            >

              {/* Token header + verdict */}
              <div
                className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{ background: "#ffffff", border: "1px solid rgba(26,26,26,0.1)" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-heading font-black text-2xl text-[#1a1a1a]">
                      {result.token.name}
                    </h2>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg" style={{ background: "rgba(26,26,26,0.07)", color: "#555555" }}>
                      ${result.token.symbol}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg" style={{ background: "rgba(26,26,26,0.07)", color: "#555555" }}>
                      {CHAIN_LABELS_FULL[result.token.chain] ?? result.token.chain}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-[#aaaaaa] break-all">{result.token.address}</p>
                  {result.token.createdAt && (
                    <p className="text-xs text-[#888888] mt-1">Created: <strong className="text-[#555555]">{result.token.createdAt}</strong></p>
                  )}
                </div>

                {/* Verdict badge */}
                {vs && (
                  <div
                    className="flex flex-col items-center justify-center px-8 py-4 rounded-2xl shrink-0"
                    style={{ background: vs.bg, border: `1px solid ${vs.border}` }}
                  >
                    <span className="text-4xl font-black" style={{ color: vs.text }}>
                      {result.security.score}
                    </span>
                    <span className="text-xs font-black tracking-[0.2em] uppercase mt-0.5" style={{ color: vs.text }}>
                      {verdict}
                    </span>
                  </div>
                )}
              </div>

              {/* Market data */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Price", value: result.market.priceUsd ? `$${parseFloat(result.market.priceUsd).toFixed(8)}` : "—" },
                  { label: "Market Cap", value: fmt(result.market.marketCap, "$") },
                  { label: "Liquidity", value: fmt(result.market.liquidity, "$") },
                  { label: "24h Volume", value: fmt(result.market.volume24h, "$") },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-4"
                    style={{ background: "#ffffff", border: "1px solid rgba(26,26,26,0.1)" }}
                  >
                    <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#aaaaaa] mb-1">{label}</p>
                    <p className="font-heading font-black text-lg text-[#1a1a1a]">{value}</p>
                    {label === "24h Volume" && result.market.priceChange24h != null && (
                      <p
                        className="text-xs font-semibold mt-0.5"
                        style={{ color: result.market.priceChange24h >= 0 ? "#16a34a" : "#dc2626" }}
                      >
                        {result.market.priceChange24h >= 0 ? "+" : ""}{result.market.priceChange24h.toFixed(2)}%
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Socials + DexScreener */}
              {(result.socials.twitter || result.socials.telegram || result.socials.website || result.market.pairUrl) && (
                <div
                  className="rounded-2xl p-5 flex flex-wrap gap-3"
                  style={{ background: "#ffffff", border: "1px solid rgba(26,26,26,0.1)" }}
                >
                  <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#aaaaaa] w-full mb-1">Links</p>
                  {result.socials.twitter && (
                    <a
                      href={result.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:opacity-80"
                      style={{ background: "rgba(26,26,26,0.06)", color: "#1a1a1a" }}
                    >
                      𝕏 Twitter
                    </a>
                  )}
                  {result.socials.telegram && (
                    <a
                      href={result.socials.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:opacity-80"
                      style={{ background: "rgba(26,26,26,0.06)", color: "#1a1a1a" }}
                    >
                      ✈️ Telegram
                    </a>
                  )}
                  {result.socials.website && (
                    <a
                      href={result.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:opacity-80"
                      style={{ background: "rgba(26,26,26,0.06)", color: "#1a1a1a" }}
                    >
                      🌐 Website
                    </a>
                  )}
                  {result.market.pairUrl && (
                    <a
                      href={result.market.pairUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:opacity-80"
                      style={{ background: "rgba(26,26,26,0.06)", color: "#1a1a1a" }}
                    >
                      📊 DexScreener
                    </a>
                  )}
                </div>
              )}

              {/* Security checks */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "#ffffff", border: "1px solid rgba(26,26,26,0.1)" }}
              >
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#aaaaaa] mb-4">Security Checks</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Check ok={!result.security.honeypot} label="Honeypot" />
                  <Check ok={result.security.ownershipRenounced} label="Ownership Renounced" />
                  <Check ok={!result.security.mintable} label="Not Mintable" />
                  <Check ok={!result.security.blacklist} label="No Blacklist Function" />
                  <Check ok={!result.security.transferPausable} label="Transfer Not Pausable" />
                  <Check ok={result.security.openSource} label="Open Source" />
                  <Check ok={result.security.lpLocked} label="Liquidity Locked" />
                  <Check
                    ok={result.security.buyTax != null ? result.security.buyTax <= 10 : null}
                    label="Buy Tax"
                    value={result.security.buyTax != null ? `${result.security.buyTax.toFixed(1)}%` : "—"}
                  />
                  <Check
                    ok={result.security.sellTax != null ? result.security.sellTax <= 10 : null}
                    label="Sell Tax"
                    value={result.security.sellTax != null ? `${result.security.sellTax.toFixed(1)}%` : "—"}
                  />
                  {result.security.holderCount && (
                    <Check ok={null} label="Holder Count" value={String(result.security.holderCount)} />
                  )}
                </div>
              </div>

              {/* Share + Community CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Share on Telegram */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent("https://dev-thierry.vercel.app/rugcheck")}&text=${encodeURIComponent(
                    `🔍 Rug Check — ${result.token.name} ($${result.token.symbol})\nScore: ${result.security.score}/100 ${result.security.verdict === "SAFE" ? "✅" : result.security.verdict === "RISKY" ? "⚠️" : "🚨"} ${result.security.verdict}\nMarket Cap: ${result.market.marketCap ? `$${(result.market.marketCap / 1_000_000).toFixed(2)}M` : "—"} | Liquidity: ${result.market.liquidity ? `$${(result.market.liquidity / 1_000).toFixed(0)}K` : "—"}\n\n🇭🇹 Communauté crypto haïtienne: @ayiticoin`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-85"
                  style={{ background: "#229ED9", color: "#ffffff" }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.152.678-.553.843-1.12.524l-3.1-2.285-1.496 1.44c-.165.165-.305.305-.625.305l.222-3.157 5.755-5.198c.25-.222-.054-.346-.387-.124L7.34 14.023l-3.06-.955c-.666-.208-.68-.666.139-.986l11.959-4.614c.554-.2 1.038.135.854.98h.33z"/>
                  </svg>
                  Partager sur Telegram
                </a>

                {/* Join community */}
                <a
                  href="https://t.me/ayiticoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-85"
                  style={{ background: "rgba(34,158,217,0.1)", color: "#229ED9", border: "1px solid rgba(34,158,217,0.25)" }}
                >
                  🇭🇹 Rejoins la communauté @ayiticoin
                </a>
              </div>

              {/* Disclaimer */}
              <div
                className="flex items-start gap-2 px-4 py-3 rounded-xl"
                style={{ background: "rgba(202,138,4,0.08)", border: "1px solid rgba(202,138,4,0.2)" }}
              >
                <span className="text-sm shrink-0">⚠️</span>
                <p className="text-xs text-[#92400e] leading-relaxed">
                  <strong>Sa se pa konsèy finansye.</strong> Nou kreye zouti sa pou ede kominote ayisyen an konprann risk yo. Toujou fè pwòp rechèch ou anvan ou envesti — <strong>DYOR</strong>.
                </p>
              </div>

              {/* Data sources + reset */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <p className="text-[11px] text-[#aaaaaa]">
                  Data: <strong className="text-[#888888]">DexScreener</strong> + <strong className="text-[#888888]">GoPlus Security</strong> · By <strong className="text-[#1a1a1a]">Dev Thierry</strong>
                </p>
                <button
                  onClick={() => { setResult(null); setAddress(""); }}
                  className="text-sm font-semibold text-[#888888] hover:text-[#1a1a1a] transition-colors whitespace-nowrap"
                >
                  New Analysis →
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Trending + History (visible when no result) */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >

            {/* Trending Tokens */}
            {trending.length > 0 && (
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
                  <span className="text-base">🔥</span>
                  <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#888888]">Trending Now</p>
                  <span className="text-[10px] text-[#aaaaaa]">— top tokens kounye a</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {trending.map((t) => (
                    <button
                      key={t.address}
                      onClick={() => { setAddress(String(t.address)); }}
                      className="flex flex-col items-start gap-2 p-3 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden min-w-0"
                      style={{ background: "#ffffff", border: "1px solid rgba(26,26,26,0.1)" }}
                    >
                      <div className="flex items-center gap-1.5 w-full min-w-0">
                        {t.icon ? (
                          <img src={t.icon} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs" style={{ background: "rgba(26,26,26,0.06)" }}>🪙</div>
                        )}
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md shrink-0" style={{ background: "rgba(26,26,26,0.06)", color: "#888888" }}>
                          {CHAIN_LABELS[t.chain] ?? t.chain.slice(0, 4).toUpperCase()}
                        </span>
                      </div>
                      {t.name && (
                        <p className="text-[11px] font-semibold text-[#1a1a1a] leading-tight line-clamp-2 w-full break-words">{t.name}</p>
                      )}
                      <p className="text-[9px] font-mono text-[#aaaaaa] w-full overflow-hidden" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {String(t.address).slice(0, 8)}...
                      </p>
                      <span className="text-[10px] font-bold text-[#1a1a1a] mt-auto">Analyze →</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent History */}
            {history.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-base">🕐</span>
                  <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#888888]">Analyses récentes</p>
                </div>
                <div className="flex flex-col gap-2">
                  {history.slice(0, 5).map((h) => {
                    const vs = VERDICT_STYLE[h.verdict];
                    return (
                      <button
                        key={h.address}
                        onClick={() => setAddress(h.address)}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl transition-all hover:scale-[1.01] text-left"
                        style={{ background: "#ffffff", border: "1px solid rgba(26,26,26,0.08)" }}
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-sm font-bold text-[#1a1a1a]">{h.name} <span className="text-[#aaaaaa] font-normal">${h.symbol}</span></p>
                            <p className="text-[11px] text-[#aaaaaa]">{CHAIN_LABELS[h.chain] ?? h.chain.toUpperCase()} · {h.analyzedAt}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-sm font-black" style={{ color: vs.text }}>{h.score}/100</span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-lg" style={{ background: vs.bg, color: vs.text }}>{h.verdict}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty state with community CTA */}
            {trending.length === 0 && history.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: "rgba(26,26,26,0.06)" }}>
                  🔍
                </div>
                <p className="text-sm text-[#aaaaaa] max-w-xs">
                  Enter a token contract address above to check for rug pull risks, honeypots, and on-chain data.
                </p>
              </div>
            )}

            {/* Community CTA */}
            <a
              href="https://t.me/ayiticoin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold transition-all hover:opacity-85"
              style={{ background: "rgba(34,158,217,0.08)", color: "#229ED9", border: "1px solid rgba(34,158,217,0.2)" }}
            >
              🇭🇹 Rejoins la communauté crypto haïtienne — @ayiticoin
            </a>

          </motion.div>
        )}

        {/* Bottom CTA */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }}
        >
          <div>
            <p className="font-heading font-bold text-[#1a1a1a] text-lg">Need a custom crypto tool?</p>
            <p className="text-sm text-[#888888] mt-0.5">I build Web3 tools, dashboards, and DeFi integrations.</p>
          </div>
          <Link
            href="/#contact"
            className="px-6 py-3 rounded-xl bg-[#1a1a1a] text-white text-sm font-semibold hover:bg-[#333333] transition-colors whitespace-nowrap shrink-0"
          >
            Contact Me
          </Link>
        </div>

      </div>
    </div>
  );
}
