# 🧩 README TÉCNICO PARA INFORMÁTICA / INGENIERÍA

**TryOnYou — 70 Image Pack (Agente 70 Edition)**  
Versión técnica para desarrolladores del sistema TryOnYou / TryOnMe / ABVETOS.

---

## 1. OBJETIVO DEL PAQUETE

Este paquete contiene todas las imágenes necesarias para la fase 1 del sistema TryOnYou, editadas y organizadas para:

- **UI/UX de la app**
- **Motor de recomendación PAU**
- **Onboarding del escaneo**
- **Mockups del armario virtual y fitting**
- **Material de marketing**
- **Integración con el pipeline ABVETOS**

---

## 2. ESTRUCTURA DE CARPETAS (Árbol final)

Copiar y pegar dentro de: `/assets/images/tryonyou/`

```
TryOnYou_70Pack_Final/
    /logo/                         (Logos oficiales PNG)
    /pau/                          (PAU en alta calidad)
        /mini/                     (PAU versión pequeña)
    /ui/
        /wardrobe/                 (Armario virtual)
        /fitting/                  (Fitting 3D, avatar)
        /recommendations/          (Pantallas PAU recomendando)
        /onboarding/               (Escaneo corporal)
    /outfits/
        /female/
        /male/
    /retail/
    /marketing/
        /hero/
        /community/
        /testimonials/
    /storytelling/
        /problem/                  (Problemas de talla)
        /before_after/             (Comparativas)
        /lifestyle/
    /concepts/
        /editorial/
    /fashion/
    README_TryOnYou_TECH.md
```

---

## 3. CONVENCIONES TÉCNICAS PARA ARCHIVOS

### 3.1 NOMENCLATURA

**Formato obligatorio:**

```
{category}_{subcategory}_{descriptor}_{variant}.{ext}

Ejemplos:
✅ pau_avatar_fullbody_01.png
✅ ui_wardrobe_grid_desktop.png
✅ marketing_hero_homepage_v2.jpg
✅ outfit_female_casual_summer.png

❌ PAU Avatar.png
❌ Foto 1.jpg
❌ imagen-final.PNG
```

**Reglas:**
- Todo en **minúsculas**
- Sin espacios (usar `_`)
- Sin acentos ni caracteres especiales
- Extensiones: `.png`, `.jpg`, `.webp`

### 3.2 TAMAÑOS RECOMENDADOS

| Categoría | Ancho (px) | Alto (px) | Peso máx. | Formato |
|-----------|-----------|-----------|-----------|---------|
| Logo | 512 | 512 | 200 KB | PNG |
| PAU Avatar | 1024 | 1024 | 1.5 MB | PNG |
| UI Screen | 1920 | 1080 | 2 MB | PNG/WEBP |
| Marketing Hero | 2400 | 1600 | 1.8 MB | JPG/WEBP |
| Outfit | 800 | 1200 | 1.2 MB | PNG |
| Thumbnail | 300 | 400 | 150 KB | JPG |

### 3.3 FORMATOS POR USO

```
PNG  → Logos, UI con transparencia, iconos
JPG  → Fotografías, marketing, lifestyle
WEBP → Landing pages, web (mejor compresión)
```

---

## 4. INTEGRACIÓN CON EL CÓDIGO

### 4.1 RUTAS RELATIVAS

Todas las rutas se cargan desde:

```javascript
/assets/images/tryonyou/{category}/{file}
```

### 4.2 IMPORTACIÓN EN CÓDIGO

Ejemplo de uso en React/Vite:

```javascript
// src/constants/TryonAssets.ts
export const TRYON_ASSETS = {
  logo: {
    main: '/assets/images/tryonyou/logo/tryonyou_logo_main.png',
    icon: '/assets/images/tryonyou/logo/tryonyou_icon.png',
  },
  pau: {
    fullBody: '/assets/images/tryonyou/pau/pau_avatar_fullbody_01.png',
    mini: '/assets/images/tryonyou/pau/mini/pau_mini_icon.png',
  },
  ui: {
    wardrobe: [
      '/assets/images/tryonyou/ui/wardrobe/ui_wardrobe_grid_desktop.png',
      '/assets/images/tryonyou/ui/wardrobe/ui_wardrobe_detail_mobile.png',
    ],
    fitting: [
      '/assets/images/tryonyou/ui/fitting/ui_fitting_3d_view.png',
    ],
  },
  marketing: {
    hero: [
      '/assets/images/tryonyou/marketing/hero/marketing_hero_homepage_v1.jpg',
    ],
  },
};
```

---

## 5. SCRIPTS DE VALIDACIÓN

### 5.1 INSTALACIÓN

```bash
npm install
```

### 5.2 VALIDAR ASSETS

```bash
npm run check:assets
```

Este script verifica:
- ✅ Nomenclatura correcta
- ✅ Tamaños de archivo
- ✅ Rutas existentes
- ✅ Formatos válidos

### 5.3 IMPORTAR RUTAS

```bash
npm run import:assets
```

Genera automáticamente:
- Archivo TypeScript con todas las rutas
- JSON con metadata de assets

---

## 6. TIPOS TYPESCRIPT

### 6.1 DEFINICIONES

```typescript
type TryonImage = string;

interface TryonImageMap {
  ui: {
    wardrobe: TryonImage[];
    fitting: TryonImage[];
    recommendations: TryonImage[];
    onboarding: TryonImage[];
  };
  outfits: {
    female: TryonImage[];
    male: TryonImage[];
  };
  marketing: {
    hero: TryonImage[];
    community: TryonImage[];
    testimonials: TryonImage[];
  };
  storytelling: {
    problem: TryonImage[];
    beforeAfter: TryonImage[];
    lifestyle: TryonImage[];
  };
  retail: TryonImage[];
  concepts: {
    editorial: TryonImage[];
  };
  fashion: TryonImage[];
  logo: {
    main: TryonImage;
    icon: TryonImage;
  };
  pau: {
    fullBody: TryonImage;
    mini: TryonImage;
  };
}
```

### 6.2 USO EN COMPONENTES

```typescript
import { TRYON_ASSETS } from '@/constants/TryonAssets';

const WardrobeScreen = () => {
  const wardrobeImages = TRYON_ASSETS.ui.wardrobe;
  
  return (
    <div>
      {wardrobeImages.map((img, idx) => (
        <img key={idx} src={img} alt="Wardrobe" />
      ))}
    </div>
  );
};
```

---

## 7. OPTIMIZACIÓN PARA WEB

### 7.1 CONVERSIÓN A WEBP

Usar **Vite/Image-Tools** o **Sharp**:

```bash
npx sharp input.png -resize 1200 -quality 90 output.webp
```

### 7.2 RECOMENDACIÓN POR USO

```
UI          → PNG (transparencia)
Landing     → WEBP (compresión)
Social      → JPG (compatibilidad)
```

### 7.3 LAZY LOADING

```javascript
<img 
  src={TRYON_ASSETS.marketing.hero[0]} 
  loading="lazy" 
  alt="Hero" 
/>
```

---

## 8. TEST DE CONTROL DE CALIDAD (QA)

Todos los archivos deben pasar:

### ✔ Test de naming

No debe haber espacios, acentos ni mayúsculas.

```bash
npm run check:naming
```

### ✔ Test de rutas

Ejecutar:

```bash
npm run check:assets
```

(Script proporcionado por Agente 70)

### ✔ Test de peso

- PNG < 2.5 MB
- JPG < 1.8 MB
- WEBP < 500 KB

```bash
npm run check:assets
```

---

## 9. CHECKLIST FINAL PARA INFORMÁTICA

### 📁 Organización
- [ ] Colocar carpetas dentro de `/assets/images/tryonyou/`
- [ ] Crear referencias dentro de `/src/constants/TryonAssets.ts`
- [ ] Validar rutas con `npm run check:assets`

### 🎨 UI
- [ ] Probar UI con imágenes en móviles (iOS/Android)
- [ ] Verificar que el logo no tapa elementos críticos
- [ ] Comprobar lazy loading en componentes

### 🧪 Integración ABVETOS
- [ ] Sincronizar con módulos de recomendación
- [ ] Verificar permisos de lectura de assets
- [ ] Integrar con pipeline de PAU

### 📦 ZIP
- [ ] Descomprimir ZIP final en el repositorio
- [ ] Confirmar rutas relativas correctas
- [ ] Pegar README en `/docs/assets/`

### 🚀 Deploy
- [ ] Build de producción sin errores
- [ ] Assets cargando correctamente en Vercel/Netlify
- [ ] Verificar CDN/cache de imágenes

---

## 10. CONTACTO TÉCNICO

Para dudas de integración:

**Agente 70 – Visual Integration & Orchestration**

**Responsabilidad:**
- ✔ Organización de assets
- ✔ Control de calidad visual
- ✔ Coherencia de nomenclatura
- ✔ Entregables para desarrollo

---

## 11. COMANDOS RÁPIDOS

```bash
# Instalar dependencias
npm install

# Validar todos los assets
npm run check:assets

# Generar archivo de rutas TypeScript
npm run import:assets

# Build de producción
npm run build

# Preview de producción
npm run preview
```

---

## 12. TROUBLESHOOTING

### Problema: Imágenes no se cargan en producción

**Solución:**
- Verificar que las rutas comienzan con `/assets/` (públicas)
- Confirmar que los archivos están en `/public/assets/` o `/assets/`
- Revisar configuración de Vite en `vite.config.js`

### Problema: Archivos muy pesados

**Solución:**
```bash
# Comprimir PNGs
npx sharp input.png -o output.png --quality 90

# Convertir a WEBP
npx sharp input.jpg -o output.webp --quality 85
```

### Problema: Nombres de archivo inválidos

**Solución:**
Ejecutar el script de renombrado automático:
```bash
npm run fix:naming
```

---

## 13. VERSIONADO

**Versión actual:** 1.0.0  
**Fecha:** 2024  
**Agente responsable:** Agente 70  
**Paquete:** TryOnYou 70 Image Pack  

---

🟩 **README Técnico completado.**

Para implementación completa de scripts y utilidades, ver:
- `/scripts/check-assets.js` - Validación de assets
- `/scripts/import-assets.js` - Generación de rutas
- `/src/constants/TryonAssets.ts` - Definiciones TypeScript
- `/docs/assets/tryonyou-assets.json` - Manifest JSON

---
