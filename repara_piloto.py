import subprocess
import json
import os

def run(cmd):
    print(f"Executing: {cmd}")
    return subprocess.run(cmd, shell=True, capture_output=True, text=True)

def main():
    # 1. Configuración de nombres
    rama = "update-google-platform-news-648450526279271204"
    
    print(f"--- Iniciando reparación de la rama {rama} ---")

    # 2. Limpiar el historial (Squash de los 7 commits fallidos)
    # Esto te deja todos los cambios listos para un solo commit limpio
    run(f"git checkout {rama}")
    run("git reset --soft HEAD~7")
    
    # 3. Corregir el package.json automáticamente
    # Quitamos el CI=false que a veces da problemas y aseguramos sharp
    if os.path.exists("package.json"):
        with open("package.json", "r") as f:
            data = json.load(f)
        
        # Corregimos el script de build para Vercel
        data["scripts"]["build"] = "vite build"
        
        with open("package.json", "w") as f:
            json.dump(data, f, indent=2)
        print("✅ package.json actualizado (build script corregido).")

    # 4. Forzar reinstalación de Sharp para Linux (Arquitectura de Vercel)
    print("📦 Reconfigurando Sharp para evitar errores de compilación...")
    run("npm install --platform=linux --arch=x64 sharp")

    # 5. Crear el commit único profesional
    print("📝 Creando commit de consolidación...")
    run("git add .")
    commit_msg = "feat(pilot): consolidate google platform updates and fix vercel build"
    run(f'git commit -m "{commit_msg}"')

    # 6. Push forzado para limpiar la Pull Request LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1507
    print("🚀 Subiendo cambios limpios (Force Push)...")
    result = run(f"git push origin {rama} --force")
    
    if result.returncode == 0:
        print("\n✨ ¡ÉXITO! Ahora la PR LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1507 solo tiene 1 commit limpio.")
        print("Vercel debería empezar el despliegue sin los errores de 'package unsupported'.")
    else:
        print(f"❌ Error al subir: {result.stderr}")

if __name__ == "__main__":
    main()
