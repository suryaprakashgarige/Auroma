// src/app/page.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles, Dice5, ScanFace, Sliders } from "lucide-react";

import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import HeroSection from "@/components/HeroSection";
import OurCraft from "@/components/OurCraft";
import Testimonials from "@/components/Testimonials";
import InstagramGallery from "@/components/InstagramGallery";
import DigitalMenu from "@/components/DigitalMenu";
import Footer from "@/components/Footer";

// Lazy-load heavier interactive features for initial page load speed
const BrewBlueprintQuiz = dynamic(() => import("@/components/BrewBlueprintQuiz"), { ssr: false });
const MoodBrewScan = dynamic(() => import("@/components/MoodBrewScan"), { ssr: false });
const RoastRoulette = dynamic(() => import("@/components/RoastRoulette"), { ssr: false });
const BuildYourRitual = dynamic(() => import("@/components/BuildYourRitual"), { ssr: false });

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative w-full bg-cream min-h-screen overflow-x-hidden">
      <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />
      <CartDrawer />

      {/* 1. Hero Section */}
      <HeroSection onTakeQuiz={() => setIsQuizOpen(true)} />

      {/* 2. Our Craft (Story) Section */}
      <OurCraft />

      {/* 3. The Daily Ritual (Digital Menu) Section - Moved UP */}
      <section id="menu" className="py-24 bg-cream flex flex-col items-center">
        <div className="text-center mb-4">
          <span className="font-caveat text-caramel text-xl">Menu</span>
          <h2 className="text-3xl md:text-5xl font-bold font-playfair text-espresso tracking-tight">
            The Daily Ritual
          </h2>
        </div>
        <div className="w-full">
          <DigitalMenu />
        </div>
      </section>

      {/* 4. Bento Box Experience Grid */}
      <section className="relative w-full py-24 bg-espresso px-6 md:px-12 flex flex-col items-center border-y border-white/5">
        <div className="max-w-6xl w-full flex flex-col gap-12">
          
          <div className="text-center">
            <span className="font-caveat text-caramel text-2xl">Discovery</span>
            <h2 className="text-2xl md:text-4xl font-bold font-playfair text-cream tracking-tight mt-1">
              Not sure what to order? <br className="md:hidden" /> Try The Auroma Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] max-w-5xl mx-auto w-full">
            
            {/* Card 1: Mood Brew Scan (Large 2x2) */}
            <motion.div 
              whileHover={{ y: -5 }}
              onClick={() => scrollTo('mood-brew-scan')}
              className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer border border-white/5 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1507133769160-bd8338650444?q=80&w=1200&auto=format&fit=crop" 
                alt="Face Scan Teaser" 
                className="absolute inset-0 w-full h-full object-cover brightness-[0.35] group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent flex flex-col justify-end p-8 gap-2">
                <div className="p-3 bg-caramel/20 rounded-xl w-fit border border-caramel/30">
                  <ScanFace className="w-6 h-6 text-caramel" />
                </div>
                <h3 className="text-2xl font-bold font-playfair text-cream">Mood Brew Scanner</h3>
                <p className="text-cream/70 font-dm-sans text-sm max-w-md">
                  We use accurate face mesh math to read your current mood state and match your nervous system with the ideal temperature and blend.
                </p>
                <div className="mt-2 text-caramel font-bold font-dm-sans text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Launch Scanner &rarr;
                </div>
              </div>
            </motion.div>

            {/* Card 2: Roast Roulette */}
            <motion.div 
              whileHover={{ y: -5 }}
              onClick={() => scrollTo('roast-roulette')}
              className="rounded-3xl overflow-hidden relative group cursor-pointer border border-white/5 shadow-lg bg-white/5 backdrop-blur-md"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <Dice5 className="w-40 h-40 text-cream" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-center p-6 gap-2 text-center items-center">
                <Dice5 className="w-8 h-8 text-caramel mb-2" />
                <h3 className="text-xl font-bold font-playfair text-cream">Roast Roulette</h3>
                <p className="text-cream/60 font-dm-sans text-xs">Can&apos;t decide? Let the universe spin a random pick for your cup.</p>
                <span className="text-caramel font-semibold text-xs mt-1">Spin the Wheel &rarr;</span>
              </div>
            </motion.div>

            {/* Card 3: Recipe Quiz */}
            <motion.div 
              whileHover={{ y: -5 }}
              onClick={() => setIsQuizOpen(true)}
              className="rounded-3xl overflow-hidden relative group cursor-pointer border border-white/5 shadow-lg bg-white/5 backdrop-blur-md"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <Sparkles className="w-40 h-40 text-cream" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-center p-6 gap-2 text-center items-center">
                <Sparkles className="w-8 h-8 text-caramel mb-2" />
                <h3 className="text-xl font-bold font-playfair text-cream">Brew Blueprint Quiz</h3>
                <p className="text-cream/60 font-dm-sans text-xs">Answer 5 fast questions for a 10% discounted bundle match.</p>
                <span className="text-caramel font-semibold text-xs mt-1">Start Quiz &rarr;</span>
              </div>
            </motion.div>

            {/* Card 4: Ritual Builder (Wide) */}
            <motion.div 
              whileHover={{ y: -5 }}
              onClick={() => scrollTo('build-your-ritual')}
              className="md:col-span-3 rounded-3xl overflow-hidden relative group cursor-pointer border border-white/5 shadow-lg bg-white/5 p-8 flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="flex flex-col gap-2">
                <div className="p-2.5 bg-caramel/20 rounded-xl w-fit border border-caramel/30 mb-2">
                  <Sliders className="w-5 h-5 text-caramel" />
                </div>
                <h3 className="text-2xl font-bold font-playfair text-cream">Build Your Ritual</h3>
                <p className="text-cream/70 font-dm-sans text-sm max-w-sm">
                  The ultimate barista workspace. Customize every variable of your extraction with live visual renderings.
                </p>
              </div>
              <div className="inline-flex items-center gap-3 bg-caramel hover:bg-caramel/90 px-5 py-2.5 rounded-full text-espresso font-semibold text-xs font-dm-sans transition-all group-hover:shadow-[0_0_20px_rgba(201,137,58,0.4)]">
                Launch Configurator <Sliders className="w-3.5 h-3.5" />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 5. Embedded Immersive Features */}
      <section id="build-your-ritual" className="py-32 bg-[#F4EDE4] border-y border-espresso/10">
        <BuildYourRitual />
      </section>

      <section id="roast-roulette" className="py-32 bg-espresso text-cream border-y border-white/5">
        <RoastRoulette />
      </section>

      <section id="mood-brew-scan" className="py-32 bg-cream">
        <MoodBrewScan />
      </section>

      {/* 6. Social Proof (Reviews) Section */}
      <Testimonials />

      {/* 7. Gallery & Footer */}
      <InstagramGallery />
      <Footer />

      {/* Modal Quiz Overlay */}
      {isQuizOpen && (
        <BrewBlueprintQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      )}
    </main>
  );
}
