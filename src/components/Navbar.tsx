// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Coffee, Menu, X, ShoppingBag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { User } from "lucide-react";

export default function Navbar({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const { toggleAuthDrawer } = useUserStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const checkScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-4 px-6 md:px-12 flex items-center justify-between ${
        isScrolled 
          ? "bg-espresso/70 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3" 
          : "bg-transparent py-6"
      }`}
    >
      {/* Logo */}
      <Link 
        href="/" 
        className="flex items-center gap-2 group"
      >
        <div className="relative">
            <Coffee className="w-6 h-6 text-caramel group-hover:rotate-12 transition-transform" />
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute -top-1 -right-1"
            >
                <Sparkles className="w-2 h-2 text-caramel/50" />
            </motion.div>
        </div>
        <span className="text-2xl font-black font-playfair tracking-tighter text-cream uppercase">
            Auroma
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-10">
        {[
          { name: "Menu", href: "#menu" },
          { name: "Features", href: "#features" },
          { name: "The Lab", href: "#mood-brew-scan" },
          { name: "Craft", href: "#our-craft" }
        ].map((link) => (
          <Link 
            key={link.name}
            href={link.href}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-cream/60 hover:text-caramel transition-all"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Action Suite */}
      <div className="flex items-center gap-3">
        {/* Find My Coffee (Desktop) */}
        <button 
           onClick={onOpenQuiz}
           className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-caramel hover:bg-caramel/90 text-espresso font-black rounded-xl text-[10px] uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(212,168,83,0.3)] hover:translate-y-[-2px] active:scale-95"
        >
          Find My Coffee
        </button>

        {/* User Account */}
        <button 
          onClick={toggleAuthDrawer}
          className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-cream hover:bg-white/10 transition-all"
        >
          <User className="w-4 h-4" />
        </button>

        {/* Cart Trigger */}
        <button 
          onClick={toggleCart}
          className="group relative w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-cream hover:bg-white/10 transition-all"
        >
          <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5 bg-caramel text-espresso text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg border-2 border-espresso"
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center bg-caramel rounded-xl text-espresso shadow-lg"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[90] bg-espresso flex flex-col pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {[
                { name: "Digital Menu", href: "#menu" },
                { name: "Coffee Features", href: "#features" },
                { name: "Build Your Ritual", href: "#build-your-ritual" },
                { name: "Mood Scan", href: "#mood-brew-scan" }
              ].map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-black font-playfair text-cream uppercase hover:text-caramel transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-12">
               <button 
                 onClick={() => { onOpenQuiz(); setIsMobileMenuOpen(false); }}
                 className="w-full py-5 bg-caramel text-espresso font-black rounded-2xl flex items-center justify-center gap-3 text-lg"
               >
                 Find My Coffee
                 <Sparkles className="w-5 h-5" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
