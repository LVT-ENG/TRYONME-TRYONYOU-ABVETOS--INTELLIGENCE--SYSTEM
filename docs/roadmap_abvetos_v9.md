# ROADMAP: CENTRO DE MANDO ABVETOS V9
**Proyecto:** TRYONYOU – Piloto Lafayette (Divineo Edition)
**Objetivo:** Despliegue del "Circuito Cerrado" (Frontend, Backend, Pagos y Analítica)
**Duración:** 8 Semanas divididas en 3 Sprints Operativos

---

## 🏃 SPRINT 1: Preparación Técnica y Búnker Maestro (Semanas 1-2)
**Objetivo:** Consolidar la infraestructura técnica, eliminar residuos y levantar el entorno de producción.

*   **Limpieza de Arquitectura:** Ejecutar el script `supercommit_max.sh` para limpiar dependencias conflictivas (eliminar Next.js) y estandarizar a Vite 7.1.2 + React 18.3.1 [3, 5]. **(Asignado a: Jules)**
*   **Despliegue del Frontend:** Montar el componente `VirtualMirror.jsx` (Espejo Mágico) en el entorno de staging asegurando la paleta estética "Divineo V7" [3]. **(Asignado a: Agente 70)**
*   **Mapeo de Activos:** Mover y organizar los assets visuales (Vestido Rojo, mascota Pau) a la estructura de carpetas correcta (`/public/assets/`) [3]. **(Asignado a: Agente 70)**
*   **Integración del Búnker (Backend):** Desplegar el script maestro `main.py` (FastAPI) configurando al Agente Jules y al Agente 70 con las credenciales de producción y los endpoints listos [3, 6]. **(Asignado a: Jules)**

---

## 🏃 SPRINT 2: Instalación In-Store e Integración O2O (Semanas 3-4)
**Objetivo:** Conectar el mundo digital con el físico (Offline-to-Online) en Galeries Lafayette.

*   **Hardware:** Instalar el espejo físico Divineo en la tienda piloto de Lafayette [4]. **(Asignado a: Equipo de Campo)**
*   **Configuración de Automatización:** Activar el flujo del Agente Jules para que lea correos vía IMAP, clasifique intenciones y envíe automáticamente el "Match Perfecto" y el link al avatar 3D [4, 7]. **(Asignado a: Jules)**
*   **Gestión de Reservas VIP:** Habilitar la generación de códigos QR (Agente PAU) para el acceso sin esperas a probadores [8]. **(Asignado a: Jules)**
*   **Onboarding:** Capacitar al personal de Lafayette en el uso del sistema y realizar pruebas de la pasarela ABVET con clientes beta [4]. **(Asignado a: Equipo de Campo)**

---

## 🏃 SPRINT 3: Medición, Optimización y Escalabilidad (Semanas 5-8)
**Objetivo:** Monitorizar desde el Dashboard de ABVETOS, recopilar métricas de éxito y preparar la expansión.

*   **Supervisión y KPIs:** Recopilar los datos de la base de datos `Divineo_Leads_DB` a través del Dashboard para validar el objetivo principal: reducción de devoluciones al 5% y confirmación del ROI del 20-30% para el retailer [4, 9]. **(Asignado a: Jules)**
*   **Ajuste del Motor (Agente 70):** Optimizar la "Lógica de Elasticidad" y los algoritmos de recomendación biométrica basándose en el feedback en vivo de la tienda [4]. **(Asignado a: Jules)**
*   **Reporte de Inteligencia:** Generar el reporte automatizado de resultados (métricas de uso, impacto de la IA emocional) para la directiva de Lafayette [4]. **(Asignado a: Jules)**
*   **Preparación para Escalado:** Planificar la migración futura del CRM (de Google Sheets a PostgreSQL) y la implementación de caché (Redis) para absorber el tráfico nacional [2]. **(Asignado a: Jules)**
