# 🔧 README FIX - Guía Paso a Paso para Deploy Express

## 🎯 Objetivo

Esta guía te llevará paso a paso por el proceso de configuración y activación del sistema de despliegue automático TRYONYOU Deploy Express.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Paso 1: Verificar el Workflow](#paso-1-verificar-el-workflow)
3. [Paso 2: Configurar Secrets de GitHub](#paso-2-configurar-secrets-de-github)
4. [Paso 3: Activar el Workflow](#paso-3-activar-el-workflow)
5. [Paso 4: Verificar el Despliegue](#paso-4-verificar-el-despliegue)
6. [Paso 5: Configurar el Dominio](#paso-5-configurar-el-dominio)
7. [Solución de Problemas](#solución-de-problemas)

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener:

- [x] Cuenta de GitHub con acceso al repositorio
- [x] Permisos de administrador en el repositorio
- [x] Cuenta de Vercel activa
- [x] Token de Vercel (lo obtendremos en el Paso 2)

---

## 🔍 Paso 1: Verificar el Workflow

### 1.1 Ubicación del Workflow

El workflow de GitHub Actions se encuentra en:

```
.github/workflows/main.yml
```

### 1.2 Contenido del Workflow

El archivo debe contener:

```yaml
name: 🚀 TRYONYOU Deploy Express by ABVET

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Use Node.js 22
        uses: actions/setup-node@v4
        with:
          node-version: 22.x

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to Vercel
        run: npx vercel --prod --yes --confirm --token=${{ secrets.VERCEL_TOKEN }}
```

### 1.3 Verificar en GitHub

1. Ve a tu repositorio en GitHub
2. Navega a `.github/workflows/main.yml`
3. Confirma que el contenido coincide con el anterior

✅ **Checkpoint:** El archivo main.yml existe y tiene el contenido correcto.

---

## 🔐 Paso 2: Configurar Secrets de GitHub

Los secrets son variables de entorno seguras que GitHub Actions usa para autenticarse con Vercel.

### 2.1 Obtener Token de Vercel

1. **Accede a Vercel:**
   - Ve a https://vercel.com/account/tokens

2. **Crea un nuevo token:**
   - Haz clic en "Create Token"
   - Nombre: `TRYONYOU_DEPLOY`
   - Scope: Full Account
   - Haz clic en "Create"

3. **Copia el token:**
   - ⚠️ **IMPORTANTE:** Copia el token inmediatamente
   - No podrás verlo de nuevo
   - Guárdalo temporalmente en un lugar seguro

### 2.2 Obtener Project ID y Org ID (Opcional)

Estos IDs son opcionales pero recomendados:

1. **Accede a tu proyecto en Vercel:**
   - Ve a https://vercel.com/dashboard
   - Selecciona el proyecto TRYONYOU

2. **Obtén los IDs:**
   - Ve a Settings → General
   - Copia:
     - `Project ID` (ejemplo: `prj_Wkq9QCEn6RJr3x7AMpNkbIZ2Z2AX4`)
     - `Team ID` (ejemplo: `team_SDhjSkxLVE7oJ3S5KPkwG9uC`)

### 2.3 Añadir Secrets en GitHub

1. **Accede a Settings del repositorio:**
   ```
   https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/settings/secrets/actions
   ```

2. **Añade VERCEL_TOKEN:**
   - Haz clic en "New repository secret"
   - Name: `VERCEL_TOKEN`
   - Secret: [pega el token de Vercel]
   - Haz clic en "Add secret"

3. **Añade VERCEL_PROJECT_ID (opcional):**
   - Haz clic en "New repository secret"
   - Name: `VERCEL_PROJECT_ID`
   - Secret: [pega el Project ID]
   - Haz clic en "Add secret"

4. **Añade VERCEL_ORG_ID (opcional):**
   - Haz clic en "New repository secret"
   - Name: `VERCEL_ORG_ID`
   - Secret: [pega el Team ID]
   - Haz clic en "Add secret"

### 2.4 Verificar Secrets

1. Ve a Settings → Secrets and variables → Actions
2. Deberías ver al menos:
   - ✅ `VERCEL_TOKEN`
   - ✅ `VERCEL_PROJECT_ID` (opcional)
   - ✅ `VERCEL_ORG_ID` (opcional)

✅ **Checkpoint:** Los secrets están configurados correctamente.

---

## 🚀 Paso 3: Activar el Workflow

### 3.1 Habilitar GitHub Actions

1. **Ve a la pestaña Actions:**
   ```
   https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions
   ```

2. **Habilita workflows:**
   - Si ves "Workflows disabled", haz clic en "I understand my workflows, go ahead and enable them"

### 3.2 Trigger Manual (Primera Vez)

Para probar el workflow sin hacer un push:

1. **Ve a Actions → 🚀 TRYONYOU Deploy Express by ABVET**

2. **Ejecuta manualmente:**
   - Haz clic en "Run workflow"
   - Branch: `main`
   - Haz clic en "Run workflow"

3. **Observa el progreso:**
   - Verás el workflow en "Running"
   - Haz clic en el workflow para ver detalles
   - Observa cada paso ejecutándose

### 3.3 Despliegue Automático

Una vez que el workflow manual funcione, cada push a `main` activará el despliegue automáticamente:

```bash
# En tu máquina local
git add .
git commit -m "Test deploy"
git push origin main

# El workflow se activará automáticamente
```

✅ **Checkpoint:** El workflow se ejecuta correctamente.

---

## ✅ Paso 4: Verificar el Despliegue

### 4.1 Verificar en GitHub Actions

1. **Estado del Workflow:**
   - 🟢 Verde = Éxito
   - 🔴 Rojo = Error
   - 🟡 Amarillo = En progreso

2. **Ver Logs:**
   - Haz clic en el workflow
   - Haz clic en "deploy"
   - Expande cada paso para ver detalles

### 4.2 Verificar en Vercel

1. **Accede a Vercel Dashboard:**
   - Ve a https://vercel.com/dashboard

2. **Selecciona el proyecto TRYONYOU**

3. **Ve a Deployments:**
   - Deberías ver un nuevo deployment
   - Estado: "Ready"
   - Source: "main branch"

### 4.3 Probar el Sitio

1. **Obtén la URL:**
   - En Vercel, haz clic en el deployment
   - Copia la URL (ejemplo: `https://tryonyou-xxx.vercel.app`)

2. **Abre en navegador:**
   - Pega la URL en tu navegador
   - Verifica que el sitio carga correctamente

✅ **Checkpoint:** El sitio está desplegado y funcionando.

---

## 🌐 Paso 5: Configurar el Dominio

### 5.1 Consulta la Guía de Dominio

Para configurar el dominio personalizado `tryonyou.app`:

📖 Lee: `GUIA_CONFIGURACION_DOMINIO_TRYONYOU.md`

### 5.2 Pasos Resumidos

1. **Configura DNS:**
   - Record A: `@` → `76.76.21.21`
   - Record CNAME: `www` → `cname.vercel-dns.com`

2. **Añade en Vercel:**
   - Settings → Domains
   - Add: `tryonyou.app`
   - Add: `www.tryonyou.app` (redirect)

3. **Espera propagación:**
   - DNS: 5-10 minutos
   - SSL: 24-48 horas

✅ **Checkpoint:** El dominio personalizado está configurado.

---

## 🎉 ¡Completado!

Si has llegado hasta aquí, ¡felicidades! Tu sistema de despliegue automático está funcionando.

### Resumen de lo que tienes:

- ✅ Workflow de GitHub Actions configurado
- ✅ Secrets de Vercel configurados
- ✅ Despliegue automático en cada push a main
- ✅ Sitio funcionando en Vercel
- ✅ Dominio personalizado configurado (opcional)

### Próximos pasos:

1. **Realiza cambios en tu código**
2. **Haz commit y push a main**
3. **El workflow se activará automáticamente**
4. **En 2-3 minutos, tus cambios estarán en producción**

---

## 🐛 Solución de Problemas

### ❌ Error: "Resource not accessible by integration"

**Causa:** Permisos insuficientes en GitHub Actions.

**Solución:**
1. Ve a Settings → Actions → General
2. Workflow permissions → Read and write permissions
3. Allow GitHub Actions to create and approve pull requests ✓
4. Save

### ❌ Error: "VERCEL_TOKEN is not set"

**Causa:** El secret no está configurado correctamente.

**Solución:**
1. Ve a Settings → Secrets and variables → Actions
2. Verifica que `VERCEL_TOKEN` existe
3. Si no existe, créalo con el token de Vercel
4. Si existe, elimínalo y créalo de nuevo

### ❌ Error: "Build failed"

**Causa:** Error en el código o dependencias.

**Solución:**
1. Lee el log completo en GitHub Actions
2. Ejecuta `npm run build` localmente para reproducir
3. Corrige los errores en el código
4. Haz commit y push de nuevo

### ❌ Error: "vercel: command not found"

**Causa:** Vercel CLI no se instaló correctamente.

**Solución:**
1. El workflow usa `npx vercel` que instala automáticamente
2. Verifica que el paso "Install dependencies" se completó
3. Si persiste, añade un step manual:
   ```yaml
   - name: Install Vercel CLI
     run: npm install -g vercel
   ```

### ❌ Error: "Error: No existing credentials found"

**Causa:** Vercel CLI no puede autenticarse.

**Solución:**
1. Asegúrate de usar `--token=${{ secrets.VERCEL_TOKEN }}`
2. Verifica que el token es válido en Vercel
3. Regenera el token si es necesario

### ❌ Workflow no se activa automáticamente

**Causa:** GitHub Actions deshabilitado o workflow deshabilitado.

**Solución:**
1. Ve a Settings → Actions → General
2. Actions permissions → Allow all actions
3. Ve a Actions tab → Busca workflows deshabilitados
4. Habilítalos si están deshabilitados

### ❌ SSL certificate pending en Vercel

**Causa:** Proceso normal, puede tardar 24-48 horas.

**Solución:**
1. Espera 24-48 horas
2. Verifica que los DNS records son correctos
3. En Vercel → Settings → Domains → Refresh
4. Si persiste después de 48h, contacta soporte de Vercel

---

## 📞 Soporte Adicional

### Documentación

- 📖 `README.txt` - Flujo automático explicado
- 📖 `DIVINEO_ENTREGA_FINAL.md` - Certificación de entrega
- 📖 `GUIA_CONFIGURACION_DOMINIO_TRYONYOU.md` - Configuración de dominio

### Enlaces Útiles

- 🌐 [GitHub Actions Docs](https://docs.github.com/actions)
- 🌐 [Vercel Docs](https://vercel.com/docs)
- 🌐 [Vercel CLI Docs](https://vercel.com/docs/cli)

### Contacto

- 📧 Email: info@tryonyou.app
- 🐛 GitHub Issues: [Crear Issue](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues/new)
- 💬 Vercel Support: [Contactar](https://vercel.com/support)

---

## 📊 Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────┐
│                    DESPLIEGUE AUTOMÁTICO                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Push to main    │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ GitHub Actions   │
                    │  se activa       │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Checkout repo    │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Setup Node.js 22 │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ npm install      │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ npm run build    │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Deploy to Vercel │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ ✅ Completado    │
                    │ Sitio en vivo!   │
                    └──────────────────┘
```

---

**Versión:** 1.0  
**Última actualización:** Octubre 2025  
**Autor:** ABVETOS INTELLIGENCE SYSTEM  
**Optimizado por:** DIVINEO

---

*Esta guía te acompañará en cada paso del proceso. Si tienes dudas, consulta la sección de Solución de Problemas o contacta con soporte.*
