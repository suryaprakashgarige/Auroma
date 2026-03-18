"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, LogOut, Phone, Eye, Play, CheckCircle, Clock } from "lucide-react";
import gsap from "gsap";

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  drink_name: string;
  roast: string;
  milk: string;
  sweetness: number;
  strength: string;
  temperature: string;
  cup_size: string;
  syrup: string;
  extra_shot: boolean;
  ritual_name: string | null;
  description: string | null;
  price: number;
  status: 'pending' | 'seen' | 'making' | 'ready' | 'called';
};

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | Order['status']>('all');
  const [loading, setLoading] = useState(true);

  // 1. PIN Authentication
  const handleLogin = () => {
    // Hardcoded PIN for demo
    if (pin === "2025") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Wrong PIN. Try again.");
      gsap.fromTo("#login-card", { x: -10 }, { x: 0, duration: 0.05, repeat: 4, yoyo: true });
      setPin("");
    }
  };

  // 2. Audio Ping Trigger
  const playPing = () => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 440;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.log("Audio play blocked/failed: ", e);
    }
  };

  // 3. Subscription & Fetch
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error("Error fetching orders:", error);
      else setOrders(data || []);
      setLoading(false);
    };

    fetchOrders();

    // Subscribe to Insert updates
    const channel = supabase
      .channel('realtime-orders')
      .on(
        'postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'orders' }, 
        (payload) => {
          const newOrder = payload.new as Order;
          setOrders(current => [newOrder, ...current]);
          playPing();
          // GSAP Card flash border is handled per card inside components using key keys setups triggers.
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          const updatedOrder = payload.new as Order;
          setOrders(current => current.map(o => o.id === updatedOrder.id ? updatedOrder : o));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);

  const updateStatus = async (orderId: string, newStatus: Order['status']) => {
    // Optimistic UI update
    setOrders(current => current.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      console.error("Error updating status:", error);
      // Revert if error
    }
  };

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    seen: orders.filter(o => o.status === 'seen').length,
    making: orders.filter(o => o.status === 'making').length,
    ready: orders.filter(o => o.status === 'ready').length,
    called: orders.filter(o => o.status === 'called').length,
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-espresso flex items-center justify-center px-4">
        <div id="login-card" className="w-full max-w-sm bg-cream border border-cream/10 p-8 rounded-3xl shadow-xl flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold font-playfair text-espresso">Auroma</span>
            <Coffee className="w-6 h-6 text-caramel fill-caramel" />
          </div>
          <h2 className="text-lg font-bold font-dm-sans text-espresso mb-4">Admin Panel</h2>
          
          <input 
            type="password" 
            placeholder="Enter Pin" 
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-espresso/10 rounded-xl px-4 py-3 font-bold text-center tracking-widest outline-none focus:border-caramel text-espresso bg-cream-dark/50"
          />
          {loginError && <p className="text-red-500 text-xs mt-2 font-dm-sans">{loginError}</p>}

          <button 
            onClick={handleLogin}
            className="w-full mt-4 py-3 bg-caramel text-espresso font-bold rounded-xl shadow-md hover:bg-caramel/90 transition-all font-dm-sans"
          >
            Enter
          </button>
          <p className="text-[10px] text-charcoal/40 font-dm-sans mt-3">Hint: 2025</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-dark/20 flex flex-col text-espresso">
      
      {/* Admin Header */}
      <header className="fixed top-0 left-0 w-full bg-espresso py-4 px-6 stroke-none flex items-center justify-between z-40 text-cream">
        <div className="flex items-center gap-2 text-xl font-bold font-playfair">
          <span>Auroma</span>
          <Coffee className="w-4 h-4 text-caramel fill-caramel" />
          <span className="text-xs font-dm-sans font-normal text-cream/60 ml-2">| Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold font-dm-sans px-3 py-1 bg-caramel/20 border border-caramel/30 rounded-full text-caramel">
            {counts.pending} pending orders
          </span>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1 border border-cream/20 px-3 py-1.5 rounded-lg text-xs font-dm-sans text-cream/80 hover:bg-cream/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-1 mt-16 p-6 flex flex-col gap-6 max-w-6xl w-full mx-auto">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-espresso/5 pb-2">
          {(['all', 'pending', 'seen', 'making', 'ready', 'called'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 font-dm-sans text-sm font-bold transition-all relative ${
                filter === t ? "text-caramel" : "text-charcoal/70 hover:text-espresso"
              }`}
            >
              <span className="capitalize">{t}</span>
              <span className="ml-1 text-[10px] bg-espresso/5 px-1.5 py-0.5 rounded-full">
                {counts[t]}
              </span>
              {filter === t && (
                <motion.div layoutId="active-tab" className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-caramel" />
              )}
            </button>
          ))}
        </div>

        {/* Orders Listing */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-charcoal/50 font-dm-sans">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex justify-center items-center py-20 text-charcoal/50 font-dm-sans">No orders yet. Time for your own coffee ☕</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} onStatusUpdate={updateStatus} />
              ))}
            </AnimatePresence>
          </div>
        )}

      </main>

    </div>
  );
}

function OrderCard({ order, onStatusUpdate }: { order: Order; onStatusUpdate: (id: string, s: Order['status']) => void }) {
  const badgeStyles = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    seen: "bg-blue-100 text-blue-800 border-blue-200",
    making: "bg-amber-100 text-amber-800 border-amber-200", // using amber again for warm
    ready: "bg-green-100 text-green-800 border-green-200",
    called: "bg-purple-100 text-purple-800 border-purple-200",
  };

  const getRelativeTime = (time: string) => {
    const past = new Date(time);
    const now = new Date();
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  };

  return (
    <motion.div
      key={order.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="p-5 bg-cream border border-espresso/5 rounded-2xl shadow-sm flex flex-col gap-4 text-espresso relative overflow-hidden h-full justify-between"
    >
      {/* Top Meta */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <span className="font-bold text-base font-dm-sans">{order.customer_name}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeStyles[order.status]}`}>
            {order.status.toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between items-center text-[10px] text-charcoal/50 font-dm-sans">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {order.customer_phone}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {getRelativeTime(order.created_at)}</span>
        </div>
      </div>

      <div className="border-t border-dashed border-espresso/10 pt-3">
        <div className="flex justify-between items-start">
          <span className="font-bold font-playfair text-md">{order.drink_name}</span>
          <span className="font-bold text-xs font-dm-sans text-caramel">${order.price.toFixed(2)}</span>
        </div>
        <p className="text-[11px] font-dm-sans text-charcoal/80 mt-1">
          {order.roast} · {order.milk} · {order.strength} · {order.temperature} · {order.cup_size}
        </p>
        {order.syrup !== 'none' || order.extra_shot ? (
          <p className="text-[10px] font-medium text-caramel mt-0.5">
            {order.syrup !== 'none' && `+ ${order.syrup}`} {order.extra_shot && `+ Extra Shot`}
          </p>
        ) : null}
        {order.ritual_name && (
          <p className="text-[10px] font-caveat text-charcoal/50 italic mt-1">"{order.ritual_name}"</p>
        )}
      </div>

      {/* Vibe Note Box */}
      {order.description && (
        <div className="bg-caramel/15 border-l-4 border-caramel p-3 rounded-lg flex flex-col gap-1 mt-1">
          <span className="text-[11px] font-bold font-dm-sans text-caramel flex items-center gap-1">💬 Customer's Vibe Note:</span>
          <p className="text-xs font-dm-sans leading-relaxed text-espresso font-medium">&ldquo;{order.description}&rdquo;</p>
        </div>
      )}

      {/* Actions Bottom */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        {order.status === 'pending' && (
          <button 
            onClick={() => onStatusUpdate(order.id, 'seen')}
            className="flex items-center justify-center gap-1 py-2 bg-espresso/5 hover:bg-espresso/10 rounded-xl text-xs font-bold font-dm-sans transition-all"
          >
            <Eye className="w-3.5 h-3.5"/> Seen
          </button>
        )}
        {(order.status === 'pending' || order.status === 'seen') && (
          <button 
            onClick={() => onStatusUpdate(order.id, 'making')}
            className="flex items-center justify-center gap-1 py-2 bg-caramel/20 hover:bg-caramel/30 text-caramel rounded-xl text-xs font-bold font-dm-sans transition-all"
          >
            <Coffee className="w-3.5 h-3.5"/> Making
          </button>
        )}
        {order.status === 'making' && (
          <button 
            onClick={() => onStatusUpdate(order.id, 'ready')}
            className="col-span-2 flex items-center justify-center gap-1 py-2 bg-jade text-cream rounded-xl text-xs font-bold font-dm-sans transition-all shadow-md"
          >
            <CheckCircle className="w-3.5 h-3.5"/> Ready
          </button>
        )}
        {order.status === 'ready' && (
          <a 
            href={`tel:${order.customer_phone}`}
            onClick={() => onStatusUpdate(order.id, 'called')}
            className="col-span-2 flex flex-col items-center justify-center gap-0.5 py-2 bg-purple-600 hover:bg-purple-700 text-cream rounded-xl text-xs font-bold font-dm-sans transition-all shadow-md"
          >
            <div className="flex items-center gap-1"><Phone className="w-3.5 h-3.5"/> Call Customer</div>
            <span className="font-caveat text-[9px] opacity-80">Tap to call directly</span>
          </a>
        )}
      </div>

    </motion.div>
  );
}
