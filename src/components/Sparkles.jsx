import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RandomSparkle = ({ color = '#C5A46D', style }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      position: 'absolute',
      display: 'block',
      width: '10px',
      height: '10px',
      backgroundColor: color,
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 100,
      ...style,
    }}
  />
);

const Sparkles = ({ active, onComplete }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (active) {
      const newSparkles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
        },
      }));
      setSparkles(newSparkles);

      const timer = setTimeout(() => {
        setSparkles([]);
        if (onComplete) onComplete();
      }, 1000); // Effect duration

      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {sparkles.map((s) => (
            <RandomSparkle key={s.id} style={s.style} />
            ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Sparkles;
