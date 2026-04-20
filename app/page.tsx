import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { CounterStrip } from "@/components/sections/CounterStrip";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Gallery } from "@/components/sections/Gallery";
import { AIAgent } from "@/components/sections/AIAgent";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f0] overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhatIBuild />
      <CounterStrip />
      <About />
      <Skills />
      <Projects />
      <Gallery />
      <AIAgent />
      <Contact />
      <Footer />
    </main>
  );
}
