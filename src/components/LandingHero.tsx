import React from 'react';
import { Link } from 'wouter';

export const LandingHero = () => (
  <div className="hero-snap">
    <div className="absolute inset-0 z-0">
      {/* Placeholder for the 'Snap' moment image */}
      <img 
        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" 
        className="w-full h-full object-cover opacity-60" 
        alt="Model Snap Moment"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
    <div className="z-10 text-center space-y-6 px-4 animate-fadeIn">
      <h2 className="text-4xl md:text-6xl font-serif tracking-[0.2em] uppercase text-white">
        Bring Out Your Best Version
      </h2>
      <p className="text-[#C5A46D] tracking-[0.4em] text-xs uppercase">
        No fitting rooms · No returns · No wasted time
      </p>
      <Link to="/demo">
        <button className="mt-12 px-12 py-4 border border-white text-white text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500">
          Try The Experience
        </button>
      </Link>
    </div>
  </div>
);
