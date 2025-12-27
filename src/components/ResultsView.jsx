
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { UserCheck, Ruler, BarChart3, ChevronRight, Loader2, Sparkles, Brain, Palette } from 'lucide-react';
import PAU from '../modules/PAU';

const ResultsView = ({ digitalTwin, setView }) => {
  const [avatarData, setAvatarData] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(true);

  useEffect(() => {
    const generateAvatar = async () => {
      if (digitalTwin) {
        try {
          // Simulate some processing time for the "AI" feel
          await new Promise(resolve => setTimeout(resolve, 1500));
          const avatar = await PAU.generateAvatar(digitalTwin);
          setAvatarData(avatar);
        } catch (error) {
          console.error("Error generating avatar:", error);
        } finally {
          setLoadingAvatar(false);
        }
      }
    };
    generateAvatar();
  }, [digitalTwin]);

  const stats = [
    { icon: UserCheck, label: "ID Biométrico", value: digitalTwin?.user_id.substring(0, 8) },
    { icon: Ruler, label: "Altura Estimada", value: digitalTwin?.measurements.height },
    { icon: BarChart3, label: "Complexión", value: digitalTwin?.measurements.build }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 overflow-y-auto">
      <div className="w-full max-w-4xl space-y-8 text-center my-10">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-abvetos-gold">GEMELO DIGITAL CREADO</h2>
          <p className="text-gray-400">Tu perfil biométrico ha sido establecido con éxito.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Biometric Stats */}
          <div className="bg-gray-900/50 border border-abvetos-gold/20 rounded-3xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-left mb-4 flex items-center gap-2">
              <ActivityIcon /> Datos Biométricos
            </h3>
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between text-left p-3 bg-black/20 rounded-xl">
                <div className="flex items-center gap-4">
                  <stat.icon size={20} className="text-abvetos-gold" />
                  <span className="font-medium text-gray-300">{stat.label}</span>
                </div>
                <span className="font-mono text-abvetos-gold">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* PAU Avatar Analysis */}
          <div className="bg-gray-900/50 border border-abvetos-gold/20 rounded-3xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={100} />
             </div>

             <h3 className="text-xl font-bold text-left mb-4 flex items-center gap-2">
               <Brain className="text-purple-400" /> Análisis PAU (Avatar AI)
             </h3>

             {loadingAvatar ? (
               <div className="flex flex-col items-center justify-center h-48 space-y-4">
                 <Loader2 className="animate-spin text-abvetos-gold" size={40} />
                 <p className="text-sm text-gray-400 animate-pulse">Sintetizando Micro-expresiones...</p>
               </div>
             ) : avatarData ? (
               <div className="space-y-4 text-left">
                  <div className="p-3 bg-purple-900/20 border border-purple-500/30 rounded-xl">
                    <div className="text-xs text-purple-300 uppercase font-bold mb-1">Perfil Emocional</div>
                    <div className="flex justify-between items-center">
                      <span>Confianza</span>
                      <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500"
                          style={{ width: `${avatarData.emotional_profile.confidence_level}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-xl">
                    <div className="text-xs text-blue-300 uppercase font-bold mb-1">Preferencia de Estilo</div>
                    <div className="flex items-center gap-2">
                      <Palette size={16} className="text-blue-400"/>
                      <span className="capitalize">{avatarData.style_preferences.primary_style}</span>
                      <span className="text-gray-500 text-sm">({avatarData.style_preferences.fit_preference})</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                     {avatarData.style_preferences.color_palette.recommended.map((color, i) => (
                       <div key={i} className="flex-1 h-8 rounded-md border border-white/10" style={{ backgroundColor: color }} title={color} />
                     ))}
                  </div>
               </div>
             ) : (
               <div className="text-red-400">Error al generar avatar.</div>
             )}
          </div>
        </div>

        <Button onClick={() => setView('catalog')} size="lg" className="w-full bg-abvetos-gold text-black rounded-2xl font-black text-xl uppercase tracking-tighter shadow-lg hover:bg-yellow-300 transition-all transform hover:scale-[1.02]">
          Ver Catálogo Inteligente
          <ChevronRight size={24} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)

export default ResultsView;
