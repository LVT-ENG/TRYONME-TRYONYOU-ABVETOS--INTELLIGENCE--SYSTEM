import React, { useEffect } from 'react';
import { useWardrobe } from '../hooks/useWardrobe';
import { seedWardrobeData } from '../data/wardrobeSeed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Heart, Activity, Clock, Shirt } from 'lucide-react';

export default function SmartWardrobeDashboard() {
  const { garments, summary, events, recordUsage, updateFitStatus } = useWardrobe();

  useEffect(() => {
    seedWardrobeData();
  }, []);

  if (!summary) return <div>Loading Intelligence...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#D4AF37] mb-2">Intelligent Wardrobe</h1>
            <p className="text-gray-400">AI-Powered Inventory & Usage Analytics</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold">{summary.totalGarments}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Total Items</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-500">{summary.emotionalWellbeingScore}/100</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Wardrobe Health</div>
            </div>
          </div>
        </header>

        {/* Intelligence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#D4AF37]" /> Most Worn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-white truncate">{summary.mostWorn?.name || 'N/A'}</div>
              <div className="text-xs text-gray-500">{summary.mostWorn?.usageCount || 0} uses</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" /> Underused Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{summary.underusedCount}</div>
              <div className="text-xs text-gray-500">Not worn in 30+ days</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Fit Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{summary.fitIssuesCount}</div>
              <div className="text-xs text-gray-500">Items marked tight/loose</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" /> Emotional Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{summary.emotionalWellbeingScore}</div>
              <div className="text-xs text-gray-500">Avg. item satisfaction</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#333] mb-6">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="events">Live Event Log</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {garments.map(garment => (
                <Card key={garment.id} className="bg-[#1a1a1a] border-[#333] overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
                  <div className="h-48 bg-[#111] relative">
                    {garment.imageUrl ? (
                      <img src={garment.imageUrl} alt={garment.name} className="w-full h-full object-contain p-4" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">
                        <Shirt className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant={garment.fitStatus === 'fits' ? 'default' : 'destructive'}>
                        {garment.fitStatus}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-white">{garment.name}</h3>
                        <p className="text-xs text-gray-400 capitalize">{garment.category} • Size {garment.size}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#D4AF37]">{garment.usageCount} uses</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1 border-[#333] hover:bg-[#333] text-xs"
                        onClick={() => recordUsage(garment.id)}>
                        Wear Today
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-[#333] hover:bg-[#333] text-xs"
                        onClick={() => updateFitStatus(garment.id, garment.fitStatus === 'fits' ? 'tight' : 'fits')}>
                        Toggle Fit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">System Event Stream</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                  {events.length === 0 && <div className="text-gray-500 text-center py-8">No events recorded yet. Interact with the wardrobe to generate events.</div>}
                  {events.map((event, idx) => (
                    <div key={idx} className="flex gap-4 items-start border-b border-[#333] pb-3 last:border-0">
                      <div className="min-w-[140px] text-xs text-gray-500 font-mono pt-1">
                        {event.timestamp.toLocaleTimeString()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-[#D4AF37] border-[#D4AF37]/30">
                            {event.type}
                          </Badge>
                        </div>
                        <pre className="text-xs text-gray-400 bg-[#111] p-2 rounded border border-[#333] overflow-x-auto">
                          {JSON.stringify(event.payload, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
