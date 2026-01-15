import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Scan } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-red-900 selection:text-white">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-2xl font-serif font-bold tracking-widest">
          GALERIES LAFAYETTE
        </div>
        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase font-medium">
          <a href="#" className="hover:text-red-500 transition-colors">Haute Couture</a>
          <a href="#" className="hover:text-red-500 transition-colors">Beauty</a>
          <a href="#" className="hover:text-red-500 transition-colors">Gourmet</a>
          <a href="#" className="hover:text-red-500 transition-colors">Events</a>
        </div>
        <Button variant="ghost" className="text-white hover:text-red-500 hover:bg-transparent uppercase tracking-widest text-xs border border-white/20 rounded-none px-6">
          Login
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Video/Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-10" />
          <img 
            src="/assets/ui/lafayette_hero_banner.png" 
            alt="Galeries Lafayette Interior" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 border border-red-500/50 text-red-400 text-[10px] tracking-[0.4em] uppercase mb-6 bg-black/50 backdrop-blur-sm">
              The Future of Retail
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium leading-tight tracking-tight mb-4">
              Virtual <br/>
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Fitting</span>
            </h1>
            <p className="max-w-xl mx-auto text-gray-300 text-sm md:text-base tracking-wide leading-relaxed font-light">
              Experience the perfect fit with our AI-powered biometric scanner. 
              Precision tailoring meets digital innovation in the heart of Paris.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-6 mt-8"
          >
            <Button 
              onClick={() => setLocation("/demo")}
              className="group relative overflow-hidden bg-white text-black hover:bg-gray-200 rounded-none px-10 py-8 text-sm tracking-[0.2em] uppercase transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Experience <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white rounded-none px-10 py-8 text-sm tracking-[0.2em] uppercase backdrop-blur-sm"
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Biometric Precision",
                desc: "Advanced skeletal tracking maps 33 key points for millimeter-perfect measurements.",
                icon: <Scan className="w-8 h-8 text-red-500" />
              },
              {
                title: "Instant Analysis",
                desc: "Real-time processing delivers your personalized size profile in under 5 seconds.",
                icon: <Sparkles className="w-8 h-8 text-red-500" />
              },
              {
                title: "Curated Style",
                desc: "AI-driven recommendations based on your unique body geometry and preferences.",
                icon: <ArrowRight className="w-8 h-8 text-red-500" />
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="group flex flex-col gap-6 border-l border-white/10 pl-8 hover:border-red-500/50 transition-colors duration-500"
              >
                <div className="mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif text-white">{feature.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
