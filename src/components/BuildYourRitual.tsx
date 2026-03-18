"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Share2, Heart, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  DRINK_NAMES, 
  ROAST_NOTES, 
  MILK_NOTES, 
  TASTING_NOTES, 
  AROMA_NOTES,
  PRESETS,
  RoastLevel,
  MilkType
} from "@/lib/ritualLogic";

const ROASTS: { id: RoastLevel; label: string; icon: string }[] = [
  { id: "light", label: "Light", icon: "☀️" },
  { id: "medium", label: "Medium", icon: "🌤️" },
  { id: "dark", label: "Dark", icon: "☁️" },
  { id: "extra_dark", label: "Extra Dark", icon: "⚡" },
];

const MILKS: { id: MilkType; label: string; icon: string }[] = [
  { id: "dairy", label: "Dairy", icon: "🥛" },
  { id: "oat", label: "Oat", icon: "🌾" },
  { id: "almond", label: "Almond", icon: "🌰" },
  { id: "none", label: "None", icon: "⬛" },
];

const SWEETNESS_LABELS = ["No Sugar", "Just a Hint", "Medium Sweet", "Dessert Level"];

export default function BuildYourRitual() {
  const [roast, setRoast] = useState<RoastLevel>("medium");
  const [milk, setMilk] = useState<MilkType>("oat");
  const [sweetness, setSweetness] = useState(1);
  const [strength, setStrength] = useState(2); // 1, 2, or 3
  const [customName, setCustomName] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      "#build-your-ritual .animate-in",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#build-your-ritual",
          start: "top 70%",
        },
      }
    );
  }, []);

  // Smooth fade update for preview content
  useEffect(() => {
    gsap.fromTo(
      ".preview-content",
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.25, ease: "power1.out" }
    );
  }, [roast, milk, sweetness, strength]);

  const loadPreset = (preset: typeof PRESETS[0]) => {
    setRoast(preset.roast);
    setMilk(preset.milk);
    setSweetness(preset.sweetness);
    setStrength(preset.strength);
    
    gsap.fromTo(
      ".preview-card",
      { rotateY: 5 },
      { rotateY: 0, duration: 0.4, ease: "back.out(1.2)" }
    );
  };

  const shareBuild = () => {
    const drinkName = DRINK_NAMES[roast][milk];
    const text = `I built my perfect coffee on Auroma ☕ '${drinkName}' — ${SWEETNESS_LABELS[sweetness]} · ${strength} Shot${strength > 1 ? "s" : ""} · ${MILKS.find(m => m.id === milk)?.label} Milk. Build yours at auroma.coffee`;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Dynamic colors for SVG cup
  const getCoffeeColor = () => {
    switch (roast) {
      case "light": return "#E2B877";
      case "medium": return "#7C4B27";
      case "dark": return "#3D2310";
      case "extra_dark": return "#1A0E06";
      default: return "#7C4B27";
    }
  };

  return (
    <section id="build-your-ritual" className="relative w-full py-20 bg-cream-dark/30 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center animate-in">
          <h2 className="text-3xl md:text-5xl font-bold font-playfair text-espresso mb-3 tracking-tight">
            Build Your Ritual
          </h2>
          <p className="text-sm md:text-base text-charcoal/70 font-dm-sans max-w-md mx-auto">
            Every slider, every choice — this coffee is yours. Exactly yours.
          </p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start w-full">
          
          {/* Controls - Left Column */}
          <div className="flex flex-col gap-8 animate-in">
            
            {/* Control 1: Roast Level */}
            <div className="flex flex-col gap-3">
              <label className="text-espresso font-semibold font-dm-sans text-lg">Roast Level</label>
              <div className="flex flex-wrap gap-2">
                {ROASTS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRoast(r.id)}
                    className={`px-4 py-2 rounded-full font-dm-sans text-sm font-semibold transition-all duration-200 ${
                      roast === r.id 
                        ? "bg-jade text-cream shadow-md" 
                        : "bg-cream-dark text-charcoal hover:bg-cream-dark/80"
                    }`}
                  >
                    {r.icon} {r.label}
                  </button>
                ))}
              </div>
              <p className="font-caveat text-charcoal/80 text-lg mt-1">{ROAST_NOTES[roast]}</p>
            </div>

            {/* Control 2: Milk Type */}
            <div className="flex flex-col gap-3">
              <label className="text-espresso font-semibold font-dm-sans text-lg">Milk Type</label>
              <div className="flex flex-wrap gap-2">
                {MILKS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMilk(m.id)}
                    className={`px-4 py-2 rounded-full font-dm-sans text-sm font-semibold transition-all duration-200 ${
                      milk === m.id 
                        ? "bg-jade text-cream shadow-md" 
                        : "bg-cream-dark text-charcoal hover:bg-cream-dark/80"
                    }`}
                  >
                    {m.icon} {m.label}
                  </button>
                ))}
              </div>
              <p className="font-caveat text-charcoal/80 text-lg mt-1">{MILK_NOTES[milk]}</p>
            </div>

            {/* Control 3: Sweetness */}
            <div className="flex flex-col gap-3">
              <label className="text-espresso font-semibold font-dm-sans text-lg">Sweetness</label>
              <input 
                type="range" 
                min="0" 
                max="3" 
                step="1"
                value={sweetness}
                onChange={(e) => setSweetness(parseInt(e.target.value))}
                className="w-full h-2 rounded-full bg-cream-dark accent-caramel cursor-pointer"
              />
              <span className="font-bold text-caramel font-dm-sans text-sm">
                {SWEETNESS_LABELS[sweetness]}
              </span>
            </div>

            {/* Control 4: Strength */}
            <div className="flex flex-col gap-3">
              <label className="text-espresso font-semibold font-dm-sans text-lg">Strength</label>
              <div className="flex gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setStrength(num)}
                    className={`flex-1 py-3 rounded-xl font-dm-sans font-bold text-sm transition-all duration-200 ${
                      strength === num 
                        ? "bg-espresso text-cream shadow-md" 
                        : "bg-cream-dark text-charcoal hover:bg-cream-dark/80"
                    }`}
                  >
                    {num === 1 ? "Single" : num === 2 ? "Double" : "Triple"} Shot
                  </button>
                ))}
              </div>
              <div className="flex gap-1 text-caramel text-xl mt-1">
                {[...Array(strength)].map((_, i) => (
                  <Coffee key={i} className="w-5 h-5 fill-caramel text-caramel" />
                ))}
              </div>
            </div>

          </div>

          {/* Live Preview - Right Column */}
          <div className="flex justify-center animate-in lg:sticky lg:top-24">
            <div className="preview-card w-full max-w-md bg-cream border border-espresso/5 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center text-espresso">
              
              {/* Dynamic Drink Illustration */}
              <div className="w-full h-48 flex items-center justify-center mb-6 relative">
                <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-lg">
                  {/* Cup Body back layer */}
                  <path d="M25 40 L25 80 Q25 90 35 90 L65 90 Q75 90 75 80 L75 40" fill="#fcf8f2" stroke="#2C1A0E" strokeWidth="3"/>
                  {/* Coffee Fill Level */}
                  <path d="M26 44 L26 80 Q26 89 35 89 L65 89 Q74 89 74 80 L74 44 Z" fill={getCoffeeColor()} className="transition-all duration-300" />
                  {/* Milk/Foam Layer */}
                  {milk !== "none" && (
                    <path d="M26 44 L74 44 Q60 48 26 44 Z" fill="#FaF4Ec" className="opacity-90"/>
                  )}
                  {/* Cup Handle */}
                  <path d="M75 50 Q90 50 90 60 Q90 70 75 70" fill="none" stroke="#2C1A0E" strokeWidth="4" />
                  {/* Cup Shadow */}
                  <ellipse cx="50" cy="95" rx="25" ry="4" fill="#E0D7CD" />
                </svg>

                {/* Sparkling Sweetness */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(sweetness)].map((_, i) => (
                    <Sparkles key={i} className={`absolute w-4 h-4 text-caramel animate-pulse`} 
                      style={{
                        top: `${40 + i*10}%`,
                        left: `${40 + (i&1? 15: -15)}%`
                      }} 
                    />
                  ))}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="preview-content w-full flex flex-col items-center">
                <h3 className="text-2xl font-bold font-playfair mb-2">
                  {DRINK_NAMES[roast][milk]}
                </h3>

                <div className="flex gap-2 flex-wrap justify-center mb-4">
                  <span className="text-xs font-dm-sans font-semibold px-3 py-1 bg-espresso/5 rounded-full">
                    {SWEETNESS_LABELS[sweetness]}
                  </span>
                  <span className="text-xs font-dm-sans font-semibold px-3 py-1 bg-espresso/5 rounded-full">
                    {strength} Shot{strength > 1 ? "s" : ""}
                  </span>
                  <span className="text-xs font-dm-sans font-semibold px-3 py-1 bg-espresso/5 rounded-full">
                    {MILKS.find(m => m.id === milk)?.label}
                  </span>
                </div>

                <p className="font-dm-sans text-xs text-charcoal/70 mb-2">
                  {TASTING_NOTES[roast]}
                </p>

                <p className="font-caveat text-caramel text-lg italic mb-6">
                  &ldquo;{AROMA_NOTES[roast]}&rdquo;
                </p>

                {/* Name Your Ritual */}
                <div className="w-full text-left mb-6">
                  <span className="text-xs font-bold font-dm-sans text-espresso/50 mb-1 block">Name This Ritual</span>
                  <input 
                    type="text" 
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g., Surya's 6am Weapon"
                    className="w-full border-b border-espresso/20 focus:border-caramel outline-none bg-transparent font-dm-sans text-sm py-1"
                  />
                  <p className="text-[10px] text-charcoal/50 font-caveat mt-1">Your name. Your house recipe.</p>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <button 
                    onClick={handleSave}
                    className={`w-full py-3 font-bold rounded-full font-dm-sans flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                      isSaved ? "bg-jade text-cream" : "bg-caramel text-espresso hover:bg-caramel/90"
                    }`}
                  >
                    {isSaved ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                    {isSaved ? "Ritual Saved!" : "Save My Ritual"}
                  </button>
                  <button 
                    onClick={shareBuild}
                    className="w-full py-3 border border-espresso/20 text-espresso font-semibold rounded-full font-dm-sans flex items-center justify-center gap-2 text-sm hover:border-espresso transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> Share This Build
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Presets Row bottom */}
        <div className="mt-8 animate-in w-full text-center">
          <h4 className="font-playfair font-bold text-xl text-espresso mb-4">Preset Rituals</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => loadPreset(p)}
                className="p-4 bg-cream rounded-xl border border-espresso/5 hover:border-caramel/30 hover:shadow-md transition-all text-left flex flex-col items-start gap-1.5"
              >
                <span className="font-playfair font-bold text-sm text-espresso">{p.name}</span>
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] font-dm-sans bg-espresso/5 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <span className="text-xs text-caramel font-semibold font-dm-sans mt-1">Load →</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function Check({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
  );
}
