#!/usr/bin/env bash
set -e

echo "=============================================="
echo " TRYONYOU – ONE SHOT LOCAL FIX (SAFE VERSION)"
echo "=============================================="

# -------- CONFIG --------
REQUIRED_NODE="18"
PROJECT_ROOT="$(pwd)"

# -------- CHECK NVM --------
if ! command -v nvm >/dev/null 2>&1; then
  echo "❌ nvm no está instalado."
  echo "Instálalo primero: https://github.com/nvm-sh/nvm"
  exit 1
fi

echo "✅ nvm detectado"

# -------- FORCE NODE 18 --------
echo "➡️ Forzando Node $REQUIRED_NODE"
nvm install $REQUIRED_NODE >/dev/null
nvm use $REQUIRED_NODE

NODE_VERSION=$(node -v)
echo "Node activo: $NODE_VERSION"

if [[ "$NODE_VERSION" != v18* ]]; then
  echo "❌ ERROR: Node 18 no está activo"
  exit 1
fi

# -------- CLEAN PROJECT --------
echo "➡️ Limpieza total del proyecto"
rm -rf node_modules package-lock.json dist .vite

# -------- ENSURE SRC --------
mkdir -p src/components

# -------- ENSURE MINIMAL APP --------
APP_FILE="src/App.jsx"

if [ ! -f "$APP_FILE" ]; then
  echo "➡️ Creando App.jsx mínimo (seguro)"
  cat > "$APP_FILE" << 'EOF'
import React from 'react';

function App() {
  return <div>TryOnYou – Build OK</div>;
}

export default App;
EOF
fi

# -------- ENSURE MAIN --------
MAIN_FILE="src/main.jsx"

if [ ! -f "$MAIN_FILE" ]; then
  echo "➡️ Creando main.jsx"
  cat > "$MAIN_FILE" << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF
fi

# -------- INSTALL DEPENDENCIES --------
echo "➡️ Instalando dependencias"
npm install

# -------- ENSURE ROUTER --------
if ! npm list react-router-dom >/dev/null 2>&1; then
  echo "➡️ Instalando react-router-dom"
  npm install react-router-dom
fi

# -------- BUILD --------
echo "➡️ Ejecutando build"
npm run build

echo ""
echo "=============================================="
echo "✅ FIX COMPLETADO CON ÉXITO"
echo ""
echo "Ahora puedes:"
echo "1) npm run dev"
echo "2) vercel --prod (si usas Vercel)"
echo ""
echo "IMPORTANTE:"
echo "- No pegues JSX en la terminal"
echo "- No pegues Python en la terminal"
echo "- JSX → archivos .jsx"
echo "- Python → archivos .py"
echo "=============================================="

