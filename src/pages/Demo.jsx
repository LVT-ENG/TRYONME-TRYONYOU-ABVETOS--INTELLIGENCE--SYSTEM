import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const looks = [
  {
    id: 1,
    name: "Artisan Colorful Jacket",
    brand: "TRYONYOU x Lafayette",
    price: 1890,
    fit: 96,
    category: "Avant-Garde",
    image: "/images/look1-colorful-jacket.png",
    details: { shoulder: 98, chest: 95, waist: 94, length: 97 },
    description: "Hand-painted leather jacket with cubist face motif, paired with purple metallic trousers",
    colors: ["Purple", "Teal", "Gold"],
  },
  {
    id: 2,
    name: "Heritage Brown Suit",
    brand: "TRYONYOU x Lafayette",
    price: 2450,
    fit: 94,
    category: "Classic",
    image: "/images/look2-brown-suit.png",
    details: { shoulder: 96, chest: 93, waist: 92, length: 95 },
    description: "Textured brown blazer with burgundy shirt, leather trousers and gold buckle belt",
    colors: ["Brown", "Burgundy", "Black"],
  },
  {
    id: 3,
    name: "Noir Couture Dress",
    brand: "TRYONYOU x Lafayette",
    price: 3200,
    fit: 98,
    category: "Haute Couture",
    image: "/images/look3-black-dress.png",
    details: { shoulder: 99, chest: 98, waist: 97, length: 98 },
    description: "Black evening dress with gold LV motif, red opera gloves and fur stole",
    colors: ["Black", "Gold", "Red"],
  },
  {
    id: 4,
    name: "Graphic White Biker",
    brand: "TRYONYOU x Lafayette",
    price: 1650,
    fit: 95,
    category: "Contemporary",
    image: "/images/look4-white-jacket.png",
    details: { shoulder: 97, chest: 94, waist: 93, length: 96 },
    description: "White leather biker jacket with geometric black face print, minimal black base",
    colors: ["White", "Black"],
  },
];

const FitBar = ({ label, value, delay = 0 }) => (
  <motion.div 
    className="flex items-center gap-3"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: delay * 0.1, duration: 0.4 }}
  >
    <span className="text-white/50 text-xs uppercase tracking-wider w-16">{label}</span>
    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ delay: delay * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
      />
    </div>
    <span className="text-amber-400 text-xs font-medium w-10 text-right">{value}%</span>
  </motion.div>
);

export default function Demo() {
  const [selectedLook, setSelectedLook] = useState(looks[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLookChange = (look) => {
    if (look.id !== selectedLook.id) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedLook(look);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <span className="text-black font-bold text-sm">TY</span>
            </div>
            <div>
              <div className="text-white font-semibold">TRYONYOU</div>
              <div className="text-white/40 text-xs">for Lafayette Paris</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm hidden md:block">Virtual Fitting Experience</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left: Main Image Display */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="relative bg-gradient-to-br from-neutral-900 to-black rounded-2xl overflow-hidden border border-white/10">
                {/* Fit Score Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <motion.div 
                    className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10"
                    key={selectedLook.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Fit Score</div>
                    <div className="text-4xl font-light text-amber-400">{selectedLook.fit}%</div>
                  </motion.div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <motion.div 
                    className="bg-black/70 backdrop-blur-md rounded-full px-4 py-2 border border-white/10"
                    key={selectedLook.category}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <span className="text-white/80 text-sm">{selectedLook.category}</span>
                  </motion.div>
                </div>

                {/* Main Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedLook.id}
                    className="aspect-[3/4] md:aspect-[4/5] relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isTransitioning ? 0.3 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={selectedLook.image}
                      alt={selectedLook.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  </motion.div>
                </AnimatePresence>

                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.div
                    key={selectedLook.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-light text-white mb-2">{selectedLook.name}</h2>
                    <p className="text-white/60 text-sm mb-4 max-w-lg">{selectedLook.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-light text-white">${selectedLook.price.toLocaleString()}</span>
                      <div className="flex gap-2">
                        {selectedLook.colors.map((color, i) => (
                          <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-white/60 text-xs">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Fit Analysis */}
              <motion.div 
                className="mt-4 bg-neutral-900/50 rounded-xl border border-white/10 p-5"
                key={selectedLook.id}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white/80 text-sm uppercase tracking-wider">Fit Analysis</h3>
                  <span className="text-amber-400 text-sm">Your measurements applied</span>
                </div>
                <div className="space-y-3">
                  {Object.entries(selectedLook.details).map(([key, value], index) => (
                    <FitBar 
                      key={key} 
                      label={key} 
                      value={value} 
                      delay={index}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Selection Panel */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              {/* Collection Title */}
              <div className="text-center lg:text-left mb-6">
                <h1 className="text-white/40 text-xs uppercase tracking-[0.3em] mb-2">AW 2025 Collection</h1>
                <p className="text-white text-xl font-light">Select Your Look</p>
              </div>

              {/* Look Cards */}
              <div className="grid grid-cols-2 gap-3">
                {looks.map((look) => (
                  <motion.button
                    key={look.id}
                    onClick={() => handleLookChange(look)}
                    className={`relative rounded-xl overflow-hidden border transition-all ${
                      selectedLook.id === look.id
                        ? "border-amber-500 ring-2 ring-amber-500/30"
                        : "border-white/10 hover:border-white/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="aspect-[3/4]">
                      <img
                        src={look.image}
                        alt={look.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="text-white text-xs font-medium truncate">{look.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-white/60 text-xs">${look.price.toLocaleString()}</span>
                        <span className="text-amber-400 text-xs font-medium">{look.fit}%</span>
                      </div>
                    </div>
                    {selectedLook.id === look.id && (
                      <motion.div 
                        className="absolute top-2 right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Your Profile */}
              <div className="bg-neutral-900/50 rounded-xl border border-white/10 p-4 mt-6">
                <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3">Your Profile</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-white/40 text-xs mb-1">Height</div>
                    <div className="text-white font-medium">175 cm</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-white/40 text-xs mb-1">Size</div>
                    <div className="text-white font-medium">M / 48</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-4">
                <motion.button 
                  className="w-full py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Add to Bag - ${selectedLook.price.toLocaleString()}
                </motion.button>
                <motion.button 
                  className="w-full py-4 bg-transparent text-white border border-white/20 rounded-xl font-medium hover:bg-white/5 transition-all"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Reserve for In-Store Try-On
                </motion.button>
              </div>

              {/* Trust */}
              <div className="flex items-center justify-center gap-4 text-white/30 text-xs pt-4">
                <span>Free Returns</span>
                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                <span>Size Guarantee</span>
                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                <span>Expert Styling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
