"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";

export default function HeroSection({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  useEffect(() => {

    // GSAP floating particles animation
    const particles = document.querySelectorAll(".particle");
    particles.forEach((p) => {
      gsap.to(p, {
        y: "-150vh",
        x: `+=${Math.random() * 50 - 25}px`,
        opacity: 0,
        duration: Math.random() * 5 + 4,
        ease: "power1.out",
        repeat: -1,
        delay: Math.random() * 4,
      });
    });

    // Subtitle reveal
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  return (
    <section 
      id="hero" 
      className="relative w-full h-screen bg-espresso flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Radial Glow in center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-caramel)_0%,transparent_60%)] opacity-10 pointer-events-none" />

      {/* Floating Particle Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute bottom-[-20px] w-1.5 h-1.5 rounded-full bg-caramel opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 1 + 0.5})`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center gap-5">
        <h1 className="hero-text text-4xl md:text-7xl font-bold font-playfair text-cream tracking-tight leading-dense">
          We Read the Room.<br />
          Then We Make the Coffee.
        </h1>
        
        <p className="hero-text text-base md:text-lg text-cream/80 font-dm-sans font-medium max-w-xl">
          Four AI-powered ways to find your perfect cup.<br />
          No guesswork. Just great coffee.
        </p>

        {/* Buttons */}
        <div className="hero-text mt-4 flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={onOpenQuiz}
            className="px-8 py-3.5 bg-caramel hover:bg-caramel/90 text-espresso font-bold rounded-full font-dm-sans shadow-[0_0_15px_var(--color-caramel)] hover:shadow-[0_0_25px_var(--color-caramel)] transition-all duration-300 transform hover:scale-102"
          >
            Find My Coffee Match →
          </button>
          <Link href="#features">
            <button className="px-8 py-3.5 border-2 border-cream/40 hover:border-cream text-cream font-medium rounded-full font-dm-sans transition-all duration-300">
              Scan My Mood
            </button>
          </Link>
        </div>
      </div>


      {/* Scroll Down Arrow */}
      <Link href="#features" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 hover:text-cream animate-bounce transition-colors">
        <ArrowDown className="w-8 h-8" />
      </Link>
    </section>
  );
}
