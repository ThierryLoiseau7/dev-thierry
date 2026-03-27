"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

const categoryMeta: Record<
  Project["category"],
  { label: string; color: string; bg: string; border: string }
> = {
  web2: {
    label: "Web2",
    color: "#39FF14",
    bg: "rgba(57,255,20,0.08)",
    border: "rgba(57,255,20,0.25)",
  },
  web3: {
    label: "Web3",
    color: "#FF007F",
    bg: "rgba(255,0,127,0.08)",
    border: "rgba(255,0,127,0.25)",
  },
  "ai-agent": {
    label: "AI Agent",
    color: "#00D1FF",
    bg: "rgba(0,209,255,0.08)",
    border: "rgba(0,209,255,0.25)",
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const meta = categoryMeta[project.category];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(12px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-3d"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="group relative bg-[#0F1219] border rounded-xl p-6 flex flex-col gap-4 h-full transition-all duration-300 hover:shadow-[0_8px_40px_rgba(57,255,20,0.12)]"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${meta.bg} 0%, transparent 65%)`,
          }}
        />

        {/* Top row */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <span
            className="text-[10px] font-mono tracking-widest uppercase border rounded-full px-2.5 py-0.5"
            style={{ color: meta.color, borderColor: meta.border, backgroundColor: meta.bg }}
          >
            {meta.label}
          </span>
          {project.featured && (
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#39FF14] border border-[rgba(57,255,20,0.25)] bg-[rgba(57,255,20,0.07)] rounded-full px-2.5 py-0.5">
              Featured
            </span>
          )}
        </div>

        {/* Title + Description */}
        <div className="flex-1 relative z-10">
          <h3
            className="text-base font-mono font-semibold text-[#FFFFFF] mb-2 transition-colors duration-200 group-hover:text-[#39FF14]"
          >
            {project.title}
          </h3>
          <p className="text-[#8892a4] text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 relative z-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-[#4a5568] bg-[rgba(255,255,255,0.04)] rounded px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.liveUrl || project.repoUrl) && (
          <div className="flex gap-4 pt-2 border-t border-[rgba(255,255,255,0.05)] relative z-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs transition-colors"
                style={{ color: meta.color }}
              >
                Live →
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#4a5568] hover:text-[#8892a4] transition-colors"
              >
                GitHub →
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
