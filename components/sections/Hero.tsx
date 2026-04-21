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

/* ─── Styled Photo ─── */
function StyledPhoto() {
  return (
    <motion.div
      className="relative shrink-0 cursor-pointer"
      style={{ width: "clamp(260px, 38vw, 480px)" }}
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{
        position: "relative",
        width: "100%",
        height: "clamp(300px, 44vw, 560px)",
        border: "1px solid rgba(26,26,26,0.12)",
        borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
        overflow: "hidden",
      }}>
        <Image
          src="/thierry3.jpg"
          alt="Dev Thierry"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </motion.div>
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

      {/* ── Manifeste ── */}
      <div className="w-full mt-6 select-none">
        <div className="w-full max-w-5xl mx-auto px-6">

          {[
            {
              num: "01",
              main: "MARKETING & CREATIVITY",
              sub: "ARE THE FUTURE.",
              delay: 0.9,
            },
            {
              num: "02",
              main: "I'M HERE TO SHOW YOU",
              sub: "WHAT YOU CANNOT THINK.",
              delay: 1.3,
            },
          ].map(({ num, main, sub, delay }) => (
            <motion.div
              key={num}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay }}
              className="group relative"
              style={{ borderTop: "1px solid rgba(26,26,26,0.12)" }}
            >
              {/* Ligne qui s'étend au hover */}
              <motion.div
                style={{
                  position: "absolute",
                  top: -1,
                  left: 0,
                  height: "2px",
                  background: "#1a1a1a",
                  width: "0%",
                }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Mobile: num+sub ligne 1, main ligne 2 pleine largeur
                  Desktop: num | main (flex-1) | sub — tout sur une ligne */}
              <div
                className="flex flex-wrap items-end justify-between gap-x-6 py-7 cursor-default"
                style={{ paddingLeft: "0", paddingRight: "0" }}
              >
                {/* Numéro — toujours en premier */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: delay + 0.2 }}
                  className="order-1 group-hover:text-[#1a1a1a]"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    color: "#bbbbbb",
                    fontFamily: "var(--font-jakarta), sans-serif",
                    minWidth: "28px",
                    paddingBottom: "6px",
                    transition: "color 0.3s",
                  }}
                >
                  {num}
                </motion.span>

                {/* Sous-texte: ordre 2 sur mobile (même ligne que num), ordre 3 sur desktop */}
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: delay + 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="order-2 sm:order-3 sm:min-w-[clamp(100px,18vw,200px)]"
                  style={{
                    fontSize: "clamp(0.65rem, 2.5vw, 0.85rem)",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    color: "#aaaaaa",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-jakarta), sans-serif",
                    textAlign: "right",
                    paddingBottom: "6px",
                  }}
                >
                  {sub}
                </motion.p>

                {/* Texte principal: pleine largeur sur mobile (nouvelle ligne), flex-1 sur desktop */}
                <div className="order-3 sm:order-2 w-full sm:w-auto sm:flex-1 overflow-hidden">
                  <motion.p
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.65, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontSize: "clamp(1.9rem, 4.8vw, 3.8rem)",
                      fontWeight: 900,
                      lineHeight: 1.05,
                      color: "#1a1a1a",
                      fontFamily: "var(--font-heading), sans-serif",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {main}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Ligne de fermeture */}
          <motion.div
            style={{ borderTop: "1px solid rgba(26,26,26,0.12)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          />

        </div>
      </div>

    </section>
  );
}
