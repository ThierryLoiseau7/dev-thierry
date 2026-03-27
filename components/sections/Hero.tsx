"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { GradientButton } from "@/components/ui/GradientButton";

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const COUNT = 80;
    const MAX_DIST = 140;

    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.6,
      hue: Math.random() < 0.6 ? 195 : Math.random() < 0.5 ? 270 : 145,
    }));

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue},100%,65%,0.7)`;
        ctx!.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.18;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `rgba(57,255,20,${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
    />
  );
}

/* ─── Photo Slideshow ─── */
const PHOTOS = ["/thierry1.jpg", "/thierry2.jpg", "/thierry3.jpg"];

function PhotoSlideshow() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % PHOTOS.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -100 : 100, opacity: 0, scale: 0.9 }),
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ perspective: "800px" }}>
        {/* Spinning gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full"
          style={{
            inset: "-3px",
            background: "conic-gradient(from 0deg, #39FF14, #FF007F, #00D1FF, #39FF14)",
          }}
        />
        {/* Dark ring separator */}
        <div
          className="absolute rounded-full bg-[#0B0E14] z-[1]"
          style={{ inset: "2px" }}
        />
        {/* Photo */}
        <div
          className="relative overflow-hidden rounded-full z-[2]"
          style={{ width: 280, height: 280 }}
        >
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={PHOTOS[current]}
                alt={`Dev Thierry ${current + 1}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Online dot */}
        <div className="absolute bottom-4 right-4 w-5 h-5 bg-[#00D1FF] rounded-full border-2 border-[#0B0E14] shadow-[0_0_14px_rgba(0,209,255,0.9)] z-10" />
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {PHOTOS.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            animate={{
              width: i === current ? 22 : 8,
              backgroundColor: i === current ? "#39FF14" : "#2a2a3a",
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full border-none outline-none cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Hero ─── */
const ROLES = ["Full-Stack Developer", "Web3 Developer", "AI Agent Builder"];

export function Hero() {
  const typed = useTypewriter(ROLES, 75, 2200);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0E14]"
    >
      <ParticleCanvas />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(57,255,20,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(255,0,127,0.06)_0%,transparent_60%)] pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0E14] to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(57,255,20,0.2)] bg-[rgba(57,255,20,0.05)] backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
            <span className="font-mono text-xs tracking-[0.3em] text-[#39FF14] uppercase">
              Available for Projects
            </span>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="animate-float"
        >
          <PhotoSlideshow />
        </motion.div>

        {/* Name with gradient */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
        >
          <h1
            className="font-heading font-bold tracking-tight"
            style={{
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
              lineHeight: 1.05,
              background: "linear-gradient(135deg, #FFFFFF 25%, #39FF14 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Dev Thierry
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="h-8 flex items-center"
        >
          <span className="font-mono text-lg md:text-xl text-[#8892a4]">
            {typed}
            <span className="inline-block w-0.5 h-5 bg-[#39FF14] ml-0.5 animate-pulse align-middle" />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.56 }}
          className="max-w-xl text-[#8892a4] text-base md:text-lg leading-relaxed"
        >
          7 years building for the web. From full-stack SaaS to DeFi protocols
          to autonomous AI agents — I architect systems that scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <GradientButton href="#projects" variant="primary">
            View My Work
          </GradientButton>
          <GradientButton href="#agent" variant="outline">
            Talk to My Agent
          </GradientButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex gap-8 md:gap-16 pt-4"
        >
          {[
            { value: "7+", label: "Years Exp." },
            { value: "30+", label: "Projects" },
            { value: "3", label: "Tech Eras" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-mono text-2xl md:text-3xl font-bold text-[#39FF14]">
                {value}
              </div>
              <div className="font-mono text-[11px] text-[#4a5568] tracking-widest uppercase mt-1">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#4a5568] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[rgba(57,255,20,0.5)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
