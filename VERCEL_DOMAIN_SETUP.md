# Configuración del Dominio tryonyou.app en Vercel

Esta guía te ayudará a configurar **tryonyou.app** como dominio primario en Vercel y bloquearlo para evitar cambios futuros.

## 🎯 Objetivo

- Configurar **tryonyou.app** como dominio primario
- Asegurar que todas las redirecciones (www, alias, previews) apunten a tryonyou.app
- Bloquear el dominio para evitar desconexiones accidentales
- Verificar que el certificado SSL esté activo

## 📋 Requisitos previos

1. Acceso al panel de Vercel
2. Token de Vercel configurado
3. Acceso al DNS del dominio tryonyou.app

## 🚀 Método 1: Configuración automática con script

Ejecuta el script proporcionado:

```bash
cd /home/ubuntu/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
./setup-vercel-domain.sh
```

Este script:
- ✅ Instala Vercel CLI si no está presente
- ✅ Autentica con tu token de Vercel
- ✅ Vincula el proyecto
- ✅ Lista los dominios actuales
- ✅ Añade tryonyou.app y www.tryonyou.app

## 🔧 Método 2: Configuración manual con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel@latest
```

### Paso 2: Autenticar

```bash
export VERCEL_TOKEN="t9mc4kHGRS0VTWBR6qtJmvOw"
vercel login --token $VERCEL_TOKEN
```

### Paso 3: Vincular el proyecto

```bash
cd /home/ubuntu/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
vercel link --yes --token $VERCEL_TOKEN
```

### Paso 4: Añadir dominios

```bash
# Añadir dominio principal
vercel domains add tryonyou.app --token $VERCEL_TOKEN

# Añadir subdominio www
vercel domains add www.tryonyou.app --token $VERCEL_TOKEN
```

### Paso 5: Listar dominios

```bash
vercel domains ls --token $VERCEL_TOKEN
```

## 🌐 Método 3: Configuración desde el Dashboard de Vercel

### Paso 1: Acceder al proyecto

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Inicia sesión con tu cuenta
3. Busca y selecciona el proyecto: **TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM**

### Paso 2: Configurar dominios

1. En el menú lateral, haz clic en **Settings**
2. Selecciona la pestaña **Domains**
3. Haz clic en **Add Domain**
4. Introduce: `tryonyou.app`
5. Haz clic en **Add**

### Paso 3: Configurar DNS

Vercel te mostrará los registros DNS necesarios. Configura en tu proveedor de DNS:

#### Para el dominio raíz (tryonyou.app):

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### Para el subdominio www:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Paso 4: Establecer como dominio primario

1. En la lista de dominios, busca **tryonyou.app**
2. Haz clic en los tres puntos (⋯) junto al dominio
3. Selecciona **Set as Primary Domain**
4. Confirma la acción

### Paso 5: Configurar redirecciones

1. Asegúrate de que **www.tryonyou.app** esté configurado para redirigir a **tryonyou.app**
2. Vercel hace esto automáticamente cuando estableces un dominio como primario

### Paso 6: Verificar SSL

1. En la sección de dominios, verifica que aparezca un candado verde 🔒 junto a tryonyou.app
2. Esto indica que el certificado SSL está activo
3. Si no está activo, espera unos minutos y recarga la página

## 🔒 Bloquear el dominio para evitar cambios

### Opción A: Protección en el Dashboard

1. Ve a **Settings** → **Domains**
2. Haz clic en el dominio **tryonyou.app**
3. Busca la opción **Domain Protection** o **Lock Domain**
4. Activa la protección

### Opción B: Configuración a nivel de equipo

1. Ve a **Team Settings** (si estás en un equipo)
2. Selecciona **Security**
3. Activa **Domain Protection**
4. Esto evitará que miembros del equipo eliminen o modifiquen dominios sin autorización

### Opción C: Contactar soporte de Vercel

Si necesitas un bloqueo más estricto:

1. Ve a [Vercel Support](https://vercel.com/support)
2. Solicita bloquear el dominio tryonyou.app
3. Explica que quieres evitar desconexiones accidentales

## ✅ Verificación final

Después de configurar todo, verifica:

### 1. Dominio accesible

```bash
curl -I https://tryonyou.app
```

Deberías ver un código de respuesta `200 OK` o `301/302` (redirección).

### 2. SSL activo

```bash
curl -I https://tryonyou.app | grep -i "HTTP"
```

Debe mostrar `HTTP/2 200` o similar (no debe haber errores de certificado).

### 3. Redirección de www

```bash
curl -I https://www.tryonyou.app
```

Debe redirigir a `https://tryonyou.app`.

### 4. Verificar en el navegador

1. Abre https://tryonyou.app
2. Verifica que:
   - ✅ El sitio carga correctamente
   - ✅ Aparece el candado verde en la barra de direcciones (SSL activo)
   - ✅ No hay validador inicial (carga directamente el sitio premium)
   - ✅ Los efectos sparkles funcionan
   - ✅ El idioma se detecta automáticamente

## 🔄 Deploy en producción

Una vez configurado el dominio, haz un deploy limpio:

```bash
cd /home/ubuntu/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Asegúrate de que todos los cambios estén commiteados
git add .
git commit -m "feat: Add sparkles effect, auto-language detection, and deploy workflow"
git push origin main

# O deploy manual con Vercel CLI
npx vercel --prod --token $VERCEL_TOKEN
```

## 📊 Monitoreo

Después del deploy, verifica en Telegram:

1. Deberías recibir una notificación de @abvet_deploy_bot
2. La notificación incluirá:
   - ✅ Estado del deploy
   - 🌐 URL: https://tryonyou.app
   - 📦 Hash del commit
   - 🖥️ Screenshot desktop
   - 📱 Screenshot mobile

## 🆘 Solución de problemas

### El dominio no se añade

- Verifica que el dominio esté correctamente registrado
- Comprueba que tengas permisos en Vercel
- Asegúrate de que el DNS esté configurado correctamente

### SSL no se activa

- Espera hasta 24 horas para la propagación de DNS
- Verifica que los registros DNS estén correctos
- Intenta eliminar y volver a añadir el dominio

### El sitio no carga

- Verifica que el build se haya completado correctamente
- Revisa los logs en Vercel Dashboard → Deployments
- Comprueba que no haya errores en el código

### La redirección www no funciona

- Asegúrate de que www.tryonyou.app esté añadido como dominio
- Verifica el registro CNAME en el DNS
- Espera a la propagación de DNS (hasta 24 horas)

## 📞 Contacto y soporte

Si necesitas ayuda adicional:

- **Vercel Support:** https://vercel.com/support
- **Documentación de Vercel:** https://vercel.com/docs
- **GitHub Issues:** https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues
