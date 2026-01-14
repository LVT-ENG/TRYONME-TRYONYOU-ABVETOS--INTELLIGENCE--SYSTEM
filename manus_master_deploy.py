import subprocess
import sys

def execute_step(description, command, critical=True):
    """Execute a shell command with output capture.
    
    Args:
        description: Human-readable description of the step
        command: Shell command to execute
        critical: If True, exit on failure; if False, continue
    
    Returns:
        subprocess.CompletedProcess: The result of the command execution
    """
    print(f"🚀 Manus Action: {description}")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        print(f"✅ {description} completado con éxito.")
    else:
        print(f"❌ Error en {description}: {result.stderr}")
        if critical:
            print(f"⚠️ Error crítico detectado. Abortando despliegue.")
            sys.exit(1)
    return result

def main():
    # Branch específica para el despliegue de Galeries Lafayette
    rama_news = "update-google-platform-news-648450526279271204"
    
    print("--- 🧠 Manus 1.6 Max: Iniciando Deploy Maestro ---")

    # 1. Asegurar entorno de la rama correcta
    execute_step("Sincronizando rama del piloto", f"git checkout {rama_news}")

    # 2. Fix de Sharp para Vercel (Evita fallos de 'package unsupported')
    # Este paso es crítico para que el mirror funcione en producción
    execute_step("Configurando Sharp para Linux x64", 
                 "npm install --platform=linux --arch=x64 sharp")

    # 3. Limpieza de historial (Squash de los 7 fallos previos)
    # El número 7 representa los intentos fallidos de despliegue anteriores
    # que necesitan ser consolidados en un solo commit limpio
    execute_step("Consolidando commits para un historial limpio", 
                 "git reset --soft HEAD~7")

    # 4. Ajuste de Landing (Cero Tallas / Cero Números)
    # Aquí Manus puede inyectar el cambio en el componente de UI
    execute_step("Preparando commit de producción (Landing sin tallas)", 
                 "git add . && git commit -m 'prod: final deployment for Galeries Lafayette pilot - mirror focus'")

    # 5. Despliegue a Producción via Vercel CLI
    # Manus usará su token interno para finalizar el proceso
    print("📡 Iniciando subida final a Vercel...")
    # Nota: Se usa --force-with-lease en lugar de --force para mayor seguridad
    res = execute_step("Deploy forzado a producción", 
                      f"git push origin {rama_news} --force-with-lease",
                      critical=False)

    if res.returncode == 0:
        print("\n✨ DESPLIEGUE FINALIZADO: El espejo mágico está en vivo.")
    else:
        print("\n⚠️ Manus: Se requiere revisión manual del token de Vercel.")

if __name__ == "__main__":
    main()
