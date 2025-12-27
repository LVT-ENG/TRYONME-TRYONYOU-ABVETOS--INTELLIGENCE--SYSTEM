
import { Button } from './ui/button';
import { X, Camera } from 'lucide-react';

const ScannerView = ({ videoRef, isAnalyzing, processBiometry, onCancel }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="relative aspect-[3/4] bg-gray-900 rounded-[3rem] overflow-hidden border-4 border-abvetos-gold/50 shadow-2xl">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale" />
          <div className="absolute top-0 left-0 w-full h-1 bg-abvetos-gold shadow-[0_0_20px_#D3B26A] animate-[scan_3s_infinite_linear]"></div>
          
          {/* Overlay de escaneo */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-abvetos-gold"></div>
            <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-abvetos-gold"></div>
            <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-abvetos-gold"></div>
            <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-abvetos-gold"></div>
          </div>

          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-abvetos-gold border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 font-mono text-xs tracking-widest text-abvetos-gold">ABVETOS: EXTRACCIÓN BIOMÉTRICA...</p>
              <p className="mt-2 text-xs text-gray-400">Analizando proporciones corporales</p>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {!isAnalyzing && (
            <>
              <Button 
                onClick={processBiometry} 
                size="lg" 
                className="w-full bg-white text-black py-5 rounded-2xl font-black text-xl uppercase tracking-tighter shadow-xl hover:bg-gray-200 flex items-center justify-center gap-3"
              >
                <Camera size={24} />
                Escanear Biometría
              </Button>
              <Button 
                onClick={onCancel}
                size="lg" 
                variant="outline"
                className="w-full border-2 border-gray-600 text-gray-400 py-4 rounded-2xl font-bold uppercase tracking-tighter hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                <X size={20} />
                Cancelar
              </Button>
            </>
          )}
        </div>
        
        <p className="text-xs text-gray-500 leading-relaxed">
          Asegúrate de estar bien iluminado y de frente a la cámara para obtener mejores resultados.
        </p>
      </div>
    </div>
  );
};

export default ScannerView;
