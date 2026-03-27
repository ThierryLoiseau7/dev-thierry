import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#ffffff",
          secondary: "#f8fafc",
          card: "#f1f5f9",
        },
        accent: {
          DEFAULT: "#0891b2",
          dim: "#0e7490",
        },
        violet: {
          DEFAULT: "#0e7490",
          light: "#0e7490",
        },
        "text-primary": "#0f172a",
        "text-secondary": "#475569",
        "text-muted": "#94a3b8",
        "phase-webdev": "#0891b2",
        "phase-web3": "#0e7490",
        "phase-ai": "#0891b2",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "Fira Code", "Courier New", "monospace"],
        sans: ["var(--font-dm)", "DM Sans", "system-ui", "sans-serif"],
        heading: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #0891b2, #0e7490)",
        "gradient-hero":
          "linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #ffffff 100%)",
      },
      boxShadow: {
        "glow-accent": "0 0 40px rgba(8,145,178,0.18)",
        "glow-violet": "0 0 40px rgba(14,116,144,0.18)",
        card: "0 4px 24px rgba(0,0,0,0.06)",
        "card-hover":
          "0 8px 40px rgba(0,0,0,0.08), 0 0 20px rgba(8,145,178,0.12)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
