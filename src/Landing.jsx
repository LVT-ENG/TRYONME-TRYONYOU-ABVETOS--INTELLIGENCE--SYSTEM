import { Camera, ArrowRight, ShieldCheck, Ruler, Scan } from 'lucide-react';
import { Button } from './components/ui/button';

const Landing = ({ startCamera }) => {
  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-abvetos-gold selection:text-black font-sans">
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Video/Image Placeholder */}
        <div className="absolute inset-0 z-0 opacity-60">
          <img
            src="/images/luxury-background.jpg"
            alt="Luxury Fashion Background"
            className="w-full h-full object-cover"
            onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Value Prop */}
          <div className="space-y-8 text-left animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-300">Pilot Access Live</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight uppercase">
              Perfect Fit.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-abvetos-gold to-yellow-200">Zero Returns.</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-md font-light leading-relaxed">
              Experience the future of fashion retail. Our biometric engine analyzes fabric elasticity and your unique measurements to guarantee the perfect size.
            </p>

            <Button
              onClick={startCamera}
              className="bg-abvetos-gold hover:bg-white text-black text-lg px-10 py-8 rounded-none font-bold tracking-widest uppercase transition-all flex items-center gap-4"
            >
              Enter Pilot
              <ArrowRight size={24} />
            </Button>

            <p className="text-xs text-gray-600 font-mono">
              PATENT PENDING: PCT/EP2025/067317
            </p>
          </div>

          {/* Right: Visual Hero (Pau Concept Placeholder) */}
          <div className="relative hidden md:block animate-in slide-in-from-right duration-1000">
             <div className="aspect-[3/4] bg-gray-900/80 rounded-sm border border-white/10 p-4 relative backdrop-blur-sm">
                <img
                   src="/images/showcase-1.jpg"
                   alt="Intelligent Mirror Experience"
                   className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                   onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop'}
                />

                {/* Floating Elements */}
                <div className="absolute top-8 -right-8 bg-black border border-abvetos-gold/30 p-4 w-48 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Scan className="text-abvetos-gold" size={16} />
                    <span className="text-xs font-bold uppercase">Biometrics</span>
                  </div>
                  <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-abvetos-gold w-[92%]"></div>
                  </div>
                  <div className="text-[10px] text-right mt-1 font-mono text-abvetos-gold">92% MATCH</div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white text-black p-6 shadow-2xl max-w-xs">
                   <p className="font-serif italic text-lg leading-tight">&quot;Pau snaps his fingers, and the outfit adapts instantly.&quot;</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Claims Section */}
      <div className="py-24 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4 border-l border-abvetos-gold/30 pl-6">
              <Ruler className="text-abvetos-gold" size={32} />
              <h3 className="text-2xl font-bold uppercase">Precise Biometrics</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We measure leg length, torso, and shoulder width with 98% accuracy using computer vision. No avatars, just data.
              </p>
            </div>
            <div className="space-y-4 border-l border-abvetos-gold/30 pl-6">
              <ShieldCheck className="text-abvetos-gold" size={32} />
              <h3 className="text-2xl font-bold uppercase">Fabric Aware</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our engine accounts for fabric drape and elasticity. A 2% stretch linen fits differently than 15% wool.
              </p>
            </div>
            <div className="space-y-4 border-l border-abvetos-gold/30 pl-6">
              <Camera className="text-abvetos-gold" size={32} />
              <h3 className="text-2xl font-bold uppercase">Visual First</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium, high-fidelity visuals. Designed for luxury retail environments like Galeries Lafayette.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

