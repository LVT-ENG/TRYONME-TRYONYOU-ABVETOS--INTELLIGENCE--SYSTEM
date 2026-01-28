# TRYONME-TRYONYOU-ABVETOS INTELLIGENCE SYSTEM

Sistema de Inteligencia Artificial para experiencias de moda inmersivas con Avatar 3D, PAU (Personal Avatar Unit), y tecnologías de prueba virtual.

## 🚀 SuperCommit Pro - Ejecución

El script `TRYONYOU_SUPERCOMMIT_MAX.sh` es un comando maestro que ejecuta el protocolo completo de sincronización, limpieza, instalación y despliegue del sistema.

### Requisitos Previos

- Git instalado y configurado
- Node.js y npm instalados
- Acceso de escritura al repositorio
- (Opcional) Token de Vercel para despliegue automático

### Formas de Ejecutar SuperCommit Pro

#### Opción 1: Ejecutar directamente el script
```bash
./TRYONYOU_SUPERCOMMIT_MAX.sh
```

#### Opción 2: Usar npm script (recomendado)
```bash
npm run supercommit
```

o alternativamente:
```bash
npm run commit:pro
```

#### Opción 3: Ejecución con bash explícito
```bash
bash TRYONYOU_SUPERCOMMIT_MAX.sh
```

### ¿Qué hace el SuperCommit?

El script ejecuta automáticamente las siguientes operaciones:

1. **🔒 Verificación de Seguridad**: Confirma que se ejecuta en la raíz del proyecto
2. **🔄 Sincronización**: Actualiza con la rama main desde GitHub
3. **🧹 Limpieza Profunda**: Elimina dependencias antiguas y archivos legacy
4. **📦 Instalación Fresca**: Instala dependencias actualizadas (Vite 7.1.2 + React 18.3.1)
5. **📂 Estructura de Directorios**: Crea la estructura de módulos necesaria
6. **➕ Staging**: Añade todos los cambios al área de staging de Git
7. **💎 Commit Maestro**: Genera un commit consolidado con toda la información del ecosistema
8. **🚀 Push a GitHub**: Envía los cambios al repositorio remoto
9. **🌐 Despliegue Automático**: Despliega a Vercel Production (si el token está configurado)

### Variables de Entorno

Para habilitar el despliegue automático a Vercel, configura:

```bash
export VERCEL_TOKEN="tu_token_aqui"
```

### Módulos Integrados

- **PAU (Personal Avatar Unit)**: Sistema de recomendaciones con IA emocional
- **ABVET**: Sistema de pago biométrico (Iris/Voz)
- **CAP**: Auto-producción Just-in-Time
- **Wardrobe**: Ecosistema inteligente y solidario
- **Avatar3D**: Renderizado de avatar en 3D
- **FTT**: Fashion Technology Transfer

### Infraestructura

- **Frontend**: Vite 7.1.2 + React 18.3.1
- **Deploy**: Vercel Production
- **SSL**: Modo estricto
- **Legal**: Alineado con Patente PCT/EP2025/067317

### Precauciones

⚠️ **ADVERTENCIA**: Este script realiza operaciones destructivas:
- Elimina carpetas como `node_modules`, `dist`, archivos legacy
- Realiza commits y push automático a GitHub
- Asegúrate de tener respaldo de cualquier trabajo no guardado

### Solución de Problemas

**Error: "Ejecuta esto en la raíz del proyecto"**
- Asegúrate de estar en el directorio raíz donde está `package.json`

**Error: "No se pudo hacer pull"**
- Verifica tu conexión a internet y acceso al repositorio
- El script continuará con la versión local

**No se despliega a Vercel**
- Verifica que la variable `VERCEL_TOKEN` esté configurada correctamente

## 📝 Licencia

Fashion Intelligence System v7.0 - Todos los derechos reservados.
