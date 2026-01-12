import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, Sparkles, Box, Layers } from 'lucide-react';

// --- HEADER ---
export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#E5E4E2]/80 backdrop-blur-md border-b border-[#D4AF37]/20">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="TryOnYou Logo" className="h-12 w-auto object-contain filter brightness-110 contrast-125 drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
          <span className="font-syne font-bold text-xl tracking-wider text-[#111111]">TRYONYOU</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[#111111]/80 hover:text-[#D4AF37] transition-colors font-space text-sm uppercase tracking-widest">Features</a>
          <a href="#vision" className="text-[#111111]/80 hover:text-[#D4AF37] transition-colors font-space text-sm uppercase tracking-widest">Vision</a>
          <Link href="/demo">
            <button className="px-6 py-2 bg-[#111111] text-[#D4AF37] font-space text-sm uppercase tracking-widest border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              Private Demo
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

// --- HERO ---
export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#E5E4E2]">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D4AF37]/5 clip-polygon-diagonal"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#111111]/5 clip-polygon-triangle"></div>
      
      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/10">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-space uppercase tracking-widest text-[#111111]">The Future of Retail</span>
          </div>
          
          <h1 className="font-syne font-bold text-5xl md:text-7xl leading-tight text-[#111111]">
            Virtual Try-On for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B59025]">Premium Fashion Retail</span>
          </h1>
          
          <p className="font-space text-lg text-[#111111]/70 max-w-md leading-relaxed">
            Reduce returns. Increase confidence. Pilot-ready.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/demo">
              <button className="group px-8 py-4 bg-[#111111] text-[#D4AF37] font-space uppercase tracking-widest border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-3">
                Request Private Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
        
        <div className="relative h-[600px] hidden md:block">
          {/* Abstract Composition with Pau */}
          <div className="absolute top-10 right-10 w-72 h-[450px] border-2 border-[#D4AF37] z-20"></div>
          <div className="absolute top-20 right-20 w-72 h-[450px] bg-[#111111] z-10"></div>
          <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center z-30">
             <div className="relative w-80 h-[500px] shadow-2xl border border-[#D4AF37]/20 overflow-hidden bg-[#E5E4E2]">
                <img src="/pau.png" alt="Pau - Personal Shopper" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#111111] to-transparent p-6 pt-20">
                  <p className="text-[#D4AF37] font-syne text-lg">Pau</p>
                  <p className="text-[#E5E4E2]/60 font-space text-xs uppercase tracking-widest">Your AI Personal Shopper</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FEATURES ---
export const Features = () => {
  const features = [
    {
      icon: <Box className="w-6 h-6 text-[#D4AF37]" />,
      title: "Geometric Precision",
      desc: "Our algorithm understands the structure of garments, not just the texture."
    },
    {
      icon: <Layers className="w-6 h-6 text-[#D4AF37]" />,
      title: "Seamless Integration",
      desc: "Designed to fit into your existing e-commerce flow without friction."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      title: "Premium Experience",
      desc: "A UI that elevates your brand perception while reducing returns."
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#111111] text-[#E5E4E2]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="group p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors duration-500 bg-[#111111]">
              <div className="mb-6 p-4 bg-[#D4AF37]/10 w-fit rounded-full group-hover:bg-[#D4AF37] group-hover:text-[#111111] transition-colors duration-500">
                {f.icon}
              </div>
              <h3 className="font-syne text-2xl mb-4 text-[#D4AF37]">{f.title}</h3>
              <p className="font-space text-[#E5E4E2]/60 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CONTACT ---
export const Contact = () => {
  return (
    <section className="py-24 bg-[#E5E4E2] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <h2 className="font-syne text-4xl md:text-5xl font-bold text-[#111111] mb-8">
          Ready to transform <br/> your retail experience?
        </h2>
        <p className="font-space text-[#111111]/60 mb-12 max-w-xl mx-auto">
          Join the select group of brands innovating with TryOnYou. 
          Request a private demonstration today.
        </p>
        
        <form className="max-w-md mx-auto space-y-4 text-left">
          <div>
            <label className="block font-space text-xs uppercase tracking-widest text-[#111111]/50 mb-2">Work Email</label>
            <input type="email" className="w-full bg-transparent border-b border-[#111111]/20 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors font-space text-[#111111]" placeholder="name@company.com" />
          </div>
          <button className="w-full py-4 bg-[#111111] text-[#D4AF37] font-space uppercase tracking-widest border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300 mt-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            Request Private Demo
          </button>
        </form>
      </div>
    </section>
  );
};

// --- FOOTER ---
export const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#E5E4E2]/40 py-12 border-t border-[#D4AF37]/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-syne font-bold text-xl tracking-wider text-[#D4AF37]">TRYONYOU</div>
        <div className="font-space text-sm">© 2025 TryOnYou Inc. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#D4AF37] transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};
