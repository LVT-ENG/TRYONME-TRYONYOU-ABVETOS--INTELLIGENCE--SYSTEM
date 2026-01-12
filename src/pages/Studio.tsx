/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { Box, Layers, Wand2, Download, Image as ImageIcon, Trash2, Plus, Sparkles, X, Maximize, Shirt, Check, ZoomIn, ZoomOut, Move, RotateCcw, Eye, Share2, Save, FolderOpen, History, Droplet, Waves, BoxSelect } from 'lucide-react';
import { Button } from './Button';
import { FileUploader } from './FileUploader';
import { generateMockup, generateAsset } from '../services/geminiService';
import { Asset, GeneratedMockup, PlacedLayer, LoadingState, SavedLayout } from '../types';
import { useApiKey } from '../hooks/useApiKey';
import { inventory } from '../data/inventoryDatabase';

// --- Constants ---
const PRODUCT_COLORS = [
  { name: 'White', value: '#FFFFFF', tailwind: 'bg-white', filter: 'none' },
  { name: 'Black', value: '#18181B', tailwind: 'bg-zinc-900', filter: 'brightness(0.2) contrast(1.2)' },
  { name: 'Navy', value: '#1E3A8A', tailwind: 'bg-blue-900', filter: 'sepia(1) hue-rotate(200deg) brightness(0.4) saturate(1.5)' },
  { name: 'Heather', value: '#71717A', tailwind: 'bg-zinc-500', filter: 'grayscale(1) brightness(0.8) contrast(1.1)' },
  { name: 'Forest', value: '#14532D', tailwind: 'bg-green-900', filter: 'sepia(1) hue-rotate(80deg) brightness(0.4) saturate(1.5)' },
];

const MATERIAL_OPTIONS = [
  { name: 'Cotton', icon: <Droplet size={14} />, description: 'Breathable matte finish, natural fiber' },
  { name: 'Silk', icon: <Waves size={14} />, description: 'High luster, fluid drape, luxurious sheen' },
  { name: 'Leather', icon: <BoxSelect size={14} />, description: 'Structured grain, subtle reflective highlights' },
  { name: 'Wool', icon: <Layers size={14} />, description: 'Soft texture, rich depth, insulating weave' },
  { name: 'Linen', icon: <Move size={14} />, description: 'Crisp hand-feel, distinct organic slub texture' },
];

const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

const AssetSection = ({ 
  title, 
  icon, 
  type, 
  assets, 
  onAdd, 
  onRemove,
  validateApiKey
}: { 
  title: string, 
  icon: React.ReactNode, 
  type: 'logo' | 'product', 
  assets: Asset[], 
  onAdd: (a: Asset) => void, 
  onRemove: (id: string) => void,
  validateApiKey: () => Promise<boolean>
}) => {
  const [mode, setMode] = useState<'upload' | 'generate'>('upload');
  const [genPrompt, setGenPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!genPrompt) return;
    if (!(await validateApiKey())) return;

    setIsGenerating(true);
    try {
      const b64 = await generateAsset(genPrompt, type);
      onAdd({
        id: Math.random().toString(36).substring(7),
        type,
        name: `AI Generated ${type}`,
        data: b64,
        mimeType: 'image/png'
      });
      setGenPrompt('');
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl h-full flex flex-col border border-white/5">
      <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">{icon} {title}</h2>
          <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400 border border-zinc-700">{assets.length} items</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
          {assets.map(asset => (
            <div key={asset.id} className="relative group aspect-square bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-indigo-500/50 transition-colors">
                <img src={asset.data} className="w-full h-full object-contain p-2" alt={asset.name} />
                <button onClick={() => onRemove(asset.id)} className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={12} />
                </button>
            </div>
          ))}
          {assets.length === 0 && (
            <div className="col-span-2 sm:col-span-3 flex flex-col items-center justify-center h-32 text-zinc-500 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
              <p className="text-sm">Library Empty</p>
            </div>
          )}
      </div>

      <div className="mt-auto pt-4 border-t border-zinc-800">
        <div className="flex gap-4 mb-4">
           <button onClick={() => setMode('upload')} className={`text-sm font-medium pb-1 border-b-2 transition-colors ${mode === 'upload' ? 'border-indigo-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}>Upload</button>
           <button onClick={() => setMode('generate')} className={`text-sm font-medium pb-1 border-b-2 transition-colors ${mode === 'generate' ? 'border-indigo-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}>AI Gen</button>
        </div>

        {mode === 'upload' ? (
           <FileUploader label={`Upload ${type}`} onFileSelect={(f) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                onAdd({
                  id: Math.random().toString(36).substring(7),
                  type,
                  name: f.name,
                  data: e.target?.result as string,
                  mimeType: f.type
                });
              };
              reader.readAsDataURL(f);
           }} />
        ) : (
           <div className="space-y-3">
              <textarea 
                value={genPrompt}
                onChange={(e) => setGenPrompt(e.target.value)}
                placeholder={`Describe the ${type}...`}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-indigo-500 resize-none h-20 placeholder:text-zinc-600 focus:outline-none"
              />
              <Button onClick={handleGenerate} isLoading={isGenerating} disabled={!genPrompt} className="w-full" size="sm" icon={<Sparkles size={14} />}>Generate</Button>
           </div>
        )}
      </div>
    </div>
  );
};

export default function Studio() {
  const [activeTab, setActiveTab] = useState<'assets' | 'design' | 'gallery'>('design');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [generatedMockups, setGeneratedMockups] = useState<GeneratedMockup[]>([]);
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>([]);
  const [previewMockup, setPreviewMockup] = useState<GeneratedMockup | null>(null);
  
  // Design State
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(PRODUCT_COLORS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [placedLogos, setPlacedLogos] = useState<PlacedLayer[]>([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState<LoadingState>({ isGenerating: false, message: '' });
  
  // View/Canvas Transform State
  const [viewTransform, setViewTransform] = useState({ scale: 1, x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Interaction State
  const [draggedItem, setDraggedItem] = useState<{ uid: string, startX: number, startY: number, initX: number, initY: number } | null>(null);
  const [panning, setPanning] = useState<{ startX: number, startY: number, initX: number, initY: number } | null>(null);

  const { validateApiKey } = useApiKey();

  // Load Inventory as Assets
  useEffect(() => {
    const mappedAssets: Asset[] = inventory.map((item) => ({
      id: item.id,
      type: 'product',
      name: item.name,
      data: item.image,
      mimeType: 'image/jpeg'
    }));
    setAssets(mappedAssets);
    if (mappedAssets.length > 0) setSelectedProductId(mappedAssets[0].id);

    // Load saved layouts from local storage
    const stored = localStorage.getItem('tryonyou_saved_layouts');
    if (stored) {
      try {
        setSavedLayouts(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load saved layouts", e);
      }
    }
  }, []);

  // Persist layouts
  useEffect(() => {
    localStorage.setItem('tryonyou_saved_layouts', JSON.stringify(savedLayouts));
  }, [savedLayouts]);

  // --- Handlers ---

  const addLogoToCanvas = (assetId: string) => {
    const newLayer: PlacedLayer = {
      uid: Math.random().toString(36).substr(2, 9),
      assetId,
      x: 50,
      y: 40,
      scale: 1,
      rotation: 0
    };
    setPlacedLogos(prev => [...prev, newLayer]);
  };

  const removeLogoFromCanvas = (uid: string, e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setPlacedLogos(prev => prev.filter(l => l.uid !== uid));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!viewportRef.current) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.5, Math.min(3, viewTransform.scale * delta));
    setViewTransform(prev => ({ ...prev, scale: newScale }));
  };

  const handleZoomIn = () => setViewTransform(prev => ({ ...prev, scale: Math.min(3, prev.scale * 1.2) }));
  const handleZoomOut = () => setViewTransform(prev => ({ ...prev, scale: Math.max(0.5, prev.scale / 1.2) }));
  const handleResetView = () => setViewTransform({ scale: 1, x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (draggedItem && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const deltaX = (clientX - draggedItem.startX) / (rect.width) * 100;
        const deltaY = (clientY - draggedItem.startY) / (rect.height) * 100;

        setPlacedLogos(prev => prev.map(l => {
          if (l.uid !== draggedItem.uid) return l;
          return {
            ...l,
            x: Math.max(0, Math.min(100, draggedItem.initX + deltaX)),
            y: Math.max(0, Math.min(100, draggedItem.initY + deltaY))
          };
        }));
      }

      if (panning) {
        const deltaX = clientX - panning.startX;
        const deltaY = clientY - panning.startY;
        setViewTransform(prev => ({
          ...prev,
          x: panning.initX + deltaX,
          y: panning.initY + deltaY
        }));
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => {
      setDraggedItem(null);
      setPanning(null);
    };

    if (draggedItem || panning) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [draggedItem, panning]);

  const handleSaveLayout = () => {
    if (!selectedProductId) return;
    const name = window.prompt("Enter a name for this design configuration:", `Design ${savedLayouts.length + 1}`);
    if (!name) return;

    const newLayout: SavedLayout = {
      id: Math.random().toString(36).substring(7),
      name,
      productId: selectedProductId,
      colorName: selectedColor.name,
      size: selectedSize,
      layers: [...placedLogos],
      createdAt: Date.now()
    };
    setSavedLayouts(prev => [newLayout, ...prev]);
    alert("Design configuration saved successfully.");
  };

  const loadSavedLayout = (layout: SavedLayout) => {
    setSelectedProductId(layout.productId);
    const color = PRODUCT_COLORS.find(c => c.name === layout.colorName);
    if (color) setSelectedColor(color);
    setSelectedSize(layout.size);
    setPlacedLogos([...layout.layers]);
    setActiveTab('design');
    handleResetView();
  };

  const removeSavedLayout = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this design configuration?")) {
      setSavedLayouts(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleGenerateMockup = async () => {
    if (!selectedProductId || placedLogos.length === 0) return;
    if (!(await validateApiKey())) return;

    const product = assets.find(a => a.id === selectedProductId);
    if (!product) return;

    const layers = placedLogos.map(layer => {
        const asset = assets.find(a => a.id === layer.assetId);
        return asset ? { asset, placement: layer } : null;
    }).filter(Boolean) as { asset: Asset, placement: PlacedLayer }[];

    setLoading({ isGenerating: true, message: 'Simulating textile physics...' });
    try {
      const variantInstruction = `Material texture: ${selectedMaterial.name} (${selectedMaterial.description}). Base color: ${selectedColor.name}. Final garment size context: ${selectedSize}.`;
      const combinedPrompt = `${variantInstruction} ${prompt}. High-resolution, photorealistic mockup where logos seamlessly integrate into fabric texture with accurate depth and shading.`;
      
      const resultImage = await generateMockup(product, layers, combinedPrompt);
      const newMockup: GeneratedMockup = {
        id: Math.random().toString(36).substring(7),
        imageUrl: resultImage,
        prompt,
        createdAt: Date.now(),
        layers: [...placedLogos],
        productId: selectedProductId,
        variant: {
          color: selectedColor.name,
          size: selectedSize
        }
      };
      setGeneratedMockups(prev => [newMockup, ...prev]);
      setPreviewMockup(newMockup);
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    } finally {
      setLoading({ isGenerating: false, message: '' });
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-black overflow-hidden relative">
        <div className="w-full md:w-20 bg-zinc-900 border-r border-zinc-800 flex md:flex-col items-center py-4 gap-4 px-4 md:px-0 z-30">
            <button onClick={() => setActiveTab('assets')} title="Asset Vault" className={`p-3 rounded-xl transition-all ${activeTab === 'assets' ? 'bg-indigo-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
                <Box size={24} />
            </button>
            <button onClick={() => setActiveTab('design')} title="Creator Studio" className={`p-3 rounded-xl transition-all ${activeTab === 'design' ? 'bg-indigo-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
                <Wand2 size={24} />
            </button>
            <button onClick={() => setActiveTab('gallery')} title="Render Archive" className={`p-3 rounded-xl transition-all ${activeTab === 'gallery' ? 'bg-indigo-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
                <ImageIcon size={24} />
            </button>
        </div>

        <div className="flex-1 overflow-hidden relative bg-black">
            {activeTab === 'assets' && (
                <div className="h-full p-6 overflow-y-auto animate-fade-in">
                    <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">Asset Vault</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-8rem)]">
                        <AssetSection 
                            title="Product Bases" icon={<Shirt size={20}/>} type="product"
                            assets={assets.filter(a => a.type === 'product')}
                            onAdd={a => setAssets(p => [...p, a])}
                            onRemove={id => setAssets(p => p.filter(x => x.id !== id))}
                            validateApiKey={validateApiKey}
                        />
                        <AssetSection 
                            title="Visual Assets" icon={<Layers size={20}/>} type="logo"
                            assets={assets.filter(a => a.type === 'logo')}
                            onAdd={a => setAssets(p => [...p, a])}
                            onRemove={id => setAssets(p => p.filter(x => x.id !== id))}
                            validateApiKey={validateApiKey}
                        />
                    </div>
                </div>
            )}

            {activeTab === 'design' && (
                <div className="h-full flex flex-col md:flex-row animate-fade-in relative">
                    <div className="w-full md:w-80 bg-zinc-950/80 backdrop-blur-xl p-6 border-r border-white/5 overflow-y-auto flex flex-col gap-8 z-20 custom-scrollbar">
                         <div className="space-y-6">
                            <div>
                                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">01. Canvas</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {assets.filter(a => a.type === 'product').map(a => (
                                        <div key={a.id} onClick={() => setSelectedProductId(a.id)} className={`aspect-square rounded-lg border-2 cursor-pointer p-1 transition-all ${selectedProductId === a.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-zinc-800 bg-zinc-900'}`}>
                                            <img src={a.data} className="w-full h-full object-contain" alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedProductId && (
                                <div className="space-y-6 animate-fade-in">
                                    <div>
                                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">02. Color</h3>
                                        <div className="flex flex-wrap gap-2.5">
                                            {PRODUCT_COLORS.map(color => (
                                                <button key={color.name} onClick={() => setSelectedColor(color)} className={`w-9 h-9 rounded-xl border-2 transition-all flex items-center justify-center ${selectedColor.name === color.name ? 'border-indigo-500 scale-110 shadow-lg' : 'border-white/5'}`}>
                                                    <div className={`w-6 h-6 rounded-lg ${color.tailwind} border border-white/10 flex items-center justify-center`}>
                                                        {selectedColor.name === color.name && <Check size={12} className={color.name === 'White' ? 'text-black' : 'text-white'} />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">03. Material</h3>
                                        <div className="grid grid-cols-1 gap-2">
                                            {MATERIAL_OPTIONS.map(mat => (
                                                <button 
                                                  key={mat.name} 
                                                  onClick={() => setSelectedMaterial(mat)} 
                                                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${selectedMaterial.name === mat.name ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-zinc-300'}`}
                                                >
                                                    <span className={`${selectedMaterial.name === mat.name ? 'text-white' : 'text-zinc-600'}`}>{mat.icon}</span>
                                                    <div className="text-left">
                                                      <p className="text-[10px] font-black uppercase tracking-widest">{mat.name}</p>
                                                    </div>
                                                    {selectedMaterial.name === mat.name && <Check size={14} className="ml-auto" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">04. Dimensions</h3>
                                        <div className="grid grid-cols-3 gap-1.5">
                                            {PRODUCT_SIZES.map(size => (
                                                <button key={size} onClick={() => setSelectedSize(size)} className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${selectedSize === size ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}>
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">05. Visual Layers</h3>
                                        <div className="grid grid-cols-4 gap-2">
                                            {/* Fix: changed map callback from 'a' to 'asset' to correctly match 'asset.data' below */}
                                            {assets.filter(a => a.type === 'logo').map(asset => (
                                                <div key={asset.id} onClick={() => addLogoToCanvas(asset.id)} className="aspect-square rounded-lg border border-zinc-800 bg-zinc-900 cursor-pointer hover:border-indigo-500/50 p-1.5 transition-all">
                                                    <img src={asset.data} className="w-full h-full object-contain" alt="" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                         </div>

                         <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
                            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Neural variations... (e.g. vintage wash)" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-xs text-white h-24 focus:ring-1 focus:ring-indigo-500 focus:outline-none placeholder:text-zinc-700 resize-none" />
                            <div className="flex gap-2">
                                <Button onClick={handleSaveLayout} disabled={!selectedProductId || placedLogos.length === 0} variant="secondary" className="flex-1 h-12 rounded-xl text-xs font-black uppercase tracking-widest border border-white/10" icon={<Save size={16}/>}>
                                    Save
                                </Button>
                                <Button onClick={handleGenerateMockup} disabled={!selectedProductId || placedLogos.length === 0} isLoading={loading.isGenerating} className="flex-[2] h-12 rounded-xl text-xs font-black uppercase tracking-widest" icon={<Sparkles size={16}/>}>
                                    Generate Fit
                                </Button>
                            </div>
                         </div>
                    </div>

                    <div ref={viewportRef} onWheel={handleWheel} className="flex-1 bg-zinc-950 flex items-center justify-center relative overflow-hidden p-8 select-none" onMouseDown={(e) => { if (e.target === viewportRef.current) setPanning({ startX: e.clientX, startY: e.clientY, initX: viewTransform.x, initY: viewTransform.y }); }}>
                        <div className="absolute top-8 left-8 z-40 flex items-center gap-4">
                            <div className="glass flex items-center gap-1 p-1 rounded-2xl border border-white/10 shadow-2xl">
                                <button onClick={handleZoomIn} className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white"><ZoomIn size={18}/></button>
                                <div className="w-16 text-center text-[10px] font-black font-mono text-zinc-400">{Math.round(viewTransform.scale * 100)}%</div>
                                <button onClick={handleZoomOut} className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white"><ZoomOut size={18}/></button>
                                <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
                                <button onClick={handleResetView} className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white"><RotateCcw size={18}/></button>
                            </div>
                        </div>

                        {loading.isGenerating && (
                            <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center flex-col animate-fade-in">
                                <div className="relative mb-8">
                                    <div className="w-20 h-20 border-[3px] border-indigo-500/20 rounded-full animate-spin"></div>
                                    <div className="w-20 h-20 border-[3px] border-t-indigo-500 rounded-full animate-spin absolute inset-0 [animation-duration:0.6s]"></div>
                                    <div className="absolute inset-0 flex items-center justify-center"><Wand2 className="w-8 h-8 text-indigo-400 animate-pulse" /></div>
                                </div>
                                <p className="text-white font-black text-sm tracking-[0.3em] uppercase mb-2">Neural Engine Processing</p>
                                <p className="text-indigo-400 font-mono text-[10px] tracking-widest animate-pulse uppercase">{loading.message}</p>
                            </div>
                        )}
                        
                        {selectedProductId ? (
                            <div ref={canvasRef} className="relative w-full max-w-lg aspect-square bg-zinc-900/40 rounded-3xl" style={{ transform: `translate(${viewTransform.x}px, ${viewTransform.y}px) scale(${viewTransform.scale})`, transition: 'transform 0.1s ease-out' }}>
                                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                                  <img src={assets.find(a => a.id === selectedProductId)?.data} className="w-full h-full object-contain pointer-events-none transition-all duration-1000" style={{ filter: selectedColor.filter }} alt="" />
                                  <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1.5 opacity-40">
                                      <span className="text-[10px] font-black text-white uppercase bg-black/50 px-2 py-0.5 rounded">{selectedSize}</span>
                                      <span className="text-[10px] font-black text-white uppercase bg-black/50 px-2 py-0.5 rounded">{selectedColor.name}</span>
                                      <span className="text-[10px] font-black text-white uppercase bg-black/50 px-2 py-0.5 rounded">{selectedMaterial.name}</span>
                                  </div>
                                </div>

                                {placedLogos.map(layer => {
                                    const asset = assets.find(a => a.id === layer.assetId);
                                    if (!asset) return null;
                                    return (
                                        <div key={layer.uid} className="absolute w-[22%] aspect-square cursor-move group z-10" style={{ left: `${layer.x}%`, top: `${layer.y}%`, transform: `translate(-50%, -50%) scale(${layer.scale})` }} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setDraggedItem({ uid: layer.uid, startX: e.clientX, startY: e.clientY, initX: layer.x, initY: layer.y }); }}>
                                            <div className="absolute -inset-3 border-2 border-transparent group-hover:border-indigo-500/50 rounded-xl transition-all shadow-xl" />
                                            <button onClick={(e) => removeLogoFromCanvas(layer.uid, e)} className="absolute -top-6 -right-6 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-xl z-20"><X size={14}/></button>
                                            <img src={asset.data} className="w-full h-full object-contain pointer-events-none drop-shadow-2xl" alt=""/>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="text-zinc-600 flex flex-col items-center animate-pulse">
                                <Shirt size={48} className="opacity-20 mb-6"/>
                                <p className="text-zinc-500 font-black uppercase tracking-widest text-xs">Waiting for Base Integration</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'gallery' && (
                <div className="h-full p-8 overflow-y-auto animate-fade-in bg-zinc-950 custom-scrollbar">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Studio Archive</h2>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase"><History size={16}/> {generatedMockups.length} Renders</span>
                            <span className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase"><FolderOpen size={16}/> {savedLayouts.length} Configs</span>
                        </div>
                    </div>

                    <div className="space-y-16">
                        {/* Saved Layouts (Configurations) */}
                        {savedLayouts.length > 0 && (
                            <section>
                                <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8">Saved Design Configurations</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {savedLayouts.map(layout => (
                                        <div key={layout.id} onClick={() => loadSavedLayout(layout)} className="group bg-zinc-900 border border-white/5 rounded-2xl p-6 hover:border-indigo-500/50 transition-all cursor-pointer relative">
                                            <button onClick={(e) => removeSavedLayout(layout.id, e)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                                    <Box className="text-indigo-400" size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-white uppercase tracking-tight truncate w-32">{layout.name}</h4>
                                                    <p className="text-[10px] text-zinc-500 font-mono">{new Date(layout.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                                                    <span>Base:</span>
                                                    <span className="text-zinc-300 truncate w-24 text-right">{assets.find(a => a.id === layout.productId)?.name}</span>
                                                </div>
                                                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                                                    <span>Layers:</span>
                                                    <span className="text-zinc-300">{layout.layers.length}</span>
                                                </div>
                                                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                                                    <span>Variant:</span>
                                                    <span className="text-zinc-300">{layout.colorName} / {layout.size}</span>
                                                </div>
                                            </div>
                                            <Button variant="ghost" className="w-full mt-6 h-10 text-[9px] font-black uppercase tracking-widest bg-white/5 group-hover:bg-indigo-600 group-hover:text-white" icon={<FolderOpen size={14}/>}>
                                                Load Design
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Generated Mockups (Renders) */}
                        <section>
                            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8">Neural Render Archive</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {generatedMockups.map(m => (
                                    <div key={m.id} onClick={() => setPreviewMockup(m)} className="group bg-zinc-900/50 rounded-3xl overflow-hidden relative border border-white/5 hover:border-indigo-500/50 transition-all cursor-pointer">
                                        <div className="aspect-square relative overflow-hidden">
                                            <img src={m.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center"><Eye size={20} /></button>
                                                <a href={m.imageUrl} download={`mockup-${m.id}.png`} onClick={(e) => e.stopPropagation()} className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center"><Download size={20} /></a>
                                            </div>
                                        </div>
                                        <div className="p-5 flex justify-between items-center bg-zinc-900/80">
                                            <div>
                                                <p className="text-[10px] font-bold text-zinc-500 uppercase">{new Date(m.createdAt).toLocaleDateString()}</p>
                                                <p className="text-xs font-bold text-white mt-1 uppercase truncate w-32">{m.prompt || 'Render'}</p>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: PRODUCT_COLORS.find(c => c.name === m.variant?.color)?.value }} />
                                                <span className="text-[9px] font-black text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded">{m.variant?.size}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>

        {previewMockup && (
            <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8 animate-fade-in">
                <button onClick={() => setPreviewMockup(null)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10"><X size={24} /></button>
                <div className="flex flex-col lg:flex-row gap-12 max-w-7xl w-full">
                    <div className="flex-1 aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-zinc-900">
                        <img src={previewMockup.imageUrl} className="w-full h-full object-contain" alt="" />
                    </div>
                    <div className="w-full lg:w-96 flex flex-col justify-center">
                        <h2 className="text-5xl font-black text-white tracking-tighter leading-none mb-10 uppercase">Neural Fit<br/>Complete</h2>
                        <div className="space-y-8 mb-12">
                            <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Variant Profile</span>
                                <span className="text-xs font-black text-white uppercase">{previewMockup.variant?.color} / {previewMockup.variant?.size}</span>
                            </div>
                            {previewMockup.layers && (
                                <Button variant="secondary" className="w-full border border-white/10 h-12 text-[10px] font-black uppercase tracking-widest" icon={<FolderOpen size={16}/>} onClick={() => {
                                    loadSavedLayout({
                                        id: 'temp',
                                        name: 'Temp',
                                        productId: previewMockup.productId || '',
                                        colorName: previewMockup.variant?.color || '',
                                        size: previewMockup.variant?.size || '',
                                        layers: previewMockup.layers || [],
                                        createdAt: Date.now()
                                    });
                                    setPreviewMockup(null);
                                }}>
                                    Load Design Configuration
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <Button className="flex-1 h-14 rounded-2xl bg-white text-black hover:bg-zinc-200" icon={<Download size={20}/>} onClick={() => { const link = document.createElement('a'); link.href = previewMockup.imageUrl; link.download = `mockup-${previewMockup.id}.png`; link.click(); }}>Download</Button>
                            <Button variant="outline" className="w-14 h-14 rounded-2xl flex items-center justify-center p-0" icon={<Share2 size={20}/>} />
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}