# Actualización para index.py - El Orquestador Ultra
import os

def desplegar_todo_el_sistema():
    print("--- INICIANDO TRYONYOU ULTRA: CONSOLIDACIÓN DRIVE/ICLOUD ---")

    # Rutas detectadas tras la recolección
    modulos = [
        "src/inbox_deploy/main.py",
        "src/manus_core/IA_engine.py",
        "fix_lafayette.py"
    ]

    for script in modulos:
        if os.path.exists(script):
            print(f"[CONSOLIDADO] Lanzando modulo: {script}")
            # Aquí lanzamos en segundo plano o secuencial
            os.system(f"python3 {script} &")

if __name__ == "__main__":
    desplegar_todo_el_sistema()
