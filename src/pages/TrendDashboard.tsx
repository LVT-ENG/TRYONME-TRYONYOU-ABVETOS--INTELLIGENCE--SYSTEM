import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendData } from '../types';

const data: TrendData[] = [
  { name: 'Jan', value: 4000, category: 'Streetwear' },
  { name: 'Feb', value: 3000, category: 'Techwear' },
  { name: 'Mar', value: 2000, category: 'Vintage' },
  { name: 'Apr', value: 2780, category: 'Cyberpunk' },
  { name: 'May', value: 1890, category: 'Minimalist' },
  { name: 'Jun', value: 2390, category: 'Y2K' },
  { name: 'Jul', value: 3490, category: 'Avant-Garde' },
];

const engagementData = [
  { name: 'Mon', active: 4000, passive: 2400 },
  { name: 'Tue', active: 3000, passive: 1398 },
  { name: 'Wed', active: 2000, passive: 9800 },
  { name: 'Thu', active: 2780, passive: 3908 },
  { name: 'Fri', active: 1890, passive: 4800 },
  { name: 'Sat', active: 2390, passive: 3800 },
  { name: 'Sun', active: 3490, passive: 4300 },
];

const TrendDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">GLOBAL TREND INTELLIGENCE</h2>
          <p className="text-zinc-400 font-mono text-sm">REAL-TIME FASHION METRICS MONITORING</p>
        </div>
        <div className="flex space-x-4">
           <div className="text-right">
             <div className="text-3xl font-mono text-white font-bold">87.4%</div>
             <div className="text-xs text-emerald-500 uppercase tracking-wider">Prediction Accuracy</div>
           </div>
           <div className="text-right">
             <div className="text-3xl font-mono text-white font-bold">14.2k</div>
             <div className="text-xs text-blue-500 uppercase tracking-wider">Styles Analyzed</div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Trend Graph */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-sm font-bold text-zinc-300 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 mr-2"></span>
            STYLE VELOCITY INDEX
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Graph */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg backdrop-blur-sm">
           <h3 className="text-sm font-bold text-zinc-300 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 mr-2"></span>
            USER ENGAGEMENT METRICS
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   cursor={{fill: '#27272a'}}
                   contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="active" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="passive" fill="#3f3f46" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
            <h4 className="text-zinc-400 text-xs font-mono mb-2">TOP MATERIAL</h4>
            <div className="text-xl font-bold text-white">Synthetics</div>
            <div className="w-full bg-zinc-800 h-1 mt-2">
              <div className="bg-emerald-500 h-1 w-[70%]"></div>
            </div>
         </div>
         <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
            <h4 className="text-zinc-400 text-xs font-mono mb-2">DOMINANT COLOR</h4>
            <div className="text-xl font-bold text-white">Neon Noir</div>
            <div className="w-full bg-zinc-800 h-1 mt-2">
              <div className="bg-purple-500 h-1 w-[45%]"></div>
            </div>
         </div>
         <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
            <h4 className="text-zinc-400 text-xs font-mono mb-2">SILHOUETTE</h4>
            <div className="text-xl font-bold text-white">Oversized</div>
            <div className="w-full bg-zinc-800 h-1 mt-2">
              <div className="bg-blue-500 h-1 w-[82%]"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TrendDashboard;
