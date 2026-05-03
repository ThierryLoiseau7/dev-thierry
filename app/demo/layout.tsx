import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ops Portal Demo — Dev Thierry",
  description:
    "Prototype interactif d'un dashboard client agency. Architecture Next.js, design system, gestion de projets et équipes. Démo live.",
  openGraph: {
    title: "Ops Portal Demo — Dev Thierry",
    description:
      "Prototype interactif d'un dashboard client agency. Architecture Next.js, design system, gestion de projets et équipes.",
    url: "https://devthierry.com/demo",
    siteName: "Dev Thierry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ops Portal Demo — Dev Thierry",
    description:
      "Prototype interactif d'un dashboard client agency. Architecture Next.js, design system, gestion de projets et équipes.",
  },
  alternates: {
    canonical: "https://devthierry.com/demo",
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
