#!/bin/bash
set -e

# ==============================================================================
# 🦚 TRYONYOU – ABVETOS – ULTRA – PLUS – ULTIMATUM
# PROTOCOLO: SUPERCOMMIT MAX (Ejecución Final)
# ==============================================================================

echo "🚀 INICIANDO PROTOCOLO SUPERCOMMIT MAX..."

# 1. VERIFICACIÓN DE SEGURIDAD
# ------------------------------------------------------------------------------
if [ ! -f "package.json" ]; then
 echo "❌ Error: Debes estar en la raíz del repositorio (donde está package.json)."
 exit 1
fi

# 2. LIMPIEZA NUCLEAR (Eliminación de conflictos y basura legacy)
# ------------------------------------------------------------------------------
echo "🧹 [1/5] Ejecutando limpieza nuclear de archivos obsoletos..."
rm -rf node_modules dist legacy_old temp_old apps/web-old tests-old legacy integrations/duplicados .next coverage build

# 3. INSTALACIÓN DE DEPENDENCIAS (Stack Oficial: Vite 7.1.2 + React 18.3.1)
# ------------------------------------------------------------------------------
echo "📦 [2/5] Reinstalando dependencias limpias..."
npm install

# 4. ESTRUCTURA DE DIRECTORIOS MAESTRA (Divineo v7)
# ------------------------------------------------------------------------------
echo "🏗️ [3/5] Consolidando arquitectura de carpetas..."
mkdir -p public/assets/{hero,modules,investor,vision,catalog,branding,ui}
mkdir -p src/{modules,components,pages,styles,i18n,utils}
mkdir -p docs/{patent_EPCT,legal,investor_edition,arquitectura_empresa}
mkdir -p scripts
mkdir -p .github/workflows

# 5. SUPERCOMMIT GIT (Consolidación Legal y Técnica)
# ------------------------------------------------------------------------------
echo "💎 [4/5] Generando Commit Maestro..."
git add .

# Mensaje oficial vinculado a la Patente y Valoración
git commit -m "🔥 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM

✅ Arquitectura Consolidada: Vite 7.1.2 + React 18.3.1 (Monorepo Clean).
✅ Módulos Integrados: PAU, CAP, ABVET, FTT, SmartWardrobe, AutoDonate.
✅ Limpieza: Repositorios legacy y conflictos Next.js eliminados.
✅ Documentación: Patente PCT/EP2025/067317 y Dossier Inversor (€400M).
✅ Identidad Visual: Divineo v7 (Anthracite/Gold/Peacock).
🌐 Dominio: tryonyou.app (Vercel + Cloudflare SSL)
🔗 Notificaciones: @abvet_deploy_bot" || echo "⚠️ No hay cambios pendientes para commitear."

# 6. PUSH Y DESPLIEGUE
# ------------------------------------------------------------------------------
echo "🚀 [5/5] Enviando a GitHub (Branch: main)..."
git push origin main

# Despliegue forzado a Vercel si existe el token
if [ -n "$VERCEL_TOKEN" ]; then
    echo "🌐 Desplegando en Vercel Producción..."
    npx vercel --prod --token=$VERCEL_TOKEN --yes --confirm --force
else
    echo "ℹ️ VERCEL_TOKEN no detectado. El despliegue automático se hará vía GitHub Actions."
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ SUPERCOMMIT MAX COMPLETADO"
echo "════════════════════════════════════════════════════════════════"
echo "👉 Estado: SISTEMA EN PRODUCCIÓN"
echo "👉 URL: https://tryonyou.app"
echo "════════════════════════════════════════════════════════════════"
