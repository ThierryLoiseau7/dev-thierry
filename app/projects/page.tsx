"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/types";

type Filter = "all" | Project["category"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "web2", label: "Web2" },
  { value: "web3", label: "Web3" },
  { value: "ai-agent", label: "AI Agents" },
];

export default function ProjectsPage() {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <main className="min-h-screen bg-[#f5f5f0] overflow-x-hidden">
      <Navbar />

      <section className="pt-36 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <p className="text-xs font-medium tracking-[0.28em] text-[#909090] uppercase mb-3">
              My Work
            </p>
            <h1
              className="font-heading font-bold text-[#1a1a1a] tracking-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Tous mes Projets
            </h1>
            <p className="text-[#666666] text-base max-w-2xl mx-auto leading-relaxed">
              Web2 SaaS, protocoles Web3, applications IA — voici l&apos;ensemble de mes realisations.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
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

          {/* Back */}
          <div className="flex justify-center mt-14">
            <a
              href="/"
              className="text-xs font-semibold tracking-widest uppercase px-6 py-2.5 rounded-full border border-[rgba(0,0,0,0.15)] text-[#888888] hover:border-[rgba(0,0,0,0.3)] hover:text-[#1a1a1a] transition-all duration-200"
            >
              ← Retour au site
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
