import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ops Portal Demo — Dev Thierry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f0f13",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top — DT badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 900, color: "#0f0f13", letterSpacing: -1 }}>DT</span>
          </div>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
            Démo interactive
          </span>
        </div>

        {/* Center */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            🏢
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontSize: 64, fontWeight: 900, color: "#ffffff", lineHeight: 1, letterSpacing: -2 }}>
              Ops Portal Demo
            </span>
            <span style={{ fontSize: 24, color: "rgba(255,255,255,0.5)", lineHeight: 1.4, maxWidth: 700 }}>
              Prototype d&apos;un dashboard client agency. Projets, équipes, design system — architecture Next.js live.
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em" }}>
            devthierry.com/demo
          </span>
          <div
            style={{
              background: "#7c3aed",
              borderRadius: 100,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Démo live
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
