# 🌐 Guía de Configuración del Dominio TRYONYOU.app

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Paso 1: Obtener el Dominio](#paso-1-obtener-el-dominio)
3. [Paso 2: Configurar DNS](#paso-2-configurar-dns)
4. [Paso 3: Conectar con Vercel](#paso-3-conectar-con-vercel)
5. [Paso 4: Verificar la Configuración](#paso-4-verificar-la-configuración)
6. [Solución de Problemas](#solución-de-problemas)

---

## 🎯 Requisitos Previos

Antes de comenzar, asegúrate de tener:

- ✅ Dominio tryonyou.app registrado
- ✅ Acceso al panel de control del registrador de dominios
- ✅ Cuenta de Vercel activa
- ✅ Proyecto TRYONYOU desplegado en Vercel

---

## 📍 Paso 1: Obtener el Dominio

### 1.1 Registrar el Dominio

Si aún no tienes el dominio, regístralo en uno de estos proveedores:

**Proveedores Recomendados:**
- 🌐 [Namecheap](https://namecheap.com) - Buena relación calidad-precio
- 🌐 [GoDaddy](https://godaddy.com) - Popular y confiable
- 🌐 [Google Domains](https://domains.google) - Interfaz simple
- 🌐 [Cloudflare](https://cloudflare.com) - Incluye CDN gratis

### 1.2 Verificar Propiedad

1. Accede al panel de control de tu registrador
2. Busca tu dominio: `tryonyou.app`
3. Verifica que el estado sea "Activo"

---

## 🔧 Paso 2: Configurar DNS

### 2.1 Acceder a la Configuración DNS

1. Ve al panel de control de tu registrador
2. Busca la sección de "DNS Settings" o "Manage DNS"
3. Localiza el dominio `tryonyou.app`

### 2.2 Configurar Records DNS

Necesitas configurar los siguientes records:

#### **Record A (Apex Domain)**

```
Type:  A
Name:  @
Value: 76.76.21.21
TTL:   3600
```

#### **Record CNAME (www)**

```
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
TTL:   3600
```

### 2.3 Ejemplo de Configuración

#### Para Namecheap:

1. Inicia sesión en Namecheap
2. Domain List → Manage
3. Advanced DNS tab
4. Elimina todos los records existentes
5. Añade los nuevos records:
   ```
   A Record     @    76.76.21.21
   CNAME Record www  cname.vercel-dns.com.
   ```

#### Para GoDaddy:

1. Inicia sesión en GoDaddy
2. My Products → DNS
3. Manage Zones → tryonyou.app
4. Añade los records:
   ```
   Type A       Name @      Points to 76.76.21.21
   Type CNAME   Name www    Points to cname.vercel-dns.com
   ```

#### Para Cloudflare:

1. Inicia sesión en Cloudflare
2. Selecciona tryonyou.app
3. DNS → Add record
4. Configura:
   ```
   Type A       Name @      Content 76.76.21.21    Proxy ✓
   Type CNAME   Name www    Content cname.vercel-dns.com  Proxy ✓
   ```

---

## 🚀 Paso 3: Conectar con Vercel

### 3.1 Desde el Dashboard de Vercel

1. **Accede a tu proyecto:**
   - Ve a https://vercel.com/dashboard
   - Selecciona el proyecto TRYONYOU

2. **Añade el dominio:**
   - Settings → Domains
   - Haz clic en "Add"
   - Ingresa: `tryonyou.app`
   - Haz clic en "Add"

3. **Añade el subdominio www:**
   - Haz clic en "Add" nuevamente
   - Ingresa: `www.tryonyou.app`
   - Selecciona "Redirect to tryonyou.app"
   - Haz clic en "Add"

### 3.2 Usando Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Añadir dominio
vercel domains add tryonyou.app --token=$VERCEL_TOKEN

# Añadir subdominio www
vercel domains add www.tryonyou.app --token=$VERCEL_TOKEN
```

### 3.3 Script Automatizado

Usa el script incluido:

```bash
# Configurar variables de entorno
export VERCEL_TOKEN="tu_token_aqui"
export VERCEL_PROJECT_ID="tu_project_id"
export VERCEL_TEAM_ID="tu_team_id"

# Ejecutar script
bash setup-vercel-domain.sh
```

---

## ✅ Paso 4: Verificar la Configuración

### 4.1 Verificar DNS

Espera 5-10 minutos para la propagación DNS, luego:

```bash
# Verificar record A
dig tryonyou.app

# Verificar record CNAME
dig www.tryonyou.app

# O usa herramientas online:
# https://dnschecker.org
# https://mxtoolbox.com/SuperTool.aspx
```

### 4.2 Verificar en Vercel

1. Ve a Vercel Dashboard → tu proyecto → Settings → Domains
2. Deberías ver:
   ```
   ✅ tryonyou.app        (Primary)
   ✅ www.tryonyou.app   (Redirect)
   ```

### 4.3 Probar el Sitio

Abre en tu navegador:
- https://tryonyou.app ✓
- https://www.tryonyou.app → debería redirigir a https://tryonyou.app

### 4.4 Verificar SSL

1. El certificado SSL se configura automáticamente
2. Espera 24-48 horas para la emisión completa
3. Verifica en: https://www.ssllabs.com/ssltest/

---

## 🛠️ Paso 5: Configuración Avanzada (Opcional)

### 5.1 Configurar Email Forwarding

Si quieres recibir emails en `@tryonyou.app`:

1. Ve a tu registrador de dominios
2. Busca "Email Forwarding"
3. Configura:
   ```
   info@tryonyou.app → tu-email@gmail.com
   contact@tryonyou.app → tu-email@gmail.com
   ```

### 5.2 Configurar Subdominios Adicionales

Para añadir subdominios como `api.tryonyou.app`:

```bash
# Añadir record CNAME en DNS
Type:  CNAME
Name:  api
Value: cname.vercel-dns.com

# Añadir en Vercel
vercel domains add api.tryonyou.app --token=$VERCEL_TOKEN
```

### 5.3 Configurar Internacionalización

Para URLs multiidioma:

```
https://tryonyou.app/en  → English
https://tryonyou.app/es  → Español
https://tryonyou.app/fr  → Français
```

Ya está configurado en el proyecto. No requiere DNS adicional.

---

## 🐛 Solución de Problemas

### ❌ Problema: "Domain not verified"

**Causa:** Los records DNS no están configurados correctamente.

**Solución:**
1. Verifica los records DNS con `dig tryonyou.app`
2. Asegúrate de usar `@` para apex domain, no `tryonyou.app`
3. Espera 24 horas para propagación completa
4. Contacta soporte de Vercel si persiste

### ❌ Problema: "SSL certificate pending"

**Causa:** El certificado SSL está en proceso de emisión.

**Solución:**
1. Espera 24-48 horas (puede tardar)
2. Verifica que los records DNS apunten correctamente
3. En Vercel, ve a Settings → Domains → Refresh
4. Si falla, elimina y vuelve a añadir el dominio

### ❌ Problema: "Too many redirects"

**Causa:** Configuración incorrecta de redirects.

**Solución:**
1. Ve a Vercel → Settings → Domains
2. Asegúrate que solo `www` redirija a apex
3. No configures redirect en ambos sentidos
4. Limpia caché del navegador (Ctrl+Shift+Delete)

### ❌ Problema: "DNS_PROBE_FINISHED_NXDOMAIN"

**Causa:** El dominio no resuelve correctamente.

**Solución:**
1. Verifica que los nameservers estén correctos
2. Espera más tiempo para propagación DNS
3. Usa diferentes DNS (8.8.8.8, 1.1.1.1)
4. Verifica en: https://dnschecker.org

### ❌ Problema: "Mixed content warnings"

**Causa:** Recursos cargándose por HTTP en lugar de HTTPS.

**Solución:**
1. Asegúrate que todas las URLs usen `https://`
2. Verifica en código: no usar `http://` hardcoded
3. Configura en vercel.json:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "Content-Security-Policy",
             "value": "upgrade-insecure-requests"
           }
         ]
       }
     ]
   }
   ```

---

## 📊 Tabla de Tiempos de Propagación

| Acción | Tiempo Estimado |
|--------|-----------------|
| Cambio de records DNS | 5-10 minutos |
| Propagación DNS completa | 24-48 horas |
| Emisión SSL certificate | 24-48 horas |
| CDN cache update | 5-10 minutos |

---

## 🔗 Enlaces Útiles

### Herramientas de Verificación
- 🔍 [DNSChecker](https://dnschecker.org)
- 🔍 [MXToolbox](https://mxtoolbox.com)
- 🔍 [SSL Labs](https://www.ssllabs.com/ssltest/)
- 🔍 [What's My DNS](https://whatsmydns.net)

### Documentación Oficial
- 📚 [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- 📚 [Vercel DNS Records](https://vercel.com/docs/concepts/projects/custom-domains#dns-records)
- 📚 [SSL Certificates](https://vercel.com/docs/concepts/projects/custom-domains#ssl-certificates)

### Soporte
- 💬 [Vercel Support](https://vercel.com/support)
- 💬 [GitHub Issues](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues)
- 📧 [Email: info@tryonyou.app](mailto:info@tryonyou.app)

---

## ✅ Checklist Final

Antes de dar por terminada la configuración:

- [ ] Records DNS configurados correctamente
- [ ] Dominio añadido en Vercel
- [ ] www redirige a apex domain
- [ ] SSL certificate activo
- [ ] Sitio carga en https://tryonyou.app
- [ ] Sitio carga en https://www.tryonyou.app
- [ ] No hay errores de mixed content
- [ ] DNS propagado globalmente
- [ ] Email forwarding configurado (opcional)
- [ ] Subdominios configurados (opcional)

---

**Fecha de actualización:** Octubre 2025  
**Versión:** 1.0  
**Mantenido por:** ABVETOS INTELLIGENCE SYSTEM

---

*¿Necesitas ayuda? Contacta con nosotros en info@tryonyou.app*
