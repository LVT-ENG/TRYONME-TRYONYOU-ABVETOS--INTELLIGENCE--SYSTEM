# Security Policy

## Supported Versions

Esta tabla muestra las versiones del sistema TryOnMe/TryOnYou que reciben actualizaciones de seguridad.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| 0.x.x   | :x:                |

## Reporting a Vulnerability

### Cómo Reportar una Vulnerabilidad de Seguridad

Si descubres una vulnerabilidad de seguridad en el sistema AVBETOS Intelligence System, por favor sigue estos pasos:

1. **NO** abras un issue público en GitHub
2. Envía un email a la dirección de seguridad: `security@avbetos.com`
3. Incluye la siguiente información:
   - Descripción detallada de la vulnerabilidad
   - Pasos para reproducir el problema
   - Impacto potencial
   - Versión afectada del sistema

### Qué Esperar

- **Confirmación**: Recibirás una confirmación de recepción en 24-48 horas
- **Evaluación**: Evaluaremos la vulnerabilidad en 3-5 días laborables
- **Actualizaciones**: Te mantendremos informado del progreso cada 7 días
- **Resolución**: Si se confirma la vulnerabilidad, trabajaremos en una solución prioritaria

### Proceso de Divulgación

1. **Reporte confidencial** → Evaluación del equipo de seguridad
2. **Confirmación** → Desarrollo de parche de seguridad
3. **Testing** → Validación de la solución
4. **Release** → Publicación de la corrección
5. **Divulgación** → Anuncio público coordinado (opcional)

### Alcance de Seguridad

Esta política cubre:
- ✅ Google Apps Script Motor (`/google-apps-script/`)
- ✅ Interfaz web principal (`index.html`, `main.js`, etc.)
- ✅ Sistema de contacto (`mailer.php`)
- ✅ AVBETOS Package (`/legacy/AVBETOS_repo_package/`)
- ✅ Infraestructura de deployment y CI/CD

### Exclusiones

No consideramos vulnerabilidades:
- ❌ Problemas en dependencias que no afecten directamente al sistema
- ❌ Issues de usabilidad o UX que no comprometan la seguridad
- ❌ Divulgación de información ya pública en el repositorio

### Reconocimiento

Los investigadores que reporten vulnerabilidades válidas serán reconocidos públicamente (si lo desean) una vez que la vulnerabilidad sea corregida.

---

**Última actualización**: Septiembre 2025  
**Versión de la política**: 1.0
