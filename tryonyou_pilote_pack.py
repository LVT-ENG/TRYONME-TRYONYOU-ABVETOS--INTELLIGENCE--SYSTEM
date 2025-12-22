#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TRYONYOU – Pilote Retail (30 jours) PACK GENERATOR
Generates:
  - PDF 2 pages: Pilote Retail TryOnYou – 30 jours
  - PDF Proforma: 5.000 € HT (or specified amount)
  - Ready-to-use emails (kickoff + follow-up)
  - Operational checklist (Markdown)
  - Final ZIP package for email distribution
Requirements: reportlab (usually pre-installed in this environment).
"""

import argparse
import os
import re
import textwrap
import zipfile
from datetime import datetime, timedelta

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors


# -----------------------------
# Helpers
# -----------------------------
def safe_filename(name: str) -> str:
    name = name.strip()
    name = re.sub(r"[^\w\s\-\(\)\[\]\.]", "", name, flags=re.UNICODE)
    name = re.sub(r"\s+", " ", name)
    return name.replace(" ", "_")

def euro(amount: float) -> str:
    # Format français simple
    s = f"{amount:,.2f}".replace(",", "X").replace(".", ",").replace("X", " ")
    return f"{s} €"

def ensure_dir(p: str):
    os.makedirs(p, exist_ok=True)

def today_str():
    return datetime.now().strftime("%Y-%m-%d")

def add_header_footer(canvas, doc, footer_text: str):
    canvas.saveState()
    canvas.setFont("Helvetica", 9)
    canvas.setFillGray(0.35)
    canvas.drawString(doc.leftMargin, 1.2 * cm, footer_text)
    canvas.drawRightString(A4[0] - doc.rightMargin, 1.2 * cm, f"Page {doc.page}")
    canvas.restoreState()

def build_doc(path, story, footer_text):
    doc = SimpleDocTemplate(
        path,
        pagesize=A4,
        leftMargin=2*cm,
        rightMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm,
        title=os.path.basename(path),
        author="TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM"
    )
    doc.build(story, onFirstPage=lambda c,d: add_header_footer(c,d,footer_text),
              onLaterPages=lambda c,d: add_header_footer(c,d,footer_text))

# -----------------------------
# PDF: Pilote 2 pages
# -----------------------------
def generate_pilote_pdf(out_pdf: str, cfg: dict):
    styles = getSampleStyleSheet()
    base = styles["Normal"]
    base.fontName = "Helvetica"
    base.fontSize = 11
    base.leading = 14

    h1 = ParagraphStyle("H1", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=16, leading=20, spaceAfter=10)
    h2 = ParagraphStyle("H2", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=12, leading=16, spaceBefore=8, spaceAfter=6)
    small = ParagraphStyle("Small", parent=base, fontSize=9.5, leading=12, textColor=colors.HexColor("#444444"))

    story = []

    title = f"Pilote Retail TRYONYOU – {cfg['client_company']} (30 jours)"
    story.append(Paragraph(title, h1))
    story.append(Paragraph(f"<b>Budget pilote :</b> {euro(cfg['amount_ht'])} HT &nbsp;&nbsp;|&nbsp;&nbsp; <b>Durée :</b> 30 jours &nbsp;&nbsp;|&nbsp;&nbsp; <b>Périmètre :</b> 1 boutique / 1 zone", base))
    story.append(Spacer(1, 0.4*cm))

    # Résumé exécutif
    story.append(Paragraph("1) Résumé exécutif", h2))
    summary = f"""
    TRYONYOU propose un <b>pilote retail clé en main</b> de 30 jours pour tester une expérience client de try-on digital en conditions réelles,
    sans intégration IT lourde. Le pilote inclut la conception de l'expérience, l'installation légère, l'accompagnement et une restitution finale actionnable.
    """
    story.append(Paragraph(textwrap.dedent(summary), base))
    story.append(Spacer(1, 0.25*cm))

    # Objectifs
    story.append(Paragraph("2) Objectifs du pilote", h2))
    objectives = """
    • Valider l'intérêt client pour une expérience de try-on digital (curiosité, engagement, compréhension).<br/>
    • Observer les réactions en boutique (feedback qualitatif) et les points de friction.<br/>
    • Produire une recommandation concrète : arrêter / prolonger / déployer sur plusieurs boutiques.
    """
    story.append(Paragraph(textwrap.dedent(objectives), base))
    story.append(Spacer(1, 0.25*cm))

    # Ce qui est livré
    story.append(Paragraph("3) Livrables inclus (ce que vous recevez)", h2))
    deliverables = """
    <b>A. Conception &amp; setup (Semaine 1)</b><br/>
    • Définition du parcours client (scénario simple : découvrir → essayer → réagir).<br/>
    • Sélection de 3 à 5 looks (catalogue pilote).<br/>
    • Branding léger à l'enseigne (écran d'accueil + textes).<br/>
    • Installation légère sur support (tablette / écran / matériel existant).<br/><br/>
    <b>B. Exploitation en boutique (Semaines 2–4)</b><br/>
    • Support &amp; ajustements légers pendant la période pilote.<br/>
    • Coordination opérationnelle avec l'équipe boutique.<br/><br/>
    <b>C. Analyse &amp; restitution</b><br/>
    • Collecte d'observations : temps d'attention, réactions, verbatims clients, retour équipe boutique.<br/>
    • <b>Rapport final (PDF 5–7 pages)</b> + <b>call de restitution (45 min)</b> : recommandations et next steps.
    """
    story.append(Paragraph(textwrap.dedent(deliverables), base))
    story.append(Spacer(1, 0.25*cm))

    # Ce qui n'est pas inclus
    story.append(Paragraph("4) Hors périmètre (pour garder un pilote rapide et sans risque)", h2))
    out_scope = """
    • Pas d'intégration IT lourde (ERP / PIM / SSO).<br/>
    • Pas de promesse de ROI chiffrée (le pilote sert à mesurer et apprendre).<br/>
    • Pas de déploiement multi-boutiques inclus (option après pilote).
    """
    story.append(Paragraph(textwrap.dedent(out_scope), base))

    story.append(PageBreak())

    # Planning
    story.append(Paragraph("5) Planning (30 jours)", h2))
    planning_table = [
        ["Semaine", "Contenu", "Livrable"],
        ["S1", "Kickoff + setup + scénarios + catalogue pilote + installation légère", "Pilote prêt en boutique"],
        ["S2", "Exploitation + support + ajustements légers", "Stabilité opérationnelle"],
        ["S3", "Exploitation + collecte retours clients / équipe", "Observations consolidées"],
        ["S4", "Fin pilote + synthèse + restitution", "Rapport final + call de décision"],
    ]
    t = Table(planning_table, colWidths=[2.0*cm, 10.5*cm, 4.0*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), colors.HexColor("#111111")),
        ("TEXTCOLOR", (0,0), (-1,0), colors.white),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,0), 10),
        ("GRID", (0,0), (-1,-1), 0.5, colors.HexColor("#CCCCCC")),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("FONTSIZE", (0,1), (-1,-1), 10),
        ("BACKGROUND", (0,1), (-1,-1), colors.HexColor("#F6F6F6")),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.35*cm))

    # Conditions
    story.append(Paragraph("6) Conditions", h2))
    conditions = f"""
    • <b>Budget :</b> {euro(cfg['amount_ht'])} HT (paiement avant démarrage).<br/>
    • <b>Durée :</b> 30 jours calendaires à partir de la date de lancement.<br/>
    • <b>Périmètre :</b> 1 boutique / 1 zone pilote. Extension possible après restitution.<br/>
    • <b>Contact opérationnel :</b> {cfg['seller_name']} – {cfg['seller_title']}<br/>
    """
    story.append(Paragraph(textwrap.dedent(conditions), base))
    story.append(Spacer(1, 0.3*cm))

    # CTA
    story.append(Paragraph("7) Prochaine étape (simple)", h2))
    next_step = """
    1) Validation par email (OK sur budget + boutique).<br/>
    2) Émission de proforma et paiement.<br/>
    3) Kickoff (30 minutes) et lancement Semaine 1.
    """
    story.append(Paragraph(textwrap.dedent(next_step), base))
    story.append(Spacer(1, 0.4*cm))

    story.append(Paragraph("© TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM", small))

    footer = f"TRYONYOU – Pilote Retail (30 jours) | {cfg['client_company']} | {today_str()}"
    build_doc(out_pdf, story, footer)


# -----------------------------
# PDF: Proforma
# -----------------------------
def generate_proforma_pdf(out_pdf: str, cfg: dict):
    styles = getSampleStyleSheet()
    base = styles["Normal"]
    base.fontName = "Helvetica"
    base.fontSize = 11
    base.leading = 14

    h1 = ParagraphStyle("H1", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=16, leading=20, spaceAfter=10)
    h2 = ParagraphStyle("H2", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=12, leading=16, spaceBefore=8, spaceAfter=6)
    small = ParagraphStyle("Small", parent=base, fontSize=9.5, leading=12, textColor=colors.HexColor("#444444"))

    story = []
    story.append(Paragraph("PROFORMA INVOICE", h1))
    story.append(Paragraph(f"<b>Proforma #</b> {cfg['proforma_id']} &nbsp;&nbsp;|&nbsp;&nbsp; <b>Date</b> {today_str()}", base))
    story.append(Spacer(1, 0.4*cm))

    # Seller / Client
    story.append(Paragraph("Émetteur", h2))
    seller = f"""
    <b>{cfg['seller_legal']}</b><br/>
    {cfg['seller_address']}<br/>
    Email: {cfg['seller_email']}<br/>
    """
    if cfg.get("seller_vat"):
        seller += f"VAT: {cfg['seller_vat']}<br/>"
    story.append(Paragraph(textwrap.dedent(seller), base))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph("Client", h2))
    client = f"""
    <b>{cfg['client_company']}</b><br/>
    Contact: {cfg['client_contact']}<br/>
    Email: {cfg['client_email']}<br/>
    """
    story.append(Paragraph(textwrap.dedent(client), base))
    story.append(Spacer(1, 0.35*cm))

    # Line items
    story.append(Paragraph("Détail", h2))
    line_items = [
        ["Description", "Qté", "Prix unitaire (HT)", "Total (HT)"],
        [f"Pilote Retail TRYONYOU – 30 jours – 1 boutique ({cfg['pilot_scope']})", "1", euro(cfg["amount_ht"]), euro(cfg["amount_ht"])],
    ]
    t = Table(line_items, colWidths=[10.2*cm, 1.2*cm, 3.1*cm, 3.0*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), colors.HexColor("#111111")),
        ("TEXTCOLOR", (0,0), (-1,0), colors.white),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("GRID", (0,0), (-1,-1), 0.5, colors.HexColor("#CCCCCC")),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("BACKGROUND", (0,1), (-1,1), colors.HexColor("#F6F6F6")),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.35*cm))

    # Totals
    story.append(Paragraph("Total", h2))
    totals = [
        ["Sous-total HT", euro(cfg["amount_ht"])],
        ["TVA", cfg["vat_note"]],
        ["Total à payer", euro(cfg["amount_ht"])],
    ]
    tt = Table(totals, colWidths=[10.0*cm, 7.5*cm])
    tt.setStyle(TableStyle([
        ("GRID", (0,0), (-1,-1), 0.5, colors.HexColor("#CCCCCC")),
        ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ("FONTNAME", (0,0), (-1,-1), "Helvetica"),
        ("FONTNAME", (0,2), (-1,2), "Helvetica-Bold"),
    ]))
    story.append(tt)
    story.append(Spacer(1, 0.35*cm))

    # Payment terms
    story.append(Paragraph("Conditions de paiement", h2))
    terms = f"""
    • Paiement <b>avant démarrage</b> du pilote.<br/>
    • Mode de paiement: virement bancaire (IBAN sur demande) / autre selon accord.<br/>
    • Démarrage prévu: {cfg['start_date']} (indicatif, après paiement + kickoff).<br/>
    """
    story.append(Paragraph(textwrap.dedent(terms), base))
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph("© TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM", small))

    footer = f"TRYONYOU – Proforma | {cfg['client_company']} | {today_str()}"
    build_doc(out_pdf, story, footer)


# -----------------------------
# Text outputs
# -----------------------------
def write_email_templates(out_dir: str, cfg: dict):
    kickoff = f"""Objet : Pilote payant boutique – TRYONYOU (validation & lancement)

Bonjour {cfg['client_contact']},

Merci pour votre accord de principe.
Je vous confirme le lancement d'un pilote retail TRYONYOU de 30 jours (1 boutique / 1 zone).

• Budget pilote : {euro(cfg['amount_ht'])} HT
• Durée : 30 jours
• Périmètre : {cfg['pilot_scope']}
• Livrables : installation + support + rapport final + call de restitution

Prochaine étape :
1) Validation par retour d'email (OK budget + boutique)
2) Paiement de la proforma (avant démarrage)
3) Kickoff (30 minutes) et lancement Semaine 1

Bien cordialement,
{cfg['seller_name']}
{cfg['seller_title']}
{cfg['seller_email']}
"""

    followup_48h = f"""Objet : Pilote TRYONYOU – confirmation (créneau de démarrage)

Bonjour {cfg['client_contact']},

Je reviens vers vous pour confirmer le démarrage du pilote TRYONYOU (30 jours – 1 boutique).
Pouvez-vous me confirmer :
• la boutique / zone retenue
• le go sur la proforma ({euro(cfg['amount_ht'])} HT)

Dès validation, on planifie le kickoff et l'installation.

Bien cordialement,
{cfg['seller_name']}
"""

    with open(os.path.join(out_dir, "EMAIL_01_KICKOFF.txt"), "w", encoding="utf-8") as f:
        f.write(kickoff)

    with open(os.path.join(out_dir, "EMAIL_02_FOLLOWUP_48H.txt"), "w", encoding="utf-8") as f:
        f.write(followup_48h)

def write_checklist(out_dir: str, cfg: dict):
    md = f"""# Pilote Retail TRYONYOU – Checklist opérationnelle (30 jours)

## Objectif
Tester une expérience client de try-on digital en boutique, sans intégration IT lourde, et produire une restitution actionnable.

## Avant démarrage (J-2 à J0)
- [ ] Confirmation boutique / zone pilote
- [ ] Contact opérationnel côté enseigne (nom / tel)
- [ ] Paiement proforma reçu
- [ ] Créneau kickoff (30 min) validé
- [ ] Sélection 3–5 looks pilote (ou catégories)

## Semaine 1 – Setup
- [ ] Scénario client finalisé (découvrir → essayer → réagir)
- [ ] Support matériel validé (tablette / écran / existant)
- [ ] Installation légère + test sur place
- [ ] Branding léger (écran d'accueil + textes)

## Semaines 2–4 – Exploitation
- [ ] Support & ajustements légers
- [ ] Collecte retours équipe boutique
- [ ] Collecte verbatims clients (qualitatif)

## Fin pilote – Restitution
- [ ] Rapport final (PDF 5–7 pages)
- [ ] Call de restitution (45 min)
- [ ] Décision: stop / prolongation / déploiement

## Pack livré
- Pilote 2 pages (PDF)
- Proforma (PDF)
- Emails modèles
- Cette checklist
"""
    with open(os.path.join(out_dir, "CHECKLIST_PILOTE.md"), "w", encoding="utf-8") as f:
        f.write(md)

# -----------------------------
# ZIP pack
# -----------------------------
def zip_pack(out_dir: str, zip_path: str):
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(out_dir):
            for fn in files:
                p = os.path.join(root, fn)
                arc = os.path.relpath(p, out_dir)
                z.write(p, arcname=arc)

# -----------------------------
# Main
# -----------------------------
def main():
    ap = argparse.ArgumentParser(description="Generate TRYONYOU Pilote Retail pack (PDF + Proforma + emails + checklist + zip).")
    ap.add_argument("--client_company", default="Galeries Lafayette Haussmann", help="Client company name")
    ap.add_argument("--client_contact", default="Elena Grandini", help="Client contact name")
    ap.add_argument("--client_email", default="elena.grandini@galerieslafayette.com", help="Client email")
    ap.add_argument("--amount_ht", type=float, default=5000.0, help="Amount in EUR (HT)")
    ap.add_argument("--pilot_scope", default="1 boutique / 1 zone pilote", help="Scope description")
    ap.add_argument("--start_date", default=(datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"), help="Indicative start date (YYYY-MM-DD)")
    ap.add_argument("--seller_name", default="Rubén Espinar Rodríguez", help="Seller name")
    ap.add_argument("--seller_title", default="CEO / Inventor — TRYONYOU", help="Seller title")
    ap.add_argument("--seller_email", default="ruben.espinar.10@icloud.com", help="Seller email")
    ap.add_argument("--seller_legal", default="TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM (Project)", help="Seller legal entity (edit)")
    ap.add_argument("--seller_address", default="Paris / Barcelona (to be updated)", help="Seller address (edit)")
    ap.add_argument("--seller_vat", default="", help="VAT number (optional)")
    ap.add_argument("--vat_note", default="TVA non incluse / selon statut (à préciser)", help="VAT note")
    ap.add_argument("--out", default="OUT_TRYONYOU_PILOTE_PACK", help="Output folder name")

    args = ap.parse_args()
    cfg = vars(args)

    out_dir = os.path.abspath(cfg["out"])
    ensure_dir(out_dir)

    # Filenames
    client_slug = safe_filename(cfg["client_company"])
    pilote_pdf = os.path.join(out_dir, f"PILOTE_30J_TRYONYOU_{client_slug}.pdf")
    proforma_id = f"TY-{datetime.now().strftime('%Y%m%d')}-001"
    cfg["proforma_id"] = proforma_id
    proforma_pdf = os.path.join(out_dir, f"PROFORMA_{proforma_id}_{client_slug}.pdf")

    # Generate PDFs
    generate_pilote_pdf(pilote_pdf, cfg)
    generate_proforma_pdf(proforma_pdf, cfg)

    # Text files
    write_email_templates(out_dir, cfg)
    write_checklist(out_dir, cfg)

    # README
    readme = f"""TRYONYOU – PILOTE RETAIL PACK
Client: {cfg['client_company']}
Budget: {euro(cfg['amount_ht'])} HT
Durée: 30 jours
Scope: {cfg['pilot_scope']}
Start date (indicative): {cfg['start_date']}

FILES:
- {os.path.basename(pilote_pdf)}
- {os.path.basename(proforma_pdf)}
- EMAIL_01_KICKOFF.txt
- EMAIL_02_FOLLOWUP_48H.txt
- CHECKLIST_PILOTE.md
"""
    with open(os.path.join(out_dir, "README.txt"), "w", encoding="utf-8") as f:
        f.write(readme)

    # Zip
    zip_name = f"TRYONYOU_PILOTE_PACK_{client_slug}_{today_str()}.zip"
    zip_path = os.path.join(os.path.dirname(out_dir), zip_name)
    zip_pack(out_dir, zip_path)

    print("\n✅ PACK GÉNÉRÉ")
    print(f"Dossier: {out_dir}")
    print(f"ZIP:     {zip_path}")
    print("\nProchaine étape: envoyez le ZIP + proforma et demandez le paiement avant de commencer.\n")


if __name__ == "__main__":
    main()
