"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TryOnEngine from "../lib/TryOnEngine";

// Asegúrate de que estos arrays están definidos arriba
// MODELS, GARMENTS, CATEGORIES...

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

  // Pipeline
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

  // Render de canvas
  useEffect(() => {
    if (canvasContainerRef.current && processedCanvas) {
      canvasContainerRef.current.innerHTML = "";
      canvasContainerRef.current.appendChild(processedCanvas);
    }
  }, [processedCanvas]);

  const handleGarmentSelect = (g) => setSelectedGarment(g);

  const handleModelSwitch = () => {
    const newModel = selectedModel.gender === "male" ? MODELS[1] : MODELS[0];
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

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Logo */}
      <div className="absolute top-8 right-8 z-50">
        <img src="/assets/tryonyou-logo.png" className="h-12 w-auto" />
      </div>

      {/* PAU */}
      <div className="absolute bottom-8 left-8 z-50">
        <motion.img
          src="/assets/pau-assistant.png"
          className="h-16 w-16"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div className="flex h-full">
        {/* Panel izquierdo */}
        <div className="w-64 bg-white/80 p-6 shadow-2xl overflow-y-auto">
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
                className="cursor-pointer border rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img src={garment.thumbnail} className="w-full h-32 object-contain" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center bg-gray-100">
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
          </div>
        </div>
      </div>
    </div>
  );
}