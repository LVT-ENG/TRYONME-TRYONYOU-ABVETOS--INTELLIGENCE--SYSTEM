# Guía de Configuración del Dominio tryonyou.app

**Versión:** 1.0  
**Fecha:** 15 de octubre de 2025  
**Proyecto:** TRYONYOU - DIVINEO  
**Dominio:** tryonyou.app

---

## 📋 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Requisitos Previos](#requisitos-previos)
3. [Configuración DNS](#configuración-dns)
4. [Configuración en Vercel](#configuración-en-vercel)
5. [Verificación y Testing](#verificación-y-testing)
6. [Protección del Dominio](#protección-del-dominio)
7. [Troubleshooting](#troubleshooting)
8. [Comandos de Referencia Rápida](#comandos-de-referencia-rápida)

---

## 🎯 Resumen Ejecutivo

Esta guía proporciona instrucciones detalladas para configurar el dominio **tryonyou.app** como dominio primario en Vercel, incluyendo:

- ✅ Configuración de registros DNS
- ✅ Setup en Vercel Dashboard
- ✅ Activación de certificado SSL/TLS
- ✅ Configuración de redirecciones
- ✅ Protección y bloqueo del dominio
- ✅ Verificación completa del sistema

**Tiempo estimado de configuración:** 15-30 minutos  
**Tiempo de propagación DNS:** 10 minutos - 24 horas

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener:

### 1. Accesos Necesarios
- [ ] Acceso al registrador del dominio (donde compraste tryonyou.app)
- [ ] Acceso al Dashboard de Vercel
- [ ] Repositorio GitHub con el proyecto

### 2. Credenciales de Vercel
```
VERCEL_TOKEN: t9mc4kHGRS0VTWBR6qtJmvOw
VERCEL_PROJECT_ID: prj_Wkq9QCEn6RJr3x7AMpNkbIZ2Z2AX4
VERCEL_TEAM_ID: team_SDhjSkxLVE7oJ3S5KPkwG9uC
```

### 3. Herramientas Opcionales
- Vercel CLI (para configuración por línea de comandos)
- Terminal con acceso a `curl` (para testing)
- Navegador web moderno

---

## 🌐 Configuración DNS

### Paso 1: Acceder al Panel DNS

Accede al panel de administración de tu registrador de dominios donde compraste **tryonyou.app** (puede ser Namecheap, GoDaddy, Google Domains, etc.).

### Paso 2: Configurar Registros DNS

Elimina cualquier registro existente para `@` y `www`, y añade los siguientes:

#### Registro A (Dominio raíz)
```
Type:    A
Name:    @ (o dejar vacío, o tryonyou.app según el registrador)
Value:   76.76.21.21
TTL:     3600 (o automático)
```

#### Registro CNAME (Subdominio www)
```
Type:    CNAME
Name:    www
Value:   cname.vercel-dns.com
TTL:     3600 (o automático)
```

### Paso 3: Guardar Cambios

1. Haz clic en **Save** o **Add Record**
2. Espera la confirmación del registrador
3. Anota la hora de configuración

### Visualización de Configuración DNS

```
┌─────────────────────────────────────────────────────┐
│                  tryonyou.app                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  @ (raíz)  ──────────►  A Record                   │
│                         76.76.21.21                │
│                                                     │
│  www       ──────────►  CNAME                      │
│                         cname.vercel-dns.com       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## ⚙️ Configuración en Vercel

### Método 1: Dashboard de Vercel (RECOMENDADO)

#### Paso 1: Acceder al Proyecto

1. Ve a https://vercel.com/dashboard
2. Inicia sesión con tu cuenta
3. Busca el proyecto: **TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM**
4. Haz clic en el proyecto para abrirlo

#### Paso 2: Navegar a Configuración de Dominios

1. En el menú lateral izquierdo, haz clic en **Settings** (⚙️)
2. En el submenú, selecciona **Domains**
3. Verás la lista de dominios actuales (si los hay)

#### Paso 3: Añadir el Dominio Principal

1. En la sección de dominios, haz clic en el botón **Add**
2. En el campo de texto, introduce: `tryonyou.app`
3. Haz clic en **Add**

**Respuestas posibles:**
- ✅ **Valid Configuration Detected:** DNS configurado correctamente
- ⚠️ **DNS Configuration Required:** Necesitas configurar DNS (volver al paso anterior)
- ⚠️ **Invalid Configuration:** Revisa los registros DNS

#### Paso 4: Añadir el Subdominio www

1. Haz clic nuevamente en **Add**
2. Introduce: `www.tryonyou.app`
3. Haz clic en **Add**

#### Paso 5: Establecer Dominio Primario

1. En la lista de dominios, localiza **tryonyou.app**
2. Haz clic en el menú de tres puntos (⋯) a la derecha
3. Selecciona **Set as Primary Domain**
4. Confirma la acción

**Resultado esperado:**
```
✅ tryonyou.app (Primary) 🔒
✅ www.tryonyou.app → Redirect to tryonyou.app
```

#### Paso 6: Verificar Certificado SSL

1. Observa el icono junto a cada dominio
2. Debe aparecer un candado verde 🔒
3. Si aparece "Pending" o ⏳, espera 1-2 minutos
4. Si después de 10 minutos no está activo, ver [Troubleshooting](#troubleshooting)

### Método 2: Vercel CLI

Para usuarios avanzados que prefieren la línea de comandos:

#### Instalación de Vercel CLI

```bash
npm install -g vercel@latest
```

#### Autenticación

```bash
export VERCEL_TOKEN="t9mc4kHGRS0VTWBR6qtJmvOw"
vercel login --token $VERCEL_TOKEN
```

#### Vincular Proyecto

```bash
cd /ruta/al/proyecto/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
vercel link --yes --token $VERCEL_TOKEN
```

#### Añadir Dominios

```bash
# Añadir dominio principal
vercel domains add tryonyou.app --token $VERCEL_TOKEN

# Añadir subdominio www
vercel domains add www.tryonyou.app --token $VERCEL_TOKEN
```

#### Listar Dominios

```bash
vercel domains ls --token $VERCEL_TOKEN
```

#### Verificar Estado

```bash
vercel domains inspect tryonyou.app --token $VERCEL_TOKEN
```

### Método 3: Script Automatizado

El repositorio incluye un script para automatizar todo el proceso:

```bash
cd /home/ubuntu/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
chmod +x setup-vercel-domain.sh
./setup-vercel-domain.sh
```

El script realizará automáticamente:
- ✅ Verificación de Vercel CLI
- ✅ Autenticación con token
- ✅ Vinculación del proyecto
- ✅ Adición de dominios
- ✅ Listado de dominios actuales
- ✅ Instrucciones de verificación

---

## ✅ Verificación y Testing

### 1. Verificación de DNS

#### Usando nslookup (Windows/Mac/Linux)

```bash
# Verificar registro A
nslookup tryonyou.app

# Resultado esperado:
# Name:    tryonyou.app
# Address: 76.76.21.21
```

```bash
# Verificar registro CNAME
nslookup www.tryonyou.app

# Resultado esperado:
# www.tryonyou.app canonical name = cname.vercel-dns.com
```

#### Usando dig (Mac/Linux)

```bash
# Verificar registro A
dig tryonyou.app +short

# Resultado esperado:
# 76.76.21.21
```

```bash
# Verificar registro CNAME
dig www.tryonyou.app +short

# Resultado esperado:
# cname.vercel-dns.com
```

#### Usando herramientas online

- https://dnschecker.org - Verifica propagación global
- https://www.whatsmydns.net - Verifica desde múltiples ubicaciones

### 2. Verificación de Conectividad

#### Verificar respuesta del servidor

```bash
curl -I https://tryonyou.app
```

**Resultado esperado:**
```
HTTP/2 200
content-type: text/html
server: Vercel
x-vercel-id: ...
```

#### Verificar redirección de www

```bash
curl -I https://www.tryonyou.app
```

**Resultado esperado:**
```
HTTP/2 301 Moved Permanently
location: https://tryonyou.app/
```

### 3. Verificación de SSL/TLS

#### Verificar certificado

```bash
curl -vI https://tryonyou.app 2>&1 | grep -i "subject\|issuer\|expire"
```

**Resultado esperado:**
```
* subject: CN=tryonyou.app
* issuer: C=US; O=Let's Encrypt
* expire date: [fecha futura]
```

#### Verificar con OpenSSL

```bash
echo | openssl s_client -servername tryonyou.app -connect tryonyou.app:443 2>/dev/null | openssl x509 -noout -dates
```

### 4. Verificación en Navegador

#### Checklist visual

Abre https://tryonyou.app en un navegador y verifica:

- [ ] El sitio carga sin errores
- [ ] Aparece el candado verde 🔒 en la barra de direcciones
- [ ] No hay advertencias de seguridad
- [ ] El certificado es válido (haz clic en el candado para ver detalles)
- [ ] La URL en la barra es `https://tryonyou.app` (sin www)
- [ ] Los recursos (imágenes, CSS, JS) cargan correctamente

#### Verificar desde www

Abre https://www.tryonyou.app y verifica:

- [ ] Redirecciona automáticamente a https://tryonyou.app
- [ ] La redirección es instantánea
- [ ] No hay errores en la consola del navegador

### 5. Verificación de Performance

```bash
curl -w "@-" -o /dev/null -s https://tryonyou.app <<'EOF'
    time_namelookup:  %{time_namelookup}s\n
       time_connect:  %{time_connect}s\n
    time_appconnect:  %{time_appconnect}s\n
   time_pretransfer:  %{time_pretransfer}s\n
      time_redirect:  %{time_redirect}s\n
 time_starttransfer:  %{time_starttransfer}s\n
                    ----------\n
         time_total:  %{time_total}s\n
EOF
```

**Valores esperados:**
- `time_namelookup`: < 0.1s
- `time_connect`: < 0.2s
- `time_appconnect`: < 0.5s (incluye SSL handshake)
- `time_total`: < 2s (primera carga)

---

## 🔒 Protección del Dominio

Una vez configurado, es importante proteger el dominio para evitar cambios accidentales o no autorizados.

### Opción 1: Domain Protection en Vercel

#### Activar desde Dashboard

1. Ve a **Settings** → **Domains** en tu proyecto
2. Localiza el dominio **tryonyou.app**
3. Haz clic en el menú de tres puntos (⋯)
4. Si está disponible, selecciona **Lock Domain** o **Protect Domain**
5. Confirma la acción

⚠️ **Nota:** Esta función puede no estar disponible en todos los planes de Vercel.

### Opción 2: Team-Level Protection

Si tu proyecto está bajo un Team en Vercel:

1. Ve a **Team Settings** (icono del equipo en la barra superior)
2. Selecciona **Security** en el menú lateral
3. Busca **Domain Protection** o **Domain Lock**
4. Activa la protección para todos los dominios del equipo
5. Configura permisos: solo owners pueden modificar dominios

### Opción 3: Registrar Lock

A nivel de registrador de dominio:

1. Accede al panel de tu registrador
2. Busca la sección de seguridad del dominio
3. Activa **Domain Lock** o **Registrar Lock**
4. Activa **Transfer Lock** para prevenir transferencias no autorizadas

### Opción 4: Notificaciones y Alertas

Configura notificaciones para cualquier cambio:

1. En Vercel Dashboard, ve a **Project Settings** → **Notifications**
2. Activa notificaciones para:
   - Domain changes
   - Deployment changes
   - Project settings changes
3. Añade tu email para recibir alertas

### Best Practices de Seguridad

- 🔐 Usa autenticación de dos factores (2FA) en Vercel
- 🔐 Usa contraseñas fuertes y únicas
- 🔐 Limita el acceso al proyecto solo a usuarios necesarios
- 🔐 Revisa regularmente los logs de actividad
- 🔐 Mantén actualizado el registrador de dominio
- 🔐 Configura un contacto de recuperación de dominio

---

## 🆘 Troubleshooting

### Problema 1: DNS no se resuelve

**Síntomas:**
- `nslookup tryonyou.app` no devuelve 76.76.21.21
- El sitio no es accesible

**Soluciones:**

1. **Verificar registros DNS en el registrador**
   - Asegúrate de que los registros estén guardados correctamente
   - Verifica que no haya registros conflictivos

2. **Esperar propagación**
   - La propagación DNS puede tardar hasta 24 horas
   - Usa https://dnschecker.org para verificar propagación global

3. **Limpiar caché DNS local**
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

4. **Verificar con DNS público**
   ```bash
   # Usar DNS de Google
   nslookup tryonyou.app 8.8.8.8
   
   # Usar DNS de Cloudflare
   nslookup tryonyou.app 1.1.1.1
   ```

### Problema 2: Certificado SSL no se activa

**Síntomas:**
- En Vercel aparece "SSL Pending" ⏳
- Advertencias de seguridad en el navegador
- No aparece el candado verde 🔒

**Soluciones:**

1. **Esperar emisión del certificado**
   - Puede tardar 1-10 minutos normalmente
   - En algunos casos hasta 1 hora

2. **Verificar configuración DNS**
   - El certificado SSL requiere que el DNS esté correctamente configurado
   - Verifica con `nslookup` o `dig`

3. **Forzar renovación de SSL**
   - En Vercel Dashboard, ve a **Domains**
   - Elimina el dominio
   - Espera 1 minuto
   - Vuelve a añadir el dominio

4. **Verificar limitaciones de Let's Encrypt**
   - Límite de 50 certificados por dominio registrado por semana
   - Si has estado probando mucho, puede haberse alcanzado el límite

### Problema 3: Redirección de www no funciona

**Síntomas:**
- `www.tryonyou.app` no redirige a `tryonyou.app`
- Error 404 en www
- Certificado SSL no válido para www

**Soluciones:**

1. **Verificar que www esté añadido en Vercel**
   - Dashboard → Settings → Domains
   - Debe aparecer `www.tryonyou.app` en la lista

2. **Verificar registro CNAME**
   ```bash
   nslookup www.tryonyou.app
   # Debe devolver: cname.vercel-dns.com
   ```

3. **Verificar dominio primario**
   - Asegúrate de que `tryonyou.app` (sin www) esté marcado como Primary Domain

4. **Limpiar caché del navegador**
   - Ctrl + Shift + R (Windows/Linux)
   - Cmd + Shift + R (Mac)

### Problema 4: El sitio muestra error 404

**Síntomas:**
- El dominio se resuelve correctamente
- SSL está activo
- Pero muestra página de error 404 de Vercel

**Soluciones:**

1. **Verificar deployment activo**
   - Ve a Vercel Dashboard → Deployments
   - Asegúrate de que hay un deployment exitoso reciente
   - El deployment debe estar en estado "Ready"

2. **Verificar configuración del dominio en proyecto**
   - Settings → Domains
   - El dominio debe estar asociado al proyecto correcto

3. **Forzar nuevo deploy**
   - Ve a Deployments
   - Haz clic en el último deployment exitoso
   - Clic en el menú de tres puntos (⋯)
   - Selecciona "Redeploy"

4. **Verificar vercel.json**
   - Asegúrate de que las rewrites estén configuradas correctamente
   - Ver archivo `vercel.json` en el repositorio

### Problema 5: Dominio se desconecta después de un tiempo

**Síntomas:**
- El dominio funcionaba pero dejó de funcionar
- Apareció un mensaje de "Domain removed"

**Soluciones:**

1. **Verificar ownership del proyecto**
   - Asegúrate de tener acceso al proyecto en Vercel
   - Verifica que el proyecto no haya sido transferido

2. **Revisar notificaciones de Vercel**
   - Puede haber habido un problema de facturación
   - Verifica tu email asociado a Vercel

3. **Volver a añadir el dominio**
   - Si se desconectó, simplemente vuelve a añadirlo
   - Settings → Domains → Add

4. **Activar protección de dominio**
   - Ver sección [Protección del Dominio](#protección-del-dominio)

### Problema 6: Performance lenta

**Síntomas:**
- El sitio tarda mucho en cargar
- Tiempo de respuesta alto

**Soluciones:**

1. **Verificar ubicación del servidor**
   ```bash
   curl -I https://tryonyou.app | grep -i "x-vercel-id"
   ```
   - El ID indica la región del servidor
   - Vercel automáticamente sirve desde el CDN más cercano

2. **Verificar caché**
   ```bash
   curl -I https://tryonyou.app | grep -i "cache"
   ```
   - Debe aparecer `x-vercel-cache: HIT` después de la primera carga

3. **Revisar logs de Vercel**
   - Dashboard → Deployments → [último deploy] → Logs
   - Busca errores o advertencias

4. **Optimizar assets**
   - Verifica el tamaño de imágenes
   - Asegúrate de que los assets estén optimizados

---

## 📚 Comandos de Referencia Rápida

### Verificación DNS

```bash
# Verificar registro A
nslookup tryonyou.app

# Verificar registro CNAME
nslookup www.tryonyou.app

# Verificar con DNS público de Google
nslookup tryonyou.app 8.8.8.8

# Verificar propagación global
dig tryonyou.app @8.8.8.8 +short
```

### Verificación HTTP/HTTPS

```bash
# Verificar conectividad
curl -I https://tryonyou.app

# Verificar redirección www
curl -I https://www.tryonyou.app

# Verificar con detalles de timing
curl -w "@-" -o /dev/null -s https://tryonyou.app <<'EOF'
         time_total:  %{time_total}s\n
EOF
```

### Verificación SSL

```bash
# Ver certificado
echo | openssl s_client -servername tryonyou.app -connect tryonyou.app:443 2>/dev/null | openssl x509 -noout -text

# Ver fechas de validez
echo | openssl s_client -servername tryonyou.app -connect tryonyou.app:443 2>/dev/null | openssl x509 -noout -dates

# Ver emisor
echo | openssl s_client -servername tryonyou.app -connect tryonyou.app:443 2>/dev/null | openssl x509 -noout -issuer
```

### Vercel CLI

```bash
# Instalar/actualizar Vercel CLI
npm install -g vercel@latest

# Login con token
vercel login --token $VERCEL_TOKEN

# Listar proyectos
vercel projects ls

# Listar dominios del proyecto
vercel domains ls

# Añadir dominio
vercel domains add tryonyou.app

# Inspeccionar dominio
vercel domains inspect tryonyou.app

# Deploy manual
vercel --prod
```

### Limpiar Caché

```bash
# Windows
ipconfig /flushdns

# Mac
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Linux (systemd)
sudo systemd-resolve --flush-caches

# Linux (older)
sudo /etc/init.d/nscd restart
```

---

## 📞 Soporte y Recursos Adicionales

### Documentación Oficial

- **Vercel Domains:** https://vercel.com/docs/concepts/projects/domains
- **Vercel SSL:** https://vercel.com/docs/concepts/projects/domains/ssl
- **DNS Configuration:** https://vercel.com/docs/concepts/projects/domains/dns

### Herramientas Útiles

- **DNS Checker:** https://dnschecker.org
- **What's My DNS:** https://www.whatsmydns.net
- **SSL Labs:** https://www.ssllabs.com/ssltest/
- **PageSpeed Insights:** https://pagespeed.web.dev

### Contacto de Soporte

- **Vercel Support:** https://vercel.com/support
- **GitHub Issues:** https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues
- **Email:** soporte@tryonyou.app

### Documentación del Proyecto

Consulta también estos archivos en el repositorio:
- `DEPLOY_INSTRUCTIONS.md` - Instrucciones de deploy
- `VERCEL_DOMAIN_SETUP.md` - Configuración detallada de Vercel
- `DIVINEO_ENTREGA_FINAL.md` - Documentación de entrega completa

---

## ✅ Checklist Final de Configuración

Antes de dar por terminada la configuración, verifica:

### DNS
- [ ] Registro A configurado: @ → 76.76.21.21
- [ ] Registro CNAME configurado: www → cname.vercel-dns.com
- [ ] DNS propagado globalmente (verificar con dnschecker.org)
- [ ] Caché DNS local limpiado

### Vercel
- [ ] Proyecto vinculado correctamente
- [ ] Dominio tryonyou.app añadido
- [ ] Dominio www.tryonyou.app añadido
- [ ] tryonyou.app marcado como Primary Domain
- [ ] Certificado SSL activo para ambos dominios

### Verificación
- [ ] https://tryonyou.app carga correctamente
- [ ] https://www.tryonyou.app redirige a https://tryonyou.app
- [ ] Candado verde 🔒 visible en el navegador
- [ ] Sin advertencias de seguridad
- [ ] Performance aceptable (< 2s carga inicial)
- [ ] Funciona en múltiples navegadores
- [ ] Funciona en dispositivos móviles

### Seguridad
- [ ] Domain Protection activado (si está disponible)
- [ ] Registrar Lock activado
- [ ] 2FA activado en Vercel
- [ ] Notificaciones configuradas
- [ ] Acceso limitado a usuarios necesarios

### Documentación
- [ ] Configuración documentada
- [ ] Credenciales guardadas en lugar seguro
- [ ] Equipo informado de la configuración
- [ ] Procedimiento de rollback documentado

---

**Documento preparado por:** Equipo LVT-ENG  
**Última actualización:** 15 de octubre de 2025  
**Versión:** 1.0 - FINAL  
**Estado:** Completo y verificado

---

**¡Configuración completada con éxito! 🎉**

Si tienes alguna duda o problema, consulta la sección de [Troubleshooting](#troubleshooting) o contacta al soporte técnico.
