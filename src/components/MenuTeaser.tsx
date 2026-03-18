"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description: "Citrus, floral, and basically a morning in a cup.",
    price: "$6.00",
    persona: "Contemporary"
  },
  {
    id: 2,
    name: "Double Espresso",
    description: "No compromises. Just clarity.",
    price: "$4.00",
    persona: "Classic"
  },
  {
    id: 3,
    name: "Lavender Oat Latte",
    description: "Your nervous system called. It wants this.",
    price: "$7.00",
    persona: "Avant-garde"
  },
  {
    id: 4,
    name: "Caramel Macchiato",
    description: "Classic for a reason. Your reason.",
    price: "$8.00",
    persona: "Classic"
  },
];

const DrinkCup = ({ id }: { id: number }) => {
  if (id === 1) { // Ethiopian Yirgacheffe
    return (
      <div className="w-full h-40 rounded-xl mb-2 flex items-center justify-center bg-cream/5">
        <svg width="80" height="110" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="15" width="40" height="75" rx="4" fill="#D4A96A" opacity="0.9"/>
          <rect x="20" y="15" width="40" height="12" rx="4" fill="#E8C98A" opacity="0.5"/>
          <rect x="28" y="55" width="10" height="10" rx="2" fill="white" opacity="0.3"/>
          <rect x="42" y="60" width="10" height="10" rx="2" fill="white" opacity="0.3"/>
          <rect x="52" y="5" width="3" height="60" rx="1.5" fill="#C9893A" opacity="0.7"/>
          <path d="M32 8 Q34 4 32 0" stroke="#FAF4EC" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
          <path d="M40 6 Q42 2 40 -2" stroke="#FAF4EC" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        </svg>
      </div>
    );
  }
  if (id === 2) { // Double Espresso
    return (
      <div className="w-full h-40 rounded-xl mb-2 flex items-center justify-center bg-cream/5">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="45" cy="78" rx="32" ry="6" fill="#3A2010" opacity="0.6"/>
          <path d="M20 40 L25 70 Q45 76 65 70 L70 40 Z" fill="#1A0A04"/>
          <ellipse cx="45" cy="40" rx="25" ry="5" fill="#2C1A0E"/>
          <ellipse cx="45" cy="40" rx="22" ry="4" fill="#3D1F0A"/>
          <path d="M65 48 Q80 52 78 62 Q76 72 65 68" stroke="#2C1A0E" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M36 38 Q45 36 54 38" stroke="#C9893A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          <path d="M38 30 Q40 24 38 18" stroke="#FAF4EC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M52 28 Q54 22 52 16" stroke="#FAF4EC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      </div>
    );
  }
  if (id === 3) { // Lavender Oat Latte
    return (
      <div className="w-full h-40 rounded-xl mb-2 flex items-center justify-center bg-cream/5">
        <svg width="75" height="115" viewBox="0 0 75 115" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 20 L10 95 Q37 102 65 95 L60 20 Z" fill="#C8B8D4" opacity="0.85"/>
          <ellipse cx="37" cy="20" rx="23" ry="7" fill="#F0E6D3"/>
          <ellipse cx="30" cy="18" rx="8" ry="4" fill="white" opacity="0.6"/>
          <ellipse cx="45" cy="19" rx="6" ry="3" fill="white" opacity="0.5"/>
          <path d="M15 30 L13 60 Q37 65 62 60 L60 30 Z" fill="#B8A0C8" opacity="0.3"/>
          <path d="M28 8 Q30 2 28 -4" stroke="#FAF4EC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M37 5 Q39 -1 37 -7" stroke="#FAF4EC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M46 8 Q48 2 46 -4" stroke="#FAF4EC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      </div>
    );
  }
  // Caramel Macchiato Default 
  return (
    <div className="w-full h-40 rounded-xl mb-2 flex items-center justify-center bg-cream/5">
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="88" rx="36" ry="7" fill="#3A2010" opacity="0.5"/>
        <path d="M18 42 L22 78 Q50 86 78 78 L82 42 Z" fill="#7B4A28"/>
        <ellipse cx="50" cy="42" rx="32" ry="7" fill="#8B5E3C"/>
        <ellipse cx="50" cy="42" rx="29" ry="6" fill="#F0E6D3"/>
        <path d="M30 40 Q40 36 50 40 Q60 44 70 40" stroke="#C9893A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9"/>
        <path d="M35 43 Q50 39 65 43" stroke="#C9893A" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
        <path d="M82 50 Q96 56 94 66 Q92 76 80 73" stroke="#6B3E20" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M40 28 Q42 20 40 12" stroke="#FAF4EC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M60 26 Q62 18 60 10" stroke="#FAF4EC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    </div>
  );
};

export default function MenuTeaser() {
  const [currentPersona, setCurrentPersona] = useState<string>('All');
  const personas = ['All', 'Classic', 'Contemporary', 'Avant-garde'];

  const filteredItems = currentPersona === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.persona === currentPersona);

  return (
    <section id="menu" className="relative w-full py-20 bg-espresso px-6 md:px-12 flex flex-col items-center overflow-hidden">
      {/* Wave top divider (cream -> espresso) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px]" fill="#FAF4EC" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"/>
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,var(--color-caramel)_0%,transparent_50%)] opacity-5 pointer-events-none" />

      <h2 className="text-3xl md:text-5xl font-bold font-playfair text-cream text-center mb-4 tracking-tight">
        A few of our signatures
      </h2>

      {/* Persona Filter Tabs */}
      <div className="flex gap-2 p-1 bg-cream/5 backdrop-blur-md rounded-full mb-12 border border-cream/10">
        {personas.map(persona => (
          <button 
            key={persona} 
            onClick={() => setCurrentPersona(persona)} 
            className="relative px-4 py-1.5 text-xs font-semibold font-dm-sans rounded-full transition-all duration-300"
          >
            {currentPersona === persona && (
              <motion.div layoutId="active-persona-bg" className="absolute inset-0 bg-caramel rounded-full" />
            )}
            <span className={`relative z-10 ${currentPersona === persona ? 'text-espresso' : 'text-cream/60 hover:text-cream'}`}>
              {persona}
            </span>
          </button>
        ))}
      </div>

      {/* Grid or Horizontal scroll on Mobile */}
      <div className="flex overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="min-w-[280px] md:min-w-0 flex-shrink-0 snap-center p-6 bg-cream-dark/5 backdrop-blur-sm border border-cream/10 rounded-2xl flex flex-col items-start gap-4 hover:border-caramel/30 hover:shadow-[0px_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="absolute top-4 right-4 text-[9px] font-bold px-1.5 py-0.5 border border-caramel/30 rounded-md text-caramel/80">
                {item.persona}
              </div>
              <DrinkCup id={item.id} />

              <h3 className="text-xl font-bold font-playfair text-cream group-hover:text-caramel transition-colors">
                {item.name}
              </h3>

              <p className="text-cream/70 font-dm-sans text-sm leading-relaxed flex-grow">
                {item.description}
              </p>

              <div className="w-full flex items-center justify-between mt-2 pt-4 border-t border-cream/10">
                <span className="text-caramel font-bold font-dm-sans">{item.price}</span>
                <button className="px-4 py-1.5 border border-caramel/60 hover:border-caramel text-caramel hover:bg-caramel hover:text-espresso font-semibold rounded-full font-dm-sans text-xs transition-all duration-300">
                  Add to Order
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
