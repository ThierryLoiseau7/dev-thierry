"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/GradientButton";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#agent", label: "Agent" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,10,15,0.9)] backdrop-blur-md border-b border-[rgba(255,255,255,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="font-mono font-bold text-[#FFFFFF] tracking-tight hover:text-[#39FF14] transition-colors text-lg"
        >
          <span className="text-[#39FF14]">&gt;</span> dev thierry
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-sm text-[#8892a4] hover:text-[#FFFFFF] transition-colors duration-200 tracking-wide"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <GradientButton href="#contact" variant="outline">
            Hire Me
          </GradientButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#8892a4] hover:text-[#FFFFFF] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[rgba(13,13,24,0.98)] backdrop-blur-md border-t border-[rgba(255,255,255,0.05)] px-6 py-6 flex flex-col gap-4"
        >
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-sm text-[#8892a4] hover:text-[#FFFFFF] transition-colors py-1"
            >
              {label}
            </a>
          ))}
          <GradientButton href="#contact" variant="primary">
            Hire Me
          </GradientButton>
        </motion.div>
      )}
    </motion.header>
  );
}
