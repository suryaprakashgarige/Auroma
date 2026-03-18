"use client";
import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";

export default function HeroSection({ onTakeQuiz }: { onTakeQuiz: () => void }) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen bg-espresso flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2000&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-transparent to-espresso/80 z-0" />

      <div className="relative z-10 max-w-4xl flex flex-col items-center gap-4 mt-16">
        <span className="font-caveat text-2xl md:text-3xl text-caramel">Sip in fine frequency</span>
        <h1 className="text-4xl md:text-7xl font-playfair font-black text-cream tracking-tight leading-none">
          Coffee, Tailored to <br className="hidden md:inline" /> Your Frequency.
        </h1>
        <p className="font-dm-sans text-cream/80 text-sm md:text-lg max-w-md mt-2">
          Experience premium roasts mapped to your mood, routine, and universe state.
        </p>

        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => scrollTo('menu')} 
            className="px-6 py-3 bg-caramel text-espresso font-bold rounded-full font-dm-sans text-sm hover:shadow-[0_0_30px_rgba(201,137,58,0.3)] transition-all cursor-pointer"
          >
            Order Now
          </button>
          <button 
            onClick={onTakeQuiz} 
            className="px-6 py-3 border border-cream/30 text-cream font-bold rounded-full font-dm-sans text-sm hover:bg-cream/10 transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-caramel" /> Take the Quiz
          </button>
        </div>
      </div>

    </section>
  );
}
