import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formations Crypto & Web3 — Dev Thierry",
  description:
    "Aprann tradin crypto, DeFi, Web3 ak AI avec Dev Thierry. Formations pratiques pour débutants et avancés. Rejoignez la communauté AyitiCoin.",
  keywords: [
    "formation crypto",
    "formation web3",
    "formation trading",
    "apprendre crypto",
    "DeFi formation",
    "blockchain formation",
    "Dev Thierry formations",
    "AyitiCoin",
  ],
  openGraph: {
    title: "Formations Crypto & Web3 — Dev Thierry",
    description:
      "Formations pratiques en Crypto, DeFi, Web3 et AI. Rejoignez la communauté et apprenez avec un dev senior.",
    url: "https://devthierry.com/formations",
    siteName: "Dev Thierry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formations Crypto & Web3 — Dev Thierry",
    description:
      "Formations pratiques en Crypto, DeFi, Web3 et AI. Rejoignez la communauté et apprenez avec un dev senior.",
  },
  alternates: {
    canonical: "https://devthierry.com/formations",
  },
};

export default function FormationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
