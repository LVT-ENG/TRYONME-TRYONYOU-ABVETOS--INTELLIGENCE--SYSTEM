#!/bin/bash

# Master Deployment Script

echo "Starting deployment..."

# Set environment variables
export VERCEL_TOKEN="w9VudSWcygLxH3gy9MDa3SWK"
export VERCEL_PROJECT_ID="prj_b10SYuxdQTitsIOzBGMXJLqozB7N"
export VERCEL_ORG_ID="team_7aBcDeFg12345"
export TELEGRAM_BOT_TOKEN="8283479848:AAElqDLqzbJsoQts-OEdiL29EdyOw9kq1cc"
export TELEGRAM_CHAT_ID="@abvet_deploy_bot"

# Deploy to Vercel
vercel --prod

# Send notification to Telegram
MESSAGE="Deployment successful! 🚀"
URL="https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage"
curl -s -X POST $URL -d chat_id=$TELEGRAM_CHAT_ID -d text="$MESSAGE"

echo "Deployment finished."

