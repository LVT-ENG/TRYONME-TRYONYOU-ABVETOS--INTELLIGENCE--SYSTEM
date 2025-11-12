# GitHub Secrets Configuration

Para que el workflow de deploy automático funcione correctamente, necesitas configurar los siguientes **GitHub Secrets** en tu repositorio.

## Cómo configurar GitHub Secrets

1. Ve a tu repositorio en GitHub: `https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM`
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral izquierdo, selecciona **Secrets and variables** → **Actions**
4. Haz clic en **New repository secret** para cada uno de los siguientes secrets

## Secrets requeridos

### 1. VERCEL_TOKEN
- **Nombre:** `VERCEL_TOKEN`
- **Valor:** `t9mc4kHGRS0VTWBR6qtJmvOw`
- **Descripción:** Token de autenticación de Vercel para deploys automáticos

### 2. VERCEL_PROJECT_ID
- **Nombre:** `VERCEL_PROJECT_ID`
- **Valor:** `prj_Wkq9QCEn6RJr3x7AMpNkbIZ2Z2AX4`
- **Descripción:** ID del proyecto en Vercel

### 3. VERCEL_TEAM_ID
- **Nombre:** `VERCEL_TEAM_ID`
- **Valor:** `team_SDhjSkxLVE7oJ3S5KPkwG9uC`
- **Descripción:** ID del equipo/organización en Vercel

### 4. TELEGRAM_BOT_TOKEN
- **Nombre:** `TELEGRAM_BOT_TOKEN`
- **Valor:** [Obtener del bot @abvet_deploy_bot en Telegram]
- **Descripción:** Token del bot de Telegram para notificaciones
- **Cómo obtenerlo:**
  1. Habla con @BotFather en Telegram
  2. Usa el comando `/mybots`
  3. Selecciona @abvet_deploy_bot
  4. Selecciona "API Token"
  5. Copia el token

### 5. TELEGRAM_CHAT_ID
- **Nombre:** `TELEGRAM_CHAT_ID`
- **Valor:** [Tu Chat ID de Telegram]
- **Descripción:** ID del chat donde se enviarán las notificaciones
- **Cómo obtenerlo:**
  1. Envía un mensaje a @abvet_deploy_bot
  2. Visita: `https://api.telegram.org/bot<TU_BOT_TOKEN>/getUpdates`
  3. Busca el campo `"chat":{"id":XXXXXXX}`
  4. Copia ese número (puede ser negativo para grupos)

## Verificación

Una vez configurados todos los secrets, el workflow se ejecutará automáticamente en cada push a la rama `main`.

Puedes verificar el estado del workflow en:
`https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions`

## Ejecución manual

También puedes ejecutar el workflow manualmente:
1. Ve a la pestaña **Actions**
2. Selecciona el workflow "Deploy to Vercel with Screenshots"
3. Haz clic en **Run workflow**
4. Selecciona la rama `main`
5. Haz clic en **Run workflow**

## Notificaciones en Telegram

Recibirás notificaciones en Telegram con:
- ✅ Estado del deploy (SUCCESS/FAILED)
- 🌐 URL del deploy
- 📦 Hash del commit
- 💬 Mensaje del commit
- 🔧 Rama
- 👤 Autor
- ⏰ Timestamp
- 🖥️ Screenshot desktop
- 📱 Screenshot mobile
