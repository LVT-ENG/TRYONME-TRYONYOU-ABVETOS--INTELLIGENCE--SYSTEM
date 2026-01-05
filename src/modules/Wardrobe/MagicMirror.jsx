import React from 'react';
import PauMascot from '../../components/PauMascot';
import Avatar3D from '../../components/Avatar3D';

// Mocks/Wrappers for missing components based on existing architecture
const PauAgent = ({ emotionTracking }) => (
  <div className="absolute top-4 left-4 z-50">
    <PauMascot />
    {emotionTracking && <div className="text-xs text-tryonyou-gold mt-1 glass px-2 rounded">Emotion Tracking Active</div>}
  </div>
);

const DigitalTwinViewer = ({ scale }) => (
  <div className="w-full h-full relative">
    <Avatar3D />
    {scale === 'human-real-size' && (
      <div className="absolute bottom-4 right-4 text-xs text-white/50">Scale: 1:1</div>
    )}
  </div>
);

const AbvetSecureOverlay = ({ irisAuth, voiceAuth }) => (
  <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-tryonyou-anthracite to-transparent">
    <div className="flex justify-center gap-4">
      {irisAuth && <span className="glass px-4 py-2 text-tryonyou-gold border-tryonyou-gold/50 rounded-full flex items-center gap-2">👁️ Iris Scan</span>}
      {voiceAuth && <span className="glass px-4 py-2 text-tryonyou-gold border-tryonyou-gold/50 rounded-full flex items-center gap-2">🎙️ Voice Auth</span>}
    </div>
  </div>
);

export const MagicMirror = ({ active }) => {
  if (!active) return null;

  return (
    <div className="magic-mirror-container relative bg-black" style={{ height: '100vh', width: '100%' }}>
      {/* Sensor de visión para reconocimiento de emociones [Source 5005] */}
      <PauAgent emotionTracking={true} />

      {/* Renderizado del avatar 3D a escala 1:1 */}
      <DigitalTwinViewer scale="human-real-size" />

      {/* Capa de pago biométrico ABVET */}
      <AbvetSecureOverlay irisAuth={true} voiceAuth={true} />
    </div>
  );
};
