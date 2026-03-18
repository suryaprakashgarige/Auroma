"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Share2, RefreshCw } from "lucide-react";
import { QUESTIONS, calculateResult, DrinkResult } from "@/lib/quizLogic";
import { useCartStore } from "@/store/useCartStore";
import { menuItems } from "@/lib/mockData";

export default function BrewBlueprintQuiz({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const { addItem } = useCartStore();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<DrinkResult | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Result
      const calculated = calculateResult(answers);
      setResult(calculated);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const shareResult = () => {
    if (!result) return;
    const shareText = `Auroma says I'm ${result.persona} ☕ My match: ${result.name}. Find yours at auroma.coffee`;
    navigator.clipboard.writeText(shareText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-espresso/98 backdrop-blur-md flex flex-col items-center justify-center p-6 overflow-y-auto"
      >
        {/* Close Button or Back */}
        <div className="absolute top-6 left-6 flex items-center gap-4">
          {!result && currentStep > 0 && (
            <button onClick={handleBack} className="text-cream/80 hover:text-cream flex items-center gap-1 font-dm-sans text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
        </div>
        <button onClick={onClose} className="absolute top-6 right-6 text-cream/60 hover:text-cream text-xl font-bold font-dm-sans">
          ✕
        </button>

        {!result ? (
          /* QUIZ QUESTIONS SCREEN */
          <div className="w-full max-w-2xl flex flex-col items-center">
            {/* Progress Bar */}
            <div className="w-full bg-cream-dark/10 h-1.5 rounded-full mb-12">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="bg-caramel h-full rounded-full"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center"
              >
                <div className="text-caramel font-caveat text-xl mb-3">Step {currentStep + 1} of 5</div>
                <h2 className="text-2xl md:text-4xl font-bold font-playfair text-cream text-center mb-8">
                  {currentQuestion.text}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(currentQuestion.id, option.id)}
                        className={`p-5 rounded-xl border-2 font-dm-sans text-left transition-all duration-300 flex items-center justify-between ${
                          isSelected 
                            ? "border-jade bg-jade/10 text-cream" 
                            : "border-cream/20 bg-cream/5 text-cream/90 hover:border-cream/40"
                        }`}
                      >
                        <span className="font-medium">{option.text}</span>
                        {isSelected && <Check className="w-5 h-5 text-jade" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-10 flex w-full justify-center">
                  <button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className={`px-8 py-3 rounded-full font-bold font-dm-sans tracking-wide transition-all ${
                      answers[currentQuestion.id] 
                        ? "bg-caramel text-espresso shadow-[0_0_15px_var(--color-caramel)]" 
                        : "bg-cream-dark/20 text-cream-dark/40 cursor-not-allowed"
                    }`}
                  >
                    {currentStep === QUESTIONS.length - 1 ? "Get Results" : "Next →"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* RESULT SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-cream-dark p-6 md:p-8 md:rounded-3xl rounded-none h-full md:h-auto overflow-y-auto flex flex-col items-center text-center shadow-2xl text-espresso"
          >
            <div className="text-caramel font-caveat text-2xl mb-1">You&apos;re {result.persona}</div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-3">
              {result.name}
            </h2>

            <div className="flex gap-2 flex-wrap justify-center mb-5">
              {result.tags.map((tag) => (
                <span key={tag} className="text-xs font-bold font-dm-sans px-3 py-1 bg-espresso/5 rounded-full border border-espresso/10">
                  {tag}
                </span>
              ))}
            </div>

            <p className="font-dm-sans text-charcoal/90 text-sm leading-relaxed mb-6">
              {result.description}
            </p>

            <div className="w-full text-left bg-espresso/5 rounded-xl p-4 mb-6 border border-espresso/10">
              <span className="text-xs font-bold font-dm-sans uppercase text-caramel">Why this?</span>
              <p className="text-xs font-dm-sans text-charcoal mb-0 mt-1">{result.whyThis}</p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={() => {
                  const mapping: Record<string, string> = {
                    ethiopian: "2",
                    espresso: "3",
                    lavender: "1",
                    macchiato: "5",
                    coldbrew: "6",
                    matcha: "7"
                  };
                  const itemId = mapping[result.id];
                  const item = menuItems.find(i => i.id === itemId);
                  if (item) {
                    // Apply 10% discount to price & name label
                    addItem({
                      ...item,
                      price: Number((item.price * 0.9).toFixed(2)),
                      name: `${item.name} (Quiz Match)`
                    });
                    onClose();
                  }
                }}
                className="w-full py-3 bg-caramel hover:bg-caramel/90 text-espresso font-bold rounded-full font-dm-sans shadow-md cursor-pointer"
              >
                Add to Order - 10% Off
              </button>
              <button 
                onClick={shareResult}
                className="w-full py-3 border border-espresso/20 hover:border-espresso text-espresso font-semibold rounded-full font-dm-sans flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" /> Share My Result
              </button>
            </div>

            <button onClick={resetQuiz} className="mt-5 text-caramel font-semibold text-sm font-dm-sans hover:underline flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Retake Quiz
            </button>
          </motion.div>
        )}
        {isCopied && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-espresso text-cream rounded-xl font-dm-sans text-xs font-bold shadow-xl border border-caramel/20 flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-caramel" />
            Result copied!
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
