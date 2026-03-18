"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function HeroSection({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  useEffect(() => {

    // GSAP floating particles animation
    const particles = document.querySelectorAll(".particle");
    particles.forEach((p) => {
      // client-side randomizers to fix Hydration Mismatch
      gsap.set(p, {
        left: `${Math.random() * 100}%`,
        scale: Math.random() * 0.8 + 0.4,
      });

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
      {/* Cinematic Background Video Upgrade */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-coffee-beans-falling-in-slow-motion-42662-preview.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay gradient over video */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/60 to-espresso" />
      </div>

      {/* Radial Glow in center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-caramel)_0%,transparent_60%)] opacity-15 pointer-events-none" />

      {/* Noise Texture layer */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />

      {/* Floating Particle Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute bottom-[-20px] w-1.5 h-1.5 rounded-full bg-caramel opacity-30"
            style={{
              left: `${(i * 5) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center gap-5">
        <h1 className="hero-text text-5xl sm:text-6xl md:text-7xl font-bold font-playfair text-cream tracking-tight leading-dense">
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
          <Link href="#mood-brew-scan">
            <button className="px-8 py-3.5 border-2 border-cream/40 hover:border-cream text-cream font-medium rounded-full font-dm-sans transition-all duration-300 cursor-pointer">
              Scan My Mood
            </button>
          </Link>
        </div>
      </div>


      {/* Scroll Down Arrow */}
      <Link href="#features" className="absolute bottom-16 left-1/2 -translate-x-1/2 text-cream/60 hover:text-cream animate-bounce transition-colors">
        <ArrowDown className="w-8 h-8" />
      </Link>

      {/* Wave bottom divider (espresso -> cream) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px]" fill="#FAF4EC" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}
