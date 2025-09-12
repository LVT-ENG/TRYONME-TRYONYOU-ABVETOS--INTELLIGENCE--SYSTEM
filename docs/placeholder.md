# Documentación - TryOnMe / TryOnYou - AVBETOS Intelligence System

Bienvenido a la documentación completa del sistema TryOnMe / TryOnYou - AVBETOS Intelligence System.

## 📚 Índice de Documentación

### Para Usuarios
- [**Guía de Usuario**](./USER_GUIDE.md) - Cómo usar el sistema TryOnMe / TryOnYou
- [**Preguntas Frecuentes**](./USER_GUIDE.md#❓-preguntas-frecuentes) - Respuestas a dudas comunes

### Para Desarrolladores
- [**Guía de Desarrollo**](./DEVELOPER_GUIDE.md) - Configuración y desarrollo
- [**Documentación de API**](./API.md) - Endpoints y especificaciones técnicas
- [**Troubleshooting**](./TROUBLESHOOTING.md) - Resolución de problemas comunes
- [**Commits Convencionales**](../CONVENTIONAL_COMMITS.md) - Estándares de commits

### Observabilidad y Operaciones
- [**Observabilidad**](../OBSERVABILITY.md) - Monitoring, métricas y alertas
- [**Despliegue Google Apps Script**](../google-apps-script/DEPLOYMENT.md) - Guía de despliegue

### Guías Específicas
- [**Contribución**](../.github/CONTRIBUTING.md) - Cómo contribuir al proyecto
- [**Instrucciones Copilot**](../.github/copilot-instructions.md) - Configuración del proyecto
- [**Seguridad**](../SECURITY.md) - Política de seguridad

## 🚀 Inicio Rápido

### Para Usuarios Nuevos
1. Lee la [Guía de Usuario](./USER_GUIDE.md)
2. Revisa las [Preguntas Frecuentes](./USER_GUIDE.md#❓-preguntas-frecuentes)
3. Contacta soporte si necesitas ayuda

### Para Desarrolladores Nuevos
1. Configura tu entorno con la [Guía de Desarrollo](./DEVELOPER_GUIDE.md)
2. Revisa la [Documentación de API](./API.md)
3. Lee los estándares de [Commits Convencionales](../CONVENTIONAL_COMMITS.md)

### Para DevOps/SRE
1. Configura [Observabilidad](../OBSERVABILITY.md)
2. Revisa las métricas de health en `/health.php`
3. Configura alertas y monitoring

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Google Apps    │    │   PHP Backend   │
│   (tryonu-app)  │◄──►│     Script      │◄──►│   (health.php)  │
│                 │    │    (motor.gs)   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Sentry      │    │  Google Sheets  │    │  MySQL/MongoDB  │
│  (observability)│    │   (prototipo)   │    │   (producción)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔍 Componentes Principales

### Frontend (React + Vite)
- **Ubicación**: `/tryonu-app/`
- **Funcionalidades**: Interfaz de usuario, autenticación biométrica, try-on virtual
- **Tecnologías**: React, Framer Motion, Sentry

### Motor de Recomendaciones (Google Apps Script)
- **Ubicación**: `/google-apps-script/`
- **Funcionalidades**: Algoritmos de recomendación, análisis de preferencias
- **Base de datos**: Google Sheets (prototipo)

### Backend APIs (PHP + Node.js)
- **Archivos**: `health.php`, `mailer.php`, `index.js`
- **Funcionalidades**: Health checks, emails, APIs biométricas
- **Base de datos**: MySQL/MongoDB (producción)

### Observabilidad
- **Sentry**: Monitoring de errores y performance
- **Métricas personalizadas**: Conversion rate, try-on sessions
- **Alertas**: GitHub Issues, Slack, Email

## 📊 Estado del Proyecto

### ✅ Implementado
- [x] Motor de recomendaciones (Google Apps Script)
- [x] Interfaz web React con Sentry
- [x] Sistema de contacto y health checks
- [x] Observabilidad completa con alertas 24/7
- [x] Verificación biométrica (mock)
- [x] Sistema de pagos (mock)
- [x] CI/CD con GitHub Actions y Vercel
- [x] Documentación completa

### 🔄 En Desarrollo
- [ ] Integración con APIs de moda reales
- [ ] Dashboard de administración
- [ ] Implementación biométrica de producción
- [ ] Escalabilidad de base de datos
- [ ] Aplicación móvil nativa

### 🎯 Próximas Funcionalidades
- [ ] Machine Learning avanzado para recomendaciones
- [ ] Realidad aumentada mejorada
- [ ] Integración con marcas de moda
- [ ] Sistema de análisis de tendencias
- [ ] Marketplace integrado

## 🔐 Seguridad y Cumplimiento

- **Encriptación**: AES-256 para datos biométricos
- **Autenticación**: Multi-factor con biometría
- **GDPR**: Cumplimiento completo con derecho al olvido
- **Patentes**: Sistema protegido por patente internacional
- **Auditorías**: Revisiones de seguridad regulares

## 📞 Soporte y Contacto

### Para Usuarios
- 💬 Chat en vivo 24/7 en la aplicación
- 📧 soporte@tryonme.com
- 📱 WhatsApp: +34 xxx xxx xxx

### Para Desarrolladores
- 🔧 Canal #development en Slack
- 📝 GitHub Issues para bugs y features
- 📖 Esta documentación

### Para Partners/Empresas
- 🤝 business@tryonme.com
- 📞 +34 xxx xxx xxx (horario comercial)

---

**Última actualización**: Enero 2025  
**Versión de la documentación**: v1.0.0  
**Mantenido por**: Equipo TryOnMe

> 💡 **Tip**: Esta documentación se actualiza automáticamente. Si encuentras algo desactualizado, por favor crea un issue en GitHub.
