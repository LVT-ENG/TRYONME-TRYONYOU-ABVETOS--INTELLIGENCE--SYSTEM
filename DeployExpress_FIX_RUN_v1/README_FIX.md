# TRYONYOU - Guía de Deploy Express (FIX_RUN_v1)

## 📋 Contenido del Paquete

Esta es la guía paso a paso para desplegar TRYONYOU utilizando el paquete DeployExpress_FIX_RUN_v1.

### Estructura del Paquete

```
DeployExpress_FIX_RUN_v1/
├── TRYONYOU_DEPLOY_EXPRESS_INBOX/
│   ├── README.txt                          # Instrucciones del paquete
│   ├── deploy_package/                     # Archivos de deployment
│   │   ├── package.json                    # Dependencias del proyecto
│   │   ├── vite.config.js                  # Configuración de Vite
│   │   ├── index.html                      # Punto de entrada HTML
│   │   ├── main.jsx                        # Punto de entrada React
│   │   └── src/components/                 # Componentes esenciales
│   │       ├── Header.jsx
│   │       ├── Hero.jsx
│   │       └── Footer.jsx
│   ├── vercel.json                         # Configuración Vercel (incluye domain: "tryonyou.app")
│   └── .backup/                            # Copias de seguridad (sync con Google Drive)
├── README_FIX.md                           # Esta guía
└── LICENSE.md                              # Licencia del proyecto
```

## 🚀 Despliegue Rápido

### Opción 1: Deploy Automático con GitHub Actions

El proyecto incluye un workflow configurado en `.github/workflows/main.yml` que se ejecuta automáticamente.

**Requisitos previos:**
- Configurar GitHub Secrets (ver sección Configuración de Secrets)

**Pasos:**
1. Push a la rama `main`:
   ```bash
   git push origin main
   ```
2. El workflow se ejecutará automáticamente
3. Verifica el progreso en: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions

### Opción 2: Deploy Manual con Vercel CLI

**Paso 1: Instalar Vercel CLI**
```bash
npm install -g vercel@latest
```

**Paso 2: Configurar credenciales**
```bash
export VERCEL_TOKEN="t9mc4kHGRS0VTWBR6qtJmvOw"
export VERCEL_PROJECT_ID="prj_Wkq9QCEn6RJr3x7AMpNkbIZ2Z2AX4"
export VERCEL_TEAM_ID="team_SDhjSkxLVE7oJ3S5KPkwG9uC"
```

**Paso 3: Deploy a producción**
```bash
cd /path/to/project
vercel --prod --token=$VERCEL_TOKEN
```

### Opción 3: Deploy desde Vercel Dashboard

1. Accede a https://vercel.com/dashboard
2. Selecciona el proyecto: `tryonme-tryonyou-abvetos-intelligence-system`
3. Ve a la pestaña **Deployments**
4. Haz clic en **Redeploy** del último deployment
5. Selecciona **Use existing Build Cache: No**
6. Haz clic en **Redeploy**

## ⚙️ Configuración de Secrets

Para que el workflow automático funcione, configura los siguientes GitHub Secrets:

### En GitHub:
1. Ve a: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/settings/secrets/actions
2. Crea los siguientes secrets:

| Secret Name | Value |
|-------------|-------|
| `VERCEL_TOKEN` | `t9mc4kHGRS0VTWBR6qtJmvOw` |
| `VERCEL_PROJECT_ID` | `prj_Wkq9QCEn6RJr3x7AMpNkbIZ2Z2AX4` |
| `VERCEL_TEAM_ID` | `team_SDhjSkxLVE7oJ3S5KPkwG9uC` |

## 🛠️ Desarrollo Local

### Instalación
```bash
# 1. Navega al directorio del deploy_package
cd DeployExpress_FIX_RUN_v1/TRYONYOU_DEPLOY_EXPRESS_INBOX/deploy_package/

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

El servidor estará disponible en: http://localhost:5173

### Build local
```bash
npm run build
```

### Preview del build
```bash
npm run preview
```

## 🌐 Configuración del Dominio

El archivo `vercel.json` incluye la configuración para el dominio tryonyou.app:

```json
{
  "alias": ["tryonyou.app", "www.tryonyou.app"],
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Verificar configuración DNS

Asegúrate de que los registros DNS estén configurados:

**Registro A:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

**Registro CNAME:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

## 📊 Workflow de GitHub Actions

El workflow en `.github/workflows/main.yml` incluye:

- ✅ **Node.js 22**: Versión actualizada y estable
- ✅ **Build automático**: Ejecuta `npm run build`
- ✅ **Deploy a Vercel**: Automático en push a main
- ✅ **Preview deployments**: Para Pull Requests
- ✅ **Verificación de build**: Confirma éxito del build

### Características del Workflow:

```yaml
- Node.js 22 con cache de npm
- Build de producción
- Deploy automático a Vercel
- Soporte para Git LFS
- Validación de build output
```

## 🔍 Verificación del Deploy

Después del deploy, verifica:

1. **URL de producción**: https://tryonyou.app
2. **Estado del build**: Verifica en GitHub Actions
3. **Logs de Vercel**: Revisa en el dashboard de Vercel
4. **Funcionalidad**: Prueba todas las páginas y funciones

### Checklist Post-Deploy:

- [ ] El sitio carga correctamente en https://tryonyou.app
- [ ] Todas las páginas son accesibles
- [ ] Los assets (imágenes, videos) cargan correctamente
- [ ] El sitio es responsive (móvil/desktop)
- [ ] No hay errores en la consola del navegador
- [ ] SSL está activo (candado verde en el navegador)
- [ ] Redirección de www funciona correctamente

## 🐛 Troubleshooting

### Build falla en GitHub Actions

**Solución 1: Limpiar cache**
```bash
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

**Solución 2: Verificar secrets**
- Confirma que todos los GitHub Secrets están configurados
- Verifica que no haya espacios extras en los valores

### Deploy falla en Vercel

**Solución 1: Redeploy manual**
```bash
vercel --prod --force --token=$VERCEL_TOKEN
```

**Solución 2: Verificar logs**
```bash
vercel logs --token=$VERCEL_TOKEN
```

### El dominio no resuelve

**Solución:**
1. Verifica configuración DNS
2. Espera propagación DNS (hasta 48 horas)
3. Limpia caché DNS: `ipconfig /flushdns` (Windows) o `sudo dscacheutil -flushcache` (Mac)

## 📦 Backup Automático

El directorio `.backup/` está configurado para sincronización automática con Google Drive.

**Contenido del backup:**
- Configuraciones de deployment
- Builds exitosos
- Logs de deployment
- Snapshots del código

## 📞 Soporte

### Documentación adicional:
- `DEPLOYMENT.md` - Guía completa de deployment
- `GITHUB_SECRETS_SETUP.md` - Configuración de secrets detallada
- `VERCEL_DOMAIN_SETUP.md` - Configuración de dominio paso a paso

### Contacto:
- **Email**: info@tryonyou.app
- **Repository**: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

## 📄 Notas de Versión

### DeployExpress_FIX_RUN_v1
- ✅ Workflow corregido y validado
- ✅ Node.js 22 configurado
- ✅ Vercel integration funcional
- ✅ Dominio tryonyou.app configurado
- ✅ Backup automático habilitado
- ✅ Documentación completa

## 🔐 Seguridad

- Los tokens y secrets deben mantenerse privados
- No commitees credenciales en el código
- Usa GitHub Secrets para información sensible
- Rota tokens regularmente
- Habilita 2FA en Vercel y GitHub

## ✅ Próximos Pasos

1. Configura los GitHub Secrets (si no lo has hecho)
2. Haz push a la rama main
3. Verifica el deployment en GitHub Actions
4. Prueba el sitio en https://tryonyou.app
5. Configura monitoreo y analytics

---

**© 2025 TRYONYOU. All rights reserved.**
Patent-protected technology (EPCT Pending).
