# TRYONYOU Visual Guide — Versión 1.0

**Guía definitiva de diseño visual para el ecosistema TRYONYOU**

---

## 📋 Tabla de Contenidos

1. [Modelos Oficiales](#modelos-oficiales)
2. [Pau - Asistente Visual](#pau---asistente-visual)
3. [Cuatríptico TRYONYOU](#cuatríptico-tryonyou)
4. [Reglas de Composición](#reglas-de-composición)
5. [Paleta de Colores](#paleta-de-colores)
6. [Tipografía](#tipografía)
7. [Espaciado y Layout](#espaciado-y-layout)
8. [Animaciones y Transiciones](#animaciones-y-transiciones)
9. [Especificaciones Técnicas](#especificaciones-técnicas)

---

## 👤 Modelos Oficiales

### Modelo Femenino

**Características principales:**
- **Estilo**: Realista, elegante, editorial
- **Tono de piel**: Rojizo/cálido
- **Proporción**: Cuerpo completo, proporciones naturales
- **Calzado**: SIEMPRE visible (zapatos, zapatillas, botas)
- **Estética**: Profesional, premium, no plástico ni muñeco

**Vistas requeridas:**
1. **Primer plano** (cara y hombros)
   - Expresión neutral pero agradable
   - Iluminación facial uniforme
   - Enfoque en rostro

2. **Cuerpo frontal completo**
   - De cabeza a pies
   - Postura natural, ligeramente frontal
   - Brazos ligeramente separados del cuerpo
   - Zapatos completamente visibles

3. **Cuerpo espalda completo**
   - Vista posterior completa
   - Postura natural
   - Cabello visible
   - Zapatos visibles

**Especificaciones de archivo:**
- Archivo: `model-female-official.jpg`
- Resolución mínima: 2000x3000px
- Formato: JPG alta calidad (90-95%)
- Fondo: Blanco limpio o gris neutro (#F5F5F5)

### Modelo Masculino

**Características principales:**
- **Estilo**: Realista, elegante, proporcionado
- **Proporción**: Cuerpo completo, atlético pero natural
- **Calzado**: SIEMPRE visible
- **Estética**: Profesional, premium, contemporáneo

**Vistas requeridas:**
1. **Primer plano** (cara y hombros)
2. **Cuerpo frontal completo**
3. **Cuerpo espalda completo**

**Especificaciones de archivo:**
- Archivo: `model-male-official.jpg`
- Resolución mínima: 2000x3000px
- Formato: JPG alta calidad (90-95%)
- Fondo: Blanco limpio o gris neutro (#F5F5F5)

---

## 🦚 Pau - Asistente Visual

### Concepto

Pau es el asistente visual del sistema TRYONYOU. Su función es guiar al usuario de manera discreta y elegante, sin ser protagonista.

**Nombre completo**: Pau (diminutivo de Peacock - pavo real)

### Características visuales

- **Color**: Blanco (#FFFFFF) o tonos muy claros (#F0F0F0 - #FAFAFA)
- **Tamaño**: Pequeño (120px - 200px máximo)
- **Estilo**: Apuesto, elegante, minimalista
- **Forma**: Silueta reconocible de pavo real estilizada

### Reglas de posicionamiento

❌ **NUNCA:**
- Encima de ropa
- Encima de personas/modelos
- En el centro de la pantalla
- Ocupando espacio protagónico
- Con tamaño grande o llamativo

✅ **SIEMPRE:**
- En esquina inferior (izquierda o derecha)
- Con espacio propio (mínimo 20px de margen)
- Discreto pero visible
- Con sombra sutil para destacar del fondo
- Interactivo (hover con animación suave)

### Especificaciones técnicas

- **Archivo**: `pau-white-official.png`
- **Formato**: PNG con transparencia (alpha channel)
- **Tamaño**: 512x512px (se escala según necesidad)
- **Peso**: < 100KB optimizado
- **Variantes**:
  - Normal: Pau estático
  - Hover: Pau con pequeña animación (alas ligeramente abiertas)
  - Active: Pau destacado cuando hay recomendaciones nuevas

### Estados de Pau

1. **Inactivo**: Blanco puro, opacidad 70%
2. **Hover**: Blanco, opacidad 100%, sombra suave
3. **Con mensaje**: Pequeño badge numérico en esquina superior derecha
4. **Hablando**: Sutil animación de pulso

---

## 📱 Cuatríptico TRYONYOU

### Concepto general

El cuatríptico es una vista horizontal dividida en 4 pantallas que conforman la experiencia completa de Try-On.

**Formato**: Horizontal, 4 pantallas de igual ancho
**Navegación**: Swipe horizontal o botones de navegación
**Responsive**: En móvil, scroll vertical entre pantallas

### Pantalla 1: Identidad Corporal

**Objetivo**: Capturar la identidad física del usuario

**Contenido:**
1. Primer plano (cara) - 1/3 superior
2. Cuerpo frontal completo - 1/3 medio
3. Cuerpo espalda completo - 1/3 inferior

**Layout:**
```
┌────────────────────┐
│   Primer Plano     │ ← Vista facial
├────────────────────┤
│  Cuerpo Frontal    │ ← Vista frontal completa
├────────────────────┤
│  Cuerpo Espalda    │ ← Vista posterior completa
└────────────────────┘
```

**Elementos:**
- Título: "Tu Identidad Corporal"
- Botón: "Continuar a Try-On →"
- Sin Pau (solo en pantallas 2-4)

### Pantalla 2: Try-On (Pantalla de Pau)

**Objetivo**: Probar prendas virtualmente

**Contenido:**
- Modelo completo (70% del ancho)
- Panel de prendas (30% del ancho, lado derecho)
- Pau en esquina inferior izquierda

**Layout:**
```
┌──────────────────┬──────┐
│                  │      │
│                  │ Top  │
│     Modelo       │      │
│    Completo      ├──────┤
│                  │ Bot  │
│                  │ tom  │
│   [Pau]          │      │
└──────────────────┴──────┘
```

**Reglas:**
- Zapatos SIEMPRE visibles en el modelo
- Prendas en scroll vertical (NO horizontal)
- Cada prenda tiene espacio propio (no amontonadas)
- Pau pequeño, esquina inferior izquierda
- Fondo limpio, premium

**Panel de prendas:**
- Scroll vertical suave
- Cada prenda: Imagen + nombre + precio
- Hover: Zoom sutil
- Click: Aplicar al modelo
- Categorías: Tops, Bottoms, Zapatos, Accesorios

### Pantalla 3: Recomendaciones de Pau

**Objetivo**: Mostrar outfits sugeridos por IA

**Contenido:**
- Grid de outfits (2x2 o 3x2)
- Comentarios de Pau
- Registro de decisiones de estilo

**Layout:**
```
┌──────────┬──────────┬──────────┐
│ Outfit 1 │ Outfit 2 │ Outfit 3 │
│  💬 IA   │  💬 IA   │  💬 IA   │
├──────────┼──────────┼──────────┤
│ Outfit 4 │ Outfit 5 │ Outfit 6 │
│  💬 IA   │  💬 IA   │  💬 IA   │
└──────────┴──────────┴──────────┘
     [Pau - esquina inferior]
```

**Elementos:**
- Cada outfit: Imagen completa del look
- Comentario IA: Texto corto (max 2 líneas)
- Rating: Match % con el usuario
- Botón: "Probar este look"
- Pau presente, esquina inferior

**Comentarios IA (ejemplos):**
- "Este look potencia tu elegancia natural"
- "Perfecto para tu tipo de cuerpo"
- "Colores que complementan tu tono de piel"

### Pantalla 4: Opciones Premium / Wardrobe

**Objetivo**: Guardar y gestionar outfits favoritos

**Contenido:**
- Outfits guardados
- Preferencias del usuario
- Funciones premium

**Layout:**
```
┌───────────────────────────┐
│  Mis Outfits Guardados    │
├─────────┬─────────┬───────┤
│ Saved 1 │ Saved 2 │ Saved │
├─────────┼─────────┼───────┤
│         Preferencias      │
│  [Colores favoritos]      │
│  [Estilos preferidos]     │
│  [Marcas favoritas]       │
└───────────────────────────┘
```

**Funciones:**
- Guardar outfits actuales
- Ver historial de pruebas
- Configurar preferencias
- Acceso a funciones premium

---

## 🎨 Reglas de Composición

### Principios fundamentales

1. **Cuerpo completo SIEMPRE**
   - Nunca recortar pies o zapatos
   - Mantener proporciones naturales
   - Vista completa de cabeza a pies

2. **Espaciado generoso**
   - Cada elemento tiene su respiración visual
   - Padding mínimo: 20px entre elementos
   - Nunca elementos amontonados

3. **Jerarquía visual clara**
   - Modelo es protagonista
   - Pau es guía discreta
   - Ropa es contenido principal

4. **Fondos limpios**
   - Blanco (#FFFFFF)
   - Gris muy claro (#F8F8F8)
   - Sin texturas o patterns complejos
   - Estilo editorial, premium

---

## 🎨 Paleta de Colores

### Colores principales

```css
/* Colores de marca TRYONYOU */
--tryonyou-blue: #00A8E8;        /* Azul principal */
--tryonyou-darkblue: #003459;    /* Azul oscuro */
--tryonyou-gold: #D4AF37;        /* Dorado premium */
--tryonyou-metallic: #8B92A0;    /* Metálico */
--tryonyou-black: #0A0A0A;       /* Negro profundo */
--tryonyou-smoke: #1A1A2E;       /* Gris humo */

/* Colores de fondo */
--bg-primary: #FFFFFF;           /* Fondo blanco */
--bg-secondary: #F8F8F8;         /* Gris muy claro */
--bg-card: #FAFAFA;              /* Tarjetas */

/* Pau colors */
--pau-white: #FFFFFF;            /* Pau principal */
--pau-glow: rgba(255,255,255,0.8); /* Glow de Pau */
--pau-shadow: rgba(0,0,0,0.1);   /* Sombra de Pau */
```

### Uso de colores

- **Modelo/Ropa**: Colores reales, sin filtros
- **Pau**: Siempre blanco o tonos muy claros
- **Fondos**: Blancos o grises neutros
- **Acentos**: Azul TRYONYOU para botones/links
- **Premium**: Dorado para funciones especiales

---

## ✍️ Tipografía

### Fuentes

**Fuente principal**: Inter, sans-serif
**Fuente secundaria**: Playfair Display (títulos premium)

### Jerarquía

```css
/* Títulos */
h1 { font-size: 48px; font-weight: 700; }
h2 { font-size: 36px; font-weight: 600; }
h3 { font-size: 24px; font-weight: 600; }

/* Cuerpo */
body { font-size: 16px; font-weight: 400; line-height: 1.6; }

/* Pequeño */
small { font-size: 14px; font-weight: 400; }

/* Comentarios IA */
.ai-comment { font-size: 14px; font-style: italic; color: #666; }
```

---

## 📏 Espaciado y Layout

### Grid System

- **Desktop**: 12 columnas
- **Tablet**: 8 columnas  
- **Mobile**: 4 columnas

### Espaciado

```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 32px;
--space-xl: 48px;
--space-xxl: 64px;
```

### Márgenes

- Entre elementos: 20px mínimo
- Padding de tarjetas: 24px
- Margen Pau del borde: 20px
- Separación prendas: 16px vertical

---

## ✨ Animaciones y Transiciones

### Tiempos

```css
--transition-fast: 0.15s;
--transition-normal: 0.3s;
--transition-slow: 0.5s;
```

### Efectos

**Hover en prendas:**
```css
transition: transform 0.3s ease;
transform: scale(1.05);
```

**Pau hover:**
```css
transition: all 0.3s ease;
opacity: 1;
filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
```

**Cambio de modelo:**
```css
transition: opacity 0.5s ease;
```

---

## 🔧 Especificaciones Técnicas

### Imágenes

**Modelos:**
- Formato: JPG
- Resolución: 2000x3000px mínimo
- Calidad: 90-95%
- Peso: < 500KB (optimizado)

**Pau:**
- Formato: PNG con alpha
- Resolución: 512x512px
- Peso: < 100KB

**Prendas:**
- Formato: JPG o PNG
- Resolución: 800x1200px
- Peso: < 200KB cada una

### Performance

- Lazy loading para imágenes
- Progressive loading para modelos
- Optimización de animaciones (GPU)
- Caching de assets

### Accesibilidad

- Alt text para todas las imágenes
- Contraste mínimo 4.5:1
- Navegación por teclado
- Screen reader friendly

---

## ✅ Checklist de Implementación

### Assets
- [ ] Modelo femenino oficial (3 vistas)
- [ ] Modelo masculino oficial (3 vistas)
- [ ] Pau blanco oficial (PNG)
- [ ] Imágenes de prendas optimizadas
- [ ] Fondos limpios preparados

### Componentes
- [ ] FemaleModel component
- [ ] MaleModel component
- [ ] PauAssistant component
- [ ] ClothingItem component
- [ ] OutfitCard component

### Pantallas
- [ ] Pantalla 1: Identidad Corporal
- [ ] Pantalla 2: Try-On con Pau
- [ ] Pantalla 3: Recomendaciones
- [ ] Pantalla 4: Premium/Wardrobe

### Funcionalidades
- [ ] Navegación entre pantallas
- [ ] Cambio de prendas en modelo
- [ ] Sistema de recomendaciones IA
- [ ] Guardado de outfits
- [ ] Animaciones fluidas

### Testing
- [ ] Responsive mobile/tablet/desktop
- [ ] Cross-browser compatibility
- [ ] Performance optimization
- [ ] Accesibilidad (A11y)

---

**Versión**: 1.0  
**Última actualización**: 2025  
**Estado**: Oficial - Listo para implementación
