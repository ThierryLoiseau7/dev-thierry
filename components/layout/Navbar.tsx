"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "My Work" },
  { href: "#formations", label: "Formations" },
  { href: "#gallery", label: "Galerie" },
  { href: "#about", label: "About Me" },
];

const TOOLS = [
  {
    href: "/roast",
    icon: "🔥",
    label: "Roast My Website",
    desc: "Feedback brutal sur ton site — gratuit",
  },
  {
    href: "/audit",
    icon: "🛡️",
    label: "Contract Audit",
    desc: "Analyse de sécurité Solidity — gratuit",
  },
  {
    href: "/rugcheck",
    icon: "🔍",
    label: "Rug Pull Detector",
    desc: "Scan memecoin — market cap, liquidité, sécurité",
  },
];

export function Navbar() {
  const [active, setActive] = useState("#home");
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const darkSections = ["#projects", "#agent"];
      let isDark = false;
      darkSections.forEach((id) => {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) isDark = true;
        }
      });
      setDark(isDark);

      const sections = ["#home", "#services", "#projects", "#formations", "#gallery", "#about", "#contact"];
      for (const id of [...sections].reverse()) {
        const el = document.querySelector(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close tools dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const bg = dark ? "rgba(28, 28, 28, 0.82)" : "rgba(205, 205, 205, 0.65)";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const textColor = dark ? "#ffffff" : "#1a1a1a";
  const mutedColor = dark ? "rgba(255,255,255,0.55)" : "#555555";
  const pillBg = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.09)";
  const ctaBg = dark ? "#ffffff" : "#1a1a1a";
  const ctaText = dark ? "#1a1a1a" : "#ffffff";

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl"
        >
          <div
            className="flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-400"
            style={{
              background: bg,
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: `1px solid ${border}`,
              boxShadow: dark ? "0 4px 30px rgba(0,0,0,0.3)" : "0 4px 30px rgba(0,0,0,0.08)",
            }}
          >
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-opacity group-hover:opacity-80"
                style={{ background: dark ? "#ffffff" : "#1a1a1a" }}
              >
                <span className="font-heading font-black text-sm tracking-tight" style={{ color: dark ? "#1a1a1a" : "#ffffff" }}>
                  DT
                </span>
              </div>
              <div className="leading-none">
                <p className="font-heading font-bold text-[11px] tracking-[0.14em] uppercase" style={{ color: textColor }}>Dev</p>
                <p className="font-heading font-bold text-[11px] tracking-[0.14em] uppercase" style={{ color: textColor }}>Thierry</p>
              </div>
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {LINKS.map(({ href, label }) => {
                const isActive = active === href;
                return (
                  <a
                    key={href}
                    href={href}
                    className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                    style={{ color: isActive ? textColor : mutedColor }}
                    onClick={() => setActive(href)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: pillBg }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Desktop right: Free Tools dropdown + CTA */}
            <div className="hidden md:flex items-center gap-2">

              {/* Free Tools dropdown */}
              <div ref={toolsRef} className="relative">
                <button
                  onClick={() => setToolsOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 hover:opacity-80"
                  style={{
                    background: dark ? "rgba(255,255,255,0.08)" : "rgba(26,26,26,0.07)",
                    color: mutedColor,
                    letterSpacing: "0.04em",
                  }}
                >
                  ⚡ Free Tools
                  <svg
                    className="w-3 h-3 transition-transform"
                    style={{ transform: toolsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {toolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-64 rounded-2xl overflow-hidden"
                      style={{
                        background: dark ? "rgba(28,28,28,0.97)" : "rgba(250,250,248,0.98)",
                        border: `1px solid ${border}`,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      <div className="p-2">
                        <p className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-2" style={{ color: mutedColor }}>
                          Free AI Tools
                        </p>
                        {TOOLS.map(({ href, icon, label, desc }) => (
                          <a
                            key={href}
                            href={href}
                            onClick={() => setToolsOpen(false)}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-black/5"
                          >
                            <span className="text-lg mt-0.5 shrink-0">{icon}</span>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: textColor }}>{label}</p>
                              <p className="text-[11px]" style={{ color: mutedColor }}>{desc}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-85 shrink-0"
                style={{ background: ctaBg, color: ctaText }}
              >
                Start Your Project
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              style={{ color: mutedColor }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-2 rounded-2xl overflow-hidden"
              style={{
                background: dark ? "rgba(28,28,28,0.95)" : "rgba(220,220,217,0.97)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${border}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}
            >
              <div className="flex flex-col p-3 gap-1">
                {LINKS.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => { setActive(href); setMobileOpen(false); }}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      color: active === href ? textColor : mutedColor,
                      background: active === href ? pillBg : "transparent",
                    }}
                  >
                    {label}
                  </a>
                ))}

                {/* Free tools section in mobile */}
                <div className="mt-1 pt-2" style={{ borderTop: `1px solid ${border}` }}>
                  <p className="text-[10px] font-black tracking-[0.2em] uppercase px-4 pb-1" style={{ color: mutedColor }}>
                    Free AI Tools
                  </p>
                  {TOOLS.map(({ href, icon, label, desc }) => (
                    <a
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors"
                      style={{ color: textColor }}
                    >
                      <span>{icon}</span>
                      <div>
                        <p className="text-sm font-semibold">{label}</p>
                        <p className="text-[11px]" style={{ color: mutedColor }}>{desc}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 px-4 py-3 rounded-xl text-sm font-semibold text-center"
                  style={{ background: ctaBg, color: ctaText }}
                >
                  Start Your Project
                </a>
              </div>
            </motion.div>
          )}
        </motion.header>
      </div>
    </>
  );
}
