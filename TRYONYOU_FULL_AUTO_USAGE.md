# TRYONYOU Full Auto Script — Guía de Uso

## 🎯 ¿Qué es tryonyou_full_auto.sh?

**tryonyou_full_auto.sh** es un script de automatización completa que configura, construye y despliega el proyecto TRYONYOU desde cero. Es ideal para:

✅ Instalación rápida en nuevos sistemas (macOS o Linux)  
✅ Setup completo del entorno de desarrollo  
✅ Creación automática de tema y estructura  
✅ Build y deploy automático a Vercel  
✅ Backups automáticos del proyecto  

---

## 🚀 Uso Rápido

```bash
# 1. Hacer el script ejecutable
chmod +x tryonyou_full_auto.sh

# 2. Ejecutar
./tryonyou_full_auto.sh
```

---

## 🔍 ¿Qué Hace el Script?

### Paso 1: Detección de Sistema Operativo
- ✅ Detecta si estás en macOS o Linux
- ✅ Adapta los comandos de instalación según el OS

### Paso 2: Instalación de Dependencias Base
**En macOS:**
- Instala Homebrew (si no existe)
- Instala git, curl, Node.js via brew

**En Linux (Ubuntu/Debian):**
- Actualiza apt-get
- Instala git, curl, ca-certificates
- Instala Node.js LTS desde NodeSource

### Paso 3: Instalación de Vercel CLI
```bash
npm install -g vercel
```

### Paso 4: Login en Vercel
- Verifica si hay sesión activa
- Si no existe, abre el proceso de login interactivo

### Paso 5: Clonación/Actualización del Repositorio
- Clona el repo en `$HOME/TRYONYOU_MASTER`
- Si ya existe, hace `git pull --rebase`

### Paso 6: Creación de Estructura de Directorios
```bash
src/styles
src/sections
public/brand
assets
scripts
.github/workflows
```

### Paso 7: Creación del Theme CSS
Crea `src/styles/theme.css` con:
- Variables CSS para colores (blanco nube, beige plastificado, dorado)
- Estilos base para componentes (nav, cards, buttons, hero, etc.)
- Grid systems para wardrobe, testimonials, partners, roadmap, gallery
- Responsive design para móviles
- Animaciones y transiciones

**Paleta de colores:**
- `--cloud`: #F9FAFB (Blanco nube)
- `--beige`: #EDE3CF (Beige base)
- `--beige-gloss`: #F4E9D2 (Beige plastificado)
- `--gold`: #D4AF37 (Dorado)
- `--anthra`: #222326 (Antracita)

### Paso 8: Creación de Secciones HTML
Genera archivos en `src/sections/`:
- **wardrobe.html**: Armario digital con tiles de categorías
- **testimonials.html**: Testimonios de usuarios con avatares
- **partners.html**: Grid de partners/colaboradores
- **roadmap.html**: Roadmap 2025 por trimestres
- **gallery_claims.html**: Galería de estilos con claims

### Paso 9: Creación de Logo SVG
Crea un logo básico en `public/brand/logo.svg` (si no existe)

### Paso 10: Modificación de index.html
- Añade link al theme CSS en el `<head>`
- Inserta navbar con logo y navegación
- Prepara para incluir las secciones

### Paso 11: Build del Proyecto
```bash
npm install
npm run build
```

### Paso 12: Deploy a Vercel
```bash
vercel --prod --yes
```

### Paso 13: Backup Automático
- Crea backup en `$HOME/TRYONYOU_BACKUPS/`
- Nombre: `tryonyou_YYYYMMDD_HHMMSS.tar.gz`

### Paso 14: Resumen Final
Muestra información sobre:
- Ubicación del proyecto
- URL de deploy
- Ubicación del backup

---

## 📋 Requisitos Previos

### Para macOS:
- Acceso a terminal
- Conexión a internet
- Cuenta de Vercel

### Para Linux (Ubuntu/Debian):
- Acceso a terminal con `sudo`
- Conexión a internet
- Cuenta de Vercel

---

## 🛠️ Configuración Opcional

### Variables de Entorno (.env)
Si tienes un archivo `.env` en el directorio del proyecto, el script lo cargará automáticamente:

```env
VERCEL_TOKEN=tu_token_aqui
VERCEL_ORG_ID=tu_org_id
VERCEL_PROJECT_ID=tu_project_id
TELEGRAM_BOT_TOKEN=tu_bot_token
TELEGRAM_CHAT_ID=tu_chat_id
```

---

## 🐛 Solución de Problemas

### Error: "command not found: brew" (macOS)
El script instalará Homebrew automáticamente. Si falla:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Error: "Permission denied" (Linux)
Asegúrate de tener permisos sudo:
```bash
sudo -v
./tryonyou_full_auto.sh
```

### Error: "Vercel login failed"
Login manual:
```bash
vercel login
```
Luego vuelve a ejecutar el script.

### Error: "npm install failed"
Limpia cache de npm:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
```
Vuelve a ejecutar el script.

### El script se detiene en git pull
Si hay conflictos locales:
```bash
cd $HOME/TRYONYOU_MASTER
git stash
git pull --rebase
./tryonyou_full_auto.sh
```

---

## 📁 Estructura Creada

```
$HOME/TRYONYOU_MASTER/
├── src/
│   ├── styles/
│   │   └── theme.css           # Theme completo
│   └── sections/
│       ├── wardrobe.html
│       ├── testimonials.html
│       ├── partners.html
│       ├── roadmap.html
│       └── gallery_claims.html
├── public/
│   └── brand/
│       └── logo.svg
├── index.html                  # Modificado con theme y navbar
└── ...

$HOME/TRYONYOU_BACKUPS/
└── tryonyou_YYYYMMDD_HHMMSS.tar.gz
```

---

## 🎨 Personalización

### Modificar Colores del Theme
Edita `src/styles/theme.css` y cambia las variables CSS en `:root`:

```css
:root{
  --cloud:#TU_COLOR;
  --beige:#TU_COLOR;
  --gold:#TU_COLOR;
  /* ... */
}
```

### Añadir Nuevas Secciones
1. Crea el archivo HTML en `src/sections/`
2. Añade el link en la navbar del index.html
3. Incluye la sección en el body del index.html

---

## 🔄 Actualización del Proyecto

Para actualizar el proyecto existente:

```bash
cd $HOME/TRYONYOU_MASTER
git pull origin main
npm install
npm run build
vercel --prod
```

O simplemente vuelve a ejecutar el script:
```bash
./tryonyou_full_auto.sh
```

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa esta guía de solución de problemas
2. Verifica los logs del script
3. Contacta al equipo de desarrollo

---

## ✅ Checklist Post-Instalación

- [ ] Script ejecutado sin errores
- [ ] Vercel deploy exitoso
- [ ] Sitio accesible en https://tryonyou.app
- [ ] Theme visible correctamente
- [ ] Todas las secciones renderizadas
- [ ] Navbar funcional
- [ ] Responsive en móvil
- [ ] Backup creado correctamente

---

## 🚀 Próximos Pasos

Después de ejecutar el script:

1. **Verifica el deploy**: Visita https://tryonyou.app
2. **Personaliza el contenido**: Edita las secciones HTML
3. **Añade assets**: Sube imágenes a `public/`
4. **Configura CI/CD**: Revisa `.github/workflows/`
5. **Prueba en producción**: Verifica todas las funcionalidades

---

**¡Disfruta de tu instalación TRYONYOU completamente automatizada! 🎉**
