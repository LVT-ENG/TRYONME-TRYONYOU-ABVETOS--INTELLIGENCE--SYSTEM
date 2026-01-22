import os

def update_imports():
    print("🛠️  Corrigiendo rutas de importación...")
    # Buscamos en todos los archivos .tsx y .ts
    for root, dirs, files in os.walk("src"):
        for file in files:
            if file.endswith((".tsx", ".ts")):
                path = os.path.join(root, file)
                with open(path, "r") as f:
                    content = f.read()
                
                # Ejemplo: Si buscaba './PauAgent', ahora busca './modules/Intelligence/PauAgent'
                # Ajustamos según tu nueva estructura
                new_content = content.replace("from './PauAgent'", "from './modules/Intelligence/PauAgent'")
                new_content = new_content.replace("from '../PauAgent'", "from '../modules/Intelligence/PauAgent'")
                
                if content != new_content:
                    with open(path, "w") as f:
                        f.write(new_content)
                    print(f"✅ Rutas actualizadas en: {file}")

if __name__ == "__main__":
    update_imports()
