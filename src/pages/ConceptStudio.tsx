import React, { useState } from 'react';
import { generateFashionConcept } from '../services/geminiService';
import { Sparkles, Download, Share2 } from 'lucide-react';

const ConceptStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const fullPrompt = `Fashion concept design sketch, high quality, professional, detailed: ${prompt}`;
      const result = await generateFashionConcept(fullPrompt);
      if (result) {
        setGeneratedImage(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
       <header className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">CONCEPT LAB</h2>
        <p className="text-zinc-400 font-mono text-sm">GENERATIVE AI FASHION DESIGN ENGINE</p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        
        {/* Controls */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
           <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
              <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Design Parameters (Prompt)</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., A futuristic cyberpunk jacket with neon accents, iridescent material, high collar, worn by a model in Tokyo..."
                className="w-full bg-black border border-zinc-700 rounded p-3 text-sm text-white focus:border-emerald-500 focus:outline-none h-32 resize-none mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                 {['Avant-Garde', 'Minimalist', 'Techwear', 'Vintage'].map(tag => (
                   <button 
                    key={tag}
                    onClick={() => setPrompt(prev => `${prev} ${tag}`)}
                    className="px-2 py-1 bg-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 rounded border border-zinc-700"
                   >
                     +{tag}
                   </button>
                 ))}
              </div>
              
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-mono text-sm rounded flex items-center justify-center transition-all"
              >
                {isGenerating ? (
                   <span className="animate-pulse">GENERATING ASSETS...</span>
                ) : (
                  <>
                   <Sparkles size={16} className="mr-2" /> GENERATE CONCEPT
                  </>
                )}
              </button>
           </div>

           <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800/50">
              <h4 className="text-xs font-mono text-zinc-500 mb-2">SYSTEM SPECS</h4>
              <div className="space-y-2 text-xs text-zinc-400 font-mono">
                <div className="flex justify-between">
                  <span>MODEL</span>
                  <span className="text-emerald-500">GEMINI-2.5-FLASH-IMG</span>
                </div>
                <div className="flex justify-between">
                  <span>RESOLUTION</span>
                  <span>1024x1024 (SQ)</span>
                </div>
                <div className="flex justify-between">
                  <span>RENDER TIME</span>
                  <span>~2.4s</span>
                </div>
              </div>
           </div>
        </div>

        {/* Viewport */}
        <div className="lg:col-span-8 bg-black border border-zinc-800 rounded-lg relative flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black">
           {generatedImage ? (
             <div className="relative w-full h-full flex items-center justify-center group">
               <img src={generatedImage} alt="Generated Design" className="max-h-full max-w-full object-contain shadow-2xl shadow-emerald-900/20" />
               <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-zinc-900 text-white rounded border border-zinc-700 hover:bg-zinc-800">
                    <Download size={18} />
                  </button>
                  <button className="p-2 bg-zinc-900 text-white rounded border border-zinc-700 hover:bg-zinc-800">
                    <Share2 size={18} />
                  </button>
               </div>
             </div>
           ) : (
             <div className="text-center">
                <div className="w-20 h-20 border border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <div className="absolute inset-0 border-t-2 border-zinc-800 rounded-full animate-spin"></div>
                  <Sparkles className="text-zinc-700" />
                </div>
                <p className="text-zinc-600 font-mono text-sm">AWAITING GENERATION PARAMETERS</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default ConceptStudio;
