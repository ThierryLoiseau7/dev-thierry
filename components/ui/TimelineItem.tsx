"use client";

import { motion } from "framer-motion";
import type { TimelineEntry } from "@/lib/types";

const phaseColors: Record<TimelineEntry["phase"], string> = {
  webdev: "#16a34a",
  web3: "#7c3aed",
  ai: "#0284c7",
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
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      className="relative flex gap-8 pb-12"
    >
      {/* Vertical line */}
      {!isLast && (
        <div
          className="absolute left-5 top-12 w-px h-full bg-[rgba(0,0,0,0.08)]"
        />
      )}

      {/* Dot */}
      <div className="relative shrink-0 mt-1">
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white"
          style={{ borderColor: color }}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-xs tracking-widest uppercase text-[#aaaaaa] font-medium">
            {entry.year}
          </span>
          <span
            className="text-[10px] tracking-wider uppercase rounded-full px-2.5 py-0.5 border font-medium"
            style={{
              color,
              borderColor: `${color}30`,
              backgroundColor: `${color}0a`,
            }}
          >
            {phaseLabel[entry.phase]}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">
          {entry.title}
        </h3>
        <p className="text-[#666666] text-sm leading-relaxed font-work">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}
