import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Interfaces
interface ModelAngles {
  front: string;
  deg30: string;
  deg45: string;
  [key: string]: string; // Index signature para acceso dinámico
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
  const [selectedModel, setSelectedModel] = useState<Model>(MODELS[1]); // Femenino por defecto
  const [currentAngle, setCurrentAngle] = useState<string>('front');
  const [selectedCategory, setSelectedCategory] = useState<string>('tops');
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // Filtrar prendas según modelo y categoría
  const availableGarments = GARMENTS.filter(
    (g) =>
      g.category === selectedCategory &&
      (g.gender === 'unisex' || g.gender === selectedModel.gender)
  );

  // Efecto de rotación automática al cambiar prenda
  useEffect(() => {
    if (selectedGarment && !isRotating) {
      setIsRotating(true);
      
      // Secuencia de rotación: front -> 30° -> 45° -> 30° -> front
      const angles = ['deg30', 'deg45', 'deg30', 'front'];
      let step = 0;

      const rotationInterval = setInterval(() => {
        if (step < angles.length) {
          setCurrentAngle(angles[step]);
          step++;
        } else {
          clearInterval(rotationInterval);
          setIsRotating(false);
        }
      }, 600);

      return () => clearInterval(rotationInterval);
    }
  }, [selectedGarment?.id, isRotating]);

  const handleGarmentSelect = (garment: Garment) => {
    setSelectedGarment(garment);
  };

  const handleModelSwitch = () => {
    const newModel = selectedModel.gender === 'male' ? MODELS[1] : MODELS[0];
    setSelectedModel(newModel);
    setSelectedGarment(null);
    setCurrentAngle('front');
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Logo TRYONYOU - Arriba Derecha */}
      <div className="absolute top-8 right-8 z-50">
        <img
          src="/assets/tryonyou-logo.png"
          alt="TRYONYOU"
          className="h-12 w-auto drop-shadow-lg"
        />
      </div>

      {/* PAU Assistant - Abajo Izquierda */}
      <div className="absolute bottom-8 left-8 z-50">
        <motion.img
          src="/assets/pau-assistant.png"
          alt="PAU Assistant"
          className="h-16 w-16 cursor-pointer hover:scale-110 transition-transform drop-shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Contenedor Principal */}
      <div className="flex h-full">
        {/* Panel Izquierdo - Miniaturas de Prendas */}
        <div className="w-64 bg-white/80 backdrop-blur-sm shadow-2xl p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Prendas</h2>
          
          {/* Switch de Modelo */}
          <button
            onClick={handleModelSwitch}
            className="w-full mb-6 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {selectedModel.gender === 'male' ? '👨 Hombre' : '👩 Mujer'}
          </button>

          {/* Miniaturas */}
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

        {/* Centro - Modelo con Prenda */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-[500px] h-[700px]">
            {/* Modelo Base */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`model-${selectedModel.id}-${currentAngle}`}
                src={selectedModel.angles[currentAngle]}
                alt={selectedModel.name}
                className="absolute inset-0 w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Prenda Superpuesta */}
            <AnimatePresence mode="wait">
              {selectedGarment && (
                <motion.img
                  key={`garment-${selectedGarment.id}-${currentAngle}`}
                  src={selectedGarment.image}
                  alt={selectedGarment.name}
                  className="absolute inset-0 w-full h-full object-contain mix-blend-multiply"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Selector de Categorías - Abajo Centro */}
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
