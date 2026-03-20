// src/components/MoodBrewScan.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, ShieldCheck, RefreshCw, Share2, Sparkles, AlertCircle, Wand2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { moodData, detectMood, getMostFrequentMood, MoodType } from "@/lib/moodLogic";
import { useCartStore } from "@/store/useCartStore";

let faceapi: any;

export default function MoodBrewScan() {
  const [stage, setStage] = useState<'consent' | 'scanning' | 'manual' | 'result'>('consent');
  const [modelsLoading, setModelsLoading] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectedMood, setDetectedMood] = useState<MoodType | null>(null);
  const [expressions, setExpressions] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const resultsRef = useRef<MoodType[]>([]);

  const { addItem } = useCartStore();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      const header = sectionRef.current.querySelector('.scan-header');
      gsap.fromTo(header, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }

    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }
      );
    }
  }, [stage]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const loadModels = async () => {
    if (modelsLoaded) return true;
    setModelsLoading(true);
    try {
      if (!faceapi) faceapi = await import('face-api.js');
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      setModelsLoaded(true);
      setModelsLoading(false);
      return true;
    } catch (error) {
      console.error(error);
      setModelsLoading(false);
      setStage('manual');
      return false;
    }
  };

  const handleStartScan = async () => {
    const loaded = await loadModels();
    if (!loaded) return;
    setStage('scanning');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      resultsRef.current = [];
      let frames = 0;
      const interval = setInterval(async () => {
        if (!videoRef.current || !faceapi) return;
        const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
        if (detection) {
          setExpressions(detection.expressions);
          resultsRef.current.push(detectMood(detection.expressions));
        }
        frames++;
        if (frames >= 6) {
          clearInterval(interval);
          stopCamera();
          setDetectedMood(getMostFrequentMood(resultsRef.current) || 'Neutral');
          setStage('result');
        }
      }, 500);
    } catch (e) {
      setStage('manual');
    }
  };

  return (
    <section ref={sectionRef} id="mood-brew-scan" className="relative w-full py-32 bg-espresso px-6 overflow-hidden">
      <div className="scan-header text-center mb-16 max-w-2xl mx-auto">
        <span className="font-caveat text-caramel text-2xl">Visual Biometrics for Flavor</span>
        <h2 className="text-4xl md:text-7xl font-black font-playfair text-cream uppercase mt-2 mb-6">Mood Brew</h2>
        <p className="text-cream/60 font-dm-sans">Our neural engine maps 68 facial landmarks to the perfect roast profile. <br /> Private. Pulse-reactive. Precise.</p>
      </div>

      <div ref={cardRef} className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-8 md:p-16 shadow-2xl relative overflow-hidden">
        
        {stage === 'consent' && (
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-4 mb-10">
              {['😌', '😤', '😴', '🎯', '💡'].map((e, i) => (
                <motion.span 
                  key={i}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="text-4xl"
                >
                  {e}
                </motion.span>
              ))}
            </div>
            <h3 className="text-3xl md:text-5xl font-bold font-playfair text-cream mb-6">The Lens is Ready.</h3>
            <p className="text-cream/70 font-dm-sans mb-12 max-w-lg">Grant access for a 3-second mood burst. We match your facial frequency to our signature menu in real-time.</p>
            
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
              <button 
                onClick={handleStartScan}
                disabled={modelsLoading}
                className="px-10 py-5 bg-caramel text-espresso font-black rounded-2xl flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-[0_15px_40px_rgba(212,168,83,0.3)] disabled:opacity-50"
              >
                {modelsLoading ? 'Warming up...' : 'Start Neural Scan'} <MoveRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setStage('manual')}
                className="px-10 py-5 bg-white/5 text-cream font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10"
              >
                I'll Choose Manually
              </button>
            </div>
          </div>
        )}

        {stage === 'scanning' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square bg-black rounded-3xl overflow-hidden border-2 border-caramel shadow-[0_0_50px_rgba(212,168,83,0.2)]">
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-caramel shadow-[0_0_20px_#D4A853] animate-[sweep_2s_infinite_linear]" />
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-bold font-playfair text-cream">Neural Analysis Active...</h4>
              <div className="space-y-4">
                {Object.keys(moodData).slice(0, 5).map((m) => (
                  <div key={m} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-cream/40 tracking-widest">
                      <span>{m}</span>
                      <span>{expressions ? Math.round(expressions[m.toLowerCase()] * 100 || 0) : 0}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: expressions ? `${expressions[m.toLowerCase()] * 100 || 0}%` : '0%' }}
                        className="h-full bg-caramel"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {stage === 'manual' && (
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold font-playfair text-cream mb-10">How's the frequency?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {(Object.keys(moodData) as MoodType[]).map(m => (
                <button
                  key={m}
                  onClick={() => { setDetectedMood(m); setStage('result'); }}
                  className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-caramel hover:bg-white/10 transition-all text-center group"
                >
                  <span className="text-5xl block mb-4 group-hover:scale-110 transition-all">{moodData[m].emoji}</span>
                  <span className="font-bold text-cream font-dm-sans group-hover:text-caramel">{m === 'Tired' ? 'Energized' : m === 'Chill' ? 'Relaxed' : m}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStage('consent')} className="mt-10 text-cream/40 font-dm-sans text-sm hover:text-cream transition-all flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Back to scanner
            </button>
          </div>
        )}

        {stage === 'result' && detectedMood && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="text-7xl mb-6">{moodData[detectedMood].emoji}</div>
            <h3 className="text-4xl md:text-6xl font-black font-playfair text-cream mb-2">Resolved: {detectedMood}</h3>
            <p className="font-caveat text-2xl text-caramel mb-10">&ldquo;{moodData[detectedMood].tagline}&rdquo;</p>
            
            <div className="w-full bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row gap-10 items-center text-left mb-10">
              <div className="w-32 h-32 rounded-full flex items-center justify-center p-2 border-2 border-caramel/20 shrink-0" style={{ backgroundColor: moodData[detectedMood].drink.cupColor }}>
                <Coffee className="w-12 h-12 text-white/50" />
              </div>
              <div className="flex-1 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-caramel">Recommendation</span>
                <h4 className="text-3xl font-bold font-playfair text-cream">{moodData[detectedMood].drink.name}</h4>
                <p className="text-sm text-cream/60 font-dm-sans leading-relaxed">{moodData[detectedMood].drink.whyThisMatches}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {moodData[detectedMood].drink.tastingNotes.map(n => (
                    <span key={n} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-cream/40 border border-white/10">{n}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <button 
                 onClick={() => {
                   addItem({
                     id: `mood-${detectedMood}`,
                     name: `${moodData[detectedMood].drink.name} (Mood Match)`,
                     description: moodData[detectedMood].drink.whyThisMatches,
                     price: 6.50,
                     category: 'Signatures',
                     imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
                     dietaryTags: moodData[detectedMood].drink.tastingNotes
                   });
                 }}
                className="flex-1 py-5 bg-caramel text-espresso font-black rounded-2xl flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all"
              >
                Add it to Order — $6.50
              </button>
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('loadCoffeeRitual', {
                    detail: {
                      roast: moodData[detectedMood].drink.roast.toLowerCase(),
                      milk: moodData[detectedMood].drink.milk.toLowerCase(),
                      temperature: moodData[detectedMood].drink.temperature.toLowerCase()
                    }
                  }));
                  document.getElementById('build-your-ritual')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 py-5 bg-white text-espresso font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-cream transition-all"
              >
                <Wand2 className="w-5 h-5" /> Customize My Ritual
              </button>
            </div>
            
            <button onClick={() => setStage('consent')} className="mt-8 text-cream/30 hover:text-cream transition-all flex items-center gap-2 text-xs">
              <RefreshCw className="w-3 h-3" /> Start over
            </button>
          </motion.div>
        )}

      </div>

      <style jsx>{`
        @keyframes sweep {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function Coffee(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
}
