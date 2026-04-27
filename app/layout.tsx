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
  metadataBase: new URL("https://dev-thierry.vercel.app"),
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
    url: "https://dev-thierry.vercel.app",
    siteName: "Dev Thierry",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Thierry — Full-Stack Developer & AI Agent Dev",
    description:
      "7 years building for the web. From full-stack SaaS to DeFi protocols to autonomous AI agents.",
  },
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
        <LangProvider initialLang={lang}>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
