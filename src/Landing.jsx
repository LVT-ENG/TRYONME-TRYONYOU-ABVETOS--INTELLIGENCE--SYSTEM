import { memo } from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { Button } from './components/ui/button';

const Landing = ({ startCamera }) => {
  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center text-center p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/pilot.jpg')" }}
    >
      <div className="absolute inset-0 bg-abvetos-anthracite/70 backdrop-blur-sm"></div>
      <div className="relative z-10 animate-in fade-in zoom-in duration-1000 space-y-10">
        
        {/* TRYONYOU/ABVETOS Logo - Patent PCT/EP2025/067317 */}
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="TRYONYOU - ABVETOS Intelligence" className="h-16 md:h-20 drop-shadow-2xl" />
        </div>
        
        <div className="flex justify-center items-center gap-3">
          <Sparkles className="text-abvetos-gold" size={32} />
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            El Espejo Inteligente
          </h1>
        </div>

        <p className="text-abvetos-bone/80 max-w-3xl mx-auto text-xl italic">
          Visualiza, prueba y compra ropa sin cambiarte. Nuestra IA analiza tu biometría y estilo para crear el look perfecto, reflejado instantáneamente en el espejo.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-black/30 p-4 rounded-3xl border border-abvetos-gold/10">
            <img src="/images/mirror-before.jpg" alt="Persona frente al espejo con ropa normal" className="rounded-xl aspect-[3/4] object-cover"/>
            <p className="mt-3 text-sm font-bold uppercase tracking-wider text-abvetos-steel">Antes: Tu Ropa Actual</p>
          </div>
          <div className="bg-black/30 p-4 rounded-3xl border-2 border-abvetos-gold/50 shadow-[0_0_30px_rgba(211,178,106,0.2)]">
            <img src="/images/mirror-after.jpg" alt="Reflejo en el espejo con un atuendo sugerido por IA" className="rounded-xl aspect-[3/4] object-cover"/>
            <p className="mt-3 text-sm font-bold uppercase tracking-wider text-abvetos-gold">Después: Tu Look Ideal</p>
          </div>
        </div>

        <Button 
          onClick={startCamera} 
          size="lg"
          className="bg-abvetos-gold text-black px-12 py-6 rounded-full font-black text-2xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(211,178,106,0.4)] flex items-center gap-4 mx-auto hover:bg-yellow-300"
        >
          <Camera size={28} />
          INICIAR EXPERIENCIA
        </Button>

        {/* Patent Reference */}
        <div className="mt-8 text-xs text-abvetos-steel/60">
          <p>Protected by Patent PCT/EP2025/067317</p>
          <p className="mt-1">© 2025 TRYONYOU - ABVETOS Intelligence System</p>
        </div>

      </div>
    </div>
  );
};

export default Landing;

