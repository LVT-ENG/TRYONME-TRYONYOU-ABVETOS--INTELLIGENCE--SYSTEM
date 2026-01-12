
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import DemoPilot from './components/DemoPilot';
import Studio from './components/Studio';
import { Product } from './types';
import { useApiKey } from './hooks/useApiKey';
import ApiKeyDialog from './components/ApiKeyDialog';
import { Language } from './data/i18n';

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [view, setView] = useState<'landing' | 'mirror' | 'studio'>('landing');
  const [lang, setLang] = useState<Language>('en');
  
  const { showApiKeyDialog, handleApiKeyDialogContinue } = useApiKey();

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar 
        cartCount={cart.length} 
        currentModule={view === 'studio' ? 'studio' : 'mirror'} 
        onModuleChange={(m) => setView(m)}
        lang={lang}
        setLang={setLang}
      />
      
      <main className="relative">
        {view === 'landing' && <Landing onStart={() => setView('mirror')} lang={lang} />}
        {view === 'mirror' && <DemoPilot onAddToCart={handleAddToCart} lang={lang} />}
        {view === 'studio' && <Studio />}
      </main>

      {/* Global API Key Dialog */}
      {showApiKeyDialog && (
        <ApiKeyDialog onContinue={handleApiKeyDialogContinue} />
      )}
    </div>
  );
}
