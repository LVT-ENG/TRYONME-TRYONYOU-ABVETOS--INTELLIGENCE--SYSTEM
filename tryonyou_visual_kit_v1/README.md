# TRYONYOU Visual Kit — Versión 1.0

Este kit establece la identidad visual oficial del ecosistema TRYONYOU.  
Contiene los modelos definitivos (mujer y hombre), el Pau blanco oficial, la estructura del cuatríptico y las directrices completas de diseño, composición y presentación.

Este material se utiliza para:
- Desarrollo de UI/UX
- Creación de la landing page
- Montaje de la demo visual
- Integración con frontend (Next.js / React)
- Guía para equipo de diseño, IA y marketing

---

## 📁 Contenido del Kit

### **1. Modelos oficiales**
- Mujer realista, piel roja, elegante, editorial.
- Hombre realista, elegante, proporcionado.
- Zapatos siempre visibles.
- Nunca estética plástica ni muñeco.

### **2. Pau — versión blanca definitiva**
- Blanco, pequeño, apuesto, elegante.
- Nunca encima de ropa ni personas.
- Siempre discreto, con espacio propio.
- Guía visual del usuario, no protagonista.

### **3. Cuatríptico TRYONYOU (vista horizontal en 4 pantallas)**
1. **Identidad corporal**
   - Primer plano (cara)
   - Cuerpo frontal completo
   - Cuerpo espalda completo
2. **Try-On (Pantalla de Pau)**
   - Modelo completo + ropa ordenada
   - Zapatos visibles
   - Pau pequeño en esquina inferior
   - Prendas desplazables verticalmente (sin amontonarse)
3. **Recomendaciones de Pau**
   - Outfits sugeridos
   - Comentarios de IA
   - Registro de decisiones de estilo
4. **Opciones Premium / Wardrobe**
   - Guardado de outfits
   - Preferencias del usuario

---

## 📐 Reglas principales de estilo

- La modelo/macho debe aparecer SIEMPRE de cuerpo completo.
- Los zapatos siempre visibles.
- La ropa nunca se amontona.
- Cada prenda tiene su espacio y su respiración visual.
- Pau blanco, pequeño, elegante, jamás sobre objetos o personas.
- Fondo limpio, premium, estilo editorial.
- Composición proporcionada para pantallas móviles y formato horizontal.

---

## 🗂 Estructura recomendada de carpetas

```
tryonyou_visual_kit_v1/
├── README.md
├── brand-guidelines/
│   ├── tryonyou-visual-guide-v1.md
│   ├── pau-white-official.png
│   ├── model-female-official.jpg
│   └── model-male-official.jpg
├── ui-mockups/
│   ├── screen-1-identity.png
│   ├── screen-2-tryon.png
│   ├── screen-3-recommendations.png
│   └── screen-4-options.png
└── assets/
    ├── pau/
    ├── shoes/
    ├── clothing/
    └── backgrounds/
```

---

## 🔗 Issue relacionado

Este Kit corresponde al **Issue LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1211** del repositorio principal.

Incluye directrices visuales + estructura de UI que servirán para desarrollar la primera versión pública de TRYONYOU.

---

## 👨‍💻 Uso del Kit para desarrolladores

### Integración con el proyecto

Este kit visual debe ser utilizado en conjunto con el proyecto principal TRYONYOU:

1. **Crear los componentes de UI del cuatríptico**
   - Implementar las 4 pantallas según el diseño especificado
   - Usar los modelos oficiales de mujer y hombre
   - Integrar Pau blanco como asistente visual

2. **Integrar los modelos oficiales en el flujo de Try-On**
   - Usar las imágenes oficiales de modelos de `brand-guidelines/`
   - Asegurar que los zapatos siempre sean visibles
   - Mantener proporciones de cuerpo completo

3. **Implementar Pau blanco como asistente visual**
   - Ubicar en esquina inferior (nunca sobre ropa o personas)
   - Mantener tamaño pequeño y discreto
   - Usar como guía visual, no como protagonista

4. **Diseñar la landing y páginas principales**
   - Seguir las reglas visuales establecidas
   - Usar fondos limpios, premium, estilo editorial
   - Mantener composición proporcionada para móvil y horizontal

### Estructura de componentes React

```jsx
// Ejemplo de estructura de componentes
src/
├── components/
│   ├── models/
│   │   ├── FemaleModel.jsx
│   │   └── MaleModel.jsx
│   ├── pau/
│   │   └── PauAssistant.jsx
│   ├── quadriptych/
│   │   ├── IdentityScreen.jsx
│   │   ├── TryOnScreen.jsx
│   │   ├── RecommendationsScreen.jsx
│   │   └── PremiumOptions.jsx
│   └── ...
```

### Integración de assets

Los assets del kit visual deben ser copiados a la carpeta `/public/assets/` del proyecto principal:

```bash
# Copiar assets del kit al proyecto
cp -r tryonyou_visual_kit_v1/assets/* public/assets/
cp -r tryonyou_visual_kit_v1/brand-guidelines/pau-white-official.png public/assets/pau/
cp tryonyou_visual_kit_v1/brand-guidelines/model-*.jpg public/assets/models/
```

---

## 🎨 Especificaciones técnicas

### Modelos

- **Formato**: JPG de alta calidad (mínimo 1920x1080px)
- **Aspectos clave**:
  - Cuerpo completo visible
  - Zapatos siempre en cuadro
  - Fondo limpio y neutro
  - Iluminación profesional, estilo editorial

### Pau (asistente visual)

- **Formato**: PNG con transparencia
- **Tamaño**: 120x120px - 200x200px (pequeño y discreto)
- **Color**: Blanco (#FFFFFF) o tonos claros
- **Posicionamiento**: Esquina inferior (izquierda o derecha)
- **Margin**: Mínimo 20px de separación de bordes

### UI Mockups

- **Formato**: PNG de alta fidelidad
- **Resolución**: 1920x1080px (desktop), 375x812px (mobile)
- **Orientación**: Horizontal para cuatríptico
- **Diseño**: Limpio, premium, espaciado generoso

---

## 📱 Responsive Guidelines

### Mobile (< 640px)
- Cuatríptico en scroll vertical
- Modelo a tamaño completo
- Pau en esquina inferior derecha
- Prendas en carrusel vertical

### Tablet (640px - 1024px)
- Cuatríptico en 2x2 grid
- Modelos proporcionados
- Pau mantiene posición fija

### Desktop (> 1024px)
- Cuatríptico horizontal completo (4 pantallas)
- Vista panorámica optimizada
- Interacciones fluidas entre pantallas

---

## 🎯 Checklist de implementación

### Fase 1: Setup
- [ ] Copiar assets del kit al proyecto principal
- [ ] Crear componentes base (FemaleModel, MaleModel, PauAssistant)
- [ ] Configurar rutas para las 4 pantallas del cuatríptico

### Fase 2: Pantalla 1 - Identidad Corporal
- [ ] Implementar vista de primer plano (cara)
- [ ] Implementar vista frontal completa
- [ ] Implementar vista de espalda completa
- [ ] Añadir navegación entre vistas

### Fase 3: Pantalla 2 - Try-On
- [ ] Integrar modelo completo
- [ ] Implementar sistema de ropa ordenada
- [ ] Asegurar visibilidad de zapatos
- [ ] Añadir Pau en esquina inferior
- [ ] Implementar scroll vertical de prendas

### Fase 4: Pantalla 3 - Recomendaciones
- [ ] Implementar grid de outfits sugeridos
- [ ] Integrar comentarios de IA
- [ ] Añadir sistema de registro de decisiones

### Fase 5: Pantalla 4 - Premium/Wardrobe
- [ ] Implementar guardado de outfits
- [ ] Añadir gestión de preferencias
- [ ] Integrar funciones premium

### Fase 6: Refinamiento
- [ ] Optimizar para móvil
- [ ] Añadir animaciones fluidas
- [ ] Testing cross-browser
- [ ] Performance optimization

---

## 📄 Licencia interna

Este kit es propiedad intelectual del ecosistema TRYONYOU y solo debe ser utilizado por los equipos autorizados de diseño, IA, frontend, backend y socios tecnológicos.

**Restricciones de uso:**
- ✅ Uso interno para desarrollo del producto TRYONYOU
- ✅ Compartir con colaboradores autorizados del proyecto
- ✅ Modificaciones para mejorar la implementación
- ❌ Distribución pública o comercial externa
- ❌ Uso en proyectos no relacionados con TRYONYOU
- ❌ Compartir con terceros sin autorización

---

## 📞 Contacto

Para preguntas sobre este kit visual o su implementación:
- **Repositorio**: [LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM)
- **Issue**: #1211

---

**Versión**: 1.0  
**Fecha**: 2025  
**Estado**: Oficial - Listo para implementación
