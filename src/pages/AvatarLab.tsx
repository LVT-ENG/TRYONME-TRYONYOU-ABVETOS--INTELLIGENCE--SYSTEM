import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import ParametricAvatar from '../components/ParametricAvatar';
import { FitPhysicsEngine, FitResult } from '../lib/FitPhysicsEngine';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

// Mock Garment Database
const GARMENTS = [
  { id: 'g1', name: 'Slim Fit Shirt (M)', dimensions: { chest: 100, waist: 90, hips: 100, shoulders: 45, elasticity: 0.1 } },
  { id: 'g2', name: 'Loose Hoodie (L)', dimensions: { chest: 115, waist: 110, hips: 115, shoulders: 50, elasticity: 0.4 } },
  { id: 'g3', name: 'Skinny Jeans (32)', dimensions: { chest: 0, waist: 82, hips: 95, shoulders: 0, elasticity: 0.2 } }, // Pants only care about waist/hips
];

export default function AvatarLab() {
  // User Measurements State (Default: Average Male)
  const [measurements, setMeasurements] = useState({
    height: 175,
    shoulders: 45,
    chest: 102,
    waist: 85,
    hips: 100,
    inseam: 80,
  });

  const [selectedGarmentId, setSelectedGarmentId] = useState<string>('g1');
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Calculate Fit
  const fitResult: FitResult = useMemo(() => {
    const garment = GARMENTS.find(g => g.id === selectedGarmentId);
    if (!garment) return { score: 0, zones: { chest: 1, waist: 1, hips: 1, shoulders: 1 }, status: 'perfect', recommendation: '' };
    
    return FitPhysicsEngine.calculateFit(measurements, garment.dimensions);
  }, [measurements, selectedGarmentId]);

  const handleMeasurementChange = (key: keyof typeof measurements, value: number) => {
    setMeasurements(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Left Panel: Controls */}
      <div className="w-1/4 p-6 bg-gray-800 overflow-y-auto border-r border-gray-700 z-10">
        <h2 className="text-2xl font-bold mb-6 text-gold-500">Avatar Lab</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">Body Measurements</h3>
            {Object.entries(measurements).map(([key, val]) => (
              <div key={key} className="mb-4">
                <div className="flex justify-between mb-1">
                  <label className="capitalize text-sm text-gray-300">{key}</label>
                  <span className="text-sm font-mono text-gold-400">{val} cm</span>
                </div>
                <Slider 
                  value={[val]} 
                  min={key === 'height' ? 150 : 30} 
                  max={key === 'height' ? 210 : 150} 
                  step={1}
                  onValueChange={(v) => handleMeasurementChange(key as any, v[0])}
                />
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">Virtual Try-On</h3>
            <div className="grid grid-cols-1 gap-2">
              {GARMENTS.map(g => (
                <Button 
                  key={g.id}
                  variant={selectedGarmentId === g.id ? "default" : "outline"}
                  onClick={() => setSelectedGarmentId(g.id)}
                  className="w-full justify-start"
                >
                  {g.name}
                </Button>
              ))}
            </div>
          </section>

          <section>
             <div className="flex items-center space-x-2 mt-4">
                <input 
                  type="checkbox" 
                  id="heatmap" 
                  checked={showHeatmap} 
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-700 text-gold-500 focus:ring-gold-500"
                />
                <label htmlFor="heatmap" className="text-sm">Show Tension Heatmap</label>
             </div>
          </section>
        </div>
      </div>

      {/* Center: 3D Viewport */}
      <div className="flex-1 relative bg-gradient-to-b from-gray-800 to-gray-900">
        <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Environment preset="city" />
          
          <ParametricAvatar 
            measurements={measurements} 
            fitMap={fitResult.zones}
            showHeatmap={showHeatmap}
          />
          
          <ContactShadows resolution={1024} scale={10} blur={1} opacity={0.5} far={1} color="#000000" />
          <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} enablePan={false} target={[0, 1, 0]} />
        </Canvas>

        {/* Overlay: Fit Analysis */}
        <div className="absolute top-6 right-6 w-80">
          <Card className="bg-black/80 backdrop-blur border-gold-500/30 p-4 text-white">
            <h3 className="text-xl font-bold mb-2 text-gold-400">Fit Analysis</h3>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Overall Score</span>
              <span className={`text-2xl font-bold ${fitResult.score > 80 ? 'text-green-400' : fitResult.score > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {fitResult.score}/100
              </span>
            </div>

            <div className="mb-4 p-3 bg-white/5 rounded border border-white/10">
              <p className="text-sm font-medium text-gray-200">Recommendation:</p>
              <p className="text-sm text-gray-400 italic">"{fitResult.recommendation}"</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Chest Tension</span>
                <span className={fitResult.zones.chest > 1.05 ? 'text-red-400' : 'text-green-400'}>
                  {Math.round(fitResult.zones.chest * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Waist Tension</span>
                <span className={fitResult.zones.waist > 1.05 ? 'text-red-400' : 'text-green-400'}>
                  {Math.round(fitResult.zones.waist * 100)}%
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
