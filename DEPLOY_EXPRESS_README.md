# 🦚 TRYONYOU Deploy Express Automator

## Descripción

**Deploy Express** es un script automatizado y simplificado para desplegar cambios del directorio `TRYONYOU_DEPLOY_EXPRESS_INBOX` directamente a GitHub y Vercel con notificaciones a Telegram.

## 🚀 Características

- ✅ Commit y push automático a GitHub desde `~/TRYONYOU_DEPLOY_EXPRESS_INBOX`
- ✅ Build automático con `npm run build`
- ✅ Deploy automático a Vercel en producción
- ✅ Notificaciones a Telegram al completar el deploy

## 📋 Requisitos

- Bash shell (disponible en Linux, macOS, WSL)
- Git configurado con credenciales
- Node.js y npm instalados
- Vercel CLI instalado globalmente: `npm install -g vercel`
- Bot de Telegram configurado (opcional para notificaciones)
- Directorio `~/TRYONYOU_DEPLOY_EXPRESS_INBOX` debe ser un repositorio Git válido

## ⚙️ Configuración

### 1. Variables de Entorno

Configura las siguientes variables de entorno antes de ejecutar el script:

```bash
export TELEGRAM_BOT_TOKEN="tu_token_del_bot"       # Para notificaciones
export TELEGRAM_CHAT_ID="tu_id_telegram"           # Para notificaciones
```

### 2. Preparar el Directorio

Asegúrate de que el directorio existe y es un repositorio Git:

```bash
# Crear directorio si no existe
mkdir -p ~/TRYONYOU_DEPLOY_EXPRESS_INBOX

# Inicializar como repositorio Git (si es necesario)
cd ~/TRYONYOU_DEPLOY_EXPRESS_INBOX
git init
git remote add origin <tu-repositorio-url>
```

## 🎯 Uso

### Ejecución Básica

El script debe ejecutarse desde cualquier ubicación (automáticamente cambia al directorio correcto):

```bash
chmod +x deploy_express.sh
./deploy_express.sh
```

### Funcionamiento

El script realiza las siguientes acciones en secuencia:

1. Cambia al directorio `~/TRYONYOU_DEPLOY_EXPRESS_INBOX`
2. Agrega todos los cambios con `git add .`
3. Crea un commit con timestamp: `🤖 ABVETOS Auto-Sync YYYY-MM-DD HH:MM:SS`
4. Sube los cambios a GitHub: `git push origin main`
5. Ejecuta el build: `npm run build`
6. Despliega a Vercel en producción: `npx vercel --prod --yes`
7. Envía notificación a Telegram con el estado del deploy

### Automatización con Cron

Para ejecutar el script automáticamente cada hora:

```bash
# Editar crontab
crontab -e

# Agregar la siguiente línea:
0 * * * * /ruta/completa/a/deploy_express.sh >> ~/deploy_express.log 2>&1
```

## 📊 Flujo de Trabajo

1. **Git Sync**: Agrega todos los cambios y crea commit con timestamp
2. **Push**: Sube los cambios a GitHub (rama main)
3. **Build**: Ejecuta `npm run build` para compilar el proyecto
4. **Deploy**: Despliega automáticamente a Vercel en producción
5. **Notificación**: Envía confirmación a Telegram con la hora del deploy

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

El script usa `npx vercel --prod --yes` para deployar automáticamente:

1. Instalar Vercel CLI: `npm install -g vercel`
2. Autenticarse con Vercel: `vercel login`
3. El script ejecutará el deploy en producción automáticamente
4. La primera vez, Vercel CLI solicitará configuración del proyecto

**Nota**: El flag `--yes` acepta automáticamente la configuración predeterminada.

## ⚠️ Solución de Problemas

### El directorio no existe

```bash
# Crear el directorio
mkdir -p ~/TRYONYOU_DEPLOY_EXPRESS_INBOX
cd ~/TRYONYOU_DEPLOY_EXPRESS_INBOX

# Inicializar como repositorio Git
git init
git remote add origin <url-del-repositorio>
```

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

# Verificar autenticación
vercel whoami
```

### npm run build falla

```bash
# Asegúrate de que package.json existe y tiene el script "build"
cd ~/TRYONYOU_DEPLOY_EXPRESS_INBOX
npm install

# Verificar que el script build está definido
cat package.json | grep -A 1 '"build"'
```

## 🔒 Seguridad

- **Nunca** commitees tokens o credenciales al repositorio
- Usa variables de entorno para información sensible
- Los tokens deben configurarse en tu shell profile (`.zshrc`, `.bashrc`)

## 📄 Licencia

Parte del proyecto **TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM**

---

**Agente 70 · Sistema ABVETOS Orchestrator**
