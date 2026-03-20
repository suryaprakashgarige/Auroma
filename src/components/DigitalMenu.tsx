"use client";
import { useEffect, useRef } from "react";
import { menuItems } from "@/lib/mockData";
import { useCartStore } from "@/store/useCartStore";
import { Plus } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function DigitalMenu() {
  const addItem = useCartStore((state) => state.addItem);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const section = sectionRef.current;
    const header = headerRef.current;
    const items = itemsRef.current.filter(Boolean);

    if (!section || !header || items.length === 0) return;

    // Header animation
    gsap.fromTo(header, 
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
        }
      }
    );

    // Items stagger animation
    gsap.fromTo(items,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="menu" className="w-full py-24 bg-cream px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-caveat text-2xl text-caramel italic">Freshly crafted</span>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-espresso mt-2">Our Menu</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <div 
              key={item.id} 
              ref={el => { itemsRef.current[index] = el; }}
              className="group cursor-pointer flex flex-col h-full bg-cream-dark rounded-2xl overflow-hidden border border-espresso/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={item.imageUrl} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  {item.dietaryTags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-cream/90 text-espresso text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair font-bold text-xl text-espresso leading-tight pr-4">{item.name}</h3>
                  <span className="font-dm-sans font-medium text-caramel">${item.price.toFixed(2)}</span>
                </div>
                <p className="font-dm-sans text-sm text-charcoal/70 mb-6 flex-1 line-clamp-3">{item.description}</p>
                <button 
                  onClick={() => addItem(item)}
                  className="w-full py-3 border-2 border-espresso text-espresso hover:bg-espresso hover:text-cream rounded-full font-bold font-dm-sans transition-colors flex justify-center items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
