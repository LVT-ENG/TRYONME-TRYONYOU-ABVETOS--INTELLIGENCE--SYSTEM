#!/usr/bin/env python3
"""
AGENT_39_EXECUTION - Backup Protocol Executor
Orchestrates complete backup operations for TRYONYOU Intelligence System
"""

import sys
import os
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from core.backup_manager import BackupManager


def execute_backup_protocol():
    """Execute the AGENT_39 backup protocol"""
    print("🤖 AGENT 39 - BACKUP MANAGER ACTIVATED")
    print("Protocol: AGENT_39_EXECUTION")
    print("Objective: Complete archival and salvaguarda of TRYONYOU Intelligence System\n")
    
    try:
        backup_manager = BackupManager()
        report = backup_manager.execute_full_backup()
        
        print("\n🎯 MISSION ACCOMPLISHED")
        print("All data has been secured with cryptographic verification.")
        print(f"Backup Report: {backup_manager.session_backup_dir}/backup_report_{backup_manager.current_session}.json")
        
        return 0
    except Exception as e:
        print(f"\n❌ BACKUP PROTOCOL FAILED: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    exit_code = execute_backup_protocol()
    sys.exit(exit_code)
