"use client";

import { useCallback } from "react";
import GenesisIntro from "@/components/act-intro/GenesisIntro";
import Hero from "@/components/Hero";
import WorksSection from "@/components/work/WorksSection";
import About from "@/components/About";
import MoonExitOutro from "@/components/act-outro/MoonExitOutro";

export default function Home() {
  const onIntroDone = useCallback(() => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main>
      <GenesisIntro onComplete={onIntroDone} />
      <Hero />
      <WorksSection />
      <About />
      <MoonExitOutro />
    </main>
  );
}
