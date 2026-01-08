import csv
import os
import ssl
import time
import smtplib
from email.message import EmailMessage
from email.utils import formataddr, make_msgid
from pathlib import Path
import mimetypes

# ==============================
# CONFIGURATION
# ==============================

# Load environment variables (you can use python-dotenv if you have a .env file)
# from dotenv import load_dotenv
# load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")

FROM_NAME = os.getenv("FROM_NAME", "Rubén Espinar — TryOnYou")
FROM_EMAIL = os.getenv("FROM_EMAIL", SMTP_USER or "ruben@tryonyou.app")

# ==============================
# FILES & ASSETS
# ==============================

BASE_DIR = Path(__file__).parent
CONTACTS_CSV = BASE_DIR / "contacts.csv"
LOGO_PATH = BASE_DIR / "assets/logo.png"
HERO_PATH = BASE_DIR / "assets/demo.png"
ATTACHMENT_PATH = BASE_DIR / "TryOnYou_Pilote.pdf"

# ==============================
# SENDING OPTIONS
# ==============================

# Set to True to simulate sending without actual SMTP connection (Dry Run)
DRY_RUN = os.getenv("DRY_RUN", "True").lower() == "true"
SLEEP_SECONDS = 1.5

# ==============================
# CONTENT (TRILINGUAL)
# ==============================

SUBJECTS = {
    "fr": "Démo Try On – pilote de cabine d’essayage digitale (tarifs & conditions)",
    "en": "TryOnYou Demo – Digital Fitting Room Pilot (Rates & Conditions)",
    "es": "Demo TryOnYou – Piloto de Probador Digital (Tarifas y Condiciones)"
}

TEXT_TEMPLATES = {
    "fr": """Bonjour,

Nous vous présentons notre démo pilote de cabine d’essayage digitale TryOnYou,
conçue pour une validation en environnement physique (boutique, showroom, événement).

L’expérience repose sur un miroir digital à l’échelle réelle, affiché sur écran
vertical grand format, permettant aux utilisateurs d’essayer virtuellement
différentes tenues de manière autonome.

CONTENU DU PILOTE
- Démo logicielle TryOnYou
- Avatar à l’échelle réelle
- Sélection de looks définie en amont
- Intégration technique
- Support pendant toute la durée du pilote

CONDITIONS MATÉRIELLES
- Écran non inclus
- Format recommandé : écran vertical 75” à 86”
- TryOnYou ne fournit pas le matériel

TARIFS
- Pilote 1 mois : 4 500 € HT
- Pilote 3 mois : 9 500 € HT

Cordialement,
Rubén Espinar
TryOnYou
""",
    "en": """Hello,

We present our TryOnYou digital fitting room pilot demo, designed for validation
in physical environments (boutiques, showrooms, events).

The experience relies on a full-scale digital mirror, displayed on a large-format
vertical screen, allowing users to virtually try on different outfits autonomously.

PILOT CONTENT
- TryOnYou software demo
- Real-scale avatar
- Pre-defined selection of looks
- Technical integration
- Support throughout the pilot duration

HARDWARE REQUIREMENTS
- Screen not included
- Recommended format: Vertical screen 75” to 86”
- TryOnYou does not supply the hardware

RATES
- 1-Month Pilot: €4,500 excl. VAT
- 3-Month Pilot: €9,500 excl. VAT

Best regards,
Rubén Espinar
TryOnYou
""",
    "es": """Hola,

Le presentamos nuestra demo piloto de probador digital TryOnYou, diseñada para
su validación en entornos físicos (boutiques, showrooms, eventos).

La experiencia se basa en un espejo digital a escala real, mostrado en una pantalla
vertical de gran formato, que permite a los usuarios probarse virtualmente
diferentes conjuntos de manera autónoma.

CONTENIDO DEL PILOTO
- Demo de software TryOnYou
- Avatar a escala real
- Selección de looks definida previamente
- Integración técnica
- Soporte durante toda la duración del piloto

REQUISITOS DE MATERIAL
- Pantalla no incluida
- Formato recomendado: pantalla vertical de 75” a 86”
- TryOnYou no suministra el hardware

TARIFAS
- Piloto 1 mes: 4.500 € + IVA
- Piloto 3 meses: 9.500 € + IVA

Atentamente,
Rubén Espinar
TryOnYou
"""
}

HTML_TEMPLATES = {
    "fr": """
    <p>Bonjour,</p>
    <p>Nous vous présentons notre <strong>démo pilote de cabine d’essayage digitale TryOnYou</strong>, conçue pour une validation en environnement physique (boutique, showroom, événement).</p>
    <img src="cid:{hero_cid}" style="width:100%;max-width:600px;border-radius:10px;margin:16px 0;" alt="TryOnYou Digital Fitting Mirror"/>
    <p>L’expérience repose sur un <strong>miroir digital à l’échelle réelle</strong>, affiché sur un <strong>écran vertical grand format</strong>, permettant aux utilisateurs d’essayer virtuellement différentes tenues de manière autonome et intuitive.</p>
    <h3>Contenu du pilote</h3>
    <ul>
      <li>Démo logicielle TryOnYou</li>
      <li>Avatar à l’échelle réelle</li>
      <li>Sélection de looks définie en amont</li>
      <li>Intégration technique</li>
      <li>Support pendant toute la durée du pilote</li>
    </ul>
    <h3>Conditions matérielles</h3>
    <ul>
      <li>Écran non inclus</li>
      <li>Format recommandé : écran vertical <strong>75” à 86”</strong></li>
      <li>TryOnYou n’est pas revendeur de matériel</li>
    </ul>
    <h3>Tarifs</h3>
    <ul>
      <li><strong>Pilote 1 mois</strong> : 4 500 € HT</li>
      <li><strong>Pilote 3 mois</strong> : 9 500 € HT</li>
    </ul>
    <p>Ce pilote constitue une phase de validation avant un éventuel déploiement à plus grande échelle.</p>
    <p>Cordialement,<br/><strong>Rubén Espinar</strong><br/>TryOnYou</p>
    """,
    "en": """
    <p>Hello,</p>
    <p>We present our <strong>TryOnYou digital fitting room pilot demo</strong>, designed for validation in physical environments (boutiques, showrooms, events).</p>
    <img src="cid:{hero_cid}" style="width:100%;max-width:600px;border-radius:10px;margin:16px 0;" alt="TryOnYou Digital Fitting Mirror"/>
    <p>The experience relies on a <strong>full-scale digital mirror</strong>, displayed on a <strong>large-format vertical screen</strong>, allowing users to virtually try on different outfits autonomously and intuitively.</p>
    <h3>Pilot Content</h3>
    <ul>
      <li>TryOnYou software demo</li>
      <li>Real-scale avatar</li>
      <li>Pre-defined selection of looks</li>
      <li>Technical integration</li>
      <li>Support throughout the pilot duration</li>
    </ul>
    <h3>Hardware Requirements</h3>
    <ul>
      <li>Screen not included</li>
      <li>Recommended format: Vertical screen <strong>75” to 86”</strong></li>
      <li>TryOnYou does not supply the hardware</li>
    </ul>
    <h3>Rates</h3>
    <ul>
      <li><strong>1-Month Pilot</strong>: €4,500 excl. VAT</li>
      <li><strong>3-Month Pilot</strong>: €9,500 excl. VAT</li>
    </ul>
    <p>This pilot serves as a validation phase before a potential larger-scale deployment.</p>
    <p>Best regards,<br/><strong>Rubén Espinar</strong><br/>TryOnYou</p>
    """,
    "es": """
    <p>Hola,</p>
    <p>Le presentamos nuestra <strong>demo piloto de probador digital TryOnYou</strong>, diseñada para su validación en entornos físicos (boutiques, showrooms, eventos).</p>
    <img src="cid:{hero_cid}" style="width:100%;max-width:600px;border-radius:10px;margin:16px 0;" alt="TryOnYou Digital Fitting Mirror"/>
    <p>La experiencia se basa en un <strong>espejo digital a escala real</strong>, mostrado en una <strong>pantalla vertical de gran formato</strong>, que permite a los usuarios probarse virtualmente diferentes conjuntos de manera autónoma e intuitiva.</p>
    <h3>Contenido del Piloto</h3>
    <ul>
      <li>Demo de software TryOnYou</li>
      <li>Avatar a escala real</li>
      <li>Selección de looks definida previamente</li>
      <li>Integración técnica</li>
      <li>Soporte durante toda la duración del piloto</li>
    </ul>
    <h3>Requisitos de Material</h3>
    <ul>
      <li>Pantalla no incluida</li>
      <li>Formato recomendado: pantalla vertical <strong>75” a 86”</strong></li>
      <li>TryOnYou no suministra el hardware</li>
    </ul>
    <h3>Tarifas</h3>
    <ul>
      <li><strong>Piloto 1 mes</strong>: 4.500 € + IVA</li>
      <li><strong>Piloto 3 meses</strong>: 9.500 € + IVA</li>
    </ul>
    <p>Este piloto constituye una fase de validación antes de un eventual despliegue a mayor escala.</p>
    <p>Atentamente,<br/><strong>Rubén Espinar</strong><br/>TryOnYou</p>
    """
}

BASE_HTML_WRAPPER = """\
<!doctype html>
<html>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#141619;color:#F5EFE6;">
  <div style="max-width:680px;margin:0 auto;padding:24px;border: 1px solid #C5A46D; border-radius: 8px;">
    <div style="text-align:center; margin-bottom: 20px;">
        <img src="cid:{logo_cid}" style="height:60px;" alt="TryOnYou"/>
    </div>

    <div style="color: #F5EFE6;">
      {content}
    </div>
  </div>
</body>
</html>
"""

# ==============================
# FUNCTIONS
# ==============================

def read_contacts(path):
    if not os.path.exists(path):
        print(f"Error: Contacts file not found at {path}")
        return []
    with open(path, newline="", encoding="utf-8") as f:
        return [row for row in csv.DictReader(f) if row.get("email")]

def build_email(to_email, language, name=""):
    language = language.lower() if language else "en"
    if language not in SUBJECTS:
        language = "en"  # Fallback

    msg = EmailMessage()
    msg["Subject"] = SUBJECTS[language]
    msg["From"] = formataddr((FROM_NAME, FROM_EMAIL))
    msg["To"] = to_email

    logo_cid = make_msgid()[1:-1]
    hero_cid = make_msgid()[1:-1]

    # Plain Text body
    msg.set_content(TEXT_TEMPLATES[language])

    # HTML body
    inner_html = HTML_TEMPLATES[language].format(hero_cid=hero_cid)
    full_html = BASE_HTML_WRAPPER.format(logo_cid=logo_cid, content=inner_html)

    msg.add_alternative(full_html, subtype="html")

    # Embed Images
    if os.path.exists(LOGO_PATH):
        with open(LOGO_PATH, "rb") as f:
            msg.get_payload()[1].add_related(f.read(), maintype="image", subtype="png", cid=logo_cid)
    else:
        print(f"Warning: Logo not found at {LOGO_PATH}")

    if os.path.exists(HERO_PATH):
        with open(HERO_PATH, "rb") as f:
            msg.get_payload()[1].add_related(f.read(), maintype="image", subtype="png", cid=hero_cid)
    else:
        print(f"Warning: Hero image not found at {HERO_PATH}")

    # Attachment
    if ATTACHMENT_PATH and os.path.exists(ATTACHMENT_PATH):
        with open(ATTACHMENT_PATH, "rb") as f:
            file_name = os.path.basename(ATTACHMENT_PATH)
            mime_type, _ = mimetypes.guess_type(ATTACHMENT_PATH)
            maintype, subtype = (mime_type or "application/pdf").split("/", 1)
            msg.add_attachment(
                f.read(),
                maintype=maintype,
                subtype=subtype,
                filename=file_name
            )
    else:
        print(f"Warning: Attachment not found at {ATTACHMENT_PATH}")

    return msg

def send_email(server, msg):
    try:
        if DRY_RUN:
            print(f"[DRY RUN] Sending email to {msg['To']} | Subject: {msg['Subject']}")
            # print(msg.get_body(preferencelist=('html')).get_content()) # Debug HTML if needed
        else:
            server.send_message(msg)
            print(f"[SENT] Email sent to {msg['To']}")
    except Exception as e:
        print(f"[ERROR] Failed to send to {msg['To']}: {e}")

def main():
    print("--- TryOnYou Pilot Emailer ---")
    print(f"Mode: {'DRY RUN (No emails will be sent)' if DRY_RUN else 'LIVE (Sending emails)'}")

    contacts = read_contacts(CONTACTS_CSV)
    print(f"Found {len(contacts)} contacts.")

    if not contacts:
        return

    context = ssl.create_default_context()

    if DRY_RUN:
        # Mock server context
        server = None
        for c in contacts:
            msg = build_email(c["email"], c.get("language", "en"), c.get("name", ""))
            send_email(server, msg)
            time.sleep(0.5)
    else:
        if not SMTP_USER or not SMTP_PASS:
            print("Error: SMTP_USER and SMTP_PASS environment variables must be set.")
            return

        try:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.starttls(context=context)
                server.login(SMTP_USER, SMTP_PASS)

                for c in contacts:
                    msg = build_email(c["email"], c.get("language", "en"), c.get("name", ""))
                    send_email(server, msg)
                    time.sleep(SLEEP_SECONDS)
        except Exception as e:
            print(f"SMTP Connection Error: {e}")

    print("--- Batch Complete ---")

if __name__ == "__main__":
    main()
