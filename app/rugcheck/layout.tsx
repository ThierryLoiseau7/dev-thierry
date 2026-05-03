import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rug Pull Detector — Dev Thierry",
  description:
    "Scanne n'importe quel memecoin en secondes. Market cap, liquidité, holders, sécurité du contrat — détecte les arnaques avant d'investir. Gratuit.",
  openGraph: {
    title: "Rug Pull Detector — Dev Thierry",
    description:
      "Scanne n'importe quel memecoin en secondes. Market cap, liquidité, holders, sécurité du contrat — détecte les arnaques avant d'investir.",
    url: "https://devthierry.com/rugcheck",
    siteName: "Dev Thierry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rug Pull Detector — Dev Thierry",
    description:
      "Scanne n'importe quel memecoin en secondes. Market cap, liquidité, holders, sécurité — détecte les arnaques avant d'investir.",
  },
  alternates: {
    canonical: "https://devthierry.com/rugcheck",
  },
};

export default function RugcheckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
