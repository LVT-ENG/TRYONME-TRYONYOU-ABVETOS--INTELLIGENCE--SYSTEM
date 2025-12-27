
import { Button } from './ui/button';
import { UserCheck, Ruler, BarChart3, ChevronRight } from 'lucide-react';

const ResultsView = ({ digitalTwin, setView }) => {
  const stats = [
    { icon: UserCheck, label: "ID Biométrico", value: digitalTwin?.user_id.substring(0, 8) },
    { icon: Ruler, label: "Altura Estimada", value: digitalTwin?.measurements.height },
    { icon: BarChart3, label: "Complexión", value: digitalTwin?.measurements.build }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-abvetos-gold">GEMELO DIGITAL CREADO</h2>
          <p className="text-gray-400">Tu perfil biométrico ha sido establecido con éxito.</p>
        </div>

        <div className="bg-gray-900/50 border border-abvetos-gold/20 rounded-3xl p-6 space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between text-left">
              <div className="flex items-center gap-4">
                <stat.icon size={20} className="text-abvetos-gold" />
                <span className="font-medium text-gray-300">{stat.label}</span>
              </div>
              <span className="font-mono text-abvetos-gold">{stat.value}</span>
            </div>
          ))}
        </div>

        <Button onClick={() => setView('catalog')} size="lg" className="w-full bg-abvetos-gold text-black rounded-2xl font-black text-xl uppercase tracking-tighter shadow-lg hover:bg-yellow-300">
          Ver Catálogo Inteligente
          <ChevronRight size={24} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ResultsView;
