# 📋 INVENTARIO DE IMÁGENES PARA EDICIÓN

## 🎯 Objetivo
Este documento lista todas las imágenes existentes que necesitan ser editadas según las especificaciones de diseño.

---

## 📂 Imágenes Existentes en `/public/assets/images/`

### Fondos y Backgrounds
| Archivo | Tipo | Prioridad | Requiere PAU | Requiere Logo | Categoría |
|---------|------|-----------|--------------|---------------|-----------|
| `bg.jpeg` | Fondo general | Alta | No | Sí | UI |
| `wardrobe-bg.jpeg` | Fondo armario | Alta | Sí | Sí | UI/Wardrobe |
| `showroom-bg.png` | Fondo showroom | Alta | Sí | Sí | UI/Showroom |
| `my-avatar-bg.png` | Fondo avatar | Alta | Sí | Sí | UI/Avatar |
| `peacock-bg.jpeg` | Fondo PAU | Alta | Sí | Sí | UI/Peacock |

### Prendas de Ropa
| Archivo | Tipo | Prioridad | Requiere PAU | Requiere Logo | Categoría |
|---------|------|-----------|--------------|---------------|-----------|
| `silk-blouse.jpeg` | Prenda | Media | No | Sí | Wardrobe |
| `jeans.jpeg` | Prenda | Media | No | Sí | Wardrobe |
| `midi-dress.jpeg` | Prenda | Media | No | Sí | Wardrobe |
| `dress.jpeg` | Prenda | Media | No | Sí | Wardrobe |
| `pant-coat.jpeg` | Prenda | Media | No | Sí | Wardrobe |

### Imágenes UI/Mockups (Códigos UUID)
| Archivo | Descripción Estimada | Prioridad | Requiere PAU | Requiere Logo | Categoría |
|---------|---------------------|-----------|--------------|---------------|-----------|
| `5033D97E-6E8D-445B-B77E-6738E8CD974C.jpeg` | UI Element | Alta | ? | Sí | UI |
| `54352651-A98A-48EA-BB50-696BF892957D.png` | UI Element | Alta | ? | Sí | UI |
| `8016CE85-8BA7-4DBC-AA48-FB6344253472.jpeg` | UI Element | Alta | ? | Sí | UI |
| `9790F68A-42C1-440F-9A09-2E2D41142AF8.png` | UI Element | Alta | ? | Sí | UI |
| `A281609D-C6CC-4092-BD2F-24520C798446.jpeg` | UI Element | Alta | ? | Sí | UI |
| `A41D2189-E580-48FF-87D6-CF016BF50D51.jpeg` | UI Element | Alta | ? | Sí | UI |
| `D6FE88A2-2E68-451D-8937-7868FB5A0EB5.jpeg` | UI Element | Alta | ? | Sí | UI |
| `E401A25E-BC3A-4E2A-91FB-89C8A7F6D350.png` | UI Element | Alta | ? | Sí | UI |
| `E484B241-301A-450E-A7C9-98E824E1FF80.png` | UI Element | Alta | ? | Sí | UI |

### Otros
| Archivo | Tipo | Prioridad | Requiere PAU | Requiere Logo | Categoría |
|---------|------|-----------|--------------|---------------|-----------|
| `template.jpeg` | Template | Baja | No | Sí | Template |

---

## 📂 Imágenes en `/demo/assets/`

| Archivo | Descripción | Prioridad | Requiere PAU | Requiere Logo | Categoría |
|---------|-------------|-----------|--------------|---------------|-----------|
| `mockup_clienta_real_espejo.png` | Mockup cliente espejo | Alta | Sí | Sí | Marketing |
| `mockup_escaparate_vertical.png` | Mockup escaparate | Alta | Sí | Sí | Marketing |
| `mockup_pau_tryon_button.png` | Mockup PAU botón | Alta | Sí | Sí | UI |

---

## 📂 Logos en `/public/assets/logo/`

| Archivo | Descripción | Necesita Edición | Notas |
|---------|-------------|------------------|-------|
| `logo.png` | Logo TryOnYou | No | Este se usa para añadir a otras imágenes |
| `peak.png` | Logo/Icon | Revisar | Puede necesitar optimización |
| `peak.jpeg` | Logo/Icon | Revisar | Puede necesitar optimización |

---

## 📂 Imágenes en `/public/hero/`

| Archivo | Descripción | Prioridad | Requiere PAU | Requiere Logo | Categoría |
|---------|-------------|-----------|--------------|---------------|-----------|
| `hero_main.jpeg` | Hero principal | Muy Alta | Sí | Sí | Marketing/Hero |

---

## 📂 Imágenes en Root

| Archivo | Descripción | Prioridad | Necesita Edición | Categoría |
|---------|-------------|-----------|------------------|-----------|
| `logo.png` | Logo raíz | Baja | No | Brand |
| `EAD74206-AB72-4A4E-9EDD-1FBAD6E646AB_1_105_c.jpeg` | Imagen misc | Media | Sí | Misc |

---

## 📊 Resumen Estadístico

### Total de Imágenes Identificadas
- **Fondos/Backgrounds**: 5 imágenes
- **Prendas**: 5 imágenes
- **UI Elements**: 9 imágenes
- **Demo/Mockups**: 3 imágenes
- **Hero**: 1 imagen
- **Logos**: 3 archivos
- **Misc**: 1 imagen

**Total**: ~27 imágenes para revisar y editar

### Priorización
- **Muy Alta**: 1 imagen (Hero)
- **Alta**: 17 imágenes (Fondos + UI + Mockups)
- **Media**: 6 imágenes (Prendas + Misc)
- **Baja**: 3 archivos (Templates + Logos)

---

## 📝 Tareas Recomendadas

### Fase 1: Inspección Visual (URGENTE)
- [ ] Revisar cada imagen con código UUID para identificar contenido
- [ ] Clasificar imágenes por categoría real (UI, Marketing, etc.)
- [ ] Determinar cuáles realmente requieren PAU
- [ ] Verificar calidad y resolución de cada imagen

### Fase 2: Preparación
- [ ] Crear backups de todas las imágenes originales
- [ ] Renombrar imágenes UUID con nombres descriptivos
- [ ] Organizar en carpetas por categoría
- [ ] Verificar que se tiene el logo TryOnYou en alta calidad
- [ ] Verificar que se tiene el diseño del PAU

### Fase 3: Edición
- [ ] Editar imágenes de prioridad Muy Alta (Hero)
- [ ] Editar imágenes de prioridad Alta (Fondos + UI)
- [ ] Editar imágenes de prioridad Media (Prendas)
- [ ] Revisar y aprobar todas las ediciones

### Fase 4: Exportación y Organización
- [ ] Exportar todas las imágenes editadas con nomenclatura correcta
- [ ] Colocar en estructura de carpetas `docs/assets/edited_images/`
- [ ] Crear versiones optimizadas para web
- [ ] Documentar cambios realizados

---

## 🔍 Acción Inmediata Requerida

**ANTES de comenzar la edición masiva:**

1. **Inspeccionar visualmente** cada imagen UUID para entender su contenido
2. **Crear documento de mapeo** UUID → Nombre descriptivo
3. **Validar con cliente/stakeholder** qué imágenes son las "enviadas por Rubén"
4. **Confirmar diseño final del PAU** (¿existe ya o hay que crearlo?)
5. **Confirmar versión del logo** a usar en las ediciones

---

## 📅 Notas de Progreso

### [Fecha] - Inspección Inicial
- Inventario creado
- Pendiente: Inspección visual de imágenes UUID
- Pendiente: Confirmación de diseño PAU

### [Fecha] - Clasificación Completada
- [ ] Todas las imágenes clasificadas
- [ ] Nombres descriptivos asignados
- [ ] Prioridades confirmadas

### [Fecha] - Edición en Progreso
- [ ] Imágenes de prioridad Muy Alta completadas
- [ ] Imágenes de prioridad Alta completadas
- [ ] Imágenes de prioridad Media completadas

---

**Última actualización**: Diciembre 2025  
**Estado**: Inventario inicial creado - Pendiente inspección visual  
**Proyecto**: TRYONYOU - AGENTE 70 - Issue #1202
