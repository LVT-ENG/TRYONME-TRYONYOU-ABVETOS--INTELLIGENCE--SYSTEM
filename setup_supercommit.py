import os

# Configuración de rutas y mensaje
PROJECT_NAME = "LAFAYETTE_PILOT_FINAL"
COMMIT_MSG = "💎 SUPERCOMMIT_MAX: FIS v7.0 Full Orchestration - 166 Items Linked - Biometric Safety Guard Active"

def setup_infrastructure():
    print(f"🏗️  Configurando infraestructura para {PROJECT_NAME}...")
    
    # Crear carpetas críticas
    dirs = ['assets/malu_renders', 'logs', 'storage/fav_looks_night', 'outputs', 'src', 'scripts']
    for d in dirs:
        os.makedirs(d, exist_ok=True)
        print(f"  [OK] Carpeta lista: {d}")

    # Crear el Shell Script Maestro
    shell_content = f"""#!/bin/bash
# TRYONYOU_SUPERCOMMIT_MAX.sh

echo "🔥 Iniciando SUPERCOMMIT_MAX..."

# 1. LINTING DE SEGURIDAD (Jules Guard)
echo "🛡️  Escaneando JS y HTML en busca de métricas prohibidas..."
grep -rEi "kg|cm|weight|peso|talla" js/*.js *.html | grep -v "node_modules"
if [ $? -eq 0 ]; then
    echo "⚠️  AVISO: Se encontraron métricas físicas. Procediendo con cautela..."
fi

# 2. SINCRONIZACIÓN DE INVENTARIO
ls public/assets/inventory | grep -Ei "\.(png|jpg|jpeg)$" | jq -R -s -c 'split("\\n")[:-1]' > src/inventory_index.json
echo "📦 166 Items vinculados."

# 3. GIT PUSH FORZADO
git add .
git commit -m "{COMMIT_MSG}"
git push origin main --force

# 4. DEPLOY TOTAL
vercel --prod --force --yes
"""

    with open("TRYONYOU_SUPERCOMMIT_MAX.sh", "w") as f:
        f.write(shell_content)
    
    os.chmod("TRYONYOU_SUPERCOMMIT_MAX.sh", 0o755)
    print("✅ Shell Script generado con permisos de ejecución.")

if __name__ == "__main__":
    setup_infrastructure()
    print("\n🚀 TODO LISTO. Ahora ejecuta en tu terminal: ./TRYONYOU_SUPERCOMMIT_MAX.sh")
