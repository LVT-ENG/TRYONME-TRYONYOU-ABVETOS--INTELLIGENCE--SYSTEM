# 🦚 ABVETOS Deploy Express

Sistema de despliegue automático para TRYONYOU-ABVETOS-INTELLIGENCE-SYSTEM

## 📦 Scripts Disponibles

### 1. ABVETOS_DEPLOY_EXPRESS_CORE.sh

**Script principal de build + deploy + notificación Telegram**

El núcleo estable y oficial del sistema de despliegue, usado por todos los entornos (local, Vercel, GitHub Actions, etc.).

#### Uso:

```bash
bash system/deploy/ABVETOS_DEPLOY_EXPRESS_CORE.sh
```

#### Características:

- ✅ Verificación de dependencias (Node.js, npm, git)
- ✅ Instalación de dependencias del proyecto
- ✅ Build del proyecto
- ✅ Ejecución de tests
- ✅ Deploy a Vercel (si está configurado)
- ✅ Notificaciones a Telegram
- ✅ Generación de reportes
- ✅ Limpieza automática

#### Variables de Entorno:

```bash
VERCEL_TOKEN=your_vercel_token
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# Optional: Log retention periods (default values shown)
LOG_RETENTION_DAYS=30           # Keep logs for 30 days
SCREENSHOT_RETENTION_DAYS=14    # Keep screenshots for 14 days
VERSION_RETENTION_DAYS=90       # Keep version info for 90 days
```

---

### 2. ABVETOS_DEPLOY_EXPRESS_TEST.sh

**Script de prueba - verifica conexión Telegram y tokens**

Realiza pruebas de pre-despliegue para verificar que todo está correctamente configurado.

#### Uso:

```bash
bash system/deploy/ABVETOS_DEPLOY_EXPRESS_TEST.sh
```

#### Características:

- 🧪 Verificación del entorno (Node.js, npm, git, curl)
- 🧪 Test de conectividad de red
- 🧪 Validación del token de Telegram Bot
- 🧪 Validación del Chat ID de Telegram
- 🧪 Envío de mensaje de prueba a Telegram
- 🧪 Validación del token de Vercel (opcional)
- 🧪 Verificación de la estructura del proyecto

#### Salida:

Reporte detallado con estadísticas de tests pasados/fallados/advertencias.

---

### 3. ABVETOS_DEPLOY_EXPRESS_LOGGER.sh

**Guarda logs, capturas y versiones del sistema**

Mantiene un registro completo de cada despliegue con logs, versiones y capturas de pantalla.

#### Uso:

```bash
bash system/deploy/ABVETOS_DEPLOY_EXPRESS_LOGGER.sh [TIMESTAMP]
```

Si no se proporciona TIMESTAMP, se genera automáticamente.

#### Características:

- 📝 Registro de logs de despliegue
- 📝 Captura de información de versión (Git + package.json)
- 📸 Capturas de pantalla (desktop + mobile)
- 📊 Generación de resumen de despliegue
- 🗄️ Creación de archivos ZIP
- 🧹 Limpieza automática de logs antiguos

#### Archivos Generados:

- `logs/deploy_TIMESTAMP.log` - Log detallado del despliegue
- `logs/versions/version_TIMESTAMP.json` - Información de versión en JSON
- `logs/screenshots/` - Capturas de pantalla
- `docs/reports/deployment_summary_TIMESTAMP.md` - Resumen del despliegue
- `docs/reports/abvetos_deploy_TIMESTAMP.zip` - Archivo completo

---

### 4. ABVETOS_DEPLOY_EXPRESS_HOOKS.sh

**Ejecuta acciones posteriores al despliegue**

Hooks de post-despliegue para capturas, backups, cache y otras tareas de mantenimiento.

#### Uso:

```bash
bash system/deploy/ABVETOS_DEPLOY_EXPRESS_HOOKS.sh
```

Este script es ejecutado automáticamente por `ABVETOS_DEPLOY_EXPRESS_CORE.sh` después del despliegue.

#### Hooks Disponibles:

1. **Screenshot Capture** - Captura screenshots de la aplicación desplegada
2. **Health Check** - Verifica que la aplicación esté respondiendo
3. **Backup** - Crea backup de archivos críticos
4. **Cache Cleanup** - Limpia cachés de npm, Vite, etc.
5. **Asset Optimization** - Optimiza imágenes (si las herramientas están disponibles)
6. **Google Drive Sync** - Sincroniza con Google Drive (si está configurado)
7. **Report Generation** - Genera reportes de despliegue
8. **Version Badge Update** - Actualiza badge de versión
9. **Temp Files Cleanup** - Limpia archivos temporales

---

## 🚀 Flujo de Trabajo Completo

### Despliegue Manual:

```bash
# 1. Ejecutar tests previos
bash system/deploy/ABVETOS_DEPLOY_EXPRESS_TEST.sh

# 2. Si los tests pasan, ejecutar el despliegue
bash system/deploy/ABVETOS_DEPLOY_EXPRESS_CORE.sh
```

### Despliegue Automático (CI/CD):

El script `ABVETOS_DEPLOY_EXPRESS_CORE.sh` puede ser ejecutado desde GitHub Actions:

```yaml
- name: Deploy with ABVETOS
  run: bash system/deploy/ABVETOS_DEPLOY_EXPRESS_CORE.sh
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
    TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
```

---

## 📋 Requisitos

### Obligatorios:

- Node.js v16 o superior
- npm v8 o superior
- git
- curl

### Opcionales (para funcionalidades completas):

- **Vercel CLI** - Para despliegues automáticos a Vercel
  ```bash
  npm install -g vercel
  ```

- **Playwright** - Para capturas de pantalla
  ```bash
  npm install -D playwright
  npx playwright install
  ```

- **Puppeteer** - Alternativa para capturas
  ```bash
  npm install -D puppeteer
  ```

- **wkhtmltoimage** - Fallback para capturas
  ```bash
  sudo apt-get install wkhtmltoimage
  ```

---

## 🔧 Configuración

### 1. Telegram Bot

1. Crear un bot con [@BotFather](https://t.me/BotFather)
2. Obtener el token del bot
3. Obtener tu Chat ID (puedes usar [@userinfobot](https://t.me/userinfobot))
4. Configurar las variables de entorno:

```bash
export TELEGRAM_BOT_TOKEN="your_bot_token"
export TELEGRAM_CHAT_ID="your_chat_id"
```

### 2. Vercel

1. Obtener el token desde [Vercel Dashboard → Settings → Tokens](https://vercel.com/account/tokens)
2. Configurar la variable de entorno:

```bash
export VERCEL_TOKEN="your_vercel_token"
```

### 3. Variables de Entorno (Opcional)

Crear un archivo `.env.local`:

```bash
VERCEL_TOKEN=your_vercel_token
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

Y cargarlo antes de ejecutar:

```bash
source .env.local
bash system/deploy/ABVETOS_DEPLOY_EXPRESS_CORE.sh
```

---

## 📊 Estructura de Directorios

```
system/deploy/
├── ABVETOS_DEPLOY_EXPRESS_CORE.sh      # Script principal
├── ABVETOS_DEPLOY_EXPRESS_TEST.sh      # Script de pruebas
├── ABVETOS_DEPLOY_EXPRESS_LOGGER.sh    # Logger
├── ABVETOS_DEPLOY_EXPRESS_HOOKS.sh     # Post-deployment hooks
└── README.md                            # Esta documentación

logs/                                    # Logs generados
├── deploy_*.log
├── screenshots/
└── versions/

docs/reports/                            # Reportes de despliegue
├── deployment_summary_*.md
└── abvetos_deploy_*.zip

backups/                                 # Backups automáticos
└── backup_*.tar.gz
```

---

## 💡 Significado del Nombre

- **ABVETOS** → indica que forma parte del orquestador maestro
- **DEPLOY_EXPRESS** → módulo encargado de la ejecución automática de despliegues
- **CORE** → núcleo estable y oficial, usado por todos los entornos (local, Vercel, GitHub Actions, etc.)
- **.sh** → extensión estándar para scripts ejecutables bash

---

## 🔄 Complementos Futuros

Estos scripts conviven con otros componentes del sistema:

- **ABVETOS_DEPLOY_EXPRESS_CORE.sh** - Script principal (✅ Implementado)
- **ABVETOS_DEPLOY_EXPRESS_TEST.sh** - Script de prueba (✅ Implementado)
- **ABVETOS_DEPLOY_EXPRESS_LOGGER.sh** - Logger (✅ Implementado)
- **ABVETOS_DEPLOY_EXPRESS_HOOKS.sh** - Post-deployment hooks (✅ Implementado)

---

## 🐛 Troubleshooting

### El despliegue falla con "Missing dependencies"

Verificar que Node.js, npm y git están instalados:

```bash
node -v
npm -v
git --version
```

### No se envían notificaciones a Telegram

1. Verificar que las variables de entorno están configuradas
2. Ejecutar el script de test para verificar la conexión:

```bash
bash system/deploy/ABVETOS_DEPLOY_EXPRESS_TEST.sh
```

### Las capturas de pantalla no funcionan

Instalar Playwright:

```bash
npm install -D playwright
npx playwright install
```

### El despliegue a Vercel falla

1. Verificar que el token de Vercel es válido
2. Instalar Vercel CLI si no está instalado:

```bash
npm install -g vercel
```

---

## 📞 Soporte

Para problemas o sugerencias:

- **Repository**: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
- **Issues**: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues

---

## 📄 Licencia

Parte del proyecto TRYONYOU-ABVETOS-INTELLIGENCE-SYSTEM

---

*ABVETOS Deploy Express - Powered by ABVETOS Orchestrator · Agente 70*
