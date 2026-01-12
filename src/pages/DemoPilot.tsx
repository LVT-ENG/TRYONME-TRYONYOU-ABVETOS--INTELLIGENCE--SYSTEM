
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { Scan, MessageSquare, Shirt, User, Mic, MicOff, Zap, ChevronRight, BarChart3, RefreshCw, Box as BoxIcon, Activity } from 'lucide-react';
// Added Product to the imports from types
import { BiometricData, PilotStep, RecommendationResult, Product } from '../types';
import { inventory } from '../data/inventoryDatabase';
import { Button } from './Button';
import { calculateBestFit, generateFittingLogic, processAudioCommand } from '../services/geminiService';
import { useApiKey } from '../hooks/useApiKey';
import { Language, translations } from '../data/i18n';

// Fix: Added the missing DemoPilotProps interface to satisfy the component's signature
interface DemoPilotProps {
  onAddToCart: (product: Product) => void;
  lang: Language;
}

// Fix: Added local JSX declaration for model-viewer to ensure it is recognized as a valid HTML element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export default function DemoPilot({ onAddToCart, lang }: DemoPilotProps) {
  const [step, setStep] = useState<PilotStep>('BODY_SCAN');
  const [biometrics, setBiometrics] = useState<BiometricData | null>(null);
  const [userInput, setUserInput] = useState({ 
    weight: '70', 
    occasion: 'work' as any, 
    fitPreference: 'regular' as any 
  });
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const { validateApiKey } = useApiKey();
  const t = translations[lang];

  useEffect(() => {
    if (step === 'BODY_SCAN') startCamera();
    else stopCamera();
  }, [step]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
    }
  };

  const simulateScan = () => {
    setIsProcessing(true);
    setLogs([
      "> [HANDSHAKE] CORE_INITIATED", 
      "> [ANALYSIS] VERTEX_DISTRIBUTION_MAP", 
      "> [VALIDATION] BIOMETRIC_INTEGRITY_99.8%",
      "> [PATENT] ID: PCT/EP2025/067317_RECOGNIZED"
    ]);
    
    setTimeout(() => {
      const simulated: BiometricData = {
        height: 175,
        shoulders: 45.0,
        chest: 98,
        waist: 82.0,
        hips: 95.0,
        armLength: 62.0,
        legLength: 85.0,
        torsoLength: 50.0
      };
      setBiometrics(simulated);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('INPUTS');
      }, 1000);
    }, 2500);
  };

  const toggleVoiceRecording = async () => {
    if (isListening) stopRecording();
    else await startRecording();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => { if (event.data.size > 0) audioChunksRef.current.push(event.data); };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          await handleVoiceProcessing(base64Audio);
        };
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.start();
      setIsListening(true);
      setLogs(prev => [...prev, "> [AUDIO] CAPTURING_PREFERENCES..."]);
    } catch (err) {
      setLogs(prev => [...prev, "> [ERROR] MIC_ACCESS_DENIED"]);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const handleVoiceProcessing = async (base64Audio: string) => {
    setIsProcessing(true);
    try {
      const voiceResult = await processAudioCommand(base64Audio, 'audio/webm');
      if (voiceResult.occasion) setUserInput(prev => ({ ...prev, occasion: voiceResult.occasion }));
      if (voiceResult.fitPreference) setUserInput(prev => ({ ...prev, fitPreference: voiceResult.fitPreference }));
      setLogs(prev => [...prev, "> [NEURAL] PREFERENCES_PARSED"]);
    } catch (e) {
      setLogs(prev => [...prev, "> [ERROR] PARSING_FAILED"]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessFitting = async () => {
    if (!biometrics) return;
    if (!(await validateApiKey())) return;
    setIsProcessing(true);
    const bestFit = calculateBestFit(biometrics, inventory, userInput.fitPreference, userInput.occasion);
    try {
      const explanation = await generateFittingLogic(biometrics, bestFit.product, bestFit.size, lang);
      setResult({ ...bestFit, logicExplanation: explanation });
      setStep('RESULT');
    } catch (e) {
      setResult(bestFit);
      setStep('RESULT');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-black flex flex-col lg:flex-row overflow-hidden relative font-sans text-white animate-fade-in">
      <div className="flex-1 relative bg-zinc-950 flex items-center justify-center overflow-hidden border-r border-white/5">
        {step === 'BODY_SCAN' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100 opacity-60 grayscale" />
            <div className="absolute inset-0 calibration-grid opacity-20 pointer-events-none" />
            <div className="absolute inset-x-0 h-[1px] bg-brand-gold animate-scan-line shadow-[0_0_20px_rgba(197,164,109,0.5)] z-20" />
            <div className="absolute bottom-12 flex flex-col items-center gap-6">
              <button onClick={simulateScan} disabled={isProcessing} className="w-24 h-24 rounded-full border border-brand-gold/20 flex items-center justify-center bg-brand-gold/5 backdrop-blur-xl hover:bg-brand-gold/20 transition-all active:scale-95 shadow-2xl group">
                <div className="w-20 h-20 bg-brand-gold rounded flex items-center justify-center group-hover:scale-95 transition-transform">
                  <Scan className="text-black" size={32} />
                </div>
              </button>
              <p className="text-[10px] font-black uppercase tracking-[0.8em] text-brand-gold/60">Iniciar Captura Biométrica</p>
            </div>
          </div>
        )}

        {(step === 'INPUTS' || step === 'PROCESSING') && biometrics && (
          <div className="w-full max-w-2xl p-16 animate-fade-in grid md:grid-cols-2 gap-16 glass border border-white/5 shadow-2xl">
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-white/10 pb-8">
                <BarChart3 className="text-brand-gold" size={24} />
                <h3 className="text-3xl font-black uppercase tracking-tighter">Diagnóstico Detallado</h3>
              </div>
              <div className="grid grid-cols-2 gap-y-12 gap-x-10 font-mono">
                {Object.entries(biometrics).map(([key, val]) => (
                  <div key={key} className="space-y-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{key}</p>
                    <p className="text-3xl font-black text-white tracking-tighter">{val}<span className="text-[10px] ml-1 text-brand-gold font-bold">CM</span></p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-white/5 pl-16 opacity-30">
               <User size={200} strokeWidth={0.5} className="text-brand-gold" />
               <p className="text-[10px] font-mono mt-10 uppercase tracking-[0.5em] font-bold">Anatomía Digital 3D: Activa</p>
            </div>
          </div>
        )}

        {step === 'RESULT' && result && (
          <div className="w-full h-full flex items-center justify-center p-12 bg-black animate-fade-in relative">
            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center">
              <div className="aspect-[3/4] bg-zinc-900 border border-white/10 rounded-[4rem] relative overflow-hidden group shadow-2xl bg-zinc-950/50">
                <model-viewer src="https://modelviewer.dev/shared-assets/models/RobotExpressive.glb" auto-rotate camera-controls style={{ width: '100%', height: '100%' }} shadow-intensity="2" exposure="0.8" environment-image="neutral" />
                <div className="absolute top-10 left-10 glass px-6 py-2 text-[10px] font-black uppercase tracking-widest border border-white/10 text-white shadow-2xl">Digital Twin Map</div>
              </div>
              
              <div className="space-y-12">
                <div>
                  <h2 className="text-[11px] font-black text-brand-gold uppercase tracking-[0.6em] mb-4 italic">Algoritmo Determinístico de Ajuste</h2>
                  <h3 className="text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-white">AJUSTE IDEAL.</h3>
                  <div className="grid grid-cols-2 gap-6 mt-12">
                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                      <p className="opacity-40 text-[10px] font-bold uppercase mb-1">Pecho</p>
                      <p className="text-4xl font-black italic">{biometrics?.chest}cm</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                      <p className="opacity-40 text-[10px] font-bold uppercase mb-1">Match Score</p>
                      <p className="text-4xl font-black italic">{Math.max(0, Math.round(result.matchScore))}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brand-gold p-12 rounded-[4rem] text-black relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Zap size={140} fill="currentColor" strokeWidth={0}/></div>
                  <p className="font-black text-sm opacity-60 uppercase mb-2 tracking-widest">{result.product.name}</p>
                  <p className="text-7xl font-black italic uppercase tracking-tighter">Talla {result.size}</p>
                  <p className="mt-6 font-bold text-xs leading-relaxed uppercase tracking-wider">{result.logicExplanation}</p>
                </div>

                <div className="flex gap-6">
                  <Button size="lg" className="flex-1 h-24 bg-white text-black font-black uppercase tracking-[0.3em] rounded-[2.5rem]" onClick={() => onAddToCart(result.product)}>Reservar Prenda</Button>
                  <Button variant="outline" className="w-24 h-24 border-white/10 flex items-center justify-center p-0 rounded-[2.5rem]" onClick={() => setStep('BODY_SCAN')}><RefreshCw size={28} className="text-zinc-500" /></Button>
                </div>
              </div>
            </div>
            <div className="absolute top-12 right-12 text-right opacity-20 hidden lg:block font-mono text-[9px] uppercase tracking-[0.4em]">
              <p>Valuation: 120M-400M EUR</p>
              <p>Patent: PCT/EP2025/067317</p>
            </div>
          </div>
        )}
      </div>

      {/* Concierge Panel */}
      <div className="w-full lg:w-[550px] bg-black p-12 flex flex-col border-l border-white/5 z-20 overflow-y-auto custom-scrollbar">
        <div className="mb-16">
           <h1 className="text-brand-gold font-black italic text-4xl tracking-tighter">TRYONYOU</h1>
           <div className="flex items-center gap-3 mt-4 opacity-70">
             <div className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
             <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-gold font-black">Piloto de Sistema v2.0 Activo</span>
           </div>
        </div>

        <div className="flex-1 space-y-16">
          <div className="flex gap-8 items-start">
             <div className="w-14 h-14 rounded border border-white/10 flex items-center justify-center flex-shrink-0 bg-zinc-950 relative overflow-hidden">
                <MessageSquare className="text-brand-gold" size={24} />
                {isListening && <div className="absolute inset-0 bg-brand-gold/20 flex items-center justify-center animate-pulse"><Mic className="text-white" size={20}/></div>}
             </div>
             <div className="flex-1">
                <p className="text-xl font-medium leading-relaxed text-zinc-300 italic">
                  {step === 'BODY_SCAN' && "Paso 1: Calibrando sensores ópticos. Por favor, posiciónate frente a la cámara."}
                  {step === 'INPUTS' && "Paso 2: Perfil biométrico verificado. Especifica el contexto de uso para el cálculo de tensión."}
                  {step === 'RESULT' && "Paso 3: Análisis completo. Se ha aplicado lógica determinística para tu selección."}
                </p>
             </div>
          </div>

          {step === 'INPUTS' && (
            <div className="space-y-12 animate-fade-in">
               <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.5em]">Contexto de Uso</label>
                    <button onClick={toggleVoiceRecording} className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 transition-all ${isListening ? 'bg-brand-gold text-black animate-pulse' : 'bg-zinc-900 text-zinc-500 hover:text-white border border-white/10'}`}>
                       {isListening ? <MicOff size={16} /> : <Mic size={16} />} {isListening ? 'Parar' : 'Comando de Voz'}
                    </button>
                  </div>
                  <div className="p-10 glass border border-brand-gold/10 space-y-8">
                     <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-xs text-zinc-500 uppercase font-black">Control de Peso</span>
                        <input type="number" value={userInput.weight} onChange={e => setUserInput(p => ({...p, weight: e.target.value}))} className="bg-transparent text-right text-2xl font-black font-mono w-24 outline-none text-brand-gold" />
                     </div>
                     <div className="space-y-4">
                        <p className="text-[10px] font-black text-zinc-500 uppercase">Perfil de Ocasión</p>
                        <div className="grid grid-cols-2 gap-4">
                           {(['work', 'event', 'casual', 'ceremony'] as const).map(o => (
                              <button key={o} onClick={() => setUserInput(p => ({...p, occasion: o}))} className={`px-4 py-4 text-[11px] font-black uppercase border transition-all ${userInput.occasion === o ? 'bg-brand-gold text-black border-brand-gold shadow-[0_0_20px_rgba(197,164,109,0.2)]' : 'border-white/5 text-zinc-600 hover:text-white'}`}>{o}</button>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
               <Button className="w-full h-24 bg-brand-gold text-black font-black uppercase text-lg shadow-2xl transition-all" onClick={handleProcessFitting} isLoading={isProcessing}>
                  Ejecutar Motor de Ajuste
               </Button>
            </div>
          )}
        </div>

        <div className="mt-auto pt-16 border-t border-white/5">
           <div className="h-32 overflow-y-auto font-mono text-[9px] text-zinc-700 space-y-2 custom-scrollbar pr-4">
              {logs.map((log, i) => <div key={i} className="animate-fade-in">{log}</div>)}
              {isProcessing && <div className="animate-pulse text-brand-gold/40">> CALCULANDO_FISICA_TEXTIL_PHASE_4...</div>}
           </div>
        </div>
      </div>
    </div>
  );
}
