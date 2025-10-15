# SuperCommit MAX — Guía de Uso

Este documento explica cómo usar el script `TRYONYOU_SUPERCOMMIT_MAX.sh` para realizar el commit final de integración del sistema TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM.

## 📋 Índice

1. [¿Qué es SuperCommit MAX?](#qué-es-supercommit-max)
2. [Requisitos Previos](#requisitos-previos)
3. [Uso Básico](#uso-básico)
4. [Opciones Avanzadas](#opciones-avanzadas)
5. [Qué Hace el Script](#qué-hace-el-script)
6. [Solución de Problemas](#solución-de-problemas)
7. [Archivos Generados](#archivos-generados)

---

## 🎯 ¿Qué es SuperCommit MAX?

**SuperCommit MAX** es un script automatizado que:

✅ Limpia el repositorio de archivos obsoletos y duplicados  
✅ Instala dependencias actualizadas  
✅ Organiza la estructura del proyecto  
✅ Crea un commit consolidado con mensaje detallado  
✅ Sube los cambios a GitHub  
✅ Opcionalmente despliega en Vercel  

Este script está diseñado para consolidar todo el trabajo de integración de los módulos TRYONYOU en un solo commit limpio y profesional.

---

## ✅ Requisitos Previos

### Software Necesario

- **Git**: Versión 2.0 o superior
- **Node.js**: Versión 22.x o superior
- **npm**: Versión 8.x o superior
- **Bash**: Shell Unix (disponible en Linux, macOS, Git Bash en Windows)

### Permisos

- Permisos de escritura en el repositorio
- Acceso push al branch `main`
- (Opcional) Token de Vercel para deployment automático

### Estado del Repositorio

- Todos los cambios previos deben estar commiteados o descartados
- Working directory limpio (sin cambios pendientes)

---

## 🚀 Uso Básico

### 1. Navegación al Directorio

```bash
cd /ruta/a/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
```

### 2. Verificar Permisos del Script

```bash
ls -l TRYONYOU_SUPERCOMMIT_MAX.sh
# Debería mostrar: -rwxrwxr-x (ejecutable)
```

Si no tiene permisos de ejecución:

```bash
chmod +x TRYONYOU_SUPERCOMMIT_MAX.sh
```

### 3. Ejecutar el Script

**Opción A: Sin deploy automático a Vercel**

```bash
./TRYONYOU_SUPERCOMMIT_MAX.sh
```

**Opción B: Con deploy automático a Vercel**

```bash
export VERCEL_TOKEN="tu_token_aqui"
./TRYONYOU_SUPERCOMMIT_MAX.sh
```

---

## ⚙️ Opciones Avanzadas

### Deploy a Vercel

Para que el script despliegue automáticamente en Vercel, necesitas definir la variable de entorno `VERCEL_TOKEN`:

```bash
# Opción 1: Inline
VERCEL_TOKEN="tu_token_vercel" ./TRYONYOU_SUPERCOMMIT_MAX.sh

# Opción 2: Export temporal
export VERCEL_TOKEN="tu_token_vercel"
./TRYONYOU_SUPERCOMMIT_MAX.sh

# Opción 3: Desde archivo .env (no recomendado para producción)
source .env
./TRYONYOU_SUPERCOMMIT_MAX.sh
```

### Obtener Token de Vercel

1. Ve a [Vercel Account Settings](https://vercel.com/account/tokens)
2. Crea un nuevo token
3. Copia el token generado
4. Úsalo en la variable `VERCEL_TOKEN`

### Ejecución en Modo Verbose

Para ver más detalles durante la ejecución:

```bash
bash -x TRYONYOU_SUPERCOMMIT_MAX.sh
```

### Dry Run (Simulación)

Para ver qué haría el script sin ejecutarlo realmente, puedes revisar el código:

```bash
cat TRYONYOU_SUPERCOMMIT_MAX.sh
```

---

## 🔍 Qué Hace el Script

### Paso 1: Verificación Inicial

```
✅ Verifica que estés en el directorio correcto (existe package.json)
✅ Verifica que Git esté disponible
```

### Paso 2: Cambio a Branch Main

```bash
git checkout main
git pull origin main
```

Actualiza el branch `main` con los últimos cambios del remoto.

### Paso 3: Limpieza de Archivos Obsoletos

```bash
rm -rf node_modules dist legacy_old temp_old apps/web-old tests-old legacy integrations/duplicados
```

Elimina:
- `node_modules/`: Dependencias antiguas
- `dist/`: Build anterior
- `legacy_old/`, `temp_old/`: Directorios temporales
- `apps/web-old/`, `tests-old/`: Código legacy
- `legacy/`, `integrations/duplicados/`: Duplicados

### Paso 4: Instalación de Dependencias

```bash
npm install
```

Instala todas las dependencias definidas en `package.json`.

### Paso 5: Creación de Estructura

```bash
mkdir -p docs/arquitectura_empresa docs/patent_EPCT docs/investor_edition
mkdir -p public/assets/{hero,modules,investor,vision}
mkdir -p src/{modules,components,pages}
```

Crea directorios necesarios si no existen.

### Paso 6: Git Add

Añade archivos al staging area:

```
✅ apps/ (si existe)
✅ api/ (si existe)
✅ modules/ (si existe)
✅ integrations/ (si existe)
✅ tests/ (si existe)
✅ docs/
✅ src/
✅ public/
✅ scripts/
✅ package.json, package-lock.json
✅ vite.config.js, vercel.json, index.html
✅ .env.example, README.md, CHANGELOG.md
✅ Makefile, deploy.sh (si existen)
```

### Paso 7: Commit

Crea un commit con un mensaje detallado que incluye:

- 🔥 Título del commit
- ✅ Lista de módulos integrados
- ✅ Cambios en infraestructura
- ✅ Documentación actualizada
- 🌐 Información de deployment

### Paso 8: Push a GitHub

```bash
git push origin main
```

### Paso 9: Deploy en Vercel (Opcional)

Si `VERCEL_TOKEN` está definido:

```bash
npx vercel --prod --token=$VERCEL_TOKEN --yes --confirm --force
```

### Paso 10: Resumen Final

Muestra un resumen con:
- 📦 Repositorio
- 🌿 Branch
- 🌐 Dominio
- 📊 Estado

---

## 🐛 Solución de Problemas

### Error: "Este script debe ejecutarse desde la raíz del repositorio"

**Causa**: No estás en el directorio correcto.

**Solución**:
```bash
cd /ruta/a/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
./TRYONYOU_SUPERCOMMIT_MAX.sh
```

### Error: "Error al cambiar a main"

**Causa**: El branch `main` no existe o tienes cambios sin commitear.

**Solución**:
```bash
# Ver estado actual
git status

# Commitear cambios pendientes
git add .
git commit -m "Cambios previos"

# Crear branch main si no existe
git checkout -b main
```

### Error: "Error al hacer pull"

**Causa**: Conflictos con el remoto o no hay conexión.

**Solución**:
```bash
# Verificar conexión
git remote -v

# Ver diferencias
git fetch origin
git diff main origin/main

# Resolver conflictos manualmente si es necesario
```

### Error: "No hay cambios nuevos para commitear"

**Situación**: No es un error, significa que no hay cambios pendientes.

**Acción**: El script continúa normalmente y hace push de commits existentes.

### Error: "Error en deploy de Vercel"

**Causa**: Token inválido o problemas de conexión.

**Solución**:
```bash
# Verificar token
echo $VERCEL_TOKEN

# Verificar instalación de Vercel CLI
npx vercel --version

# Deploy manual
npx vercel --prod
```

### Permisos Denegados

**Causa**: El script no tiene permisos de ejecución.

**Solución**:
```bash
chmod +x TRYONYOU_SUPERCOMMIT_MAX.sh
```

---

## 📄 Archivos Generados

### TRYONYOU_SUPERCOMMIT_MAX.sh

El script principal que ejecuta todo el proceso.

**Ubicación**: `/TRYONYOU_SUPERCOMMIT_MAX.sh`

### estructura_final.md

Documento que describe la estructura final del proyecto después del SuperCommit.

**Ubicación**: `/estructura_final.md`

**Contenido**:
- Árbol de directorios
- Descripción de cada módulo
- Notas sobre la organización
- Estado final del proyecto

### readme_commit.md

Mensaje de commit detallado en formato Markdown.

**Ubicación**: `/readme_commit.md`

**Contenido**:
- Resumen ejecutivo
- Cambios realizados
- Módulos integrados
- Infraestructura
- Métricas
- Timeline
- Valoración

**Usos**:
- Referencia para CHANGELOG.md
- Mensaje para notificaciones de Telegram
- Documentación de release notes

---

## 🔄 Workflow Completo

```
┌─────────────────────────────────────────────┐
│  1. Preparación                             │
│  - Verificar repositorio                    │
│  - Configurar variables (VERCEL_TOKEN)      │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  2. Ejecución del Script                    │
│  ./TRYONYOU_SUPERCOMMIT_MAX.sh              │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  3. Proceso Automático                      │
│  - Limpieza                                 │
│  - npm install                              │
│  - git add                                  │
│  - git commit                               │
│  - git push                                 │
│  - vercel deploy (opcional)                 │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  4. Verificación                            │
│  - Revisar https://tryonyou.app             │
│  - Comprobar GitHub Actions                 │
│  - Verificar notificación Telegram          │
└─────────────────────────────────────────────┘
```

---

## 📝 Ejemplo de Salida

```
🦚 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM — SuperCommit MAX
📌 Cambiando a branch main...
Already on 'main'
📥 Actualizando desde origin main...
Already up to date.
🧹 Realizando limpieza previa...
📦 Instalando dependencias...
added 125 packages in 8s
📁 Verificando estructura de directorios...
➕ Añadiendo archivos al staging area...
ℹ️  apps/ no existe
ℹ️  api/ no existe
ℹ️  modules/ no existe
💎 Creando commit con mensaje detallado...
[main abc1234] 🔥 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
 54 files changed, 15234 insertions(+), 892 deletions(-)
🚀 Enviando cambios a origin main...
To https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
   f917593..abc1234  main -> main
🌐 Desplegando en Vercel...
✅ Production: https://tryonyou.app [8s]

════════════════════════════════════════════════════════════════
✅ RESULTADO FINAL
════════════════════════════════════════════════════════════════
📦 Repositorio: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
🌿 Branch: main
🌐 Dominio: https://tryonyou.app
📊 Estado: LIVE + sincronizado
🔗 Notifications: @abvet_deploy_bot (Telegram)
💎 Generado por: Agente 70 — SuperCommit MAX
════════════════════════════════════════════════════════════════

✅ Deploy completo a tryonyou.app — verificado.
```

---

## ⚠️ Advertencias Importantes

### 🔴 Este Script es Destructivo

El script **ELIMINA** directorios sin pedir confirmación:
- `node_modules/`
- `dist/`
- `legacy_old/`
- `temp_old/`
- `apps/web-old/`
- `tests-old/`
- `legacy/`
- `integrations/duplicados/`

**Asegúrate de que no hay código importante en estos directorios antes de ejecutar.**

### 🔴 Push Forzado

El script hace push directamente a `main`. Asegúrate de:
- Tener un backup
- Estar seguro de los cambios
- Coordinar con tu equipo

### 🔴 Deploy en Producción

Si defines `VERCEL_TOKEN`, el script despliega directamente a producción.

**Recomendaciones**:
- Probar en ambiente de staging primero
- Verificar que todo funcione localmente
- Tener un plan de rollback

---

## 🎯 Casos de Uso

### Caso 1: Commit Final de Integración

**Escenario**: Has terminado de integrar todos los módulos y quieres hacer el commit final.

```bash
./TRYONYOU_SUPERCOMMIT_MAX.sh
```

### Caso 2: Deploy de Emergencia

**Escenario**: Necesitas desplegar rápidamente con todos los cambios consolidados.

```bash
export VERCEL_TOKEN="tu_token"
./TRYONYOU_SUPERCOMMIT_MAX.sh
```

### Caso 3: Limpieza de Repositorio

**Escenario**: El repositorio tiene muchos archivos obsoletos y quieres limpiarlo.

```bash
./TRYONYOU_SUPERCOMMIT_MAX.sh
# El script limpiará automáticamente
```

---

## 🔗 Enlaces Relacionados

- **Estructura Final**: [estructura_final.md](./estructura_final.md)
- **Mensaje de Commit**: [readme_commit.md](./readme_commit.md)
- **Deploy Instructions**: [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md)
- **README Principal**: [README.md](./README.md)

---

## 📞 Soporte

Si tienes problemas ejecutando el script:

1. **Revisa este documento**: La mayoría de problemas están cubiertos en [Solución de Problemas](#solución-de-problemas)
2. **Verifica logs**: Revisa la salida del script para ver dónde falló
3. **GitHub Issues**: Abre un issue en el repositorio
4. **Contacto**: info@tryonyou.app

---

**Última actualización**: Octubre 2025  
**Versión del Script**: 1.0.0  
**Mantenedor**: Agente 70 / LVT-ENG
