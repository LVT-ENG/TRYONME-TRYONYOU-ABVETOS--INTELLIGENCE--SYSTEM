import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F0] via-[#E8E4D9] to-[#C5A46D] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-9xl font-serif text-[#2C2C2C] tracking-[0.3em] uppercase mb-6 animate-fade-in">
            TryOnYou
          </h1>
          <p className="text-xl md:text-2xl text-[#2C2C2C]/60 tracking-[0.2em] uppercase font-light">
            Fashion Intelligence System
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Lafayette Pilot Card */}
          <Link 
            to="/pilot/lafayette-v7"
            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-[#C5A46D] rounded-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A46D]/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-[#C5A46D] text-white text-xs uppercase tracking-widest rounded-full">
                  Active Pilot
                </span>
              </div>
              
              <h2 className="text-3xl font-serif text-[#2C2C2C] mb-4 tracking-wider">
                Galeries Lafayette
              </h2>
              
              <p className="text-[#2C2C2C]/70 mb-6 leading-relaxed">
                Sistema de medición biométrica sin números. Primera experiencia Zero Tallas con FIS v7.0.
              </p>
              
              <div className="flex items-center text-[#C5A46D] font-semibold group-hover:translate-x-2 transition-transform">
                <span className="mr-2">Acceder al piloto</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Coming Soon Card */}
          <div className="relative overflow-hidden bg-white/40 backdrop-blur-sm border-2 border-[#2C2C2C]/20 rounded-lg p-8 opacity-60">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#2C2C2C]/5"></div>
            
            <div className="relative z-10">
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-[#2C2C2C]/20 text-[#2C2C2C] text-xs uppercase tracking-widest rounded-full">
                  Coming Soon
                </span>
              </div>
              
              <h2 className="text-3xl font-serif text-[#2C2C2C] mb-4 tracking-wider">
                Global Expansion
              </h2>
              
              <p className="text-[#2C2C2C]/60 mb-6 leading-relaxed">
                Próximos pilotos en desarrollo para retailers internacionales.
              </p>
              
              <div className="flex items-center text-[#2C2C2C]/40 font-semibold">
                <span className="mr-2">Próximamente</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 text-center">
          <p className="text-[#2C2C2C]/40 text-xs uppercase tracking-[0.5em]">
            TryOnYou © 2026 | Búnker Maestro Activo
          </p>
        </footer>
      </div>
    </div>
  );
}
