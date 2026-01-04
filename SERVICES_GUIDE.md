# TRYONYOU Services Guide

## Sistema de Monitoreo y Biometría

Este documento describe los servicios refactorizados de monitoreo de sistema y procesamiento biométrico.

### 📊 System Monitoring Service (`system_service.py`)

Servicio para obtener métricas reales del sistema sin simulaciones aleatorias.

#### Funciones Principales

##### `get_system_metrics()`
Obtiene métricas reales de CPU y memoria del sistema.

```python
from system_service import get_system_metrics

metrics = get_system_metrics()
# Returns: {"cpu": float, "memory": float}
# Example: {"cpu": 5.2, "memory": 45.8}
```

**Comportamiento:**
- Usa `psutil` para obtener métricas reales
- Retorna `0.0` si el hardware no es accesible
- No usa valores aleatorios (random)
- CPU medido con `interval=0.1` para lecturas confiables

##### `get_status()`
Función legacy para compatibilidad con código existente.

```python
from system_service import get_status

status = get_status()
# Returns: {"status": "online|error", "cpu_usage": float, "memory_usage": float}
```

### 🔬 Biometric Service (`biometric_service.py`)

Servicio para procesar datos biométricos con seguimiento de progreso real.

#### Funciones Principales

##### `process_biometric_scan(raw_data, on_progress_update=None)`
Procesa datos biométricos con seguimiento de progreso en 3 fases.

```python
from biometric_service import process_biometric_scan

def progress_callback(percent):
    print(f"Progreso: {percent}%")

data = {
    "height": 175,      # cm
    "shoulders": 45,    # cm
    "chest": 95         # cm
}

result = process_biometric_scan(data, on_progress_update=progress_callback)
# Progress callback will be called with: 25, 75, 100
# Returns: {"result": "success", "data": {...}}
```

**Arquitectura de Progreso:**
1. **Fase 1 (25%)**: Análisis inicial de datos
2. **Fase 2 (75%)**: Procesamiento de datos biométricos
3. **Fase 3 (100%)**: Finalización

**Comportamiento:**
- No usa valores aleatorios
- Progreso determinístico (siempre 25%, 75%, 100%)
- Validación de entrada (None, tipo incorrecto)
- Callback opcional para notificaciones de progreso

##### `scan_biometric_data(user_id="default")`
Realiza un escaneo biométrico completo con logging de progreso.

```python
from biometric_service import scan_biometric_data

result = scan_biometric_data(user_id="user_123")
# Returns: {
#   "result": "success",
#   "data": {...},
#   "progress_log": [25, 75, 100],
#   "user_id": "user_123"
# }
```

### 🎯 Arquitectura Técnica

#### Principios de Diseño

1. **Sin Simulaciones Aleatorias**: Todo el código elimina el uso de `random.uniform()`, `random.randint()`, etc.
2. **Valores Estables**: Cuando el hardware no está disponible, se retorna `0.0` o `None` en lugar de valores aleatorios
3. **Progreso Real**: El sistema de biometría usa callbacks para reportar progreso real basado en fases de procesamiento
4. **Preparación para Producción**: La arquitectura está lista para integrar sensores reales cuando estén disponibles

#### Dependencias

```txt
psutil>=5.9.8  # Para métricas del sistema
```

### 📝 Ejemplos de Uso

#### Ejemplo 1: Monitoreo Básico
```python
from system_service import get_system_metrics

metrics = get_system_metrics()
print(f"CPU: {metrics['cpu']}%")
print(f"Memory: {metrics['memory']}%")
```

#### Ejemplo 2: Escaneo Biométrico con Progreso
```python
from biometric_service import process_biometric_scan

progress_log = []

def track_progress(percent):
    progress_log.append(percent)
    print(f"→ {percent}%")

biometric_data = {
    "height": 180,
    "shoulders": 48,
    "chest": 98
}

result = process_biometric_scan(biometric_data, track_progress)

if result["result"] == "success":
    print(f"Datos procesados: {result['data']}")
    print(f"Progreso registrado: {progress_log}")
```

#### Ejemplo 3: Integración en API
```python
from system_service import get_system_metrics
from biometric_service import process_biometric_scan

def api_health_check():
    """Endpoint para verificar salud del sistema"""
    return get_system_metrics()

def api_process_scan(request):
    """Endpoint para procesar escaneo biométrico"""
    biometric_data = request.json
    
    # Notificar progreso via websocket
    def notify_client(percent):
        websocket.send({"progress": percent})
    
    result = process_biometric_scan(
        biometric_data, 
        on_progress_update=notify_client
    )
    
    return result
```

### 🔒 Seguridad

- ✅ Sin vulnerabilidades detectadas por CodeQL
- ✅ Validación de entrada apropiada
- ✅ Manejo de errores robusto
- ✅ Sin uso de valores aleatorios que podrían enmascarar problemas

### 🚀 Testing

Los servicios pueden probarse ejecutando directamente:

```bash
# Test system monitoring
python3 system_service.py

# Test biometric service
python3 biometric_service.py
```

### 📚 Referencias

- **Issue Original**: Refactorización de Servicios de Monitoreo y Biometría (Python)
- **Arquitectura**: Elimina `random` y prepara para datos reales
- **Compatibilidad**: Mantiene funciones legacy para código existente
