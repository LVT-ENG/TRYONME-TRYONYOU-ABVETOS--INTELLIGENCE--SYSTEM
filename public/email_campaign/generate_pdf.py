from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'TryOnYou - Pilot Proposal', 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def create_pdf():
    pdf = PDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    # EN
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(0, 10, "English - Value Proposition", 0, 1)
    pdf.set_font("Arial", size=12)
    text_en = """
    TryOnYou is a digital fitting room experience designed for physical retail environments.

    Key Benefits:
    - Real-scale digital mirror
    - Autonomous virtual try-on
    - High-end avatar representation

    Pilot Offer:
    - 1 Month: 4,500 EUR
    - 3 Months: 9,500 EUR
    """
    pdf.multi_cell(0, 10, text_en)
    pdf.ln(5)

    # FR
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(0, 10, "Français - Proposition de Valeur", 0, 1)
    pdf.set_font("Arial", size=12)
    text_fr = """
    TryOnYou est une expérience de cabine d'essayage digitale conçue pour les espaces de vente physiques.

    Avantages clés :
    - Miroir digital à l'échelle réelle
    - Essayage virtuel autonome
    - Représentation par avatar haut de gamme

    Offre Pilote :
    - 1 Mois : 4 500 EUR
    - 3 Mois : 9 500 EUR
    """
    pdf.multi_cell(0, 10, text_fr)
    pdf.ln(5)

    # ES
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(0, 10, "Español - Propuesta de Valor", 0, 1)
    pdf.set_font("Arial", size=12)
    text_es = """
    TryOnYou es una experiencia de probador digital diseñada para entornos de venta física.

    Beneficios clave:
    - Espejo digital a escala real
    - Probador virtual autónomo
    - Representación con avatar de alta gama

    Oferta Piloto:
    - 1 Mes: 4.500 EUR
    - 3 Meses: 9.500 EUR
    """
    pdf.multi_cell(0, 10, text_es)

    pdf.output("public/email_campaign/TryOnYou_Pilote.pdf")

if __name__ == '__main__':
    create_pdf()
