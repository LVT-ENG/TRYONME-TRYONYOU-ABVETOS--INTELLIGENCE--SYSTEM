# 🚀 Activar Workflows de CI/CD - Instrucciones

## ⚠️ Acción Requerida

Los workflows de GitHub Actions están listos pero deben ser activados manualmente debido a restricciones de permisos de GitHub App.

---

## 📋 Workflows Disponibles

### 1. **deploy-express-abvet.yml**
Pipeline principal de deployment con:
- Build con Vite 7.1.2
- Deploy a Vercel
- Smart QA Agent
- Capturas automatizadas
- Notificaciones a Telegram
- Sincronización con Drive

### 2. **inbox-auto-deploy.yml**
Detección automática de INBOX:
- Verifica INBOX cada 15 minutos
- Deploy automático al detectar archivos
- Procesamiento y archivado

---

## 🔧 Cómo Activar

### Opción A: Via GitHub Web UI (Recomendado)

1. **Ir al repositorio:**
   ```
   https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
   ```

2. **Navegar a la carpeta workflows_to_add:**
   ```
   workflows_to_add/deploy-express-abvet.yml
   workflows_to_add/inbox-auto-deploy.yml
   ```

3. **Para cada archivo:**
   - Click en el archivo
   - Click en el icono de edición (lápiz)
   - Copiar todo el contenido
   - Cancelar la edición

4. **Crear los workflows:**
   - Ir a `.github/workflows/`
   - Click en "Add file" → "Create new file"
   - Nombrar el archivo (ej: `deploy-express-abvet.yml`)
   - Pegar el contenido copiado
   - Commit changes

5. **Repetir para el segundo workflow**

### Opción B: Via Git Local

```bash
# Clonar el repositorio (si no lo tienes)
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Cambiar a la rama feature
git checkout feature/intelligence-system-automation
git pull origin feature/intelligence-system-automation

# Copiar workflows
cp workflows_to_add/deploy-express-abvet.yml .github/workflows/
cp workflows_to_add/inbox-auto-deploy.yml .github/workflows/

# Commit y push
git add .github/workflows/
git commit -m "feat: Activate CI/CD workflows"
git push origin feature/intelligence-system-automation
```

### Opción C: Via GitHub CLI

```bash
# Autenticar (si no lo has hecho)
gh auth login

# Clonar y configurar
gh repo clone LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
git checkout feature/intelligence-system-automation

# Copiar workflows
cp workflows_to_add/*.yml .github/workflows/

# Commit y push
git add .github/workflows/
git commit -m "feat: Activate CI/CD workflows"
git push origin feature/intelligence-system-automation
```

---

## ✅ Verificación

Después de activar los workflows:

1. **Ir a Actions tab:**
   ```
   https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions
   ```

2. **Verificar que aparezcan:**
   - ✅ Deploy Express by ABVET
   - ✅ INBOX Auto Deploy

3. **Ejecutar manualmente (opcional):**
   - Click en el workflow
   - Click en "Run workflow"
   - Seleccionar branch: `feature/intelligence-system-automation`
   - Click en "Run workflow"

---

## 🔐 Configurar Secrets

Antes de ejecutar los workflows, configura estos secrets en GitHub:

**Ruta:** Settings → Secrets and variables → Actions → New repository secret

| Secret Name | Descripción | Cómo Obtenerlo |
|-------------|-------------|----------------|
| `VERCEL_TOKEN` | Token de API de Vercel | [Vercel Account Settings](https://vercel.com/account/tokens) |
| `VERCEL_PROJECT_ID` | ID del proyecto | Dashboard de Vercel → Settings → General |
| `VERCEL_ORG_ID` | ID de la organización | Dashboard de Vercel → Settings → General |
| `TELEGRAM_BOT_TOKEN` | Token del bot | [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | ID del chat | [@userinfobot](https://t.me/userinfobot) |
| `QA_AUTH_TOKEN` | Token para QA Agent | `openssl rand -hex 32` |

---

## 🎯 Flujo Completo

Una vez activados los workflows y configurados los secrets:

```
1. 📂 Archivo en INBOX
   ↓
2. 🔍 GitHub Actions detecta (cada 15 min)
   ↓
3. 🧱 Build con Vite 7.1.2
   ↓
4. 🚀 Deploy a Vercel (tryonyou.app)
   ↓
5. 🤖 Smart QA Agent verifica
   ↓
6. 📸 Capturas automatizadas
   ↓
7. 📁 Sincronización con Drive
   ↓
8. 📱 Notificación a @abvet_deploy_bot
```

---

## 🐛 Troubleshooting

### Los workflows no aparecen

**Causa:** No se han copiado correctamente a `.github/workflows/`

**Solución:** Verificar que los archivos estén en la ubicación correcta

### Los workflows fallan

**Causa:** Secrets no configurados

**Solución:** Configurar todos los secrets requeridos en GitHub

### No llegan notificaciones

**Causa:** Tokens de Telegram incorrectos

**Solución:** Verificar `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`

---

## 📞 Soporte

Para problemas:

1. **GitHub Issues:** https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues
2. **Documentación:** `/docs/FULL_PIPELINE_GUIDE.md`
3. **Telegram:** @abvet_deploy_bot

---

## 🎉 Una vez activado

El sistema estará completamente operativo:

- ✅ Deploy automático desde INBOX
- ✅ QA automático post-deploy
- ✅ Capturas automatizadas
- ✅ Notificaciones en tiempo real
- ✅ Sincronización con Drive

**¡Todo listo para producción!**

---

**Última actualización:** 25 de octubre de 2025  
**Versión:** 1.0.0

