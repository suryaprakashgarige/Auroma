"use client";

import { motion } from "framer-motion";

const GALLERY_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&auto=format&fit=crop", span: "row-span-2 col-span-2", title: "Ritual" },
  { id: 2, url: "https://images.unsplash.com/photo-1506372023823-741c83b836fe?q=80&w=400&auto=format&fit=crop", span: "row-span-1 col-span-1", title: "Pour" },
  { id: 3, url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop", span: "row-span-1 col-span-1", title: "Steam" },
  { id: 4, url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400&auto=format&fit=crop", span: "row-span-1 col-span-1", title: "Beans" },
  { id: 5, url: "https://images.unsplash.com/photo-1507133769160-bd8338650444?q=80&w=400&auto=format&fit=crop", span: "row-span-2 col-span-1", title: "Mood" },
  { id: 6, url: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=400&auto=format&fit=crop", span: "row-span-1 col-span-1", title: "Art" },
];

export default function InstagramGallery() {
  return (
    <section id="gallery" className="relative w-full py-20 bg-espresso px-6 md:px-12 flex flex-col items-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-1 mx-auto">
          <span className="font-caveat text-caramel text-xl">The Atmosphere</span>
          <h2 className="text-3xl md:text-5xl font-bold font-playfair text-cream tracking-tight">
            Capturing the Roast
          </h2>
          <p className="text-sm md:text-base text-cream/70 font-dm-sans max-w-sm mt-1">
            Visual visual storytelling from our micro-labs and coffee houses.
          </p>
        </div>

        {/* Masonry-Grid (Faux) grid using standard responsive grid column setups */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] max-w-5xl mx-auto w-full">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.span} border border-cream/5 shadow-[0_10px_30px_rgba(0,0,0,0.4)]`}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Blur Overlay Hover effect */}
              <div className="absolute inset-0 bg-espresso/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center">
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
