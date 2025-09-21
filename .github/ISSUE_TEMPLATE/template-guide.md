---
name: "❓ ¿Qué template usar?"
about: Guía para elegir el template correcto de issue
title: '[GUIA] - Consulta antes de crear issue'
labels: question
assignees: ''
---

# 📋 Guía de Templates de Issues

## 🚨 NUEVO: Sistema de Validación Automática

**⚠️ IMPORTANTE**: A partir de ahora, los issues con placeholder text serán automáticamente detectados y cerrados.

### ¿Qué detecta el sistema?
- Títulos con texto como "SCOPE", "REPLACE_WITH_*"
- Contenido con múltiples placeholders sin reemplazar
- Templates no completados apropiadamente

### ¿Qué ocurre si mi issue tiene placeholders?
1. Se etiqueta automáticamente como `needs-template-completion` 
2. Recibes un comentario explicativo con instrucciones
3. Tienes **48 horas** para corregir el issue
4. Si no se corrige, se cierra automáticamente

## 🎯 ¿Qué template usar?

### 🚀 Feature Request
**Úsalo cuando:** Quieras proponer una nueva funcionalidad
**Ejemplo:** "Necesitamos un sistema de recomendaciones de ropa"
**Template:** `feat(scope): descripción breve`

### 🐛 Bug Report  
**Úsalo cuando:** Algo no funciona como debería
**Ejemplo:** "El botón de login no responde en móvil"
**Template:** `fix(scope): descripción del bug`

### 📚 Documentation
**Úsalo cuando:** Falta o necesita mejora la documentación
**Ejemplo:** "Falta documentar la API de recomendaciones"
**Template:** `docs(scope): descripción breve`

## 🎨 Scopes Válidos

Elige el scope que mejor describe el área del cambio:

- **`core`** - Funcionalidad principal del sistema
- **`ui`** - Interfaz de usuario (botones, formularios, pantallas)
- **`api`** - Endpoints y servicios backend
- **`auth`** - Autenticación y autorización
- **`db`** - Base de datos y persistencia
- **`deploy`** - Despliegue y configuración
- **`config`** - Archivos de configuración
- **`docs`** - Documentación
- **`test`** - Testing y pruebas
- **`avbetos`** - Sistema AVBETOS específico
- **`tryonme`** - Funcionalidad TryOnMe
- **`tryonyou`** - Funcionalidad TryOnYou  
- **`health`** - Health checks y monitoring
- **`workflow`** - GitHub Actions y workflows

## ✅ Ejemplos de Títulos Correctos

```
feat(tryonme): add virtual wardrobe feature
fix(ui): resolve mobile navigation overlay
docs(api): update recommendation endpoints
feat(auth): implement biometric authentication
fix(db): resolve user preferences query timeout
```

## ❌ Títulos a Evitar

```
feat(SCOPE): REPLACE_WITH_BRIEF_DESCRIPTION  # ❌ Placeholders sin reemplazar - SE CIERRA AUTOMÁTICAMENTE
fix(scope): descripción breve                # ❌ Demasiado genérico  
Feature request                              # ❌ No sigue formato
add new feature                              # ❌ Sin scope ni tipo
feat(invalid): something                     # ❌ Scope no válido
```

## 💡 Consejos para Evitar Cierres Automáticos

1. **Reemplaza TODOS los placeholders**: Cambia "SCOPE" por un scope real como "ui" o "api"
2. **Sé específico**: En lugar de "descripción breve", usa "add user authentication system"
3. **Completa el template**: Rellena todas las secciones del template con información real
4. **Revisa antes de enviar**: Asegúrate de que no quede texto como "REPLACE_WITH_*"
5. **Un issue, una funcionalidad**: No mezcles múltiples cambios en un issue

---

**¿Aún tienes dudas?** Consulta:
- [Conventional Commits Guide](../CONVENTIONAL_COMMITS.md)
- [Contributing Guidelines](../CONTRIBUTING.md)