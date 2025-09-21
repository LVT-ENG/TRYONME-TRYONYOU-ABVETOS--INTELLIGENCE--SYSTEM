# Sistema de Prevención de Issues con Placeholders

## 🎯 Objetivo

Prevenir la creación de issues como #142 que contienen texto de placeholder sin reemplazar, manteniendo la calidad y claridad de los issues del proyecto.

## 🔧 Componentes del Sistema

### 1. Detección Automática (`detect-placeholder-issues.yml`)

**Trigger**: Cuando se crea o edita un issue
**Acción**: 
- Analiza el título y contenido en busca de placeholders
- Detecta patrones como `REPLACE_WITH_*`, `SCOPE`, `<!-- comentarios -->`
- Etiqueta issues problemáticos con `needs-template-completion` e `invalid`
- Añade comentario explicativo con instrucciones de corrección

### 2. Cierre Automático (`auto-close-placeholder-issues.yml`)

**Trigger**: Diariamente a las 9:00 AM UTC + manual
**Acción**:
- Busca issues etiquetados con `needs-template-completion`
- Cierra automáticamente los que tienen más de 48 horas sin corrección
- Añade comentario final con instrucciones para reabrir

### 3. Templates Mejorados

**Cambios**:
- Avisos prominentes sobre el sistema de validación automática
- Instrucciones más claras sobre reemplazo de placeholders
- Ejemplos de títulos válidos e inválidos
- Advertencias sobre cierre automático en 48h

### 4. Guía Actualizada (`template-guide.md`)

**Nuevas secciones**:
- Explicación del sistema de validación automática
- Qué hacer si tu issue es marcado como placeholder
- Consejos para evitar cierres automáticos

## 🚀 Patrones de Detección

### Placeholders en Títulos
- `REPLACE_WITH_BRIEF_DESCRIPTION`
- `REPLACE_WITH_BUG_DESCRIPTION`
- `REPLACE_WITH_DOCS_DESCRIPTION`
- `SCOPE`
- `descripción breve`

### Placeholders en Contenido
- `¿Qué problema resuelve?**: ` (sin contenido después)
- `¿Por qué es necesario ahora?**: `
- `¿Qué valor aporta a los usuarios?**: `
- `Cambios clave**: `
- `Arquitectura/impacto**: `
- `Componentes afectados**: `
- `<!-- Paso específico -->`
- `<!-- Riesgo técnico o de negocio -->`
- Y otros comentarios HTML de placeholder

**Criterio**: Si se detectan 3 o más patrones de placeholder en el contenido, se considera que el template no fue completado apropiadamente.

## 📋 Flujo de Usuario

### Issue Válido
1. Usuario crea issue con template
2. Reemplaza placeholders con información real
3. Issue se procesa normalmente ✅

### Issue con Placeholders
1. Usuario crea issue sin reemplazar placeholders
2. **Inmediatamente**: Sistema detecta placeholders
3. **Automáticamente**: Se añaden labels `needs-template-completion` + `invalid`
4. **Automáticamente**: Se añade comentario con instrucciones
5. **Usuario tiene 48h**: Para corregir título y contenido
6. **Si no se corrige**: Issue se cierra automáticamente
7. **Para reabrir**: Usuario debe corregir y mencionar @LVT-ENG

## 🧪 Testing

### Script de Validación
```bash
npm run validate:templates      # Valida estructura de templates
npm run test:placeholder-detection  # Testa lógica de detección
```

### Casos de Prueba
1. **Issue con título placeholder**: Detectado ❌
2. **Issue con contenido placeholder**: Detectado ❌  
3. **Issue válido**: Aprobado ✅

## 🔧 Configuración

### Labels Necesarios
- `needs-template-completion`: Issues que requieren completar template
- `invalid`: Issues que no siguen el formato correcto

### Permisos de Workflow
- `issues: write`: Para modificar issues y añadir comments
- `contents: read`: Para leer configuración del repo

## 📈 Beneficios

1. **Calidad**: Issues más claros y específicos
2. **Eficiencia**: Menos tiempo revisando issues genéricos
3. **Automatización**: Proceso sin intervención manual
4. **Educativo**: Usuarios aprenden el formato correcto
5. **Escalable**: Sistema funciona independientemente del volumen

## 🛠️ Mantenimiento

### Monitoreo
- Revisar issues etiquetados semanalmente
- Ajustar patrones de detección según necesidad
- Actualizar mensajes de respuesta automática

### Mejoras Futuras
- Integración con conventional commits validation
- Métricas de issues corregidos vs cerrados
- Template inteligente que previene placeholders
- Integración con GitHub Copilot para sugerencias

---

**Implementado para resolver**: #142 - feat(SCOPE): REPLACE_WITH_BRIEF_DESCRIPTION