# 🚀 TRYONYOU - Guía de Despliegue Completa

## 📋 Protocolo Ultimatum V7 - Despliegue Final

Este paquete contiene el proyecto **TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM** completamente configurado y listo para producción.

---

## ✅ Contenido del Paquete

- ✅ Código fuente completo (React 19.1.1 + Vite 7.3.1)
- ✅ Assets organizados y mapeados correctamente
- ✅ Build de producción compilado (`/dist`)
- ✅ Configuración de variables de entorno
- ✅ Documentación legal (patente, investor dossier)

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

En "Environment Variables", añade:

| Key | Value | Environments |
|-----|-------|--------------|
| `VITE_GOOGLE_API_KEY` | `AIzaSyBuKZh-SJtXOi4lHE3bA_K437xcKL0a9RM` | Production, Preview, Development |
| `VITE_PORKBUN_API` | `pk1_a9500f30e15d4e48cde89418d500` | Production, Preview, Development |
| `VITE_PILOT_MODE` | `LAFAYETTE_ACTIVE` | Production, Preview, Development |

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

Una vez desplegado, verifica:

1. ✅ URL funciona: https://tryonyou.app
2. ✅ Assets cargan correctamente
3. ✅ No hay errores en consola del navegador
4. ✅ Variables de entorno están activas (prueba funcionalidad IA)

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
