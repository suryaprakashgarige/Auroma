"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, ShoppingBag, CreditCard, CheckCircle2, Ticket } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, cartTotal, addItem, clearCart } = useCartStore();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handlePlaceOrder = () => {
    setIsOrdering(true);
    // Simulate API call
    setTimeout(() => {
      setIsOrdering(false);
      setOrderSuccess(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4A853', '#2C1A0E', '#F4EDE4']
      });
      // Clear cart after success is shown
    }, 2000);
  };

  const closeAndReset = () => {
    if (orderSuccess) clearCart();
    setOrderSuccess(false);
    toggleCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAndReset}
            className="absolute inset-0 bg-espresso/60 backdrop-blur-md"
          />

          {/* Drawer Content */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#FAF4EC] h-full shadow-2xl flex flex-col border-l border-espresso/10"
          >
            {/* Header */}
            <div className="p-8 border-b border-espresso/5 flex justify-between items-center bg-white/50 backdrop-blur-xl">
              <div className="flex flex-col">
                <span className="font-caveat text-caramel text-xl -mb-1">Your Selection</span>
                <h2 className="text-3xl font-black font-playfair text-espresso uppercase tracking-tighter flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-caramel" /> 
                  The Cart
                </h2>
              </div>
              <button 
                onClick={closeAndReset} 
                className="w-10 h-10 flex items-center justify-center hover:bg-espresso/5 rounded-full transition-all group"
              >
                <X className="w-6 h-6 text-espresso group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-caramel/20">
              {orderSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-jade/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-jade" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black font-playfair text-espresso mb-2 uppercase">Order Secured.</h3>
                    <p className="font-dm-sans text-espresso/60 max-w-[240px] mx-auto text-sm leading-relaxed">
                      Your high-frequency brew is being calibrated. Check the tracker for real-time extraction updates.
                    </p>
                  </div>
                  <Link
                    href="/tracker"
                    onClick={closeAndReset}
                    className="w-full mt-4 py-4 bg-caramel hover:bg-caramel/90 text-espresso font-black rounded-2xl flex items-center justify-center gap-2 text-sm uppercase tracking-widest transition-all"
                  >
                    Track Your Order →
                  </Link>
                  <button 
                    onClick={closeAndReset}
                    className="px-10 py-4 bg-espresso text-cream font-bold rounded-2xl hover:translate-y-[-2px] transition-all shadow-xl"
                  >
                    Back to Coffee Shop
                  </button>
                </motion.div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <ShoppingBag className="w-16 h-16" />
                  <p className="font-dm-sans font-bold uppercase tracking-widest text-xs">Your ritual is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className="flex gap-4 group"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border border-espresso/5 bg-white shadow-sm">
                        <Image 
                          src={item.imageUrl} 
                          alt={item.name} 
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <h3 className="font-bold text-espresso font-dm-sans text-sm line-clamp-1">{item.name}</h3>
                          <p className="text-[10px] text-espresso/40 font-dm-sans line-clamp-2 leading-relaxed uppercase tracking-tighter italic">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-caramel text-sm">${item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-1.5 border border-espresso/5 shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                              className="text-espresso/40 hover:text-caramel transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-black font-dm-sans w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                              className="text-espresso/40 hover:text-caramel transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Promo Section */}
                  <div className="bg-caramel/5 rounded-3xl p-6 border border-caramel/10 space-y-4">
                    <div className="flex items-center gap-2 text-caramel">
                        <Ticket className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Rewards & Promos</span>
                    </div>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Promo Code" 
                            className="w-full bg-white border border-espresso/5 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:border-caramel/50 transition-all"
                        />
                        <button className="absolute right-2 top-1.5 px-4 py-1.5 bg-espresso text-cream text-[10px] font-bold rounded-lg hover:bg-caramel hover:text-espresso transition-all">Apply</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {!orderSuccess && items.length > 0 && (
              <div className="p-8 border-t border-espresso/5 bg-white/50 backdrop-blur-xl space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-espresso/40 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>${cartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-espresso/40 uppercase tracking-widest">
                    <span>Calibrating fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="font-playfair font-black text-2xl text-espresso uppercase">Total</span>
                    <span className="font-playfair font-black text-2xl text-caramel">${cartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  disabled={isOrdering}
                  onClick={handlePlaceOrder}
                  className="w-full py-5 bg-espresso text-cream font-black rounded-2xl font-dm-sans flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-[0_15px_40px_rgba(0,0,0,0.1)] group relative overflow-hidden disabled:opacity-50"
                >
                  <div className="relative z-10 flex items-center gap-3">
                    {isOrdering ? (
                        <>
                            <div className="w-5 h-5 border-2 border-caramel border-t-transparent rounded-full animate-spin" />
                            <span>Authenticating Ritual...</span>
                        </>
                    ) : (
                        <>
                            <CreditCard className="w-5 h-5 text-caramel group-hover:rotate-12 transition-transform" />
                            <span className="tracking-tight uppercase">Commit to Ritual</span>
                        </>
                    )}
                  </div>
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </button>
                <p className="text-[10px] text-center text-espresso/40 font-bold uppercase tracking-widest">Secure Handshake Protocol Active</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
