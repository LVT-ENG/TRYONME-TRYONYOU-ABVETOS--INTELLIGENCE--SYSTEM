
const SolidarityWardrobe = () => {
  return (
    <div className="pt-24 px-8 min-h-screen">
      <h2 className="text-3xl text-[var(--peacock)] tracking-widest mb-8">SOLIDARITY WARDROBE</h2>
      <div className="glass-panel p-8 max-w-2xl mx-auto border-[var(--peacock)]">
        <p className="text-[var(--bone)] mb-6 text-justify font-light">
          The "Closed Loop" patent claim ensures that for every digital garment purchased or generated,
          a tangible contribution is made to the circular economy.
        </p>

        <div className="flex flex-col gap-4">
          <div className="p-4 border border-[var(--bone)] border-opacity-20 flex justify-between items-center hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-colors">
            <span>Donate Old Garment</span>
            <span className="text-[var(--gold)]">→</span>
          </div>
          <div className="p-4 border border-[var(--bone)] border-opacity-20 flex justify-between items-center hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-colors">
            <span>Recycle Fabric</span>
            <span className="text-[var(--gold)]">→</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--peacock)] border-opacity-30 text-center">
             <p className="text-[var(--peacock)] text-xs tracking-[3px]">IMPACT METRICS: 0.0 KG CO2 SAVED</p>
        </div>
      </div>
    </div>
  );
};

export default SolidarityWardrobe;
