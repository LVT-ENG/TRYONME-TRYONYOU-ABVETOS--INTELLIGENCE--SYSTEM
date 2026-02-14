# Environment Variables Setup

This document explains how to configure the required environment variables for the TRYONYOU system.

## Overview

The application uses environment variables to securely store sensitive information like API keys and tokens. These values should **never** be committed to version control.

## Setup Instructions

### For Development

1. Copy the example file to create your local environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace the placeholder values with your actual credentials:
   - `GOOGLE_API_KEY`: Your Google API key for AI services
   - `VITE_GOOGLE_API_KEY`: Same Google API key (for Vite build)
   - `AUDIT_STATUS`: Set to `SUCCESS_GOLD_EDITION` or as needed

### For Production

1. Copy the production example file:
   ```bash
   cp .env.production.example .env.production
   ```

2. Edit `.env.production` and configure all required variables:
   - `VITE_VERCEL_TOKEN`: Your Vercel deployment token
   - `VITE_GOOGLE_API_KEY`: Google API key for production
   - `VITE_PILOT_MODE`: Set to `LAFAYETTE_ACTIVE` or as needed
   - `VITE_ENVIRONMENT`: Should be `production`
   - `PORKBUN_API_KEY`: Your Porkbun DNS API key
   - `TELEGRAM_BOT_TOKEN`: Your Telegram bot token for notifications
   - `TELEGRAM_CHAT_ID`: Your Telegram chat ID for notifications

## Required Environment Variables

### Development Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Google API key for AI services | Yes |
| `VITE_GOOGLE_API_KEY` | Google API key (Vite build) | Yes |
| `AUDIT_STATUS` | Audit status flag | Yes |

### Production Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_VERCEL_TOKEN` | Vercel deployment authentication | Yes |
| `VITE_GOOGLE_API_KEY` | Google API key for production | Yes |
| `VITE_PILOT_MODE` | Pilot mode configuration | Yes |
| `VITE_ENVIRONMENT` | Environment identifier | Yes |
| `PORKBUN_API_KEY` | Porkbun DNS API key | Yes |
| `TELEGRAM_BOT_TOKEN` | Telegram bot authentication | Yes |
| `TELEGRAM_CHAT_ID` | Telegram chat for notifications | Yes |

## Security Best Practices

1. **Never commit** `.env` or `.env.production` files to git
2. **Use `.env.example`** files as templates (with placeholder values only)
3. **Rotate credentials** regularly, especially if exposed
4. **Use different credentials** for development and production
5. **Store production secrets** in your deployment platform (Vercel, Netlify, etc.)

## Deployment Platforms

### Vercel

Set environment variables in the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable from `.env.production.example`

### Netlify

Set environment variables in the Netlify dashboard:
1. Go to Site settings → Build & deploy → Environment
2. Add each variable from `.env.production.example`

## Troubleshooting

- If you see errors about missing environment variables, ensure you've created the `.env` file
- Make sure variable names match exactly (case-sensitive)
- Restart your development server after changing environment variables
- For Vite variables to be exposed to client code, they must start with `VITE_`

## Getting API Keys

### Google API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable required APIs (e.g., Gemini AI)
4. Create credentials → API Key

### Vercel Token
1. Go to Vercel dashboard → Settings → Tokens
2. Create a new token with appropriate scope

### Telegram Bot
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Create a new bot
3. Copy the bot token provided

### Porkbun API Key
1. Log in to your Porkbun account
2. Go to Account → API Access
3. Generate a new API key
