## ✅ Checklist de validación antes del merge
- [ ] CI verde (lint, types, tests, build)
- [ ] Despliegue Vercel exitoso (**AdbetOrchestrator**)
- [ ] Health check 200 OK (**AdbetOrchestrator** / **HealthMonitor30Minutos**)
- [ ] Observabilidad activa (Sentry si se configuró)
- [ ] `Closes #49` visible en la descripción del PR y cierre automático garantizado (**EnsureCloseISO49OnPR53Merge**)

_Workflows activos:_ **AutoUpdatePRDescription**, **EnsureCloseISO49OnPR53Merge**, **AdbetOrchestrator**, **HealthMonitor30Minutos**
