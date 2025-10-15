# 🚀 SuperCommit MAX — Quick Start

## ¿Qué es esto?

**SuperCommit MAX** es el script de integración final para el sistema TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM. En un solo comando, limpia, organiza, commitea y despliega todo el proyecto.

## 🎯 Uso Rápido

```bash
# Ejecución básica (sin deploy automático)
./TRYONYOU_SUPERCOMMIT_MAX.sh

# Con deploy automático a Vercel
VERCEL_TOKEN="tu_token" ./TRYONYOU_SUPERCOMMIT_MAX.sh
```

## ✅ Lo que hace

1. ✅ Limpia archivos obsoletos (`node_modules`, `dist`, `legacy_old`, etc.)
2. ✅ Instala dependencias actualizadas
3. ✅ Organiza estructura del proyecto
4. ✅ Crea commit consolidado con mensaje detallado
5. ✅ Push a GitHub (branch `main`)
6. ✅ Deploy a Vercel (opcional, si hay token)

## 📋 Requisitos

- Git instalado
- Node.js 22.x+
- Permisos de push a `main`
- (Opcional) Token de Vercel

## ⚠️ Advertencia

Este script es **destructivo**. Elimina:
- `node_modules/`
- `dist/`
- `legacy_old/`
- `temp_old/`
- `apps/web-old/`
- `tests-old/`
- `legacy/`
- `integrations/duplicados/`

**Asegúrate de no tener código importante en estos directorios.**

## 📚 Documentación Completa

Para instrucciones detalladas, troubleshooting y opciones avanzadas, consulta:

- **Guía Completa**: [SUPERCOMMIT_MAX_USAGE.md](./SUPERCOMMIT_MAX_USAGE.md)
- **Estructura Final**: [estructura_final.md](./estructura_final.md)
- **Mensaje de Commit**: [readme_commit.md](./readme_commit.md)

## 🎬 Ejemplo de Salida

```
🦚 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM — SuperCommit MAX
📌 Cambiando a branch main...
📥 Actualizando desde origin main...
🧹 Realizando limpieza previa...
📦 Instalando dependencias...
📁 Verificando estructura de directorios...
➕ Añadiendo archivos al staging area...
💎 Creando commit con mensaje detallado...
🚀 Enviando cambios a origin main...
🌐 Desplegando en Vercel...

════════════════════════════════════════════════════════════════
✅ RESULTADO FINAL
════════════════════════════════════════════════════════════════
📦 Repositorio: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
🌿 Branch: main
🌐 Dominio: https://tryonyou.app
📊 Estado: LIVE + sincronizado
════════════════════════════════════════════════════════════════

✅ Deploy completo a tryonyou.app — verificado.
```

## 📞 Soporte

- **Issues**: GitHub Issues del repositorio
- **Email**: info@tryonyou.app
- **Docs**: [SUPERCOMMIT_MAX_USAGE.md](./SUPERCOMMIT_MAX_USAGE.md)

---

**Generado por**: Agente 70  
**Versión**: 1.0.0  
**Fecha**: Octubre 2025
