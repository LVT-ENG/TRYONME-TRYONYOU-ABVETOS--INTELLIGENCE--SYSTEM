import os
import json
import re

def optimize_for_seo_and_pilot():
    print("🚀 Iniciando Orquestación: Piloto Galeries Lafayette + SEO Optimization")

    # 1. ACTUALIZACIÓN DE SEO EN INDEX.HTML
    # Inyectamos meta-tags profesionales para que el link se vea increíble en Instagram/Facebook
    if os.path.exists("index.html"):
        seo_meta = """
    <title>TryOnYou | Votre miroir intelligent aux Galeries Lafayette</title>
    <meta name="description" content="Découvrez l'ajustement parfait sans mesures inconfortables. Le futur du shopping personnalisé avec l'IA ABVET 3D.">
    <meta name="keywords" content="Fashion Tech, IA, Galeries Lafayette, TryOnYou, Scanneur corporel, Shopping intelligent">
    <meta property="og:title" content="TryOnYou: Le Miroir Intelligent">
    <meta property="og:description" content="Pau vous montre le futur de l'essayage. Scannez votre corps, trouvez votre style.">
    <meta property="og:image" content="/assets/pau-snap-preview.jpg">
    <meta property="og:url" content="https://tryonyou.app">
    <meta name="twitter:card" content="summary_large_image">
        """
        with open("index.html", "r") as f:
            content = f.read()
        
        # Insertamos los meta tags antes del cierre de </head>
        new_content = content.replace("</head>", seo_meta + "\n  </head>")
        with open("index.html", "w") as f:
            f.write(new_content)
        print("✅ SEO Meta-tags inyectados profesionalmente.")

    # 2. CORRECCIÓN DEL PACKAGE.JSON (Fix de Build y Sharp)
    if os.path.exists("package.json"):
        with open("package.json", "r") as f:
            data = json.load(f)
        
        # Aseguramos build limpio para Vercel (Sin CI=false que ensucia logs)
        data["scripts"]["build"] = "vite build"
        
        with open("package.json", "w") as f:
            json.dump(data, f, indent=2)
        print("✅ package.json optimizado para producción.")

    # 3. FIX DE TEXTOS (Eliminando la frase de 'Lola' y el error de 'No vas a hacerte')
    # Buscamos en los componentes de la landing para poner el claim profesional
    target_file = "src/components/LandingComponentsFR.tsx"
    if os.path.exists(target_file):
        with open(target_file, "r") as f:
            code = f.read()
        
        # Reemplazo de la frase confusa por la claim de alta costura
        old_phrase = r"No vas a hacerte un TryOnYou.*lo hará por ti"
        new_phrase = "Votre miroir intelligent : Scannez. Essayez. Validez."
        
        code = re.sub(old_phrase, new_phrase, code, flags=re.DOTALL)
        
        with open(target_file, "w") as f:
            f.write(code)
        print("✅ Frase genérica eliminada. Claim de Galeries Lafayette activada.")

    # 4. COMANDOS DE DESPLIEGUE FINAL (Ejecutados por Manus)
    print("\n📦 Ejecutando comandos de arquitectura...")
    os.system("npm install --platform=linux --arch=x64 sharp")
    
    print("\n🚀 Preparando Push Final a Vercel...")
    # Manus usará su token para este paso
    # os.system("vercel --prod --force") 

if __name__ == "__main__":
    optimize_for_seo_and_pilot()
