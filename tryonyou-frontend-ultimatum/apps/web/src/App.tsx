import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Home, Ruler, Activity, CreditCard, ShieldCheck } from 'lucide-react';
import { AgentRouter } from '@tryonyou/agents';
import { BiometricScanner } from './components/BiometricScanner';

// Components
const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass-panel border-b border-[var(--gold)]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-[var(--gold)] font-bold text-xl tracking-widest">DIVINEO</Link>
        </div>
        <div className="flex space-x-8">
          <NavLink to="/" icon={<Home size={18} />} label="HOME" />
          <NavLink to="/fit" icon={<Ruler size={18} />} label="FIT" />
          <NavLink to="/cap" icon={<Activity size={18} />} label="CAP" />
          <NavLink to="/abvet" icon={<CreditCard size={18} />} label="ABVET" />
          <NavLink to="/claims" icon={<ShieldCheck size={18} />} label="CLAIMS" />
        </div>
      </div>
    </div>
  </nav>
);

const NavLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <Link to={to} className="flex items-center space-x-2 text-[var(--bone)] hover:text-[var(--gold)] transition-colors duration-300">
    {icon}
    <span className="text-xs tracking-widest font-medium">{label}</span>
  </Link>
);

const Footer = () => (
  <footer className="fixed bottom-0 w-full z-40 bg-[var(--anth)] border-t border-[var(--gold)] py-2">
    <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] text-[var(--bone)] opacity-60">
      <div>PATENT PCT/EP2025/067317</div>
      <div className="flex space-x-4">
        <span>© 2025 TRYONYOU</span>
        <a href="#" className="hover:text-[var(--gold)]">Small Entity Declaration</a>
      </div>
    </div>
  </footer>
);

const PauMascot = () => (
  <div className="fixed bottom-12 left-4 z-50 w-16 h-16 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
    <img src="/assets/branding/pau_tuxedo_full.png" alt="PAU" className="w-full h-full object-contain" />
  </div>
);

// Pages
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-24 px-8 min-h-screen flex flex-col items-center justify-center bg-[url('/assets/catalog/red_dress_minimal.png')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-[rgba(20,22,25,0.85)]">
      <h1 className="text-6xl font-light tracking-[0.2em] text-[var(--gold)] mb-4 text-center">DIVINEO V7</h1>
      <p className="text-[var(--bone)] text-xl font-light tracking-wide max-w-2xl text-center">
        The Emotional Fashion Intelligence Ecosystem.
      </p>
      <div className="mt-12 flex space-x-6">
        <button
          onClick={() => navigate('/scan')}
          className="px-8 py-3 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--anth)] transition-all duration-500 uppercase tracking-widest text-xs"
        >
          Initialize Pilot
        </button>
      </div>
    </div>
  );
};

const FitPage = () => {
  React.useEffect(() => {
    // Agent Interaction Stub
    AgentRouter.route('FIT_SCORE', { garmentId: '123', biometrics: {} })
      .then((score: any) => console.log('Fit Score:', score));
  }, []);

  return (
    <div className="pt-24 px-8 min-h-screen">
      <h2 className="text-3xl text-[var(--gold)] tracking-widest mb-8">FIT INTELLIGENCE</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 h-96 flex items-center justify-center">
          <p className="text-[var(--bone)]">3D Avatar Module (Agent 014)</p>
        </div>
        <div className="glass-panel p-8 h-96 flex items-center justify-center">
          <p className="text-[var(--bone)]">Physics Engine (Agent 015)</p>
        </div>
      </div>
    </div>
  );
};

const CAPPage = () => (
  <div className="pt-24 px-8 min-h-screen">
    <h2 className="text-3xl text-[var(--gold)] tracking-widest mb-8">AUTOMATED PRODUCTION</h2>
    <div className="glass-panel p-8">
      <p className="text-[var(--bone)]">Pattern Generation & Manufacturing Status</p>
    </div>
  </div>
);

const ABVETPage = () => (
  <div className="pt-24 px-8 min-h-screen">
    <h2 className="text-3xl text-[var(--gold)] tracking-widest mb-8">BIOMETRIC PAYMENT</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="glass-panel p-12 flex flex-col items-center cursor-pointer hover:bg-[rgba(197,164,109,0.1)] transition-colors">
        <span className="text-[var(--gold)] text-4xl mb-4">👁</span>
        <span className="tracking-widest">IRIS SCAN</span>
      </div>
      <div className="glass-panel p-12 flex flex-col items-center cursor-pointer hover:bg-[rgba(197,164,109,0.1)] transition-colors">
        <span className="text-[var(--gold)] text-4xl mb-4">🎤</span>
        <span className="tracking-widest">VOICE AUTH</span>
      </div>
    </div>
  </div>
);

const ClaimsPage = () => (
  <div className="pt-24 px-8 min-h-screen">
    <h2 className="text-3xl text-[var(--gold)] tracking-widest mb-8">PATENT CLAIMS</h2>
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="glass-panel p-4 flex justify-between items-center">
          <span>Claim {i}: System Core Logic</span>
          <span className="text-[var(--peacock)]">Verified</span>
        </div>
      ))}
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--anth)] text-[var(--bone)] selection:bg-[var(--gold)] selection:text-[var(--anth)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<BiometricScanner />} />
          <Route path="/fit" element={<FitPage />} />
          <Route path="/cap" element={<CAPPage />} />
          <Route path="/abvet" element={<ABVETPage />} />
          <Route path="/claims" element={<ClaimsPage />} />
        </Routes>
        <PauMascot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
