// src/components/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Sarah J.",
    role: "Regular",
    text: "The Mood Brew Scanner accurately guessed I needed a double shot. Best Oat Milk Latte in the city.",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Marcus K.",
    role: "Espresso Enthusiast",
    text: "Roast Roulette is dangerous. I wound up orderin the Lavender Infusion on a win and now I am obsessed. 10/10 concept.",
    date: "1 week ago"
  },
  {
    id: 3,
    name: "Elena R.",
    role: "Home Brewer",
    text: "Ordered a custom Ritual (medium roast, oat, single shot, hot) and it was waiting for me Skip-The-Line. Highly frictionless and delicious.",
    date: "3 days ago"
  }
];

export default function Testimonials() {
  return (
    <section className="w-full py-24 bg-espresso text-cream flex items-center justify-center px-6 md:px-12 border-y border-white/5">
      <div className="max-w-6xl w-full flex flex-col items-center gap-12">
        
        <div className="text-center flex flex-col items-center gap-2">
          <span className="font-caveat text-caramel text-2xl md:text-3xl">Social Proof</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-black tracking-tight leading-tight">
            Loved by the Frequency
          </h2>
          <p className="font-dm-sans text-cream/60 text-xs md:text-sm max-w-md mt-1">
            Read what our community feels about their tailored frequency cups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {REVIEWS.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex flex-col justify-between gap-4 group hover:bg-white/10 transition-all cursor-default"
            >
              <div className="flex flex-col gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-4 h-4 text-caramel fill-caramel" />
                  ))}
                </div>
                <p className="font-dm-sans text-sm text-cream/90 leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="font-playfair font-bold text-sm text-cream">{review.name}</span>
                  <span className="font-dm-sans text-[10px] text-caramel/80">{review.role}</span>
                </div>
                <span className="font-dm-sans text-[9px] text-cream/40">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
