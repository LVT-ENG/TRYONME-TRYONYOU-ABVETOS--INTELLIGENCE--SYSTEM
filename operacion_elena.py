import os
import zipfile
import smtplib
from email.message import EmailMessage
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders

# 1. Configuración de credenciales (Desde tu archivo .env)
EMAIL_USER = os.getenv("EMAIL_USER", "contact@tryonyou.app")
EMAIL_PASS = os.getenv("EMAIL_PASS") # Tu contraseña de aplicación de 16 caracteres
DESTINATARIO = "elena.grandini@galerieslafayette.com" # Cambia esto al email real si es necesario

# 2. Archivos estratégicos a empaquetar [Source: 586, 587]
archivos_persuasion = {
    "Video_Demo": "public/docs/media/pitch_video_hero.mp4",
    "Presentacion_y_Precios": "public/docs/investor/commercial_deck.pdf",
    "Respaldo_Legal_Patente": "public/docs/patent/consolidated_patent.pdf"
}

nombre_zip = "Lafayette_Executive_Pack.zip"

def empaquetar_archivos():
    print(f"📦 Empaquetando activos para Elena...")
    archivos_encontrados = 0
    with zipfile.ZipFile(nombre_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for alias, ruta in archivos_persuasion.items():
            if os.path.exists(ruta):
                zipf.write(ruta, arcname=os.path.basename(ruta))
                print(f"   ✅ Añadido: {alias}")
                archivos_encontrados += 1
            else:
                # Fallback por si están en la raíz temporalmente
                ruta_alternativa = os.path.basename(ruta)
                if os.path.exists(ruta_alternativa):
                    zipf.write(ruta_alternativa, arcname=ruta_alternativa)
                    print(f"   ✅ Añadido (desde raíz): {alias}")
                    archivos_encontrados += 1
                else:
                    print(f"   ❌ No encontrado: {ruta}")
    return archivos_encontrados > 0

def enviar_email():
    print(f"📧 Conectando al servidor SMTP para enviar a {DESTINATARIO}...")
    
    msg = MIMEMultipart()
    msg['From'] = f"TRYONYOU Executive <{EMAIL_USER}>"
    msg['To'] = DESTINATARIO
    msg['Subject'] = "Dossier Exécutif: Pilote TryOnYou x Galeries Lafayette"

    # Cuerpo del correo en francés
    body = """
    Bonjour Elena,
    
    Suite à notre présentation de l'écosystème Divineo V7, vous trouverez ci-joint le "Executive Pack" comprenant :
    1. La vidéo narrative du parcours client (Zéro Retour).
    2. Le deck commercial avec les modèles de tarification (SaaS et Pilote).
    3. Les détails de notre brevet (PCT/EP2025/067317).
    
    Le pilote est actuellement en ligne et opérationnel.
    
    Cordialement,
    
    L'équipe TRYONYOU
    """
    msg.attach(MIMEText(body, 'plain'))

    # Adjuntar el archivo ZIP
    with open(nombre_zip, "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f"attachment; filename= {nombre_zip}")
        msg.attach(part)

    # Envío mediante SMTP de Gmail [Source: 619, 626]
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)
        server.quit()
        print(f"🚀 ¡ÉXITO! El paquete ha sido enviado a Elena Grandini.")
    except Exception as e:
        print(f"⚠️ Error al enviar el correo: {e}\n(Verifica que EMAIL_USER y EMAIL_PASS estén cargados en tu entorno).")

if __name__ == "__main__":
    if not EMAIL_PASS:
        print("❌ ERROR: La contraseña EMAIL_PASS no está en el entorno.")
    else:
        hay_archivos = empaquetar_archivos()
        if hay_archivos:
            enviar_email()
        else:
            print("❌ No se encontraron los archivos para enviar.")

