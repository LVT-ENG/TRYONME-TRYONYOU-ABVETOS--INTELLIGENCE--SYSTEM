#!/usr/bin/env python3
"""
Guardian Monitor - "Taking care of the web"
Monitors the TryOnYou backend health and system resources.
"""

import sys
import time
import logging
import platform
import shutil
import os
import requests
from datetime import datetime

# Configuration
CHECK_INTERVAL = 60  # seconds
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000/status")
LOG_FILE = "guardian.log"
DISK_THRESHOLD_PERCENT = 90

# Setup Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - GUARDIAN - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("guardian")

def check_backend_health(url):
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            logger.info(f"✅ Backend is ONLINE: {url} | Response: {response.json()}")
            return True
        else:
            logger.error(f"⚠️ Backend returned status {response.status_code}: {url}")
            return False
    except requests.exceptions.ConnectionError:
        logger.error(f"❌ Backend connection failed: {url} is unreachable.")
        return False
    except Exception as e:
        logger.error(f"❌ Error checking backend: {e}")
        return False

def check_system_health():
    # Disk Usage
    total, used, free = shutil.disk_usage("/")
    percent_used = (used / total) * 100
    if percent_used > DISK_THRESHOLD_PERCENT:
        logger.warning(f"⚠️ High Disk Usage: {percent_used:.2f}% used.")
    else:
        logger.info(f"Disk Usage: {percent_used:.2f}% (OK)")

    # Memory Usage (if psutil is available)
    try:
        import psutil
        mem = psutil.virtual_memory()
        if mem.percent > 90:
            logger.warning(f"⚠️ High Memory Usage: {mem.percent}% used.")
        else:
            logger.info(f"Memory Usage: {mem.percent}% (OK)")
    except ImportError:
        logger.info("psutil not installed, skipping detailed memory check.")

def main():
    logger.info("🛡️ Guardian Monitor starting...")
    logger.info(f"Monitoring URL: {BACKEND_URL}")
    logger.info(f"System: {platform.system()} {platform.release()}")

    try:
        while True:
            logger.info("--- Performing Health Checks ---")

            # 1. Check Backend
            check_backend_health(BACKEND_URL)

            # 2. Check System
            check_system_health()

            logger.info(f"Sleeping for {CHECK_INTERVAL} seconds...")
            time.sleep(CHECK_INTERVAL)

    except KeyboardInterrupt:
        logger.info("Guardian Monitor stopping by user request.")
    except Exception as e:
        logger.critical(f"Guardian Monitor crashed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
