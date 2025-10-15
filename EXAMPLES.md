# TRYONYOU Full Auto - Ejemplos de Uso

## 🎯 Casos de Uso

### 1. Primera Instalación (Nueva Máquina)

**Escenario:** Acabas de conseguir una nueva laptop y quieres instalar TRYONYOU desde cero.

```bash
# Descarga el script
curl -O https://raw.githubusercontent.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/main/tryonyou_full_auto.sh

# Hazlo ejecutable y ejecútalo
chmod +x tryonyou_full_auto.sh
./tryonyou_full_auto.sh
```

**Resultado:**
- ✅ Todas las dependencias instaladas
- ✅ Proyecto clonado y configurado
- ✅ Deploy en producción
- ✅ Backup creado

---

### 2. Actualización de Proyecto Existente

**Escenario:** Ya tienes TRYONYOU instalado y quieres actualizarlo con los últimos cambios.

```bash
cd $HOME/TRYONYOU_MASTER
./tryonyou_full_auto.sh
```

**El script automáticamente:**
- Hará `git pull` para obtener últimos cambios
- Reinstalará dependencias
- Reconstruirá el proyecto
- Redesplegarán en Vercel
- Creará nuevo backup

---

### 3. Instalación con Variables de Entorno

**Escenario:** Quieres automatizar completamente sin intervención manual.

```bash
# 1. Crea archivo .env en el proyecto
cat > $HOME/TRYONYOU_MASTER/.env <<EOF
VERCEL_TOKEN=tu_token_aqui
VERCEL_ORG_ID=tu_org_id
VERCEL_PROJECT_ID=tu_project_id
EOF

# 2. Ejecuta el script
./tryonyou_full_auto.sh
```

**Ventaja:** No pedirá login de Vercel, usará el token del .env

---

### 4. Instalación Solo Local (Sin Deploy)

**Escenario:** Quieres configurar el proyecto localmente sin deployar.

```bash
# Edita el script para comentar la línea de deploy
sed -i 's/^vercel --prod/# vercel --prod/' tryonyou_full_auto.sh

# Ejecuta
./tryonyou_full_auto.sh
```

**Resultado:**
- ✅ Todo configurado localmente
- ❌ No hace deploy a Vercel
- ✅ Backup creado

---

### 5. Ejecución en Servidor CI/CD

**Escenario:** Quieres integrar el script en tu pipeline de CI/CD.

**GitHub Actions:**
```yaml
name: Deploy TRYONYOU

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Full Auto Script
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          chmod +x tryonyou_full_auto.sh
          ./tryonyou_full_auto.sh
```

---

### 6. Múltiples Instancias (Dev/Staging/Prod)

**Escenario:** Quieres mantener diferentes entornos.

```bash
# Development
PROJECT_DIR="$HOME/TRYONYOU_DEV" ./tryonyou_full_auto.sh

# Staging
PROJECT_DIR="$HOME/TRYONYOU_STAGING" ./tryonyou_full_auto.sh

# Production
PROJECT_DIR="$HOME/TRYONYOU_PROD" ./tryonyou_full_auto.sh
```

**Nota:** Edita el script para aceptar PROJECT_DIR como variable de entorno.

---

### 7. Instalación Silenciosa (Sin Output)

**Escenario:** Quieres ejecutar el script sin ver el output (útil para cron jobs).

```bash
./tryonyou_full_auto.sh > /dev/null 2>&1

# O guardar logs en archivo
./tryonyou_full_auto.sh > install.log 2>&1
```

---

### 8. Instalación con Verificación Post-Deploy

**Escenario:** Quieres asegurarte de que el deploy fue exitoso.

```bash
./tryonyou_full_auto.sh

# Verificar que el sitio responde
if curl -f https://tryonyou.app > /dev/null 2>&1; then
  echo "✅ Deploy exitoso y sitio accesible"
else
  echo "❌ Sitio no responde"
  exit 1
fi
```

---

### 9. Backup Manual Antes de Actualizar

**Escenario:** Quieres crear un backup antes de ejecutar el script.

```bash
# Backup manual
cd $HOME/TRYONYOU_MASTER
tar -czf "$HOME/backup_manual_$(date +%Y%m%d).tar.gz" .

# Luego ejecuta el script
./tryonyou_full_auto.sh
```

---

### 10. Instalación en Docker Container

**Escenario:** Quieres ejecutar TRYONYOU en un contenedor.

**Dockerfile:**
```dockerfile
FROM node:18-alpine

RUN apk add --no-cache git curl bash

WORKDIR /app

COPY tryonyou_full_auto.sh .
RUN chmod +x tryonyou_full_auto.sh

CMD ["./tryonyou_full_auto.sh"]
```

**Build y Run:**
```bash
docker build -t tryonyou-auto .
docker run -e VERCEL_TOKEN=xxx tryonyou-auto
```

---

## 🔧 Personalización del Script

### Cambiar el Directorio de Instalación

```bash
# Edita PROJECT_DIR en el script
sed -i 's|PROJECT_DIR="$HOME/TRYONYOU_MASTER"|PROJECT_DIR="/opt/tryonyou"|' tryonyou_full_auto.sh
```

### Cambiar el Repositorio

```bash
# Edita REPO_URL en el script
sed -i 's|REPO_URL=".*"|REPO_URL="https://github.com/tu-usuario/tu-repo.git"|' tryonyou_full_auto.sh
```

### Añadir Notificación por Email

```bash
# Al final del script, añade:
echo "Deploy completado" | mail -s "TRYONYOU Deploy" tu@email.com
```

### Añadir Notificación por Telegram

```bash
# Al final del script, añade:
curl -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
  -d chat_id=$CHAT_ID \
  -d text="✅ TRYONYOU Deploy completado en $(date)"
```

---

## 📊 Monitoreo y Logs

### Ver el Progreso en Tiempo Real

```bash
./tryonyou_full_auto.sh | tee install_$(date +%Y%m%d_%H%M%S).log
```

### Verificar Solo Sintaxis Sin Ejecutar

```bash
bash -n tryonyou_full_auto.sh
```

### Ejecutar en Modo Debug

```bash
bash -x tryonyou_full_auto.sh
```

---

## ⚡ Optimizaciones

### Instalación Rápida (Skip Backups)

Comenta la sección de backup en el script o:

```bash
# Ejecuta sin crear backup
sed -i 's/^tar -czf/# tar -czf/' tryonyou_full_auto.sh
./tryonyou_full_auto.sh
```

### Instalación Paralela

Si tienes múltiples servidores:

```bash
# servers.txt contiene lista de IPs
parallel-ssh -h servers.txt -i "curl -sL https://your-script-url/tryonyou_full_auto.sh | bash"
```

---

## 🐛 Debugging

### Error en la Instalación de Node

```bash
# Forzar reinstalación de Node
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  sudo apt-get remove nodejs -y
  sudo apt-get autoremove -y
fi

./tryonyou_full_auto.sh
```

### Error en el Deploy de Vercel

```bash
# Login manual primero
vercel login

# Luego ejecuta el script
./tryonyou_full_auto.sh
```

### Script Se Detiene Inesperadamente

```bash
# Ejecuta sin 'set -e' para ver todos los errores
sed -i 's/^set -e/# set -e/' tryonyou_full_auto.sh
bash tryonyou_full_auto.sh
```

---

## 📚 Recursos Adicionales

- [Documentación Completa](TRYONYOU_FULL_AUTO_USAGE.md)
- [Quick Start](QUICK_START.md)
- [README Principal](README.md)
- [Vercel Docs](https://vercel.com/docs)

---

**¿Tienes más casos de uso?** Contribuye a este documento! 🚀
