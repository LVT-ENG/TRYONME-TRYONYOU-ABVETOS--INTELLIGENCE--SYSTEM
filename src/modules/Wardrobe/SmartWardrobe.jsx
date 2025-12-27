/**
 * SmartWardrobe UI Component
 * Visual interface for Smart Wardrobe Module
 * Patent: PCT/EP2025/067317
 */

import { useState, useEffect } from 'react';
import { Shirt, TrendingUp, Heart, Package } from 'lucide-react';

export const SmartWardrobe = ({ visible = true, mode = 'production', userId = 'demo' }) => {
  const [stats, setStats] = useState({
    total_items: 0,
    most_worn: null,
    donated: 0,
    categories: {}
  });

  useEffect(() => {
    if (visible && mode === 'production') {
      // Simulación de carga de datos del wardrobe
      setStats({
        total_items: 24,
        most_worn: 'Lafayette Premium Shirt',
        donated: 3,
        categories: {
          shirts: 8,
          pants: 6,
          jackets: 4,
          accessories: 6
        }
      });
    }
  }, [visible, mode]);

  if (!visible) return null;

  return (
    <div className="smart-wardrobe-container bg-abvetos-anthracite/80 backdrop-blur-lg border border-abvetos-gold/20 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Shirt className="text-abvetos-gold" size={28} />
        <h2 className="text-2xl font-black tracking-tight text-abvetos-gold">
          Smart Wardrobe
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card bg-abvetos-anthracite/60 p-4 rounded-lg border border-abvetos-gold/10">
          <Package className="text-abvetos-gold mb-2" size={20} />
          <div className="text-3xl font-black text-abvetos-bone">{stats.total_items}</div>
          <div className="text-xs text-abvetos-steel">Prendas Totales</div>
        </div>

        <div className="stat-card bg-abvetos-anthracite/60 p-4 rounded-lg border border-abvetos-gold/10">
          <TrendingUp className="text-green-500 mb-2" size={20} />
          <div className="text-sm font-bold text-abvetos-bone truncate">{stats.most_worn || 'N/A'}</div>
          <div className="text-xs text-abvetos-steel">Más Usado</div>
        </div>

        <div className="stat-card bg-abvetos-anthracite/60 p-4 rounded-lg border border-abvetos-gold/10">
          <Heart className="text-red-500 mb-2" size={20} />
          <div className="text-3xl font-black text-abvetos-bone">{stats.donated}</div>
          <div className="text-xs text-abvetos-steel">Donados</div>
        </div>

        <div className="stat-card bg-abvetos-anthracite/60 p-4 rounded-lg border border-abvetos-gold/10">
          <Shirt className="text-abvetos-gold mb-2" size={20} />
          <div className="text-3xl font-black text-abvetos-bone">{stats.categories.shirts || 0}</div>
          <div className="text-xs text-abvetos-steel">Camisas</div>
        </div>
      </div>

      <div className="categories-breakdown bg-abvetos-anthracite/40 p-4 rounded-lg border border-abvetos-gold/10">
        <h3 className="text-sm font-bold text-abvetos-gold mb-3">Categorías</h3>
        <div className="space-y-2">
          {Object.entries(stats.categories).map(([category, count]) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-sm text-abvetos-steel capitalize">{category}</span>
              <span className="text-sm font-bold text-abvetos-bone">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-abvetos-steel/60 text-center font-mono">
        Patent: PCT/EP2025/067317 | Mode: {mode} | User: {userId}
      </div>
    </div>
  );
};

export default SmartWardrobe;
