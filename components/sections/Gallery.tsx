"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/constants";
import type { GalleryItem } from "@/lib/types";

/* ─────────────────────────────────────────────────────────── */
export function Gallery() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (!lightbox) return;
      const idx = GALLERY_ITEMS.findIndex((i) => i.id === lightbox.id);
      setLightbox(GALLERY_ITEMS[(idx + dir + GALLERY_ITEMS.length) % GALLERY_ITEMS.length]);
    },
    [lightbox]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (!lightbox) return;
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, navigate]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4"
              style={{ color: "rgba(0,212,255,0.7)" }}
            >
              Creative Direction
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-black leading-none tracking-tight"
                style={{
                  fontSize: "clamp(2.4rem, 6vw, 5rem)",
                  color: "rgba(255,255,255,0.12)",
                  WebkitTextStroke: "1px rgba(255,255,255,0.18)",
                }}
              >
                AI executes.{" "}
                <span style={{ color: "#fff", WebkitTextStroke: "0px" }}>
                  I create.
                </span>
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Creativity, vision, and strategy to stand out — still human.
            <span style={{ color: "rgba(0,212,255,0.8)" }}> Impossible to ignore.</span>
          </motion.p>
        </div>

        {/* ── Compact thumbnail strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-3 gap-3"
        >
          {GALLERY_ITEMS.map((item, i) => (
            <Thumb key={item.id} item={item} index={i} onClick={() => setLightbox(item)} />
          ))}
        </motion.div>

        {/* ── Bottom line ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 h-px origin-left"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            item={lightbox}
            onClose={closeLightbox}
            onPrev={() => navigate(-1)}
            onNext={() => navigate(1)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Thumbnail ─────────────────────────────────────────────── */
function Thumb({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover="hover"
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg text-left focus:outline-none"
      style={{ aspectRatio: "3/4" }}
      aria-label={`View ${item.title}`}
    >
      <Image
        src={item.thumbnail ?? item.src}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 33vw, 25vw"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: "rgba(0,0,0,0.55)" }}
      />

      {/* Zoom icon */}
      <motion.div
        variants={{ hover: { opacity: 1, scale: 1 } }}
        initial={{ opacity: 0, scale: 0.8 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zM11 8v6M8 11h6" />
          </svg>
        </div>
        <span className="text-white text-xs font-semibold tracking-wide opacity-80">{item.title}</span>
      </motion.div>

      {/* Index badge */}
      <span
        className="absolute top-2.5 left-2.5 text-[10px] font-black tabular-nums"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        0{index + 1}
      </span>
    </motion.button>
  );
}

/* ─── Lightbox ──────────────────────────────────────────────── */
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.93, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 transition-colors z-10"
          style={{ color: "rgba(255,255,255,0.45)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}>
          <Image
            src={item.src}
            alt={item.title}
            width={1400}
            height={900}
            className="w-full max-h-[74vh] object-contain bg-black"
            priority
          />
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm">{item.title}</p>
            {item.year && (
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.year}</p>
            )}
          </div>

          <div className="flex gap-2">
            {[{ fn: onPrev, label: "Previous", d: "M15 19l-7-7 7-7" }, { fn: onNext, label: "Next", d: "M9 5l7 7-7 7" }].map(({ fn, label, d }) => (
              <button
                key={label}
                onClick={fn}
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
