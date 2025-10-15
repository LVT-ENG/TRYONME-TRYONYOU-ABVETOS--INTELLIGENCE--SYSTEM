# Build Package Full Script - Documentación

## 📋 Descripción

`build_package_full.sh` es un script completo de build + empaquetado + deploy que crea un paquete **plug & run** incluyendo `node_modules` completo, listo para ejecución directa.

## 🚀 Uso Rápido

```bash
# 1. Hacer el script ejecutable (solo primera vez)
chmod +x build_package_full.sh

# 2. Configurar .env con tus credenciales (ver sección Configuración)
cp .env.example .env
# Editar .env con tus tokens reales

# 3. Ejecutar el script
./build_package_full.sh
```

## 📦 ¿Qué hace el script?

1. **Validación de prerequisitos**: Verifica que node, npm, zip, npx estén instalados
2. **Carga de variables**: Lee el archivo `.env` y valida variables requeridas
3. **Instalación de dependencias**: Ejecuta `npm ci` para instalación exacta
4. **Build de producción**: Ejecuta `npm run build` 
5. **Empaquetado completo**: Crea carpeta con timestamp que incluye:
   - `dist/` - Build de producción
   - `node_modules/` - Dependencias completas
   - `public/`, `assets/`, `src/` - Assets y código fuente
   - `package.json`, `package-lock.json` - Manifiestos
   - `vite.config.js`, `vercel.json` - Configuraciones
   - `BUILD_TIMESTAMP.txt` - Timestamp del build
   - `GIT_COMMIT.txt` - Hash del commit
6. **Compresión ZIP**: Crea archivo ZIP del paquete completo (~54MB)
7. **Deploy a Vercel**: Despliega automáticamente a producción
8. **Notificaciones** (opcional): Envía notificaciones a Telegram con capturas

## ⚙️ Configuración

### Variables de entorno requeridas (.env)

```bash
# Proyecto
NODE_ENV=production
VITE_PROJECT=TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
VITE_DEPLOY_SYSTEM=ABVETOS
VITE_GITHUB_REPO=LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Vercel (REQUERIDO)
VITE_VERCEL_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx
VITE_VERCEL_PROJECT_ID=prj_xxxxxxxxxxxxxxxx
VITE_VERCEL_ORG_ID=team_xxxxxxxxxxxxxxxx

# Telegram (OPCIONAL - para notificaciones con capturas)
TELEGRAM_TOKEN=123456:ABCDEF...
VITE_TELEGRAM_BOT=@abvet_deploy_bot
```

### Obtener credenciales de Vercel

1. Ve a [Vercel Settings](https://vercel.com/account/tokens)
2. Crea un nuevo token con permisos de deploy
3. Copia tu `VERCEL_PROJECT_ID` y `VERCEL_ORG_ID` desde el dashboard del proyecto

### Configurar Telegram (opcional)

1. Habla con [@BotFather](https://t.me/BotFather) en Telegram
2. Crea o configura tu bot
3. Obtén el token del bot
4. Agrega el bot al chat/canal donde quieres notificaciones

## 📦 Estructura del paquete generado

```
CLEAN_BUILD_TRYONYOU–ABVETOS–ULTIMATUM_YYYYMMDD-HHMMSS.zip
└── out_YYYYMMDD-HHMMSS/
    ├── dist/                    # Build de producción
    ├── node_modules/            # Todas las dependencias
    ├── public/                  # Assets públicos
    ├── assets/                  # Assets adicionales
    ├── src/                     # Código fuente
    ├── package.json             # Manifiesto del proyecto
    ├── package-lock.json        # Lock de dependencias
    ├── vite.config.js           # Configuración Vite
    ├── vercel.json              # Configuración Vercel
    ├── BUILD_TIMESTAMP.txt      # Timestamp del build
    └── GIT_COMMIT.txt           # Hash del commit
```

## 🎯 Casos de uso

### 1. Deploy completo automático
```bash
./build_package_full.sh
```
Ejecuta todo el flujo: build + empaquetado + deploy + notificación

### 2. Solo build y empaquetado (sin deploy)
Comenta la sección 5 del script (Deploy a Vercel):
```bash
# --- 5) Deploy a Vercel ------------------------------------------------------
# echo "🚀 Desplegando a Vercel (prod)…"
# ...
```

### 3. Entrega manual del paquete
El ZIP generado puede ser:
- Enviado a un cliente
- Almacenado como backup
- Desplegado manualmente en otro servidor

## 🔧 Personalización

### Cambiar archivos incluidos en el paquete

Edita la sección 4 del script:
```bash
cp -R \
  dist \
  public \
  assets \
  src \
  tu_carpeta_adicional \  # Agregar aquí
  package.json \
  ...
```

### Reducir tamaño del ZIP

Para un paquete más ligero (solo dependencias de producción):

1. Después del build, ejecuta:
   ```bash
   npm prune --production
   ```
2. O modifica el script para hacer esto automáticamente antes de copiar `node_modules`

### Cambiar URL de deploy

Modifica la variable en el script:
```bash
DEPLOY_URL_DEFAULT="https://tu-dominio.com"
```

## 🛠️ Solución de problemas

### Error: "Node no encontrado"
```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Error: "zip no encontrado"
```bash
sudo apt-get install zip
```

### Error: "Falta VITE_VERCEL_TOKEN en .env"
Verifica que tu archivo `.env` existe y contiene las variables requeridas.

### El ZIP es muy grande
Esto es normal (~54MB) ya que incluye `node_modules` completo. Para reducir tamaño:
- Usa `npm prune --production` después del build
- O crea un paquete "light" sin node_modules

### Deploy falla
- Verifica que el token de Vercel es válido
- Asegúrate de tener permisos en el proyecto
- Revisa los logs de Vercel Dashboard

## 📊 Integración con GitHub Actions

El workflow en `.github/workflows/deploy.yml` ejecuta automáticamente en cada push a `main`:

```yaml
- name: Pack ZIP with node_modules
  run: |
    PKG="CLEAN_BUILD_TRYONYOU–ABVETOS–ULTIMATUM_${{ github.sha }}.zip"
    mkdir out && cp -R dist public assets src package.json package-lock.json out/
    rsync -a node_modules/ out/node_modules/
    zip -qry "$PKG" out
```

### Secrets necesarios en GitHub

Configura en `Settings → Secrets → Actions`:
- `VERCEL_TOKEN`
- `VERCEL_PROJECT_ID`
- `VERCEL_ORG_ID`
- `TELEGRAM_TOKEN` (opcional)

Ver [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md) para más detalles.

## 🌐 Deploy URLs

- **Producción**: https://tryonyou.app
- **Vercel Dashboard**: https://vercel.com/dashboard

## 📞 Soporte

Para problemas o preguntas:
- **Repository**: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
- **Issues**: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues

## 📄 Licencia

© 2025 TRYONYOU. All rights reserved.
