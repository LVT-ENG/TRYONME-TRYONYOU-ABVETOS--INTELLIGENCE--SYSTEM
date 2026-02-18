# 🚀 TRYONYOU - Guía de Despliegue Completa

## 📋 Protocolo Ultimatum V7 - Despliegue Final

Este paquete contiene el proyecto **TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM** completamente configurado y listo para producción.

> **🎯 IMPORTANTE:** Después del despliegue, usa la [Guía de Validación Lafayette](./LAFAYETTE_VALIDATION_GUIDE.md) para verificar que todo funciona correctamente antes de presentar a Galeries Lafayette.

---

## ✅ Contenido del Paquete

- ✅ Código fuente completo (React 19.1.1 + Vite 7.3.1)
- ✅ Assets organizados y mapeados correctamente
- ✅ Build de producción compilado (`/dist`)
- ✅ Configuración de variables de entorno
- ✅ Documentación legal (patente, investor dossier)

---

## 🖥️ Paso 0: Configuración Local (Desarrollo)

Si vas a trabajar en el proyecto localmente, primero configura las variables de entorno:

### 0.1 Crear archivo de configuración local:

```bash
# Copia el template de variables de entorno
cp .env.template .env.local

# Edita .env.local y añade tu Google API Key
# Reemplaza 'your_google_api_key_here' con tu clave real
```

**Contenido mínimo de `.env.local`:**
```bash
VITE_GOOGLE_API_KEY=AIzaSyBuKZh-SJtXOi4lHE3bA_K437xcKL0a9RM
VITE_PILOT_MODE=LAFAYETTE_ACTIVE
```

### 0.2 Instalar dependencias y ejecutar:

```bash
npm install
npm run dev
```

⚠️ **Nota:** El archivo `.env.local` está en `.gitignore` y NO se subirá a GitHub por seguridad.

---

## 🔧 Paso 1: Subir a GitHub

### 1.1 Desde tu terminal local:

```bash
# Navega al directorio extraído
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Verifica el estado del repositorio
git status

# Asegúrate de que el remoto esté configurado
git remote -v

# Si no está configurado, añádelo:
git remote add origin https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git

# Push a GitHub
git push origin master:main
```

### 1.2 O usa GitHub Desktop:
1. Abre GitHub Desktop
2. File → Add Local Repository
3. Selecciona la carpeta del proyecto
4. Click "Publish repository"

---

## 🌐 Paso 2: Desplegar en Vercel

### 2.1 Conectar con Vercel:

1. Ve a https://vercel.com/dashboard
2. Click "Add New Project"
3. Selecciona "Import Git Repository"
4. Busca: `LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM`
5. Click "Import"

### 2.2 Configuración del Proyecto:

**Framework Preset:** Vite  
**Build Command:** `npm run build`  
**Output Directory:** `dist`  
**Install Command:** `npm install`  
**Root Directory:** (dejar vacío)

### 2.3 Variables de Entorno (CRÍTICO):

⚠️ **IMPORTANTE:** El motor biométrico NO funcionará sin `VITE_GOOGLE_API_KEY`. Debes configurarlo obligatoriamente.

#### Opción A: Mediante la interfaz web de Vercel

En "Environment Variables", añade:

| Key | Value | Environments |
|-----|-------|--------------|
| `VITE_GOOGLE_API_KEY` | `your_google_api_key_here` | Production, Preview, Development |
| `VITE_PORKBUN_API` | `your_porkbun_api_key_here` | Production, Preview, Development |
| `VITE_PILOT_MODE` | `LAFAYETTE_ACTIVE` | Production, Preview, Development |

#### Opción B: Mediante Vercel CLI

Si tienes instalado Vercel CLI, puedes añadir las variables con:

```bash
vercel env add VITE_GOOGLE_API_KEY
# Cuando te pregunte el valor, introduce: AIzaSyBuKZh-SJtXOi4lHE3bA_K437xcKL0a9RM
# Selecciona todos los entornos: Production, Preview, Development

vercel env add VITE_PILOT_MODE
# Valor: LAFAYETTE_ACTIVE
```

**Obtén las API keys:**
- Google Gemini: https://makersuite.google.com/app/apikey
- Porkbun: https://porkbun.com/account/api

### 2.4 Configurar Dominio:

1. En el proyecto de Vercel, ve a "Settings" → "Domains"
2. Añade: `tryonyou.app`
3. Sigue las instrucciones para configurar DNS en Porkbun

---

## 🔐 Paso 3: Configurar DNS (Porkbun)

1. Ve a https://porkbun.com/account/domainsSpeedy
2. Selecciona el dominio `tryonyou.app`
3. Añade los registros DNS que Vercel te proporciona:
   - Tipo: `A` → Valor: `76.76.21.21`
   - Tipo: `CNAME` → Nombre: `www` → Valor: `cname.vercel-dns.com`

---

## 📦 Estructura del Proyecto

```
TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/
├── public/
│   ├── assets/
│   │   ├── catalog/          # Prendas del catálogo
│   │   ├── branding/         # Logo y branding
│   │   ├── hero/             # Imágenes hero
│   │   └── ui/               # Elementos UI
│   └── docs/
│       ├── investor/         # Presentación comercial
│       └── patent_EPCT/      # Documentación patente
├── src/
│   ├── components/           # Componentes React
│   ├── modules/              # Módulos (SmartWardrobe)
│   ├── pages/                # Páginas
│   └── contexts/             # Contextos React
├── dist/                     # Build de producción
├── .env                      # Variables de entorno
├── package.json              # Dependencias
└── vite.config.js            # Configuración Vite
```

---

## 🎯 Verificación Post-Despliegue

Una vez desplegado, usa la **[Guía de Validación Lafayette](./LAFAYETTE_VALIDATION_GUIDE.md)** para verificar los 3 puntos críticos:

### 1. 🎨 Identidad Visual "Divineo"
- ✅ Fondo antracita oscuro (#141619) y detalles en oro (#C5A46D)
- ✅ Banner "PILOTO LAFAYETTE ACTIVO" visible
- ✅ Imagen de galerías Lafayette como fondo
- ✅ Mascota Pau con esmoquin en esquina inferior izquierda

### 2. 🛡️ Motor Biométrico
- ✅ Indicador de estado visible (verde = online, rojo = offline)
- ✅ Si offline: configurar `VITE_GOOGLE_API_KEY` en Vercel

### 3. 🌐 Dominio Oficial
- ✅ URL `tryonyou.app` funcionando (no solo `...vercel.app`)
- ✅ DNS configurado correctamente en Porkbun

**Ver detalles completos en:** [LAFAYETTE_VALIDATION_GUIDE.md](./LAFAYETTE_VALIDATION_GUIDE.md)

---

## 🆘 Solución de Problemas

### Problema: Página en blanco
**Solución:** Verifica que el Output Directory sea `dist` y no `build`

### Problema: Assets no cargan
**Solución:** Verifica que la estructura `public/assets/` esté intacta

### Problema: IA no funciona
**Solución:** Verifica que `VITE_GOOGLE_API_KEY` esté configurada en Vercel

### Problema: Dominio no resuelve
**Solución:** Espera 24-48h para propagación DNS o usa `dig tryonyou.app` para verificar

---

## 📞 Soporte

- Repositorio: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
- Vercel Docs: https://vercel.com/docs
- Porkbun DNS: https://kb.porkbun.com/

---

## 🏁 Estado Final

**PROYECTO LISTO PARA DESPLIEGUE**

Este paquete representa el estado completo del **Protocolo Ultimatum V7** con:
- ✅ Código consolidado
- ✅ Assets mapeados
- ✅ Build estable
- ✅ Configuración validada

**Tiempo estimado de despliegue:** 10-15 minutos

---

*Generado por AGENTE70 - Protocolo Ultimatum V7*
*Fecha: 2026-01-08*
