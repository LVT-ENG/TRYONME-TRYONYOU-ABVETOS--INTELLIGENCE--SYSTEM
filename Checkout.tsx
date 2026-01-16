import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Star } from "lucide-react";
import { useLocation } from "wouter";

export default function Checkout() {
  const [, setLocation] = useLocation();

  const recommendedItems = [
    {
      id: 1,
      name: "Silk Chiffon Gown",
      brand: "Valentino",
      price: "€4,200",
      match: "98%",
      image: "/images/model-scan.jpg" // Placeholder
    },
    {
      id: 2,
      name: "Structured Blazer",
      brand: "Saint Laurent",
      price: "€2,890",
      match: "95%",
      image: "/images/texture-glass.jpg" // Placeholder
    },
    {
      id: 3,
      name: "Velvet Evening Dress",
      brand: "Givenchy",
      price: "€3,450",
      match: "92%",
      image: "/images/hero-bg.jpg" // Placeholder
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-900 selection:text-white">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/5">
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="text-white hover:text-red-500 hover:bg-transparent gap-2 pl-0"
        >
          <ArrowLeft className="w-4 h-4" /> <span className="tracking-widest uppercase text-xs">Back to Home</span>
        </Button>
        <div className="text-xl font-serif font-bold tracking-widest">
          YOUR CURATED SELECTION
        </div>
        <div className="w-24 flex justify-end">
          <ShoppingBag className="w-5 h-5 text-white/80" />
        </div>
      </header>

      <main className="pt-32 pb-20 container mx-auto px-4">
        
        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-red-500 text-xs tracking-[0.3em] uppercase mb-4">Biometric Analysis Complete</p>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Perfectly Tailored For You</h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Based on your unique skeletal structure and body geometry, our AI has selected these exclusive pieces from the Galeries Lafayette collection.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendedItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="group relative bg-white/5 border border-white/10 hover:border-red-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Image Area */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 flex items-center gap-1 border border-white/10">
                  <Star className="w-3 h-3 text-red-500 fill-red-500" />
                  <span className="text-xs font-mono text-white">{item.match} Match</span>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">{item.brand}</div>
                <h3 className="text-xl font-serif text-white mb-4">{item.name}</h3>
                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                  <span className="text-lg font-medium">{item.price}</span>
                  <Button 
                    className="bg-white text-black hover:bg-red-600 hover:text-white rounded-none text-xs uppercase tracking-widest px-6 transition-colors duration-300"
                  >
                    Add to Bag
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  );
}
