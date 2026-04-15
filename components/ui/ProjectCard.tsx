"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

const categoryMeta: Record<
  Project["category"],
  { label: string; color: string; bg: string; border: string }
> = {
  web2: {
    label: "Web2",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.06)",
    border: "rgba(22,163,74,0.2)",
  },
  web3: {
    label: "Web3",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.06)",
    border: "rgba(124,58,237,0.2)",
  },
  "ai-agent": {
    label: "AI Agent",
    color: "#0284c7",
    bg: "rgba(2,132,199,0.06)",
    border: "rgba(2,132,199,0.2)",
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const meta = categoryMeta[project.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div
        className="group relative bg-white border rounded-2xl p-6 flex flex-col gap-4 h-full transition-all duration-300 hover:shadow-card-hover"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <span
            className="text-[10px] font-semibold tracking-widest uppercase border rounded-full px-2.5 py-0.5"
            style={{ color: meta.color, borderColor: meta.border, backgroundColor: meta.bg }}
          >
            {meta.label}
          </span>
          {project.featured && (
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[#d97706] border border-[rgba(217,119,6,0.2)] bg-[rgba(217,119,6,0.06)] rounded-full px-2.5 py-0.5">
              Featured
            </span>
          )}
        </div>

        {/* Title + Description */}
        <div className="flex-1">
          <h3 className="text-base font-bold text-[#1a1a1a] mb-2 group-hover:text-[#555555] transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-[#666666] text-sm leading-relaxed font-work">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-[#999999] bg-[rgba(0,0,0,0.04)] rounded-lg px-2 py-1 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.liveUrl || project.repoUrl) && (
          <div className="flex gap-4 pt-3 border-t border-[rgba(0,0,0,0.06)]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold transition-colors"
                style={{ color: meta.color }}
              >
                Live ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#aaaaaa] hover:text-[#666666] transition-colors"
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
