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
          <a href="#" className="hover:text-caramel transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.23 8.23 0 004.81 1.54V6.78a4.85 4.85 0 01-1.04-.09z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="w-full max-w-6xl border-t border-cream/5 pt-6 flex flex-col items-center gap-2">
        <span className="text-xs text-cream/40 font-dm-sans">
          © {new Date().getFullYear()} Auroma. Coffee should understand you.
        </span>
        <span className="font-caveat text-sm text-caramel/60">
          Made with obsession and oat milk.
        </span>
      </div>
    </footer>
  );
}
