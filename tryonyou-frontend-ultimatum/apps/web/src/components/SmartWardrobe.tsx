import { Shirt, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SmartWardrobe = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      <div className="group relative">
        <button
          onClick={() => navigate('/fit')}
          className="w-14 h-14 rounded-full bg-[rgba(20,22,25,0.9)] border border-[var(--gold)] flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(197,164,109,0.2)]"
        >
          <Shirt size={24} />
        </button>
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[var(--anth)] border border-[var(--gold)] px-3 py-1 text-[10px] tracking-widest text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          SMART WARDROBE
        </div>
      </div>

      <div className="group relative">
        <button
          onClick={() => navigate('/solidarity')}
          className="w-14 h-14 rounded-full bg-[rgba(20,22,25,0.9)] border border-[var(--peacock)] flex items-center justify-center text-[var(--peacock)] hover:bg-[var(--peacock)] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(0,109,119,0.2)]"
        >
          <Heart size={24} />
        </button>
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[var(--anth)] border border-[var(--peacock)] px-3 py-1 text-[10px] tracking-widest text-[var(--peacock)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          SOLIDARITY DONATION
        </div>
      </div>
    </div>
  );
};
