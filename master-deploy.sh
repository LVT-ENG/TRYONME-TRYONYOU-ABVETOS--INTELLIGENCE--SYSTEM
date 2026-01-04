#!/bin/bash

# Detener el script inmediatamente si ocurre un error
set -e

# Colores para visualización
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}⚙️  MASTER DEPLOY: CONFIGURACIÓN, LIMPIEZA Y DESPLIEGUE${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"

# ---------------------------------------------------------
# 1. VERIFICACIÓN Y AUTO-INSTALACIÓN DE HERRAMIENTAS
# ---------------------------------------------------------
echo -e "\n${YELLOW}🛠️  Verificando entorno y herramientas...${NC}"

# Si no existe package.json, inicializarlo
if [ ! -f package.json ]; then
    echo "⚠️  No se encontró package.json. Inicializando proyecto..."
    npm init -y > /dev/null
fi

# Instalar Prettier y ESLint si no están instalados (silenciosamente)
if [ ! -d "node_modules/prettier" ] || [ ! -d "node_modules/eslint" ]; then
    echo "📥 Instalando herramientas de calidad de código (ESLint + Prettier)..."
    npm install --save-dev eslint prettier eslint-config-prettier > /dev/null 2>&1
fi

# Crear configuración de Prettier si no existe
if [ ! -f .prettierrc ]; then
    echo "📄 Creando configuración automática de Prettier..."
    echo '{ "semi": true, "singleQuote": true, "tabWidth": 2, "trailingComma": "es5" }' > .prettierrc
fi

# Crear configuración de ESLint si no existe (Configuración genérica segura)
if [ ! -f .eslintrc.json ] && [ ! -f .eslintrc.js ]; then
    echo "📄 Creando configuración automática de ESLint..."
    echo '{ "extends": ["eslint:recommended", "prettier"], "env": { "browser": true, "node": true, "es6": true }, "parserOptions": { "ecmaVersion": 2021, "sourceType": "module" } }' > .eslintrc.json
fi

# ---------------------------------------------------------
# 2. CARGA DE SECRETOS
# ---------------------------------------------------------
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
  echo -e "${GREEN}✅ Variables .env cargadas.${NC}"
else
  echo -e "${YELLOW}⚠️  No hay archivo .env (Continuando con variables de sistema)${NC}"
fi

# ---------------------------------------------------------
# 3. SINCRONIZACIÓN DE EQUIPO (PULL)
# ---------------------------------------------------------
echo -e "\n${YELLOW}📡 Sincronizando con el equipo (Git Pull Rebase)...${NC}"
# git stash guarda tus cambios locales temporalmente para evitar conflictos al bajar código
git stash push -m "Guardado automático antes de deploy" --quiet
git pull origin main --rebase
git stash pop --quiet || echo "ℹ️  Nada que recuperar del stash."

# ---------------------------------------------------------
# 4. LIMPIEZA E INSTALACIÓN PROFUNDA
# ---------------------------------------------------------
echo -e "\n${YELLOW}🧹 Limpieza profunda e instalación de dependencias...${NC}"
rm -rf node_modules
npm install

# ---------------------------------------------------------
# 5. APLICACIÓN DE ESTÁNDARES (LINT & FORMAT)
# ---------------------------------------------------------
echo -e "\n${YELLOW}✨ Aplicando formato y correcciones automáticas...${NC}"
# Usamos npx para ejecutar las herramientas que acabamos de asegurar que existen
npx prettier --write .
npx eslint . --fix || echo -e "${YELLOW}⚠️  ESLint encontró advertencias no corregibles automáticamente (continuando...)${NC}"

# ---------------------------------------------------------
# 6. GIT PUSH Y DESPLIEGUE
# ---------------------------------------------------------
echo -e "\n${YELLOW}📦 Empaquetando y subiendo...${NC}"
git add .

# Verificamos si hay algo nuevo que subir
if git diff-index --quiet HEAD --; then
    echo "ℹ️  No hay cambios de código para GitHub, pero forzaremos despliegue en Vercel."
else
    git commit -m "🚀 AUTO-DEPLOY: Código formateado y sincronizado
    📅 $(date)"
    git push origin main
    echo -e "${GREEN}✅ Código subido a GitHub.${NC}"
fi

echo -e "\n${BLUE}🌍 DESPLEGANDO A VERCEL (PRODUCCIÓN)...${NC}"

# Lógica de token para Vercel
if [ -z "$VERCEL_TOKEN" ]; then
    # Si no hay token, intentará abrir el navegador para login
    npx vercel --prod --yes --force
else
    # Si hay token, modo silencioso y automático
    npx vercel --prod --token=$VERCEL_TOKEN --yes --force
fi

echo -e "\n${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ TODO LISTO: PROYECTO LIMPIO, SINCRONIZADO Y PUBLICADO${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
