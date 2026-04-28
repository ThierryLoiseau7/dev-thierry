import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Work_Sans } from "next/font/google";
import { cookies } from "next/headers";
import { LangProvider } from "@/lib/i18n/context";
import type { Lang } from "@/lib/i18n/translations";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devthierry.com"),
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
    "développeur freelance",
    "blockchain developer",
  ],
  authors: [{ name: "Dev Thierry", url: "mailto:devthierry@pm.me" }],
  alternates: {
    canonical: "https://devthierry.com",
  },
  openGraph: {
    title: "Dev Thierry — Full-Stack Developer & AI Agent Dev",
    description:
      "7 years building for the web. From full-stack SaaS to DeFi protocols to autonomous AI agents.",
    type: "website",
    url: "https://devthierry.com",
    siteName: "Dev Thierry",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Thierry — Full-Stack Developer & AI Agent Dev",
    description:
      "7 years building for the web. From full-stack SaaS to DeFi protocols to autonomous AI agents.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://devthierry.com/#person",
      name: "Dev Thierry",
      url: "https://devthierry.com",
      email: "devthierry@pm.me",
      telephone: "+33646899310",
      jobTitle: "Full-Stack Developer & AI Agent Developer",
      description:
        "Senior developer with 7 years of experience in Web Development, Web3, and AI Agent architecture.",
      knowsAbout: ["TypeScript", "Next.js", "Web3", "Solidity", "AI Agents", "DeFi", "Blockchain"],
    },
    {
      "@type": "WebSite",
      "@id": "https://devthierry.com/#website",
      url: "https://devthierry.com",
      name: "Dev Thierry",
      description: "Portfolio & formations de Dev Thierry — Web Dev · Web3 · AI Agent",
      author: { "@id": "https://devthierry.com/#person" },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value ?? "en") as Lang;

  return (
    <html lang={lang}>
      <body className={`${jakarta.variable} ${workSans.variable} antialiased bg-[#f5f5f0]`}>
        {/* Structured data — helps Google understand who Dev Thierry is */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Disable browser scroll restoration so the page always starts at the top */}
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual';window.scrollTo(0,0);" }} />
        <LangProvider initialLang={lang}>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
