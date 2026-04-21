"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "My Work" },
  { href: "#gallery", label: "Galerie" },
  { href: "#about", label: "About Me" },
];

export function Navbar() {
  const [active, setActive] = useState("#home");
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // detect dark sections to switch navbar theme
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

      // update active link
      const sections = ["#home", "#services", "#projects", "#gallery", "#about", "#contact"];
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

  const bg = dark
    ? "rgba(28, 28, 28, 0.82)"
    : "rgba(205, 205, 205, 0.65)";
  const border = dark
    ? "rgba(255,255,255,0.08)"
    : "rgba(0,0,0,0.07)";
  const textColor = dark ? "#ffffff" : "#1a1a1a";
  const mutedColor = dark ? "rgba(255,255,255,0.55)" : "#555555";
  const pillBg = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.09)";
  const ctaBg = dark ? "#ffffff" : "#1a1a1a";
  const ctaText = dark ? "#1a1a1a" : "#ffffff";

  return (
    <>
      {/* Floating navbar */}
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
            boxShadow: dark
              ? "0 4px 30px rgba(0,0,0,0.3)"
              : "0 4px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
            {/* Monogram */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-opacity group-hover:opacity-80"
              style={{
                background: dark ? "#ffffff" : "#1a1a1a",
              }}
            >
              <span
                className="font-heading font-black text-sm tracking-tight"
                style={{ color: dark ? "#1a1a1a" : "#ffffff" }}
              >
                DT
              </span>
            </div>
            {/* Name two lines */}
            <div className="leading-none">
              <p
                className="font-heading font-bold text-[11px] tracking-[0.14em] uppercase"
                style={{ color: textColor }}
              >
                Dev
              </p>
              <p
                className="font-heading font-bold text-[11px] tracking-[0.14em] uppercase"
                style={{ color: textColor }}
              >
                Thierry
              </p>
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

          {/* Free tools */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/roast"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 hover:opacity-80 shrink-0"
              style={{
                background: dark ? "rgba(255,95,87,0.15)" : "rgba(255,95,87,0.1)",
                color: dark ? "#ff5f57" : "#cc2200",
                letterSpacing: "0.04em",
              }}
            >
              🔥 Roast
            </a>
            <a
              href="/audit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 hover:opacity-80 shrink-0"
              style={{
                background: dark ? "rgba(40,200,64,0.15)" : "rgba(26,26,26,0.07)",
                color: dark ? "#28c840" : "#1a1a1a",
                letterSpacing: "0.04em",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse shrink-0" />
              Free Audit
            </a>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-85 shrink-0"
            style={{
              background: ctaBg,
              color: ctaText,
            }}
          >
            Start Your Project
          </a>

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
              <a
                href="/roast"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold"
                style={{ background: "rgba(255,95,87,0.1)", color: "#cc2200" }}
              >
                🔥 Roast My Website
              </a>
              <a
                href="/audit"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold"
                style={{
                  background: dark ? "rgba(40,200,64,0.15)" : "rgba(26,26,26,0.07)",
                  color: dark ? "#28c840" : "#1a1a1a",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
                Free Audit
              </a>
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
