"use client";

import { useCallback } from "react";
import GenesisIntro from "@/components/act-intro/GenesisIntro";
import PersonalCard from "@/components/act-paper/PersonalCard";
import TraitsGrid from "@/components/act-paper/TraitsGrid";
import FilmStrip from "@/components/act-paper/FilmStrip";
import ContemporaryPreview from "@/components/act-paper/ContemporaryPreview";
import TimetableShowcase from "@/components/act-paper/TimetableShowcase";
import BadmintonCard from "@/components/act-paper/BadmintonCard";
import MoonExitOutro from "@/components/act-outro/MoonExitOutro";
import TodoPanel from "@/components/TodoPanel";

export default function Home() {
  const onIntroDone = useCallback(() => {
    document.getElementById("personal")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main>
      <GenesisIntro onComplete={onIntroDone} />
      <PersonalCard />
      <TraitsGrid />
      <FilmStrip />
      <ContemporaryPreview />
      <TimetableShowcase />
      <BadmintonCard />
      <MoonExitOutro />
      <TodoPanel />
    </main>
  );
}
