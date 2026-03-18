"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BuildYourRitual from "@/components/BuildYourRitual";
import RoastRoulette from "@/components/RoastRoulette";
import MoodBrewScan from "@/components/MoodBrewScan";
import MenuTeaser from "@/components/MenuTeaser";

import Footer from "@/components/Footer";
import BrewBlueprintQuiz from "@/components/BrewBlueprintQuiz";

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main className="relative w-full">
      <Navbar />
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
