import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyse de Projet IA — Dev Thierry",
  description:
    "Décris ton projet et l'IA analyse ta stack, ta complexité, ton budget et les services dont tu as besoin. Gratuit, sans inscription.",
  openGraph: {
    title: "Analyse de Projet IA — Dev Thierry",
    description:
      "Décris ton projet et l'IA analyse ta stack, ta complexité, ton budget et les services dont tu as besoin. Gratuit, sans inscription.",
    url: "https://devthierry.com/audit",
    siteName: "Dev Thierry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analyse de Projet IA — Dev Thierry",
    description:
      "Décris ton projet et l'IA analyse ta stack, ta complexité, ton budget et les services dont tu as besoin.",
  },
  alternates: {
    canonical: "https://devthierry.com/audit",
  },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
