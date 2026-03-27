"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/types";

type Filter = "all" | Project["category"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web2", label: "Web2" },
  { value: "web3", label: "Web3" },
  { value: "ai-agent", label: "AI Agents" },
];

export function Projects() {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#0F1219]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Work"
          title="Projects"
          subtitle="Selected work spanning Web2 SaaS, Web3 protocols, and AI-powered applications."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-lg border transition-all duration-200 ${
                active === value
                  ? "border-[#39FF14] bg-[rgba(57,255,20,0.1)] text-[#39FF14]"
                  : "border-[rgba(255,255,255,0.08)] text-[#8892a4] hover:border-[rgba(255,255,255,0.15)] hover:text-[#FFFFFF]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
