# 🚀 Quick Start - Deploy Express FIX RUN v1

## ⚡ Inicio Rápido en 3 Pasos

### Paso 1: Configura el Token de Vercel

1. Ve a https://vercel.com/account/tokens
2. Crea un nuevo token
3. Ve a https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/settings/secrets/actions
4. Añade el secret `VERCEL_TOKEN` con el token de Vercel

### Paso 2: Activa el Workflow

1. Ve a https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions
2. Selecciona "🚀 TRYONYOU Deploy Express by ABVET"
3. Haz clic en "Run workflow" → "Run workflow"

### Paso 3: Verifica el Deploy

1. Espera 2-3 minutos a que termine el workflow
2. Ve a https://vercel.com/dashboard
3. Verifica que el deploy se completó correctamente
4. Visita tu sitio en la URL de Vercel

---

## 📚 Documentación Completa

Para una guía más detallada, consulta:

- **README_FIX.md** - Guía paso a paso completa
- **TRYONYOU_DEPLOY_EXPRESS_INBOX/README.txt** - Explicación del flujo automático
- **GUIA_CONFIGURACION_DOMINIO_TRYONYOU.md** - Configuración de dominio personalizado
- **VERIFICATION.md** - Verificación de la implementación

---

## 🎯 Workflow Automático

Una vez configurado, cada push a la rama `main` activará automáticamente:

```
Push → Checkout → Node.js 22 → npm install → npm build → Deploy to Vercel
```

---

## ⚙️ Workflow File

El workflow está en: `.github/workflows/main.yml`

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

---

## 🔧 Estructura del Proyecto

```
DeployExpress_FIX_RUN_v1/
├── QUICKSTART.md                    ← Estás aquí
├── README_FIX.md                    ← Guía paso a paso
├── VERIFICATION.md                  ← Estado de implementación
├── LICENSE.md                       ← Licencia
└── TRYONYOU_DEPLOY_EXPRESS_INBOX/
    ├── README.txt                   ← Flujo automático explicado
    ├── DIVINEO_ENTREGA_FINAL.md    ← Certificación de entrega
    ├── GUIA_CONFIGURACION_DOMINIO_TRYONYOU.md
    └── deploy_package/              ← Archivos de configuración
        ├── package.json
        ├── vite.config.js
        ├── index.html
        └── main.jsx
```

---

## 🐛 Problemas Comunes

### "VERCEL_TOKEN is not set"
→ Configura el secret en GitHub Settings → Secrets and variables → Actions

### "Build failed"
→ Ejecuta `npm run build` localmente para ver el error

### "vercel: command not found"
→ El workflow usa `npx vercel` que instala automáticamente

---

## 📞 Necesitas Ayuda?

- 📖 Lee README_FIX.md para guía detallada
- 🐛 Abre un issue en GitHub
- 📧 Email: info@tryonyou.app

---

**Sistema:** ABVETOS INTELLIGENCE  
**Versión:** 1.0  
**Estado:** ✅ Listo para usar
