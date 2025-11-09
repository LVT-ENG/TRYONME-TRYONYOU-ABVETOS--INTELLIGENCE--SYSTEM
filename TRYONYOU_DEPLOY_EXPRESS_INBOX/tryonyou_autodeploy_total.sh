#!/usr/bin/env bash
# ===============================================================
# 💠 TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# 🔁 AUTO–DEPLOY TOTAL (One–Shot Persistent)
# ===============================================================
set -e

PROJECT_DIR="$HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX"
PROJECT_NAME="TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM"

echo "🧠 Iniciando $PROJECT_NAME"
echo "📁 Carpeta: $PROJECT_DIR"

# === 1️⃣ TOKEN VERCEL ===
if ! grep -q "VERCEL_TOKEN=" ~/.zshrc 2>/dev/null; then
  echo "⚙️ No hay token guardado en el sistema."
  read -p "👉 Pega tu token de Vercel (equipo LVT-ENG): " VERCEL_TOKEN
  echo "export VERCEL_TOKEN=$VERCEL_TOKEN" >> ~/.zshrc
  export VERCEL_TOKEN=$VERCEL_TOKEN
  echo "🔐 Token guardado en ~/.zshrc ✅"
else
  source ~/.zshrc
  echo "✅ Token cargado desde ~/.zshrc"
fi

# === 2️⃣ DEPENDENCIAS ===
echo "🧩 Verificando dependencias..."
command -v vercel >/dev/null 2>&1 || { echo "⚙️ Instalando Vercel CLI..."; npm i -g vercel; }
command -v jq >/dev/null 2>&1 || { echo "⚙️ Instalando jq..."; brew install jq || sudo apt install -y jq; }

# === 3️⃣ VERIFICAR TOKEN ===
echo "🔗 Verificando conexión con Vercel..."
if ! npx vercel whoami --token="$VERCEL_TOKEN" >/dev/null 2>&1; then
  echo "❌ Token inválido o no pertenece al equipo LVT-ENG."
  echo "🪄 Crea uno nuevo aquí: https://vercel.com/account/tokens"
  exit 1
else
  echo "✅ Token verificado correctamente."
fi

# === 4️⃣ BUILD ===
cd "$PROJECT_DIR" || { echo "❌ No se encontró carpeta $PROJECT_DIR"; exit 1; }
echo "⚙️ Instalando dependencias NPM..."
npm install --no-audit --progress=false
echo "🏗️ Compilando proyecto..."
npm run build

# === 5️⃣ DEPLOY ===
echo "🚀 Desplegando en Vercel..."
DEPLOY_OUTPUT=$(npx vercel deploy --prod --token="$VERCEL_TOKEN" --yes 2>&1 || true)
SITE_URL=$(echo "$DEPLOY_OUTPUT" | grep -Eo "https://[a-zA-Z0-9.-]*\.vercel\.app" | head -n1)
echo "🌍 Sitio desplegado: ${SITE_URL:-"(no detectado)"}"

# === 6️⃣ CLOUDFLARE (opcional) ===
if [[ -n "$CLOUDFLARE_API_TOKEN" && -n "$CLOUDFLARE_ZONE_ID" ]]; then
  echo "🌀 Purga de caché Cloudflare..."
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}' >/dev/null && echo "✅ Cache purgada."
fi

# === 7️⃣ TELEGRAM (opcional) ===
if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
  MSG="✅ *Deploy completado de $PROJECT_NAME*%0A🌍 $SITE_URL%0A🕒 $(date '+%Y-%m-%d %H:%M:%S')"
  curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
       -d chat_id="$TELEGRAM_CHAT_ID" -d text="$MSG" -d parse_mode="Markdown" >/dev/null
  echo "📨 Notificación enviada a Telegram."
fi

# === 8️⃣ ABRIR SITIO ===
if [[ "$SITE_URL" != "(no detectado)" ]]; then
  echo "🌐 Abriendo sitio en navegador..."
  open "$SITE_URL" || xdg-open "$SITE_URL" || true
fi

echo "✅ DEPLOY COMPLETO DE $PROJECT_NAME"
echo "✨ Sistema TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM listo."


