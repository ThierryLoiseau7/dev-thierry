import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  // Load photo
  let imgSrc = "";
  try {
    const res = await fetch(`${baseUrl}/thierry.jpg`);
    const buf = await res.arrayBuffer();
    const uint8 = new Uint8Array(buf);
    let binary = "";
    uint8.forEach((b) => { binary += String.fromCharCode(b); });
    imgSrc = `data:image/jpeg;base64,${btoa(binary)}`;
  } catch {
    imgSrc = "";
  }

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
        {/* Background glow left */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,212,255,0.18), transparent 65%)",
          }}
        />
        {/* Background glow right */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent 65%)",
          }}
        />

        {/* Photo side — left */}
        {imgSrc && (
          <div
            style={{
              width: "420px",
              height: "100%",
              flexShrink: 0,
              position: "relative",
              display: "flex",
            }}
          >
            {/* Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Dev Thierry"
              src={imgSrc}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
            {/* Right fade overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, transparent 55%, #0f0f13 100%)",
              }}
            />
            {/* Bottom fade overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, #0f0f13 0%, transparent 30%)",
              }}
            />
          </div>
        )}

        {/* Content side — right */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 70px 60px 40px",
            gap: "0px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                background: "#1a1a1a",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: 900 }}>DT</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                background: "rgba(0,212,255,0.08)",
                borderRadius: "100px",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#28c840" }} />
              <span style={{ fontSize: "13px", color: "#00d4ff", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Disponible
              </span>
            </div>
          </div>

          {/* Main name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px", marginBottom: "20px" }}>
            <span
              style={{
                fontSize: "72px",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.0,
                letterSpacing: "-2px",
              }}
            >
              Dev Thierry
            </span>
          </div>

          {/* Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "36px" }}>
            <span style={{ fontSize: "24px", fontWeight: 600, color: "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>
              Ton Dev & Formateur en
            </span>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                backgroundClip: "text",
                color: "transparent",
                lineHeight: 1.2,
              }}
            >
              IA · Blockchain · Web3 · Formations
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            {["Next.js", "Solidity", "Claude API", "Web3"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 18px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "100px",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* URL */}
          <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.3)", fontWeight: 500, letterSpacing: "0.05em" }}>
            dev-thierry.vercel.app
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
