#!/bin/bash

# Rutas
ROOT="$HOME/Dev/PROYECTO_PILOTO_MASTER"
FRONT="$ROOT/codigo_frontend"
BACK="$ROOT/codigo_backend"

echo "=========================================="
echo "🚀 INICIANDO SECUENCIA DE ACTIVACIÓN TRYON"
echo "=========================================="

# 1. PREPARAR FRONTEND
echo ""
echo "🎨 [1/3] Configurando Frontend (React)..."
if [ -d "$FRONT" ]; then
    cd "$FRONT"
    if [ -f "package.json" ]; then
        echo "   > Instalando dependencias (npm install)..."
        npm install --silent
        echo "   > ✅ Frontend listo."
    else
        echo "   ⚠️ No veo package.json, saltando instalación."
    fi
else
    echo "   ⚠️ No encuentro la carpeta del Frontend."
fi

# 2. PREPARAR BACKEND
echo ""
echo "🐍 [2/3] Configurando Backend (Python)..."
if [ -d "$BACK" ]; then
    cd "$BACK"
    # Crear entorno virtual si no existe
    if [ ! -d "venv" ]; then
        echo "   > Creando entorno virtual..."
        python3 -m venv venv
    fi
    source venv/bin/activate
    
    # Instalar requerimientos si existen
    if [ -f "requirements.txt" ]; then
        echo "   > Instalando librerías..."
        pip install -r requirements.txt -q
    fi
    echo "   > ✅ Backend listo."
else
    echo "   ⚠️ No encuentro la carpeta del Backend."
fi

# 3. EJECUTAR SUPER COMMIT
echo ""
echo "🔥 [3/3] LANZANDO: TRYONYOU_SUPERCOMMIT_MAX.sh"
echo "------------------------------------------"

# Buscar el script donde sea que esté dentro del proyecto
SCRIPT_PATH=$(find "$ROOT" -name "TRYONYOU_SUPERCOMMIT_MAX.sh" | head -n 1)

if [ -f "$SCRIPT_PATH" ]; then
    cd "$(dirname "$SCRIPT_PATH")" # Ir a la carpeta donde está el script
    chmod +x "$(basename "$SCRIPT_PATH")" # Darle permisos de ejecución
    ./"$(basename "$SCRIPT_PATH")" # Ejecutarlo
else
    echo "❌ ERROR CRÍTICO: No encuentro el archivo 'TRYONYOU_SUPERCOMMIT_MAX.sh' en el proyecto."
fi

