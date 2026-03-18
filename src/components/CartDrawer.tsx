"use client";
import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, cartTotal, addItem } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleCart} />
      <div className="relative w-full max-w-md bg-cream h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-espresso/10 flex justify-between items-center bg-cream-dark">
          <h2 className="text-2xl font-playfair font-bold text-espresso flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" /> Your Order
          </h2>
          <button onClick={toggleCart} className="p-2 hover:bg-espresso/10 rounded-full transition">
            <X className="w-5 h-5 text-espresso" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <p className="text-center text-charcoal/60 font-dm-sans mt-10">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name} 
                    width={80} 
                    height={80} 
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-espresso font-dm-sans">{item.name}</h3>
                    <p className="text-sm text-charcoal/70">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-cream-dark rounded-full px-3 py-1 border border-espresso/10">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="hover:text-caramel transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-caramel transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-espresso/10 bg-cream-dark">
            {/* Upsell Strip */}
            <div className="mb-4">
              <span className="font-dm-sans text-[11px] font-bold text-espresso/40 mb-2 block uppercase tracking-wider">Perfect Pairings</span>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
                
                {/* Pastry 1 */}
                <div className="flex-shrink-0 w-36 bg-cream border border-espresso/5 rounded-xl p-2 flex items-center gap-2 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=300&auto=format&fit=crop" 
                    alt="Almond Croissant" 
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-dm-sans font-bold text-[10px] text-espresso truncate">Almond Croissant</span>
                    <span className="font-dm-sans text-[9px] text-charcoal/60">$4.75</span>
                  </div>
                  <button 
                    onClick={() => addItem({
                      id: 'pastry-1',
                      name: 'Almond Croissant',
                      price: 4.75,
                      category: 'Pastries',
                      imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=300&auto=format&fit=crop',
                      dietaryTags: ['Contains Nuts'],
                      description: 'Warm, buttery pastry topped with sliced almonds.'
                    })}
                    className="p-1 bg-espresso/5 hover:bg-caramel hover:text-espresso rounded-full transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Pastry 2 */}
                <div className="flex-shrink-0 w-36 bg-cream border border-espresso/5 rounded-xl p-2 flex items-center gap-2 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1499636136210-654cb3d0d53f?q=80&w=300&auto=format&fit=crop" 
                    alt="Sea Salt Cookie" 
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-dm-sans font-bold text-[10px] text-espresso truncate">Sea Salt Cookie</span>
                    <span className="font-dm-sans text-[9px] text-charcoal/60">$3.50</span>
                  </div>
                  <button 
                    onClick={() => addItem({
                      id: 'pastry-2',
                      name: 'Sea Salt Cookie',
                      price: 3.50,
                      category: 'Pastries',
                      imageUrl: 'https://images.unsplash.com/photo-1499636136210-654cb3d0d53f?q=80&w=300&auto=format&fit=crop',
                      dietaryTags: ['Vegetarian'],
                      description: 'Dark chocolate chunks with a sprinkle of sea salt flakes.'
                    })}
                    className="p-1 bg-espresso/5 hover:bg-caramel hover:text-espresso rounded-full transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="font-dm-sans text-charcoal">Subtotal</span>
              <span className="font-playfair font-bold text-xl text-espresso">${cartTotal().toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-caramel hover:bg-caramel/90 text-espresso font-bold rounded-full font-dm-sans transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
