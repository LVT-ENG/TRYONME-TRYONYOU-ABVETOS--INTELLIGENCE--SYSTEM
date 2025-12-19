import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Pilot = () => (
  <div className="min-h-screen bg-black text-white overflow-hidden">
    {/* Background Image with Overlay */}
    <div 
      className="fixed inset-0 bg-cover bg-center"
      style={{ 
        backgroundImage: 'url(/images/fitting-room.jpg)',
        filter: 'brightness(0.3)'
      }}
    />
    
    {/* Content */}
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-light tracking-widest">
            <span className="font-bold">TRY</span>ON<span className="font-bold">YOU</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm tracking-wider text-white/60">
            <span>VIRTUAL FITTING</span>
            <span>TECHNOLOGY</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-8 leading-tight">
            The Future of
            <br />
            <span className="font-semibold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Fashion Fitting
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Experience how clothes fit your body before you buy.
            <br className="hidden md:block" />
            Precision technology meets personal style.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-4xl font-light text-amber-300 mb-3">98%</div>
              <div className="text-sm text-white/60 tracking-wider">FIT ACCURACY</div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-4xl font-light text-amber-300 mb-3">-70%</div>
              <div className="text-sm text-white/60 tracking-wider">RETURNS REDUCED</div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-4xl font-light text-amber-300 mb-3">3 sec</div>
              <div className="text-sm text-white/60 tracking-wider">INSTANT PREVIEW</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-10 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold rounded-full hover:opacity-90 transition-all transform hover:scale-105 tracking-wider">
              REQUEST A DEMO
            </button>
            <button className="px-10 py-4 border border-white/30 text-white font-light rounded-full hover:bg-white/10 transition-all tracking-wider">
              LEARN MORE
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="py-8 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-8 text-xs text-white/40 tracking-wider">
            <span>FOR RETAILERS</span>
            <span>FOR BRANDS</span>
            <span>TECHNOLOGY</span>
          </div>
          <div className="text-xs text-white/40 tracking-wider">
            TRYONYOU VIRTUAL FITTING TECHNOLOGY
          </div>
        </div>
      </footer>
    </div>

    {/* Decorative Elements */}
    <div className="fixed top-1/2 left-8 -translate-y-1/2 hidden lg:block">
      <div className="w-px h-32 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent" />
    </div>
    <div className="fixed top-1/2 right-8 -translate-y-1/2 hidden lg:block">
      <div className="w-px h-32 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent" />
    </div>
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pilot />} />
        <Route path="/pilot" element={<Pilot />} />
        <Route path="*" element={<Pilot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
