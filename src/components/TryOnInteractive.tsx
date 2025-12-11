import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TryOnEngine } from '../lib/TryOnEngine';

// Interfaces
interface ModelAngles {
  front: string;
  deg30: string;
  deg45: string;
  [key: string]: string;
}

interface Model {
  id: string;
  name: string;
  gender: 'male' | 'female';
  angles: ModelAngles;
}

interface Garment {
  id: string;
  name: string;
  category: string;
  image: string;
  thumbnail: string;
  gender: 'male' | 'female' | 'unisex';
}

// Datos de modelos
const MODELS: Model[] = [
  {
    id: 'male-1',
    name: 'Modelo Masculino',
    gender: 'male',
    angles: {
      front: '/assets/models/male-front.png',
      deg30: '/assets/models/male-30deg.png',
      deg45: '/assets/models/male-45deg.png',
    },
  },
  {
    id: 'female-1',
    name: 'Modelo Femenino',
    gender: 'female',
    angles: {
      front: '/assets/models/female-front.png',
      deg30: '/assets/models/female-30deg.png',
      deg45: '/assets/models/female-45deg.png',
    },
  },
];

// Datos de prendas
const GARMENTS: Garment[] = [
  // Tops
  {
    id: 'top-white-tshirt',
    name: 'Camiseta Blanca',
    category: 'tops',
    image: '/assets/garments/top-white-tshirt.png',
    thumbnail: '/assets/garments/top-white-tshirt.png',
    gender: 'unisex',
  },
  {
    id: 'top-black-polo',
    name: 'Polo Negro',
    category: 'tops',
    image: '/assets/garments/top-black-polo.png',
    thumbnail: '/assets/garments/top-black-polo.png',
    gender: 'unisex',
  },
  {
    id: 'top-navy-sweater',
    name: 'Suéter Azul Marino',
    category: 'tops',
    image: '/assets/garments/top-navy-sweater.png',
    thumbnail: '/assets/garments/top-navy-sweater.png',
    gender: 'unisex',
  },
  // Bottoms
  {
    id: 'bottom-blue-jeans',
    name: 'Jeans Azul',
    category: 'bottoms',
    image: '/assets/garments/bottom-blue-jeans.png',
    thumbnail: '/assets/garments/bottom-blue-jeans.png',
    gender: 'unisex',
  },
  {
    id: 'bottom-black-chinos',
    name: 'Chinos Negro',
    category: 'bottoms',
    image: '/assets/garments/bottom-black-chinos.png',
    thumbnail: '/assets/garments/bottom-black-chinos.png',
    gender: 'unisex',
  },
  {
    id: 'bottom-gray-shorts',
    name: 'Shorts Gris',
    category: 'bottoms',
    image: '/assets/garments/bottom-gray-shorts.png',
    thumbnail: '/assets/garments/bottom-gray-shorts.png',
    gender: 'unisex',
  },
  // Outerwear
  {
    id: 'outerwear-leather-jacket',
    name: 'Chaqueta de Cuero',
    category: 'outerwear',
    image: '/assets/garments/outerwear-leather-jacket.png',
    thumbnail: '/assets/garments/outerwear-leather-jacket.png',
    gender: 'unisex',
  },
  {
    id: 'outerwear-denim-jacket',
    name: 'Chaqueta Denim',
    category: 'outerwear',
    image: '/assets/garments/outerwear-denim-jacket.png',
    thumbnail: '/assets/garments/outerwear-denim-jacket.png',
    gender: 'unisex',
  },
  {
    id: 'outerwear-blazer',
    name: 'Blazer Azul Marino',
    category: 'outerwear',
    image: '/assets/garments/outerwear-blazer.png',
    thumbnail: '/assets/garments/outerwear-blazer.png',
    gender: 'unisex',
  },
  // Dresses
  {
    id: 'dress-black-cocktail',
    name: 'Vestido Cóctel Negro',
    category: 'dresses',
    image: '/assets/garments/dress-black-cocktail.png',
    thumbnail: '/assets/garments/dress-black-cocktail.png',
    gender: 'female',
  },
  {
    id: 'dress-floral-summer',
    name: 'Vestido Floral Verano',
    category: 'dresses',
    image: '/assets/garments/dress-floral-summer.png',
    thumbnail: '/assets/garments/dress-floral-summer.png',
    gender: 'female',
  },
  {
    id: 'dress-red-evening',
    name: 'Vestido Rojo Noche',
    category: 'dresses',
    image: '/assets/garments/dress-red-evening.png',
    thumbnail: '/assets/garments/dress-red-evening.png',
    gender: 'female',
  },
];

const CATEGORIES = [
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'dresses', name: 'Dresses' },
];

export default function TryOnInteractive() {
  const [selectedModel, setSelectedModel] = useState<Model>(MODELS[1]);
  const [currentAngle, setCurrentAngle] = useState<string>('front');
  const [selectedCategory, setSelectedCategory] = useState<string>('tops');
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processedCanvas, setProcessedCanvas] = useState<HTMLCanvasElement | null>(null);
  
  const engineRef = useRef<TryOnEngine | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Inicializar Motor Try-On
  useEffect(() => {
    engineRef.current = new TryOnEngine();
  }, []);

  // Pipeline de Procesamiento
  useEffect(() => {
    const processTryOn = async () => {
      if (!selectedGarment || !engineRef.current) {
        setProcessedCanvas(null);
        return;
      }

      setIsProcessing(true);
      try {
        // 1. Cargar imagen del modelo base
        const modelImg = new Image();
        modelImg.src = selectedModel.angles[currentAngle];
        await new Promise((resolve) => (modelImg.onload = resolve));

        // 2. Cargar imagen de la prenda
        const garmentImg = new Image();
        garmentImg.src = selectedGarment.image;
        await new Promise((resolve) => (garmentImg.onload = resolve));

        // 3. Ejecutar segmentación y pose detection
        const result = await engineRef.current.processImage(modelImg);

        // 4. Componer resultado final (Warping + Masking)
        const finalCanvas = engineRef.current.compose(
          modelImg,
          garmentImg,
          result.segmentation!,
          result.landmarks!
        );

        setProcessedCanvas(finalCanvas);
      } catch (error) {
        console.error("Try-On Error:", error);
      } finally {
        setIsProcessing(false);
      }
    };

    processTryOn();
  }, [selectedGarment, selectedModel, currentAngle]);

  // Renderizar Canvas en el DOM
  useEffect(() => {
    if (canvasContainerRef.current && processedCanvas) {
      canvasContainerRef.current.innerHTML = '';
      processedCanvas.style.width = '100%';
      processedCanvas.style.height = '100%';
      processedCanvas.style.objectFit = 'contain';
      canvasContainerRef.current.appendChild(processedCanvas);
    }
  }, [processedCanvas]);

  const handleGarmentSelect = (garment: Garment) => {
    setSelectedGarment(garment);
  };

  const handleModelSwitch = () => {
    const newModel = selectedModel.gender === 'male' ? MODELS[1] : MODELS[0];
    setSelectedModel(newModel);
    setSelectedGarment(null);
    setCurrentAngle('front');
    setProcessedCanvas(null);
  };

  const availableGarments = GARMENTS.filter(
    (g) =>
      g.category === selectedCategory &&
      (g.gender === 'unisex' || g.gender === selectedModel.gender)
  );

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Logo */}
      <div className="absolute top-8 right-8 z-50">
        <img
          src="/assets/tryonyou-logo.png"
          alt="TRYONYOU"
          className="h-12 w-auto drop-shadow-lg"
        />
      </div>

      {/* PAU Assistant */}
      <div className="absolute bottom-8 left-8 z-50">
        <motion.img
          src="/assets/pau-assistant.png"
          alt="PAU Assistant"
          className="h-16 w-16 cursor-pointer hover:scale-110 transition-transform drop-shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div className="flex h-full">
        {/* Panel Izquierdo */}
        <div className="w-64 bg-white/80 backdrop-blur-sm shadow-2xl p-6 overflow-y-auto z-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Prendas</h2>
          
          <button
            onClick={handleModelSwitch}
            className="w-full mb-6 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {selectedModel.gender === 'male' ? '👨 Hombre' : '👩 Mujer'}
          </button>

          <div className="space-y-4">
            {availableGarments.map((garment) => (
              <motion.div
                key={garment.id}
                onClick={() => handleGarmentSelect(garment)}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
                  selectedGarment?.id === garment.id
                    ? 'border-purple-600 shadow-xl'
                    : 'border-transparent hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={garment.thumbnail}
                  alt={garment.name}
                  className="w-full h-32 object-contain bg-gray-50"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-white text-xs font-semibold truncate">
                    {garment.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Centro - Canvas de Try-On */}
        <div className="flex-1 flex items-center justify-center relative bg-gray-100">
          <div className="relative w-[500px] h-[700px]">
            
            {/* Loading Indicator */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-purple-800 font-bold">Procesando Try-On...</p>
                    <p className="text-xs text-gray-600 mt-1">Segmentando cuerpo & Ajustando prenda</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Canvas Container (Resultado Procesado) */}
            <div 
              ref={canvasContainerRef} 
              className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${processedCanvas ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Fallback: Imagen Original (si no hay canvas procesado) */}
            {!processedCanvas && (
              <motion.img
                key={`model-${selectedModel.id}-${currentAngle}`}
                src={selectedModel.angles[currentAngle]}
                alt={selectedModel.name}
                className="absolute inset-0 w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

          </div>
        </div>
      </div>

      {/* Selector de Categorías */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex gap-4 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-2xl">
          {CATEGORIES.map((cat) => {
            const isAvailable = GARMENTS.some(
              (g) =>
                g.category === cat.id &&
                (g.gender === 'unisex' || g.gender === selectedModel.gender)
            );

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                disabled={!isAvailable}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : isAvailable
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
