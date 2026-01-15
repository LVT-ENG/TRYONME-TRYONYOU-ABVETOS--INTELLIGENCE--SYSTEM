import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPilot = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">

      {/* Fondo con degradado sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--panel)_0%,_var(--ink)_100%)] -z-10"></div>

      {/* Cabecera */}
      <header className="absolute top-0 w-full p-8 flex justify-between items-center opacity-80">
        <div className="text-xl font-bold tracking-[0.3em]">TRYONYOU</div>
        <div className="text-xs font-mono text-gold border border-gold px-2 py-1">V4.5 PILOT</div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-4xl z-10 space-y-8">
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-4">
          NOT JUST A MIRROR.<br />
          <span className="text-gold font-serif italic">It's Intelligent Fit.</span>
        </h1>

        <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto tracking-widest leading-loose">
          EXPERIENCE THE FIRST JIT PROTOCOL FOR RETAIL.<br/>
          NO AVATARS. REAL BIOMETRICS.
        </p>

        <div className="pt-10 flex flex-col md:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => navigate('/demo')}
            className="btn-metallic w-64"
          >
            ENTER PILOT
          </button>

          <button
            onClick={() => navigate('/google-news')}
            className="text-xs text-gray-500 hover:text-white transition tracking-widest border-b border-transparent hover:border-gray-500 pb-1"
          >
            VIEW PLATFORM NEWS
          </button>
        </div>
      </main>

      {/* Pie de página Técnico */}
      <footer className="absolute bottom-0 w-full p-6 text-[10px] text-gray-600 font-mono flex justify-between uppercase">
        <span>Powered by Jules Engine</span>
        <span>Patent PCT/EP2025/067317</span>
        <span>Lafayette Retail Tech</span>
      </footer>

    </div>
  );
};

export default LandingPilot;
