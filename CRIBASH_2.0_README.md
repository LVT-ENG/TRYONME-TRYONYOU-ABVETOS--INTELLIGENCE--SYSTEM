# CribaSH 2.0 — Sistema de Criba Inteligente para TRYONYOU

## 📋 Descripción

CribaSH 2.0 es un script bash avanzado diseñado para crear una copia limpia y optimizada de proyectos TRYONYOU, eliminando archivos innecesarios y preparando el código para su despliegue y presentación.

## 🚀 Uso Rápido

```bash
chmod +x cribash2.0.sh
./cribash2.0.sh
```

## 🔧 Qué hace el script

### 1. **Validación de Origen**
- Verifica que la carpeta origen (DeployExpress) existe
- Si no existe, permite al usuario especificar una ruta alternativa
- Cancelación segura si no se proporciona una ruta válida

### 2. **Creación de Estructura Limpia**
- Crea carpeta destino: `~/TRYONYOU_DEMO_CLEAN`
- Estructura automática:
  - `ASSETS-DEMO/` - Assets y recursos visuales
  - `src/` - Código fuente
  - `public/` - Recursos públicos

### 3. **Copia Inteligente con rsync**
Incluye **solo** archivos esenciales:
- **HTML/HTM** - Páginas web
- **JavaScript** - JS, JSX
- **TypeScript** - TS, TSX
- **Estilos** - CSS, SCSS
- **Datos** - JSON
- **Imágenes** - PNG, JPG, JPEG, SVG, WebP, GIF, ICO

Excluye automáticamente:
- `node_modules/`
- `.git/`
- `dist/`, `build/`
- `*.log`, `*.tmp`, `*.bak`
- `.DS_Store`, `__MACOSX/`, `Cache/`
- Vídeos: MP4, MOV, AVI, MKV
- Archivos pesados: ZIP, DMG, ISO
- Carpeta Downloads

### 4. **Detección de Archivos Grandes**
- Busca archivos > 200MB en el origen
- Lista todos los archivos detectados
- Opción interactiva: mover a `/tmp/TRYONYOU_LARGE_FILES/`
- No borra archivos, solo los reorganiza

### 5. **Inclusión Opcional de ZIP**
- Detecta ZIP predefinido en `/mnt/data/archive_20251207_161946.zip`
- Pregunta si deseas incluirlo en `ASSETS-DEMO/`
- Copia solo si el usuario confirma

### 6. **Limpieza Final**
- Elimina directorios vacíos
- Optimiza estructura de carpetas

### 7. **Empaquetado ZIP**
- Crea ZIP timestamped: `~/TRYONYOU_DEMO_CLEAN_YYYYMMDD_HHMMSS.zip`
- Compresión completa del proyecto limpio

### 8. **Inicialización Git y Push**
- Solicita URL del repositorio destino
- Inicializa repositorio Git
- Crea branch: `design/criba2.0`
- Commit automático: "CribaSH 2.0 — demo clean for TRYONYOU"
- Push forzado al branch remoto

### 9. **Creación de Pull Request (Opcional)**
- Detecta si GitHub CLI (`gh`) está instalado
- Opción interactiva para crear PR
- PR contra `main` con título y descripción predefinidos
- Referencia automática a Issue #1211

### 10. **Mensajes Listos para AI**
Genera mensajes optimizados para:

**Para Copilot:**
```
Copilot: usa el contenido del repo [URL]/tree/design/criba2.0/ASSETS-DEMO 
y la raíz del branch design/criba2.0 para reconstruir la demo navegable 
y la landing. Usa sólo los assets en ASSETS-DEMO y el código en la raíz. 
Documento de referencia: Issue LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1211.
```

**Para Manus:**
```
Manus: escanea el repo [URL]/tree/design/criba2.0 y genera todos los 
assets faltantes (PNGs/Renders/SVGs) y los mockups listos para integración. 
Entrega un ZIP con los assets listos en la misma estructura. 
Usa la guía visual en brand-guidelines/.
```

## 📝 Variables Configurables

Edita estas variables al inicio del script según tus necesidades:

```bash
ORIG="${HOME}/DeployExpress"           # Carpeta origen
LIMPIO="${HOME}/TRYONYOU_DEMO_CLEAN"  # Carpeta destino
BRANCH="design/criba2.0"               # Nombre del branch
ZIP_PATH="/mnt/data/archive_20251207_161946.zip"  # ZIP opcional
ASSETS_DIR="ASSETS-DEMO"               # Carpeta de assets
```

## ⚙️ Requisitos

### Obligatorios:
- **bash** - Shell script
- **rsync** - Copia inteligente de archivos
- **find** - Búsqueda de archivos
- **zip** - Empaquetado
- **git** - Control de versiones

### Opcionales:
- **gh** (GitHub CLI) - Para crear PRs automáticamente
  ```bash
  # Instalar GitHub CLI
  # macOS
  brew install gh
  
  # Linux
  sudo apt install gh  # Debian/Ubuntu
  sudo dnf install gh  # Fedora
  ```

## 🎯 Casos de Uso

### Caso 1: Preparar Demo para Cliente
```bash
./cribash2.0.sh
# Sigue las instrucciones interactivas
# Resultado: ZIP limpio + repo Git + mensajes AI
```

### Caso 2: Limpieza Rápida sin Git
```bash
./cribash2.0.sh
# Cuando pida URL del repo, presiona ENTER para cancelar
# Resultado: Solo carpeta limpia + ZIP
```

### Caso 3: Full Workflow con PR
```bash
# Asegúrate de tener gh instalado y autenticado
gh auth login

./cribash2.0.sh
# Proporciona URL del repo
# Responde "yes" cuando pregunte por el PR
# Resultado: Carpeta + ZIP + Git push + PR creado
```

## 📊 Salida del Script

Al finalizar obtendrás:

1. **Carpeta limpia**: `~/TRYONYOU_DEMO_CLEAN/`
2. **ZIP empaquetado**: `~/TRYONYOU_DEMO_CLEAN_[timestamp].zip`
3. **Branch Git**: `design/criba2.0` (si proporcionaste URL)
4. **Pull Request**: Creado automáticamente (si usaste gh)
5. **Mensajes AI**: Listos para copiar/pegar

## ⚠️ Consideraciones Importantes

- **El script usa `--delete` en rsync**: Archivos en destino que no están en origen serán eliminados
- **Push forzado (`--force`)**: Sobrescribirá el branch remoto si ya existe
- **Archivos grandes**: El script no los copia, pero te da opción de moverlos
- **Directorios vacíos**: Se eliminan automáticamente
- **No se modifican archivos origen**: Todo es copia, el origen permanece intacto (excepto si mueves archivos grandes)

## 🔒 Seguridad

- `set -e`: El script se detiene ante cualquier error
- Confirmaciones interactivas para operaciones destructivas
- No borra archivos origen (solo los mueve si lo confirmas)
- Validación de rutas antes de operar

## 🆘 Troubleshooting

### "rsync: command not found"
```bash
# macOS
brew install rsync

# Linux
sudo apt install rsync  # Debian/Ubuntu
sudo dnf install rsync  # Fedora
```

### "zip: command not found"
```bash
# macOS (generalmente ya instalado)
brew install zip

# Linux
sudo apt install zip
```

### "gh: command not found" (opcional)
```bash
# Solo necesario si quieres crear PRs automáticamente
# macOS
brew install gh

# Linux
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

### Archivos grandes no se detectan
- Verifica que tienes permisos de lectura en la carpeta origen
- Algunos sistemas de archivos pueden no soportar `-size +200M`

## 📚 Referencias

- Issue Original: [LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1211](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues/1211)
- GitHub CLI: https://cli.github.com/
- rsync manual: `man rsync`

## 📄 Licencia

Este script es parte del proyecto TRYONYOU.

---

**Versión**: 2.0  
**Fecha**: Diciembre 2024  
**Autor**: LVT-ENG Team  
**Relacionado con**: Issue #1211, #1216
