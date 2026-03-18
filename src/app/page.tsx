"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BuildYourRitual from "@/components/BuildYourRitual";
import RoastRoulette from "@/components/RoastRoulette";
import dynamic from "next/dynamic";

const MoodBrewScan = dynamic(() => import("@/components/MoodBrewScan"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-20 bg-cream flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-caramel border-t-transparent rounded-full animate-spin" />
    </div>
  )
});
import MenuTeaser from "@/components/MenuTeaser";

import Footer from "@/components/Footer";
import BrewBlueprintQuiz from "@/components/BrewBlueprintQuiz";

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main className="relative w-full">
      <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />
      <HeroSection onOpenQuiz={() => setIsQuizOpen(true)} />
      <FeaturesSection onOpenQuiz={() => setIsQuizOpen(true)} />
      <BuildYourRitual />
      <RoastRoulette />
      <MoodBrewScan />
      <MenuTeaser />

      <Footer />



      {/* Quiz Interactive Overlay */}
      <BrewBlueprintQuiz 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
      />
    </main>
  );
}
