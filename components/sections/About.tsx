"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { TIMELINE } from "@/lib/constants";
import { useLang } from "@/lib/i18n/context";

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="py-24 md:py-32 bg-[#f5f5f0]">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          label={t.about.label}
          title={t.about.title}
          subtitle={t.about.subtitle}
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
