import os
try:
    from fpdf import FPDF
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf"])
    from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=15)
pdf.cell(200, 10, txt="PATENT PENDING - EPCT/IB2025/0001 - DOCUMENT RESTRICTED", ln=1, align="C")
pdf.output("public/docs/patent/consolidated_patent.pdf")
print("PDF Generated successfully")
