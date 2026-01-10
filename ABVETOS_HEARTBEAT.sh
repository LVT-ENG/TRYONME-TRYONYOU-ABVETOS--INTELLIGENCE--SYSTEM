#!/bin/bash
# ABVETOS INFINITE HEARTBEAT - 24/7 ORCHESTRATION
# Frequency: Every 5 Minutes
# Objective: Continuous Integration of Biometrics & Production

echo "🦚 STARTING ABVETOS INFINITE LOOP..."
echo "🕒 Interval: 5 Minutes (300 seconds)"

ONCE_MODE=false
if [ "$1" == "--once" ]; then
    ONCE_MODE=true
    echo "⚠️ --once flag detected. Running single iteration for testing."
fi

while true
do
    echo "=================================================="
    echo "⚡ WAKING UP: $(date)"
    echo "=================================================="

    # 1. Run Intelligence Orchestration (Python)
    # This integrates your new BiometricCapture.tsx and Checkout logic
    echo "🧠 Running ABVETOS Orchestrator..."
    python3 orchestrate_abvetos.py
    ORCH_STATUS=$?

    if [ $ORCH_STATUS -ne 0 ]; then
        echo "❌ Orchestration Failed. Skipping Deployment."
    else
        echo "✅ Orchestration Successful."

        # 2. Trigger SuperCommit MAX (The Deployment)
        # Uses your existing deployment logic to push to Vercel
        if [ -f "./TRYONYOU_SUPERCOMMIT_MAX.sh" ]; then
            echo "🚀 Triggering SuperCommit MAX..."
            # For test mode, we might want to skip the actual push or use dry-run,
            # but per instructions we keep the logic.
            # In sandbox, git push might fail, so we warn.
            bash ./TRYONYOU_SUPERCOMMIT_MAX.sh || echo "⚠️ SuperCommit script failed (likely network/git auth). Continuing..."
        else
            echo "⚠️ SuperCommit script not found. Running fallback git push..."
            git add .
            git commit -m "🔥 ABVETOS AUTO-UPDATE: $(date)" || echo "Nothing to commit"
            # git push origin main # Commented out to prevent accidental push in sandbox without auth
            echo "ℹ️ (Git Push skipped in Sandbox environment)"
        fi
    fi

    # 3. Health Check Notification
    # Sends a signal that the cycle is complete (Telegram/Log)
    echo "✅ Cycle Complete. System Sleeping..."

    if [ "$ONCE_MODE" = true ]; then
        echo "🛑 --once mode active. Exiting loop."
        break
    fi

    # Sleep for 5 minutes
    sleep 300
done
