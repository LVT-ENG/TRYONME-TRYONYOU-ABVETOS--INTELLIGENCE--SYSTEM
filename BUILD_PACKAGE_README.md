# Build Package Pro - Documentación

## 🎯 Descripción

`build_package_pro.sh` es un script de construcción y despliegue automatizado que genera dos versiones del proyecto TRYONYOU:

- **FULL**: Paquete completo con todas las dependencias (node_modules completos)
- **LIGHT**: Paquete optimizado solo con dependencias de producción

## 🚀 Uso

### Prerrequisitos

Asegúrate de tener instalados:
- Node.js (v22.x o superior)
- npm
- zip
- rsync

### Configuración

1. **Copia el archivo .env.example a .env**:
   ```bash
   cp .env.example .env
   ```

2. **Configura las variables de entorno en .env**:
   ```bash
   # Vercel Configuration
   VITE_VERCEL_TOKEN=tu_token_de_vercel
   
   # Telegram Bot Configuration (opcional)
   TELEGRAM_TOKEN=tu_telegram_bot_token
   ```

### Ejecución

```bash
# Hacer el script ejecutable (solo la primera vez)
chmod +x build_package_pro.sh

# Ejecutar el script
./build_package_pro.sh
```

## 📦 Qué Hace el Script

1. **Instalación**: `npm ci` - Instala dependencias limpias
2. **Build**: `npm run build` - Compila el proyecto con Vite
3. **Paquete FULL**: Crea un paquete con todos los archivos y node_modules completos
4. **Paquete LIGHT**: Crea un paquete optimizado con solo dependencias de producción
5. **ZIPs**: Genera archivos ZIP timestampeados de ambos paquetes
6. **Deploy**: Despliega automáticamente a Vercel
7. **Notificación**: Envía notificación a Telegram (si está configurado)

## 📂 Estructura de Salida

Después de ejecutar el script, encontrarás en la raíz del proyecto:

```
TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM/
├── build_package_pro.sh
├── out_full_YYYYMMDD-HHMMSS/      # Carpeta temporal FULL
├── out_light_YYYYMMDD-HHMMSS/     # Carpeta temporal LIGHT
├── TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM_FULL_YYYYMMDD-HHMMSS.zip
└── TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM_LIGHT_YYYYMMDD-HHMMSS.zip
```

**Nota**: Las carpetas temporales y ZIPs están excluidos de Git (ver .gitignore)

## 🔧 Variables de Entorno

### Requeridas

- `VITE_VERCEL_TOKEN`: Token de autenticación de Vercel para despliegue

### Opcionales

- `TELEGRAM_TOKEN`: Token del bot de Telegram para notificaciones
  - Si no está configurado, el script continuará sin enviar notificaciones

## ✅ Verificación

Después de ejecutar el script, verifica:

1. **ZIPs creados**: Deben existir ambos archivos ZIP
2. **Deploy en Vercel**: Visita https://tryonyou.app
3. **Notificación Telegram**: Revisa @abvet_deploy_bot para el mensaje de confirmación

## 🐛 Solución de Problemas

### Error: "Falta [comando]"
Instala el comando faltante:
- **Ubuntu/Debian**: `sudo apt-get install zip rsync`
- **macOS**: `brew install zip rsync`

### Error: "No se encontró .env"
Esto es solo una advertencia. El script continuará usando las variables de entorno del sistema.

### Error en Vercel Deploy
Verifica que `VITE_VERCEL_TOKEN` esté correctamente configurado en tu .env

### No se envía notificación a Telegram
Asegúrate de que `TELEGRAM_TOKEN` esté configurado en .env

## 📝 Notas

- El script usa `npm ci` para garantizar instalaciones limpias y reproducibles
- Los timestamps en los archivos siguen el formato: YYYYMMDD-HHMMSS
- El deploy a Vercel usa el flag `|| true` para que el script continúe aunque falle
- Las carpetas y ZIPs generados están automáticamente excluidos de Git

## 🔗 Enlaces

- **Sitio producción**: https://tryonyou.app
- **Bot Telegram**: @abvet_deploy_bot
- **Repositorio**: github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

---

**Autor**: Agente 70 for CEO  
**Versión**: 1.0.0  
**Fecha**: Octubre 2025
