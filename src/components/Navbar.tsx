"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Coffee, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Navbar scroll effect
    ScrollTrigger.create({
      start: "top=-10",
      end: "bottom=top",
      onUpdate: (self) => {
        const nav = document.getElementById("main-navbar");
        if (self.direction === 1) { // Scrolling down
          nav?.classList.add("bg-espresso", "shadow-md");
          nav?.classList.remove("bg-transparent");
        } else if (self.direction === -1 && self.scroll() < 50) { // Scrolling up near top
          nav?.classList.add("bg-transparent");
          nav?.classList.remove("bg-espresso", "shadow-md");
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <header 
      id="main-navbar" 
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-transparent py-4 px-6 md:px-12 flex items-center justify-between"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-playfair tracking-wide text-cream">
        <span>Auroma</span>
        <Coffee className="w-5 h-5 text-caramel animate-pulse" />
      </Link>

      {/* Desktop Links */}
      <nav className="hidden md:flex items-center gap-8 text-cream/90 font-dm-sans text-sm tracking-wide">
        <Link href="#menu" className="hover:text-caramel transition-colors">Menu</Link>
        <Link href="#story" className="hover:text-caramel transition-colors">Our Story</Link>
        <Link href="#quiz" className="hover:text-caramel transition-colors">Find Your Brew</Link>
        <Link href="#build-your-ritual" className="hover:text-caramel transition-colors">Build Your Ritual</Link>
        <Link href="#roast-roulette" className="hover:text-caramel transition-colors">Roast Roulette</Link>
        <Link href="#mood-brew-scan" className="hover:text-caramel transition-colors">Mood Scan</Link>
        <Link href="#visit" className="hover:text-caramel transition-colors">Visit Us</Link>

      </nav>

      {/* CTA Button */}
      <div className="hidden md:block">
        <Link href="#quiz">
          <button className="px-6 py-2.5 bg-caramel hover:bg-caramel/90 text-espresso font-semibold rounded-full text-sm font-dm-sans shadow-[0_0_10px_var(--color-caramel)] hover:shadow-[0_0_20px_var(--color-caramel)] transition-all duration-300">
            Find My Coffee
          </button>
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <button className="md:hidden text-cream" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-espresso border-b border-cream/10 p-6 flex flex-col gap-5 md:hidden text-cream font-dm-sans font-medium z-40"
          >
            <Link href="#menu" onClick={() => setIsOpen(false)} className="hover:text-caramel">Menu</Link>
            <Link href="#story" onClick={() => setIsOpen(false)} className="hover:text-caramel">Our Story</Link>
            <Link href="#quiz" onClick={() => setIsOpen(false)} className="hover:text-caramel">Find Your Brew</Link>
            <Link href="#build-your-ritual" onClick={() => setIsOpen(false)} className="hover:text-caramel">Build Your Ritual</Link>
            <Link href="#roast-roulette" onClick={() => setIsOpen(false)} className="hover:text-caramel">Roast Roulette</Link>
            <Link href="#mood-brew-scan" onClick={() => setIsOpen(false)} className="hover:text-caramel">Mood Scan</Link>
            <Link href="#visit" onClick={() => setIsOpen(false)} className="hover:text-caramel">Visit Us</Link>

            <Link href="#quiz" onClick={() => setIsOpen(false)}>
              <button className="w-full mt-2 px-6 py-2.5 bg-caramel text-espresso font-semibold rounded-full shadow-[0_0_10px_var(--color-caramel)]">
                Find My Coffee
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
