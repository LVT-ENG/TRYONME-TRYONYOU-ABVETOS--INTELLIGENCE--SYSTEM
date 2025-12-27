# Configuración de Correos Corporativos - TRYONYOU/ABVETOS

## 📧 Correos Corporativos Necesarios

### 1. Correos de Negocio

| Email | Propósito | Prioridad | Redirigir a |
| ----- | --------- | --------- | ----------- |
| `invest@abvetos-intelligence.com` | Consultas de inversores | Alta | `ruben.espinar.10@icloud.com` |
| `legal@abvetos-intelligence.com` | Asuntos legales y patentes | Alta | `ruben.espinar.10@icloud.com` |
| `partnerships@tryonyou.ai` | Alianzas estratégicas | Alta | `ruben.espinar.10@icloud.com` |
| `contact@tryonyou.app` | Contacto general | Media | `ruben.espinar.10@icloud.com` |

---

## 🛠️ Opciones de Configuración

### Opción 1: Google Workspace (Recomendado para startups)

**Ventajas:**

- Profesional y confiable
- Integración con Gmail
- 30GB de almacenamiento por usuario
- Costo: ~$6/usuario/mes

**Pasos:**

1. **Registrarse en Google Workspace**
   - Ir a: <https://workspace.google.com>
   - Seleccionar plan "Business Starter"

2. **Verificar Dominios**
   - `abvetos-intelligence.com`
   - `tryonyou.ai`
   - `tryonyou.app`

3. **Configurar registros DNS** (en tu proveedor de dominio):

```dns
# Registros MX para abvetos-intelligence.com
MX 1  ASPMX.L.GOOGLE.COM
MX 5  ALT1.ASPMX.L.GOOGLE.COM
MX 5  ALT2.ASPMX.L.GOOGLE.COM
MX 10 ALT3.ASPMX.L.GOOGLE.COM
MX 10 ALT4.ASPMX.L.GOOGLE.COM

# Repetir para tryonyou.ai y tryonyou.app
```

1. **Crear Usuarios/Aliases**
   - Crear usuario principal: `ruben@abvetos-intelligence.com`
   - Crear aliases:
     - `invest@abvetos-intelligence.com` → `ruben@abvetos-intelligence.com`
     - `legal@abvetos-intelligence.com` → `ruben@abvetos-intelligence.com`
     - `partnerships@tryonyou.ai` → `ruben@abvetos-intelligence.com`
     - `contact@tryonyou.app` → `ruben@abvetos-intelligence.com`

1. **Configurar Reenvío Automático**
   - En Gmail > Settings > Forwarding
   - Añadir: `ruben.espinar.10@icloud.com`
   - Mantener copia en bandeja de entrada

---

### Opción 2: Zoho Mail (Alternativa económica)

**Ventajas:**

- Plan gratuito para 5 usuarios
- Profesional
- Sin publicidad

**Pasos:**

1. Registrarse en: <https://www.zoho.com/mail/>
2. Seguir pasos similares a Google Workspace
3. Configurar DNS según indicaciones de Zoho

---

### Opción 3: Cloudflare Email Routing (Más económico)

**Ventajas:**

- **100% GRATUITO**
- Solo reenvío (no buzón de entrada)
- Perfecto para aliases simples

**Pasos:**

1. **Ir a Cloudflare Dashboard**
   - <https://dash.cloudflare.com>

2. **Activar Email Routing**
   - Seleccionar dominio: `abvetos-intelligence.com`
   - Email Routing > Get Started

3. **Crear Reglas de Reenvío**

```text
invest@abvetos-intelligence.com → ruben.espinar.10@icloud.com
legal@abvetos-intelligence.com → ruben.espinar.10@icloud.com
partnerships@tryonyou.ai → ruben.espinar.10@icloud.com
contact@tryonyou.app → ruben.espinar.10@icloud.com
```

1. **Verificar Email**
   - Cloudflare enviará email de verificación a `ruben.espinar.10@icloud.com`
   - Hacer clic en el enlace de confirmación

1. **Configurar DNS (Automático)**
   - Cloudflare configurará registros MX automáticamente

---

## 📝 Registro SPF, DKIM y DMARC (Importante para deliverability)

### Registros DNS recomendados

```dns
# SPF (Sender Policy Framework)
TXT @ "v=spf1 include:_spf.google.com ~all"

# DKIM (generado por Google Workspace/Zoho)
TXT google._domainkey "v=DKIM1; k=rsa; p=MIGfMA0GCS..."

# DMARC (Policy de autenticación)
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:legal@abvetos-intelligence.com"
```

---

## 🔐 Seguridad Adicional

### 1. Autenticación de Dos Factores (2FA)

- Activar 2FA en todas las cuentas de correo
- Usar Google Authenticator o similar

### 2. Aplicaciones Específicas

- Generar contraseñas de aplicación para:
  - Clientes de correo (Outlook, Thunderbird)
  - Scripts de automatización

### 3. Filtros Anti-Spam

- Configurar reglas para inversores verificados
- Lista blanca para:
  - `@hub71.com`
  - `@vc.com`
  - Dominios de inversores conocidos

---

## 📱 Configuración en Dispositivos

### iPhone/iPad (iCloud Mail)

1. **Añadir Cuenta**
   - Ajustes > Mail > Cuentas > Añadir cuenta
   - Seleccionar "Otra"

2. **Configuración IMAP (Google Workspace)**

```text
IMAP:
  Servidor: imap.gmail.com
  Puerto: 993
  SSL: Activado
  Usuario: invest@abvetos-intelligence.com
  Contraseña: [tu contraseña]

SMTP:
  Servidor: smtp.gmail.com
  Puerto: 587
  TLS: Activado
```

### Mac Mail

Similar al iPhone, usar misma configuración IMAP/SMTP

---

## 🚀 Recomendación Inmediata

**Para arrancar rápido (Cloudflare Email Routing):**

1. ✅ Gratis
2. ✅ Configuración en 10 minutos
3. ✅ Todos los emails llegan a tu iCloud
4. ✅ Puedes responder desde `ruben.espinar.10@icloud.com` (temporal)

**Para profesionalismo completo (Google Workspace):**

1. Invertir ~$6/mes
2. Tener emails corporativos reales
3. Poder enviar desde `invest@abvetos-intelligence.com`
4. Suite completa (Drive, Calendar, Meet)

---

## 📞 Próximos Pasos

1. [ ] Elegir proveedor (Cloudflare/Google/Zoho)
2. [ ] Verificar propiedad de dominios
3. [ ] Configurar registros DNS
4. [ ] Crear aliases/usuarios
5. [ ] Configurar reenvío a iCloud
6. [ ] Activar SPF/DKIM/DMARC
7. [ ] Probar enviando emails de prueba
8. [ ] Configurar en dispositivos móviles

---

**Contacto Técnico:**  
Rubén Espinar Rodríguez  
<ruben.espinar.10@icloud.com>

**Última Actualización:** December 27, 2025
