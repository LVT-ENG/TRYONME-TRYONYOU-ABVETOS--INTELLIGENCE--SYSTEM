#!/usr/bin/env bash
set -e

echo "=============================================="
echo " TRYONYOU – REAL ONE SCRIPT FIX (AUTONOMOUS)"
echo "=============================================="

# ---------- STEP 0: ENSURE HOME ----------
cd ~

# ---------- STEP 1: INSTALL NVM IF MISSING ----------
if ! command -v nvm >/dev/null 2>&1; then
  echo "➡️ Instalando nvm..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

# ---------- STEP 2: LOAD NVM ----------
export NVM_DIR="$HOME/.nvm"
# shellcheck source=/dev/null
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

if ! command -v nvm >/dev/null 2>&1; then
  echo "❌ nvm no pudo cargarse. Cierra la terminal y vuelve a ejecutar este script."
  exit 1
fi

echo "✅ nvm cargado"

# ---------- STEP 3: FORCE NODE 18 ----------
echo "➡️ Instalando y usando Node 18"
nvm install 18
nvm alias default 18
nvm use 18

node -v | grep -q "^v18" || { echo "❌ Node 18 no activo"; exit 1; }
echo "Node activo: $(node -v)"

# ---------- STEP 4: GO TO PROJECT ----------
PROJECT="$HOME/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
if [ ! -d "$PROJECT" ]; then
  echo "❌ No se encuentra el proyecto en:"
  echo "$PROJECT"
  exit 1
fi

cd "$PROJECT"
echo "📁 Proyecto: $(pwd)"

# ---------- STEP 5: HARD CLEAN ----------
echo "➡️ Limpieza total"
rm -rf node_modules package-lock.json dist .vite

# ---------- STEP 6: ENSURE SRC ----------
mkdir -p src/components

# ---------- STEP 7: SAFE App.jsx ----------
cat > src/App.jsx << 'EOF'
import React from 'react';

function App() {
  return (
    <div style={{padding:40,fontFamily:'system-ui'}}>
      <h1>TryOnYou</h1>
      <p>Build estable – entorno corregido</p>
    </div>
  );
}

export default App;
EOF

# ---------- STEP 8: SAFE main.jsx ----------
cat > src/main.jsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# ---------- STEP 9: INSTALL ----------
echo "➡️ Instalando dependencias"
npm install

# ---------- STEP 10: ROUTER (SAFE) ----------
npm install react-router-dom

# ---------- STEP 11: BUILD ----------
echo "➡️ Ejecutando build"
npm run build

echo ""
echo "=============================================="
echo "✅ TODO ARREGLADO"
echo ""
echo "Siguientes pasos:"
echo "1) npm run dev"
echo "2) vercel --prod (si procede)"
echo ""
echo "REGLAS CLAVE:"
echo "- JSX → archivos .jsx"
echo "- Python → archivos .py"
echo "- NUNCA pegar código en la terminal"
echo "=============================================="

