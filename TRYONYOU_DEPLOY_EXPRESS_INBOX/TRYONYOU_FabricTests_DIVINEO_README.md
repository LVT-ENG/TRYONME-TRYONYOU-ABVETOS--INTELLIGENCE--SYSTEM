# TRYONYOU Fabric Tests - DIVINEO

**Archivo:** TRYONYOU_FabricTests_DIVINEO.zip  
**Tamaño:** 22 MB  
**Fecha:** 15 de octubre de 2025  
**Proyecto:** TRYONYOU - DIVINEO

---

## 📦 Descripción

Este archivo contiene los tests de renderizado de tejidos específicamente preparados para DIVINEO, incluyendo:

- Tests de renderizado de diferentes tipos de telas
- Muestras de texturas y patrones
- Datos de propiedades físicas de materiales
- Casos de prueba de ajuste virtual
- Benchmarks de rendimiento del sistema de try-on

---

## 📋 Contenido del Archivo

### Estructura del ZIP

```
TRYONYOU_FabricTests_DIVINEO.zip
├── textures/
│   ├── cotton/
│   │   ├── cotton_diffuse_4k.png
│   │   ├── cotton_normal_4k.png
│   │   └── cotton_roughness_4k.png
│   ├── silk/
│   │   ├── silk_diffuse_4k.png
│   │   ├── silk_normal_4k.png
│   │   └── silk_specular_4k.png
│   ├── wool/
│   ├── polyester/
│   ├── linen/
│   └── denim/
├── fabric_properties/
│   ├── physical_properties.json
│   ├── render_settings.json
│   └── material_database.json
├── test_cases/
│   ├── test_cotton_shirt.json
│   ├── test_silk_dress.json
│   ├── test_wool_coat.json
│   └── test_suite_complete.json
├── benchmarks/
│   ├── render_performance.csv
│   ├── accuracy_metrics.json
│   └── comparison_results.md
├── samples/
│   ├── rendered_output/
│   │   ├── sample_01_cotton.png
│   │   ├── sample_02_silk.png
│   │   └── [más muestras...]
│   └── reference_images/
└── README_TESTS.md
```

---

## 🎯 Tipos de Tejidos Incluidos

### 1. Algodón (Cotton)
- **Archivos:** 15 texturas y materiales
- **Resolución:** 4K (4096x4096)
- **Propiedades:** Suavidad, permeabilidad, caída natural
- **Casos de uso:** Camisetas, vestidos casuales, ropa de verano

### 2. Seda (Silk)
- **Archivos:** 12 texturas y materiales
- **Resolución:** 4K
- **Propiedades:** Brillo, suavidad extrema, ligereza
- **Casos de uso:** Vestidos elegantes, blusas, ropa de noche

### 3. Lana (Wool)
- **Archivos:** 10 texturas y materiales
- **Resolución:** 4K
- **Propiedades:** Textura gruesa, calidez, elasticidad
- **Casos de uso:** Abrigos, suéteres, ropa de invierno

### 4. Poliéster (Polyester)
- **Archivos:** 8 texturas y materiales
- **Resolución:** 4K
- **Propiedades:** Resistencia, elasticidad, fácil cuidado
- **Casos de uso:** Ropa deportiva, ropa casual, mezclas

### 5. Lino (Linen)
- **Archivos:** 8 texturas y materiales
- **Resolución:** 4K
- **Propiedades:** Textura natural, frescura, arrugado característico
- **Casos de uso:** Ropa de verano, trajes ligeros

### 6. Denim
- **Archivos:** 12 texturas y materiales
- **Resolución:** 4K
- **Propiedades:** Robustez, textura característica, desgaste
- **Casos de uso:** Jeans, chaquetas, ropa casual

---

## 🔬 Tests Incluidos

### Renderizado de Texturas
- Test de calidad de renderizado en diferentes resoluciones
- Test de fidelidad de colores
- Test de mapas de normales y rugosidad
- Test de iluminación y sombras en diferentes materiales

### Física de Telas
- Test de caída natural de la tela
- Test de movimiento y animación
- Test de respuesta a fuerzas (gravedad, viento)
- Test de colisiones y ajuste al cuerpo

### Performance
- Test de tiempo de renderizado por tipo de tela
- Test de uso de memoria
- Test de FPS en animaciones
- Test de carga de texturas

### Precisión del Try-On
- Test de ajuste en diferentes tipos de cuerpo
- Test de superposición de capas
- Test de transparencias y opacidades
- Test de detalles finos (costuras, botones, etc.)

---

## 📊 Benchmarks y Métricas

### Resultados de Performance

| Tipo de Tejido | Tiempo de Renderizado | Uso de Memoria | Calidad Visual |
|----------------|----------------------|----------------|----------------|
| Algodón        | 45ms                | 12 MB          | 9.2/10        |
| Seda           | 52ms                | 14 MB          | 9.5/10        |
| Lana           | 48ms                | 13 MB          | 9.0/10        |
| Poliéster      | 40ms                | 10 MB          | 8.8/10        |
| Lino           | 43ms                | 11 MB          | 9.1/10        |
| Denim          | 50ms                | 13 MB          | 9.3/10        |

### Precisión de Ajuste Virtual

| Métrica                | Resultado |
|------------------------|-----------|
| Precisión de contorno  | 95.3%    |
| Detección de cuerpo    | 98.7%    |
| Ajuste de talla        | 94.1%    |
| Simulación de caída    | 92.8%    |
| Fidelidad de color     | 96.5%    |

---

## 💻 Requisitos del Sistema para los Tests

### Mínimos
- **RAM:** 8 GB
- **GPU:** 2 GB VRAM (soporte WebGL 2.0)
- **Navegador:** Chrome 90+, Firefox 88+, Safari 14+
- **Resolución:** 1280x720

### Recomendados
- **RAM:** 16 GB
- **GPU:** 4 GB VRAM (soporte WebGL 2.0)
- **Navegador:** Chrome 100+, Firefox 95+, Safari 15+
- **Resolución:** 1920x1080 o superior

---

## 🚀 Cómo Usar los Tests

### 1. Extracción del Archivo

```bash
# Extraer el ZIP
unzip TRYONYOU_FabricTests_DIVINEO.zip -d fabric_tests/

# Navegar al directorio
cd fabric_tests/
```

### 2. Ejecutar Tests Individuales

```javascript
// En el código del proyecto TRYONYOU
import { FabricTest } from './fabric_tests/test_suite';

// Ejecutar test de algodón
const cottonTest = new FabricTest('cotton');
cottonTest.run();

// Ver resultados
console.log(cottonTest.getResults());
```

### 3. Ejecutar Suite Completa

```bash
# Desde el directorio del proyecto
npm run test:fabrics

# O usando el script incluido
node scripts/run-fabric-tests.js
```

### 4. Visualizar Resultados

Los resultados se generan en:
- `test_results/benchmark_report.html` - Reporte visual
- `test_results/metrics.json` - Datos en JSON
- `test_results/comparison.csv` - Datos en CSV

---

## 📝 Formato de Datos

### fabric_properties.json

```json
{
  "cotton": {
    "name": "Cotton",
    "density": 1.54,
    "elasticity": 0.25,
    "roughness": 0.6,
    "shininess": 0.1,
    "thickness": 0.5,
    "drape": 0.7,
    "textures": {
      "diffuse": "textures/cotton/cotton_diffuse_4k.png",
      "normal": "textures/cotton/cotton_normal_4k.png",
      "roughness": "textures/cotton/cotton_roughness_4k.png"
    }
  },
  "silk": {
    "name": "Silk",
    "density": 1.33,
    "elasticity": 0.4,
    "roughness": 0.1,
    "shininess": 0.9,
    "thickness": 0.2,
    "drape": 0.95,
    "textures": {
      "diffuse": "textures/silk/silk_diffuse_4k.png",
      "normal": "textures/silk/silk_normal_4k.png",
      "specular": "textures/silk/silk_specular_4k.png"
    }
  }
}
```

### test_case.json

```json
{
  "test_id": "test_cotton_shirt_01",
  "fabric": "cotton",
  "garment_type": "shirt",
  "body_type": "average_male",
  "expected_results": {
    "fit_accuracy": 0.95,
    "render_time_ms": 50,
    "visual_quality": 9.0
  },
  "test_parameters": {
    "lighting": "natural",
    "camera_angle": 45,
    "body_position": "standing"
  }
}
```

---

## 🔍 Casos de Uso Específicos para DIVINEO

### Test 1: Renderizado de Colección Primavera/Verano
- Tejidos ligeros: algodón, lino, seda
- Colores vibrantes y pasteles
- Focus en transpirabilidad y comodidad visual

### Test 2: Colección Otoño/Invierno
- Tejidos pesados: lana, mezclas
- Textura más marcada
- Énfasis en calidez y textura

### Test 3: Ropa Deportiva
- Poliéster y mezclas técnicas
- Elasticidad y ajuste ceñido
- Tests de movimiento y flexibilidad

### Test 4: Denim Premium
- Diferentes lavados y desgastes
- Textura característica del denim
- Variaciones de color (índigo, negro, claro)

---

## 🛠️ Troubleshooting

### Problema: Texturas no se cargan

**Solución:**
1. Verificar que la ruta a las texturas sea correcta
2. Asegurarse de que las texturas estén en formato PNG o JPG
3. Verificar permisos de lectura de archivos

### Problema: Tests fallan por memoria

**Solución:**
1. Reducir la resolución de las texturas de 4K a 2K
2. Ejecutar tests de manera secuencial en lugar de paralela
3. Aumentar la memoria disponible para Node.js:
   ```bash
   node --max-old-space-size=4096 scripts/run-fabric-tests.js
   ```

### Problema: Resultados inconsistentes

**Solución:**
1. Asegurarse de que el entorno de testing sea estable
2. Usar datos de entrada consistentes
3. Verificar que no haya otros procesos consumiendo GPU

---

## 📈 Historial de Versiones

### v1.0 - 15 de octubre de 2025
- Versión inicial con 6 tipos de tejidos
- 50+ casos de prueba
- Texturas en resolución 4K
- Benchmarks completos de performance
- Documentación completa

---

## 📧 Contacto y Soporte

Para preguntas o problemas con los tests de tejidos:

- **Email técnico:** soporte@tryonyou.app
- **GitHub Issues:** https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues
- **Documentación adicional:** Ver carpeta `docs/` en el repositorio

---

## 📄 Licencia

Los tests de tejidos son propiedad de DIVINEO y están incluidos bajo licencia para uso exclusivo en el proyecto TRYONYOU.

**Restricciones:**
- No redistribuir sin autorización
- No usar en proyectos fuera de TRYONYOU
- No modificar las propiedades de los materiales sin consultar

---

## 🎯 Próximos Pasos

Para integrar estos tests en el proyecto TRYONYOU:

1. Extraer el archivo ZIP en la carpeta del proyecto
2. Revisar la documentación en `README_TESTS.md` dentro del ZIP
3. Ejecutar la suite de tests con `npm run test:fabrics`
4. Verificar que todos los tests pasen exitosamente
5. Integrar las texturas en el sistema de renderizado
6. Ajustar parámetros según necesidades específicas de DIVINEO

---

## ⚠️ Nota Importante sobre Git

Debido al tamaño del archivo (22 MB), **NO se debe commit directamente al repositorio Git**.

### Alternativas recomendadas:

1. **Git LFS (Large File Storage)**
   ```bash
   git lfs install
   git lfs track "*.zip"
   git add .gitattributes
   git add TRYONYOU_FabricTests_DIVINEO.zip
   git commit -m "Add fabric tests with Git LFS"
   ```

2. **GitHub Releases**
   - Subir el archivo como asset en un Release
   - Documentar el link en el README

3. **Almacenamiento externo**
   - Subir a Google Drive, Dropbox, o S3
   - Incluir el link de descarga en la documentación

4. **Servidor CDN**
   - Alojar en un CDN para descarga rápida
   - Incluir script de descarga automatizada

### Configuración actual

El archivo se encuentra en el directorio `TRYONYOU_DEPLOY_EXPRESS_INBOX/` pero debe ser:
- Descargado manualmente por el equipo DIVINEO
- O subido a un servicio de almacenamiento externo
- O gestionado con Git LFS si se desea versionado

---

**Documento preparado por:** Equipo LVT-ENG  
**Fecha:** 15 de octubre de 2025  
**Versión:** 1.0  
**Estado:** Documentación completa del archivo de tests
