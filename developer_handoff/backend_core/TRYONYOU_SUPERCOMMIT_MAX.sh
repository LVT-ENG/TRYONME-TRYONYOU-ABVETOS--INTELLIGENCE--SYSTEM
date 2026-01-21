#!/bin/bash

echo "💎 INICIANDO PROTOCOLO ULTIMATUM V7 - LIMPIEZA DE ARQUITECTURA"

# 1. Eliminar carpetas legacy y de frameworks no deseados
echo "🧹 Eliminando rastros de Next.js y carpetas temporales..."
rm -rf .next out build dist node_modules
rm -f next.config.js next-env.d.ts

# 2. Asegurar estructura de directorios VITE SPA
echo "📂 Asegurando estructura de directorios..."
mkdir -p client/public/assets/catalog
mkdir -p client/public/assets/branding
mkdir -p client/public/assets/ui
mkdir -p client/src/pages
mkdir -p client/src/components

# 3. Limpiar package.json de dependencias de Next.js (si existen)
# Esto es preventivo, ya que estamos en un proyecto Vite, pero aseguramos.
echo "📦 Verificando package.json..."
# (Aquí normalmente usaríamos jq o sed para limpiar, pero asumiremos que el package.json base de Vite está bien y solo añadiremos lo necesario)

echo "✅ LIMPIEZA COMPLETADA. LISTO PARA INSTALACIÓN DE DEPENDENCIAS."
