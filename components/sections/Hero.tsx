"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ─── Letter-by-Letter Animator ─── */
function AdLetters({
  text,
  delay = 0,
  className = "",
  style = {},
}: {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.032, delayChildren: delay } },
  };
  const letter = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap", ...style }}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letter} style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

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

/* ─── Styled Photo ─── */
function StyledPhoto() {
  return (
    <div className="relative shrink-0" style={{ width: "clamp(260px, 38vw, 480px)" }}>

      {/* Frame layer 1 — rotated back-left */}
      <div style={{
        position: "absolute",
        inset: 0,
        transform: "rotate(-4deg) translate(-10px, 10px)",
        border: "2px solid rgba(26,26,26,0.18)",
        borderRadius: "6px",
        zIndex: 0,
      }} />

      {/* Frame layer 2 — rotated back-right */}
      <div style={{
        position: "absolute",
        inset: 0,
        transform: "rotate(2.5deg) translate(8px, 6px)",
        border: "2px solid rgba(26,26,26,0.10)",
        borderRadius: "6px",
        zIndex: 0,
      }} />

      {/* Photo — front, hard border */}
      <div style={{
        position: "relative",
        zIndex: 1,
        border: "2px solid #1a1a1a",
        borderRadius: "6px",
        overflow: "hidden",
        width: "100%",
        height: "clamp(300px, 44vw, 560px)",
        boxShadow: "8px 8px 0px #1a1a1a",
      }}>
        <Image
          src="/thierry3.jpg"
          alt="Dev Thierry"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle gradient overlay bottom */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26,26,26,0.18) 0%, transparent 40%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Corner accent — top-left */}
      <div style={{
        position: "absolute",
        top: -8,
        left: -8,
        width: 28,
        height: 28,
        borderTop: "3px solid #1a1a1a",
        borderLeft: "3px solid #1a1a1a",
        zIndex: 2,
      }} />

      {/* Corner accent — bottom-right */}
      <div style={{
        position: "absolute",
        bottom: -16,
        right: -16,
        width: 28,
        height: 28,
        borderBottom: "3px solid #1a1a1a",
        borderRight: "3px solid #1a1a1a",
        zIndex: 2,
      }} />

    </div>
  );
}



/* ─── Hero ─── */
export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#f5f5f0] flex flex-col items-center"
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
          <StyledPhoto />

          {/* Spinning text — anchored bottom-right of photo */}
          <div className="absolute -right-16 md:-right-20 bottom-8">
            <SpinningCircleText />
          </div>
        </motion.div>

        {/* ── Ad Banner lettre par lettre ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 w-full flex flex-col gap-3"
        >
          <AdLetters
            text="AI can build it"
            delay={0.9}
            className="text-[11px] font-black tracking-[0.35em] uppercase select-none"
            style={{ color: "#888888" }}
          />
          <div>
            <AdLetters
              text="Only you can"
              delay={1.2}
              className="font-heading font-black leading-none tracking-tight select-none"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "#1a1a1a" }}
            />
            <div className="flex items-baseline flex-wrap gap-x-[0.2em]">
              <AdLetters
                text="make it"
                delay={1.6}
                className="font-heading font-black leading-none tracking-tight select-none"
                style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "#1a1a1a" }}
              />
              <AdLetters
                text="matter."
                delay={1.85}
                className="font-heading font-black leading-none tracking-tight select-none"
                style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", color: "#888888" }}
              />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Marquee pub ── */}
      <div
        className="w-full select-none mt-8 overflow-hidden"
        style={{ background: "#1a1a1a" }}
      >
        <div
          className="flex animate-marquee-fast whitespace-nowrap items-center"
          style={{ paddingTop: "18px", paddingBottom: "18px" }}
        >
          {[0, 1].map((r) => (
            <span key={r} className="inline-flex items-center shrink-0">
              {[
                { t: "CREATIVITY",  dim: false },
                { t: "✦",           dim: true  },
                { t: "MARKETING",   dim: false },
                { t: "✦",           dim: true  },
                { t: "VISION",      dim: false },
                { t: "✦",           dim: true  },
                { t: "I AM HERE TO SHOW YOU WHAT YOU CANNOT THINK", dim: false },
                { t: "✦",           dim: true  },
                { t: "THE FUTURE",  dim: false },
                { t: "✦",           dim: true  },
              ].map(({ t, dim }, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    fontSize: t === "✦" ? "10px" : t.length > 20 ? "clamp(0.85rem, 1.8vw, 1.1rem)" : "clamp(1rem, 2vw, 1.35rem)",
                    fontWeight: 800,
                    fontFamily: "var(--font-jakarta), sans-serif",
                    letterSpacing: t === "✦" ? "0" : "0.18em",
                    color: t === "✦" ? "rgba(245,245,240,0.22)" : dim ? "rgba(245,245,240,0.38)" : "#f5f5f0",
                    paddingLeft: t === "✦" ? "22px" : "28px",
                    paddingRight: t === "✦" ? "22px" : "0",
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
