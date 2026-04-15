"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SKILLS } from "@/lib/constants";

const categoryMeta = {
  frontend: { label: "Frontend & Backend", color: "#16a34a", border: "rgba(22,163,74,0.14)", bg: "rgba(22,163,74,0.04)" },
  web3: { label: "Web3 & Blockchain", color: "#7c3aed", border: "rgba(124,58,237,0.14)", bg: "rgba(124,58,237,0.04)" },
  ai: { label: "AI & Agents", color: "#0284c7", border: "rgba(2,132,199,0.14)", bg: "rgba(2,132,199,0.04)" },
  tooling: { label: "Tools & Infra", color: "#d97706", border: "rgba(217,119,6,0.14)", bg: "rgba(217,119,6,0.04)" },
};

export function Skills() {
  const groups = Object.entries(categoryMeta) as [
    keyof typeof categoryMeta,
    { label: string; color: string; border: string; bg: string }
  ][];

  return (
    <section id="skills" className="py-24 md:py-32 bg-[#efefea]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="Expertise"
          title="The Stack"
          subtitle="Technologies I've shipped to production — not just played with."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {groups.map(([category, meta]) => {
            const skills = SKILLS.filter((s) => s.category === category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="relative bg-white border rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300"
                style={{ borderColor: meta.border }}
              >
                {/* Top accent line */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${meta.color}60, transparent)` }}
                />

                <h3
                  className="text-xs font-semibold tracking-widest uppercase mb-6"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </h3>

                <div className="flex flex-col gap-4">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-[#1a1a1a]">
                          {skill.name}
                        </span>
                        <span className="text-xs font-medium" style={{ color: meta.color }}>
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1 bg-[rgba(0,0,0,0.07)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            delay: i * 0.06 + 0.2,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: meta.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
