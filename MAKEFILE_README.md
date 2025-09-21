# TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM Makefile

Este Makefile proporciona orquestación completa de agentes para el proyecto TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM.

## Uso Principal

```bash
make all
```

Este comando ejecuta todo el flujo de trabajo completo.

## Comandos Individuales

- `make integrate` - Integración de código (Git fetch, merge, pull)
- `make components` - Generación de componentes web
- `make pau` - Renderizado de vídeo Pau Intro (requiere ffmpeg y archivos fuente)
- `make docs` - Generación de documentos PDF
- `make build` - Compilación con Vite
- `make commit` - Commit y push a GitHub
- `make deploy` - Deploy a Vercel con notificación Telegram

## Variables de Entorno Requeridas

Para el funcionamiento completo, configura estas variables de entorno:

### Obligatorias para Deploy
- `VERCEL_TOKEN` - Token de autenticación de Vercel
- `VERCEL_PROJECT_ID` - ID del proyecto en Vercel  
- `VERCEL_ORG_ID` - ID de la organización en Vercel

### Opcionales para Notificaciones
- `TELEGRAM_BOT_TOKEN` - Token del bot de Telegram
- `TELEGRAM_CHAT_ID` - ID del chat de Telegram

## Ejemplos de Uso

```bash
# Ejecutar solo la compilación
make build

# Ejecutar todo excepto deploy
make integrate components pau docs build

# Flujo completo (como solicitado en el issue)
make all
```

## Estructura de Directorios

El Makefile asume la siguiente estructura:
- Proyecto principal en la raíz del repositorio
- `src/` - Código fuente
- `public/` - Assets públicos
- `public/docs/` - Documentos generados
- `public/assets/videos/` - Videos generados

## Notas

- Si no existen los archivos necesarios para el vídeo Pau Intro (pau_intro_scene.json, pau_intro.srt, config.json), se mostrará una advertencia pero el proceso continuará.
- El sistema detecta automáticamente la rama actual para operaciones Git.
- Todos los targets incluyen manejo de errores graceful.