"use client";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] bg-espresso flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-50 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2000&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/50 to-espresso z-0" />

      <div className="relative z-10 max-w-3xl flex flex-col items-center gap-6 mt-16">
        <span className="font-caveat text-3xl text-caramel italic">Welcome to Auroma</span>
        <h1 className="text-5xl md:text-7xl font-bold font-playfair text-cream tracking-tight leading-tight">
          Exceptional Coffee.<br />Zero Wait Time.
        </h1>
        <p className="text-lg text-cream/80 font-dm-sans max-w-xl mb-4">
          Order ahead online, skip the line, and enjoy perfectly crafted specialty coffee without the rush.
        </p>

        <Link href="#menu">
          <button className="px-10 py-4 bg-caramel hover:bg-caramel/90 text-espresso font-bold text-lg rounded-full font-dm-sans shadow-[0_0_20px_rgba(201,137,58,0.4)] transition-all hover:scale-105">
            Order Now
          </button>
        </Link>
      </div>

      <Link href="#menu" className="absolute bottom-12 left-1/2 -translate-x-1/2 text-cream/60 hover:text-cream transition-colors animate-bounce">
        <ArrowDown className="w-8 h-8" />
      </Link>
    </section>
  );
}
