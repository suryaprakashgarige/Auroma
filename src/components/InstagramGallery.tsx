// components/social/InstagramGallery.tsx
"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const GALLERY_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop", title: "Ritual" },
  { id: 2, url: "https://images.unsplash.com/photo-1506372023823-741c83b836fe?q=80&w=600&auto=format&fit=crop", title: "Pour" },
  { id: 3, url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop", title: "Steam" },
  { id: 4, url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop", title: "Beans" },
  { id: 5, url: "https://images.unsplash.com/photo-1507133769160-bd8338650444?q=80&w=600&auto=format&fit=crop", title: "Mood" },
  { id: 6, url: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=600&auto=format&fit=crop", title: "Art" },
  { id: 7, url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop", title: "Roast" },
  { id: 8, url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop", title: "Vibe" },
];

export default function InstagramGallery() {
  return (
    <section id="gallery" className="relative w-full py-24 bg-espresso px-6 md:px-12 flex flex-col items-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 mx-auto">
          <span className="font-caveat text-caramel text-2xl">The Atmosphere</span>
          <h2 className="text-3xl md:text-5xl font-bold font-playfair text-cream tracking-tight">
            Follow the Aroma @AuromaCafe
          </h2>
          <p className="text-sm md:text-base text-cream/70 font-dm-sans max-w-sm mt-1">
            Visual storytelling from our micro-labs and coffee houses.
          </p>
        </div>

        {/* CSS Columns Masonry Grid */}
        <div className="columns-2 md:columns-4 gap-4 max-w-5xl mx-auto w-full space-y-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer border border-cream/5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] break-inside-avoid mb-4"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              
              {/* Instagram Heart Overlay Hover effect */}
              <div className="absolute inset-0 bg-espresso/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <Heart className="w-8 h-8 text-cream fill-cream/20 scale-75 group-hover:scale-100 transition-transform duration-300 ease-out" />
                <div className="flex flex-col items-center gap-1 scale-95 group-hover:scale-100 transition-transform duration-300">
                  <span className="text-xs font-dm-sans text-caramel font-bold uppercase tracking-widest">{img.title}</span>
                  <div className="w-4 h-[1px] bg-cream/60" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
