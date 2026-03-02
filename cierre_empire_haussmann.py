import os
import smtplib
import ssl
from email.message import EmailMessage

# --- CONFIGURACIÓN ESTRATÉGICA ABVETOS ---
EMAIL_PRO = "rubensanzburo@gmail.com"
PASSWORD_APP = "wnkeggzcvtncjycy" # Tu código de 16 letras Google
DESTINATAIRE = "elena.grandini@galerieslafayette.com"

def enviar_pack_cloture():
    msg = EmailMessage()
    msg['Subject'] = "Galeries Lafayette Haussmann — L'acte de naissance d'un nouveau luxe"
    msg['From'] = f"Rubén Espinar Rodríguez <{EMAIL_PRO}>"
    msg['To'] = DESTINATAIRE

    # --- CUERPO DEL EMAIL EN FRANCÉS DE ALTA COSTURA ---
    body = """
Chère Elena,

Veuillez trouver ci-joint l'aboutissement technique et émotionnel de notre vision commune pour le Boulevard Haussmann. 

Ce que je vous transmets aujourd'hui, à travers ce film et ces documents, dépasse la simple solution logicielle. C'est la promesse d'un luxe retrouvé : le luxe de la dignité.

Regardez l'image jointe (paloma_frustrada.jpg). C'est le portrait d'un luxe qui a échoué. Paloma, une femme d'influence, vêtue de certitudes, mais prisonnière d'une file d'attente « Retour & Échange ». Pour elle, le retail classique est devenu une perte de dignité.

Dans le court métrage « L'Éveil d'Haussmann », vous découvrirez le visage de cette révolution. C’est le passage de la frustration de Paloma à l’éclat d’une silhouette enfin sublimée par le Chasquido de P.A.U.

Ce qui change pour vos clientes VIP dès demain :
1. L'Effacement de la Contrainte : Nous avons aboli la tyrannie des chiffres. La taille disparaît pour laisser place à l'allure.
2. Le Sanctuaire de l'Intime : Notre Privacy Firewall ABVETOS® garantit un blindage inexpugnable de l'intimité biométrique.
3. L’Exclusivité Territoriale : L'Option Empire érige les Galeries Lafayette en unique refuge « Zero-Size » de Paris.

Elena, nos serveurs sont synchronisés. Pour verrouiller cette exclusivité et stabiliser l'infrastructure, la validation du forfait de mise en service de 27 500 € HT est requise sous 48 heures.

Le futur du luxe ne dépend plus d'une mesure, mais d'un claquement de doigts. Ne laissons plus jamais Paloma attendre. Rendons-lui sa superbe.

Très cordialement,

Rubén Espinar Rodríguez
Directeur, ABVETOS Intelligence System
    """
    msg.set_content(body)

    # --- ADJUNTOS PERFECTOS ---
    # Asegúrate de que estos nombres de archivos existen en tu carpeta
    adjuntos = [
        {"file": "paloma_frustrada_haussmann.jpg", "type": "image", "subtype": "jpeg"},
        {"file": "leveil_dhaussmann_v9.2.6.mp4", "type": "video", "subtype": "mp4"}
    ]

    for item in adjuntos:
        if os.path.exists(item["file"]):
            with open(item["file"], 'rb') as f:
                file_data = f.read()
                msg.add_attachment(
                    file_data,
                    maintype=item["type"],
                    subtype=item["subtype"],
                    filename=item["file"]
                )
            print(f"✅ Adjunto listo: {item['file']}")
        else:
            print(f"⚠️ Alerta: El archivo {item['file']} no se encontró. El Agente 70 recomienda verificar la ruta.")

    # --- ENVÍO SECO Y DIRECTO ---
    context = ssl.create_default_context()
    try:
        print("🚀 Iniciando secuencia de envío a Haussmann...")
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(EMAIL_PRO, PASSWORD_APP)
            server.send_message(msg)
            print("\n✨ ¡ÉXITO TOTAL! El Pack de Cierre Empire ha sido entregado a Elena Grandini.")
    except Exception as e:
        print(f"❌ Error en la transmisión: {e}")

if __name__ == "__main__":
    enviar_pack_cloture()
