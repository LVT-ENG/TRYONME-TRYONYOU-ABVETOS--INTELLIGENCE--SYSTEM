# TRYONYOU Trademark Portfolio Documentation

This directory contains the official trademark portfolio documentation for TRYONYOU – ABVETOS – ULTRA-PLUS – ULTIMATUM.

## 📁 Directory Structure

```
docs/trademarks/
├── TRYONYOU_Portefeuille_de_Marques_2025_FR.md  # Main trademark portfolio (French)
├── generate_pdf.sh                               # PDF generation script
├── QR_CODE_GENERATION.md                         # QR code generation instructions
├── README_DEPLOY.txt                             # Deployment instructions
├── README.md                                     # This file
└── [Generated files]
    ├── TRYONYOU_Portefeuille_de_Marques_2025_FR.pdf  # Generated PDF
    └── qr_tryonyou_trademark.png                     # QR code image
```

## 🎯 Purpose

This portfolio documents all trademarks registered under the TRYONYOU ecosystem, including:
- **TRYONYOU®** - Virtual try-on and emotional purchasing system
- **ABVET®** - Dual biometric payment system
- **ABVETOS®** - Automation and deployment framework
- **CAP®** - Clothing Auto-Production
- **PAU®** - Personal Avatar User
- **FTT®** - Fashion Trend Tracker
- **VVL®** - Virtual Vision Lens
- **LIVEIT®** - Smart production orchestration
- **ARMOIRE SOLIDAIRE™** - Circular ethical platform
- **ADBET® / ADBETOS™** - Financial system and blockchain traceability
- **ARMOIRE INTELLIGENTE™** - Connected digital wardrobe

## 🚀 Quick Start

### Generate PDF

```bash
cd docs/trademarks/
bash generate_pdf.sh
```

### Prerequisites

The script requires the following tools:
- **pandoc** - Document conversion tool ([install](https://pandoc.org/installing.html))
- **xelatex** - LaTeX engine (part of TeXLive distribution)
- **qrencode** - QR code generator (optional)

### Installation

**Ubuntu/Debian:**
```bash
sudo apt-get install pandoc texlive-xetex qrencode
```

**macOS:**
```bash
brew install pandoc basictex qrencode
```

**Windows:**
- Install pandoc from https://pandoc.org/installing.html
- Install MiKTeX from https://miktex.org/
- Install qrencode from https://fukuchi.org/works/qrencode/

## 📋 Document Specifications

### Format
- **Paper Size**: A4 Landscape (297mm × 210mm)
- **Resolution**: 300 DPI minimum
- **File Format**: PDF/A (archival standard)
- **Language**: French (fr)

### Visual Specifications
- **Background**: Ivory Light – `#F5EFE6`
- **Primary Text**: Peacock Blue – `#006D77`
- **Accent**: Luxury Gold – `#C5A46D`
- **Secondary**: Anthracite – `#141619`
- **Margins**: 2cm all around

### Typography
- **Title**: Helvetica Neue Bold
- **Subtitle**: Helvetica Neue Light
- **Body**: Default serif font (via XeLaTeX)

## 🔐 Legal Information

**Reference**: EPCT/IB/2025/XXXXXX  
**Copyright**: © 2025 TRYONYOU – ABVETOS – ULTRA-PLUS – ULTIMATUM  
**Confidentiality**: This document is confidential and reserved for INPI, WIPO, and authorized strategic partners.

### Protected Territories
EU · CH · AE · US · JP · KR · FR

### Nice Classes Covered
7 · 9 · 25 · 35 · 36 · 40 · 42 · 44

## 📦 Deployment

### Automatic Deployment (ABVET Deploy Express)

1. Place this folder in: `TRYONYOU_DEPLOY_EXPRESS_INBOX/`
2. The Deploy Express module will:
   - Generate the PDF
   - Commit to `/docs/trademarks/`
   - Send notification via `@abvet_deploy_bot`
   - Include QR code and commit hash

### Manual Deployment

1. Generate the PDF using `generate_pdf.sh`
2. Review the generated PDF
3. Commit changes to the repository
4. Push to the appropriate branch

## 🔗 Resources

- **Official Website**: https://tryonyou.app
- **Trademark Portal**: https://tryonyou.app/trademark
- **QR Code URL**: https://tryonyou.app/trademark

## 📞 Support

For deployment questions:
- **Telegram**: @abvet_deploy_bot
- **Email**: support@tryonyou.systems

## 📝 Version History

- **2025**: Initial trademark portfolio compilation
- Patent reference: EPCT/IB/2025/XXXXXX
- Filed with: INPI (France) and WIPO (International)

## 🛠️ Maintenance

### Updating the Portfolio

1. Edit `TRYONYOU_Portefeuille_de_Marques_2025_FR.md`
2. Run `bash generate_pdf.sh` to regenerate the PDF
3. Review changes
4. Commit and push

### Adding New Trademarks

When adding new trademarks:
1. Update the Markdown file with new trademark information
2. Include Nice classification numbers
3. Specify registration status
4. Update the "Nice Classes Covered" section in this README
5. Regenerate the PDF

## ⚠️ Important Notes

- Generated PDF files can be committed to the repository
- Keep the Markdown source as the single source of truth
- Always regenerate the PDF after making changes to the source
- QR code generation requires `qrencode` - script will warn if not available
- The script creates a PDF/A compliant document for long-term archiving

---

**Last Updated**: 2025  
**Maintained by**: TRYONYOU SYSTEMS  
**CEO**: Rubén Espinar
