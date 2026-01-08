import React from "react";

const MontanaJeansLanding = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-black text-white p-8">
    <div className="max-w-3xl w-full bg-zinc-900 bg-opacity-80 rounded-3xl shadow-2xl p-10 flex flex-col items-center">
      <img src="/assets/images/montana_logo.png" alt="Montana Jeans Logo" className="w-48 mb-8" />
      <h1 className="text-5xl font-black mb-4 tracking-tight">Montana Jeans</h1>
      <p className="text-xl mb-8 text-center opacity-80">La leyenda del denim europeo, ahora con tecnología TryOnYou.<br/>Descubre la nueva colección, prueba virtualmente y encuentra tu fit perfecto.</p>
      <a href="/pilot" className="mt-4 px-10 py-4 bg-blue-700 hover:bg-blue-800 rounded-full text-lg font-bold uppercase tracking-widest transition">Probar Ahora</a>
      <div className="mt-10 text-sm opacity-60 text-center">
        <p>Montana Jeans® 2025. Todos los derechos reservados.</p>
        <p>Powered by TryOnYou Intelligence System</p>
      </div>
    </div>
  </div>
);

export default MontanaJeansLanding;
