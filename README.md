<<<<<<< HEAD
// Placeholder content for docs/README.md
=======
# AvBet Biometrics (demo)

API mínima de ejemplo para matrícula y verificación biométrica (voz + iris, **mock**).

## Scripts
- `npm run start` – inicia servidor en `PORT` (por defecto 3000)
- `npm run dev` – inicia con `--watch`
- `npm test` – prueba rápida placeholder

## Endpoints
- `GET /health`
- `POST /enroll` `{ userId, voiceSample, irisTemplate }`
- `POST /verify` `{ userId, voiceSample, irisTemplate }`
- `POST /payments/intent` `{ amount, currency?, metadata? }`

> **Aviso**: Este código es un demo *no apto para producción* y no realiza verificación biométrica real.
>>>>>>> 25aefc0 (update: cambios de branding y diseño)
