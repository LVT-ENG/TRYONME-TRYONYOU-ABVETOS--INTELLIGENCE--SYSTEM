# Gemini Code Assist Setup Guide

## Configuración de Gemini Code Assist para GitHub

Este documento describe los pasos necesarios para configurar Gemini Code Assist con GitHub para el proyecto TRYONYOU.

## Requisitos Previos

### Permisos de IAM en Google Cloud

Para configurar Gemini Code Assist, necesitas solicitar a tu administrador los siguientes roles:

1. **Service Usage Admin** (`roles/serviceusage.serviceUsageAdmin`)
   - Permite administrar servicios de Google Cloud
   - Se puede otorgar desde la consola de Google Cloud

2. **Gemini Code Assist Management - SCM Connection Admin** (`geminicodeassistmanagement.scmConnectionAdmin`)
   - Permite administrar conexiones entre Gemini Code Assist y sistemas de control de versiones
   - **IMPORTANTE**: Este rol NO se puede otorgar desde la consola de Google Cloud
   - Debe otorgarse usando Google Cloud CLI

### Alternativa: Roles Básicos

Si tienes alguno de estos roles básicos, ya tienes los permisos necesarios:
- **Editor** (`roles/editor`)
- **Owner** (`roles/owner`)

## Pasos de Configuración

### 1. Verificar Permisos IAM

Verifica que tienes los permisos necesarios:

```bash
# Verificar roles asignados a tu cuenta
gcloud projects get-iam-policy PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:user:YOUR_EMAIL"
```

### 2. Otorgar Permisos (Administrador)

Si eres administrador y necesitas otorgar permisos a otro usuario:

#### Service Usage Admin (via Console o CLI)

**Opción A: Google Cloud Console**
1. Ve a IAM & Admin > IAM en Google Cloud Console
2. Encuentra al usuario
3. Edita sus roles
4. Añade "Service Usage Admin"

**Opción B: Google Cloud CLI**
```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:USER_EMAIL" \
  --role="roles/serviceusage.serviceUsageAdmin"
```

#### Gemini Code Assist Management Admin (solo CLI)

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:USER_EMAIL" \
  --role="roles/geminicodeassistmanagement.scmConnectionAdmin"
```

### 3. Instalar Gemini Code Assist en GitHub

#### Versión para Consumidor (Consumer Edition)

1. Accede a GitHub Marketplace
2. Busca "Gemini Code Assist"
3. Instala la aplicación en tu organización/repositorio
4. Autoriza los permisos necesarios

#### Versión Empresarial (Enterprise Edition)

1. En Google Cloud Console, ve a Gemini Code Assist
2. Selecciona "Configure GitHub Integration"
3. Sigue el asistente de configuración:
   - Conecta tu organización de GitHub
   - Selecciona los repositorios
   - Configura las preferencias de análisis
4. Verifica la conexión

### 4. Configurar Integración con TRYONYOU

Una vez instalado, configura las preferencias específicas para el proyecto:

```yaml
# .gemini-config.yml (ejemplo)
version: 1
scan:
  enabled: true
  languages:
    - javascript
    - typescript
    - python
  paths:
    - src/
    - modules/
    - apps/
suggestions:
  enabled: true
  auto_complete: true
  context_aware: true
code_review:
  enabled: true
  security_scan: true
```

## Características Disponibles

### 1. Autocompletado Inteligente
- Sugerencias basadas en contexto del proyecto
- Soporte para React, TypeScript, Python
- Integración con estándares del código

### 2. Revisión de Código Automática
- Análisis de seguridad
- Detección de bugs
- Sugerencias de optimización

### 3. Generación de Documentación
- Generación automática de JSDoc
- Comentarios contextuales
- Documentación de APIs

### 4. Refactorización Asistida
- Sugerencias de mejora de código
- Modernización de patrones
- Optimización de rendimiento

## Verificación de la Instalación

Para verificar que Gemini Code Assist está funcionando correctamente:

1. Abre un archivo de código en GitHub
2. Verifica que aparece el icono de Gemini
3. Prueba a escribir un comentario y observa las sugerencias
4. Revisa que el bot de Gemini comenta en PRs

## Uso con el Sistema de Deploy

El script de super-deploy (`scripts/super-deploy.sh`) está optimizado para trabajar con Gemini Code Assist:

```bash
# Ejecutar deploy completo
./scripts/super-deploy.sh

# Con token de Vercel
VERCEL_TOKEN=your_token ./scripts/super-deploy.sh
```

## Personalización del Comportamiento

### Ajustes Recomendados para TRYONYOU

1. **Módulos del Sistema**
   - Configurar contexto de Avatar3D
   - Definir patrones de TextileComparator
   - Establecer reglas para PAU/CAP

2. **Estándares de Código**
   - ES2022+ para JavaScript
   - TypeScript strict mode
   - React Hooks patterns

3. **Seguridad**
   - Escaneo de dependencias
   - Detección de secretos
   - Análisis de vulnerabilidades

## Recursos Adicionales

- [Documentación oficial de Gemini Code Assist](https://cloud.google.com/gemini/docs/code-assist)
- [Guía de integración con GitHub](https://cloud.google.com/gemini/docs/code-assist/github)
- [Best practices para equipos](https://cloud.google.com/gemini/docs/code-assist/best-practices)

## Soporte

Para problemas o preguntas:
- Issues en GitHub: [TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues)
- Email de soporte: Contactar al administrador del proyecto
- Telegram: @abvet_deploy_bot

## Notas Importantes

⚠️ **IMPORTANTE**: 
- El rol `geminicodeassistmanagement.scmConnectionAdmin` NO puede asignarse desde la consola de Google Cloud
- SIEMPRE usa Google Cloud CLI para este rol específico
- Verifica los permisos antes de intentar la configuración
- Mantén actualizada la integración para recibir nuevas características

---

**Última actualización**: 2026-01-04
**Versión**: 1.0.0
**Mantenedor**: LVT-ENG Team
