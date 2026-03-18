"use client";

import { motion } from "framer-motion";
import { Star, Heart, Clock } from "lucide-react";

const RECOMMENDATIONS = [
  {
    id: 1,
    category: "Based on your Mood Scan",
    name: "Midnight Espresso",
    description: "For the high-stress solvers. Smooth, dark, absolute clarity.",
    price: "$5.50",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Trending in your area",
    name: "Golden Oat Flat White",
    description: "Creamy, smooth, with a hint of honey notes.",
    price: "$6.50",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 3,
    category: "Matches your Custom Ritual",
    name: "Cold Brew Tonic",
    description: "Sparkling, refreshing, with a bright citrus kick.",
    price: "$7.00",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 4,
    category: "Seasonal Drop",
    name: "Maple Pecan Latte",
    description: "Sweet, nutty, and perfect for slower mornings.",
    price: "$6.00",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1507133769160-bd8338650444?q=80&w=300&auto=format&fit=crop"
  }
];

export default function RecommendationFeed() {
  const categories = Array.from(new Set(RECOMMENDATIONS.map(r => r.category)));

  return (
    <section id="recommendations" className="relative w-full py-20 bg-espresso px-6 md:px-12 flex flex-col items-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-1">
          <span className="font-caveat text-caramel text-xl">For You</span>
          <h2 className="text-3xl md:text-5xl font-bold font-playfair text-cream tracking-tight">
            Tailored Recommendations
          </h2>
          <p className="text-sm md:text-base text-cream/70 font-dm-sans max-w-sm mt-1">
            Algorithmically matched to your scanned mood and brewing blueprint quiz.
          </p>
        </div>

        {/* Dynamic Categories (Netflix Vibe) */}
        {categories.map((cat, catIndex) => {
          const items = RECOMMENDATIONS.filter(r => r.category === cat);
          return (
            <div key={cat} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-caramel" />
                <h3 className="text-lg font-bold font-playfair text-cream/90">{cat}</h3>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    className="min-w-[280px] max-w-[280px] flex-shrink-0 snap-center p-4 bg-cream-dark/5 border border-cream/5 rounded-2xl flex flex-col items-start gap-3 hover:border-caramel/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-cream/5 relative mb-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 p-1.5 bg-espresso/80 backdrop-blur-md rounded-full text-caramel">
                        <Heart className="w-4 h-4 hover:fill-caramel cursor-pointer transition-colors" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full">
                      <h4 className="text-md font-bold font-playfair text-cream group-hover:text-caramel transition-colors">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-0.5 text-xs text-caramel font-bold">
                        <Star className="w-3.5 h-3.5 fill-caramel" /> {item.rating}
                      </div>
                    </div>

                    <p className="text-cream/60 font-dm-sans text-xs leading-relaxed flex-grow">
                      {item.description}
                    </p>

                    <div className="w-full flex items-center justify-between mt-1 pt-3 border-t border-cream/5">
                      <span className="text-caramel font-bold font-dm-sans text-sm">{item.price}</span>
                      <button className="px-3 py-1 bg-caramel text-espresso font-bold rounded-full font-dm-sans text-[10px] hover:bg-caramel/90 transition-colors">
                        Order Matches
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}

      </div>
    </section>
  );
}
