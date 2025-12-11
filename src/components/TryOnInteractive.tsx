import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TryOnEngine from "../lib/TryOnEngine";

// =======================
// 🔥 MODELOS DISPONIBLES
// =======================
const MODELS = [
  {
    id: "female",
    gender: "female",
    name: "Modelo Mujer",
    angles: {
      front: "/assets/models/female_front.png",
      side: "/assets/models/female_side.png",
    },
  },
  {
    id: "male",
    gender: "male",
    name: "Modelo Hombre",
    angles: {
      front: "/assets/models/male_front.png",
      side: "/assets/models/male_side.png",
    },
  },
];

// =======================
// 🔥 CATEGORÍAS
// =======================
const CATEGORIES = [
  { id: "tops", name: "Tops" },
  { id: "bottoms", name: "Bottoms" },
  { id: "outerwear", name: "Chaquetas" },
  { id: "dresses", name: "Vestidos" },
];

// =======================
// 🔥 PRENDAS DISPONIBLES
// =======================
const GARMENTS = [
  {
    id: "white-shirt",
    name: "Camiseta Blanca",
    category: "tops",
    gender: "unisex",
    image: "/assets/garments/white-shirt.png",
    thumbnail: "/assets/garments/white-shirt.png",
  },
  {
    id: "black-polo",
    name: "Polo Negro",
    category: "tops",
    gender: "male",
    image: "/assets/garments/black-polo.png",
    thumbnail: "/assets/garments/black-polo.png",
  },
  {
    id: "navy-sweater",
    name: "Suéter Azul Marino",
    category: "tops",
    gender: "female",
    image: "/assets/garments/navy-sweater.png",
    thumbnail: "/assets/garments/navy-sweater.png",
  },
  {
    id: "red-dress",
    name: "Vestido Rojo Noche",
    category: "dresses",
    gender: "female",
    image: "/assets/garments/dress-red-evening.png",
    thumbnail: "/assets/garments/dress-red-evening.png",
  },
];

// ==================================================
// 🔥 COMPONENTE PRINCIPAL — TryOnInteractive()
// ==================================================

export default function TryOnInteractive() {
  const [selectedModel, setSelectedModel] = useState(MODELS[1]);
  const [currentAngle, setCurrentAngle] = useState("front");
  const [selectedCategory, setSelectedCategory] = useState("tops");
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCanvas, setProcessedCanvas] = useState(null);

  const engineRef = useRef(null);
  const canvasContainerRef = useRef(null);

  // Inicializar motor
  useEffect(() => {
    engineRef.current = new TryOnEngine();
  }, []);

  // Pipeline completo
  useEffect(() => {
    const processTryOn = async () => {
      if (!selectedGarment || !engineRef.current) {
        setProcessedCanvas(null);
        return;
      }

      try {
        setIsProcessing(true);

        const modelImg = new Image();
        modelImg.src = selectedModel.angles[currentAngle];
        await new Promise((res) => (modelImg.onload = res));

        const garmentImg = new Image();
        garmentImg.src = selectedGarment.image;
        await new Promise((res) => (garmentImg.onload = res));

        const result = await engineRef.current.processImage(modelImg);

        const canvas = engineRef.current.compose(
          modelImg,
          garmentImg,
          result.segmentation,
          result.landmarks
        );

        setProcessedCanvas(canvas);
      } catch (err) {
        console.error("TryOn Error:", err);
      } finally {
        setIsProcessing(false);
      }
    };

    processTryOn();
  }, [selectedGarment, selectedModel, currentAngle]);

  // Pinta el canvas en pantalla
  useEffect(() => {
    if (canvasContainerRef.current && processedCanvas) {
      canvasContainerRef.current.innerHTML = "";
      processedCanvas.style.width = "100%";
      processedCanvas.style.height = "100%";
      canvasContainerRef.current.appendChild(processedCanvas);
    }
  }, [processedCanvas]);

  const handleGarmentSelect = (g) => setSelectedGarment(g);

  const handleModelSwitch = () => {
    const newModel = selectedModel.gender === "male" ? MODELS[0] : MODELS[1];
    setSelectedModel(newModel);
    setSelectedGarment(null);
    setCurrentAngle("front");
    setProcessedCanvas(null);
  };

  const availableGarments = GARMENTS.filter(
    (g) =>
      g.category === selectedCategory &&
      (g.gender === "unisex" || g.gender === selectedModel.gender)
  );

  // =====================================================
  // 🔥 RENDER COMPLETO
  // =====================================================

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">

      {/* LOGO */}
      <div className="absolute top-8 right-8 z-50">
        <img src="/assets/tryonyou-logo.png" className="h-12 w-auto" />
      </div>

      {/* PAU */}
      <div className="absolute bottom-8 left-8 z-50">
        <motion.img
          src="/assets/pau-assistant.png"
          className="h-16 w-16 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div className="flex h-full">

        {/* PANEL IZQUIERDO */}
        <div className="w-64 bg-white/80 p-6 shadow-xl overflow-y-auto z-20">
          <h2 className="text-2xl font-bold mb-6">Prendas</h2>

          <button
            onClick={handleModelSwitch}
            className="w-full mb-6 px-4 py-3 bg-purple-600 text-white rounded-lg"
          >
            {selectedModel.gender === "male" ? "👨 Hombre" : "👩 Mujer"}
          </button>

          <div className="space-y-4">
            {availableGarments.map((garment) => (
              <motion.div
                key={garment.id}
                onClick={() => handleGarmentSelect(garment)}
                className="cursor-pointer border rounded-lg bg-white shadow hover:shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={garment.thumbnail}
                  className="w-full h-32 object-contain bg-gray-50"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CANVAS */}
        <div className="flex-1 flex items-center justify-center relative bg-gray-100">
          <div className="relative w-[500px] h-[700px]">
            <div ref={canvasContainerRef} className="absolute inset-0" />

            {!processedCanvas && (
              <motion.img
                src={selectedModel.angles[currentAngle]}
                className="absolute inset-0 w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}

            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-md"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="font-semibold text-purple-700">
                      Procesando Try-On...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CATEGORÍAS */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-4 bg-white/90 rounded-full px-8 py-3 shadow-xl">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-semibold ${
                selectedCategory === cat.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}