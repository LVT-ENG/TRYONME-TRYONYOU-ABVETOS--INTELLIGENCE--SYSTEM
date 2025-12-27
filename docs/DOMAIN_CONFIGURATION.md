# Configuración de Dominios Personalizados - TRYONYOU/ABVETOS

## 🌐 Dominios Configurados

| Dominio | Propósito | Estado | DNS Provider |
|---------|-----------|--------|--------------|
| `tryonyou.app` | Aplicación principal | 🟡 Pendiente | A configurar |
| `abvetos-intelligence.com` | Sitio corporativo | 🟡 Pendiente | A configurar |
| `tryonyou.ai` | Landing técnico/AI | 🟡 Pendiente | A configurar |

---

## 📋 Pasos para Configurar Dominios en Vercel

### 1. Añadir Dominios en Vercel Dashboard

1. **Ir a Vercel Dashboard**
   - URL: https://vercel.com/dashboard
   - Seleccionar proyecto: `tryonme-tryonyou-abvetos-intelligence-system`

2. **Navegar a Settings > Domains**
   - Click en "Add Domain"
   - Ingresar cada dominio:
     - `tryonyou.app`
     - `www.tryonyou.app`
     - `abvetos-intelligence.com`
     - `www.abvetos-intelligence.com`
     - `tryonyou.ai`
     - `www.tryonyou.ai`

3. **Seleccionar dominio principal**
   - Recomendado: `tryonyou.app` como dominio principal
   - Los demás harán redirect automático

---

### 2. Configurar DNS en tu Proveedor

Dependiendo de dónde compraste los dominios (GoDaddy, Namecheap, Cloudflare, etc.), necesitas añadir estos registros DNS:

#### Para `tryonyou.app`

**Opción A: DNS de Vercel (Recomendado)**
```dns
# Nameservers (apuntar a Vercel)
NS ns1.vercel-dns.com
NS ns2.vercel-dns.com
```

**Opción B: Registros A y CNAME**
```dns
# Root domain
A @ 76.76.21.21

# WWW subdomain
CNAME www cname.vercel-dns.com
```

#### Para `abvetos-intelligence.com`

```dns
# Root domain
A @ 76.76.21.21

# WWW subdomain
CNAME www cname.vercel-dns.com
```

#### Para `tryonyou.ai`

```dns
# Root domain
A @ 76.76.21.21

# WWW subdomain
CNAME www cname.vercel-dns.com
```

---

### 3. Verificar Configuración SSL

Vercel automáticamente generará certificados SSL para todos los dominios configurados. El proceso toma aproximadamente **5-10 minutos**.

**Verificar SSL activo:**
```bash
curl -I https://tryonyou.app
# Debe retornar HTTP/2 200
```

---

## 🔧 Archivo `vercel.json` Configurado

El archivo [`vercel.json`](../vercel.json) ya está configurado con:

- ✅ **Alias de dominios**: `tryonyou.app`, `abvetos-intelligence.com`, `tryonyou.ai`
- ✅ **Rutas SPA**: Todo redirige a `/index.html`
- ✅ **Headers de seguridad**: X-Frame-Options, CSP, HSTS
- ✅ **Cache de assets**: 1 año para imágenes/CSS/JS
- ✅ **Header personalizado**: `X-Patent: PCT/EP2025/067317`

---

## 🚀 Deployment Workflow

### Push Automático
```bash
git push origin main
# Vercel detecta el push y despliega automáticamente
```

### Deployment Manual (si es necesario)
```bash
npm install -g vercel
vercel --prod
```

---

## 📊 Verificación Post-Deployment

Después de configurar los dominios, verificar:

```bash
# 1. Verificar DNS propagación
nslookup tryonyou.app
nslookup abvetos-intelligence.com
nslookup tryonyou.ai

# 2. Verificar SSL
curl -I https://tryonyou.app
curl -I https://abvetos-intelligence.com
curl -I https://tryonyou.ai

# 3. Verificar headers personalizados
curl -I https://tryonyou.app | grep X-Patent
# Debe retornar: X-Patent: PCT/EP2025/067317
```

---

## 🔍 Troubleshooting

### Problema: "Domain not found"
**Solución:**
1. Verificar que el dominio esté registrado y no expirado
2. Asegurarse de que los nameservers estén correctamente configurados
3. Esperar 24-48h para propagación DNS completa

### Problema: "SSL Certificate Error"
**Solución:**
1. Esperar 10-15 minutos después de añadir el dominio
2. En Vercel Dashboard > Domains > Refresh SSL Certificate
3. Verificar que no haya registros CAA en el DNS que bloqueen Let's Encrypt

### Problema: "Too many redirects"
**Solución:**
1. Verificar que no haya redirect loops en el DNS
2. Asegurarse de que solo hay UN registro A o CNAME, no ambos
3. Limpiar cache del navegador

---

## 📧 Configuración de Email (Integrado)

Una vez los dominios estén activos, configurar emails corporativos siguiendo [EMAIL_CONFIGURATION.md](EMAIL_CONFIGURATION.md).

**Emails a configurar:**
- `invest@abvetos-intelligence.com`
- `legal@abvetos-intelligence.com`
- `partnerships@tryonyou.ai`
- `contact@tryonyou.app`

---

## 🎯 Next Steps

1. [ ] Comprar/verificar propiedad de dominios
2. [ ] Añadir dominios en Vercel Dashboard
3. [ ] Configurar DNS en el proveedor de dominios
4. [ ] Esperar propagación DNS (24-48h)
5. [ ] Verificar SSL activo
6. [ ] Probar acceso desde todos los dominios
7. [ ] Configurar emails corporativos
8. [ ] Actualizar links en materiales de marketing

---

**Última Actualización:** December 27, 2025  
**Patent:** PCT/EP2025/067317  
**Copyright:** © 2025 TRYONYOU - ABVETOS Intelligence System
