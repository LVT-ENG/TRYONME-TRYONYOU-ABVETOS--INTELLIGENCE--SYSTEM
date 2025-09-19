---
name: "❓ ¿Qué template usar?"
about: Guía para elegir el template correcto de issue
title: '[GUIA] - Consulta antes de crear issue'
labels: question
assignees: ''
---

# 📋 Guía de Templates de Issues

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
feat(scope): descripción breve           # ❌ Demasiado genérico
Feature request                          # ❌ No sigue formato
add new feature                          # ❌ Sin scope ni tipo
feat(invalid): something                 # ❌ Scope no válido
```

## 💡 Consejos

1. **Sé específico**: En lugar de "mejorar UI", usa "fix(ui): resolve mobile menu overflow"
2. **Un issue, una funcionalidad**: No mezcles múltiples cambios en un issue
3. **Reemplaza placeholders**: No dejes contenido como "descripción breve"
4. **Usa el scope correcto**: Si no estás seguro, revisa la lista de scopes válidos

---

**¿Aún tienes dudas?** Consulta:
- [Conventional Commits Guide](../CONVENTIONAL_COMMITS.md)
- [Contributing Guidelines](../CONTRIBUTING.md)