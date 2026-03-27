"use client";

import { motion } from "framer-motion";
import type { TimelineEntry } from "@/lib/types";

const phaseColors: Record<TimelineEntry["phase"], string> = {
  webdev: "#39FF14",
  web3: "#FF007F",
  ai: "#00D1FF",
};

const phaseLabel: Record<TimelineEntry["phase"], string> = {
  webdev: "Web Dev",
  web3: "Web3",
  ai: "AI Agents",
};

interface TimelineItemProps {
  entry: TimelineEntry;
  index: number;
  isLast: boolean;
}

export function TimelineItem({ entry, index, isLast }: TimelineItemProps) {
  const color = phaseColors[entry.phase];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      className="relative flex gap-8 pb-12"
    >
      {/* Vertical line */}
      {!isLast && (
        <div
          className="absolute left-5 top-12 w-px h-full"
          style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }}
        />
      )}

      {/* Dot */}
      <div className="relative shrink-0 mt-1">
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: color, boxShadow: `0 0 20px ${color}40` }}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="font-mono text-xs tracking-widest uppercase text-[#4a5568]">
            {entry.year}
          </span>
          <span
            className="font-mono text-[10px] tracking-wider uppercase rounded-full px-2.5 py-0.5 border"
            style={{
              color,
              borderColor: `${color}35`,
              backgroundColor: `${color}0d`,
            }}
          >
            {phaseLabel[entry.phase]}
          </span>
        </div>
        <h3 className="text-xl font-mono font-semibold text-[#FFFFFF] mb-3">
          {entry.title}
        </h3>
        <p className="text-[#8892a4] text-sm leading-relaxed">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}
