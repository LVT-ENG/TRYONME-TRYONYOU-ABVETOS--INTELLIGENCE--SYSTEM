import os
import sys

def verify_assets():
    print("📡 Verificando estado de integridad de assets Divineo...")

    required_assets = [
        "public/assets/catalog/red_dress_minimal.png",
        "public/assets/branding/pau_tuxedo_agent.png"
    ]

    missing_assets = []

    for asset in required_assets:
        if os.path.exists(asset):
            print(f"✅ Asset encontrado: {asset}")
        else:
            print(f"❌ Asset NO encontrado: {asset}")
            missing_assets.append(asset)

    if missing_assets:
        print(f"🚨 ERROR CRÍTICO: Faltan {len(missing_assets)} assets esenciales.")
        sys.exit(1)
    else:
        print("✅ Ecosistema TRYONYOU: Operativo y validado.")
        print("💎 Agente 70: Sincronización completa")

if __name__ == "__main__":
    verify_assets()
