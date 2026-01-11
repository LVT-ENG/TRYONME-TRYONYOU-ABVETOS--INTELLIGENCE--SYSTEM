// Componente: Espejo Virtual con Biometría (Estilo Divineo)
import React, { useEffect, useRef } from 'react';

export default function VirtualMirror() {
  const videoRef = useRef(null);

  useEffect(() => {
    let streamRef = null;
    let isMounted = true;
    
    // Activar cámara cuando el componente se monta
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        
        if (!isMounted) {
          // Si el componente se desmontó durante la petición, limpiar inmediatamente
          stream.getTracks().forEach(track => track.stop());
          return;
        }
        
        streamRef = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    // Cleanup: detener la cámara cuando el componente se desmonta
    return () => {
      isMounted = false;
      if (streamRef) {
        const tracks = streamRef.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Configuración: Cámara activa, sin almacenamiento de imágenes (Privacidad)
  // Estilo: Borde dorado (#C5A46D), Fondo Anthracite
  return (
    <div className="h-screen bg-[#141619] flex flex-col items-center justify-center">
      <div className="relative border-2 border-[#C5A46D] rounded-xl overflow-hidden shadow-[0_0_24px_rgba(197,164,109,0.35)]">
        {/* Video Feed */}
        <video 
          ref={videoRef}
          id="webcam" 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
          style={{ width: '640px', height: '480px' }}
        />
        
        {/* Overlay UI: Pau Agent */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 p-2 rounded-lg backdrop-blur-md">
           <img src="/assets/branding/pau_tuxedo_agent.png" alt="Pau" className="w-12 h-12" />
           <span className="text-[#F5EFE6] text-sm">Escaneando Biometría...</span>
        </div>
      </div>
      <h1 className="mt-6 text-[#C5A46D] font-serif text-2xl">PILOTO LAFAYETTE ACTIVO</h1>
    </div>
  );
}
