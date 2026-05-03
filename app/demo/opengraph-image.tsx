import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const imgBuffer = fs.readFileSync(path.join(process.cwd(), "public", "thierry.jpg"));
  const imgSrc = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0f0f13", display: "flex", position: "relative", overflow: "hidden" }}>
        {/* Glows */}
        <div style={{ position: "absolute", top: "-120px", left: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.22), transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.15), transparent 65%)" }} />

        {/* Photo — left */}
        <div style={{ width: "420px", height: "100%", flexShrink: 0, position: "relative", display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Dev Thierry" src={imgSrc} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 45%, #0f0f13 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0f0f13 0%, transparent 30%)" }} />
        </div>

        {/* Content — right */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "56px 64px 56px 24px" }}>

          {/* DT logo + tool badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ width: 48, height: 48, background: "#1a1a1a", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ color: "#ffffff", fontSize: 18, fontWeight: 900 }}>DT</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 16px", background: "rgba(124,58,237,0.12)", borderRadius: 100, border: "1px solid rgba(124,58,237,0.3)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed" }} />
              <span style={{ fontSize: 12, color: "#a78bfa", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>Démo interactive</span>
            </div>
          </div>

          {/* Tool name */}
          <span style={{ fontSize: 66, fontWeight: 900, color: "#ffffff", lineHeight: 1.0, letterSpacing: "-2px", marginBottom: 16 }}>
            Ops Portal{"\n"}Demo
          </span>

          {/* Description */}
          <span style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", lineHeight: 1.45, marginBottom: 32, maxWidth: 480 }}>
            Prototype d&apos;un dashboard client agency. Projets, équipes, design system — architecture Next.js live.
          </span>

          {/* Tags */}
          <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
            {["Next.js", "Dashboard", "Design System", "Live"].map((tag) => (
              <span key={tag} style={{ padding: "7px 16px", background: "rgba(255,255,255,0.06)", borderRadius: 100, fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)" }}>
                {tag}
              </span>
            ))}
          </div>

          {/* URL */}
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>
            devthierry.com/demo
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
