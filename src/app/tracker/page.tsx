// src/app/tracker/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Cog, Coffee, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OrderTracker() {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const intervals = [3000, 3000, 4000]; // Duration for each step
    
    const timer1 = setTimeout(() => setActiveStep(2), intervals[0]);
    const timer2 = setTimeout(() => setActiveStep(3), intervals[0] + intervals[1]);
    const timer3 = setTimeout(() => setActiveStep(4), intervals[0] + intervals[1] + intervals[2]);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const steps = [
    { id: 1, title: "Order Received", icon: CheckCircle, desc: "We've got your list, preparing variables." },
    { id: 2, title: "Grinding & Tamping", icon: Cog, desc: "Dialing the burrs and leveling accurately." },
    { id: 3, title: "Extracting", icon: Coffee, desc: "Pulling the optimal yield for full notes." },
    { id: 4, title: "Ready for Pickup", icon: Bell, desc: "Standing by at counter. Enjoy the Ritual." }
  ];

  return (
    <div className="min-h-screen bg-espresso text-cream flex flex-col items-center justify-center p-6 font-dm-sans relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso to-black/80" />
      <div className="absolute w-96 h-96 bg-caramel/10 filter blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-md w-full flex flex-col items-center gap-12 z-10">
        
        <div className="text-center flex flex-col items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-caramel hover:underline text-xs mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span className="font-caveat text-caramel text-2xl">Phase 4</span>
          <h1 className="font-playfair font-black text-3xl md:text-4xl text-cream tracking-tight">
            Your Ritual is in Motion.
          </h1>
          <p className="text-cream/60 text-xs">Dynamic updates to coordinate your skips.</p>
        </div>

        {/* Timeline Structure */}
        <div className="flex flex-col gap-8 w-full px-4">
          {steps.map((step, index) => {
            const isCompleted = activeStep > step.id;
            const isActive = activeStep === step.id;

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex gap-4 relative"
              >
                {/* Visual Connector Bar */}
                {index < steps.length - 1 && (
                  <div className={`absolute left-5 top-10 w-0.5 h-12 ${activeStep > step.id ? "bg-[#22C55E]" : "bg-white/10"} transition-all duration-700`} />
                )}

                {/* Progress Node Frame */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-500 ${
                  isCompleted ? "border-[#22C55E] bg-[#22C55E]/10" : 
                  isActive ? "border-caramel bg-caramel/20 animate-pulse" : 
                  "border-white/10 bg-white/5 text-white/40"
                }`}>
                  <step.icon className={`w-4 h-4 ${
                    isCompleted ? "text-[#22C55E]" : 
                    isActive ? "text-caramel" : 
                    "text-white/40"
                  } ${isActive && step.id === 2 ? "animate-spin" : ""}`} />
                </div>

                <div className="flex flex-col justify-center">
                  <span className={`font-dm-sans font-bold text-sm ${isActive ? "text-cream" : isCompleted ? "text-[#22C55E]/90" : "text-cream/50"}`}>
                    {step.title}
                  </span>
                  <p className="text-[10px] text-cream/40 mt-0.5">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {activeStep === 4 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col gap-3 mt-4"
          >
            <Link 
              href="/"
              className="w-full py-4 bg-caramel hover:bg-caramel/90 text-espresso font-semibold rounded-2xl font-dm-sans shadow-md text-center text-sm cursor-pointer transition-all"
            >
              Order Another Craft
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
}
