import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f5f5f0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Inner border frame */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(26,26,26,0.1)",
            borderRadius: "24px",
            pointerEvents: "none",
          }}
        />

        {/* Top: logo + name + status */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* DT monogram */}
            <div
              style={{
                width: "68px",
                height: "68px",
                background: "#1a1a1a",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#ffffff", fontSize: "26px", fontWeight: 900, letterSpacing: "-1px" }}>
                DT
              </span>
            </div>
            {/* Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "20px", fontWeight: 800, color: "#1a1a1a", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Dev Thierry
              </span>
              <span style={{ fontSize: "12px", color: "#888888", letterSpacing: "0.28em", textTransform: "uppercase" }}>
                Full-Stack · Web3 · AI Agent
              </span>
            </div>
          </div>

          {/* Online badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "rgba(26,26,26,0.06)",
              borderRadius: "100px",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#28c840" }} />
            <span style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: 600 }}>
              Available for projects
            </span>
          </div>
        </div>

        {/* Center: main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span
            style={{
              fontSize: "76px",
              fontWeight: 900,
              color: "#1a1a1a",
              lineHeight: 1.0,
              letterSpacing: "-3px",
            }}
          >
            Building for the Web,
          </span>
          <span
            style={{
              fontSize: "76px",
              fontWeight: 900,
              color: "#aaaaaa",
              lineHeight: 1.0,
              letterSpacing: "-3px",
            }}
          >
            On-Chain &amp; Beyond.
          </span>
        </div>

        {/* Bottom: tags + URL */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {["Next.js", "TypeScript", "Solidity", "Claude API"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 18px",
                  background: "rgba(26,26,26,0.08)",
                  borderRadius: "100px",
                  fontSize: "14px",
                  color: "#1a1a1a",
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "15px", color: "#aaaaaa", fontWeight: 500 }}>
            dev-thierry.vercel.app
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
