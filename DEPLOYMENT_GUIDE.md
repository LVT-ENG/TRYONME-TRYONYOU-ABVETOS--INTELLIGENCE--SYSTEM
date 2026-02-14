# 🚀 Guía de Deployment - TRYONYOU V9

## Script de Automatización: `deploy_v9.py`

Este script automatiza completamente el proceso de deployment a Git y Vercel, resolviendo problemas comunes de autenticación y permisos.

## 📋 Pre-requisitos

1. **Git** instalado y configurado
2. **Python 3** instalado
3. **Node.js y npm** instalados
4. **Vercel CLI** instalado (opcional, el script puede funcionar sin él)
5. **Personal Access Token de GitHub** (recomendado para HTTPS)

## 🔑 Configuración del Token de GitHub

### Opción A: Token de Acceso Personal (Recomendado)

1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Crea un nuevo token con estos permisos mínimos:
   - **Contents**: Read and write (requerido para push)
   - **Metadata**: Read (requerido automáticamente por GitHub)
3. Copia el token generado

### Opción B: SSH (Alternativa)

Si prefieres usar SSH, configura tu clave SSH en GitHub y el script usará la autenticación SSH automáticamente.

## 🚀 Uso del Script

### Paso 1: Configurar el Token (si usas HTTPS)

**macOS / Linux:**
```bash
export GITHUB_TOKEN="tu_token_aqui"
```

**Windows PowerShell:**
```powershell
$env:GITHUB_TOKEN="tu_token_aqui"
```

**Windows CMD:**
```cmd
set GITHUB_TOKEN=tu_token_aqui
```

### Paso 2: Ejecutar el Script

```bash
python3 deploy_v9.py
```

## 🎯 ¿Qué hace el script?

El script ejecuta automáticamente los siguientes pasos:

1. **Configuración de Git Remote**
   - Configura el remoto `origin` con autenticación HTTPS si `GITHUB_TOKEN` está disponible
   - Si no hay token, usa el remoto normal y Git pedirá credenciales

2. **Asegura Rama Principal**
   - Verifica o crea la rama `main`

3. **Verifica vercel.json**
   - Mantiene la configuración existente si ya existe
   - Crea uno nuevo solo si no existe

4. **Commit y Push**
   - Añade todos los cambios (`git add -A`)
   - Crea un commit con timestamp
   - Hace push a `origin/main`

5. **Login de Vercel**
   - Verifica que estés logueado en Vercel CLI
   - Si no lo estás, abrirá el proceso de login

6. **Deploy a Producción**
   - Despliega a Vercel en modo producción
   - Usa `--yes` para evitar prompts

## 🔧 Diagnóstico de Problemas

Si el script falla, ejecuta estos comandos para diagnóstico:

```bash
# Verificar configuración de Git
git remote -v
git status
git branch --show-current
git config user.name
git config user.email

# Verificar Vercel
vercel whoami
```

### Errores Comunes y Soluciones

#### Error: `Permission denied` o `403 Forbidden`

**Causa:** No tienes permisos en el repositorio o falta autenticación.

**Solución:**
1. Verifica que tu usuario tiene acceso al repositorio en GitHub
2. Crea un Personal Access Token con los permisos correctos
3. Configura la variable de entorno `GITHUB_TOKEN`

#### Error: `vercel: command not found`

**Causa:** Vercel CLI no está instalado.

**Solución:**
```bash
npm install -g vercel
```

#### Error: `Not authenticated with Vercel`

**Causa:** No has iniciado sesión en Vercel.

**Solución:**
```bash
vercel login
```

#### Error: `Wrong team selected`

**Causa:** Estás logueado en el team incorrecto de Vercel.

**Solución:**
```bash
# Listar teams disponibles
vercel teams ls

# Cambiar al team correcto
vercel switch [team-name]
```

## 📝 Uso Manual (sin script)

Si prefieres hacer el deployment manualmente:

```bash
# 1. Configurar remote con token (desde variable de entorno)
# IMPORTANTE: Usa variable de entorno, no pegues el token directamente
export GITHUB_TOKEN="tu_token"
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git"

# ALTERNATIVA MÁS SEGURA: Usa Git credential helper
# git config --global credential.helper store
# git push origin main  # Te pedirá el token solo la primera vez

# 2. Commit y push
git add -A
git commit -m "Deployment V9"
git push origin main

# 3. Deploy a Vercel
vercel login
vercel --prod
```

## 🔒 Seguridad

- **NUNCA** hardcodees el token directamente en archivos de código
- Usa variables de entorno para almacenar el token
- El token en la URL del remote solo existe temporalmente durante la ejecución
- Revoca tokens antiguos que ya no uses
- Usa Fine-grained tokens con permisos mínimos necesarios

## 📚 Referencias

- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Git Remote Documentation](https://git-scm.com/docs/git-remote)

## 💡 Tips Adicionales

1. **Automatización en CI/CD**: Puedes usar este script en tus pipelines de CI/CD configurando `GITHUB_TOKEN` como secret
2. **Build local**: Descomenta las líneas de `npm install` y `npm run build` en el script si quieres verificar el build localmente antes de deployar
3. **Branches**: El script siempre trabaja con `main`. Si necesitas trabajar con otra rama, modifica la función `ensure_main_branch()`

## 🆘 Soporte

Si encuentras problemas no cubiertos en esta guía:

1. Revisa los logs completos del error
2. Verifica tus permisos en GitHub y Vercel
3. Asegúrate de estar en el team correcto en ambas plataformas
4. Contacta al administrador del repositorio si no tienes los permisos necesarios
