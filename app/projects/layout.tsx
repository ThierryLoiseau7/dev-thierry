import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets — Dev Thierry",
  description:
    "Portfolio de projets Web3, DeFi, AI Agent et Full-Stack de Dev Thierry. SaaS, smart contracts, bots Telegram, agents autonomes.",
  keywords: [
    "projets web3",
    "portfolio développeur",
    "smart contracts",
    "AI agent projects",
    "DeFi projects",
    "Next.js projects",
    "Dev Thierry portfolio",
  ],
  openGraph: {
    title: "Projets — Dev Thierry",
    description:
      "Web3, DeFi, AI Agent et Full-Stack — découvrez les projets de Dev Thierry.",
    url: "https://devthierry.com/projects",
    siteName: "Dev Thierry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projets — Dev Thierry",
    description:
      "Web3, DeFi, AI Agent et Full-Stack — découvrez les projets de Dev Thierry.",
  },
  alternates: {
    canonical: "https://devthierry.com/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
