import React from "react";
import TryOnInteractive from "./components/TryOnInteractive";

// Versión ultra-simplificada sin providers, sin routing, sin nada extra.
// Si esto falla, el problema es TryOnInteractive.tsx
function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <TryOnInteractive />
    </div>
  );
}

export default App;
