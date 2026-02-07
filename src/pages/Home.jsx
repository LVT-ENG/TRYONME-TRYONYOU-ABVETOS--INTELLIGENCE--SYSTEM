import React, { useState } from 'react';
const Home = () => {
  const [view, setView] = useState('landing');
  const [isExiting, setIsExiting] = useState(false);
  const [recommendedOutfit, setRecommendedOutfit] = useState(null);
  const [pauMessage, setPauMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const transitionToResult = () => {
    setIsExiting(true);
    setTimeout(() => {
      setView('result');
      setIsExiting(false);
    }, 500);
  };

  const handleSnap = async () => {
    setLoading(true);
    console.log("⚡ Iniciando Protocolo Divineo...");
    
    try {
      const response = await fetch('/api/snap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gender: 'female', height: 170 })
      });

      const data = await response.json();

      if (data.success) {
        setRecommendedOutfit(data.prenda);
        setPauMessage(data.prenda.mensaje);
        transitionToResult();
      }
    } catch (error) {
      console.error("❌ Error conectando con los agentes:", error);
      setPauMessage("Conectando con el servidor de estilo... (Modo Offline)");
      // Fallback por si la API falla en plena demo
      setRecommendedOutfit({
          nombre: "Blazer Ivory Elena (Offline)",
          mensaje: "Modo de contingencia activado."
      });
      transitionToResult();
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#141619] text-[#F5EFE6] font-sans">
        {view === 'landing' && (
          <div
            key="landing"
            className={`text-center ${isExiting ? 'animate-fade-out' : 'animate-fade-in'}`}
          >
            <h1 className="text-5xl mb-8 text-[#C5A46D]">GALERIES LAFAYETTE</h1>
            <div className="relative w-64 h-64 mx-auto mb-8 bg-[#006D77] rounded-full flex items-center justify-center cursor-pointer" onClick={handleSnap}>
               {loading ? (
                   <span className="animate-pulse text-xl">ANALIZANDO...</span>
               ) : (
                   <span className="text-xl">HAZ CLICK (CHASQUIDO)</span>
               )}
            </div>
            <p className="text-sm tracking-widest">PATENT PCT/EP2025/067317</p>
          </div>
        )}

        {view === 'result' && recommendedOutfit && (
          <div
            key="result"
            className="text-center p-8 border border-[#C5A46D] rounded-lg max-w-md animate-slide-up"
          >
            <h2 className="text-3xl text-[#C5A46D] mb-4">{recommendedOutfit.nombre}</h2>
            <p className="text-xl mb-6 italic">"{pauMessage}"</p>
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>TIPO: {recommendedOutfit.tipo}</div>
                <div>ELASTICIDAD: {recommendedOutfit.elasticidad}</div>
            </div>
            <button 
                onClick={() => setView('landing')}
                className="px-6 py-2 border border-[#F5EFE6] rounded hover:bg-[#C5A46D] hover:text-[#141619] transition"
            >
                REINICIAR
            </button>
          </div>
        )}
    </div>
  );
};

export default Home;
