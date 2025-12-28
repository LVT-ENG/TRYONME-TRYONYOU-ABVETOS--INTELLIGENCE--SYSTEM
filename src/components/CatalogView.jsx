import { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, CheckCircle, Factory, Clock } from 'lucide-react';
import api from '../services/api';
import ABVET from '../modules/ABVET';
import CAP from '../modules/CAP';
import { Button } from './ui/button';

const CatalogView = ({ digitalTwin, setView }) => {
  const [catalog, setCatalog] = useState([]);
  const [purchasingItem, setPurchasingItem] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState(null); // null | 'verifying' | 'manufacturing' | 'success' | 'error'
  const [productionDetails, setProductionDetails] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await api.getRecommendations(digitalTwin?.user_id);
        setCatalog(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, [digitalTwin]);

  const handlePurchase = async (item) => {
    setPurchasingItem(item);
    setPurchaseStatus('verifying');

    try {
      // 1. Payment Verification (ABVET)
      // Simulate user ID if not present in digitalTwin (for safety)
      const userId = digitalTwin?.user_id || 'guest_user';
      await ABVET.verifyPayment(userId, item.price, 'EUR');

      setPurchaseStatus('manufacturing');

      // 2. Production Pattern Generation (CAP)
      const garmentSpecs = { type: item.type, notes: [`Design: ${item.name}`] };
      // Create a mock avatar object from digitalTwin measurements for CAP
      const avatarForCAP = {
          id: userId,
          model_3d: digitalTwin?.measurements || { chest: 90, waist: 75, hips: 95, height: 175 } // Fallback
      };

      // Simulate delay for effect
      await new Promise(resolve => setTimeout(resolve, 2000));

      const pattern = await CAP.generatePattern(avatarForCAP, garmentSpecs);

      setProductionDetails(pattern);
      setPurchaseStatus('success');

    } catch (error) {
      console.error("Purchase failed:", error);
      setPurchaseStatus('error');
      alert(`Error en la compra: ${error.message}`);
      setPurchasingItem(null); // Reset on error
    }
  };

  const closeOverlay = () => {
      setPurchasingItem(null);
      setPurchaseStatus(null);
      setProductionDetails(null);
  };

  return (
    <div className="w-full max-w-6xl space-y-10 animate-in fade-in duration-500 p-6 relative">
      <div className="flex justify-between items-center">
        <button onClick={() => setView('landing')} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={18} /> VOLVER
        </button>
        <h2 className="text-4xl font-black tracking-tighter uppercase italic">Catálogo Inteligente</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {catalog.map((item) => (
          <div key={item.id} className="group relative bg-gray-900 rounded-[2rem] p-4 border border-white/5 hover:border-[#D3B26A] transition-all flex flex-col">
            <div className="aspect-[3/4] bg-[#1a1a1a] rounded-2xl mb-4 overflow-hidden relative">
              <div className="absolute top-3 right-3 bg-black/60 px-3 py-1 rounded-full text-[10px] font-black text-[#D3B26A] z-10">MATCH {item.match}%</div>
              {/* Bolt Optimization: Added lazy loading to improve performance */}
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            <div className="flex-grow">
                <p className="font-bold text-sm uppercase mb-1">{item.name}</p>
                <p className="text-xs text-gray-500 mb-4">Ajustado a tu biometría</p>
                <div className="text-xl font-black text-white mb-4">{item.price} €</div>
            </div>

            <Button
                onClick={() => handlePurchase(item)}
                className="w-full bg-white text-black hover:bg-[#D3B26A] hover:text-black font-bold rounded-xl transition-colors"
            >
                <ShoppingBag size={16} className="mr-2" /> Comprar y Fabricar
            </Button>
          </div>
        ))}
      </div>

      {/* Purchase Overlay */}
      {purchasingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-abvetos-gold rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
            {purchaseStatus === 'verifying' && (
               <div className="text-center space-y-4">
                 <Clock className="w-16 h-16 text-blue-500 mx-auto animate-pulse" />
                 <h3 className="text-2xl font-bold">Verificando ABVET...</h3>
                 <p className="text-gray-400">Analizando biometría para pago seguro.</p>
               </div>
            )}

            {purchaseStatus === 'manufacturing' && (
               <div className="text-center space-y-4">
                 <Factory className="w-16 h-16 text-orange-500 mx-auto animate-bounce" />
                 <h3 className="text-2xl font-bold">Iniciando Manufactura CAP...</h3>
                 <p className="text-gray-400">Generando patrones industriales DXF.</p>
               </div>
            )}

            {purchaseStatus === 'success' && productionDetails && (
               <div className="text-center space-y-6">
                 <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                 <div>
                    <h3 className="text-2xl font-bold text-abvetos-gold mb-2">¡Pedido Confirmado!</h3>
                    <p className="text-white text-sm">Tu prenda única está en producción.</p>
                 </div>

                 <div className="bg-black/40 rounded-xl p-4 text-left text-sm space-y-2 font-mono text-gray-300">
                    <div className="flex justify-between">
                        <span>ID Patrón:</span>
                        <span className="text-white">{productionDetails.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tiempo Producción:</span>
                        <span className="text-white">{productionDetails.production_time.total}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2">
                        <span>Entrega Estimada:</span>
                        <span className="text-green-400 font-bold">{productionDetails.production_time.estimated_delivery}</span>
                    </div>
                 </div>

                 <Button onClick={closeOverlay} className="w-full bg-abvetos-gold text-black font-bold text-lg">
                    Entendido
                 </Button>
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogView;
