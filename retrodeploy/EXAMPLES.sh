#!/usr/bin/env bash

# TRYONYOU RETRODEPLOY - Usage Examples
# This script demonstrates common usage patterns

set -e

echo "════════════════════════════════════════════════════════════════"
echo "  TRYONYOU RETRODEPLOY - Usage Examples"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Example 1: Basic Manual Deployment
echo "Example 1: Basic Manual Deployment"
echo "-----------------------------------"
echo "$ cd retrodeploy"
echo "$ ./deploy.sh"
echo ""

# Example 2: Using Makefile for Complete Pipeline
echo "Example 2: Using Makefile for Complete Pipeline"
echo "------------------------------------------------"
echo "$ cd retrodeploy"
echo "$ make all"
echo ""
echo "This runs: install → build → commit → deploy → verify"
echo ""

# Example 3: Build Only
echo "Example 3: Build Only"
echo "---------------------"
echo "$ cd retrodeploy"
echo "$ make build"
echo ""

# Example 4: Deploy to Vercel
echo "Example 4: Deploy to Vercel"
echo "----------------------------"
echo "$ cd retrodeploy"
echo "$ make deploy"
echo ""
echo "Note: Requires VERCEL_TOKEN in .env"
echo ""

# Example 5: Start Auto-Deployment Watcher
echo "Example 5: Start Auto-Deployment Watcher"
echo "-----------------------------------------"
echo "$ cd retrodeploy"
echo "$ node watcher.js"
echo ""
echo "Or run in background:"
echo "$ nohup node watcher.js > watcher.out 2>&1 &"
echo ""

# Example 6: Add ZIP Files for Deployment
echo "Example 6: Add ZIP Files for Deployment"
echo "----------------------------------------"
echo "$ cp mypackage.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/"
echo ""
echo "If watcher is running, deployment starts automatically."
echo "Otherwise, run: cd retrodeploy && ./deploy.sh"
echo ""

# Example 7: Check Deployment Status
echo "Example 7: Check Deployment Status"
echo "-----------------------------------"
echo "$ cd retrodeploy"
echo "$ make status"
echo ""

# Example 8: Verify Site is Live
echo "Example 8: Verify Site is Live"
echo "-------------------------------"
echo "$ cd retrodeploy"
echo "$ make verify"
echo ""
echo "Expected output: ✅ tryonyou.app is responding (HTTP 200)"
echo ""

# Example 9: View Deployment Logs
echo "Example 9: View Deployment Logs"
echo "--------------------------------"
echo "$ cd retrodeploy"
echo "$ tail -f retrodeploy.log"
echo ""
echo "Or view last 20 lines:"
echo "$ tail -20 retrodeploy.log"
echo ""

# Example 10: Clean Build Artifacts
echo "Example 10: Clean Build Artifacts"
echo "----------------------------------"
echo "$ cd retrodeploy"
echo "$ make clean"
echo ""

# Example 11: Initial Setup
echo "Example 11: Initial Setup"
echo "-------------------------"
echo "1. Configure environment:"
echo "   $ cd retrodeploy"
echo "   $ cp .env.example .env"
echo "   $ nano .env  # Add your tokens"
echo ""
echo "2. Install dependencies:"
echo "   $ make install"
echo ""
echo "3. Test build:"
echo "   $ make build"
echo ""
echo "4. Deploy:"
echo "   $ make deploy"
echo ""

# Example 12: Monitoring with Watcher
echo "Example 12: Monitoring with Watcher"
echo "------------------------------------"
echo "Terminal 1 - Start watcher:"
echo "$ cd retrodeploy && node watcher.js"
echo ""
echo "Terminal 2 - View logs in real-time:"
echo "$ cd retrodeploy && tail -f retrodeploy.log"
echo ""
echo "Terminal 3 - Add ZIP files:"
echo "$ cp newpackage.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/"
echo ""

echo "════════════════════════════════════════════════════════════════"
echo "  For more information, see:"
echo "  - retrodeploy/README.txt"
echo "  - retrodeploy/DOCUMENTATION.md"
echo "════════════════════════════════════════════════════════════════"
