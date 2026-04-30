"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CLIENTS = [
  { id: 1,  name: "Johnson HVAC Solutions",   category: "HVAC",        spend: 12400, roas: 5.1, leads: 87,  status: "active"  },
  { id: 2,  name: "Metro Plumbing Co.",        category: "Plumbing",    spend: 8200,  roas: 3.8, leads: 54,  status: "active"  },
  { id: 3,  name: "Premium Roofing Inc.",      category: "Roofing",     spend: 15600, roas: 6.2, leads: 112, status: "active"  },
  { id: 4,  name: "GreenScape Lawn Care",      category: "Landscaping", spend: 6800,  roas: 4.1, leads: 43,  status: "paused"  },
  { id: 5,  name: "Capitol Electric",          category: "Electrical",  spend: 9100,  roas: 4.7, leads: 68,  status: "active"  },
  { id: 6,  name: "Blue Ridge HVAC",           category: "HVAC",        spend: 11200, roas: 5.8, leads: 94,  status: "active"  },
  { id: 7,  name: "QuickFix Plumbers",         category: "Plumbing",    spend: 5400,  roas: 3.2, leads: 31,  status: "review"  },
  { id: 8,  name: "Storm Shield Roofing",      category: "Roofing",     spend: 13800, roas: 5.5, leads: 99,  status: "active"  },
  { id: 9,  name: "Bright Home Electric",      category: "Electrical",  spend: 7600,  roas: 4.3, leads: 57,  status: "active"  },
  { id: 10, name: "Total Lawn Masters",        category: "Landscaping", spend: 4900,  roas: 2.9, leads: 28,  status: "paused"  },
];

const AI_INSIGHTS = [
  { type: "alert",       icon: "⚡", title: "Budget Alert",  body: "Johnson HVAC is 94% through monthly budget — raise by $2K to avoid campaign downtime.", time: "2 min ago"  },
  { type: "opportunity", icon: "📈", title: "Opportunity",   body: "Metro Plumbing CPC dropped 18% — increase bids to capture more leads at lower cost.",   time: "14 min ago" },
  { type: "warning",     icon: "⚠️", title: "Attention",     body: "GreenScape campaign paused — awaiting client creative approval for 3 days.",              time: "3 hr ago"   },
  { type: "insight",     icon: "🧠", title: "AI Insight",    body: "HVAC clients avg 5.4x ROAS vs 3.5x for Landscaping — consider budget reallocation.",      time: "1 day ago"  },
];

const AGENTS = [
  { label: "Budget Monitor",    status: "running" },
  { label: "Bid Optimizer",     status: "running" },
  { label: "Report Generator",  status: "idle"    },
];

const CATEGORIES = ["All", "HVAC", "Plumbing", "Roofing", "Landscaping", "Electrical"] as const;

const STATUS_STYLE = {
  active:  { bg: "rgba(22,163,74,0.12)",   text: "#4ade80",  label: "Active"  },
  paused:  { bg: "rgba(202,138,4,0.12)",   text: "#fbbf24",  label: "Paused"  },
  review:  { bg: "rgba(124,58,237,0.15)",  text: "#a78bfa",  label: "Review"  },
};

const INSIGHT_STYLE = {
  alert:       { border: "rgba(239,68,68,0.25)",   bg: "rgba(239,68,68,0.06)",   iconBg: "rgba(239,68,68,0.12)",   text: "#f87171" },
  opportunity: { border: "rgba(0,212,255,0.25)",   bg: "rgba(0,212,255,0.06)",   iconBg: "rgba(0,212,255,0.12)",   text: "#00d4ff" },
  warning:     { border: "rgba(202,138,4,0.25)",   bg: "rgba(202,138,4,0.06)",   iconBg: "rgba(202,138,4,0.12)",   text: "#fbbf24" },
  insight:     { border: "rgba(124,58,237,0.25)",  bg: "rgba(124,58,237,0.06)",  iconBg: "rgba(124,58,237,0.12)",  text: "#a78bfa" },
};

export default function DemoPage() {
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = CLIENTS.filter((c) => {
    const matchCat = category === "All" || c.category === category;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen" style={{ background: "#0f0f13", color: "#ffffff" }}>

      {/* Navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div
          className="w-full max-w-6xl flex items-center justify-between px-5 py-3 rounded-2xl"
          style={{
            background: "rgba(28,28,28,0.85)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.35)",
          }}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white transition-opacity group-hover:opacity-75">
              <span className="font-heading font-black text-sm tracking-tight text-[#1a1a1a]">DT</span>
            </div>
            <div className="leading-none">
              <p className="font-heading font-bold text-[11px] tracking-[0.14em] uppercase text-white">Dev</p>
              <p className="font-heading font-bold text-[11px] tracking-[0.14em] uppercase text-white">Thierry</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              Live Demo
            </span>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {["Next.js 14", "TypeScript strict", "Supabase", "Multi-Agent AI"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-md"
                style={{ background: "rgba(0,212,255,0.08)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.18)" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-heading font-black leading-[1.02] tracking-tight mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}>
            Agency Ops Portal
            <br />
            <span style={{ color: "rgba(255,255,255,0.28)" }}>Client Dashboard</span>
          </h1>
          <p className="text-sm max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
            Architecture prototype for a multi-client digital marketing ops portal.
            Real-time ad spend tracking, ROAS monitoring, and AI-generated insights — built for home services agencies managing 200+ accounts.
          </p>
        </motion.div>

        {/* KPI Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7"
        >
          {[
            { label: "Active Clients",  value: "247",   sub: "+12 this month",   color: "#00d4ff" },
            { label: "Live Campaigns",  value: "89",    sub: "across 6 verticals", color: "#a78bfa" },
            { label: "Monthly Ad Spend",value: "$2.4M", sub: "managed budget",   color: "#00d4ff" },
            { label: "Avg ROAS",        value: "4.6x",  sub: "last 30 days",     color: "#a78bfa" },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                {kpi.label}
              </p>
              <p className="font-heading font-black text-2xl mb-1" style={{ color: kpi.color }}>
                {kpi.value}
              </p>
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{kpi.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Client Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Controls */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: "rgba(255,255,255,0.3)" }}>
                Client Accounts ({filtered.length})
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search clients..."
                  className="px-3 py-1.5 rounded-xl text-xs outline-none w-36 placeholder:opacity-40"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "#ffffff" }}
                />
                <div className="flex gap-1 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all duration-150"
                      style={{
                        background: category === cat ? "rgba(0,212,255,0.14)" : "rgba(255,255,255,0.04)",
                        color: category === cat ? "#00d4ff" : "rgba(255,255,255,0.38)",
                        border: `1px solid ${category === cat ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {["Client", "Category", "Ad Spend", "ROAS", "Leads", "Status"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-[10px] font-black tracking-[0.15em] uppercase"
                        style={{ color: "rgba(255,255,255,0.22)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((client, i) => {
                    const ss = STATUS_STYLE[client.status as keyof typeof STATUS_STYLE];
                    return (
                      <motion.tr
                        key={client.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="group cursor-pointer"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-semibold text-white">{client.name}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                            style={{ background: "rgba(124,58,237,0.12)", color: "#a78bfa" }}
                          >
                            {client.category}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-mono font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
                            ${client.spend.toLocaleString()}
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p
                            className="text-sm font-mono font-bold"
                            style={{ color: client.roas >= 5 ? "#00d4ff" : client.roas >= 4 ? "#a78bfa" : "rgba(255,255,255,0.45)" }}
                          >
                            {client.roas}x
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {client.leads}
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className="text-[11px] font-black px-2.5 py-1 rounded-lg"
                            style={{ background: ss.bg, color: ss.text }}
                          >
                            {ss.label}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="py-14 text-center text-sm" style={{ color: "rgba(255,255,255,0.22)" }}>
                  No clients match this filter.
                </div>
              )}
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="p-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                  AI Insights
                </p>
                <span className="flex items-center gap-1.5 text-[10px] font-bold" style={{ color: "#00d4ff" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse inline-block" />
                  Live
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3 flex-1">
              {AI_INSIGHTS.map((insight, i) => {
                const is = INSIGHT_STYLE[insight.type as keyof typeof INSIGHT_STYLE];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.09 }}
                    className="rounded-xl p-3.5"
                    style={{ background: is.bg, border: `1px solid ${is.border}` }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0"
                        style={{ background: is.iconBg }}
                      >
                        {insight.icon}
                      </span>
                      <p className="text-xs font-black" style={{ color: is.text }}>{insight.title}</p>
                      <p className="text-[10px] ml-auto shrink-0" style={{ color: "rgba(255,255,255,0.22)" }}>
                        {insight.time}
                      </p>
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
                      {insight.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Agent status */}
            <div
              className="mx-4 mb-4 rounded-xl p-3.5"
              style={{ background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)" }}
            >
              <p className="text-[10px] font-black tracking-[0.15em] uppercase mb-2.5" style={{ color: "#a78bfa" }}>
                Agent Status
              </p>
              {AGENTS.map(({ label, status }) => (
                <div key={label} className="flex items-center justify-between py-1">
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.42)" }}>{label}</p>
                  <span
                    className="flex items-center gap-1.5 text-[10px] font-bold"
                    style={{ color: status === "running" ? "#4ade80" : "rgba(255,255,255,0.25)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{
                        background: status === "running" ? "#4ade80" : "rgba(255,255,255,0.2)",
                        animation: status === "running" ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
                      }}
                    />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Architecture note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.22)" }}>
            Platform Architecture
          </p>
          <div className="flex flex-col gap-2 font-mono text-[11px]">
            {[
              [
                { t: "Supabase  (PostgreSQL + Auth + RLS)",  c: "#00d4ff" },
                { t: " →  ",                                  c: "rgba(255,255,255,0.18)" },
                { t: "Next.js Edge / API Routes",             c: "#a78bfa" },
                { t: " →  ",                                  c: "rgba(255,255,255,0.18)" },
                { t: "React Dashboard",                        c: "#00d4ff" },
              ],
              [
                { t: "AI Orchestrator (multi-agent)",         c: "#a78bfa" },
                { t: " →  ",                                  c: "rgba(255,255,255,0.18)" },
                { t: "Budget Agent  ·  Bid Agent  ·  Report Agent",  c: "#00d4ff" },
                { t: " →  ",                                  c: "rgba(255,255,255,0.18)" },
                { t: "Real-time Alerts",                       c: "#a78bfa" },
              ],
            ].map((row, ri) => (
              <div key={ri} className="flex flex-wrap items-center gap-0">
                {row.map((seg, si) => (
                  <span key={si} style={{ color: seg.c }}>{seg.t}</span>
                ))}
              </div>
            ))}
          </div>
          <p className="text-[11px] mt-4 max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
            Each module is independently deployable. Auth, billing, and AI agents are fully decoupled — the platform scales to 1 000+ clients without architectural changes.
          </p>
        </motion.div>

        {/* CTA */}
        <div
          className="mt-10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <p className="font-heading font-bold text-white text-lg">Want this built for your agency?</p>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
              Full ops portal — client onboarding, Google Ads dashboards, AI reporting.
            </p>
          </div>
          <Link
            href="/#contact"
            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-85 shrink-0"
            style={{ background: "#00d4ff", color: "#0f0f13" }}
          >
            Let&apos;s Talk →
          </Link>
        </div>

      </div>
    </div>
  );
}
