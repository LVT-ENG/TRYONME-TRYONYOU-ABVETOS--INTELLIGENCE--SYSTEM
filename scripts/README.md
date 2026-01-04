# Scripts Directory

Este directorio contiene scripts de utilidad para el proyecto TRYONYOU.

## Scripts Disponibles

### super-deploy.sh

Script principal de despliegue que ejecuta el flujo completo de integración y deploy.

**Características:**
- ✅ Verificación de estructura del repositorio
- ✅ Cambio automático a branch main
- ✅ Actualización desde remoto
- ✅ Limpieza de archivos obsoletos
- ✅ Instalación de dependencias
- ✅ Creación de estructura de directorios
- ✅ Staging inteligente de archivos
- ✅ Super-commit con mensaje detallado
- ✅ Push a origin main
- ✅ Deploy a Vercel (opcional con token)
- ✅ Resumen final del estado

**Uso básico:**
```bash
# Ejecutar desde la raíz del proyecto
./scripts/super-deploy.sh
```

**Uso con deploy a Vercel:**
```bash
# Configurar token de Vercel
export VERCEL_TOKEN="your_vercel_token_here"

# Ejecutar deploy completo
./scripts/super-deploy.sh
```

**Variables de entorno:**
- `VERCEL_TOKEN` (opcional): Token para deploy automático en Vercel

**Estructura de commit:**

El script genera un super-commit que incluye:
- Lista de módulos integrados (Avatar3D, TextileComparator, PAU, CAP, ABVET, etc.)
- Información de infraestructura (Vite, React, Vercel, CI/CD)
- Documentación actualizada
- Configuración de deployment

**Salida:**

```
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
```

## Otros Scripts del Proyecto

### deploy.sh
Script de despliegue legacy que mantiene compatibilidad con el flujo anterior.

### consolidar_sistema.sh
Script de consolidación que limpia e instala dependencias.

### SUPERCOMMIT_MAX.sh
Script simplificado de super-commit para releases rápidos.

## Requisitos

- Node.js 18+
- npm 9+
- Git
- Bash shell
- (Opcional) Vercel CLI
- (Opcional) Token de Vercel para deploy automático

## Estructura de Directorios Gestionada

El script `super-deploy.sh` verifica y crea los siguientes directorios:

```
docs/
├── arquitectura_empresa/
├── patent_EPCT/
└── investor_edition/

public/
└── assets/
    ├── hero/
    ├── modules/
    ├── investor/
    └── vision/

src/
├── modules/
├── components/
└── pages/
```

## Flujo de Trabajo Recomendado

1. **Desarrollo Local**
   ```bash
   npm run dev
   ```

2. **Build de Verificación**
   ```bash
   npm run build
   ```

3. **Deploy Completo**
   ```bash
   ./scripts/super-deploy.sh
   ```

## Solución de Problemas

### Error: "Este script debe ejecutarse desde la raíz del repositorio"
**Causa**: El script no encuentra el archivo `package.json`  
**Solución**: Ejecuta el script desde el directorio raíz del proyecto

### Error: "Error al cambiar a main"
**Causa**: No existe la rama main o hay conflictos  
**Solución**: Verifica el estado de git con `git status` y resuelve conflictos

### Error: "Error al hacer pull"
**Causa**: Conflictos con el repositorio remoto  
**Solución**: Sincroniza manualmente con `git pull origin main` y resuelve conflictos

### Error: "Error al hacer push"
**Causa**: Sin permisos o conflictos en remoto  
**Solución**: Verifica permisos y sincroniza con remoto

### Warning: "Variable VERCEL_TOKEN no definida"
**Causa**: No se configuró el token de Vercel  
**Solución**: Es opcional. Si quieres deploy automático, exporta `VERCEL_TOKEN`

## Notas de Seguridad

⚠️ **IMPORTANTE**:
- No commitees el archivo `.env` con tokens
- Usa `.env.example` como plantilla
- Los tokens deben configurarse como variables de entorno
- No compartas tokens de Vercel públicamente

## Contribuir

Para agregar nuevos scripts:
1. Crea el script en este directorio
2. Hazlo ejecutable: `chmod +x scripts/nuevo-script.sh`
3. Documenta su uso en este README
4. Agrega ejemplos de uso
5. Incluye manejo de errores

## Soporte

Para problemas con los scripts:
- Abre un issue en GitHub
- Contacta al equipo de DevOps
- Revisa los logs de ejecución
- Consulta la documentación en `/docs`

---

**Mantenedor**: LVT-ENG Team  
**Última actualización**: 2026-01-04
