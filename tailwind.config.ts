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
        cream: "#f5f5f0",
        "cream-alt": "#efefea",
        "cream-dark": "#e5e5e0",
        "ink": "#1a1a1a",
        "ink-mid": "#555555",
        "ink-muted": "#909090",
        "ink-faint": "#c0c0c0",
        "phase-webdev": "#16a34a",
        "phase-web3": "#7c3aed",
        "phase-ai": "#0284c7",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        work: ["var(--font-work)", "Work Sans", "system-ui", "sans-serif"],
        heading: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "soft": "0 4px 24px rgba(0,0,0,0.06)",
        "soft-hover": "0 8px 40px rgba(0,0,0,0.1)",
        "card": "0 2px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.1)",
      },
      animation: {
        "spin-slow": "spin-slow 14s linear infinite",
        "float": "float-gentle 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
