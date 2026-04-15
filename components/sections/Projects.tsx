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
    <section id="projects" className="py-24 md:py-32 bg-[#f5f5f0]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="My Work"
          title="Selected Projects"
          subtitle="Work spanning Web2 SaaS, Web3 protocols, and AI-powered applications."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                active === value
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                  : "border-[rgba(0,0,0,0.12)] text-[#888888] hover:border-[rgba(0,0,0,0.22)] hover:text-[#1a1a1a]"
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
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
