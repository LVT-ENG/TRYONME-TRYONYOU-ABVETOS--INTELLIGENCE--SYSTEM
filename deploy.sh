#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Iniciando deploy blindado de TRYONYOU–ULTIMATUM..."

# 1. Variables de entorno
export VERCEL_TOKEN=xRUomdh7UR2USYHLYzhmRCKJ
export TELEGRAM_BOT_TOKEN=7052535931:AAFtrzzuTH2NGMxCZ1_RZ9vjnzKVW6bi-R4
export TELEGRAM_CHAT_ID=@abvet_deploy_bot

# 2. Regenerar package.json limpio
rm -f package.json package-lock.json
rm -rf node_modules

cat > package.json <<'JSON'
{
  "name": "tryonyou-ultimatum",
  "private": true,
  "scripts": {
    "dev": "vite --config apps/web/vite.config.ts",
    "build": "vite build --config apps/web/vite.config.ts",
    "preview": "vite preview --config apps/web/vite.config.ts"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^7.1.6",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.6.3"
  }
}
JSON

echo "📦 Instalando dependencias..."
npm install

# 3. Asegurar vite.config.ts
mkdir -p apps/web
cat > apps/web/vite.config.ts <<'TS'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname),
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../../dist'),
    emptyOutDir: true
  },
  server: { port: 5173 }
})
TS

# 4. Asegurar index.html básico
mkdir -p apps/web/src
cat > apps/web/index.html <<'HTML'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TRYONYOU – Ultimatum</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
HTML

# 5. Asegurar main.tsx
mkdir -p apps/web/src
cat > apps/web/src/main.tsx <<'TSX'
import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div>
      <h1>🚀 TRYONYOU – Ultimatum funcionando</h1>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('app')!).render(<App />)
TSX

# 6. Reescribir vercel.json limpio
cat > vercel.json <<'JSON'
{
  "routes": [
    { "src": "/(.*)", "dest": "/apps/web/$1" }
  ]
}
JSON

# 7. Build de producción
echo "⚙️ Ejecutando build..."
npm run build

# 8. Deploy en Vercel
echo "🌍 Desplegando en Vercel..."
DEPLOY_OUTPUT=$(npx vercel --prod --token "$VERCEL_TOKEN")
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -Eo 'https://[a-zA-Z0-9./_-]+\.vercel\.app' | tail -n1)

# 9. Notificación a Telegram
COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "sin-commit")
MESSAGE="✅ Deploy completado\nRepo: TRYONYOU–ULTIMATUM\nCommit: $COMMIT_HASH\nURL: $DEPLOY_URL"

if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELE

