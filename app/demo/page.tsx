"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CLIENTS = [
  { id: 1,  name: "Johnson HVAC Solutions",   category: "HVAC",        spend: 12400, roas: 5.1, leads: 87,  status: "active",  trend: +12  },
  { id: 2,  name: "Metro Plumbing Co.",        category: "Plumbing",    spend: 8200,  roas: 3.8, leads: 54,  status: "active",  trend: -4   },
  { id: 3,  name: "Premium Roofing Inc.",      category: "Roofing",     spend: 15600, roas: 6.2, leads: 112, status: "active",  trend: +18  },
  { id: 4,  name: "GreenScape Lawn Care",      category: "Landscaping", spend: 6800,  roas: 4.1, leads: 43,  status: "paused",  trend: -2   },
  { id: 5,  name: "Capitol Electric",          category: "Electrical",  spend: 9100,  roas: 4.7, leads: 68,  status: "active",  trend: +7   },
  { id: 6,  name: "Blue Ridge HVAC",           category: "HVAC",        spend: 11200, roas: 5.8, leads: 94,  status: "active",  trend: +21  },
  { id: 7,  name: "QuickFix Plumbers",         category: "Plumbing",    spend: 5400,  roas: 3.2, leads: 31,  status: "review",  trend: -9   },
  { id: 8,  name: "Storm Shield Roofing",      category: "Roofing",     spend: 13800, roas: 5.5, leads: 99,  status: "active",  trend: +15  },
  { id: 9,  name: "Bright Home Electric",      category: "Electrical",  spend: 7600,  roas: 4.3, leads: 57,  status: "active",  trend: +3   },
  { id: 10, name: "Total Lawn Masters",        category: "Landscaping", spend: 4900,  roas: 2.9, leads: 28,  status: "paused",  trend: -11  },
];

const AI_INSIGHTS = [
  { type: "alert",       label: "Budget Alert", body: "Johnson HVAC is 94% through monthly budget — raise by $2K to avoid campaign downtime.", time: "2 min ago"  },
  { type: "opportunity", label: "Opportunity",  body: "Metro Plumbing CPC dropped 18% — increase bids to capture more leads at lower cost.",   time: "14 min ago" },
  { type: "warning",     label: "Attention",    body: "GreenScape campaign paused — awaiting client creative approval for 3 days.",              time: "3 hr ago"   },
  { type: "insight",     label: "AI Insight",   body: "HVAC clients avg 5.4x ROAS vs 3.5x for Landscaping — consider budget reallocation.",      time: "1 day ago"  },
];

const AGENTS = [
  { label: "Budget Monitor",   status: "running", tasks: 12 },
  { label: "Bid Optimizer",    status: "running", tasks: 7  },
  { label: "Report Generator", status: "idle",    tasks: 0  },
];

const CATEGORIES = ["All", "HVAC", "Plumbing", "Roofing", "Landscaping", "Electrical"] as const;

const STATUS_STYLE = {
  active: { bg: "rgba(5,150,105,0.08)",   text: "#059669", label: "Active" },
  paused: { bg: "rgba(245,158,11,0.08)",  text: "#b45309", label: "Paused" },
  review: { bg: "rgba(79,70,229,0.08)",   text: "#4F46E5", label: "Review" },
};

const INSIGHT_STYLE = {
  alert:       { border: "#fecaca", bg: "#fef2f2", dot: "#ef4444", badge: "HIGH",   badgeBg: "#fee2e2", badgeText: "#dc2626" },
  opportunity: { border: "#a7f3d0", bg: "#f0fdf4", dot: "#059669", badge: "ACTION", badgeBg: "#d1fae5", badgeText: "#059669" },
  warning:     { border: "#fde68a", bg: "#fffbeb", dot: "#d97706", badge: "LOW",    badgeBg: "#fef3c7", badgeText: "#b45309" },
  insight:     { border: "#c7d2fe", bg: "#eef2ff", dot: "#4F46E5", badge: "INFO",   badgeBg: "#e0e7ff", badgeText: "#4F46E5" },
};

const CATEGORY_DATA = [
  { label: "Roofing",     spend: 29400, opacity: 1    },
  { label: "HVAC",        spend: 23600, opacity: 0.78 },
  { label: "Electrical",  spend: 16700, opacity: 0.58 },
  { label: "Plumbing",    spend: 13600, opacity: 0.42 },
  { label: "Landscaping", spend: 11700, opacity: 0.28 },
];
const MAX_SPEND = 29400;
const BAR_COLOR = "#4F46E5";

function useCountUp(target: number, duration = 1300) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    let raf: number;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function Sparkline({ roas }: { roas: number }) {
  const pct = roas / 7;
  const bars = [
    pct * 0.65, pct * 0.88, pct * 0.72, pct * 1.05,
    pct * 0.91, pct * 1.08, pct,
  ].map((v) => Math.min(Math.max(v, 0.12), 1));
  const color = roas >= 5 ? "#059669" : roas >= 4 ? "#4F46E5" : "#d97706";
  return (
    <div className="flex items-end gap-[2px] h-4 shrink-0">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm"
          style={{
            height: `${h * 100}%`,
            background: i === bars.length - 1 ? color : "rgba(0,0,0,0.08)",
          }}
        />
      ))}
    </div>
  );
}

export default function DemoPage() {
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [activeInsight, setActiveInsight] = useState(0);

  const clientsCount = useCountUp(247, 1400);
  const campaignCount = useCountUp(89, 1000);
  const spendCount = useCountUp(2400, 1600);

  const filtered = CLIENTS.filter((c) => {
    const matchCat = category === "All" || c.category === category;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  useEffect(() => {
    const t = setInterval(() => setActiveInsight((i) => (i + 1) % AI_INSIGHTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#F7F9FC", color: "#111111" }}>

      {/* Navbar */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "#ffffff", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div className="w-full max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-opacity group-hover:opacity-75"
              style={{ background: "#111111" }}
            >
              <span className="font-heading font-black text-[11px] tracking-tight text-white">DT</span>
            </div>
            <div className="leading-none">
              <p className="font-heading font-bold text-[10px] tracking-[0.15em] uppercase" style={{ color: "#111111" }}>Dev</p>
              <p className="font-heading font-bold text-[10px] tracking-[0.15em] uppercase" style={{ color: "#111111" }}>Thierry</p>
            </div>
          </Link>
          <div className="flex items-center gap-5">
            <div
              className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: "#dcfce7", color: "#16a34a" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse inline-block" />
              Live Demo
            </div>
            <Link
              href="/"
              className="text-[13px] font-medium transition-colors"
              style={{ color: "rgba(17,17,17,0.4)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(17,17,17,0.4)")}
            >
              &larr; Portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 pt-28 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {["Next.js 14", "TypeScript", "Supabase", "Multi-Agent AI"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold tracking-[0.08em] px-3 py-1 rounded-full uppercase"
                style={{ background: "#ede9fe", color: "#4F46E5" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            className="font-heading font-black leading-[1.05] tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", color: "#111111" }}
          >
            Agency Ops Portal
            <br />
            <span style={{ color: "rgba(17,17,17,0.25)" }}>Client Dashboard</span>
          </h1>
          <p className="text-[15px] max-w-lg leading-relaxed" style={{ color: "rgba(17,17,17,0.5)" }}>
            Multi-client ops portal for digital marketing agencies. Real-time ad spend tracking,
            ROAS monitoring, and AI-generated insights — built for 200+ account operations.
          </p>
        </motion.div>

        {/* KPI Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          {[
            { label: "Active Clients",   value: clientsCount.toLocaleString(),     sub: "+12 this month",     trend: "+5.1%", color: "#4F46E5" },
            { label: "Live Campaigns",   value: campaignCount.toString(),           sub: "across 6 verticals", trend: "+8",    color: "#4F46E5" },
            { label: "Monthly Ad Spend", value: `$${spendCount.toLocaleString()}k`, sub: "managed budget",     trend: "+14%",  color: "#4F46E5" },
            { label: "Avg ROAS",         value: "4.6x",                             sub: "last 30 days",       trend: "+0.3x", color: "#059669" },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: kpi.color }}
              />
              <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-3" style={{ color: "rgba(17,17,17,0.35)" }}>
                {kpi.label}
              </p>
              <p className="font-heading font-black text-2xl mb-2" style={{ color: "#111111" }}>{kpi.value}</p>
              <div className="flex items-center justify-between">
                <p className="text-[11px]" style={{ color: "rgba(17,17,17,0.35)" }}>{kpi.sub}</p>
                <span className="text-[11px] font-bold" style={{ color: "#16a34a" }}>&#x2191; {kpi.trend}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* Client Table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p className="text-[11px] font-black tracking-[0.18em] uppercase shrink-0" style={{ color: "rgba(17,17,17,0.35)" }}>
                Client Accounts ({filtered.length})
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="px-3 py-1.5 rounded-lg text-xs outline-none w-28"
                  style={{
                    background: "#F7F9FC",
                    border: "1px solid rgba(0,0,0,0.09)",
                    color: "#111111",
                  }}
                />
                <div className="flex gap-1.5 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-150"
                      style={{
                        background: category === cat ? "#4F46E5" : "#F7F9FC",
                        color: category === cat ? "#ffffff" : "rgba(17,17,17,0.45)",
                        border: `1px solid ${category === cat ? "#4F46E5" : "rgba(0,0,0,0.08)"}`,
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    {["Client", "Category", "Ad Spend", "ROAS", "Leads", "Status"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-[10px] font-black tracking-[0.15em] uppercase"
                        style={{ color: "rgba(17,17,17,0.3)" }}
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
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.035 }}
                        className="group cursor-pointer"
                        style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F9FC")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td className="px-5 py-3.5">
                          <p className="text-[13px] font-semibold" style={{ color: "#111111" }}>{client.name}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide uppercase"
                            style={{ background: "#F7F9FC", color: "rgba(17,17,17,0.45)", border: "1px solid rgba(0,0,0,0.07)" }}
                          >
                            {client.category}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-[13px] font-mono font-medium" style={{ color: "rgba(17,17,17,0.6)" }}>
                            ${client.spend.toLocaleString()}
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <Sparkline roas={client.roas} />
                            <p
                              className="text-[13px] font-mono font-bold"
                              style={{ color: client.roas >= 5 ? "#059669" : client.roas >= 4 ? "#4F46E5" : "#d97706" }}
                            >
                              {client.roas}x
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <p className="text-[13px] font-mono" style={{ color: "rgba(17,17,17,0.5)" }}>
                              {client.leads}
                            </p>
                            <span
                              className="text-[10px] font-bold"
                              style={{ color: client.trend > 0 ? "#16a34a" : "#dc2626" }}
                            >
                              {client.trend > 0 ? "+" : ""}{client.trend}%
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className="text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide"
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
                <div className="py-14 text-center text-sm" style={{ color: "rgba(17,17,17,0.25)" }}>
                  No clients match this filter.
                </div>
              )}
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-4">

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-black tracking-[0.18em] uppercase" style={{ color: "rgba(17,17,17,0.35)" }}>
                    AI Insights
                  </p>
                  <div
                    className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#dcfce7", color: "#16a34a" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse inline-block" />
                    Live
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2">
                {AI_INSIGHTS.map((insight, i) => {
                  const is = INSIGHT_STYLE[insight.type as keyof typeof INSIGHT_STYLE];
                  const isActive = i === activeInsight;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        background: isActive ? is.bg : "#ffffff",
                        borderColor: isActive ? is.border : "rgba(0,0,0,0.05)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl p-3 cursor-pointer"
                      style={{ border: `1px solid ${isActive ? is.border : "rgba(0,0,0,0.05)"}` }}
                      onClick={() => setActiveInsight(i)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: is.dot }} />
                        <p className="text-[11px] font-black" style={{ color: isActive ? "#111111" : "rgba(17,17,17,0.4)" }}>
                          {insight.label}
                        </p>
                        <span
                          className="text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-full ml-auto"
                          style={{ background: is.badgeBg, color: is.badgeText }}
                        >
                          {is.badge}
                        </span>
                      </div>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.25 }}
                          className="text-[11px] leading-relaxed mt-1.5 mb-1"
                          style={{ color: "rgba(17,17,17,0.55)" }}
                        >
                          {insight.body}
                        </motion.p>
                      )}
                      <p className="text-[10px]" style={{ color: "rgba(17,17,17,0.25)" }}>{insight.time}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Agent Status */}
              <div
                className="mx-4 mb-4 rounded-xl p-4"
                style={{ background: "#f5f3ff", border: "1px solid #ddd6fe" }}
              >
                <p className="text-[10px] font-black tracking-[0.15em] uppercase mb-3" style={{ color: "#4F46E5" }}>
                  Agent Status
                </p>
                {AGENTS.map(({ label, status, tasks }) => (
                  <div key={label} className="flex items-center justify-between py-1.5">
                    <div>
                      <p className="text-[12px] font-medium" style={{ color: "rgba(17,17,17,0.55)" }}>{label}</p>
                      {status === "running" && (
                        <p className="text-[10px]" style={{ color: "rgba(17,17,17,0.3)" }}>{tasks} tasks active</p>
                      )}
                    </div>
                    <span
                      className="flex items-center gap-1.5 text-[11px] font-bold"
                      style={{ color: status === "running" ? "#16a34a" : "rgba(17,17,17,0.25)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{
                          background: status === "running" ? "#059669" : "rgba(17,17,17,0.15)",
                          animation: status === "running" ? "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" : "none",
                        }}
                      />
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">

          {/* Spend by Category */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="rounded-2xl p-6"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <p className="text-[11px] font-black tracking-[0.18em] uppercase mb-5" style={{ color: "rgba(17,17,17,0.35)" }}>
              Ad Spend by Category
            </p>
            <div className="flex flex-col gap-4">
              {CATEGORY_DATA.map((cat, i) => (
                <div key={cat.label} className="flex items-center gap-3">
                  <p className="text-[12px] font-medium w-20 shrink-0" style={{ color: "rgba(17,17,17,0.5)" }}>{cat.label}</p>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#F7F9FC" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.spend / MAX_SPEND) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{ background: BAR_COLOR, opacity: cat.opacity }}
                    />
                  </div>
                  <p className="text-[12px] font-mono font-bold w-14 text-right" style={{ color: "rgba(17,17,17,0.5)" }}>
                    ${(cat.spend / 1000).toFixed(1)}k
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48 }}
            className="rounded-2xl p-6"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <p className="text-[11px] font-black tracking-[0.18em] uppercase mb-5" style={{ color: "rgba(17,17,17,0.35)" }}>
              Platform Architecture
            </p>
            <div className="flex flex-col gap-2.5 font-mono text-[12px] leading-relaxed">
              {[
                [
                  { t: "Supabase (PostgreSQL + RLS)", c: "#4F46E5" },
                  { t: "  →  ",                       c: "rgba(17,17,17,0.2)"  },
                  { t: "Next.js Edge API",             c: "#4F46E5"            },
                  { t: "  →  ",                       c: "rgba(17,17,17,0.2)"  },
                  { t: "Dashboard",                    c: "#4F46E5"            },
                ],
                [
                  { t: "AI Orchestrator",              c: "#059669"            },
                  { t: "  →  ",                       c: "rgba(17,17,17,0.2)"  },
                  { t: "Budget · Bid · Report Agents", c: "#4F46E5"            },
                  { t: "  →  ",                       c: "rgba(17,17,17,0.2)"  },
                  { t: "Real-time Alerts",             c: "#d97706"            },
                ],
              ].map((row, ri) => (
                <div key={ri} className="flex flex-wrap items-center">
                  {row.map((seg, si) => (
                    <span key={si} style={{ color: seg.c }}>{seg.t}</span>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-[12px] mt-5 leading-relaxed" style={{ color: "rgba(17,17,17,0.35)" }}>
              Each module is independently deployable. Auth, billing, and AI agents are fully
              decoupled — scales to 1,000+ clients without architectural changes.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{
            background: "#111111",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
        >
          <div>
            <p className="font-heading font-bold text-white text-xl mb-1">Want this built for your agency?</p>
            <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              Full ops portal — client onboarding, Google Ads dashboards, AI reporting.
            </p>
          </div>
          <Link
            href="/#contact"
            className="px-7 py-3.5 rounded-full text-[14px] font-bold transition-all hover:opacity-90 shrink-0 text-white"
            style={{ background: "#4F46E5" }}
          >
            Let&apos;s Talk &rarr;
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
