'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const claims = [
  "Tu cuerpo es único, tu ropa también",
  "Sin tallas, solo tú",
  "Privacidad total: tus datos no se guardan"
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % claims.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Hero Video Background Placeholder */}
      <div className="absolute inset-0 z-0 opacity-50">
         {/* Using a placeholder gradient/image for now, simulating video feel */}
         <div className="w-full h-full bg-gradient-to-br from-gray-900 via-purple-900 to-black animate-pulse" />
      </div>

      <div className="z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lafayette-gold to-white mb-8 tracking-tighter">
          TRY ON YOU
        </h1>
        
        <div className="h-20 mb-12 flex items-center justify-center w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-xl md:text-3xl text-gray-200 font-light italic"
            >
              "{claims[index]}"
            </motion.p>
          </AnimatePresence>
        </div>

        <Link href="/scanner">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-lafayette-gold text-black font-semibold text-lg rounded-full shadow-[0_0_20px_rgba(197,160,89,0.5)] hover:shadow-[0_0_40px_rgba(197,160,89,0.8)] transition-all"
          >
            Iniciar Experiencia Escáner
          </motion.button>
        </Link>
      </div>

      <div className="absolute bottom-10 text-gray-500 text-sm">
        Galeries Lafayette © 2024
      </div>
    </main>
  );
}
