import React from 'react';

const BiometricStatus: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const isOnline = !!apiKey;

  return (
    <div className="fixed top-32 right-4 z-40 max-w-sm">
      {!isOnline && (
        <div className="bg-red-900/90 border-2 border-red-500 text-white px-6 py-4 rounded shadow-[0_0_30px_rgba(239,68,68,0.5)] backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-bold uppercase tracking-wider">⚠️ BIOMETRIC ENGINE OFFLINE</h3>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Missing <span className="font-mono text-[#C5A46D]">VITE_GOOGLE_API_KEY</span> in environment variables.
            Please configure in Vercel Dashboard → Settings → Environment Variables.
          </p>
        </div>
      )}
      {isOnline && (
        <div className="bg-green-900/90 border-2 border-green-500 text-white px-6 py-4 rounded shadow-[0_0_30px_rgba(34,197,94,0.5)] backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-bold uppercase tracking-wider">✅ BIOMETRIC ENGINE ONLINE</h3>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            AI recommendations active. System ready for Lafayette pilot.
          </p>
        </div>
      )}
    </div>
  );
};

export default BiometricStatus;
