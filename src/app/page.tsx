"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DigitalMenu from "@/components/DigitalMenu";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const MoodBrewScan = dynamic(() => import("@/components/MoodBrewScan"), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-full bg-cream min-h-screen">
      <Navbar onOpenQuiz={() => {}} />
      <CartDrawer />
      
      <HeroSection />
      <DigitalMenu />

      <section className="py-24 bg-espresso/5 border-y border-espresso/10">
        <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-4xl font-playfair font-bold text-espresso mb-4">Can't decide?</h2>
          <p className="font-dm-sans text-charcoal/70">Let our AI read your mood and match you with the perfect brew. Find your match to unlock a 15% discount on your order.</p>
        </div>
        <MoodBrewScan />
      </section>

      <Footer />
    </main>
  );
}
