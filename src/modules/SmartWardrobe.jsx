import React from 'react';
export default function SmartWardrobe() {
  return (
    <section className="p-8 bg-[#141619] text-[#C5A46D] border-t border-[#C5A46D]/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">Smart Wardrobe & AutoDonate</h2>
        <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md">
           <p className="text-white">Circular Economy Module Active. Ready for Lafayette Pilot.</p>
           <button className="mt-4 px-6 py-2 bg-[#C5A46D] text-[#141619] font-bold rounded hover:bg-white transition">
             Gestionar Armario
           </button>
        </div>
      </div>
    </section>
  );
}
