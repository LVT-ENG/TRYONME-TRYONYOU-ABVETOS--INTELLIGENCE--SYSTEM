╔══════════════════════════════════════════════════════════════════════════════╗
║                    TRYONYOU DEPLOY EXPRESS - FLUJO AUTOMÁTICO                ║
║                         by ABVETOS INTELLIGENCE SYSTEM                        ║
╚══════════════════════════════════════════════════════════════════════════════╝

📦 CONTENIDO DE ESTE PAQUETE
────────────────────────────────────────────────────────────────────────────────

Este directorio contiene todos los recursos necesarios para el despliegue 
automático de TRYONYOU en Vercel mediante GitHub Actions.

📂 ESTRUCTURA DE ARCHIVOS:
  
  ├── README.txt                          ← Este archivo (flujo automático)
  ├── TRYONYOU_FabricTests_DIVINEO.zip   ← Tests y validaciones
  ├── DIVINEO_ENTREGA_FINAL.md           ← Documentación de entrega
  ├── GUIA_CONFIGURACION_DOMINIO_TRYONYOU.md  ← Configuración de dominio
  └── deploy_package/                     ← Paquete de despliegue
      ├── package.json                    ← Dependencias del proyecto
      ├── vite.config.js                  ← Configuración de Vite
      ├── index.html                      ← Punto de entrada HTML
      ├── main.jsx                        ← Punto de entrada React
      └── src/
          └── components/                 ← Componentes de React

🚀 FLUJO AUTOMÁTICO DE DESPLIEGUE
────────────────────────────────────────────────────────────────────────────────

El workflow de GitHub Actions (.github/workflows/main.yml) ejecuta 
automáticamente los siguientes pasos cada vez que se hace push a la rama main:

1. 📥 CHECKOUT DEL REPOSITORIO
   - Clona el código más reciente del repositorio
   - Usa: actions/checkout@v4

2. ⚙️  CONFIGURACIÓN DE NODE.JS 22
   - Instala Node.js versión 22.x
   - Usa: actions/setup-node@v4

3. 📦 INSTALACIÓN DE DEPENDENCIAS
   - Ejecuta: npm install
   - Instala todas las dependencias definidas en package.json

4. 🔨 BUILD DEL PROYECTO
   - Ejecuta: npm run build
   - Genera los archivos optimizados en dist/

5. 🌐 DEPLOY A VERCEL
   - Ejecuta: npx vercel --prod --yes --confirm
   - Usa el token de Vercel desde secrets.VERCEL_TOKEN
   - Despliega directamente a producción

✅ REQUISITOS PREVIOS
────────────────────────────────────────────────────────────────────────────────

Para que el workflow funcione correctamente, debes configurar:

🔐 SECRETS DE GITHUB (en Settings → Secrets and variables → Actions):

  • VERCEL_TOKEN          → Token de autenticación de Vercel
  • VERCEL_PROJECT_ID     → ID del proyecto en Vercel (opcional)
  • VERCEL_ORG_ID         → ID de la organización en Vercel (opcional)

📋 CÓMO OBTENER LOS SECRETS:

1. VERCEL_TOKEN:
   - Ve a: https://vercel.com/account/tokens
   - Crea un nuevo token
   - Copia el valor

2. VERCEL_PROJECT_ID y VERCEL_ORG_ID:
   - Ve a tu proyecto en Vercel
   - Settings → General
   - Encontrarás ambos IDs ahí

🎯 USO DEL SISTEMA
────────────────────────────────────────────────────────────────────────────────

OPCIÓN 1: DESPLIEGUE AUTOMÁTICO (RECOMENDADO)
  1. Haz cambios en tu código
  2. Commit: git add . && git commit -m "tu mensaje"
  3. Push: git push origin main
  4. ¡El workflow se activa automáticamente!
  5. Revisa el progreso en: GitHub → Actions

OPCIÓN 2: DESPLIEGUE MANUAL
  1. Ve a: GitHub → Actions → 🚀 TRYONYOU Deploy Express
  2. Haz clic en "Run workflow"
  3. Selecciona la rama "main"
  4. Haz clic en "Run workflow"

📊 MONITOREO DEL DESPLIEGUE
────────────────────────────────────────────────────────────────────────────────

1. Ve a: https://github.com/[tu-usuario]/[tu-repo]/actions
2. Busca el workflow "🚀 TRYONYOU Deploy Express by ABVET"
3. Haz clic en el run más reciente
4. Verás el progreso de cada paso en tiempo real

Estados posibles:
  🟡 Amarillo (⏳) → En progreso
  🟢 Verde (✓)     → Éxito
  🔴 Rojo (✗)      → Error

🐛 SOLUCIÓN DE PROBLEMAS
────────────────────────────────────────────────────────────────────────────────

❌ ERROR: "Resource not accessible by integration"
   → Verifica los permisos del workflow en Settings → Actions

❌ ERROR: "VERCEL_TOKEN is not set"
   → Configura el secret VERCEL_TOKEN en GitHub

❌ ERROR: "Build failed"
   → Revisa los logs en GitHub Actions
   → Ejecuta npm run build localmente para detectar errores

❌ ERROR: "vercel: command not found"
   → El workflow usa npx, que instala vercel automáticamente
   → Si falla, verifica la conexión de red

🔗 ENLACES ÚTILES
────────────────────────────────────────────────────────────────────────────────

📖 Documentación:
   • GitHub Actions: https://docs.github.com/actions
   • Vercel CLI: https://vercel.com/docs/cli
   • Vite: https://vitejs.dev

🌐 Plataformas:
   • GitHub Repo: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
   • Vercel Dashboard: https://vercel.com/dashboard
   • Sitio Web: https://tryonyou.app

📞 SOPORTE
────────────────────────────────────────────────────────────────────────────────

¿Necesitas ayuda?
  📧 Email: info@tryonyou.app
  🐛 Issues: GitHub Issues del repositorio
  📚 Docs: Ver README_FIX.md para guía paso a paso

────────────────────────────────────────────────────────────────────────────────
Versión: 1.0 | Fecha: Octubre 2025 | Sistema: ABVETOS INTELLIGENCE
────────────────────────────────────────────────────────────────────────────────
