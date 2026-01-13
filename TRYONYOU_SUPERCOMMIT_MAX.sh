#!/bin/bash

# TRYONYOU SUPERCOMMIT MAX
# Deployment Automation Script for Jules V7

echo "🤖 JULES V7: Initiating Automatic Deployment Sequence..."

git add .
git commit -m "🚀 SuperCommit: Automatic Deployment via Jules V7"
git push origin main

echo "✅ JULES V7: Code pushed to GitHub. Vercel deployment triggered."
echo "⏳ Waiting for Vercel Cron to activate /api/jules (15 min cycle)."
