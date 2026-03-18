"use client";

import { Coffee, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-espresso text-cream border-t border-cream/5 px-6 md:px-12 py-12 flex flex-col items-center gap-8">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-6">
        {/* Logo left */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-1.5 text-xl font-bold font-playfair text-cream">
            <span>Auroma</span>
            <Coffee className="w-4 h-4 text-caramel" />
          </div>
          <p className="text-xs text-cream/50 font-dm-sans">Coffee should understand you.</p>
        </div>

        {/* Links Center */}
        <nav className="flex gap-6 text-sm font-dm-sans text-cream/80">
          <a href="#menu" className="hover:text-caramel transition-colors">Menu</a>
          <a href="#quiz" className="hover:text-caramel transition-colors">Quiz</a>
          <a href="#story" className="hover:text-caramel transition-colors">Our Story</a>
          <a href="#visit" className="hover:text-caramel transition-colors">Visit Us</a>
        </nav>

        {/* Social Icons Right */}
        <div className="flex gap-4 text-cream/60">
          <a href="#" className="hover:text-caramel transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="hover:text-caramel transition-colors"><Twitter className="w-5 h-5" /></a>
        </div>
      </div>

      <div className="w-full max-w-6xl border-t border-cream/5 pt-6 flex flex-col items-center gap-2">
        <span className="text-xs text-cream/40 font-dm-sans">
          © 2025 Auroma. All rights reserved.
        </span>
        <span className="font-caveat text-sm text-caramel/60">
          Made with obsession and oat milk.
        </span>
      </div>
    </footer>
  );
}
