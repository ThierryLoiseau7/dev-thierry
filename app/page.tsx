import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { CounterStrip } from "@/components/sections/CounterStrip";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { AIAgent } from "@/components/sections/AIAgent";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0E14] overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero />
      <WhatIBuild />
      <CounterStrip />
      <About />
      <Skills />
      <Projects />
      <AIAgent />
      <Contact />
      <Footer />
    </main>
  );
}
