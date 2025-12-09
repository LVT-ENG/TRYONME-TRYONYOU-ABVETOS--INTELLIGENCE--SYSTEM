# 🎨 GUÍA RÁPIDA DE EDICIÓN - TRYONYOU

Referencia rápida para editores de imágenes.

---

## ⚡ Inicio Rápido

### 1. Antes de Empezar
- [ ] Leer `DESIGN_SPECIFICATIONS.md` completo
- [ ] Verificar que tienes el logo TryOnYou
- [ ] Verificar que tienes el PAU diseñado (si aplica)
- [ ] Crear backup de imagen original

### 2. Workflow por Imagen
```
1. Abrir imagen original
2. Aplicar ajustes base (contraste, color)
3. Añadir logo (esquina inferior derecha, 80-120px)
4. Integrar PAU (si aplica, 15-35% canvas)
5. Aplicar efectos premium
6. Verificar checklist
7. Exportar con nomenclatura correcta
8. Actualizar PROGRESS_TRACKER.md
```

### 3. Exportar
```
Formato: [categoría]_[descripción]_v[num].[ext]
Destino: docs/assets/edited_images/[categoría]/
Calidad JPG: 90-95%
Formato PNG: Para transparencias
```

---

## 🎨 Paleta de Colores

```css
Negro Premium:    #111111  ███
Oro Elegante:     #D4AF37  ███
Azul Neón:        #00E0FF  ███
Blanco Puro:      #FFFFFF  ███
Gris Metalizado:  #8B92A0  ███
```

---

## 📐 Posiciones Clave

### Logo TryOnYou
```
┌─────────────────────────┐
│                         │
│                         │
│                         │
│                         │
│                  [LOGO] │ ← Esquina inferior derecha
└─────────────────────────┘
   Padding: 20-30px
   Tamaño: 80-120px ancho
```

### PAU (Pavo Real)
```
Posición según tipo:
- UI/App: Lateral derecho o inferior (15-25%)
- Marketing: Complementa sujeto (20-35%)
- Wardrobe: Junto a armario (15-20%)
```

---

## ✅ Checklist por Imagen

- [ ] Logo TryOnYou en esquina inferior derecha
- [ ] PAU integrado naturalmente (si aplica)
- [ ] Colores siguen paleta oficial
- [ ] Contraste +10-15%
- [ ] Color grading aplicado (tono frío)
- [ ] Sharpness +5-10%
- [ ] Sin pixelación ni artefactos
- [ ] Nomenclatura correcta
- [ ] Exportado en formato correcto
- [ ] Actualizado en PROGRESS_TRACKER.md

---

## 🎯 Categorías de Imágenes

| Categoría | Carpeta Destino | Requiere PAU | Tamaño Típico |
|-----------|----------------|--------------|---------------|
| UI | `ui/` | Generalmente Sí | 1920x1080 |
| Marketing | `marketing/` | Generalmente Sí | 2560x1440 |
| Storytelling | `storytelling/` | A veces | 1920x1080 |
| Wardrobe | `wardrobe/` | No | Variable |
| Fitting | `fitting/` | Sí | 1920x1080 |
| Lifestyle | `lifestyle/` | A veces | Variable |

---

## 🔧 Ajustes Técnicos Estándar

### Photoshop
```
Contraste: +12
Brillo: Ajustar según imagen
Saturación: +5 a +10
Temperatura: -5 (más frío)
Tinte: +2 (ligeramente magenta)
Sharpness: +7
Claridad: +12
Viñeta: -10 (sutil)
```

### Camera Raw / Lightroom
```
Exposure: Ajustar según necesidad (rango: -2 a +2 stops)
Contrast: +15 (rango: -100 a +100)
Highlights: -20 (rango: -100 a +100)
Shadows: +15 (rango: -100 a +100)
Whites: +10 (rango: -100 a +100)
Blacks: -10 (rango: -100 a +100)
Clarity: +12 (rango: -100 a +100)
Vibrance: +10 (rango: -100 a +100)
Saturation: +5 (rango: -100 a +100)
Sharpening: 60 (rango: 0 a 150)
Temperature: -300K (más frío, rango: -5000K a +5000K)
```

---

## 🦚 Variaciones del PAU

| Variación | Uso | Archivo |
|-----------|-----|---------|
| Neutral | Recomendaciones generales | `pau_neutral.png` |
| Presentando | Mostrando prendas | `pau_presenting.png` |
| Aprobando | Confirmaciones positivas | `pau_approving.png` |
| Pensativo | Análisis / cálculos | `pau_thinking.png` |

---

## 📁 Nomenclatura de Archivos

### Formato
```
[categoría]_[descripción]_v[versión].[ext]
```

### Ejemplos
```
✅ ui_wardrobe_main_v1.png
✅ marketing_hero_banner_v2.jpg
✅ storytelling_sizing_problem_v1.jpg
✅ wardrobe_silk_blouse_v1.png
✅ fitting_3d_avatar_v1.png

❌ IMG_1234.jpg
❌ final.png
❌ editado.jpeg
❌ new-version.jpg
```

---

## 🎨 Estilo Visual

### Apple (Minimalismo)
- Espacios en blanco
- Tipografía limpia
- Iconografía simple

### Dior (Lujo)
- Colores sofisticados
- Detalles dorados
- Composición equilibrada

### IA Futurista
- Elementos holográficos
- Glassmorphism
- Glow sutil
- Grid/líneas de datos

---

## 🚨 Errores Comunes a Evitar

- ❌ Logo demasiado grande o pequeño
- ❌ PAU que no encaja con la escena
- ❌ Colores fuera de la paleta
- ❌ Over-sharpening (halos)
- ❌ Artefactos de compresión JPG
- ❌ Fondos inconsistentes
- ❌ Nomenclatura incorrecta
- ❌ No actualizar progress tracker

---

## 📞 ¿Necesitas Ayuda?

### Documentación Completa
- `DESIGN_SPECIFICATIONS.md` - Especificaciones detalladas
- `WORKFLOW.md` - Proceso completo
- `IMAGE_INVENTORY.md` - Lista de imágenes
- `PROGRESS_TRACKER.md` - Seguimiento

### Dudas Comunes

**P: ¿Dónde va el logo exactamente?**
R: Esquina inferior derecha, 20-30px de padding, 80-120px de ancho.

**P: ¿Todas las imágenes necesitan PAU?**
R: No. Ver `IMAGE_INVENTORY.md` para saber cuáles.

**P: ¿Qué hago si la imagen es de baja calidad?**
R: Intentar upscaling con IA (Topaz Gigapixel, etc.) o solicitar original.

**P: ¿PNG o JPG?**
R: PNG para transparencias, JPG para el resto (calidad 90-95%).

**P: ¿Cómo reporto mi progreso?**
R: Actualiza `PROGRESS_TRACKER.md` después de cada imagen.

---

## 🎯 Próximos Pasos

1. **Leer documentación completa** en `image_editing_specs/`
2. **Revisar prioridades** en `IMAGE_INVENTORY.md`
3. **Comenzar con hero_main.jpeg** (prioridad muy alta)
4. **Actualizar tracker** después de cada imagen
5. **Solicitar revisión** cada 5 imágenes completadas

---

## 💡 Tips de Productividad

- **Trabaja por lotes**: Agrupa imágenes similares
- **Crea actions/scripts**: Automatiza ajustes repetitivos
- **Usa smart objects**: Facilita cambios al logo/PAU
- **Guarda .PSD/.AI**: Mantén versiones con capas
- **Haz breaks**: Mantén ojo fresco para QA
- **Pide feedback temprano**: No esperes al final

---

**Para más detalles, consulta la documentación completa en:**
`/docs/assets/image_editing_specs/`

**Última actualización**: Diciembre 2025  
**Versión**: 1.0  
**Proyecto**: TRYONYOU - AGENTE 70 - Issue #1202
