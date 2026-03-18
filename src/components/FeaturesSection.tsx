"use client";

import { Brain, Shuffle, Sliders, Smile } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    id: "quiz",
    icon: Brain,
    name: "Brew Blueprint",
    description: "Answer 5 questions. Get your coffee soulmate.",
    link: "#quiz",
    active: true,
  },
  {
    id: "shuffle",
    icon: Shuffle,
    name: "Roast Roulette",
    description: "Feeling adventurous? Let the universe decide.",
    link: "#",
    active: false,
  },
  {
    id: "sliders",
    icon: Sliders,
    name: "Build Your Ritual",
    description: "Your exact coffee. Your name on it.",
    link: "#",
    active: false,
  },
  {
    id: "mood",
    icon: Smile,
    name: "Mood Brew Scan",
    description: "Show us your face. We'll show you your cup.",
    link: "#",
    active: false,
  },
];

export default function FeaturesSection({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <section id="features" className="relative w-full py-20 bg-cream px-6 md:px-12 flex flex-col items-center">
      {/* Small accent layout */}
      <h2 className="text-3xl md:text-5xl font-bold font-playfair text-espresso text-center mb-12 tracking-tight">
        Four ways to find your perfect cup
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl bg-cream-dark border-2 border-transparent hover:border-jade/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-4 group"
            >
              <div className="p-4 rounded-xl bg-espresso flex items-center justify-center text-caramel group-hover:bg-caramel group-hover:text-espresso transition-colors duration-300">
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-bold font-playfair text-espresso">
                {feature.name}
              </h3>

              <p className="text-charcoal/80 font-dm-sans text-base leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-4">
                {feature.active ? (
                  <button 
                    onClick={onOpenQuiz}
                    className="px-5 py-2 border-2 border-caramel/60 hover:border-caramel hover:bg-caramel text-espresso font-semibold rounded-full font-dm-sans tracking-wide text-sm transition-all duration-300"
                  >
                    Try It
                  </button>
                ) : (
                  <button 
                    disabled
                    className="px-5 py-2 border border-charcoal/20 bg-charcoal/5 text-charcoal/40 font-medium rounded-full font-dm-sans tracking-wide text-sm cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
