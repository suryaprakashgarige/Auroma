"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dice5, Share2, CornerUpRight, RefreshCw, AlertCircle, Check, Coffee } from "lucide-react";
import gsap from "gsap";
import { rouletteCoffees, getRandomCoffee } from "@/lib/rouletteLogic";
import { useCartStore } from "@/store/useCartStore";

export default function RoastRoulette() {
  const { addItem } = useCartStore();
  const [stage, setStage] = useState<'idle' | 'spinning' | 'reveal'>('idle');
  const [selectedCoffee, setSelectedCoffee] = useState<typeof rouletteCoffees[0] | null>(null);
  const [lastPickedId, setLastPickedId] = useState<number | null>(null);
  const [isReasonExpanded, setIsReasonExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const beansRef = useRef<HTMLDivElement>(null);
  const slotStripRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Idle Orbiting Animation for floating beans
    if (stage === 'idle' && beansRef.current) {
      const beans = beansRef.current.querySelectorAll('.orbit-bean');
      beans.forEach((bean, i) => {
        gsap.to(bean, {
          rotation: 360,
          duration: 10 + i * 3,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center"
        });
      });
    }
  }, [stage]);

  const handleSpin = () => {
    if (stage !== 'idle') return;

    setStage('spinning');
    setIsReasonExpanded(false);

    const coffee = getRandomCoffee(lastPickedId || undefined);
    setLastPickedId(coffee.id);

    gsap.delayedCall(2.2, () => {
      setSelectedCoffee(coffee);
      setStage('reveal');
    });

    // Tactile button animation
    if (triggerRef.current) {
      gsap.to(triggerRef.current, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    // Speed up orbit beans
    if (beansRef.current) {
      const beans = beansRef.current.querySelectorAll('.orbit-bean');
      gsap.to(beans, {
        rotation: "+=720",
        duration: 1.5,
        ease: "power2.inOut"
      });
    }

    // Slot machine strip animation
    if (slotStripRef.current) {
      const stripNames = slotStripRef.current.querySelector('.strip-names');
      const offsetHeight = (stripNames?.clientHeight || 0) / 3; // divided by clone count
      
      gsap.fromTo(stripNames, 
        { y: 0 },
        { 
          y: -offsetHeight * 2, // Scroll through list twice
          duration: 2, 
          ease: "power4.out",
          onComplete: () => {
             // Complete empty to avoid Duplicate reveals
          }
        }
      );
    }
  };

  const handleAddToCart = () => {
    if (!selectedCoffee) return;

    addItem({
      id: `roulette-${selectedCoffee.id}`,
      name: `${selectedCoffee.name} (Roulette Win)`,
      description: selectedCoffee.originStory,
      price: 6.00, // Roulette win price
      category: 'Signatures',
      imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop',
      dietaryTags: selectedCoffee.tastingNotes
    });
  };

  const handleCustomizeWin = () => {
    if (!selectedCoffee) return;

    const config = {
      roast: selectedCoffee.roast.toLowerCase().replace(' ', '_'),
      milk: selectedCoffee.milk.toLowerCase(),
      sweetness: 1, 
      strength: selectedCoffee.strength === 'Single' ? 1 : selectedCoffee.strength === 'Double' ? 2 : 3,
      temperature: selectedCoffee.temperature.toLowerCase(),
      size: "M", 
      syrup: selectedCoffee.syrup.toLowerCase(),
      extra_shot: false
    };

    window.dispatchEvent(new CustomEvent('loadCoffeeRitual', { detail: config }));

    const element = document.getElementById('build-your-ritual');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (!selectedCoffee) return;
    const notes = selectedCoffee.tastingNotes.join(" · ");
    const text = `The universe picked ${selectedCoffee.name} for me today ☕ — ${notes}. Try your luck at auroma.coffee #RoastRoulette`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetSpin = () => {
    setStage('idle');
    setSelectedCoffee(null);
  };

  return (
    <section id="roast-roulette" className="relative w-full py-20 bg-[#FAF4EC] px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col items-center gap-12 text-center text-espresso">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-caveat text-caramel text-xl">Feeling adventurous?</span>
          <h2 className="text-3xl md:text-5xl font-bold font-playfair tracking-tight">Roast Roulette</h2>
          <p className="text-sm md:text-base text-charcoal/70 font-dm-sans max-w-sm">
            Can't decide? Let the universe pick your perfect cup. No regrets.
          </p>
        </div>

        {/* Center Spin Action Grid */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[350px]">
          
          <AnimatePresence mode="wait">
            
            {stage === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <div className="relative flex items-center justify-center w-[300px] h-[300px] mx-auto my-8">
                  {/* Orbital Beans container */}
                  <div ref={beansRef} className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className="orbit-bean absolute"
                        style={{ 
                          transform: `rotate(${i * 60}deg) translateY(-120px)` 
                       }}
                      >
                        <div className="w-3 h-4 bg-[#3D2314] rounded-full shadow-sm"></div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center w-full absolute pointer-events-auto">
                    <button 
                      ref={triggerRef}
                      onClick={handleSpin}
                      className="w-[200px] h-[200px] min-w-[200px] min-h-[200px] rounded-full flex flex-col items-center justify-center cursor-pointer bg-espresso border-[3px] border-caramel shadow-[0_0_20px_rgba(201,137,58,0.3)] gap-1 hover:shadow-[0_0_30px_rgba(201,137,58,0.5)] transition-all group"
                    >
                      <Dice5 className="w-10 h-10 text-caramel group-hover:rotate-45 transition-transform duration-300" />
                      <span className="font-playfair text-xl font-bold text-cream">Spin</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-charcoal/60 font-dm-sans mt-4">12 signature coffees. One is yours today.</p>
                <p className="font-caveat text-sm text-charcoal/50 mt-1 italic">🗓️ New discoveries every Sunday. Come back and spin again.</p>
              </motion.div>
            )}

            {stage === 'spinning' && (
              <motion.div 
                key="spinning"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm bg-espresso text-cream py-4 px-6 rounded-xl border border-caramel/20 relative overflow-hidden h-14 flex items-center justify-center"
              >
                {/* Fade Mask layer left/right */}
                <div className="absolute inset-0 bg-gradient-to-r from-espresso via-transparent to-espresso pointer-events-none z-10"></div>
                
                <div ref={slotStripRef} className="h-full overflow-hidden flex items-center justify-center w-full">
                  <div className="strip-names flex flex-col items-center">
                    {/* Cloned List to allow scrolling loop perfectly */}
                    {[...rouletteCoffees, ...rouletteCoffees, ...rouletteCoffees].map((c, i) => (
                      <div key={i} className="py-2 font-playfair font-bold text-lg text-cream/80 h-12 flex items-center shrink-0">
                        {c.name}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {stage === 'reveal' && selectedCoffee && (
              <motion.div 
                key="reveal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 120 } }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full max-w-lg bg-cream-dark/20 border border-espresso/5 rounded-3xl p-6 md:p-10 shadow-xl flex flex-col text-espresso items-center bg-transparent z-1 relative"
              >
                {/* Confetti or Burst particle triggers */}
                
                <span className="font-caveat text-caramel text-md mb-2">Today's Universe Pick</span>
                <h3 className="font-bold font-playfair text-2xl md:text-3xl mb-1">{selectedCoffee.name}</h3>
                <span className="text-[10px] font-bold font-dm-sans px-2 py-0.5 bg-caramel text-espresso rounded-full mb-4">
                  {selectedCoffee.origin}
                </span>

                {/* Two Col Visuals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-full mb-6">
                  {/* Left SVG Illustration */}
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 flex items-center justify-center relative">
                      <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-lg">
                        {/* Mug structure */}
                        <path d="M25 40 L25 80 Q25 90 35 90 L65 90 Q75 90 75 80 L75 40" fill="#fcf8f2" stroke="#2C1A0E" strokeWidth="3"/>
                        <path d="M26 44 L26 80 Q26 89 35 89 L65 89 Q74 89 74 80 L74 44 Z" fill={selectedCoffee.cupColor} />
                        {selectedCoffee.hasFoam && (
                          <ellipse cx={50} cy={44} rx={25} ry={4} fill="#FaF4Ec" />
                        )}
                        <path d="M75 50 Q90 50 90 60 Q90 70 75 70" fill="none" stroke="#2C1A0E" strokeWidth="4" />
                        <ellipse cx="50" cy="95" rx="25" ry="4" fill="#E0D7CD" />
                      </svg>
                      {/* Subtel steam lines using simple divs or inline setups */}
                    </div>
                  </div>

                  {/* Right Details */}
                  <div className="flex flex-col items-start text-left gap-1.5">
                    <div className="flex flex-wrap gap-1 mb-1 items-center">
                      {selectedCoffee.tastingNotes.map(t => {
                        const noteColors: { [key: string]: string } = { Fruity: 'bg-red-400', Nutty: 'bg-amber-700', Floral: 'bg-pink-300', Chocolate: 'bg-amber-900', Citrus: 'bg-yellow-400', Berry: 'bg-purple-400' };
                        return (
                          <span key={t} className="text-[10px] font-bold font-dm-sans px-1.5 py-0.5 bg-caramel/10 border border-caramel/30 text-espresso rounded-md flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${noteColors[t] || 'bg-caramel'} border border-white/40`} />
                            {t}
                          </span>
                        )
                      })}
                    </div>
                    <p className="text-[11px] font-dm-sans text-charcoal/80"><span className="font-bold">Roast:</span> {selectedCoffee.roast}</p>
                    <p className="text-[11px] font-dm-sans text-charcoal/80"><span className="font-bold">Milk:</span> {selectedCoffee.milk}</p>
                    <div className="flex gap-0.5 text-caramel text-sm">
                      <Coffee className="w-3.5 h-3.5 fill-caramel" />
                      {selectedCoffee.strength === 'Double' && <Coffee className="w-3.5 h-3.5 fill-caramel" />}
                      {selectedCoffee.strength === 'Triple' && <><Coffee className="w-3.5 h-3.5 fill-caramel" /><Coffee className="w-3.5 h-3.5 fill-caramel" /></>}
                    </div>
                    <p className="font-caveat text-caramel text-sm italic mt-0.5">"{selectedCoffee.aroma}"</p>
                    <p className="text-[11px] font-dm-sans text-charcoal/70 leading-relaxed mt-1">{selectedCoffee.originStory}</p>
                  </div>
                </div>

                {/* Bottom expandable wrapper */}
                <div className="w-full border-t border-dashed border-espresso/10 pt-4 flex flex-col gap-2">
                  <button 
                    onClick={() => setIsReasonExpanded(!isReasonExpanded)}
                    className="flex items-center justify-between text-xs font-dm-sans font-bold text-espresso/80 cursor-pointer"
                  >
                    <span>Why the universe picked this?</span>
                    <span className="text-xs">{isReasonExpanded ? "▲" : "▼"}</span>
                  </button>
                  <AnimatePresence>
                    {isReasonExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[11px] font-dm-sans text-charcoal/80 leading-relaxed text-left pb-2">
                          {selectedCoffee.universeReason}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Actions bottom */}
                <div className="flex flex-col gap-2 w-full mt-2">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full py-2.5 bg-caramel hover:bg-caramel/90 text-espresso font-bold rounded-full font-dm-sans text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Add to Cart <CornerUpRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex gap-2 w-full">
                    <button 
                      onClick={handleCustomizeWin}
                      className="flex-1 py-1.5 border border-espresso/20 hover:border-espresso text-espresso rounded-full font-dm-sans text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Customize it
                    </button>
                    <button 
                      onClick={handleShare}
                      className="flex-1 py-1.5 border border-espresso/20 hover:border-espresso text-espresso rounded-full font-dm-sans text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Share2 className="w-3 h-3" /> Share
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
      <AnimatePresence>
        {isCopied && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-espresso text-cream rounded-xl font-dm-sans text-xs font-bold shadow-xl border border-caramel/20 flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-caramel" />
            Result copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
