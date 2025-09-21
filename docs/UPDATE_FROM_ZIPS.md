# Update from ZIPs - Automatización de Archivos ZIP

Este documento describe el sistema de automatización para procesar archivos ZIP y desplegar automáticamente en Vercel.

## 🚀 GitHub Actions Workflow

### Descripción
El workflow `update-from-zips.yml` automatiza el proceso de:
1. Detección de archivos ZIP nuevos o modificados
2. Extracción y sincronización de contenido
3. Commit automático de cambios
4. Build y deploy en Vercel
5. Notificaciones por Telegram

### Activación
El workflow se ejecuta en dos casos:
- **Automática**: Cuando se hace push de archivos `*.zip` al repositorio
- **Manual**: Desde la pestaña Actions en GitHub (workflow_dispatch)

### Archivos Relacionados
- `.github/workflows/update-from-zips.yml` - Workflow principal de GitHub Actions
- `scripts/update-from-zips.sh` - Script bash alternativo para ejecución local

## ⚙️ Configuración de Secrets

Para que el workflow funcione correctamente, configura estos secrets en GitHub:

### Secrets Requeridos
```
VERCEL_TOKEN          # Token de API de Vercel
VERCEL_PROJECT_ID     # ID del proyecto en Vercel  
VERCEL_ORG_ID         # ID de la organización en Vercel
```

### Secrets Opcionales
```
TELEGRAM_BOT_TOKEN    # Token del bot de Telegram para notificaciones
TELEGRAM_CHAT_ID      # ID del chat de Telegram para notificaciones
```

### Cómo configurar secrets
1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Añade cada secret con su valor correspondiente

## 🔧 Configuración de Vercel

### Obtener Tokens de Vercel
1. **VERCEL_TOKEN**:
   - Ve a https://vercel.com/account/tokens
   - Crea un nuevo token con scope adecuado
   
2. **VERCEL_PROJECT_ID**:
   - Ve a tu proyecto en Vercel Dashboard
   - Settings → General → Project ID
   
3. **VERCEL_ORG_ID**:
   - Ve a tu equipo/organización en Vercel
   - Settings → General → Team ID

## 📱 Configuración de Telegram (Opcional)

### Crear Bot de Telegram
1. Habla con @BotFather en Telegram
2. Usa `/newbot` y sigue las instrucciones
3. Guarda el token que te proporciona

### Obtener Chat ID
1. Añade el bot a tu chat/canal
2. Envía un mensaje al bot
3. Ve a `https://api.telegram.org/bot[TOKEN]/getUpdates`
4. Busca el `chat.id` en la respuesta

## 📋 Uso del Workflow

### Método 1: Push Automático
```bash
# Añadir archivos ZIP al repositorio
git add *.zip
git commit -m "feat: añadir nuevos archivos ZIP"
git push origin main
```

### Método 2: Ejecución Manual
1. Ve a la pestaña "Actions" en GitHub
2. Selecciona "Update from ZIPs"
3. Click "Run workflow"
4. Selecciona la rama y ejecuta

### Método 3: Script Local
```bash
# Configurar variables de entorno
export VERCEL_TOKEN="tu_token"
export VERCEL_PROJECT_ID="tu_project_id" 
export VERCEL_ORG_ID="tu_org_id"
export TELEGRAM_BOT_TOKEN="tu_bot_token"  # opcional
export TELEGRAM_CHAT_ID="tu_chat_id"     # opcional

# Ejecutar script
./scripts/update-from-zips.sh
```

## 🔍 Monitoreo y Debug

### Ver logs del workflow
1. Ve a Actions → Update from ZIPs
2. Click en la ejecución específica
3. Expande cada paso para ver logs detallados

### Errores comunes
- **"VERCEL_TOKEN not found"**: Configura los secrets de Vercel
- **"No ZIP files found"**: Asegúrate de que hay archivos .zip en la raíz
- **"Build failed"**: Revisa que package.json y dependencias estén correctas
- **"Telegram notification failed"**: Verifica tokens de Telegram

## 📁 Estructura de Procesamiento

```
Repositorio raíz/
├── *.zip                           # Archivos ZIP detectados
├── /tmp/incoming/                  # Carpeta temporal (se limpia automáticamente)
│   └── extracted/                  # Contenido extraído de ZIPs
├── .github/workflows/
│   └── update-from-zips.yml       # Workflow de GitHub Actions
└── scripts/
    └── update-from-zips.sh        # Script alternativo
```

## 🚀 Flujo de Trabajo

1. **Detección**: El workflow detecta cambios en archivos ZIP
2. **Extracción**: Descomprime todos los ZIPs en carpeta temporal
3. **Sincronización**: Usa rsync para mergear contenido con el repo
4. **Commit**: Hace commit automático de cambios (si los hay)
5. **Build**: Instala dependencias y compila el proyecto
6. **Deploy**: Despliega a Vercel en producción
7. **Notificación**: Envía notificación por Telegram con URL de deploy
8. **Limpieza**: Elimina archivos temporales

## ⚠️ Consideraciones de Seguridad

- Los secrets nunca se exponen en logs
- Los archivos temporales se limpian automáticamente
- El bot de Git usa una dirección de email específica
- Solo se procesan archivos ZIP en la raíz del repositorio

## 🔄 Migración desde Script Bash

Si vienes del script bash original:
1. Los secrets ahora se configuran en GitHub en lugar de variables hardcodeadas
2. El workflow maneja automáticamente la detección de ZIPs
3. Se añadieron mejoras de seguridad y limpieza
4. Las notificaciones son más detalladas

## 📞 Soporte

Para problemas o preguntas:
1. Revisa los logs del workflow en GitHub Actions
2. Verifica que todos los secrets estén configurados
3. Asegúrate de que los archivos ZIP estén en la raíz del repo