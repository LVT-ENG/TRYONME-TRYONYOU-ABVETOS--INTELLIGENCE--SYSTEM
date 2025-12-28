/**
 * TRYONYOU - Step 3: Result Screen
 * "The Intelligent Mirror Output"
 */
import { CheckCircle, Ruler } from 'lucide-react';
import { Button } from './ui/button';
import { BodyWireframe } from './BodyWireframe';

export default function ResultsView({ digitalTwin, matchedGarment, onReset }) {

  if (!matchedGarment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-black text-white">
        <h2 className="text-2xl font-light text-red-400 mb-4">No Match Found</h2>
        <p className="text-gray-400 mb-8">We couldn&apos;t find a garment that meets your biometric requirements perfectly.</p>
        <Button onClick={onReset} variant="outline" className="border-white text-white">Try Again</Button>
      </div>
    );
  }

  const { garment, bestSize } = matchedGarment;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">

        {/* Left: Product Image (High Quality) */}
        <div className="relative aspect-[3/4] bg-gray-900 rounded-sm overflow-hidden border border-white/10 group">
          <img
            src={garment.image}
            alt={garment.name}
            fetchPriority="high"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute top-6 right-6 bg-abvetos-gold text-black px-4 py-2 font-black text-xl tracking-tighter uppercase">
            {bestSize.name}
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
            <h2 className="text-3xl font-black uppercase tracking-tight">{garment.name}</h2>
            <p className="text-gray-300 font-serif italic">{garment.brand}</p>
          </div>
        </div>

        {/* Right: Analysis & Explanation */}
        <div className="space-y-10">

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-green-500 mb-2">
               <CheckCircle size={20} />
               <span className="font-mono text-sm uppercase tracking-widest">Confidence Score: {Math.round(bestSize.score)}%</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-thin leading-none">
              This is the <span className="font-bold text-abvetos-gold">best fit</span> for you.
            </h1>
          </div>

          <div className="border-l-2 border-abvetos-gold/30 pl-6 py-2 space-y-2">
            <h3 className="text-xl font-bold uppercase tracking-widest text-abvetos-gold">Why it fits</h3>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              {bestSize.explanation}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Based on fabric elasticity ({garment.fabric.elasticity * 100}%) and {garment.cut_type} cut.
            </p>
          </div>

          {/* Biometric Validation Data */}
          <div className="bg-white/5 p-6 rounded-sm border border-white/10 flex flex-col md:flex-row gap-8">
            {/* Wireframe Visualization */}
            <div className="flex-shrink-0">
               <BodyWireframe measurements={digitalTwin.measurements} />
            </div>

            {/* Numeric Data */}
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-6">
                 <Ruler className="text-abvetos-gold" />
                 <h4 className="font-bold uppercase tracking-widest text-sm">Biometric Alignment</h4>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm font-mono text-gray-400">
                 <div className="flex justify-between border-b border-white/5 pb-1">
                   <span>Height</span>
                   <span className="text-white">{digitalTwin.measurements.height} cm</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-1">
                   <span>Chest</span>
                   <span className="text-white">{digitalTwin.measurements.chest} cm</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-1">
                   <span>Waist</span>
                   <span className="text-white">{digitalTwin.measurements.waist} cm</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-1">
                   <span>Hips</span>
                   <span className="text-white">{digitalTwin.measurements.hips} cm</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-1">
                   <span>Arm Length</span>
                   <span className="text-white">{digitalTwin.measurements.arm_length || '--'} cm</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-1">
                   <span>Leg Length</span>
                   <span className="text-white">{digitalTwin.measurements.leg_length || '--'} cm</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
             <Button onClick={onReset} variant="outline" className="flex-1 border-white/20 hover:bg-white hover:text-black uppercase tracking-widest py-6">
                Scan Again
             </Button>
             <Button className="flex-1 bg-abvetos-gold text-black hover:bg-white font-bold uppercase tracking-widest py-6" onClick={() => alert("Proceeding to Checkout Flow (Out of Scope for Pilot)")}>
                Purchase Now
             </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
