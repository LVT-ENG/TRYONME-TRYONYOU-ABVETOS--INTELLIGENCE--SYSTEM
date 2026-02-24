import os
import re

def corregir_rutas_vite():
    """
    Elimina archivos corruptos y duplicados creados por sincronización de iCloud.
    Agente Responsable: Agente 70.
    """
    print("🧹 [AGENTE 70]: Ejecutando limpieza nuclear de Vite...")
    duplicados = [
        "src/App 2.jsx", 
        "src/main 2.jsx", 
        "src/Main.jsx"
    ]
    for file in duplicados:
        if os.path.exists(file):
            os.remove(file)
            print(f"🗑️ Duplicado eliminado: {file}")

def aplicar_brand_divineo_v9():
    """
    Inyecta la paleta Antracita/Oro y aplica el filtro Zero-Size.
    Agente Responsable: Pau Agent & Jules.
    """
    print("✨ [PAU AGENT]: Aplicando identidad visual V9 (Antracita/Oro)...")
    
    # 1. Forzar Tailwind Config
    tailwind_config = """
    export default {
      theme: {
        extend: {
          colors: {
            'divineo-anthracite': '#141619',
            'divineo-gold': '#C5A46D',
            'divineo-beige': '#F5F5DC',
          }
        }
      }
    }
    """
    with open("tailwind.config.js", "w") as f:
        f.write(tailwind_config)

    # 2. Protocolo Zero-Size: Destrucción de etiquetas S/M/L en el frontend
    print("🛡️ [JULES]: Aplicando Muro de Privacidad Zero-Size...")
    for root, dirs, files in os.walk("src"):
        for file in files:
            if file.endswith((".jsx", ".tsx", ".html")):
                path = os.path.join(root, file)
                with open(path, "r") as f:
                    content = f.read()
                
                # Regex para buscar y destruir menciones a tallas estándar
                new_content = re.sub(r'\b(S|M|L|XL|XXL|Talla)\b', 'Ajuste Perfecto', content, flags=re.IGNORECASE)
                
                if new_content != content:
                    with open(path, "w") as f:
                        f.write(new_content)
                    print(f"✅ Zero-Size aplicado en: {file}")

if __name__ == "__main__":
    corregir_rutas_vite()
    aplicar_brand_divineo_v9()
