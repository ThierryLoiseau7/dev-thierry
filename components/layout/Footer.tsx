"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-[#0B0E14] border-t border-[rgba(255,255,255,0.05)] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-mono font-bold text-[#FFFFFF] text-lg">
              <span className="text-[#39FF14]">&gt;</span> Dev Thierry
            </p>
            <p className="font-mono text-xs text-[#4a5568] mt-1 tracking-widest">
              On-web. On-chain.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              { href: "#about", label: "About" },
              { href: "#projects", label: "Projects" },
              { href: "#agent", label: "Agent" },
              { href: "#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-mono text-xs text-[#4a5568] hover:text-[#8892a4] transition-colors tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs text-[#4a5568]">
            © {new Date().getFullYear()} Dev Thierry
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
