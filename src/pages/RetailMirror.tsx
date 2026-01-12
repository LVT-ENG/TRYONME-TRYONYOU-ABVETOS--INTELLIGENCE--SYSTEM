
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useRef, useState, useEffect } from 'react';
import { RefreshCw, Wand2, ShoppingBag, Check, Scan, Ruler, Box as BoxIcon, Activity } from 'lucide-react';
// Fix: Import Product from types instead of inventoryDatabase
import { Product } from '../types';
import { Button } from './Button';
import { generateRealtimeComposite } from '../services/geminiService';
import { useApiKey } from '../hooks/useApiKey';

interface RetailMirrorProps {
    inventory: Product[];
    onAddToCart: (product: Product) => void;
}

export default function RetailMirror({ inventory, onAddToCart }: RetailMirrorProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const consoleRef = useRef<HTMLDivElement>(null);
    
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [generatedTryOn, setGeneratedTryOn] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [calibrationMode, setCalibrationMode] = useState(false);
    const [procStep, setProcStep] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    
    const { validateApiKey } = useApiKey();

    const processingSteps = [
        "Analyzing camera feed...",
        "Identifying garment anchor points...",
        "Simulating fabric physics...",
        "Compositing high-res textures...",
        "Finalizing lighting match..."
    ];

    const systemLogs = [
        "> [SYSTEM] INITIATING HANDSHAKE...",
        "> EXECUTING PROTOCOL: JIT_PHASE_2_VERIFICATION",
        "> DETECTED STRESS VECTOR: DELTOID_ARC [92% LOAD]", 
        "> WARNING: COMPRESSION DETECTED AT ACROMION",
        "> APPLYING ALTERATION: ALT-99 (2mm expansion)",
        "> RECALCULATING LOAD: 92% --> 45%",
        "> SIMULATION: OPTIMAL MOBILITY CONFIRMED",
        "> STATUS: FIT CALIBRATED",
        "> COMMAND: SEND_TO_CUTTER [TOKEN: TX-9821]"
    ];

    useEffect(() => {
        if (isProcessing) {
            const stepInterval = setInterval(() => {
                setProcStep(s => (s + 1) % processingSteps.length);
            }, 1800);

            // Animate console logs
            let currentLogIndex = 0;
            const logInterval = setInterval(() => {
                if (currentLogIndex < systemLogs.length) {
                    setLogs(prev => [...prev, systemLogs[currentLogIndex]]);
                    currentLogIndex++;
                    if (consoleRef.current) {
                        consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
                    }
                }
            }, 800);

            return () => {
                clearInterval(stepInterval);
                clearInterval(logInterval);
            };
        } else {
            setLogs([]);
            setProcStep(0);
        }
    }, [isProcessing]);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraActive(true);
            }
        } catch (err) {
            console.error("Camera access denied", err);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            setIsCameraActive(false);
        }
    };

    const captureFrame = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                const dataUrl = canvas.toDataURL('image/png');
                setCapturedImage(dataUrl);
                setCalibrationMode(false);
            }
        }
    };

    const handleTryOn = async () => {
        if (!selectedProduct || !capturedImage) return;
        if (!(await validateApiKey())) return;

        setIsProcessing(true);
        try {
            const prompt = `Overlay a ${selectedProduct.name} (${selectedProduct.description}) onto the person. 
            The category is ${selectedProduct.category}. Ensure perfect fabric drape and realistic lighting integration.`;
            const result = await generateRealtimeComposite(capturedImage, prompt);
            setGeneratedTryOn(result);
        } catch (e) {
            console.error(e);
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setCapturedImage(null);
        setGeneratedTryOn(null);
        startCamera();
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden bg-black">
            {/* Left: Interactive Viewport */}
            <div className="relative flex-1 bg-zinc-950 flex items-center justify-center overflow-hidden border-r border-white/5">
                
                {/* --- CALIBRATION INTERFACE --- */}
                {calibrationMode && !capturedImage && (
                    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden animate-fade-in">
                        <div className="absolute inset-0 calibration-grid opacity-20"></div>
                        <div className="absolute inset-x-0 h-[2px] bg-cyan-500/30 animate-scan-line z-30"></div>
                        
                        {/* Header Stats */}
                        <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
                            <div className="glass px-4 py-2 rounded-lg border-l-4 border-cyan-500">
                                <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                                    <Activity className="animate-pulse" size={12} /> Live Biometric Scan
                                </p>
                                <p className="text-white text-xs font-bold mt-1">V_CALIBRATION: ACTIVE</p>
                            </div>
                            <div className="glass px-4 py-2 rounded-lg text-right">
                                <p className="text-zinc-500 font-mono text-[10px]">FPS: 60.0</p>
                                <p className="text-zinc-300 font-mono text-[10px]">LATENCY: 14ms</p>
                            </div>
                        </div>

                        {/* Silhouette Positioning Guide */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 scale-110 translate-y-4">
                            <svg viewBox="0 0 200 400" className="h-4/5 w-auto stroke-cyan-500 fill-none stroke-[1.5]" style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.5))' }}>
                                <path d="M100,20 C115,20 125,30 125,45 C125,55 120,60 120,65 C145,70 160,80 160,110 L160,160 C160,170 150,170 150,160 L145,120 C145,120 145,180 145,200 C155,250 155,320 150,380 L50,380 C45,320 45,250 55,200 C55,180 55,120 55,120 L50,160 C50,170 40,170 40,160 L40,110 C40,80 55,70 80,65 C80,60 75,55 75,45 C75,30 85,20 100,20 Z" strokeDasharray="6,4" />
                            </svg>
                        </div>

                        {/* Biometric Measurement Lines */}
                        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-64 border-t-2 border-dashed border-cyan-500/60 flex justify-between items-center px-1 animate-pulse">
                            <span className="text-[9px] text-cyan-400 bg-black/80 px-1 font-mono">SHOULDERS [44cm]</span>
                            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_cyan]"></div>
                            <span className="text-[9px] text-cyan-400 bg-black/80 px-1 font-mono">CONF: 98%</span>
                        </div>
                        
                        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 w-44 border-t-2 border-dashed border-indigo-500/60 flex justify-between items-center px-1 animate-pulse [animation-delay:0.3s]">
                            <span className="text-[9px] text-indigo-400 bg-black/80 px-1 font-mono">WAIST [32in]</span>
                            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_indigo]"></div>
                            <span className="text-[9px] text-indigo-400 bg-black/80 px-1 font-mono">LOCK</span>
                        </div>

                        <div className="absolute top-[58%] left-1/2 -translate-x-1/2 w-52 border-t-2 border-dashed border-purple-500/60 flex justify-between items-center px-1 animate-pulse [animation-delay:0.6s]">
                            <span className="text-[9px] text-purple-400 bg-black/80 px-1 font-mono">HIPS [38in]</span>
                            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_purple]"></div>
                            <span className="text-[9px] text-purple-400 bg-black/80 px-1 font-mono">MEASURE</span>
                        </div>

                        {/* A4 Reference Box */}
                        <div className="absolute bottom-[20%] left-[15%] w-32 h-44 border-2 border-green-500 bg-green-500/5 flex flex-col items-center justify-center rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                             <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400"></div>
                             <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400"></div>
                             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400"></div>
                             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
                             <BoxIcon size={20} className="text-green-500 mb-2 animate-bounce" />
                             <span className="text-[9px] font-bold font-mono text-green-400 bg-black/80 px-1">REF: A4_PAPER</span>
                             <span className="text-[8px] text-green-300 mt-1">SCALE_RATIO: 1.24</span>
                        </div>
                    </div>
                )}

                {/* --- Watermark --- */}
                <div className="absolute top-8 right-8 z-20 pointer-events-none opacity-40">
                    <div className="text-right">
                        <p className="text-white font-extrabold font-sans text-xl tracking-tighter">TRYONYOU</p>
                        <p className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase font-mono">Engine: Gemini-3-Pro</p>
                    </div>
                </div>

                {/* Mirror Stream */}
                <video 
                    ref={videoRef} 
                    autoPlay playsInline muted 
                    className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 transition-opacity duration-700 ${capturedImage ? 'opacity-0' : 'opacity-100'}`}
                />
                
                {/* Result Display */}
                {(capturedImage || generatedTryOn) && (
                    <img 
                        src={generatedTryOn || capturedImage || ''} 
                        className="absolute inset-0 w-full h-full object-cover animate-fade-in" 
                        alt="Mirror Preview"
                    />
                )}
                
                <canvas ref={canvasRef} className="hidden" />

                {/* Viewport UI Controls */}
                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6 z-40">
                    {!capturedImage ? (
                        <div className="flex items-center gap-6">
                            <Button 
                                variant={calibrationMode ? "primary" : "outline"}
                                onClick={() => setCalibrationMode(!calibrationMode)}
                                icon={calibrationMode ? <Ruler size={20}/> : <Scan size={20}/>}
                                className={`px-6 h-12 rounded-full border-2 transition-all ${calibrationMode ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'glass text-white'}`}
                            >
                                {calibrationMode ? "CALIBRATING..." : "BODY SCAN"}
                            </Button>

                            <button 
                                onClick={() => { captureFrame(); stopCamera(); }}
                                className="w-20 h-20 rounded-full border-4 border-white/50 flex items-center justify-center bg-white/5 backdrop-blur-xl hover:bg-white/20 transition-all active:scale-90 shadow-2xl"
                            >
                                <div className="w-14 h-14 bg-white rounded-full shadow-inner"></div>
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4 p-2 glass rounded-2xl">
                            <Button variant="outline" onClick={reset} icon={<RefreshCw size={18} />} className="rounded-xl">
                                DISCARD
                            </Button>
                            {selectedProduct && !generatedTryOn && (
                                <Button 
                                    variant="primary" 
                                    onClick={handleTryOn} 
                                    isLoading={isProcessing}
                                    icon={<Wand2 size={18} />}
                                    className="px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500"
                                >
                                    AI TRY ON
                                </Button>
                            )}
                            {generatedTryOn && (
                                <Button variant="primary" onClick={() => {}} icon={<Check size={18} />} className="px-8 rounded-xl bg-green-600 hover:bg-green-500 border-none">
                                    SAVE LOOK
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {/* Enhanced Processing Overlay */}
                {isProcessing && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center z-50 animate-fade-in px-6">
                        <div className="relative mb-8">
                             <div className="w-24 h-24 border-[3px] border-indigo-500/20 rounded-full animate-spin"></div>
                             <div className="w-24 h-24 border-[3px] border-t-indigo-400 rounded-full animate-spin absolute inset-0 [animation-duration:0.8s]"></div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <Wand2 className="w-10 h-10 text-indigo-400 animate-pulse" />
                             </div>
                        </div>
                        
                        <div className="text-center mb-8">
                            <h3 className="text-white text-2xl font-black tracking-tighter uppercase mb-2">Generating Fit</h3>
                            <p className="text-indigo-400 font-mono text-sm tracking-widest animate-pulse h-5">
                                {processingSteps[procStep]}
                            </p>
                        </div>

                        {/* Neural Console integrated here */}
                        <div 
                            ref={consoleRef}
                            className="w-full max-w-md bg-black/50 border border-zinc-800 rounded-lg p-4 h-32 overflow-y-auto font-mono text-[10px] space-y-1 custom-scrollbar"
                        >
                            {logs.map((log, i) => (
                                <div 
                                    key={i} 
                                    className={`animate-fade-in ${
                                        log.includes("WARNING") || log.includes("STRESS") ? "text-red-400" : 
                                        log.includes("COMMAND") || log.includes("CONFIRMED") ? "text-green-400" : "text-zinc-500"
                                    }`}
                                >
                                    {log}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500" style={{ width: '0%', animation: 'progress 10s linear forwards' }}></div>
                             <style>{`@keyframes progress { 0% { width: 0% } 100% { width: 100% } }`}</style>
                        </div>
                    </div>
                )}
            </div>

            {/* Right: Premium Inventory Rack */}
            <div className="w-full lg:w-96 bg-zinc-900/40 backdrop-blur-2xl flex flex-col h-full border-l border-white/5 shadow-2xl">
                <div className="p-8 border-b border-white/5">
                    <h2 className="text-2xl font-black text-white tracking-tighter">THE STUDIO</h2>
                    <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-widest">Select Base Layer</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {inventory.map(item => (
                        <div 
                            key={item.id}
                            onClick={() => setSelectedProduct(item)}
                            className={`group flex gap-5 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${selectedProduct?.id === item.id ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'bg-white/2 border-white/5 hover:border-white/20 hover:bg-white/5'}`}
                        >
                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-950 flex-shrink-0 relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                {selectedProduct?.id === item.id && (
                                    <div className="absolute inset-0 bg-indigo-500/20 backdrop-blur-[2px] flex items-center justify-center">
                                        <Check size={28} className="text-white drop-shadow-lg" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h3 className="font-bold text-white text-base leading-tight">{item.name}</h3>
                                <p className="text-xs text-zinc-500 mt-1 uppercase font-mono">{item.category}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-lg font-black text-indigo-400 font-sans tracking-tight">${item.price}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
                                        className="w-10 h-10 rounded-xl bg-white text-black hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center shadow-lg active:scale-95"
                                    >
                                        <ShoppingBag size={18} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
