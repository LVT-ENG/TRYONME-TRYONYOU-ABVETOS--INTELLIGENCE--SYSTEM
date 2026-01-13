# TRYONYOU Intelligence System 🚀

Sistema inteligente de prueba virtual de ropa con análisis biométrico en tiempo real.

## 🌟 TRYONYOU SUPERCOMMIT MAX

Este repositorio incluye un sistema de sincronización completo del ecosistema TryOnYou que integra:

- **GitHub**: Sincronización automática de código
- **Vercel**: Despliegue en producción
- **Latido de Jules**: Monitoreo del estado del sistema

### Uso Rápido

```bash
# Este comando une GitHub, Vercel y el Latido de Jules en un solo movimiento
echo "Sincronizando Ecosistema TryOnYou..."
./TRYONYOU_SUPERCOMMIT_MAX.sh
```

### Características del Script

El script `TRYONYOU_SUPERCOMMIT_MAX.sh` realiza las siguientes operaciones:

#### 💓 Latido de Jules - Verificación del Sistema
- Verifica la instalación de Git
- Verifica la instalación de Node.js y npm
- Verifica la instalación de Python
- Verifica el estado del repositorio Git
- Genera un reporte de salud del sistema

#### 🔄 GitHub Sync - Sincronización
- Detecta cambios pendientes en el repositorio
- Agrega todos los archivos modificados
- Crea un commit automático con timestamp
- Envía los cambios al repositorio remoto

#### 🔨 Build - Construcción del Proyecto
- Ejecuta el proceso de build si existe
- Compatible con proyectos npm

#### 🚀 Vercel Deploy - Despliegue
- Despliega automáticamente a Vercel (si CLI está instalado)
- Funciona con integración GitHub-Vercel automática

#### 📊 Resumen y Logging
- Genera un log detallado de todas las operaciones
- Muestra un resumen visual con colores
- Guarda logs en archivos `sync_log_*.log`

### Requisitos

- Git
- Node.js y npm (opcional)
- Python 3 (opcional)
- Vercel CLI (opcional, para deploy directo)

### Instalación de Vercel CLI (opcional)

```bash
npm i -g vercel
```

### Estructura del Proyecto

```
.
├── TRYONYOU_SUPERCOMMIT_MAX.sh  # Script de sincronización
├── index.html                    # Frontend principal
├── main.py                       # Backend FastAPI con MediaPipe
├── package.json                  # Dependencias Node.js
├── requirements.txt              # Dependencias Python
├── vercel.json                   # Configuración de Vercel
├── src/                          # Código fuente React
└── scripts/                      # Scripts adicionales
```

### Tecnologías

- **Frontend**: React + Vite
- **Backend**: FastAPI + MediaPipe
- **Deploy**: Vercel
- **Control de Versiones**: GitHub

### Desarrollo Local

```bash
# Instalar dependencias
npm install
pip install -r requirements.txt

# Desarrollo frontend
npm run dev

# Backend API
python3 main.py
```

### Deploy

```bash
# Deploy manual con el script
./TRYONYOU_SUPERCOMMIT_MAX.sh

# O con Vercel CLI directamente
vercel --prod
```

### Logs

Los logs de sincronización se guardan automáticamente en archivos con formato:
```
sync_log_YYYYMMDD_HHMMSS.log
```

Estos archivos están excluidos del control de versiones (ver `.gitignore`).

---

**TryOnYou Intelligence System** - Análisis biométrico y prueba virtual de ropa
