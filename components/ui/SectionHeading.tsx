"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({ label, title, subtitle, align = "center", dark = false }: SectionHeadingProps) {
  const alignClass = align === "left" ? "text-left" : "text-center";
  const maxWClass = align === "left" ? "" : "mx-auto";

  return (
    <div className={`mb-14 ${alignClass}`}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`text-xs font-medium tracking-[0.28em] uppercase mb-3 ${dark ? "text-[#555555]" : "text-[#909090]"}`}
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`font-heading font-bold tracking-tight ${dark ? "text-white" : "text-[#1a1a1a]"}`}
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-4 max-w-2xl ${maxWClass} text-base leading-relaxed font-work ${dark ? "text-[#666666]" : "text-[#666666]"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
