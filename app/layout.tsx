import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dev Thierry — Full-Stack Developer & AI Agent Dev",
  description:
    "Senior developer with 7 years of experience in Web Development, Web3, and AI Agent architecture. Building for the web, on-chain, and beyond.",
  keywords: [
    "Dev Thierry",
    "Full Stack Developer",
    "Web3",
    "AI Agent",
    "Next.js",
    "TypeScript",
    "Solidity",
    "Claude API",
  ],
  authors: [{ name: "Dev Thierry", url: "mailto:devthierry@pm.me" }],
  openGraph: {
    title: "Dev Thierry — Full-Stack Developer & AI Agent Dev",
    description:
      "7 years building for the web. From full-stack SaaS to DeFi protocols to autonomous AI agents.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased bg-[#0B0E14]`}>
        {children}
      </body>
    </html>
  );
}
