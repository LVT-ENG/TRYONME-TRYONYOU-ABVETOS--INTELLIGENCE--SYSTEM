# API Documentation - TryOnMe

## 🔍 Información General

**Base URL**: `https://api.example.com` _(placeholder estándar; reemplazar por dominio real al desplegar)_  

> **En producción/staging** (cuando se activen los entornos):
> - Staging: `https://api-stg.tryonyou.app`
> - Producción: `https://api.tryonyou.app`
>
> También puedes configurar un `BASE_URL` por entorno:
>
> ```bash
> # .env
> BASE_URL=https://api.example.com
> ```
> Y sobreescribir en CI/CD:
> ```bash
> # Staging
> BASE_URL=https://api-stg.tryonyou.app
> # Producción
> BASE_URL=https://api.tryonyou.app
> ```