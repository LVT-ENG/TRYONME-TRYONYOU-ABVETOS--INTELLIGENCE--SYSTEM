═══════════════════════════════════════════════════════════════════════════════
  TRYONYOU RETRODEPLOY - Automatic Mass Deployment System
═══════════════════════════════════════════════════════════════════════════════

📦 DESCRIPCIÓN
--------------
Sistema automatizado para despliegue masivo de 48 ZIPs a tryonyou.app vía Vercel.
Detecta cambios, limpia duplicados, commitea a main y despliega automáticamente.

🎯 CARACTERÍSTICAS PRINCIPALES
-------------------------------
✅ Detección automática de 48 ZIPs en TRYONYOU_DEPLOY_EXPRESS_INBOX/
✅ Limpieza inteligente de duplicados (conserva los más recientes)
✅ Commit automático al branch main del repositorio oficial
✅ Build optimizado con Vite 7.1.2
✅ Deploy a producción en Vercel (tryonyou.app)
✅ Notificaciones a @abvet_deploy_bot vía Telegram
✅ Verificación automática de respuesta HTTP 200 OK
✅ Logging continuo en retrodeploy.log

📂 ESTRUCTURA DE ARCHIVOS
--------------------------
/retrodeploy/
│
├── deploy.sh          # Script maestro de despliegue
├── makefile           # Build + commit + vercel deploy automatizado
├── vercel.json        # Configuración estable para tryonyou.app
├── watcher.js         # Daemon auto-sync para 48 ZIPs
├── .env               # Tokens de Vercel/Telegram (configurar antes de usar)
├── retrodeploy.log    # Registro continuo de operaciones
└── README.txt         # Este archivo

🚀 INICIO RÁPIDO
----------------

1. CONFIGURAR TOKENS:
   Edita el archivo .env y agrega tus tokens:
   - VERCEL_TOKEN
   - TELEGRAM_BOT_TOKEN
   - TELEGRAM_CHAT_ID

2. EJECUTAR DESPLIEGUE MANUAL:
   cd retrodeploy
   ./deploy.sh

3. USAR MAKEFILE:
   cd retrodeploy
   make all          # Ejecuta todo: install + build + commit + deploy
   make build        # Solo compilar
   make deploy       # Solo desplegar a Vercel
   make verify       # Verificar que tryonyou.app responde

4. INICIAR DAEMON AUTOMÁTICO:
   cd retrodeploy
   node watcher.js   # Monitorea cambios cada 30 segundos

📋 PROCESO AUTOMÁTICO (6 PASOS)
--------------------------------

1️⃣ DETECTAR ZIPS
   - Escanea TRYONYOU_DEPLOY_EXPRESS_INBOX/
   - Cuenta archivos .zip encontrados

2️⃣ LIMPIAR DUPLICADOS
   - Identifica archivos con mismo nombre base
   - Conserva solo el más reciente
   - Elimina duplicados antiguos

3️⃣ COMMITEAR A MAIN
   - git checkout main
   - git add .
   - git commit -m "🚀 Retrodeploy: ..."
   - git push origin main

4️⃣ BUILD + DEPLOY
   - npm install (si es necesario)
   - npm run build (Vite 7.1.2)
   - vercel --prod --yes

5️⃣ NOTIFICAR TELEGRAM
   - Envía mensaje a @abvet_deploy_bot
   - Incluye: cantidad de ZIPs, timestamp, URL
   - Captura desktop/móvil (futuro)

6️⃣ VERIFICAR RESPUESTA
   - curl https://tryonyou.app
   - Valida HTTP 200 OK
   - Cierra sesión exitosamente

🔧 COMANDOS ÚTILES
------------------

# Ver ayuda del Makefile
make help

# Instalar dependencias
make install

# Build con Vite
make build

# Commit y push
make commit

# Deploy a Vercel
make deploy

# Verificar sitio
make verify

# Limpiar artefactos
make clean

# Pipeline completo
make all

# Ver logs
tail -f retrodeploy.log

# Ejecutar watcher en background
nohup node watcher.js > watcher.out 2>&1 &

📊 MONITOREO
------------

- Log principal: retrodeploy.log
- Formato: [TIMESTAMP] [LEVEL] mensaje
- Niveles: INFO, WARN, ERROR, DEBUG

- Ver últimas 20 líneas:
  tail -20 retrodeploy.log

- Seguir en tiempo real:
  tail -f retrodeploy.log

- Buscar errores:
  grep ERROR retrodeploy.log

🔐 SEGURIDAD
------------

⚠️  IMPORTANTE: No commitees el archivo .env con tokens reales
✅ Usa .env.example como plantilla
✅ Agrega .env al .gitignore si no está
✅ Rota tokens periódicamente
✅ Usa permisos restrictivos: chmod 600 .env

🌍 VERIFICACIÓN DE DESPLIEGUE
------------------------------

Después de cada deploy, verifica:

1. GitHub: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
2. Vercel: https://vercel.com/dashboard
3. Sitio Web: https://tryonyou.app
4. Telegram: @abvet_deploy_bot (notificación)

📞 SOPORTE
----------

Issues: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues
Logs: cat retrodeploy.log

═══════════════════════════════════════════════════════════════════════════════
  Creado por: LVT-ENG
  Sistema: TRYONYOU Intelligence System
  Versión: 1.0.0
  Última actualización: 2025-10-20
═══════════════════════════════════════════════════════════════════════════════
