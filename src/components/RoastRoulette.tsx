"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { Coffee, Dice5, RefreshCw, ShoppingBag } from "lucide-react";

const MENU_ITEMS = [
  { id: "roulette-1", name: "Oat Milk Lavender Latte", price: 6.50, emoji: "🌸", description: "Espresso + steamed oat milk + lavender syrup", category: 'Signatures' as const, imageUrl: "https://images.unsplash.com/photo-1594910358428-d30f9c961ad1?q=80&w=600&auto=format&fit=crop", dietaryTags: ["Oat Milk", "Lavender"] },
  { id: "roulette-2", name: "Ethiopian Yirgacheffe Pour Over", price: 5.50, emoji: "🌿", description: "Bright and floral with jasmine and blueberry notes", category: 'Pour Over' as const, imageUrl: "https://images.unsplash.com/photo-1544787210-2211d7c862a4?q=80&w=600&auto=format&fit=crop", dietaryTags: ["Floral", "Fruity"] },
  { id: "roulette-3", name: "Double Espresso", price: 3.50, emoji: "⚡", description: "Seasonal Auroma reserve blend, double shot", category: 'Espresso Bar' as const, imageUrl: "https://images.unsplash.com/photo-1510707577719-af7c183aa5er?q=80&w=600&auto=format&fit=crop", dietaryTags: ["Strong", "Bold"] },
  { id: "roulette-4", name: "Cold Brew Vanilla", price: 5.00, emoji: "🧊", description: "24-hour steep with organic vanilla syrup", category: 'Signatures' as const, imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4bb1dba5?q=80&w=600&auto=format&fit=crop", dietaryTags: ["Cold", "Sweet"] },
  { id: "roulette-5", name: "Caramel Macchiato", price: 5.25, emoji: "🍯", description: "Layered espresso with steamed milk and caramel drizzle", category: 'Espresso Bar' as const, imageUrl: "https://images.unsplash.com/photo-1485182247877-0af54790380a?q=80&w=600&auto=format&fit=crop", dietaryTags: ["Sweet", "Caramel"] },
  { id: "roulette-6", name: "Matcha Espresso Fusion", price: 6.00, emoji: "🍵", description: "Earthy matcha layered with cold milk and espresso float", category: 'Signatures' as const, imageUrl: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=600&auto=format&fit=crop", dietaryTags: ["Matcha", "Energy"] },
];

export default function RoastRoulette() {
  const { addItem } = useCartStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<typeof MENU_ITEMS[0] | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinOffset, setSpinOffset] = useState(0);

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    setShowConfetti(false);

    const randomIndex = Math.floor(Math.random() * MENU_ITEMS.length);
    const stopAt = randomIndex;
    
    // Calculate offset for animation
    // Each item is 80px high. We want to scroll many times and land on the stopAt item.
    const itemHeight = 80;
    const totalItems = MENU_ITEMS.length;
    const spins = 5; // number of full rotations
    const finalOffset = -((spins * totalItems + stopAt) * itemHeight);
    
    setSpinOffset(finalOffset);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(MENU_ITEMS[randomIndex]);
      setShowConfetti(true);
      // Reset offset for next spin after a delay
      setTimeout(() => {
        setSpinOffset(0);
      }, 500);
    }, 2500);
  };

  return (
    <section id="roast-roulette" className="relative w-full py-32 bg-espresso overflow-hidden flex flex-col items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <Dice5 className="absolute top-10 left-10 w-64 h-64 text-cream rotate-12" />
        <Coffee className="absolute bottom-10 right-10 w-48 h-48 text-cream -rotate-12" />
      </div>

      <div className="max-w-4xl w-full px-6 flex flex-col items-center gap-12 relative z-10">
        <div className="text-center space-y-4">
          <span className="font-caveat text-caramel text-2xl">Feeling adventurous?</span>
          <h2 className="text-4xl md:text-6xl font-black font-playfair text-cream tracking-tight">
            Roast Roulette
          </h2>
          <p className="text-cream/60 font-dm-sans max-w-md mx-auto">
            Not sure what your nervous system needs? Let the universe pull the lever.
          </p>
        </div>

        <div className="relative w-full max-w-sm">
          {/* Slot Machine Window */}
          <div className="bg-[#1A1512] rounded-3xl border-4 border-caramel/30 p-4 shadow-[0_0_50px_rgba(212,168,83,0.1)] relative overflow-hidden group">
            <div className="h-20 overflow-hidden relative rounded-xl bg-black/40">
              {/* Overlay masks */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[#1A1512] via-transparent to-[#1A1512] opacity-80" />
              
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: spinOffset }}
                transition={{
                  duration: isSpinning ? 2.5 : 0,
                  ease: [0.17, 0.67, 0.12, 0.99]
                }}
              >
                {/* Triple the items for seamless loop appearance during spin */}
                {[...MENU_ITEMS, ...MENU_ITEMS, ...MENU_ITEMS, ...MENU_ITEMS, ...MENU_ITEMS, ...MENU_ITEMS].map((item, i) => (
                  <div key={i} className="h-20 flex items-center justify-center w-full px-4">
                    <span className="text-2xl font-playfair font-bold text-cream/90 text-center truncate">
                      {item.emoji} {item.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Gloss effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          </div>

          {/* Lever Placeholder / Button */}
          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={spin}
              disabled={isSpinning}
              className={`
                px-10 py-4 rounded-full font-bold font-dm-sans text-lg tracking-wider uppercase transition-all flex items-center gap-3
                ${isSpinning 
                  ? 'bg-cream/10 text-cream/30 cursor-not-allowed' 
                  : 'bg-caramel text-espresso shadow-[0_10px_30px_rgba(212,168,83,0.3)] hover:shadow-[0_15px_40px_rgba(212,168,83,0.5)]'}
              `}
            >
              {isSpinning ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Dice5 className="w-6 h-6" />}
              {isSpinning ? "Spinning..." : "Spin the Wheel →"}
            </motion.button>
          </div>
        </div>

        {/* Result Card */}
        <AnimatePresence>
          {result && !isSpinning && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-md bg-cream rounded-[40px] p-8 mt-4 shadow-2xl relative border-4 border-caramel/20"
            >
              {/* Confetti Elements */}
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: i % 2 === 0 ? '#D4A853' : '#3D2314',
                        left: '50%',
                        top: '50%',
                        '--tw-translate-x': `${(i % 2 === 0 ? 1 : -1) * (Math.random() * 150 + 50)}px`,
                        '--tw-translate-y': `${(i < 4 ? -1 : 1) * (Math.random() * 150 + 50)}px`,
                        animation: `confetti 1s ease-out forwards`
                      } as any}
                    />
                  ))}
                </div>
              )}

              <div className="text-center space-y-4">
                <div className="text-7xl mb-4">{result.emoji}</div>
                <h3 className="text-3xl font-black font-playfair text-espresso leading-none uppercase">
                  {result.name}
                </h3>
                <div className="inline-block px-4 py-1 bg-caramel/20 rounded-full text-caramel font-bold text-sm">
                  {result.price}
                </div>
                <p className="text-espresso/70 font-dm-sans text-sm leading-relaxed px-4">
                  {result.description}
                </p>
                
                <div className="pt-6 flex flex-col gap-3">
                  <button
                    onClick={() => addItem(result)}
                    className="w-full py-4 bg-espresso text-cream font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-espresso/90 transition-all shadow-xl group"
                  >
                    <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Order This
                  </button>
                  <button
                    onClick={spin}
                    className="w-full py-3 border-2 border-espresso/10 text-espresso/40 font-bold rounded-2xl flex items-center justify-center gap-2 hover:border-espresso/30 hover:text-espresso/60 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Spin Again
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--tw-translate-x)), calc(-50% + var(--tw-translate-y))) scale(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
