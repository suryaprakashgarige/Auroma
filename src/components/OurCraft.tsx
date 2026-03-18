// src/components/OurCraft.tsx
"use client";

import { motion } from "framer-motion";

export default function OurCraft() {
  return (
    <section className="w-full py-24 bg-[#F4EDE4] px-6 md:px-12 flex items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center">
        
        {/* Image Left */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] md:aspect-[3/4] md:h-[500px] w-full relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop" 
            alt="Coffee beans roasting" 
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Text Right */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col gap-5 text-espresso"
        >
          <span className="font-caveat text-caramel text-2xl md:text-3xl">Our Story</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-black tracking-tight leading-tight">
            Sourced with Purpose. <br />Roasted with Precision.
          </h2>
          <p className="font-dm-sans text-charcoal/80 text-sm md:text-base leading-relaxed max-w-lg">
            We partner directly with single-origin farmers in Ethiopia and Colombia to bring you beans that tell a story. Every batch is roasted in-house, ensuring the frequency of your cup matches the passion of its origin.
          </p>
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col border-l-2 border-caramel pl-4">
              <span className="font-playfair font-bold text-xl">100%</span>
              <span className="text-xs font-dm-sans text-charcoal/60">Single Origin</span>
            </div>
            <div className="flex flex-col border-l-2 border-caramel pl-4">
              <span className="font-playfair font-bold text-xl">Micro</span>
              <span className="text-xs font-dm-sans text-charcoal/60">Batch Roasted</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
