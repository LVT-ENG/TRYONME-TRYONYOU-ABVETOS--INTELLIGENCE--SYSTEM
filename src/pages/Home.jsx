import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans">
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-2xl font-serif font-bold tracking-widest uppercase">Galeries Lafayette</div>
        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase font-medium">
          <a href="#" className="hover:text-red-500 transition-colors">Haute Couture</a>
          <a href="#" className="hover:text-red-500 transition-colors">Beauté</a>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 grayscale">
            <source src="/assets/hero/hero_main.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl md:text-8xl font-serif font-light mb-8">
            L'Intelligence <br/> <span className="italic font-normal">Sur Mesure</span>
          </motion.h1>
          <p className="text-lg md:text-xl font-light text-gray-300 mb-12 max-w-2xl mx-auto">
            Découvrez la perfection biométrique. Sans chiffres, sans tailles, juste votre silhouette magnifiée par Pau le Paon.
          </p>
          <button onClick={() => setLocation('/demo')} className="bg-white text-black px-12 py-6 text-sm tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all flex items-center mx-auto">
            Lancer l'Expérience <ArrowRight className="ml-4 w-4 h-4" />
          </button>
        </div>
      </section>

      <footer className="py-8 px-8 border-t border-white/10 text-[10px] tracking-widest text-gray-500 flex justify-between uppercase">
        <div>© 2026 LVT-ENG / TRYONYOU</div>
        <div>Protégé par Brevet PCT/EP2025/067317</div>
      </footer>
    </div>
  );
}
