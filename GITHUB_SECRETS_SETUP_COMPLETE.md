# Configuración de GitHub Secrets - TRYONYOU

## 📋 Secrets Requeridos

Para que el CI/CD funcione correctamente, debes configurar los siguientes secrets en GitHub:

### 1. Acceder a GitHub Secrets

1. Ve a: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/settings/secrets/actions
2. Click en "New repository secret" para cada uno

### 2. Secrets a Configurar

#### VERCEL_TOKEN
```
Valor: honFF3IgaU6dZZMSmISvlBfD
```
**Descripción**: Token de autenticación de Vercel

#### VERCEL_PROJECT_ID
```
Valor: prj_Wkq9QCEn6RJr3x7AMpNkbIZ2Z2AX4
```
**Descripción**: ID del proyecto en Vercel

#### VERCEL_TEAM_ID
```
Valor: team_SDhjSkxLVE7oJ3S5KPkwG9uC
```
**Descripción**: ID del equipo/organización en Vercel

#### GITHUB_TOKEN
```
Valor: (Ya configurado automáticamente por GitHub Actions)
```
**Descripción**: Token de GitHub (no necesitas configurarlo manualmente)

#### TELEGRAM_BOT_TOKEN
```
Valor: [Tu token del bot @abvet_deploy_bot]
```
**Descripción**: Token del bot de Telegram para notificaciones

#### TELEGRAM_CHAT_ID
```
Valor: [@Antoniopalohondo]
```
**Descripción**: ID del chat donde se enviarán las notificaciones

## 🚀 Verificación

Una vez configurados todos los secrets:

1. Haz un commit y push a la rama `main`
2. Ve a: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions
3. Verifica que el workflow "Deploy to Vercel" se ejecute correctamente
4. Recibirás una notificación en Telegram con el enlace del deploy

## 🔧 Troubleshooting

### Error: "The specified scope does not exist"
- Verifica que `VERCEL_TEAM_ID` esté correctamente configurado
- Asegúrate de que el token tenga permisos para acceder al equipo

### Error: "Project not found"
- Verifica que `VERCEL_PROJECT_ID` sea correcto
- Confirma que el proyecto existe en tu cuenta de Vercel

### No recibo notificaciones en Telegram
- Verifica que `TELEGRAM_BOT_TOKEN` sea válido
- Confirma que `TELEGRAM_CHAT_ID` sea correcto
- Asegúrate de haber iniciado una conversación con el bot

## 📝 Notas Importantes

- **NUNCA** subas estos tokens directamente al código
- Usa siempre GitHub Secrets para información sensible
- Rota los tokens periódicamente por seguridad
- El workflow se ejecuta automáticamente en cada push a `main`
