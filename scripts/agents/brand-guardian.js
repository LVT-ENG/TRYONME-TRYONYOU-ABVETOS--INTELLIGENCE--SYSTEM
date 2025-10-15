#!/usr/bin/env node

/**
 * Agente 12: Brand Guardian - Guardián de Marca
 * 
 * Valida coherencia visual, paleta de colores y tipografía
 * Asegura estándares premium estilo Vogue-tech
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paleta de colores oficial TRYONYOU
const BRAND_COLORS = {
  gold: '#D3B26A',
  peacock: '#0E6B6B',
  anthracite: '#141619',
  bone: '#F5EFE6'
};

// Tipografías oficiales
const BRAND_FONTS = {
  heading: ['Playfair Display', 'Georgia', 'serif'],
  body: ['Inter', 'Helvetica', 'sans-serif'],
  monospace: ['Fira Code', 'monospace']
};

class BrandGuardian {
  constructor() {
    this.violations = [];
    this.warnings = [];
    this.successes = [];
    this.rootPath = path.resolve(__dirname, '../..');
  }

  // Validar colores en archivos CSS
  validateColors(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const hexColors = content.match(/#[0-9A-Fa-f]{6}/g) || [];
      
      const brandColorValues = Object.values(BRAND_COLORS).map(c => c.toLowerCase());
      const unbrandedColors = hexColors.filter(color => 
        !brandColorValues.includes(color.toLowerCase())
      );

      if (unbrandedColors.length > 0) {
        this.warnings.push({
          file: filePath,
          type: 'color',
          message: `Colores fuera de paleta: ${[...new Set(unbrandedColors)].join(', ')}`,
          severity: 'medium'
        });
      } else {
        this.successes.push({
          file: filePath,
          type: 'color',
          message: 'Paleta de colores conforme'
        });
      }
    } catch (error) {
      console.error(`Error validando ${filePath}:`, error.message);
    }
  }

  // Validar tipografías en archivos CSS
  validateFonts(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Buscar definiciones de font-family
      const fontFamilyMatches = content.match(/font-family:\s*([^;]+);/gi) || [];
      
      fontFamilyMatches.forEach(match => {
        const fonts = match.toLowerCase();
        
        // Permitir CSS variables (var(--))
        if (fonts.includes('var(--')) {
          return; // CSS variable - OK
        }
        
        const isValid = 
          fonts.includes('playfair') ||
          fonts.includes('inter') ||
          fonts.includes('fira code') ||
          fonts.includes('poppins') || // También usado en el proyecto
          fonts.includes('georgia') ||
          fonts.includes('helvetica') ||
          fonts.includes('serif') ||
          fonts.includes('sans-serif') ||
          fonts.includes('monospace');

        if (!isValid) {
          this.warnings.push({
            file: filePath,
            type: 'font',
            message: `Tipografía no estándar: ${match}`,
            severity: 'low'
          });
        }
      });
    } catch (error) {
      console.error(`Error validando tipografías en ${filePath}:`, error.message);
    }
  }

  // Validar estructura de archivos visuales
  validateAssetStructure() {
    const requiredDirs = [
      'public',
      'public/assets',
      'src/assets',
      'docs/screenshots'
    ];

    requiredDirs.forEach(dir => {
      const fullPath = path.join(this.rootPath, dir);
      if (!fs.existsSync(fullPath)) {
        this.warnings.push({
          file: dir,
          type: 'structure',
          message: `Directorio recomendado no existe: ${dir}`,
          severity: 'low'
        });
      } else {
        this.successes.push({
          file: dir,
          type: 'structure',
          message: 'Estructura de directorios conforme'
        });
      }
    });
  }

  // Validar imágenes (tamaño, formato)
  validateImages() {
    const imageExts = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
    const publicPath = path.join(this.rootPath, 'public');
    
    if (!fs.existsSync(publicPath)) return;

    const scanDir = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (imageExts.some(ext => item.toLowerCase().endsWith(ext))) {
          const size = stat.size;
          const sizeMB = (size / (1024 * 1024)).toFixed(2);
          
          // Advertir si imagen > 2MB
          if (size > 2 * 1024 * 1024) {
            this.warnings.push({
              file: fullPath,
              type: 'image',
              message: `Imagen grande (${sizeMB}MB) - considerar optimización`,
              severity: 'medium'
            });
          }

          // Preferir WebP para web
          if (item.toLowerCase().endsWith('.png') || item.toLowerCase().endsWith('.jpg')) {
            if (size > 500 * 1024) { // > 500KB
              this.warnings.push({
                file: fullPath,
                type: 'image',
                message: `Considerar convertir a WebP para mejor performance`,
                severity: 'low'
              });
            }
          }
        }
      });
    };

    try {
      scanDir(publicPath);
    } catch (error) {
      console.error('Error escaneando imágenes:', error.message);
    }
  }

  // Validar CSS files
  validateCSSFiles() {
    const srcPath = path.join(this.rootPath, 'src');
    const cssFiles = [];

    const findCSSFiles = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          findCSSFiles(fullPath);
        } else if (item.endsWith('.css')) {
          cssFiles.push(fullPath);
        }
      });
    };

    findCSSFiles(srcPath);

    cssFiles.forEach(file => {
      this.validateColors(file);
      this.validateFonts(file);
    });

    if (cssFiles.length === 0) {
      this.warnings.push({
        file: 'src/',
        type: 'structure',
        message: 'No se encontraron archivos CSS para validar',
        severity: 'low'
      });
    }
  }

  // Generar reporte
  generateReport() {
    console.log('\n🎨 Brand Guardian - Reporte de Validación\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Violaciones críticas
    if (this.violations.length > 0) {
      console.log('❌ VIOLACIONES DETECTADAS:\n');
      this.violations.forEach(v => {
        console.log(`  ${v.severity === 'high' ? '🔴' : '🟡'} [${v.type.toUpperCase()}] ${v.file}`);
        console.log(`     ${v.message}\n`);
      });
    } else {
      console.log('✅ Sin violaciones críticas\n');
    }

    // Advertencias
    if (this.warnings.length > 0) {
      console.log(`⚠️  ADVERTENCIAS (${this.warnings.length}):\n`);
      this.warnings.slice(0, 10).forEach(w => {
        console.log(`  • [${w.type}] ${path.basename(w.file)}`);
        console.log(`    ${w.message}\n`);
      });
      if (this.warnings.length > 10) {
        console.log(`  ... y ${this.warnings.length - 10} advertencias más\n`);
      }
    } else {
      console.log('✅ Sin advertencias\n');
    }

    // Éxitos (muestra resumen)
    if (this.successes.length > 0) {
      console.log(`✅ VALIDACIONES EXITOSAS: ${this.successes.length}\n`);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Resumen final
    const total = this.violations.length + this.warnings.length + this.successes.length;
    const score = total > 0 
      ? Math.round(((this.successes.length - this.violations.length) / total) * 100)
      : 100;

    console.log(`📊 Score de Marca: ${score}%\n`);

    if (score >= 90) {
      console.log('🌟 Excelente coherencia de marca!\n');
    } else if (score >= 70) {
      console.log('👍 Buena coherencia, algunas mejoras posibles\n');
    } else if (score >= 50) {
      console.log('⚠️  Coherencia mejorable, revisar advertencias\n');
    } else {
      console.log('🔴 Requiere atención urgente\n');
    }

    // Guía rápida
    console.log('📖 PALETA OFICIAL:\n');
    console.log(`  • Oro Elegante: ${BRAND_COLORS.gold}`);
    console.log(`  • Pavo Real: ${BRAND_COLORS.peacock}`);
    console.log(`  • Antracita: ${BRAND_COLORS.anthracite}`);
    console.log(`  • Hueso: ${BRAND_COLORS.bone}\n`);

    console.log('📖 TIPOGRAFÍAS OFICIALES:\n');
    console.log(`  • Headings: ${BRAND_FONTS.heading.join(', ')}`);
    console.log(`  • Body: ${BRAND_FONTS.body.join(', ')}`);
    console.log(`  • Monospace: ${BRAND_FONTS.monospace.join(', ')}\n`);

    return {
      score,
      violations: this.violations.length,
      warnings: this.warnings.length,
      successes: this.successes.length
    };
  }

  // Ejecutar todas las validaciones
  run() {
    console.log('🎨 Agente 12: Brand Guardian - Iniciando validación...\n');

    this.validateAssetStructure();
    this.validateCSSFiles();
    this.validateImages();

    const report = this.generateReport();

    // Salir con error si hay violaciones críticas
    if (this.violations.length > 0) {
      console.log('❌ Validación fallida: se encontraron violaciones críticas\n');
      process.exit(1);
    }

    console.log('✅ Validación completada exitosamente\n');
    return report;
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const guardian = new BrandGuardian();
  guardian.run();
}

export default BrandGuardian;
