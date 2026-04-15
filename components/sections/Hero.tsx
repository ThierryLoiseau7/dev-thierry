"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ─── Spinning Circular Text ─── */
function SpinningCircleText() {
  const text = "DEV THIERRY • FULL STACK DEV • AI AGENT • WEB3 • ";
  return (
    <div className="w-36 h-36 md:w-44 md:h-44 shrink-0 select-none pointer-events-none animate-spin-slow">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <path
            id="spinCircle"
            d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
          />
        </defs>
        <text fontSize="8.5" fill="#1a1a1a" letterSpacing="3" opacity="0.75" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600">
          <textPath href="#spinCircle">{text}</textPath>
        </text>
      </svg>
    </div>
  );
}

/* ─── Hero ─── */
export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#f5f5f0] flex flex-col items-center overflow-hidden"
    >
      {/* Content wrapper */}
      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center pt-36 pb-0">

        {/* ── Big centered headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-[#1a1a1a] text-center leading-[1.05] tracking-tight text-balance"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.6rem)" }}
        >
          Full-Stack Dev for Web,
          <br />
          Web3 &amp; AI Projects
          <br />
          <span className="text-[#888888]">Ready to Scale.</span>
        </motion.h1>

        {/* ── CTA button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1a1a1a] text-white font-semibold text-base hover:bg-[#333333] transition-colors duration-200"
          >
            View My Work
          </a>
        </motion.div>

        {/* ── Photo + Spinning text ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex items-end gap-0 relative"
        >
          {/* Large portrait photo */}
          <div
            className="relative overflow-hidden shrink-0"
            style={{
              width: "clamp(280px, 42vw, 540px)",
              height: "clamp(320px, 48vw, 600px)",
              borderRadius: "24px",
            }}
          >
            <Image
              src="/thierry3.jpg"
              alt="Dev Thierry"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Spinning text — anchored bottom-right of photo */}
          <div className="absolute -right-16 md:-right-20 bottom-8">
            <SpinningCircleText />
          </div>
        </motion.div>

        {/* ── Location badge ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-5 mb-8 flex items-center gap-2 text-[#888888]"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-medium">Remote — Available Worldwide</span>
        </motion.div>

      </div>
    </section>
  );
}
