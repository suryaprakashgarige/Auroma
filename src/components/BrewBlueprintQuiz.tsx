"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, RefreshCw, ShoppingBag, Copy, Star } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What time are you usually drinking coffee?",
    options: ["Early morning (before 8am)", "Mid morning (8–11am)", "Afternoon", "Evening"]
  },
  {
    id: 2,
    question: "How do you feel right now?",
    options: ["Tired and need a kick", "Calm and focused", "Anxious and stressed", "Happy and social"]
  },
  {
    id: 3,
    question: "What's your milk preference?",
    options: ["Oat milk", "Almond milk", "Regular dairy", "No milk (black)"]
  },
  {
    id: 4,
    question: "How strong do you want it?",
    options: ["Light and smooth", "Medium balanced", "Strong and bold", "As strong as possible"]
  },
  {
    id: 5,
    question: "Hot or cold?",
    options: ["Always hot", "Iced all the way", "Depends on mood", "Room temperature is fine"]
  }
];

const QUIZ_RESULTS = {
  energize: { id: "roulette-3", name: "Double Espresso", price: "$3.50", code: "QUIZ10", discount: "10% off your first order", emoji: "⚡" },
  calm: { id: "roulette-2", name: "Ethiopian Yirgacheffe Pour Over", price: "$5.50", code: "QUIZ10", discount: "10% off your first order", emoji: "🌿" },
  comfort: { id: "roulette-1", name: "Oat Milk Lavender Latte", price: "$6.50", code: "QUIZ10", discount: "10% off your first order", emoji: "🌸" },
  cool: { id: "roulette-4", name: "Cold Brew Vanilla", price: "$5.00", code: "QUIZ10", discount: "10% off your first order", emoji: "🧊" },
};

export default function BrewBlueprintQuiz({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<typeof QUIZ_RESULTS.energize | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { addItem } = useCartStore();

  if (!isOpen) return null;

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Result logic:
      // Answer 1 = index 0, Answer 2 = index 1, etc.
      const tired = newAnswers[1] === "Tired and need a kick";
      const strong = newAnswers[3] === "Strong and bold" || newAnswers[3] === "As strong as possible";
      const calm = newAnswers[1] === "Calm and focused";
      const dairyAlternative = newAnswers[2] === "Oat milk" || newAnswers[2] === "Almond milk";
      const iced = newAnswers[4] === "Iced all the way";

      if (tired && strong) setResult(QUIZ_RESULTS.energize);
      else if (calm) setResult(QUIZ_RESULTS.calm);
      else if (dairyAlternative) setResult(QUIZ_RESULTS.comfort);
      else if (iced) setResult(QUIZ_RESULTS.cool);
      else setResult(QUIZ_RESULTS.calm); // fallback
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-espresso/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
      >
        <div className="w-full max-w-2xl relative">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute -top-12 right-0 text-cream/40 hover:text-cream transition-all p-2"
          >
            ✕ Close
          </button>

          {!result ? (
            /* QUESTIONS FLOW */
            <div className="flex flex-col items-center gap-8">
              {/* Progress Bar */}
              <div className="w-full space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-caveat text-caramel text-xl">Question {currentStep + 1} of 5</span>
                  <span className="font-dm-sans text-xs text-cream/40 uppercase tracking-widest">{Math.round((currentStep / 5) * 100)}% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / 5) * 100}%` }}
                    className="h-full bg-caramel shadow-[0_0_15px_rgba(212,168,83,0.5)]"
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex flex-col gap-8"
                >
                  <h2 className="text-3xl md:text-5xl font-bold font-playfair text-cream leading-tight">
                    {QUIZ_QUESTIONS[currentStep].question}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-caramel hover:border-caramel transition-all duration-300"
                      >
                        <span className="relative z-10 font-dm-sans text-cream group-hover:text-espresso font-semibold">
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {currentStep > 0 && (
                <button 
                  onClick={handleBack}
                  className="mt-4 flex items-center gap-2 text-cream/40 hover:text-cream transition-all font-dm-sans text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to previous question
                </button>
              )}
            </div>
          ) : (
            /* RESULT SCREEN */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-cream rounded-[40px] p-8 md:p-12 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-caramel" />
              
              <div className="text-7xl mb-6">{result.emoji}</div>
              <h2 className="text-4xl md:text-5xl font-black font-playfair text-espresso leading-none mb-2">
                Your Auroma Match
              </h2>
              <p className="font-caveat text-2xl text-caramel mb-8">Refining your morning frequency...</p>

              <div className="w-full bg-espresso/5 rounded-3xl p-8 border border-espresso/10 mb-8">
                <h3 className="text-2xl font-bold font-playfair text-espresso mb-1">{result.name}</h3>
                <p className="text-caramel font-bold font-dm-sans mb-4">{result.price}</p>
                <div className="flex items-center justify-center gap-1 text-caramel mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-caramel" />)}
                  <span className="text-espresso/60 text-xs ml-2 font-dm-sans">(120+ happy drinkers)</span>
                </div>
              </div>

              {/* Discount Badge */}
              <div className="w-full flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold font-dm-sans text-espresso/40 uppercase tracking-widest">Your Exclusive Perk</span>
                  <div 
                    onClick={copyToClipboard}
                    className="group cursor-pointer flex items-center gap-3 px-6 py-3 bg-espresso text-cream rounded-2xl relative overflow-hidden"
                  >
                    <span className="font-mono font-bold text-xl tracking-tighter">{result.code}</span>
                    <div className="w-px h-6 bg-white/20" />
                    <Copy className="w-4 h-4 text-caramel group-hover:scale-110 transition-transform" />
                    {isCopied && (
                      <div className="absolute inset-0 bg-jade text-espresso font-bold flex items-center justify-center text-xs">
                        COPIED!
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-caramel mt-1">{result.discount}</span>
                </div>

                <div className="flex flex-col gap-3 w-full mt-4">
                  <button 
                    onClick={() => {
                      addItem({
                        id: result.id,
                        name: `${result.name} (Quiz Match)`,
                        price: parseFloat(result.price.replace('$', '')),
                        description: "Your personalized match from the Brew Blueprint Quiz.",
                        category: 'Signatures',
                        imageUrl: "https://images.unsplash.com/photo-1544787210-2211d7c862a4?q=80&w=600&auto=format&fit=crop",
                        dietaryTags: ["Quiz Favorite"]
                      });
                      onClose();
                    }}
                    className="w-full py-5 bg-espresso text-cream font-bold rounded-2xl flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-xl"
                  >
                    <ShoppingBag className="w-5 h-5 text-caramel" />
                    Claim My Match
                  </button>
                  <button 
                    onClick={restart}
                    className="text-espresso/40 hover:text-espresso transition-all flex items-center justify-center gap-2 font-dm-sans text-sm font-bold mt-4"
                  >
                    <RefreshCw className="w-4 h-4" /> Retake Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
