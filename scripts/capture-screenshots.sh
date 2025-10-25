#!/bin/bash

# TRYONYOU Deploy Express - Automated Screenshots
# Captura screenshots desktop y móvil después del deploy

set -e

DEPLOYMENT_URL="${1:-https://tryonyou.app}"
OUTPUT_DIR="${2:-screenshots}"
TIMESTAMP=$(date '+%Y%m%d_%H%M%S')

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}📸 Iniciando capturas automatizadas...${NC}"
echo "URL: $DEPLOYMENT_URL"
echo "Output: $OUTPUT_DIR"

# Crear directorio de salida
mkdir -p "$OUTPUT_DIR"

# Función para captura con Playwright
capture_with_playwright() {
    echo -e "${GREEN}🎭 Usando Playwright para capturas...${NC}"
    
    # Crear script de Playwright
    cat > /tmp/capture.js << 'EOF'
const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2];
  const outputDir = process.argv[3];
  const timestamp = process.argv[4];
  
  const browser = await chromium.launch();
  
  // Desktop
  const desktopPage = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });
  await desktopPage.goto(url, { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ 
    path: `${outputDir}/desktop_${timestamp}.png`,
    fullPage: true
  });
  console.log('✅ Desktop screenshot saved');
  
  // Mobile
  const mobilePage = await browser.newPage({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  await mobilePage.goto(url, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ 
    path: `${outputDir}/mobile_${timestamp}.png`,
    fullPage: true
  });
  console.log('✅ Mobile screenshot saved');
  
  await browser.close();
})();
EOF
    
    # Ejecutar Playwright
    if command -v node &> /dev/null && npm list playwright &> /dev/null; then
        node /tmp/capture.js "$DEPLOYMENT_URL" "$OUTPUT_DIR" "$TIMESTAMP"
        return 0
    else
        echo -e "${YELLOW}⚠️  Playwright no disponible${NC}"
        return 1
    fi
}

# Función para captura con Puppeteer
capture_with_puppeteer() {
    echo -e "${GREEN}🎪 Usando Puppeteer para capturas...${NC}"
    
    cat > /tmp/capture-puppeteer.js << 'EOF'
const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2];
  const outputDir = process.argv[3];
  const timestamp = process.argv[4];
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  // Desktop
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1920, height: 1080 });
  await desktopPage.goto(url, { waitUntil: 'networkidle2' });
  await desktopPage.screenshot({ 
    path: `${outputDir}/desktop_${timestamp}.png`,
    fullPage: true
  });
  console.log('✅ Desktop screenshot saved');
  
  // Mobile
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812 });
  await mobilePage.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15');
  await mobilePage.goto(url, { waitUntil: 'networkidle2' });
  await mobilePage.screenshot({ 
    path: `${outputDir}/mobile_${timestamp}.png`,
    fullPage: true
  });
  console.log('✅ Mobile screenshot saved');
  
  await browser.close();
})();
EOF
    
    if command -v node &> /dev/null && npm list puppeteer &> /dev/null; then
        node /tmp/capture-puppeteer.js "$DEPLOYMENT_URL" "$OUTPUT_DIR" "$TIMESTAMP"
        return 0
    else
        echo -e "${YELLOW}⚠️  Puppeteer no disponible${NC}"
        return 1
    fi
}

# Función para captura con curl + wkhtmltoimage (fallback)
capture_with_wkhtmltoimage() {
    echo -e "${GREEN}🖼️  Usando wkhtmltoimage para capturas...${NC}"
    
    if command -v wkhtmltoimage &> /dev/null; then
        # Desktop
        wkhtmltoimage --width 1920 --height 1080 "$DEPLOYMENT_URL" "$OUTPUT_DIR/desktop_${TIMESTAMP}.png"
        echo "✅ Desktop screenshot saved"
        
        # Mobile (simular con viewport pequeño)
        wkhtmltoimage --width 375 --height 812 "$DEPLOYMENT_URL" "$OUTPUT_DIR/mobile_${TIMESTAMP}.png"
        echo "✅ Mobile screenshot saved"
        
        return 0
    else
        echo -e "${RED}❌ wkhtmltoimage no disponible${NC}"
        return 1
    fi
}

# Intentar capturas con diferentes métodos
if capture_with_playwright; then
    echo -e "${GREEN}✅ Capturas completadas con Playwright${NC}"
elif capture_with_puppeteer; then
    echo -e "${GREEN}✅ Capturas completadas con Puppeteer${NC}"
elif capture_with_wkhtmltoimage; then
    echo -e "${GREEN}✅ Capturas completadas con wkhtmltoimage${NC}"
else
    echo -e "${RED}❌ No se pudo capturar screenshots - ninguna herramienta disponible${NC}"
    echo -e "${YELLOW}💡 Instalar Playwright: npm install -D playwright${NC}"
    exit 1
fi

# Generar reporte
echo -e "${GREEN}📊 Generando reporte de capturas...${NC}"

cat > "$OUTPUT_DIR/capture_report_${TIMESTAMP}.md" << EOF
# Screenshot Capture Report

**Date:** $(date '+%Y-%m-%d %H:%M:%S')
**URL:** $DEPLOYMENT_URL
**Timestamp:** $TIMESTAMP

## Captured Screenshots

### Desktop (1920x1080)
![Desktop](desktop_${TIMESTAMP}.png)

### Mobile (375x812)
![Mobile](mobile_${TIMESTAMP}.png)

## File Information

\`\`\`
$(ls -lh "$OUTPUT_DIR"/desktop_${TIMESTAMP}.png "$OUTPUT_DIR"/mobile_${TIMESTAMP}.png 2>/dev/null || echo "Files not found")
\`\`\`

---
*Generated by TRYONYOU Deploy Express*
EOF

echo -e "${GREEN}✅ Reporte generado: $OUTPUT_DIR/capture_report_${TIMESTAMP}.md${NC}"

# Listar archivos generados
echo -e "${GREEN}📁 Archivos generados:${NC}"
ls -lh "$OUTPUT_DIR"/*${TIMESTAMP}*

echo -e "${GREEN}🎉 Capturas completadas exitosamente!${NC}"

