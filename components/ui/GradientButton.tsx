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
    "relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none";

  const styles =
    variant === "primary"
      ? "bg-[#1a1a1a] text-white hover:bg-[#333333]"
      : "border border-[rgba(0,0,0,0.15)] text-[#1a1a1a] hover:border-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.03)]";

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
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
