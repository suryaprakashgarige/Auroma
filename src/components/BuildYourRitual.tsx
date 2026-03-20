"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Check, ArrowRight, ArrowLeft, ShoppingBag, Thermometer, Box, Droplets, Flame } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const BASES = [
  { id: "espresso", name: "Espresso", icon: "⚡", description: "Bold and concentrated", price: 4.0 },
  { id: "pour_over", name: "Pour Over", icon: "🌿", description: "Clean and delicate", price: 4.5 },
  { id: "cold_brew", name: "Cold Brew", icon: "🧊", description: "Smooth and low-acid", price: 5.0 },
  { id: "matcha", name: "Matcha", icon: "🍵", description: "Earthy and ceremonial", price: 5.5 },
];

const MILKS = [
  { id: "oat", name: "Oat Milk", icon: "🌾", extra: 0.5 },
  { id: "almond", name: "Almond Milk", icon: "🌰", extra: 0.5 },
  { id: "whole", name: "Whole Milk", icon: "🥛", extra: 0.0 },
  { id: "none", name: "None (Black)", icon: "✗", extra: 0.0 },
];

const ROASTS = [
  { id: "light", name: "Light", note: "Floral, fruity, jasmine" },
  { id: "medium", name: "Medium", note: "Balanced, caramel, smooth" },
  { id: "dark", name: "Dark", note: "Bold, smoky, intense" },
  { id: "seasonal", name: "Seasonal Blend", note: "Surprise blend, changes monthly" },
];

const SIZES = [
  { id: "small", name: "Small (8oz)", extra: 0.0 },
  { id: "medium", name: "Medium (12oz)", extra: 0.75 },
  { id: "large", name: "Large (16oz)", extra: 1.50 },
];

const TEMPS = [
  { id: "hot", name: "Hot", icon: "🔥" },
  { id: "iced", name: "Iced", icon: "🧊" },
  { id: "room", name: "Room Temp", icon: "🌡️" },
];

export default function BuildYourRitual() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    base: BASES[0],
    milk: MILKS[0],
    roast: ROASTS[1],
    size: SIZES[1],
    temp: TEMPS[0]
  });
  const { addItem } = useCartStore();

  const totalPrice = selections.base.price + selections.milk.extra + selections.size.extra;

  const handleNext = () => step < 4 && setStep(step + 1);
  const handleBack = () => step > 1 && setStep(step - 1);

  const getCoffeeColor = () => {
    if (selections.base.id === 'matcha') return '#8E9B61';
    switch (selections.roast.id) {
      case "light": return "#E2B877";
      case "medium": return "#7C4B27";
      case "dark": return "#3D2310";
      case "seasonal": return "#5D3A1A";
      default: return "#7C4B27";
    }
  };

  return (
    <section id="build-your-ritual" className="w-full py-32 bg-[#F4EDE4] flex justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Controls */}
        <div className="flex flex-col gap-10">
          <div className="space-y-4">
            <span className="font-caveat text-caramel text-2xl">The Barista Workspace</span>
            <h2 className="text-4xl md:text-6xl font-black font-playfair text-espresso leading-none uppercase">
              Build Your <br /> Ritual
            </h2>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(s => (
                <div 
                  key={s} 
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-caramel' : 'bg-espresso/10'}`} 
                />
              ))}
            </div>
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold font-playfair text-espresso">1. Choose Your Base</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {BASES.map(b => (
                      <button
                        key={b.id}
                        onClick={() => { setSelections({...selections, base: b}); handleNext(); }}
                        className={`p-6 rounded-3xl border-2 text-left transition-all ${selections.base.id === b.id ? 'border-caramel bg-espresso text-cream' : 'border-espresso/10 bg-white/50 text-espresso hover:border-caramel/50'}`}
                      >
                        <span className="text-3xl mb-2 block">{b.icon}</span>
                        <span className="font-bold font-dm-sans block">{b.name}</span>
                        <span className="text-[10px] opacity-60 font-dm-sans">{b.description}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold font-playfair text-espresso">2. Choose Your Milk</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {MILKS.map(m => (
                      <button
                        key={m.id}
                        onClick={() => { setSelections({...selections, milk: m}); handleNext(); }}
                        className={`p-6 rounded-3xl border-2 text-left transition-all ${selections.milk.id === m.id ? 'border-caramel bg-espresso text-cream' : 'border-espresso/10 bg-white/50 text-espresso hover:border-caramel/50'}`}
                      >
                        <span className="text-3xl mb-2 block">{m.icon}</span>
                        <span className="font-bold font-dm-sans block">{m.name}</span>
                        <span className="text-[10px] opacity-60 font-dm-sans">{m.extra > 0 ? `+$${m.extra.toFixed(2)}` : 'No extra cost'}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold font-playfair text-espresso">3. Choose Your Roast</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {ROASTS.map(r => (
                      <button
                        key={r.id}
                        onClick={() => { setSelections({...selections, roast: r}); handleNext(); }}
                        className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${selections.roast.id === r.id ? 'border-caramel bg-espresso text-cream' : 'border-espresso/10 bg-white/50 text-espresso hover:border-caramel/50'}`}
                      >
                        <div>
                          <span className="font-bold font-dm-sans block">{r.name}</span>
                          <span className="text-xs opacity-60 font-dm-sans">{r.note}</span>
                        </div>
                        {selections.roast.id === r.id && <Check className="text-caramel" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-playfair text-espresso">4. Temperature + Size</h3>
                    <div className="flex gap-4">
                      {TEMPS.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setSelections({...selections, temp: t})}
                          className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${selections.temp.id === t.id ? 'border-caramel bg-espresso text-cream' : 'border-espresso/10 bg-white/50 text-espresso hover:border-caramel/50'}`}
                        >
                          <span className="text-xl">{t.icon}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest">{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      {SIZES.map(s => (
                        <button
                          key={s.id}
                          onClick={() => setSelections({...selections, size: s})}
                          className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${selections.size.id === s.id ? 'border-caramel bg-espresso text-cream' : 'border-espresso/10 bg-white/50 text-espresso hover:border-caramel/50'}`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-widest">{s.name}</span>
                          <span className="text-[10px] opacity-60">
                            {s.extra > 0 ? `+$${s.extra.toFixed(2)}` : 'Base price'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <button 
                onClick={handleBack}
                className="p-5 rounded-2xl bg-espresso/5 text-espresso hover:bg-espresso/10 transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            {step < 4 ? (
              <button 
                onClick={handleNext}
                className="flex-1 p-5 rounded-2xl bg-espresso text-cream font-bold font-dm-sans flex items-center justify-center gap-2 hover:bg-espresso/90 transition-all shadow-xl"
              >
                Next Step <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={() => {
                  addItem({
                    id: `ritual-${Date.now()}`,
                    name: `${selections.size.name} ${selections.base.name}`,
                    description: `${selections.roast.name} Roast, ${selections.milk.name}, ${selections.temp.name}`,
                    price: totalPrice,
                    category: 'Signatures',
                    imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4bb1dba5?q=80&w=600&auto=format&fit=crop",
                    dietaryTags: ["Custom"]
                  });
                }}
                className="flex-1 p-5 rounded-2xl bg-caramel text-espresso font-black font-dm-sans text-lg flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-[0_15px_40px_rgba(212,168,83,0.3)]"
              >
                Add it to Order — ${totalPrice.toFixed(2)}
                <ShoppingBag className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="relative h-full flex items-center justify-center lg:justify-end">
          <motion.div 
            layout
            className="w-full max-w-sm bg-white rounded-[60px] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-espresso/5 flex flex-col items-center"
          >
            {/* Cup Illustration */}
            <div className="relative w-full h-64 flex items-center justify-center mb-10">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selections.temp.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute -top-10"
                  >
                    {selections.temp.id === 'hot' && (
                      <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                          <motion.div 
                            key={i}
                            animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                            className="w-1 h-8 bg-caramel/30 rounded-full"
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dynamic Cup SVG */}
              <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: getCoffeeColor(), stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#1A0E06', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                
                {/* Cup Body */}
                <path 
                  d="M20 20 L25 100 Q25 110 35 110 L65 110 Q75 110 75 100 L80 20 Z" 
                  fill="white" 
                  stroke="#2C1A0E" 
                  strokeWidth="2" 
                />
                
                {/* Coffee Liquid */}
                <motion.path 
                  animate={{ d: selections.size.id === 'large' ? "M22 30 L25 100 Q25 110 35 110 L65 110 Q75 110 75 100 L78 30 Z" : selections.size.id === 'medium' ? "M23 50 L25 100 Q25 110 35 110 L65 110 Q75 110 75 100 L77 50 Z" : "M24 70 L25 100 Q25 110 35 110 L65 110 Q75 110 75 100 L76 70 Z" }}
                  fill="url(#coffeeGradient)"
                  className="transition-all duration-500"
                />

                {/* Milk Layer */}
                {selections.milk.id !== 'none' && (selections.base.id !== 'matcha') && (
                  <ellipse 
                    cx="50" 
                    cy={selections.size.id === 'large' ? 30 : selections.size.id === 'medium' ? 50 : 70} 
                    rx={30} 
                    ry={4} 
                    fill="#F4EDE4" 
                  />
                )}

                {/* Ice Cubes */}
                {selections.temp.id === 'iced' && (
                  <g opacity="0.6">
                    <rect x="35" y="40" width="10" height="10" rx="2" fill="white" />
                    <rect x="55" y="50" width="10" height="10" rx="2" fill="white" />
                  </g>
                )}
              </svg>
            </div>

            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel">Visualizing Your Ritual</span>
              <h4 className="text-3xl font-black font-playfair text-espresso leading-tight">
                {selections.size.name} {selections.base.name}
              </h4>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <div className="px-3 py-1 bg-espresso/5 rounded-full text-[10px] font-bold text-espresso/60 uppercase">{selections.roast.name} Roast</div>
                <div className="px-3 py-1 bg-espresso/5 rounded-full text-[10px] font-bold text-espresso/60 uppercase">{selections.milk.name}</div>
                <div className="px-3 py-1 bg-espresso/5 rounded-full text-[10px] font-bold text-espresso/60 uppercase">{selections.temp.name}</div>
              </div>
            </div>
          </motion.div>

          <div className="absolute -bottom-10 -right-10 flex flex-col items-end gap-2 pointer-events-none">
            <span className="font-caveat text-xl text-caramel">&ldquo;The perfect frequency for you&rdquo;</span>
          </div>
        </div>

      </div>
    </section>
  );
}
