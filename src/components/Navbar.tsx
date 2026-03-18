// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Coffee, Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { User } from "lucide-react";

export default function Navbar({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const { toggleAuthDrawer } = useUserStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Navbar scroll effect
    ScrollTrigger.create({
      start: "top=-10",
      end: "bottom=top",
      onUpdate: (self) => {
        const nav = document.getElementById("main-navbar");
        if (self.direction === 1) { // Scrolling down
          nav?.classList.add("bg-espresso/90", "backdrop-blur-md", "shadow-lg", "border-b", "border-cream/5");
          nav?.classList.remove("bg-transparent");
        } else if (self.direction === -1 && self.scroll() < 50) { // Scrolling up near top
          nav?.classList.add("bg-transparent");
          nav?.classList.remove("bg-espresso/90", "backdrop-blur-md", "shadow-lg", "border-b", "border-cream/5");
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
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent py-4 px-6 md:px-12 flex items-center justify-between"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-playfair tracking-wide text-cream">
        <span>Auroma</span>
        <Coffee className="w-5 h-5 text-caramel" />
      </Link>

      {/* Desktop Links */}
      <nav className="hidden md:flex items-center gap-8 text-cream/90 font-dm-sans text-sm tracking-wide">
        <Link href="#menu" className="hover:text-caramel transition-colors">Menu</Link>
        <Link href="#features" className="hover:text-caramel transition-colors">Features</Link>
        <Link href="#build-your-ritual" className="hover:text-caramel transition-colors">Build Your Ritual</Link>
        <Link href="#mood-brew-scan" className="hover:text-caramel transition-colors">Mood Scan</Link>
      </nav>

      {/* Actions */}
      <div className="hidden md:flex items-center gap-4">
        {/* User Rewards Button */}
        <button 
          onClick={toggleAuthDrawer} 
          className="p-2.5 bg-cream-dark border border-espresso/10 rounded-full hover:bg-cream-dark/90 transition shadow-sm cursor-pointer"
        >
          <User className="w-5 h-5 text-espresso" />
        </button>

        {/* Cart Button */}
        <button 
          onClick={toggleCart} 
          className="p-2.5 relative bg-cream-dark border border-espresso/10 rounded-full hover:bg-cream-dark/90 transition shadow-sm cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5 text-espresso" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-caramel text-espresso text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              {itemCount}
            </span>
          )}
        </button>

        {/* CTA Button */}
        <button 
          onClick={onOpenQuiz}
          className="px-6 py-2.5 bg-caramel hover:bg-caramel/90 text-espresso font-semibold rounded-full text-sm font-dm-sans shadow-[0_0_10px_rgba(201,137,58,0.3)] hover:shadow-[0_0_20px_rgba(201,137,58,0.5)] transition-all duration-300 cursor-pointer"
        >
          Find My Coffee
        </button>
      </div>

      {/* Mobile Actions (Menu Toggle & Cart) */}
      <div className="flex items-center gap-3 md:hidden">
        <button 
          onClick={toggleAuthDrawer} 
          className="p-2 relative bg-cream-dark border border-espresso/10 rounded-full cursor-pointer"
        >
          <User className="w-4 h-4 text-espresso" />
        </button>

        <button 
          onClick={toggleCart} 
          className="p-2 relative bg-cream-dark border border-espresso/10 rounded-full cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-espresso" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-caramel text-espresso text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
              {itemCount}
            </span>
          )}
        </button>
        <button className="text-cream" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-espresso/95 backdrop-blur-md border-b border-cream/10 p-6 flex flex-col gap-5 md:hidden text-cream font-dm-sans font-medium z-40"
          >
            <Link href="#menu" onClick={() => setIsOpen(false)} className="hover:text-caramel">Menu</Link>
            <Link href="#features" onClick={() => setIsOpen(false)} className="hover:text-caramel">Features</Link>
            <Link href="#build-your-ritual" onClick={() => setIsOpen(false)} className="hover:text-caramel">Build Your Ritual</Link>
            <Link href="#mood-brew-scan" onClick={() => setIsOpen(false)} className="hover:text-caramel">Mood Scan</Link>

            <button 
              onClick={() => { onOpenQuiz(); setIsOpen(false); }}
              className="w-full mt-2 px-6 py-2.5 bg-caramel text-espresso font-semibold rounded-full shadow-[0_0_10px_rgba(201,137,58,0.3)] cursor-pointer"
            >
              Find My Coffee
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
