import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roast My Website — Dev Thierry",
  description:
    "Feedback brutal et honnête sur ton site web. Design, UX, performance, copywriting — l'IA ne mâche pas ses mots. Gratuit, sans inscription.",
  openGraph: {
    title: "Roast My Website — Dev Thierry",
    description:
      "Feedback brutal et honnête sur ton site web. Design, UX, performance, copywriting — l'IA ne mâche pas ses mots.",
    url: "https://devthierry.com/roast",
    siteName: "Dev Thierry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roast My Website — Dev Thierry",
    description:
      "Feedback brutal et honnête sur ton site web. Design, UX, performance, copywriting — l'IA ne mâche pas ses mots.",
  },
  alternates: {
    canonical: "https://devthierry.com/roast",
  },
};

export default function RoastLayout({ children }: { children: React.ReactNode }) {
  return children;
}
