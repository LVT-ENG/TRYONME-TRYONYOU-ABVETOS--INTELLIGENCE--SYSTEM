import os
import json

def generate_full_b2b_kit():
    print("🛠️ Preparando Kit B2B Pro...")

    # 1. Crear el QR (Requiere: pip install qrcode pillow)
    try:
        import qrcode
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data("https://tryonyou.app/register-partner")
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")

        os.makedirs("public/assets/vision", exist_ok=True)
        img.save("public/assets/vision/partner_qr.png")
        print("✅ QR generado en: public/assets/vision/partner_qr.png")
    except ImportError:
        print("⚠️ Instala 'qrcode' para generar la imagen .png")

    # 2. El Dashboard de Tiendas (JSON)
    tiendas = [
        {"id": "GL_H", "nombre": "Galeries Lafayette Haussmann", "status": "Priority 1"},
        {"id": "PH_H", "nombre": "Printemps Haussmann", "status": "Priority 1"}
    ]
    os.makedirs("docs/comercial", exist_ok=True)
    with open("docs/comercial/dashboard.json", "w") as f:
        json.dump(tiendas, f, indent=4)
        print("✅ Dashboard generado en: docs/comercial/dashboard.json")

if __name__ == "__main__":
    generate_full_b2b_kit()
