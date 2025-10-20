# 🦚 TRYONYOU Deploy Express Automator

## Descripción

**Deploy Express** es un script automatizado para importar, versionar y desplegar archivos desde iCloud Drive directamente al repositorio TRYONYOU y opcionalmente a Vercel.

## 🚀 Características

- ✅ Monitorea carpeta de iCloud Drive para archivos nuevos
- ✅ Copia automáticamente archivos a `docs/legacy_rewrite/`
- ✅ Crea commits y push automático a GitHub
- ✅ Integración con Telegram para notificaciones
- ✅ Deploy automático a Vercel (opcional)
- ✅ Archiva archivos procesados para evitar duplicados
- ✅ Genera logs detallados de cada importación

## 📋 Requisitos

- macOS (por el uso de iCloud Drive)
- zsh (instalado por defecto en macOS)
- Git configurado con credenciales
- (Opcional) Vercel CLI para deploys automáticos: `npm install -g vercel`
- (Opcional) Bot de Telegram para notificaciones

## ⚙️ Configuración

### 1. Variables de Entorno

Configura las siguientes variables de entorno antes de ejecutar el script:

```bash
export VERCEL_TOKEN="tu_token_de_vercel"           # Opcional
export TELEGRAM_BOT_TOKEN="tu_token_del_bot"       # Opcional
export TELEGRAM_CHAT_ID="tu_id_telegram"           # Opcional
export VERCEL_ORG_ID="tu_org_id"                   # Opcional
export VERCEL_PROJECT_ID="tu_project_id"           # Opcional
```

### 2. Configuración Interna del Script

El script está preconfigurado con las siguientes rutas (puedes modificarlas según necesites):

```bash
DEPLOY_INBOX="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
REPO_PATH="$HOME/Projects/TRYONYOU-ABVETOS-ULTRA-PLUS-ULTIMATUM"
DEST_FOLDER="docs/legacy_rewrite"
```

### 3. Estructura de Carpetas

Asegúrate de que existan las siguientes carpetas:

```bash
# Carpeta de entrada (iCloud Drive)
mkdir -p "$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"

# Repositorio local
# (Debe ser un clone del repositorio TRYONYOU)
```

## 🎯 Uso

### Ejecución Básica

```bash
chmod +x deploy_express.sh
./deploy_express.sh
```

### Automatización con Cron (macOS)

Para ejecutar el script automáticamente cada hora:

```bash
# Editar crontab
crontab -e

# Agregar la siguiente línea:
0 * * * * cd /ruta/a/tu/repo && ./deploy_express.sh >> ~/deploy_express.log 2>&1
```

### Automatización con LaunchAgent (macOS - Recomendado)

Crear un archivo `~/Library/LaunchAgents/com.tryonyou.deployexpress.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.tryonyou.deployexpress</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/zsh</string>
        <string>/ruta/completa/a/deploy_express.sh</string>
    </array>
    <key>StartInterval</key>
    <integer>3600</integer>
    <key>StandardOutPath</key>
    <string>/tmp/deploy_express.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/deploy_express_error.log</string>
</dict>
</plist>
```

Cargar el agente:

```bash
launchctl load ~/Library/LaunchAgents/com.tryonyou.deployexpress.plist
```

## 📦 Tipos de Archivos Soportados

El script busca automáticamente los siguientes tipos de archivo:

- `.zip` - Paquetes comprimidos
- `.js` - Archivos JavaScript
- `.mp4` - Videos
- `.json` - Archivos de configuración
- `.html` - Páginas HTML
- `.css` - Hojas de estilo

## 📊 Flujo de Trabajo

1. **Detección**: El script busca archivos nuevos del día actual en la carpeta `DEPLOY_INBOX`
2. **Importación**: Copia los archivos a `docs/legacy_rewrite/import_TIMESTAMP/`
3. **Log**: Genera un archivo `IMPORT_LOG.txt` con los detalles de la importación
4. **Git**: Crea un commit y hace push a GitHub
5. **Notificación**: Envía mensaje a Telegram (si está configurado)
6. **Deploy**: Despliega a Vercel (si está configurado)
7. **Archivo**: Mueve los archivos procesados a `_processed_TIMESTAMP/`

## 🔔 Notificaciones Telegram

Para habilitar las notificaciones de Telegram:

1. Crear un bot con [@BotFather](https://t.me/botfather)
2. Obtener el token del bot
3. Obtener tu Chat ID (puedes usar [@userinfobot](https://t.me/userinfobot))
4. Configurar las variables de entorno:

```bash
export TELEGRAM_BOT_TOKEN="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
export TELEGRAM_CHAT_ID="123456789"
```

## 🌐 Deploy a Vercel

Para habilitar el deploy automático a Vercel:

1. Instalar Vercel CLI: `npm install -g vercel`
2. Obtener tu token de Vercel desde https://vercel.com/account/tokens
3. Configurar las variables de entorno:

```bash
export VERCEL_TOKEN="tu_token_aquí"
export VERCEL_ORG_ID="tu_org_id"       # Opcional
export VERCEL_PROJECT_ID="tu_project_id"  # Opcional
```

## 📝 Logs

Cada ejecución genera:

- **Log de importación**: `docs/legacy_rewrite/import_TIMESTAMP/IMPORT_LOG.txt`
- Contiene: timestamp, cantidad de archivos, listado de archivos importados

## ⚠️ Solución de Problemas

### El script no encuentra archivos

- Verifica que la carpeta `DEPLOY_INBOX` existe
- Comprueba que los archivos son del día actual
- Revisa los tipos de archivo soportados

### Error de autenticación Git

```bash
# Configurar credenciales de Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Si usas SSH
ssh-add ~/.ssh/id_rsa
```

### Error de Vercel

```bash
# Login manual en Vercel
vercel login

# Verificar que el token es válido
vercel whoami --token $VERCEL_TOKEN
```

## 🔒 Seguridad

- **Nunca** commitees tokens o credenciales al repositorio
- Usa variables de entorno para información sensible
- Los tokens deben configurarse en tu shell profile (`.zshrc`, `.bashrc`)

## 📄 Licencia

Parte del proyecto **TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM**

---

**Agente 70 · Sistema ABVETOS Orchestrator**
