import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const CatalogView = ({ digitalTwin, setView }) => {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`/api/recommendations?user_id=${digitalTwin?.user_id}`);
        const data = await response.json();
        setCatalog(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, [digitalTwin]);

  return (
    <div className="w-full max-w-6xl space-y-10 animate-in fade-in duration-500 p-6">
      <div className="flex justify-between items-center">
        <button onClick={() => setView('landing')} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={18} /> VOLVER
        </button>
        <h2 className="text-4xl font-black tracking-tighter uppercase italic">Catálogo Inteligente</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {catalog.map((item) => (
          <div key={item.id} className="group relative bg-gray-900 rounded-[2rem] p-4 border border-white/5 hover:border-[#D3B26A] transition-all cursor-pointer">
            <div className="aspect-[3/4] bg-[#1a1a1a] rounded-2xl mb-4 overflow-hidden relative">
              <div className="absolute top-3 right-3 bg-black/60 px-3 py-1 rounded-full text-[10px] font-black text-[#D3B26A]">MATCH {item.match}%</div>
              <img src={`https://images.unsplash.com/photo-1594932224010-75f10011468b?q=80&w=400&auto=format&fit=crop`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <p className="font-bold text-sm uppercase">{item.name}</p>
            <p className="text-xs text-gray-500 mt-1">Ajustado a tu biometría</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogView;
