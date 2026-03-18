// src/components/AuthDrawer.tsx
"use client";

import { useUserStore } from "@/store/useUserStore";
import { X, User, LogIn, Award, Gift, Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthDrawer() {
  const { isAuthenticated, points, isOpen, toggleAuthDrawer, login, logout } = useUserStore();
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      login(); // Toggle to authenticated state for demo
      setIsSending(false);
    }, 1500);
  };

  const maxPoints = 150;
  const percentage = Math.min((points / maxPoints) * 100, 100);
  const strokeDashoffset = 251.2 - (251.2 * percentage) / 100;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleAuthDrawer} />
      <div className="relative w-full max-w-md bg-cream h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-espresso/10 flex justify-between items-center bg-cream-dark">
          <h2 className="text-2xl font-playfair font-bold text-espresso flex items-center gap-2">
            <Award className="w-6 h-6 text-caramel" /> Auroma Rewards
          </h2>
          <button onClick={toggleAuthDrawer} className="p-2 hover:bg-espresso/10 rounded-full transition">
            <X className="w-5 h-5 text-espresso" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          {!isAuthenticated ? (
            /* Unauthenticated View */
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center text-center gap-6"
            >
              <div className="p-4 bg-caramel/10 rounded-full border border-caramel/20">
                <Star className="w-8 h-8 text-caramel fill-caramel/20" />
              </div>
              <div>
                <h3 className="font-playfair font-bold text-xl text-espresso">Join Auroma Rewards</h3>
                <p className="font-dm-sans text-xs text-charcoal/60 mt-1 max-w-xs">
                  Earn 10 points for every $1 spent and unlock free signature brews.
                </p>
              </div>

              <form onSubmit={handleMagicLink} className="w-full flex flex-col gap-3 mt-4">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-espresso/10 rounded-xl bg-cream focus:border-caramel outline-none text-sm transition-all"
                />
                <button 
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 bg-caramel hover:bg-caramel/90 text-espresso font-bold rounded-xl font-dm-sans shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  {isSending ? "Sending link..." : "Send Magic Link"} <LogIn className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          ) : (
            /* Authenticated View */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center text-center gap-8"
            >
              <div className="relative flex items-center justify-center w-40 h-40">
                {/* Background Ring */}
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle 
                    cx="80" cy="80" r="40" 
                    strokeWidth="8" stroke="currentColor" 
                    className="text-espresso/5" 
                    fill="transparent" 
                  />
                  <circle 
                    cx="80" cy="80" r="40" 
                    strokeWidth="8" stroke="currentColor" 
                    className="text-caramel transition-all duration-1000" 
                    fill="transparent" 
                    strokeDasharray="251.2"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-playfair font-black text-3xl text-espresso">{points}</span>
                  <span className="font-dm-sans text-[10px] text-charcoal/50">points</span>
                </div>
              </div>

              <div>
                <h3 className="font-playfair font-bold text-xl text-espresso">Welcome back, Guest</h3>
                <p className="font-dm-sans text-xs text-caramel font-bold mt-1">
                  120 / 150 points until your next free signature brew
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full mt-4">
                <div className="bg-espresso/5 p-4 rounded-xl border border-espresso/5 flex flex-col items-center gap-2">
                  <Gift className="w-5 h-5 text-espresso/60" />
                  <span className="font-dm-sans font-bold text-xs text-espresso">Reedem Perks</span>
                </div>
                <div className="bg-espresso/5 p-4 rounded-xl border border-espresso/5 flex flex-col items-center gap-2">
                  <Award className="w-5 h-5 text-espresso/60" />
                  <span className="font-dm-sans font-bold text-xs text-espresso">Tiers: Gold</span>
                </div>
              </div>

              <button 
                onClick={logout}
                className="text-xs text-red-500 hover:underline mt-4 cursor-pointer"
              >
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
