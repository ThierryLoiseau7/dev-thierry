"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SKILLS } from "@/lib/constants";

const categoryMeta = {
  frontend: { label: "Frontend & Backend", color: "#39FF14", glow: "rgba(57,255,20,0.1)" },
  web3: { label: "Web3 & Blockchain", color: "#FF007F", glow: "rgba(255,0,127,0.1)" },
  ai: { label: "AI & Agents", color: "#00D1FF", glow: "rgba(0,209,255,0.1)" },
  tooling: { label: "Tools & Infra", color: "#39FF14", glow: "rgba(57,255,20,0.1)" },
};

export function Skills() {
  const groups = Object.entries(categoryMeta) as [
    keyof typeof categoryMeta,
    { label: string; color: string; glow: string }
  ][];

  return (
    <section id="skills" className="py-24 md:py-32 bg-[#0B0E14]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="Expertise"
          title="The Stack"
          subtitle="Technologies I've shipped to production — not just played with."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {groups.map(([category, meta]) => {
            const skills = SKILLS.filter((s) => s.category === category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="group relative bg-[#0F1219] border border-[rgba(255,255,255,0.05)] rounded-xl p-6 hover:border-[rgba(255,255,255,0.1)] transition-all duration-300"
              >
                {/* Top glow accent */}
                <div
                  className="absolute inset-x-0 top-0 h-px rounded-t-xl opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
                />

                <h3
                  className="font-mono text-xs tracking-widest uppercase mb-6"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </h3>

                <div className="flex flex-col gap-4">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-mono text-sm text-[#FFFFFF]">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs" style={{ color: meta.color }}>
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
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
                          style={{
                            background: `linear-gradient(90deg, ${meta.color}80, ${meta.color})`,
                            boxShadow: `0 0 8px ${meta.color}60`,
                          }}
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
