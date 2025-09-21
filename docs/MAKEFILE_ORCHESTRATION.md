# TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
## Makefile Orchestration System

Este sistema proporciona orquestación automatizada del proyecto TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM mediante un Makefile completo.

## Uso Rápido

```bash
# Ejecutar flujo completo
make all

# Ver ayuda
make help

# Ejecutar pasos individuales
make integrate
make components  
make pau
make docs
make build
make commit
make deploy
```

## Targets Disponibles

### `make all` - Flujo Completo
Ejecuta toda la cadena de orquestación:
1. **integrate** - Integración git y merge de branches
2. **components** - Generación de componentes web
3. **pau** - Renderizado de video Pau Intro
4. **docs** - Generación de documentos PDF
5. **build** - Compilación con Vite
6. **commit** - Commit y push a GitHub
7. **deploy** - Deploy a Vercel con notificaciones

### Targets Individuales

#### `make integrate`
- Fetch y pull desde origin
- Merge automático de branch-4 si existe
- Creación de directorios necesarios

#### `make components`
- Generación de componentes web básicos
- Creación de HomePage.jsx

#### `make pau`
- Renderizado de video Pau Intro con ffmpeg
- Requiere archivos: pau_intro_scene.json, pau_intro.srt, config.json

#### `make docs`
- Generación de documentos PDF
- Crea claims.pdf y customer-journey.pdf

#### `make build`
- Instalación de dependencias npm
- Compilación con Vite

#### `make commit`
- Git add de todos los cambios
- Commit automático
- Push a origin

#### `make deploy`
- Deploy a Vercel con --prebuilt
- Notificaciones automáticas a Telegram
- Obtención de URL de deploy

### Utilidades

#### `make install`
- Instalación de dependencias npm
- Instalación global de Vercel CLI

#### `make clean`
- Limpieza de archivos temporales
- Limpieza de cache

#### `make help`
- Documentación de todos los targets

## Variables de Entorno

Para funcionalidad completa, configurar:

```bash
# Vercel Deploy
export VERCEL_TOKEN="tu_token_vercel"
export VERCEL_PROJECT_ID="tu_project_id"
export VERCEL_ORG_ID="tu_org_id"

# Notificaciones Telegram (opcional)
export TELEGRAM_BOT_TOKEN="tu_bot_token"
export TELEGRAM_CHAT_ID="tu_chat_id"
```

## Dependencias del Sistema

- **npm/node** - Para build y dependencias
- **git** - Para operaciones de versionado
- **vercel CLI** - Para deployment
- **ffmpeg** - Para renderizado de video (opcional)
- **curl** - Para notificaciones Telegram

## Flujo de Trabajo Típico

```bash
# Desarrollo diario
make integrate    # Sincronizar con GitHub
make components   # Generar componentes
make build        # Compilar aplicación
make commit       # Subir cambios

# Deploy completo
make all          # Flujo completo con deploy

# Mantenimiento
make clean        # Limpiar archivos temporales
make install      # Actualizar dependencias
```

## Características

- ✅ **Robusto**: Manejo de errores con `|| true`
- ✅ **Flexible**: Variables automáticas (REPO_DIR, BRANCH)
- ✅ **Completo**: Desde integración hasta deploy
- ✅ **Documentado**: Target help integrado
- ✅ **Notificaciones**: Telegram automático en deploy
- ✅ **Modular**: Targets independientes y combinables

## Arquitectura

```
integrate → components → pau → docs → build → commit → deploy
    ↓           ↓        ↓      ↓       ↓        ↓        ↓
   Git      Web Gen   Video  PDF    Vite    GitHub   Vercel
```

## Personalización

El Makefile puede adaptarse modificando:
- Variables de directorio (REPO_DIR, APP_DIR, etc.)
- Branches de trabajo (BRANCH, REMOTE)
- Comandos de build específicos
- Integraciones adicionales de deploy