// src/components/StickyCart.tsx
"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyCart() {
  const { items, cartTotal, toggleCart } = useCartStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm md:hidden"
      >
        <button 
          onClick={toggleCart}
          className="w-full bg-espresso text-cream p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-white/5 cursor-pointer backdrop-blur-md bg-espresso/95 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-2">
            <div className="relative p-1.5 bg-caramel rounded-full text-espresso">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="font-dm-sans text-xs font-bold">View Cart</span>
            <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
              {itemCount}
            </span>
          </div>

          <span className="font-playfair font-bold text-sm text-caramel">
            ${cartTotal().toFixed(2)}
          </span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
