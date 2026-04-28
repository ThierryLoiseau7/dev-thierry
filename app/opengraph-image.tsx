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
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f0f13",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow top-left */}
        <div style={{ position: "absolute", top: "-120px", left: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.2), transparent 65%)" }} />
        {/* Glow bottom-right */}
        <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.22), transparent 65%)" }} />

        {/* Photo — left */}
        <div style={{ width: "430px", height: "100%", flexShrink: 0, position: "relative", display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Dev Thierry"
            src={imgSrc}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
          />
          {/* Right fade */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 50%, #0f0f13 100%)" }} />
          {/* Bottom fade */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0f0f13 0%, transparent 25%)" }} />
        </div>

        {/* Content — right */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 70px 60px 30px" }}>

          {/* Logo + badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
            <div style={{ width: "52px", height: "52px", background: "#1a1a1a", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: 900 }}>DT</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "rgba(0,212,255,0.08)", borderRadius: "100px", border: "1px solid rgba(0,212,255,0.22)" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: "13px", color: "#00d4ff", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Disponible</span>
            </div>
          </div>

          {/* Name */}
          <span style={{ fontSize: "78px", fontWeight: 900, color: "#ffffff", lineHeight: 1.0, letterSpacing: "-3px", marginBottom: "16px" }}>
            Dev Thierry
          </span>

          {/* Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "36px" }}>
            <span style={{ fontSize: "22px", fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>
              Ton Dev &amp; Formateur en
            </span>
            <span style={{ fontSize: "26px", fontWeight: 800, color: "#00d4ff" }}>
              IA · Blockchain · Web3 · Formations
            </span>
          </div>

          {/* Tech tags */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "36px" }}>
            {["Next.js", "Solidity", "Claude API", "Web3"].map((tag) => (
              <span key={tag} style={{ padding: "8px 18px", background: "rgba(255,255,255,0.06)", borderRadius: "100px", fontSize: "14px", color: "rgba(255,255,255,0.6)", fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)" }}>
                {tag}
              </span>
            ))}
          </div>

          {/* URL */}
          <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.05em" }}>
            devthierry.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
