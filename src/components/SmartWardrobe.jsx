import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Share2 } from 'lucide-react';

const SmartWardrobe = () => {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the best match from the backend
    const fetchMatch = async () => {
      try {
        // Use relative path for Vercel Serverless Function
        const response = await fetch('/api/match', {
            method: 'POST', // or GET depending on backend impl, defaulting to POST for safety
        });
        const data = await response.json();
        setMatch(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching match:", err);
        // Fallback data
        setMatch({
            name: "Divineo Bespoke Blazer",
            fit_score: 98.5,
            fabric: "Midnight Wool",
            description: "Perfectly calibrated for your shoulder width.",
            price: 590
        });
        setLoading(false);
      }
    };

    // Artificial delay for dramatic effect
    setTimeout(fetchMatch, 1500);
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen bg-black text-[#D4AF37] flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="tracking-widest animate-pulse">ANALYZING FIT...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left: Visualization (Avatar/Garment) */}
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-zinc-900 rounded-3xl overflow-hidden aspect-[3/4] border border-[#D4AF37]/20 group"
        >
            {/* Placeholder for the matched garment image */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center">
                <span className="text-9xl opacity-10 font-serif">L</span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-[#D4AF37] text-sm tracking-widest mb-2 uppercase">Best Match</p>
                        <h2 className="text-3xl text-white font-serif">{match?.name}</h2>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl text-[#D4AF37] font-bold">{match?.fit_score}%</div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">Fit Score</p>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Right: Details & Actions */}
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
        >
            <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-light text-white mb-6">
                    <span className="italic font-serif text-[#D4AF37]">The</span> Match
                </h1>
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                    {match?.description} <br/>
                    Constructed from <span className="text-[#D4AF37]">{match?.fabric}</span>.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="p-6 border border-zinc-800 rounded-xl bg-white/5">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Cut Type</p>
                    <p className="text-white text-xl">Slim / Tailored</p>
                </div>
                <div className="p-6 border border-zinc-800 rounded-xl bg-white/5">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Occasion</p>
                    <p className="text-white text-xl">Evening / Gala</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button className="flex-1 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-lg hover:bg-[#B59020] transition-colors flex items-center justify-center gap-3">
                    <ShoppingBag size={20} />
                    Reserve Item
                </button>
                <button className="px-6 border border-zinc-700 rounded-lg hover:bg-zinc-900 transition-colors text-white">
                    <Share2 size={20} />
                </button>
            </div>

            <p className="mt-8 text-center text-gray-500 text-sm">
                Powered by Lafayette Stock & Pau AI
            </p>

        </motion.div>

      </div>
    </div>
  );
};

export default SmartWardrobe;
