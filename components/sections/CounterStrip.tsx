"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18, restDelta: 0.5 });
  const display = useTransform(spring, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const STATS = [
  {
    value: 7,
    suffix: "+",
    label: "Years of Experience",
    sub: "Since 2018",
    color: "#39FF14",
  },
  {
    value: 30,
    suffix: "+",
    label: "Projects Shipped",
    sub: "Web · Web3 · AI",
    color: "#FF007F",
  },
  {
    value: 3,
    suffix: "",
    label: "Tech Revolutions",
    sub: "Mastered each one",
    color: "#00D1FF",
  },
  {
    value: 100,
    suffix: "%",
    label: "Remote & Worldwide",
    sub: "On-web. On-chain.",
    color: "#39FF14",
  },
];

export function CounterStrip() {
  return (
    <section className="py-20 border-y border-[rgba(255,255,255,0.05)] bg-[#0F1219] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(57,255,20,0.03)_50%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="text-center relative"
            >
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-14 bg-[rgba(255,255,255,0.05)]" />
              )}
              <div
                className="font-mono text-4xl md:text-5xl font-bold tabular-nums"
                style={{ color: stat.color }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-heading text-sm font-semibold text-[#FFFFFF] mt-2">
                {stat.label}
              </div>
              <div className="font-mono text-[11px] text-[#4a5568] mt-1 tracking-wide">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
