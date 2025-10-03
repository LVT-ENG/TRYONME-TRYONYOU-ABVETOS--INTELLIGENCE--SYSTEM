# 🚀 Instrucciones de Deploy para TRYONYOU

## ✅ Cambios realizados

Se han implementado las siguientes mejoras:

1. **✅ Eliminación del validador inicial**
   - El sitio ahora carga directamente sin pantalla de validación
   - Acceso inmediato a la experiencia premium

2. **✅ Efecto Sparkles con Canvas**
   - Implementado en `src/components/Sparkles.jsx`
   - Partículas interactivas con colores oro (#D3B26A) y pavo real (#0E6B6B)
   - Activación por clic/touch en toda la pantalla

3. **✅ Auto-detección de idioma mejorada**
   - Detecta automáticamente ES, FR, EN según el navegador
   - Guarda la preferencia en localStorage
   - Actualizado en `src/i18n/LanguageContext.jsx`

4. **✅ Paleta de colores premium aplicada**
   - Oro elegante: #D3B26A
   - Pavo real profundo: #0E6B6B
   - Antracita oscuro: #141619
   - Hueso claro: #F5EFE6
   - Degradados oro-pavo real en botones y títulos

5. **✅ Documentación completa**
   - `GITHUB_SECRETS_SETUP.md`: Configuración de secrets para GitHub Actions
   - `VERCEL_DOMAIN_SETUP.md`: Guía completa para configurar el dominio
   - `setup-vercel-domain.sh`: Script automatizado para configuración de dominio

## 🌐 Deploy Manual a Producción

### Opción 1: Deploy desde Vercel Dashboard (RECOMENDADO)

1. **Accede a Vercel Dashboard**
   - Ve a https://vercel.com/dashboard
   - Inicia sesión con tu cuenta

2. **Selecciona el proyecto**
   - Busca: `tryonme-tryonyou-abvetos-intelligence-system-q1br`
   - O ve directamente a: https://vercel.com/ruben-espinar-rodriguez-pro/tryonme-tryonyou-abvetos-intelligence-system-q1br

3. **Forzar nuevo deploy**
   - Ve a la pestaña **Deployments**
   - Haz clic en el botón **Redeploy** del último deployment
   - Selecciona **Use existing Build Cache: No**
   - Haz clic en **Redeploy**

4. **Espera a que termine**
   - El build tardará aproximadamente 2-3 minutos
   - Verás el progreso en tiempo real

5. **Verifica el deploy**
   - Una vez completado, haz clic en **Visit**
   - Verifica que el sitio cargue correctamente

### Opción 2: Deploy con GitHub Integration

1. **Trigger automático**
   - Los cambios ya están en la rama `main`
   - Vercel debería detectar automáticamente el push
   - Ve a https://vercel.com/dashboard para ver el progreso

2. **Si no se activa automáticamente**
   - Ve a Settings → Git en el proyecto de Vercel
   - Verifica que la integración con GitHub esté activa
   - Haz clic en **Trigger Deploy** manualmente

### Opción 3: Deploy con Vercel CLI (Avanzado)

Si prefieres usar la línea de comandos:

```bash
# 1. Instalar Vercel CLI
npm install -g vercel@latest

# 2. Ir al directorio del proyecto
cd /home/ubuntu/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# 3. Deploy a producción
vercel --prod --token=t9mc4kHGRS0VTWBR6qtJmvOw
```

## 🔧 Configurar el Dominio tryonyou.app

### Paso 1: Verificar DNS

Asegúrate de que los registros DNS estén configurados:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Paso 2: Añadir dominio en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Domains
3. Haz clic en **Add Domain**
4. Introduce: `tryonyou.app`
5. Haz clic en **Add**

### Paso 3: Configurar como dominio primario

1. En la lista de dominios, busca `tryonyou.app`
2. Haz clic en los tres puntos (⋯)
3. Selecciona **Set as Primary Domain**
4. Confirma la acción

### Paso 4: Verificar SSL

- Espera 1-2 minutos
- Verifica que aparezca el candado verde 🔒 junto al dominio
- Esto indica que el certificado SSL está activo

## 📋 Verificación Final

Después del deploy, verifica lo siguiente:

### 1. Acceso al sitio

```bash
curl -I https://tryonyou.app
```

Debe devolver `HTTP/2 200` o similar.

### 2. Sin validador inicial

- Abre https://tryonyou.app en el navegador
- Verifica que cargue directamente el sitio premium
- No debe aparecer ninguna pantalla de validación

### 3. Efecto Sparkles

- Haz clic en cualquier parte de la pantalla
- Deberían aparecer partículas doradas y verde pavo real
- Las partículas deben animarse y desaparecer gradualmente

### 4. Auto-detección de idioma

- Abre el sitio en un navegador con idioma español
- Verifica que el contenido esté en español
- Cambia el idioma del navegador y recarga
- El sitio debe cambiar al idioma correspondiente

### 5. Paleta de colores

- Verifica que los botones tengan degradado oro-pavo real
- El fondo debe ser antracita oscuro (#141619)
- Los textos deben ser en color hueso (#F5EFE6)

### 6. SSL activo

- Verifica el candado verde en la barra de direcciones
- No debe haber advertencias de seguridad

## 🔄 Workflow de GitHub Actions (Pendiente)

El workflow automático está creado en `.github/workflows/deploy.yml` pero no se pudo hacer push debido a permisos.

### Para activarlo manualmente:

1. Ve a https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
2. Crea el archivo `.github/workflows/deploy.yml` desde la interfaz web
3. Copia el contenido del archivo local
4. Configura los GitHub Secrets (ver `GITHUB_SECRETS_SETUP.md`)

### Secrets requeridos:

- `VERCEL_TOKEN`
- `VERCEL_PROJECT_ID`
- `VERCEL_TEAM_ID`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## 📱 Notificaciones en Telegram

Una vez configurado el workflow, recibirás notificaciones en @abvet_deploy_bot con:

- ✅ Estado del deploy
- 🌐 URL del deploy
- 📦 Commit hash
- 🖥️ Screenshot desktop
- 📱 Screenshot mobile

## 🆘 Solución de Problemas

### El sitio no carga

1. Verifica que el build se haya completado correctamente en Vercel Dashboard
2. Revisa los logs en la sección **Deployments**
3. Busca errores en el build o en el runtime

### Los sparkles no funcionan

1. Abre la consola del navegador (F12)
2. Busca errores de JavaScript
3. Verifica que el componente Sparkles esté montado correctamente

### El idioma no se detecta

1. Verifica la configuración de idioma del navegador
2. Limpia el localStorage: `localStorage.clear()`
3. Recarga la página

### El dominio no se conecta

1. Verifica los registros DNS
2. Espera hasta 24 horas para la propagación
3. Consulta la documentación en `VERCEL_DOMAIN_SETUP.md`

## 📞 Soporte

- **Vercel Support:** https://vercel.com/support
- **GitHub Issues:** https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues
- **Documentación:** Ver archivos `*.md` en el repositorio
