import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/button";

export default function Wardrobe() {
  const items = [
    {
      id: 1,
      name: "Red Dress Minimal",
      brand: "Galeries Lafayette",
      image: "/assets/catalog/red_dress_minimal.png",
      price: "€1,250",
    },
    {
      id: 2,
      name: "Burberry Trench",
      brand: "Burberry",
      image: "/assets/catalog/burberry_trench.png",
      price: "€2,100",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-900 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <Link href="/">
          <Button
            variant="ghost"
            className="text-white hover:text-red-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO HUB
          </Button>
        </Link>
        <div className="text-xl font-serif tracking-widest">SMART WARDROBE</div>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <main className="pt-32 px-6 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {items.map((item) => (
            <div key={item.id} className="group relative">
              <div className="aspect-[3/4] overflow-hidden bg-neutral-900 rounded-sm border border-white/10 relative">
                {/* Image Placeholder if file missing */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop"; // Fallback
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <Button className="w-full bg-white text-black hover:bg-red-600 hover:text-white transition-colors font-serif">
                    TRY ON VIRTUAL
                  </Button>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif">{item.name}</h3>
                  <p className="text-sm text-neutral-400 uppercase tracking-wider mt-1">
                    {item.brand}
                  </p>
                </div>
                <div className="text-xl font-light">{item.price}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
