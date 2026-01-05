import os
import json
from datetime import datetime

class StationF_Dossier_Generator:
    def __init__(self):
        self.project_name = "TRYONYOU"
        self.timestamp = datetime.now().strftime("%Y-%m-%d")
        self.base_path = "DOSSIER_STATION_F"

    def create_structure(self):
        folders = [
            f"{self.base_path}/CORE_DATA/DRIVE_EXTRACTS",
            f"{self.base_path}/CORE_DATA/ICLOUD_SYNC",
            f"{self.base_path}/TECH_STACK/VERCEL_CONFIG",
            f"{self.base_path}/AI_STUDIO/PROMPTS",
            f"{self.base_path}/MARKETING_SEO/GOOGLE_INDEXING",
            f"{self.base_path}/FINAL_DELIVERY/PITCH_DECK"
        ]
        for folder in folders:
            os.makedirs(folder, exist_ok=True)
        print(f"✅ Estructura creada en: {self.base_path}")

    def generate_step_by_step(self):
        roadmap = {
            "Step_1_SEO": "Implementar metadatos trilingües y Sitemap en Vercel.",
            "Step_2_StationF": "Preparar Dossier Técnico: Arquitectura MoE + 53 Agentes.",
            "Step_3_Success": "Lanzamiento en Product Hunt y Google Search Console.",
        }
        with open(f"{self.base_path}/ROUTEMAP_SUCCESS.json", 'w', encoding='utf-8') as f:
            json.dump(roadmap, f, indent=4, ensure_ascii=False)
        print("✅ Hoja de ruta generada.")

    def create_access_log(self):
        access_info = """# ACCESOS PARA MANUS IA / PARTNERS
1. DRIVE: Compartir carpeta 'TRYONYOU_CORE' con permisos de Editor.
2. VERCEL: Invitar via Settings > Members.
3. GOOGLE AI STUDIO: Exportar API_KEY en archivo .env.
4. ICLOUD: Mover logs de 'Punto Rojo' a DRIVE_EXTRACTS."""
        with open(f"{self.base_path}/ACCESS_GUIDE_TRILINGUAL.md", 'w') as f:
            f.write(access_info)
        print("✅ Guía de accesos creada.")

if __name__ == "__main__":
    dossier = StationF_Dossier_Generator()
    dossier.create_structure()
    dossier.generate_step_by_step()
    dossier.create_access_log()
    print("\n💎 PROYECTO LISTO PARA MANUS IA")
