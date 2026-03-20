"use client";

import { Coffee, Instagram, Twitter, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer id="visit" className="relative w-full bg-espresso text-cream border-t border-cream/5 px-6 md:px-12 py-16 flex flex-col items-center gap-12">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-6xl gap-12">
        {/* 1. Brand & Map */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-1.5 text-2xl font-bold font-playfair text-cream">
            <span>Auroma</span>
            <Coffee className="w-5 h-5 text-caramel" />
          </div>
          <p className="text-sm text-cream/60 font-dm-sans max-w-xs">
            Portland's first AI-integrated coffee experience. Mapping your frequency to the perfect roast, one cup at a time.
          </p>
          <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.8!2d-122.6993!3d45.5310!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMxJzUxLjYiTiAxMjLCsDQxJzU3LjUiVw!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%" 
              height="200" 
              style={{ border: 0, borderRadius: '16px', filter: 'invert(90%) hue-rotate(180deg)' }} 
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* 2. Location & Contact */}
        <div className="flex flex-col gap-6">
          <h3 className="font-playfair font-bold text-xl text-caramel">Visit the Studio</h3>
          <div className="flex flex-col gap-4 text-sm font-dm-sans text-cream/80">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-caramel shrink-0" />
              <span>412 NW 23rd Ave,<br />Portland, OR 97210</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-caramel shrink-0" />
              <a href="tel:5037418820" className="hover:text-caramel transition-colors">(503) 741-8820</a>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-caramel shrink-0" />
              <div className="flex flex-col gap-1">
                <span className="font-bold text-cream">Mon–Fri: 6:30 AM – 7:00 PM</span>
                <span className="font-bold text-cream/60">Sat–Sun: 7:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Socials & Navigation */}
        <div className="flex flex-col gap-6">
          <h3 className="font-playfair font-bold text-xl text-caramel">Stay Connected</h3>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-cream/5 rounded-full hover:bg-caramel hover:text-espresso transition-all group">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 bg-cream/5 rounded-full hover:bg-caramel hover:text-espresso transition-all group">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 bg-cream/5 rounded-full hover:bg-caramel hover:text-espresso transition-all group">
              <span className="text-sm font-bold font-dm-sans leading-none">@auromacafe</span>
            </a>
          </div>
          <nav className="flex flex-col gap-3 text-sm font-dm-sans text-cream/60 mt-4">
            <a href="#menu" className="hover:text-caramel transition-colors w-fit">Browse the Rituals</a>
            <a href="#roast-roulette" className="hover:text-caramel transition-colors w-fit">Roast Roulette</a>
            <a href="#mood-brew-scan" className="hover:text-caramel transition-colors w-fit">Mood Brew Scan</a>
          </nav>
        </div>
      </div>

      <div className="w-full max-w-6xl border-t border-cream/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs text-cream/40 font-dm-sans">
          © {new Date().getFullYear()} Auroma Studio. We Read the Room. Then We Make the Coffee.
        </span>
        <span className="font-caveat text-xl text-caramel/60">
          Made in Portland with obsession and oat milk.
        </span>
      </div>
    </footer>
  );
}
