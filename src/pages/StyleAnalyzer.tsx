import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, X, RefreshCw, ScanLine } from 'lucide-react';
import { analyzeFashionImage, fileToGenerativePart } from '../services/geminiService';

const StyleAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Camera Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsCameraOpen(false);
    }
  };

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Data = await fileToGenerativePart(file);
        setImage(`data:${file.type};base64,${base64Data}`);
      } catch (e) {
        console.error("Upload failed", e);
      }
    }
  };

  const runAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      // Strip header for API
      const base64 = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];
      const result = await analyzeFashionImage(base64, mimeType);
      setAnalysis(result);
    } catch (error) {
      setAnalysis("Error analyzing image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setAnalysis(null);
    stopCamera();
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">VISUAL SCANNER</h2>
        <p className="text-zinc-400 font-mono text-sm">UPLOAD OR CAPTURE OUTFIT FOR DEEP LEARNING ANALYSIS</p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
        {/* Left: Input Area */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col relative">
           
           {!image && !isCameraOpen && (
             <div className="flex-1 flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-800 m-4 rounded-lg hover:border-emerald-500/50 transition-colors">
                <div className="flex space-x-4">
                  <button 
                    onClick={startCamera}
                    className="flex flex-col items-center justify-center p-6 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all w-32 h-32 group"
                  >
                    <Camera className="w-8 h-8 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono text-zinc-300">ACTIVATE CAM</span>
                  </button>
                  <label className="flex flex-col items-center justify-center p-6 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all w-32 h-32 cursor-pointer group">
                    <Upload className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono text-zinc-300">UPLOAD DATA</span>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                  </label>
                </div>
             </div>
           )}

           {isCameraOpen && (
             <div className="flex-1 relative bg-black flex flex-col">
               <video ref={videoRef} autoPlay playsInline className="flex-1 object-cover w-full h-full" />
               <canvas ref={canvasRef} className="hidden" />
               <div className="absolute bottom-6 left-0 w-full flex justify-center space-x-4">
                  <button onClick={capturePhoto} className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/20 backdrop-blur">
                    <div className="w-12 h-12 bg-white rounded-full"></div>
                  </button>
                  <button onClick={stopCamera} className="absolute right-6 top-[calc(100%-4rem)] p-3 bg-red-500/80 rounded-full text-white">
                    <X size={20} />
                  </button>
               </div>
             </div>
           )}

           {image && (
             <div className="flex-1 relative bg-black flex items-center justify-center">
                <img src={image} alt="Analysis Target" className="max-w-full max-h-[500px] object-contain" />
                {!isAnalyzing && !analysis && (
                  <div className="absolute bottom-6 flex space-x-4">
                     <button onClick={reset} className="px-6 py-2 bg-zinc-800 text-white font-mono text-sm rounded hover:bg-zinc-700 flex items-center">
                        <RefreshCw size={16} className="mr-2" /> RETRY
                     </button>
                     <button onClick={runAnalysis} className="px-6 py-2 bg-emerald-600 text-white font-mono text-sm rounded hover:bg-emerald-500 flex items-center shadow-lg shadow-emerald-900/50">
                        <ScanLine size={16} className="mr-2" /> INITIATE SCAN
                     </button>
                  </div>
                )}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                     <div className="text-emerald-500 font-mono animate-pulse text-lg">
                       PROCESSING VISUAL DATA...
                     </div>
                  </div>
                )}
             </div>
           )}
        </div>

        {/* Right: Output Area */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800">
            <h3 className="text-zinc-400 font-mono text-xs uppercase tracking-widest">Diagnostic Report</h3>
            {analysis && <span className="text-emerald-500 text-xs font-mono">COMPLETE</span>}
          </div>
          
          {analysis ? (
             <div className="prose prose-invert prose-sm max-w-none font-mono">
               <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300 leading-relaxed">
                 {analysis}
               </pre>
             </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 space-y-4">
              <ScanLine size={48} className="opacity-20" />
              <p className="font-mono text-xs text-center">WAITING FOR INPUT STREAM...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StyleAnalyzer;
