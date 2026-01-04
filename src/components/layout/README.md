# Premium Header Usage Example

Import the Header component in your App.jsx or any page:

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout';
// ... other imports

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0A0A0A] to-[#1A1A2E]">
        {/* Replace Navbar with Premium Header */}
        <Header />
        
        {/* Your routes */}
        <Routes>
          {/* ... your routes */}
        </Routes>
        
        {/* Footer */}
      </div>
    </Router>
  );
}

export default App;
