import React, { useState } from 'react';

export default function SyncControl() {
  const [status, setStatus] = useState('idle');

  const handleMezclar = () => {
    setStatus('processing'); // Feedback visual instantáneo
    setTimeout(() => {
      // Aquí simulamos la mezcla pesada de proyectos
      console.log("Hijas unificadas con éxito");
      setStatus('completed');
    }, 500);
  };

  return (
    <div className="p-4 border border-zinc-800 rounded-xl">
      <button onClick={handleMezclar} className="bg-gold text-black px-4 py-2 uppercase font-bold">
        {status === 'processing' ? 'Procesando...' : 'Mezclar Hijas'}
      </button>
      <p className="mt-2 text-xs opacity-50 text-white">Estado: {status}</p>
    </div>
  );
}
