from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    email: str
    intent: str  # GET_LOOK, INVESTOR, SUPPORT
    metadata: dict = {}

def send_email(to_email, subject, body):
    sender_email = os.getenv("EMAIL_USER")
    sender_password = os.getenv("EMAIL_PASS")

    if not sender_email or not sender_password:
        print("❌ Email credentials missing.")
        return False

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'html'))

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"❌ Error sending email: {e}")
        return False

@app.post("/api/jules/process_intent")
async def process_intent(request: EmailRequest):
    print(f"🤖 Jules processing intent: {request.intent} for {request.email}")

    if request.intent == "GET_LOOK":
        subject = "Votre Look Divineo - Galeries Lafayette"
        body = """
        <h1>Bonjour,</h1>
        <p>Voici votre sélection Divineo personnalisée.</p>
        <p><b>Le Look:</b> Robe Rouge Minimaliste</p>
        <p><a href="https://tryonyou.app">Accéder à votre miroir virtuel</a></p>
        <br>
        <p><i>Jules - Votre Assistant Styliste</i></p>
        """
        send_email(request.email, subject, body)
        return {"status": "Look sent"}

    elif request.intent == "INVESTOR":
        subject = "TryOnYou - Investor Dossier"
        body = """
        <h1>Bonjour,</h1>
        <p>Merci pour votre intérêt.</p>
        <p>Veuillez trouver ci-joint l'accès à notre dossier investisseur.</p>
        <p><a href="https://tryonyou.app/docs/investor/commercial_deck.pdf">Télécharger le Dossier</a></p>
        <br>
        <p><i>L'Équipe TryOnYou</i></p>
        """
        send_email(request.email, subject, body)
        return {"status": "Dossier sent"}

    elif request.intent == "SUPPORT":
        # In a real scenario, this would notify Telegram or create a ticket
        print("Creating support ticket...")
        return {"status": "Support ticket created"}

    return {"status": "Intent unknown"}

# Mount the original backend app for other routes if needed
# from backend.main import app as backend_app
# app.mount("/api/backend", backend_app)
