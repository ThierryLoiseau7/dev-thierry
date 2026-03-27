"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
}

export function GradientButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: GradientButtonProps) {
  const base =
    "relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/40";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[#39FF14] to-[#FF007F] text-[#0B0E14] font-bold hover:shadow-[0_0_35px_rgba(57,255,20,0.35)] hover:scale-105"
      : "border border-[rgba(57,255,20,0.35)] text-[#39FF14] hover:bg-[rgba(57,255,20,0.08)] hover:border-[#39FF14] hover:shadow-[0_0_20px_rgba(57,255,20,0.15)]";

  const content = (
    <motion.span
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return <a href={href} className="inline-flex">{content}</a>;
  }

  return content;
}
