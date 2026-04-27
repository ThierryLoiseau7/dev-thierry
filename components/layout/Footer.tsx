"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-[#1a1a1a] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-heading font-bold text-white text-lg">
              Dev Thierry
            </p>
            <p className="text-xs text-[#666666] mt-1 tracking-widest uppercase">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              { href: "#services", label: "Services" },
              { href: "#projects", label: "Work" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-xs text-[#666666] hover:text-white transition-colors tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="text-center md:text-right">
            <a
              href="mailto:devthierry@pm.me"
              className="text-sm text-white hover:text-[#aaaaaa] transition-colors font-medium"
            >
              devthierry@pm.me
            </a>
            <p className="text-xs text-[#555555] mt-1">
              © {new Date().getFullYear()} Dev Thierry
            </p>
          </div>
        </motion.div>

        {/* Bottom back-to-top */}
        <div className="flex justify-center mt-10">
          <a
            href="#home"
            className="flex items-center gap-2 text-xs text-[#555555] hover:text-white transition-colors group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
