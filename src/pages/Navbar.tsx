
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ShoppingBag, Shirt, Globe } from 'lucide-react';
import { Language, translations } from '../data/i18n';

interface NavbarProps {
  cartCount: number;
  currentModule: 'studio' | 'mirror';
  onModuleChange: (m: 'studio' | 'mirror') => void;
  lang: Language;
  setLang: (l: Language) => void;
}

export default function Navbar({ cartCount, currentModule, onModuleChange, lang, setLang }: NavbarProps) {
  const t = translations[lang].nav;

  return (
    <nav className="h-20 border-b border-white/5 bg-black/80 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-[100]">
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onModuleChange('mirror')}>
        <div className="w-11 h-11 bg-white rounded flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
            <Shirt className="text-black w-6 h-6" strokeWidth={2} />
        </div>
        <div className="flex flex-col justify-center">
            <span className="font-black text-2xl leading-none tracking-tighter uppercase text-white">{t.brand}</span>
            <span className="text-[9px] text-zinc-500 font-bold tracking-[0.4em] uppercase mt-0.5">{t.tagline}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-12">
        {/* Language Controller */}
        <div className="flex items-center gap-4 px-4 py-2 bg-white/5 rounded-none border border-white/10">
          <Globe size={14} className="text-zinc-500" />
          <div className="flex gap-4">
            {(['en', 'fr'] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-[10px] font-black uppercase tracking-widest transition-all ${lang === l ? 'text-white border-b border-indigo-500 pb-0.5' : 'text-zinc-600 hover:text-zinc-300'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="relative p-2 text-zinc-400 hover:text-white cursor-pointer transition-all group">
            <ShoppingBag size={24} strokeWidth={1.5} className="group-hover:text-indigo-400 transition-colors"/>
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-lg border-2 border-black">
                    {cartCount}
                </span>
            )}
        </div>
      </div>
    </nav>
  );
}
