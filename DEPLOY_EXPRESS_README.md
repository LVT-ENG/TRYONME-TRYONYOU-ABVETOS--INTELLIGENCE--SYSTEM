# 📦 Deploy Express - Dossier de Patente TRYONYOU

Sistema de despliegue automático para el dossier consolidado de patente **TRYONYOU-ABVETOS-ULTRA-PLUS**.

## 🎯 Objetivo

Automatizar el despliegue del dossier de patente usando un script `DEPLOY_EXPRESS.sh` y un ZIP maestro ubicado en `/public/`.

## 📋 Contenido del ZIP Maestro

El archivo `ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS.zip` contiene:

- ✅ `TRYONYOU_PATENTE_CONSOLIDADA.pdf` - Documento consolidado de patente
- ✅ `CLAIMS_TRADUCIDOS_EN.docx` - Reivindicaciones traducidas al inglés
- ✅ `VERSION_FRANCAISE.docx` - Versión francesa de las reivindicaciones
- ✅ `CHECKLIST_WIPO.txt` - Lista de verificación para WIPO PCT
- ✅ `FORMATO_OFICIAL_WIPO_PCT.xml` - Formato XML oficial para WIPO ePCT
- ✅ `DIAGRAMA_1_TRYONYOU.png` - Diagrama técnico 1
- ✅ `DIAGRAMA_2_TRYONYOU.png` - Diagrama técnico 2
- ✅ `DIAGRAMA_3_TRYONYOU.png` - Diagrama técnico 3

## 🚀 Uso del Script DEPLOY_EXPRESS.sh

### Ejecución Manual

```bash
# Desde el directorio raíz del repositorio
./DEPLOY_EXPRESS.sh public/ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS.zip
```

El script:
1. Verifica que el archivo ZIP existe
2. Crea el directorio `./tryonyou_patente_deploy`
3. Extrae el contenido del ZIP
4. Muestra un resumen del despliegue

### Resultado

Los archivos se despliegan en: `./tryonyou_patente_deploy/`

⚠️ **Nota:** Este directorio está excluido del control de versiones (`.gitignore`)

## 🔄 Despliegue Automático con GitHub Actions

### Workflow: `.github/workflows/deploy-patent.yml`

El workflow se activa automáticamente cuando:
- Se hace push de cambios a archivos `public/ZIP_MAESTRO_TRYONYOU*.zip` en la rama `main`
- Se ejecuta manualmente desde GitHub Actions

### Características del Workflow

1. **Verificación**: Comprueba la existencia del ZIP maestro
2. **Despliegue**: Ejecuta el script `DEPLOY_EXPRESS.sh`
3. **Validación**: Verifica que el despliegue fue exitoso
4. **Artefactos**: Sube los archivos desplegados como artefactos de GitHub Actions
5. **Retención**: Los artefactos se mantienen disponibles por 30 días

### Activación Manual

Desde la interfaz de GitHub:
1. Ve a `Actions` → `📦 Deploy Patente TRYONYOU`
2. Haz clic en "Run workflow"
3. Selecciona la rama `main`
4. Haz clic en "Run workflow"

## 📊 Verificación del Despliegue

Después del despliegue, puedes verificar:

```bash
# Listar archivos desplegados
ls -lh ./tryonyou_patente_deploy/

# Contar archivos
find ./tryonyou_patente_deploy -type f | wc -l

# Ver contenido específico
cat ./tryonyou_patente_deploy/CHECKLIST_WIPO.txt
```

## 🔧 Mantenimiento

### Actualizar el ZIP Maestro

1. Preparar el nuevo contenido en un directorio temporal
2. Crear el ZIP:
   ```bash
   zip -r ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS.zip *
   ```
3. Copiar a `/public/`:
   ```bash
   cp ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS.zip public/
   ```
4. Hacer commit y push:
   ```bash
   git add public/ZIP_MAESTRO_TRYONYOU_ABVET_ULTRA_PLUS_COMPLETO_DEPLOY_EXPRESS.zip
   git commit -m "📦 Update: ZIP maestro de patente"
   git push origin main
   ```

El workflow se ejecutará automáticamente después del push.

## 🌐 Integración con WIPO ePCT

El dossier desplegado está preparado para:
- ✅ Actualización semanal automática con bots
- ✅ Conexión directa a WIPO ePCT
- ✅ Formato XML oficial WIPO PCT
- ✅ Documentación multilingüe (EN, FR, ES)

## 📞 Soporte

Para problemas o preguntas sobre el sistema de despliegue:
- Revisa los logs del workflow en GitHub Actions
- Verifica que el ZIP maestro existe en `/public/`
- Asegúrate de que `DEPLOY_EXPRESS.sh` tiene permisos de ejecución

## 📝 Notas Técnicas

- **Script**: `DEPLOY_EXPRESS.sh` - Bash script compatible con Linux/macOS
- **Workflow**: `.github/workflows/deploy-patent.yml` - GitHub Actions YAML
- **ZIP**: Compresión estándar ZIP compatible con `unzip`
- **Ubicación**: Todo el sistema opera desde el directorio raíz del repositorio
