"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/constants";
import type { GalleryItem } from "@/lib/types";

type Filter = "all" | GalleryItem["category"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "design", label: "Graphic Design" },
  { value: "video", label: "Video Editing" },
];

/* ─────────────────────────────────────────────────────────── */
export function Gallery() {
  const [active, setActive] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered =
    active === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === active);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (!lightbox) return;
      const idx = filtered.findIndex((i) => i.id === lightbox.id);
      setLightbox(filtered[(idx + dir + filtered.length) % filtered.length]);
    },
    [lightbox, filtered]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, navigate]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      {/* ── Ambient glow blobs ── */}
      <div
        aria-hidden
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -30%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          transform: "translate(40%, 30%)",
        }}
      />

      {/* ── Manifesto block ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          Creative Direction
        </motion.p>

        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-black leading-none tracking-tight"
            style={{
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
              color: "rgba(255,255,255,0.12)",
              WebkitTextStroke: "1px rgba(255,255,255,0.18)",
            }}
          >
            AI executes.
          </motion.h2>
        </div>

        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-black leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
          >
            I create.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl"
        >
          <p
            className="text-lg leading-relaxed font-work"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Yes, AI can materialize your idea — but{" "}
            <span className="text-white font-semibold">
              creativity, vision, and the strategy to stand out
            </span>{" "}
            are still human. I don&apos;t just sell services — I deliver the
            creative edge and marketing intelligence that make your brand{" "}
            <span style={{ color: "#00d4ff" }} className="font-semibold">
              impossible to ignore.
            </span>
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 h-px origin-left"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
      </div>

      {/* ── Gallery body ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-28">

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className="text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-200"
              style={
                active === value
                  ? {
                      background: "#ffffff",
                      borderColor: "#ffffff",
                      color: "#0d0d0d",
                    }
                  : {
                      background: "transparent",
                      borderColor: "rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.45)",
                    }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            {filtered.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => setLightbox(item)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p
            className="text-center py-20 text-sm"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            No items in this category yet.
          </p>
        )}
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

/* ─── 3D Tilt Card ──────────────────────────────────────────── */
function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), {
    stiffness: 200, damping: 25,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 200, damping: 25,
  });
  const glareX = useTransform(rawX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(rawY, [-0.5, 0.5], ["0%", "100%"]);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const thumb = item.thumbnail ?? item.src;
  const isVideo = item.type === "video";
  const isDesign = item.category === "design";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.65,
        delay: (index % 6) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="break-inside-avoid mb-4"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 900,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl overflow-hidden cursor-pointer"
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`View ${item.title}`}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image */}
        <Image
          src={thumb}
          alt={item.title}
          width={600}
          height={400}
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Glare sheen */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08), transparent 65%)`,
          }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />

        {/* Info reveal */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350">
          <span
            className="inline-block text-[9px] font-black tracking-[0.22em] uppercase px-2.5 py-1 rounded-full mb-2"
            style={{
              background: isDesign
                ? "rgba(0,212,255,0.2)"
                : "rgba(124,58,237,0.25)",
              color: isDesign ? "#00d4ff" : "#a78bfa",
              border: `1px solid ${isDesign ? "rgba(0,212,255,0.3)" : "rgba(124,58,237,0.35)"}`,
            }}
          >
            {isDesign ? "Graphic Design" : "Video"}
          </span>
          <p className="text-white font-bold text-sm leading-snug">{item.title}</p>
          {item.year && (
            <p className="text-white/50 text-xs mt-0.5">{item.year}</p>
          )}
        </div>

        {/* Video play button */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
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
      key="lb-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 transition-colors z-10"
          style={{ color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          aria-label="Close"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Media */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              controls
              autoPlay
              className="w-full max-h-[72vh] object-contain bg-black"
            />
          ) : (
            <Image
              src={item.src}
              alt={item.title}
              width={1400}
              height={900}
              className="w-full max-h-[72vh] object-contain bg-black"
              priority
            />
          )}
        </div>

        {/* Info + nav */}
        <div className="mt-5 flex items-end justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-base truncate">{item.title}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {tag}
                </span>
              ))}
              {item.year && (
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {item.year}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={onPrev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.16)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
              }}
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={onNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.16)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
              }}
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
