"use client";

import { motion } from "framer-motion";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description: "Citrus, floral, and basically a morning in a cup.",
    price: "$6.00",
  },
  {
    id: 2,
    name: "Double Espresso",
    description: "No compromises. Just clarity.",
    price: "$4.00",
  },
  {
    id: 3,
    name: "Lavender Oat Latte",
    description: "Your nervous system called. It wants this.",
    price: "$7.00",
  },
  {
    id: 4,
    name: "Caramel Macchiato",
    description: "Classic for a reason. Your reason.",
    price: "$8.00",
  },
];

export default function MenuTeaser() {
  return (
    <section id="menu" className="relative w-full py-20 bg-espresso px-6 md:px-12 flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,var(--color-caramel)_0%,transparent_50%)] opacity-5 pointer-events-none" />

      <h2 className="text-3xl md:text-5xl font-bold font-playfair text-cream text-center mb-12 tracking-tight">
        A few of our signatures
      </h2>

      {/* Grid or Horizontal scroll on Mobile */}
      <div className="flex overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
        {MENU_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="min-w-[280px] md:min-w-0 flex-shrink-0 snap-center p-6 bg-cream-dark/5 backdrop-blur-sm border border-cream/10 rounded-2xl flex flex-col items-start gap-4 hover:border-caramel/30 transition-all duration-300 group"
          >
            <div className="w-full h-40 bg-cream/10 rounded-xl mb-2 flex items-center justify-center text-cream/40 font-playfair text-xl">
              [Image]
            </div>

            <h3 className="text-xl font-bold font-playfair text-cream group-hover:text-caramel transition-colors">
              {item.name}
            </h3>

            <p className="text-cream/70 font-dm-sans text-sm leading-relaxed flex-grow">
              {item.description}
            </p>

            <div className="w-full flex items-center justify-between mt-2 pt-4 border-t border-cream/10">
              <span className="text-caramel font-bold font-dm-sans">{item.price}</span>
              <button className="px-4 py-1.5 border border-caramel/60 hover:border-caramel text-caramel hover:bg-caramel hover:text-espresso font-semibold rounded-full font-dm-sans text-xs transition-all duration-300">
                Add to Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
