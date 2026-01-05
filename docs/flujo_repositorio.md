# Flujo de trabajo del repositorio TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM

## 1. Estructura centralizada
- **src/modules/**: Módulos principales de negocio (Avatar3D, comparador textil, bots, PAU, AutoDonate, etc.)
- **src/assets/** y **public/assets/**: Imágenes, videos, modelos 3D y otros recursos visuales.
- **docs/**: Documentación técnica, arquitectura, investor edition, patent_EPCT y flujo de usuario.
- **scripts/TRYONYOU_SUPERCOMMIT_MAX.sh**: Script maestro para limpieza, commit, push y despliegue.

## 2. Flujo de desarrollo y despliegue
1. Desarrolla o actualiza módulos en `src/modules/`.
2. Añade o actualiza assets en `src/assets/` o `public/assets/`.
3. Documenta cambios y arquitectura en `docs/`.
4. Ejecuta `scripts/TRYONYOU_SUPERCOMMIT_MAX.sh`:
   - Limpia archivos y carpetas obsoletos.
   - Instala dependencias.
   - Añade todos los cambios relevantes al staging de git.
   - Realiza un commit firmado y detallado.
   - Hace push a la rama `main`.
   - Despliega automáticamente en Vercel (si hay token).
5. El sistema queda sincronizado y desplegado en https://tryonyou.app.

## 3. Control de versiones y despliegue
- Todo el código y recursos están versionados en la rama `main`.
- El despliegue es continuo y automatizado vía Vercel.
- Notificaciones y control de estado vía Telegram (@abvet_deploy_bot).

## 4. Producción y mantenimiento
- El repositorio es la fuente única de verdad para todo el sistema.
- Cualquier cambio relevante debe pasar por el flujo anterior para asegurar integridad y trazabilidad.
- La estructura está optimizada para escalabilidad, integración de nuevos módulos y despliegue rápido.

---

Este flujo garantiza orden, trazabilidad y despliegue seguro en producción para TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM.
