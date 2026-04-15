"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { TIMELINE } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#f5f5f0]">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          label="About Me"
          title="The Journey"
          subtitle="From crafting web apps to deploying smart contracts to building AI agents — an evolution across the stack."
        />

        <div className="relative">
          {TIMELINE.map((entry, i) => (
            <TimelineItem
              key={entry.year}
              entry={entry}
              index={i}
              isLast={i === TIMELINE.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
