"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Share2, Heart, Sparkles, Check, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCartStore } from "@/store/useCartStore";
import { supabase } from "@/lib/supabase";
import { 
  DRINK_NAMES, 
  ROAST_NOTES, 
  MILK_NOTES, 
  TEMP_NOTES, 
  SYRUP_NOTES, 
  TASTING_NOTES, 
  AROMA_NOTES,
  BASE_PRICES,
  PRESETS,
  RoastLevel,
  MilkType,
  Temperature,
  CupSize,
  Syrup
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

const TEMPS: { id: Temperature; label: string; icon: string }[] = [
  { id: "hot", label: "Hot", icon: "🔥" },
  { id: "iced", label: "Iced", icon: "🧊" },
  { id: "blended", label: "Blended", icon: "🌀" },
];

const SIZES: { id: CupSize; label: string }[] = [
  { id: "S", label: "S (8oz)" },
  { id: "M", label: "M (12oz)" },
  { id: "L", label: "L (16oz)" },
];

const SYRUPS: { id: Syrup; label: string; icon: string }[] = [
  { id: "vanilla", label: "Vanilla", icon: "🍦" },
  { id: "caramel", label: "Caramel", icon: "🍮" },
  { id: "hazelnut", label: "Hazelnut", icon: "🌰" },
  { id: "none", label: "None", icon: "✗" },
];

const SWEETNESS_LABELS = ["No Sugar", "Just a Hint", "Medium Sweet", "Dessert Level"];

export default function BuildYourRitual() {
  const [roast, setRoast] = useState<RoastLevel>("medium");
  const [milk, setMilk] = useState<MilkType>("oat");
  const [sweetness, setSweetness] = useState(1);
  const [strength, setStrength] = useState(2); 
  const [temperature, setTemperature] = useState<Temperature>("hot");
  const [size, setSize] = useState<CupSize>("M");
  const [syrup, setSyrup] = useState<Syrup>("none");
  const [extraShot, setExtraShot] = useState(false);
  const [description, setDescription] = useState("");
  const [ritualName, setRitualName] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  useEffect(() => {
    gsap.fromTo(
      ".preview-content",
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.2, ease: "power1.out" }
    );
  }, [roast, milk, sweetness, strength, temperature, size, syrup, extraShot]);

  useEffect(() => {
    const handleLoad = (e: any) => {
      const data = e.detail;
      if (data.roast) setRoast(data.roast as RoastLevel);
      if (data.milk) setMilk(data.milk as MilkType);
      if (data.sweetness !== undefined) setSweetness(data.sweetness);
      if (data.strength !== undefined) setStrength(data.strength);
      if (data.temperature) setTemperature(data.temperature as Temperature);
      if (data.size) setSize(data.size as CupSize);
      if (data.syrup) setSyrup(data.syrup as Syrup);
      if (data.extra_shot !== undefined) setExtraShot(data.extra_shot);
      
      gsap.fromTo(
        ".preview-card",
        { rotateY: 5 },
        { rotateY: 0, duration: 0.4, ease: "back.out(1.2)" }
      );
    };

    window.addEventListener('loadCoffeeRitual', handleLoad as EventListener);
    return () => window.removeEventListener('loadCoffeeRitual', handleLoad as EventListener);
  }, []);


  const calculatePrice = () => {
    let total = BASE_PRICES[size];
    if (extraShot) total += 1.00;
    if (temperature === "blended") total += 0.50;
    return total;
  };

  const loadPreset = (preset: typeof PRESETS[0]) => {
    setRoast(preset.roast);
    setMilk(preset.milk);
    setSweetness(preset.sweetness);
    setStrength(preset.strength);
    setTemperature(preset.temperature);
    setSize(preset.size);
    setSyrup(preset.syrup);
    setExtraShot(preset.extraShot);
    
    gsap.fromTo(
      ".preview-card",
      { rotateY: 5 },
      { rotateY: 0, duration: 0.4, ease: "back.out(1.2)" }
    );
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const shareBuild = () => {
    const drinkName = DRINK_NAMES[roast][milk];
    const text = `I built my perfect coffee on Auroma ☕ '${drinkName}' — ${SWEETNESS_LABELS[sweetness]} · ${strength + (extraShot ? 1 : 0)} Shot${(strength + (extraShot ? 1 : 0)) > 1 ? "s" : ""} · ${temperature} · ${size}. Build yours at auroma.coffee`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const validateForm = () => {
    const errors: { name?: string; phone?: string } = {};
    if (!customerName.trim()) errors.name = "Name is required";
    if (!customerPhone.trim()) errors.phone = "Phone number is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitOrder = async () => {
    if (!validateForm()) return;

    setOrderStatus('submitting');
    try {
      const orderData = {
        customer_name: customerName,
        customer_phone: customerPhone,
        drink_name: DRINK_NAMES[roast][milk],
        roast,
        milk,
        sweetness,
        strength: `${strength} Shot${strength > 1 ? 's' : ''}`,
        temperature,
        cup_size: size,
        syrup,
        extra_shot: extraShot,
        ritual_name: ritualName || null,
        description: description || null,
        price: calculatePrice(),
        status: 'pending'
      };

      const { error } = await supabase.from('orders').insert([orderData]);

      if (error) throw error;

      setOrderStatus('success');
      // Scroll to success message using gsap if needed
    } catch (error) {
      console.error("Order submission error: ", error);
      setOrderStatus('error');
    }
  };

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
    <section id="build-your-ritual" className="relative w-full py-20 bg-[#FAF4EC] px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center animate-in">
          <h2 className="text-3xl md:text-5xl font-bold font-playfair text-[#2C1A0E] mb-3 tracking-tight">
            Build Your Ritual
          </h2>
          <p className="text-sm md:text-base text-charcoal/70 font-dm-sans max-w-md mx-auto">
            Every choice is yours. Exactly yours.
          </p>
        </div>

        {/* Two Columns Grid - Mobile stacks preview first, Desktop side-by-side */}
        <div className="flex flex-col-reverse lg:flex-row gap-10 items-start w-full">
          
          {/* Controls - Left Column */}
          <div className="flex flex-col gap-8 animate-in">
            
            {/* Control 1: Roast Level */}
            <div className="flex flex-col gap-2">
              <label className="text-espresso font-semibold font-dm-sans text-md">Roast Level</label>
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
              <p className="font-caveat text-charcoal/80 text-md mt-1">{ROAST_NOTES[roast]}</p>
            </div>

            {/* Control 2: Milk Type */}
            <div className="flex flex-col gap-2">
              <label className="text-espresso font-semibold font-dm-sans text-md">Milk Type</label>
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
              <p className="font-caveat text-charcoal/80 text-md mt-1">{MILK_NOTES[milk]}</p>
            </div>

            {/* Control 3: Sweetness */}
            <div className="flex flex-col gap-2">
              <label className="text-espresso font-semibold font-dm-sans text-md">Sweetness</label>
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
            <div className="flex flex-col gap-2">
              <label className="text-espresso font-semibold font-dm-sans text-md">Strength</label>
              <div className="flex gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setStrength(num)}
                    className={`flex-1 py-2 rounded-xl font-dm-sans font-bold text-xs transition-all duration-200 ${
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
                {[...Array(strength + (extraShot ? 1 : 0))].map((_, i) => (
                  <Coffee key={i} className="w-4 h-4 fill-caramel text-caramel" />
                ))}
              </div>
            </div>

            {/* Control 5: Temperature */}
            <div className="flex flex-col gap-2">
              <label className="text-espresso font-semibold font-dm-sans text-md">Temperature</label>
              <div className="flex flex-wrap gap-2">
                {TEMPS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemperature(t.id)}
                    className={`px-4 py-2 rounded-full font-dm-sans text-sm font-semibold transition-all duration-200 ${
                      temperature === t.id 
                        ? "bg-jade text-cream shadow-md" 
                        : "bg-cream-dark text-charcoal hover:bg-cream-dark/80"
                    }`}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
              <p className="font-caveat text-charcoal/80 text-md mt-1">{TEMP_NOTES[temperature]}</p>
            </div>

            {/* Control 6: Cup Size */}
            <div className="flex flex-col gap-2">
              <label className="text-espresso font-semibold font-dm-sans text-md">Cup Size</label>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.id)}
                    className={`flex-1 py-2 rounded-xl font-dm-sans font-bold text-sm transition-all duration-200 ${
                      size === s.id 
                        ? "bg-espresso text-cream shadow-md" 
                        : "bg-cream-dark text-charcoal hover:bg-cream-dark/80"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="text-caramel font-bold font-dm-sans text-sm mt-1">${BASE_PRICES[size].toFixed(2)}</p>
            </div>

            {/* Control 7: Flavor Syrup */}
            <div className="flex flex-col gap-2">
              <label className="text-espresso font-semibold font-dm-sans text-md">Flavor Syrup</label>
              <div className="flex flex-wrap gap-2">
                {SYRUPS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSyrup(s.id)}
                    className={`px-4 py-2 rounded-full font-dm-sans text-sm font-semibold transition-all duration-200 ${
                      syrup === s.id 
                        ? "bg-jade text-cream shadow-md" 
                        : "bg-cream-dark text-charcoal hover:bg-cream-dark/80"
                    }`}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
              <p className="font-caveat text-charcoal/80 text-md mt-1">{SYRUP_NOTES[syrup]}</p>
            </div>

            {/* Control 8: Extra Shot */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-espresso font-semibold font-dm-sans text-md">Extra Shot</span>
                <button 
                  onClick={() => setExtraShot(!extraShot)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                    extraShot ? "bg-jade" : "bg-cream-dark"
                  }`}
                >
                  <motion.div 
                    layout
                    className="bg-cream w-4 h-4 rounded-full shadow-md"
                  />
                </button>
              </div>
              <p className="font-caveat text-charcoal/80 text-md">For when one isn't enough and you know it (+$1.00)</p>
            </div>

            {/* Control 9: Describe Your Coffee */}
            <div className="flex flex-col gap-2">
              <label className="text-espresso font-semibold font-playfair text-lg">Anything else? Describe your vibe <span className="text-xs font-normal text-charcoal/50">(optional)</span></label>
              <p className="text-xs text-charcoal/70 font-dm-sans mb-1">Tell us exactly how you want it to feel. We'll read every word.</p>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 300))}
                className="w-full h-24 p-3 border rounded-xl outline-none font-dm-sans text-sm bg-[#FAF4EC] text-[#3A3A3A] placeholder:text-[#3A3A3A]/40 border-[#C9893A]/30 focus:border-[#C9893A] resize-none"
                placeholder="e.g. 'Not too bitter, warm, a little sweet — like a hug on a rainy day. Maybe a hint of vanilla...'"
              />
              <span className="text-right text-[10px] text-charcoal/50">{description.length}/300</span>
            </div>

          </div>

          {/* Live Preview & Order Form - Right Column */}
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto lg:sticky lg:top-20 animate-in">
            
            {/* Live Preview Card */}
            <div className="preview-card w-full bg-cream border border-espresso/5 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center text-espresso">
              
              {/* Dynamic Drink Illustration */}
              <div className="w-full h-40 flex items-center justify-center mb-4 relative">
                <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
                  {/* Cup Shape mapping temperature */}
                  {temperature === "iced" ? (
                    // Tall Glass
                    <path d="M30 20 L35 85 Q35 90 45 90 L55 90 Q65 90 65 85 L70 20 Z" fill="#FaF4Ec" fillOpacity="0.2" stroke="#2C1A0E" strokeWidth="3" />
                  ) : temperature === "blended" ? (
                    // Wide Cup
                    <path d="M20 30 L30 85 Q30 90 40 90 L60 90 Q70 90 70 85 L80 30 Z" fill="#FaF4Ec" fillOpacity="0.1" stroke="#2C1A0E" strokeWidth="3" />
                  ) : (
                    // Regular Mug
                    <path d="M25 40 L25 80 Q25 90 35 90 L65 90 Q75 90 75 80 L75 40" fill="#fcf8f2" stroke="#2C1A0E" strokeWidth="3"/>
                  )}

                  {/* Coffee Fill Level */}
                  {temperature === "iced" ? (
                    <path d="M32 30 L35 84 Q35 89 45 89 L55 89 Q65 89 65 84 L68 30 Z" fill={getCoffeeColor()} className="transition-all duration-300" />
                  ) : temperature === "blended" ? (
                    <path d="M23 40 L30 84 Q30 89 40 89 L60 89 Q70 89 70 84 L77 40 Z" fill={getCoffeeColor()} className="transition-all duration-300" />
                  ) : (
                    <path d="M26 44 L26 80 Q26 89 35 89 L65 89 Q74 89 74 80 L74 44 Z" fill={getCoffeeColor()} className="transition-all duration-300" />
                  )}

                  {/* Milk/Foam Layer */}
                  {milk !== "none" && (
                    <ellipse cx={50} cy={temperature === "iced" ? 30 : temperature === "blended" ? 40 : 44} rx={temperature === "iced" ? 18 : 25} ry={4} fill="#FaF4Ec" />
                  )}

                  {/* Syrup Drizzle */}
                  {syrup !== "none" && milk !== "none" && (
                    <ellipse cx={50} cy={temperature === "iced" ? 30 : temperature === "blended" ? 40 : 44} rx={12} ry={2} fill="none" stroke={syrup === "caramel" ? "#C9893A" : syrup === "vanilla" ? "#F3E5AB" : "#4A2511"} strokeWidth="2" />
                  )}

                  {/* Handle (only for Hot layout mug) */}
                  {temperature === "hot" && (
                    <path d="M75 50 Q90 50 90 60 Q90 70 75 70" fill="none" stroke="#2C1A0E" strokeWidth="4" />
                  )}
                  
                  {/* Cup Shadow */}
                  <ellipse cx="50" cy="95" rx="25" ry="4" fill="#E0D7CD" />
                </svg>

                {/* Sparkling Sweetness */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(sweetness)].map((_, i) => (
                    <Sparkles key={i} className={`absolute w-3 h-3 text-caramel animate-pulse`} 
                      style={{
                        top: `${40 + i*10}%`,
                        left: `${45 + (i&1? 12: -12)}%`
                      }} 
                    />
                  ))}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="preview-content w-full flex flex-col items-center">
                <h3 className="text-xl font-bold font-playfair mb-1 text-espresso">
                  {DRINK_NAMES[roast][milk]}
                </h3>

                <p className="text-caramel font-bold font-dm-sans text-md mb-3">
                  ${calculatePrice().toFixed(2)}
                </p>

                <div className="flex gap-1.5 flex-wrap justify-center mb-4">
                  <span className="text-[10px] font-dm-sans font-semibold px-2 py-0.5 bg-espresso/5 rounded-full">{SWEETNESS_LABELS[sweetness]}</span>
                  <span className="text-[10px] font-dm-sans font-semibold px-2 py-0.5 bg-espresso/5 rounded-full">{strength + (extraShot ? 1 : 0)} Shot{(strength + (extraShot ? 1 : 0))>1?"s":""}</span>
                  <span className="text-[10px] font-dm-sans font-semibold px-2 py-0.5 bg-espresso/5 rounded-full">{temperature}</span>
                  <span className="text-[10px] font-dm-sans font-semibold px-2 py-0.5 bg-espresso/5 rounded-full">{size}</span>
                  {syrup !== 'none' && <span className="text-[10px] font-dm-sans font-semibold px-2 py-0.5 bg-espresso/5 rounded-full">{syrup}</span>}
                </div>

                <p className="font-dm-sans text-[11px] text-charcoal/70 mb-1">
                  {TASTING_NOTES[roast]}
                </p>

                <p className="font-caveat text-caramel text-md italic mb-4">
                  &ldquo;{AROMA_NOTES[roast]}&rdquo;
                </p>

                <div className="w-full text-left mb-4">
                  <span className="text-[10px] font-bold font-dm-sans text-espresso/50 mb-1 block">Ritual Name</span>
                  <input 
                    type="text" 
                    value={ritualName}
                    onChange={(e) => setRitualName(e.target.value)}
                    placeholder="e.g., My 6am Weapon"
                    className="w-full border-b border-espresso/20 focus:border-caramel outline-none bg-transparent font-dm-sans text-sm py-1"
                  />
                  <p className="text-[9px] text-charcoal/50 font-caveat mt-0.5">Optional. but it makes it yours.</p>
                </div>
              </div>

            </div>

            {/* Add to Cart Action */}
            <div className="w-full bg-cream border border-espresso/5 rounded-3xl p-6 shadow-xl flex flex-col text-espresso mt-4">
              <button 
                onClick={() => {
                  useCartStore.getState().addItem({
                    id: `ritual-${Date.now()}`,
                    name: ritualName || `${DRINK_NAMES[roast][milk]}`,
                    description: `${roast} roast, ${milk} milk, ${SWEETNESS_LABELS[sweetness]}, ${strength + (extraShot ? 1 : 0)} shots, ${temperature}, ${size}${syrup !== 'none' ? ` + ${syrup}` : ''}`,
                    price: calculatePrice(),
                    category: 'Signatures',
                    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=600&auto=format&fit=crop',
                    dietaryTags: [milk === 'oat' || milk === 'almond' ? 'Vegan' : 'Standard']
                  });
                  
                  // Optional: success toast or reveal
                }}
                className="w-full py-3 bg-caramel hover:bg-caramel/90 text-espresso font-bold rounded-full font-dm-sans flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_10px_rgba(201,137,58,0.3)] hover:shadow-[0_4px_15px_rgba(201,137,58,0.5)] cursor-pointer"
              >
                Add Custom Ritual to Cart — ${calculatePrice().toFixed(2)}
              </button>
            </div>
          </div> {/* closes right column */}
        </div> {/* closes flex row */}

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
      <AnimatePresence>
        {isCopied && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-espresso text-cream rounded-xl font-dm-sans text-xs font-bold shadow-xl border border-caramel/20 flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-caramel" />
            Build copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
