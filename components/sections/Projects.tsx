"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/constants";

const FEATURED = PROJECTS.filter((p) => p.featured).slice(0, 3);

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-[#f5f5f0]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="My Work"
          title="Selected Projects"
          subtitle="Work spanning Web2 SaaS, Web3 protocols, and AI-powered applications."
        />

        {/* Featured grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURED.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-[rgba(0,0,0,0.15)] text-[#1a1a1a] text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a]"
          >
            Voir tous mes projets
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
