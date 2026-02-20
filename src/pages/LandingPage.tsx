import React from 'react';
import { Link } from 'wouter';
import BiometricStatus from '../components/BiometricStatus';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#141619] text-[#F0F0F0] font-sans overflow-x-hidden">
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-center bg-gradient-to-b from-[#141619] to-transparent">
        <img src="/images/logo-peacock.png" alt="TryOnYou Logo" className="h-16 drop-shadow-lg" />
      </header>

      {/* Lafayette Pilot Active Banner */}
      <div className="fixed top-20 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <div className="bg-[#C5A46D] text-[#141619] px-8 py-2 text-xs font-bold uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(197,164,109,0.5)]">
          🦚 PILOTO LAFAYETTE ACTIVO
        </div>
      </div>

      {/* Biometric Engine Status */}
      <BiometricStatus />

      {/* Hero Section: Lafayette Gallery + Snap Concept */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image: Lafayette Gallery */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/ui/lafayette_hero_banner.png" 
            alt="Galeries Lafayette" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141619] via-transparent to-[#141619]/50"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center px-4 max-w-4xl mt-20">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-wide drop-shadow-2xl">
            Bring Out Your <br/> <span className="text-[#C5A46D] italic">Best Version</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-12 font-light tracking-wider max-w-2xl mx-auto">
            No fitting rooms. No returns. No wasted time.
          </p>

          <Link to="/demo">
            <button className="px-12 py-4 bg-[#C5A46D] text-[#141619] text-sm font-bold uppercase tracking-[0.25em] hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(197,164,109,0.3)] transform hover:scale-105">
              Try The Experience
            </button>
          </Link>
        </div>

        {/* Pau Mascot - Lower Left Corner */}
        <div className="absolute bottom-8 left-8 z-20">
          <img 
            src="/assets/branding/pau_tuxedo_agent.png" 
            alt="Pau Agent" 
            className="h-32 md:h-40 drop-shadow-2xl opacity-90"
          />
        </div>
      </section>

      {/* Claims Carousel / Grid */}
      <section className="py-24 bg-[#0f1113]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 p-8 border border-white/5 hover:border-[#C5A46D]/30 transition-colors duration-500">
            <div className="text-[#C5A46D] text-4xl mb-4">✨</div>
            <h3 className="text-xl font-serif text-white">Confidence</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Wear clothes that truly fit your body and your mood. Feel the difference of a perfect match.
            </p>
          </div>
          <div className="space-y-4 p-8 border border-white/5 hover:border-[#C5A46D]/30 transition-colors duration-500">
            <div className="text-[#C5A46D] text-4xl mb-4">⏳</div>
            <h3 className="text-xl font-serif text-white">Time Saved</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Skip the lines and the guessing game. Get straight to the look that works for you.
            </p>
          </div>
          <div className="space-y-4 p-8 border border-white/5 hover:border-[#C5A46D]/30 transition-colors duration-500">
            <div className="text-[#C5A46D] text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-serif text-white">Precision</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Calibrated with real store data. It's not just AI, it's your personal tailor.
            </p>
          </div>
        </div>
      </section>

      {/* Powered by Google Section */}
      <section className="py-24 bg-[#141619] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl text-[#C5A46D] mb-4 tracking-wider">Powered by Google</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 font-light">
            Engineered with Gemini 2.0 Flash, Agent 70, and MediaPipe for unparalleled precision and speed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center opacity-80">
            {/* Gemini 2.0 Flash */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">G</div>
              <h3 className="text-white text-lg font-medium tracking-wide">Gemini 2.0 Flash</h3>
              <p className="text-gray-500 text-xs uppercase tracking-widest">Real-Time Narrative</p>
            </div>

            {/* Agent 70 */}
            <div className="flex flex-col items-center space-y-4 transform scale-110">
              <div className="w-20 h-20 border-2 border-[#C5A46D] rounded-full flex items-center justify-center text-[#C5A46D] text-3xl font-serif">70</div>
              <h3 className="text-white text-xl font-medium tracking-wide">Agent 70</h3>
              <p className="text-gray-500 text-xs uppercase tracking-widest">Style Intelligence</p>
            </div>

            {/* MediaPipe */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-white text-2xl font-bold">MP</div>
              <h3 className="text-white text-lg font-medium tracking-wide">MediaPipe</h3>
              <p className="text-gray-500 text-xs uppercase tracking-widest">On-Device Privacy</p>
            </div>
          </div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A46D]/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#141619]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em]">
            &copy; 2026 TryOnYou Pilot Experience
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-500 text-xs tracking-wide">
            <a href="mailto:contact@tryonyou.app" className="hover:text-[#C5A46D] transition-colors duration-300">
              contact@tryonyou.app
            </a>
            <a href="https://tryonyou.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A46D] transition-colors duration-300">
              tryonyou.app
            </a>
            <span>Paris, France</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
