import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          TRYONYOU
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
          <Link to="/demo" className="text-white/70 hover:text-white transition-colors">Demo</Link>
        </div>
      </div>
    </nav>
    
    <main className="pt-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Virtual Try-On
          </span>
        </h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
          Experience the future of fashion with AI-powered virtual fitting technology.
        </p>
        <Link 
          to="/demo" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Try Demo
        </Link>
      </div>
    </main>
    
    <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-white/40 text-sm">
      TRYONYOU Pilot v1.0
    </footer>
  </div>
)

const Demo = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          TRYONYOU
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
          <Link to="/demo" className="text-blue-400 font-semibold">Demo</Link>
        </div>
      </div>
    </nav>
    
    <main className="pt-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Virtual Try-On Demo
          </span>
        </h1>
        <p className="text-lg text-white/70 mb-8">
          Pilot entry point - Ready for production
        </p>
        
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
            <div className="text-4xl text-white/30">Avatar</div>
          </div>
          <p className="text-white/60 text-sm">
            Virtual fitting technology placeholder
          </p>
        </div>
        
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-white/10 rounded-lg text-white/70 hover:bg-white/20 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
