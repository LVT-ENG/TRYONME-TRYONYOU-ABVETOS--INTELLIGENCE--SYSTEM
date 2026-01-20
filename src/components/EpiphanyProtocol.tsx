// Ubicación: src/components/EpiphanyProtocol.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Scene {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  text: string;
  bg: string;
}

interface EpiphanyProps {
  onClose?: () => void;
}

const SCENE_DURATION = 6000;

const EpiphanyProtocol: React.FC<EpiphanyProps> = ({ onClose }) => {
  const [sceneIndex, setSceneIndex] = useState(0);

  const scenes: Scene[] = [
    {
      id: 'intro',
      image: '/assets/branding/pau_tuxedo_agent.png',
      title: "Bonjour.",
      subtitle: "Hoy no venimos a vender.",
      text: "Hoy venimos a recordar quién eres.",
      bg: "#141619"
    },
    {
      id: 'confidence',
      image: '/assets/catalog/red_dress_minimal.png',
      title: "MARZO 2025",
      subtitle: "CONFIDENCE DETECTED",
      text: "Mira cómo brillabas. Esa fuerza sigue en ti.",
      bg: "#2C0B0E"
    },
    {
      id: 'resilience',
      image: '/assets/catalog/burberry_trench.png',
      title: "NOVIEMBRE 2025",
      subtitle: "PROTECCIÓN Y ELEGANCIA",
      text: "Tu elegancia resistió incluso la tormenta.",
      bg: "#1C1C18"
    },
    {
      id: 'security',
      image: '/assets/ui/biometric_scan_ui.png',
      title: "IDENTIDAD SEGURA",
      subtitle: "PROTEGIDO POR ABVET™",
      text: "Tus recuerdos están encriptados. Solo tus ojos pueden ver tu historia.",
      bg: "#001517"
    },
    {
      id: 'solidarity',
      image: '/assets/catalog/wardrobe_grid.jpg',
      title: "ARMARIO SOLIDARIO",
      subtitle: "EL CICLO CONTINÚA",
      text: "¿Hay algo aquí que pueda hacer feliz a alguien más este año?",
      bg: "#141619"
    },
  ];

  useEffect(() => {
    if (sceneIndex < scenes.length) {
      const timer = setTimeout(() => {
        setSceneIndex((prev) => prev + 1);
      }, SCENE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [sceneIndex, scenes.length]);

  if (sceneIndex >= scenes.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-screen bg-[#141619] text-[#D4AF37]"
      >
        <h1 className="text-4xl tracking-widest font-serif">TRYONYOU</h1>
        <p className="mt-4 italic opacity-80">LA TECNOLOGÍA EMPIEZA A SANAR</p>
        {onClose && (
          <button onClick={onClose} className="mt-8 border border-[#D4AF37] px-6 py-2 hover:bg-[#D4AF37] hover:text-black transition">
            FINALIZAR PROTOCOLO
          </button>
        )}
      </motion.div>
    );
  }

  const currentScene = scenes[sceneIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScene.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{ backgroundColor: currentScene.bg }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      >
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 5 }}
          src={currentScene.image}
          alt={currentScene.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 text-center px-6">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-sm tracking-[0.5em] text-[#D4AF37] mb-2"
          >
            {currentScene.title}
          </motion.h2>
          <motion.h1
            className="text-5xl font-serif text-white mb-6"
          >
            {currentScene.subtitle}
          </motion.h1>
          <motion.p
            className="max-w-md mx-auto text-lg text-zinc-300 leading-relaxed"
          >
            {currentScene.text}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EpiphanyProtocol;
