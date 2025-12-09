# UI Mockups - Cuatríptico TRYONYOU

Este directorio contiene los mockups de UI para las 4 pantallas del cuatríptico TRYONYOU.

## Pantallas del Cuatríptico

### Screen 1: Identidad Corporal
**Archivo**: `screen-1-identity.png`

**Contenido:**
- Vista de primer plano (cara)
- Vista de cuerpo frontal completo
- Vista de cuerpo espalda completo

**Especificaciones:**
- Resolución: 1920x1080px (desktop) / 1080x1920px (mobile)
- Formato: PNG alta calidad
- Layout: 3 secciones verticales iguales

**Elementos UI:**
- Título: "Tu Identidad Corporal"
- Indicadores de paso (1/4)
- Botón: "Continuar a Try-On →"
- Sin Pau (solo presente en pantallas 2-4)

---

### Screen 2: Try-On (Pantalla de Pau)
**Archivo**: `screen-2-tryon.png`

**Contenido:**
- Modelo completo (70% del ancho)
- Panel de prendas vertical (30% del ancho)
- Pau en esquina inferior izquierda

**Especificaciones:**
- Resolución: 1920x1080px (desktop) / 1080x1920px (mobile)
- Formato: PNG alta calidad
- Layout: 70/30 split horizontal (desktop) / vertical stack (mobile)

**Elementos UI:**
- Título: "Try-On Virtual"
- Modelo de cuerpo completo con zapatos visibles
- Panel scrollable de prendas (categorizado)
- Pau pequeño en esquina inferior
- Controles de zoom/rotación del modelo
- Botón: "Ver Recomendaciones →"

**Panel de prendas:**
```
├── Categorías (tabs)
│   ├── Tops
│   ├── Bottoms
│   ├── Zapatos
│   └── Accesorios
└── Items (scroll vertical)
    ├── Prenda 1 (imagen + nombre + precio)
    ├── Prenda 2
    └── ...
```

---

### Screen 3: Recomendaciones de Pau
**Archivo**: `screen-3-recommendations.png`

**Contenido:**
- Grid de outfits sugeridos (2x3 o 3x2)
- Comentarios de IA para cada outfit
- Match percentage
- Pau en esquina inferior

**Especificaciones:**
- Resolución: 1920x1080px (desktop) / 1080x1920px (mobile)
- Formato: PNG alta calidad
- Layout: Grid responsive

**Elementos UI:**
- Título: "Recomendaciones de Pau"
- Grid de outfits (cards)
- Cada card incluye:
  - Imagen del outfit completo
  - Comentario IA (2 líneas max)
  - Match % con usuario
  - Botón "Probar"
- Pau discreto en esquina
- Filtros: Ocasión, Estilo, Color

**Ejemplo de card:**
```
┌─────────────────┐
│   [Imagen       │
│    Outfit]      │
├─────────────────┤
│ 💬 "Perfecto    │
│ para tu estilo" │
│ Match: 95% ⭐    │
│ [Probar este]   │
└─────────────────┘
```

---

### Screen 4: Premium/Wardrobe
**Archivo**: `screen-4-options.png`

**Contenido:**
- Outfits guardados del usuario
- Preferencias y configuración
- Funciones premium

**Especificaciones:**
- Resolución: 1920x1080px (desktop) / 1080x1920px (mobile)
- Formato: PNG alta calidad
- Layout: Secciones organizadas

**Elementos UI:**
- Título: "Mi Wardrobe"
- Tabs:
  - Guardados
  - Preferencias
  - Premium
- Sección "Mis Outfits Guardados"
  - Grid de outfits guardados
  - Botón "Editar"/"Eliminar"
- Sección "Preferencias"
  - Colores favoritos
  - Estilos preferidos
  - Marcas favoritas
  - Tallas
- Sección "Premium"
  - Funciones exclusivas
  - Upgrade CTA

---

## Especificaciones generales

### Desktop (Horizontal - 16:9)
- **Resolución**: 1920x1080px
- **Ratio**: 16:9
- **Orientación**: Horizontal
- **Cuatríptico**: 4 pantallas lado a lado (480px cada una)

### Tablet (10" - 16:10)
- **Resolución**: 1280x800px
- **Ratio**: 16:10
- **Layout**: 2x2 grid

### Mobile (Vertical - 9:16)
- **Resolución**: 1080x1920px
- **Ratio**: 9:16
- **Orientación**: Vertical
- **Navegación**: Scroll vertical entre pantallas

## Elementos de diseño comunes

### Navegación entre pantallas
```jsx
// Indicadores de paso
1 ○ → ○ → ○ → ○  // Screen 1
○ → 2 → ○ → ○    // Screen 2
○ → ○ → 3 → ○    // Screen 3
○ → ○ → ○ → 4    // Screen 4
```

### Color scheme
- **Background**: #FFFFFF o #F8F8F8
- **Text primary**: #0A0A0A
- **Text secondary**: #666666
- **Accent**: #00A8E8 (TRYONYOU blue)
- **Premium**: #D4AF37 (Gold)

### Tipografía
- **Títulos**: Inter Bold, 36px
- **Subtítulos**: Inter SemiBold, 24px
- **Body**: Inter Regular, 16px
- **Comentarios IA**: Inter Italic, 14px

### Espaciado
- **Padding cards**: 24px
- **Margin between elements**: 20px
- **Grid gap**: 16px

## Reglas de composición

✅ **Hacer:**
- Modelo siempre de cuerpo completo
- Zapatos siempre visibles
- Pau pequeño en esquina inferior
- Espaciado generoso
- Fondo limpio y premium

❌ **Evitar:**
- Recortar pies o zapatos
- Pau grande o protagonista
- Elementos amontonados
- Fondos distractores
- Composición desequilibrada

## Herramientas recomendadas

**Para crear mockups:**
- Figma (preferido)
- Adobe XD
- Sketch

**Para exportar:**
- PNG @2x para retina displays
- Optimizar con TinyPNG o ImageOptim
- Peso objetivo: < 500KB por mockup

## Nomenclatura de archivos

```
screen-{número}-{nombre}-{variante}.png

Ejemplos:
- screen-1-identity-desktop.png
- screen-1-identity-mobile.png
- screen-2-tryon-desktop.png
- screen-2-tryon-mobile.png
- screen-3-recommendations-desktop.png
- screen-4-options-desktop.png
```

## Checklist de mockups

### Desktop
- [ ] screen-1-identity-desktop.png
- [ ] screen-2-tryon-desktop.png
- [ ] screen-3-recommendations-desktop.png
- [ ] screen-4-options-desktop.png

### Mobile
- [ ] screen-1-identity-mobile.png
- [ ] screen-2-tryon-mobile.png
- [ ] screen-3-recommendations-mobile.png
- [ ] screen-4-options-mobile.png

### Cuatríptico completo
- [ ] quadriptych-full-view-desktop.png (vista horizontal de las 4 pantallas)

## Ejemplo de implementación

```jsx
// React component para el cuatríptico
import Screen1 from './screens/Screen1Identity';
import Screen2 from './screens/Screen2TryOn';
import Screen3 from './screens/Screen3Recommendations';
import Screen4 from './screens/Screen4Options';

function Quadriptych() {
  return (
    <div className="quadriptych-container">
      <Screen1 />
      <Screen2 />
      <Screen3 />
      <Screen4 />
    </div>
  );
}
```

---

**Nota**: Los mockups deben servir como guía visual exacta para la implementación en código. Mantener fidelidad al diseño especificado.
