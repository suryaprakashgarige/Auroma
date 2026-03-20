// src/app/admin/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart2, Package, Users, Settings, LogOut, 
  Clock, CheckCircle, AlertCircle, ShoppingBag, 
  DollarSign, ArrowUpRight, Plus, Eye 
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect PIN. Please try again.");
      setPin("");
    }
  };

  const dashboardMetrics = [
    { title: "Today's Sales", value: "$1,240.50", icon: DollarSign, trend: "+12.5%", color: "text-caramel border-caramel/20" },
    { title: "Active Orders", value: "8", icon: ShoppingBag, trend: "Live", color: "text-espresso border-espresso/20" },
    { title: "Top Item", value: "Oat Latte", icon: BarChart2, trend: "64 sold", color: "text-espresso border-espresso/20" }
  ];

  const kanbanColumns = [
    {
      id: "new",
      title: "New Orders",
      count: 2,
      color: "bg-caramel/10 border-caramel/30 text-caramel",
      items: [
        { id: "1024", name: "Sarah J.", items: ["1x Oat Latte", "1x Sea Salt Cookie"], time: "3 mins ago", total: "$8.25" },
        { id: "1025", name: "Marcus K.", items: ["1x Custom Ritual (Hot)"], time: "Just now", total: "$6.50" }
      ]
    },
    {
      id: "brewing",
      title: "Brewing",
      count: 1,
      color: "bg-[#DDEFE0] border-[#B2DBBB] text-[#22C55E]",
      items: [
        { id: "1023", name: "Elena R.", items: ["1x Cold Brew Vanilla"], time: "8 mins ago", total: "$5.50" }
      ]
    },
    {
      id: "ready",
      title: "Ready for Pickup",
      count: 1,
      color: "bg-espresso/5 border-espresso/10 text-espresso",
      items: [
        { id: "1022", name: "Alex M.", items: ["2x Espresso Bar Selection"], time: "Ready", total: "$9.00" }
      ]
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-espresso flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-cream max-w-sm w-full rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6"
        >
          <div className="p-4 bg-caramel/10 rounded-full border border-caramel/20">
            <Package className="w-8 h-8 text-caramel" />
          </div>
          <div className="text-center">
            <h1 className="font-playfair font-bold text-2xl text-espresso">Auroma Admin</h1>
            <p className="font-dm-sans text-xs text-charcoal/60 mt-1">Enter PIN to access Command Center</p>
          </div>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <input 
              type="password" 
              maxLength={4}
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full tracking-[1.5em] text-center font-bold text-xl h-14 border border-espresso/10 rounded-2xl bg-cream focus:border-caramel outline-none transition-all placeholder:tracking-normal placeholder:text-sm"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-center text-xs font-dm-sans flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {error}
              </p>
            )}
            <button 
              type="submit"
              className="w-full py-3.5 bg-caramel hover:bg-caramel/90 text-espresso font-bold rounded-2xl font-dm-sans shadow-md cursor-pointer transition-all"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex text-espresso font-dm-sans overflow-hidden">
      
      {/* Sidebar Layout */}
      <aside className="w-64 bg-espresso text-cream flex flex-shrink-0 flex-col justify-between p-6 border-r border-white/5">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 px-2">
            <Package className="w-6 h-6 text-caramel" />
            <span className="font-playfair font-bold text-lg">Auroma HQ</span>
          </div>

          <nav className="flex flex-col gap-2">
            <button className="flex items-center gap-3 px-4 py-3 bg-white/10 text-cream rounded-xl text-sm font-semibold cursor-pointer">
              <BarChart2 className="w-4 h-4 text-caramel" /> Dashboard
            </button>
            <button className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-cream/70 hover:text-cream rounded-xl text-sm cursor-pointer transition-all">
              <ShoppingBag className="w-4 h-4" /> Live Orders
            </button>
            <button className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-cream/70 hover:text-cream rounded-xl text-sm cursor-pointer transition-all">
              <Package className="w-4 h-4" /> Menu Manager
            </button>
            <button className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-cream/70 hover:text-cream rounded-xl text-sm cursor-pointer transition-all">
              <Users className="w-4 h-4" /> Customers
            </button>
            <button className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-cream/70 hover:text-cream rounded-xl text-sm cursor-pointer transition-all">
              <Settings className="w-4 h-4" /> Settings
            </button>
          </nav>
        </div>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-cream/50 hover:text-red-400 rounded-xl text-sm cursor-pointer transition-all mt-auto"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
        
        {/* Header content stats view */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-playfair font-black text-3xl text-espresso tracking-tight">Command Center</h1>
            <p className="text-charcoal/60 text-xs mt-0.5">Welcome back, Admin. Store is active.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#DDEFE0] border border-[#B2DBBB] text-[#22C55E] rounded-full text-xs font-bold">
              <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" /> Live
            </span>
            <div className="w-9 h-9 rounded-full bg-caramel flex items-center justify-center font-bold text-espresso text-sm border-2 border-white shadow-sm">
              S
            </div>
          </div>
        </div>

        {/* Metrics Row panel grids stats widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardMetrics.map((m, i) => (
            <motion.div 
              key={m.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-cream border border-espresso/5 p-6 rounded-2xl flex items-center justify-between shadow-sm relative group overflow-hidden"
            >
              <div className="flex flex-col gap-1 z-10">
                <span className="font-dm-sans text-xs text-charcoal/50 uppercase tracking-wider">{m.title}</span>
                <span className="font-playfair font-black text-2xl text-espresso">{m.value}</span>
                <span className={`text-[10px] font-bold mt-1 ${m.title === "Today's Sales" ? "text-[#22C55E]" : "text-caramel"}`}>{m.trend}</span>
              </div>
              <div className="p-3 bg-espresso/5 rounded-xl border border-espresso/5 z-10 group-hover:bg-caramel/10 transition-colors">
                <m.icon className={`w-6 h-6 ${m.color.split(' ')[0]}`} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-caramel/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Kanban Board Queue section workflow metrics grid dashboard */}
        <div className="flex flex-col gap-4">
          <h2 className="font-playfair font-bold text-xl text-espresso">Live Order Queue</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-start">
            {kanbanColumns.map((col, cIndex) => (
              <div key={col.id} className="flex flex-col gap-3 min-h-[400px]">
                <div className={`p-3 rounded-xl border flex justify-between items-center ${col.color}`}>
                  <span className="font-bold text-xs uppercase tracking-wider font-dm-sans">{col.title}</span>
                  <span className="text-xs font-bold leading-none h-5 w-5 rounded-full flex items-center justify-center bg-white/20">{col.count}</span>
                </div>

                <div className="flex flex-col gap-3 flex-1">
                  {col.items.map((item, iIndex) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: iIndex * 0.1 }}
                      className="bg-cream p-4 rounded-xl border border-espresso/5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow relative cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-espresso font-dm-sans">{item.name}</span>
                        <span className="text-[10px] text-espresso/40">#{item.id}</span>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        {item.items.map((it, idx) => (
                          <span key={idx} className="text-xs text-charcoal/80 font-dm-sans">{it}</span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-espresso/5 mt-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-charcoal/50">
                          <Clock className="w-3 h-3" /> {item.time}
                        </div>
                        <span className="font-bold text-xs text-caramel">{item.total}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}
