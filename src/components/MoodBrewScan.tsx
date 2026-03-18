// src/components/MoodBrewScan.tsx
"use client";

/*
 * SETUP REQUIRED: Download face-api.js models and place in /public/models/
 * Downloaded from: https://github.com/justadudewhohacks/face-api.js/tree/master/weights
 * Required files:
 *   - tiny_face_detector_model-weights_manifest.json + shard files
 *   - face_expression_model-weights_manifest.json + shard files
 *   - face_landmark_68_model-weights_manifest.json + shard files
 */

import { useEffect, useRef, useState } from "react";
import { MoveRight, ShieldCheck, RefreshCw, Share2, Sparkles, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { moodData, detectMood, getMostFrequentMood, MoodType } from "@/lib/moodLogic";
import { useCartStore } from "@/store/useCartStore";
import { menuItems } from "@/lib/mockData";

// Dynamically handle face-api.js is tricky with types, we use it client-side.
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<MoodType[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section entrance
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

    // Infinite gentle emoji bob
    const emojis = document.querySelectorAll('.bobbing-emoji');
    emojis.forEach((emoji, i) => {
      gsap.to(emoji, {
        y: -10,
        duration: 2 + (i * 0.2),
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 0.1
      });
    });

    return () => {
      stopCamera();
    };
  }, []);

  // Stage transition animations
  useEffect(() => {
    if (cardRef.current) {
      if (stage === 'result') {
        gsap.fromTo(cardRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.2)" }
        );
      } else {
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }
        );
      }
    }
  }, [stage]);

  const loadModels = async () => {
    if (modelsLoaded) return true;
    setModelsLoading(true);
    setErrorMsg(null);

    try {
      if (!faceapi) {
        faceapi = await import('face-api.js');
      }

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models')
      ]);

      setModelsLoaded(true);
      setModelsLoading(false);
      return true;
    } catch (error) {
      console.error("Failed to load face-api models:", error);
      setErrorMsg("Mood scanner is taking a break. Choose manually below.");
      setModelsLoading(false);
      setStage('manual');
      return false;
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      return true;
    } catch (error) {
      console.error("Camera access denied:", error);
      setStage('manual');
      return false;
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleStartScan = async () => {
    const loaded = await loadModels();
    if (!loaded) return;

    setStage('scanning');
    
    const camStarted = await startCamera();
    if (!camStarted) return;

    // Wait for video to have enough data before detecting
    await new Promise<void>((resolve) => {
      const video = videoRef.current;
      if (!video) { resolve(); return; }
      if (video.readyState >= 2) { resolve(); return; }
      video.onloadeddata = () => resolve();
      // Fallback timeout in case event never fires
      setTimeout(resolve, 1500);
    });

    // Small extra buffer for stable frames
    await new Promise(r => setTimeout(r, 300));

    resultsRef.current = [];
    let frames = 0;

    const interval = setInterval(async () => {
      if (!videoRef.current || !faceapi) return;

      try {
        const detection = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.3 }))
          .withFaceExpressions();

        if (detection) {
          setExpressions(detection.expressions);
          const mood = detectMood(detection.expressions);
          resultsRef.current.push(mood);
        }
      } catch (err) {
        console.error("Detection error:", err);
      }

      frames++;
      if (frames >= 6) { // 3 seconds total (500ms * 6)
        clearInterval(interval);
        stopCamera();

        const finalMood = getMostFrequentMood(resultsRef.current) || 'Neutral';
        setDetectedMood(finalMood);
        setStage('result');
        setExpressions(null); // Reset
      }
    }, 500);

  };

  const handleManualMood = (mood: MoodType) => {
    setDetectedMood(mood);
    setStage('result');
  };

  const getMoodExpressionScore = (mood: string, expressions: any): number => {
    if (!expressions) return 0;
    switch (mood) {
      case 'Chill':   return expressions.happy || 0;
      case 'Tense':   return Math.max(expressions.angry || 0, expressions.disgusted || 0);
      case 'Tired':   return Math.max(expressions.sad || 0, expressions.fearful || 0);
      case 'Focused': return expressions.surprised || 0;
      case 'Neutral': return expressions.neutral || 0;
      default: return 0;
    }
  };

  return (
    <section 
      id="mood-brew-scan" 
      ref={sectionRef}
      className="relative w-full py-24 bg-espresso px-6 md:px-12 flex flex-col items-center overflow-hidden"
    >
      {/* Section Header */}
      <div className="scan-header text-center mb-12 max-w-2xl transform">
        <span className="font-['Caveat'] text-2xl text-caramel italic">
          Your face knows what you need
        </span>
        <h2 className="text-4xl md:text-6xl font-bold font-playfair text-cream mt-2 mb-4 tracking-tight">
          Mood Brew Scan
        </h2>
        <p className="font-['DM_Sans'] text-cream/70 text-base leading-relaxed">
          We read your expression. We match your coffee. <br className="hidden md:inline" />
          Nothing is stored — ever.
        </p>
      </div>

      {/* Main Container Card */}
      <div 
        ref={cardRef} 
        className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12 relative text-cream"
      >
        {/* Stage 1: Consent & Intro */}
        {stage === 'consent' && (
          <div className="flex flex-col items-center text-center">
            {/* Bobbing Emojis */}
            <div className="flex gap-4 mb-6 text-3xl md:text-4xl">
              <span className="bobbing-emoji">😌</span>
              <span className="bobbing-emoji">😤</span>
              <span className="bobbing-emoji">😴</span>
              <span className="bobbing-emoji">🎯</span>
              <span className="bobbing-emoji">😐</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold font-playfair text-cream mb-4">
              What&apos;s your face saying right now?
            </h3>
            
            <p className="font-['DM_Sans'] text-cream/80 mb-8 max-w-md">
              Auroma&apos;s Mood Brew Scan reads your facial expression to match you with the perfect coffee for how you actually feel.
            </p>

            {/* Privacy Promise */}
            <div className="w-full bg-jade/10 border-l-4 border-jade p-5 rounded-r-xl text-left mb-8">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-jade" />
                <span className="font-['DM_Sans'] font-bold text-jade text-sm">Your privacy, guaranteed:</span>
              </div>
              <ul className="list-disc list-inside font-['DM_Sans'] text-xs text-charcoal/80 space-y-1 pl-1">
                <li>Camera activates only when you tap Scan</li>
                <li>We analyse for 3 seconds, then camera stops immediately</li>
                <li>Zero data stored. Zero images saved. Ever.</li>
              </ul>
            </div>

            {modelsLoading ? (
              <div className="flex flex-col items-center gap-3 py-4 w-full">
                <div className="w-8 h-8 border-2 border-caramel border-t-transparent rounded-full animate-spin" />
                <p className="font-['DM_Sans'] text-[#3A3A3A] text-sm">Loading Mood Scanner...</p>
                <p className="font-['Caveat'] text-[#C9893A] italic text-xs">Only happens once. Promise.</p>
              </div>
            ) : (
              <>
                <button 
                  onClick={handleStartScan}
                  className="w-full py-4 bg-caramel hover:bg-caramel/90 text-espresso font-bold rounded-full font-['DM_Sans'] shadow-[0_4px_15px_rgba(201,137,58,0.3)] hover:shadow-[0_6px_20px_rgba(201,137,58,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group mb-4 cursor-pointer"
                >
                  Scan My Mood <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setStage('manual')}
                  className="text-xs font-['DM_Sans'] text-charcoal/60 hover:text-caramel underline underline-offset-4 cursor-pointer"
                >
                  No camera? Choose my mood manually &rarr;
                </button>
              </>
            )}
            
            {errorMsg && (
              <p className="text-red-600 text-xs font-['DM_Sans'] mt-4 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errorMsg}
              </p>
            )}
          </div>
        )}

        {/* Stage 2A: Scanning Interface */}
        {stage === 'scanning' && (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">
            {/* Left: Camera Video */}
            <div className="w-full md:w-1/2 aspect-square min-h-[260px] relative rounded-2xl overflow-hidden border-2 border-caramel shadow-inner bg-black">
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline 
                className="w-full h-full object-cover scale-x-[-1]"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Corner decor */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-caramel" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-caramel" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-caramel" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-caramel" />
              
              {/* Scan Line Animation */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="w-full h-[2px] bg-caramel shadow-[0_0_8px_var(--color-caramel)] absolute animate-[sweep_1.5s_infinite_linear]" style={{
                  top: '0%',
                }} />
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-jade/90 text-cream rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 bg-cream rounded-full" /> SCANNING...
              </div>
            </div>

            {/* Right: Scanning indicators */}
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="font-playfair font-bold text-xl text-cream mb-4">
                Reading your expression...
              </h4>
              
              <div className="space-y-4 mb-4">
                {['Chill', 'Tense', 'Tired', 'Focused', 'Neutral'].map((m) => {
                  const score = getMoodExpressionScore(m, expressions);
                  const itemMood = m as MoodType;

                  const isDominant = expressions && detectMood(expressions) === itemMood;

                  return (
                    <div key={m} className="w-full">
                      <div className="flex justify-between text-xs font-['DM_Sans'] text-cream/80 mb-1">
                        <span className="flex items-center gap-1">
                          {moodData[m as MoodType].emoji} {m}
                        </span>
                        <span>{Math.round(score * 100)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${isDominant ? 'bg-caramel' : 'bg-white/30'}`}
                          style={{ width: `${score * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="font-['DM_Sans'] text-xs text-charcoal/60">Hold still for just a moment ☕</p>
              <p className="font-['Caveat'] text-caramel italic text-xs">(We'll only need 3 seconds)</p>
            </div>
          </div>
        )}

        {/* Stage 2B: Manual Mood Picker */}
        {stage === 'manual' && (
          <div>
            <h3 className="text-2xl font-bold font-playfair text-cream text-center mb-6">
              How are you feeling right now?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(['Chill', 'Tense', 'Tired', 'Focused', 'Neutral'] as MoodType[]).map((m) => {
                const data = moodData[m];
                return (
                  <button
                    key={m}
                    onClick={() => handleManualMood(m)}
                    className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-caramel/30 hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1 group"
                  >
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{data.emoji}</span>
                    <span className="font-playfair font-bold text-cream text-sm">{m}</span>
                    <span className="font-['DM_Sans'] text-[10px] text-cream/60 mt-1 text-center leading-tight">
                      {m === 'Chill' && 'Relaxed, no rush'}
                      {m === 'Tense' && 'Stressed today'}
                      {m === 'Tired' && 'Need a fuel boost'}
                      {m === 'Focused' && 'Stay in the zone'}
                      {m === 'Neutral' && 'Just... normal'}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="text-center mt-6">
              <button 
                onClick={() => setStage('consent')} 
                className="text-xs font-['DM_Sans'] text-charcoal/60 hover:text-caramel underline"
              >
                &larr; Back to scanner
              </button>
            </div>
          </div>
        )}

        {/* Stage 3: Result Mode */}
        {stage === 'result' && detectedMood && (
          <div className="flex flex-col items-center">
            {/* Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="text-5xl mb-2 animate-bounce">
                {moodData[detectedMood].emoji}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-playfair text-cream">
                Your mood: <span className="text-caramel">{detectedMood}</span>
              </h3>
              <span className="font-['Caveat'] text-lg text-caramel italic mt-1">
                &ldquo;{moodData[detectedMood].tagline}&rdquo;
              </span>
            </div>

            {/* Recommendation Display */}
            <div className="w-full bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 shadow-inner">
              <span className="font-['Caveat'] text-caramel text-base italic block text-center mb-1">
                Auroma recommends
              </span>
              <h4 className="text-2xl md:text-3xl font-black font-playfair text-cream text-center mb-2 tracking-tight">
                {moodData[detectedMood].drink.name}
              </h4>
              <div className="flex justify-center mb-6">
                <span className="px-3 py-1 bg-caramel/20 text-cream rounded-full text-xs font-dm-sans font-medium">
                  {moodData[detectedMood].drink.origin}
                </span>
              </div>

              {/* Two column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Visual */}
                <div className="flex justify-center relative">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-dashed border-caramel/30 relative" style={{ backgroundColor: moodData[detectedMood].drink.cupColor }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-80">
                      {/* Interactive CSS Steam */}
                      <div className="steam-line absolute top-2 left-1/2 w-1 h-8 bg-cream/40 rounded-full animate-[steam_2s_infinite_ease-out_0s]" style={{ transform: 'translateX(-50%)' }} />
                      <div className="steam-line absolute top-0 left-[45%] w-1 h-6 bg-cream/30 rounded-full animate-[steam_2s_infinite_ease-out_0.4s]" />
                      <div className="steam-line absolute top-1 left-[55%] w-1 h-7 bg-cream/30 rounded-full animate-[steam_2s_infinite_ease-out_0.8s]" />
                    </div>
                    {/* Tiny small indicator overlay */}
                    <div className="absolute -bottom-1 -right-1 bg-cream-dark p-1.5 rounded-full shadow-md text-base">
                      {moodData[detectedMood].emoji}
                    </div>
                  </div>
                </div>

                {/* Text attributes */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-cream font-['DM_Sans'] block mb-1">
                      Why this matches:
                    </span>
                    <p className="font-['DM_Sans'] text-cream/80 text-xs leading-relaxed">
                      {moodData[detectedMood].drink.whyThisMatches}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {moodData[detectedMood].drink.tastingNotes.map((note) => (
                      <span key={note} className="px-2.5 py-1 bg-white/10 text-cream font-medium rounded-full text-[10px]">
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-y-1 text-xs font-['DM_Sans'] text-cream/70">
                    <div>Roast: <span className="font-bold text-cream">{moodData[detectedMood].drink.roast}</span></div>
                    <div>Milk: <span className="font-bold text-cream">{moodData[detectedMood].drink.milk}</span></div>
                    <div className="col-span-2">
                      Caffeine: {"☕".repeat(moodData[detectedMood].drink.strength === 'Single' ? 1 : moodData[detectedMood].drink.strength === 'Double' ? 2 : 3)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expansion Science Accordion */}
              <details className="mt-8 border-t border-white/10 pt-4 group">
                <summary className="font-['DM_Sans'] text-xs font-semibold text-cream flex items-center justify-between cursor-pointer list-none">
                  <span>The Science Behind It</span>
                  <div className="w-4 h-4 rounded-full border border-caramel flex items-center justify-center group-open:rotate-180 transition-transform">
                    &darr;
                  </div>
                </summary>
                <p className="mt-2 font-['DM_Sans'] text-xs text-cream/70 leading-relaxed pl-1">
                  {moodData[detectedMood].drink.science}
                </p>
              </details>
            </div>

            {/* CTA Actions */}
            <div className="w-full mt-6 space-y-3">
              <button 
                onClick={() => {
                  const data = moodData[detectedMood].drink;
                  useCartStore.getState().addItem({
                    id: `mood-${detectedMood.toLowerCase()}`,
                    name: `${data.name} (Mood Match)`,
                    description: data.whyThisMatches,
                    price: 6.50,
                    category: 'Signatures',
                    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop',
                    dietaryTags: data.tastingNotes
                  });
                }}
                className="w-full py-3 bg-caramel hover:bg-caramel/90 text-espresso font-bold rounded-full font-dm-sans shadow-md text-sm transition-all hover:shadow-[0_0_20px_rgba(201,137,58,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                Add Match to Cart <MoveRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  const text = `Auroma scanned my mood as ${detectedMood} and matched me with ${moodData[detectedMood].drink.name} ☕ #MoodBrewScan`;
                  navigator.clipboard.writeText(text);
                }}
                className="w-full py-2.5 bg-transparent hover:bg-white/5 text-cream font-semibold rounded-full font-['DM_Sans'] border border-white/10 text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> Share My Mood Match
              </button>
            </div>

            <div className="mt-6 flex gap-4 text-xs font-['DM_Sans'] text-charcoal/50">
              <button onClick={() => setStage('consent')} className="hover:text-caramel underline underline-offset-2 flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Rescan
              </button>
              <a href="#brew-blueprint" className="hover:text-caramel underline underline-offset-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Try the quiz instead
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Embedded CSS for custom sweep & steam animations */}
      <style jsx>{`
        @keyframes sweep {
          0% { top: 0%; opacity: 0.1; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0.1; }
        }
        @keyframes steam {
          0% { transform: translateY(0) scaleX(1); opacity: 0; }
          40% { opacity: 0.6; }
          80% { transform: translateY(-25px) scaleX(1.1); opacity: 0.2; }
          100% { transform: translateY(-40px) scaleX(1.3); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
