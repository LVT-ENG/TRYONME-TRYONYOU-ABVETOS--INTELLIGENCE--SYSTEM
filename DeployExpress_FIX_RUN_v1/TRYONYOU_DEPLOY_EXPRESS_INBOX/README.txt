# TRYONYOU - Deploy Express Package
# =====================================

Este paquete contiene todos los archivos necesarios para el despliegue rápido de TRYONYOU en Vercel.

## Contenido del Paquete

1. deploy_package/
   - package.json: Configuración de dependencias del proyecto
   - vite.config.js: Configuración de Vite para el build
   - index.html: Punto de entrada HTML
   - main.jsx: Punto de entrada de React
   - src/components/: Componentes de React

2. vercel.json
   - Configuración de Vercel con dominio tryonyou.app

3. .backup/
   - Directorio para copias de seguridad (se sincroniza automáticamente con Google Drive)

## Instrucciones de Uso

1. Copia el contenido de deploy_package/ a tu directorio de proyecto
2. Ejecuta: npm install
3. Para desarrollo: npm run dev
4. Para producción: npm run build
5. Deploy a Vercel: vercel --prod

## Configuración del Dominio

El archivo vercel.json ya incluye la configuración para:
- Dominio principal: tryonyou.app
- Framework: Vite
- Build command: npm run build
- Output directory: dist

## Soporte

Para asistencia, consulta README_FIX.md en el directorio raíz.
