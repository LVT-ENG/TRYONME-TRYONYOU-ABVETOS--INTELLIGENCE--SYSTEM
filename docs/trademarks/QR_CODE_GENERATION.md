# QR Code Generation Instructions

## Overview
This document explains how to generate the QR code for the TRYONYOU trademark portfolio.

## QR Code Details
- **Filename**: `qr_tryonyou_trademark.png`
- **URL**: https://tryonyou.app/trademark
- **Purpose**: Official QR code for quick access to the trademark portfolio online
- **Location**: Bottom of page 16 in the PDF

## Manual Generation

### Using qrencode (Recommended)
```bash
qrencode -o qr_tryonyou_trademark.png "https://tryonyou.app/trademark"
```

### Installation Instructions

**Ubuntu/Debian:**
```bash
sudo apt-get install qrencode
```

**macOS:**
```bash
brew install qrencode
```

**Windows:**
Download from: https://fukuchi.org/works/qrencode/

### Online Generation
If command-line tools are not available, you can generate the QR code online:
1. Visit: https://www.qr-code-generator.com/
2. Enter URL: https://tryonyou.app/trademark
3. Download as PNG
4. Save as: `qr_tryonyou_trademark.png`

## Automated Generation
The `generate_pdf.sh` script automatically generates the QR code if `qrencode` is installed.
If not available, it will skip QR code generation with a warning and continue with PDF creation.

## Integration
The QR code is referenced in the Markdown document's annexe section and should be included in the final PDF layout.
