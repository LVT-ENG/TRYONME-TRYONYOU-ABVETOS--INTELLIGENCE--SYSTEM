#!/usr/bin/env python3
"""
TRYONYOU Emergency Deployment Repair Script (v2.1.0)
Safe, secure deployment repair with proper environment variable management.

This script:
1. Validates environment variables (NO hardcoded secrets)
2. Checks for critical components
3. Performs safe dependency cleanup
4. Rebuilds and optionally deploys the project

Usage:
    python repair_deployment.py [--deploy]
    
Environment Variables Required:
    GOOGLE_API_KEY: Google AI API key for vision features (optional for builds)
    VERCEL_TOKEN: Vercel deployment token (required for --deploy)
"""

import os
import subprocess
import sys
from pathlib import Path
from typing import List, Tuple


class DeploymentRepairer:
    """Handles safe deployment repair operations."""
    
    def __init__(self, project_root: Path = None):
        self.project_root = project_root or Path(__file__).parent
        self.errors: List[str] = []
        self.warnings: List[str] = []
        
    def log(self, message: str, level: str = "INFO"):
        """Log a message with appropriate formatting."""
        symbols = {
            "INFO": "ℹ️",
            "SUCCESS": "✅",
            "ERROR": "❌",
            "WARNING": "⚠️",
            "REPAIR": "⚡"
        }
        symbol = symbols.get(level, "•")
        print(f"{symbol} [{level}] {message}")
    
    def check_environment_variables(self, deploy: bool = False) -> bool:
        """
        Check for required environment variables without exposing them.
        
        Args:
            deploy: Whether deployment is intended (requires VERCEL_TOKEN)
            
        Returns:
            bool: True if all required variables are present
        """
        self.log("Checking environment variables...", "INFO")
        
        # Check for Google API key (warn if missing, but don't fail)
        if not os.getenv("GOOGLE_API_KEY"):
            self.warnings.append(
                "GOOGLE_API_KEY not set. Vision/AI features may not work in production."
            )
            self.log(
                "GOOGLE_API_KEY not found in environment. "
                "Set this in .env file or environment for AI features.",
                "WARNING"
            )
        else:
            self.log("GOOGLE_API_KEY found ✓", "SUCCESS")
        
        # Check for Vercel token if deployment is requested
        if deploy:
            if not os.getenv("VERCEL_TOKEN"):
                self.errors.append("VERCEL_TOKEN required for deployment but not set")
                self.log(
                    "VERCEL_TOKEN not found. Cannot deploy without it.",
                    "ERROR"
                )
                return False
            self.log("VERCEL_TOKEN found ✓", "SUCCESS")
        
        return True
    
    def verify_critical_components(self) -> bool:
        """
        Verify that critical project components exist.
        
        Returns:
            bool: True if all critical components exist
        """
        self.log("Verifying critical components...", "INFO")
        
        critical_paths = [
            "package.json",
            "src/App.jsx",
            "src/main.jsx",
            "src/pages/Wardrobe.jsx",
            "vite.config.js",
        ]
        
        all_exist = True
        for path in critical_paths:
            full_path = self.project_root / path
            if not full_path.exists():
                self.errors.append(f"Missing critical component: {path}")
                self.log(f"Critical component missing: {path}", "ERROR")
                all_exist = False
            else:
                self.log(f"Found: {path} ✓", "SUCCESS")
        
        return all_exist
    
    def run_command(self, command: str, description: str) -> Tuple[bool, str]:
        """
        Run a shell command safely with error handling.
        
        Args:
            command: The command to run
            description: Human-readable description of what the command does
            
        Returns:
            Tuple of (success: bool, output: str)
        """
        self.log(f"Running: {description}", "INFO")
        
        try:
            result = subprocess.run(
                command,
                shell=True,
                check=True,
                capture_output=True,
                text=True,
                cwd=self.project_root
            )
            self.log(f"Completed: {description} ✓", "SUCCESS")
            return True, result.stdout
        except subprocess.CalledProcessError as e:
            error_msg = f"Failed: {description}\n{e.stderr}"
            self.errors.append(error_msg)
            self.log(error_msg, "ERROR")
            return False, e.stderr
    
    def cleanup_dependencies(self) -> bool:
        """
        Safely clean up corrupted dependencies and build artifacts.
        
        Returns:
            bool: True if cleanup was successful
        """
        self.log("Starting deep cleanup of dependencies...", "REPAIR")
        
        paths_to_remove = [
            "node_modules",
            "package-lock.json",
            ".next",
            "dist",
            ".vite"
        ]
        
        for path in paths_to_remove:
            full_path = self.project_root / path
            if full_path.exists():
                self.log(f"Removing: {path}", "INFO")
                success, _ = self.run_command(
                    f"rm -rf {path}",
                    f"Remove {path}"
                )
                if not success:
                    return False
        
        self.log("Cleanup completed ✓", "SUCCESS")
        return True
    
    def install_dependencies(self) -> bool:
        """
        Install project dependencies with legacy peer deps flag.
        
        Returns:
            bool: True if installation was successful
        """
        return self.run_command(
            "npm install --legacy-peer-deps",
            "Install dependencies"
        )[0]
    
    def build_project(self) -> bool:
        """
        Build the project for production.
        
        Returns:
            bool: True if build was successful
        """
        return self.run_command(
            "npm run build",
            "Build project"
        )[0]
    
    def deploy_to_vercel(self) -> bool:
        """
        Deploy the project to Vercel production.
        
        Returns:
            bool: True if deployment was successful
        """
        return self.run_command(
            "npx vercel --prod --yes",
            "Deploy to Vercel"
        )[0]
    
    def repair(self, deploy: bool = False) -> bool:
        """
        Execute the full repair process.
        
        Args:
            deploy: Whether to deploy after building
            
        Returns:
            bool: True if repair was successful
        """
        self.log("INITIATING EMERGENCY REPAIR (ULTIMATUM v2.1.0)", "REPAIR")
        
        # Step 1: Validate environment
        if not self.check_environment_variables(deploy):
            return False
        
        # Step 2: Verify critical components
        if not self.verify_critical_components():
            self.log("Aborting: Critical components missing", "ERROR")
            return False
        
        # Step 3: Cleanup
        if not self.cleanup_dependencies():
            self.log("Cleanup failed, but continuing...", "WARNING")
        
        # Step 4: Install dependencies
        if not self.install_dependencies():
            self.log("Failed to install dependencies", "ERROR")
            return False
        
        # Step 5: Build
        if not self.build_project():
            self.log("Build failed", "ERROR")
            return False
        
        # Step 6: Deploy (optional)
        if deploy:
            if not self.deploy_to_vercel():
                self.log("Deployment failed", "ERROR")
                return False
        
        # Report summary
        self.print_summary()
        
        return len(self.errors) == 0
    
    def print_summary(self):
        """Print a summary of the repair process."""
        print("\n" + "="*60)
        self.log("REPAIR SUMMARY", "INFO")
        print("="*60)
        
        if self.warnings:
            print("\n⚠️  WARNINGS:")
            for warning in self.warnings:
                print(f"  • {warning}")
        
        if self.errors:
            print("\n❌ ERRORS:")
            for error in self.errors:
                print(f"  • {error}")
        else:
            print("\n✅ SUCCESS: All operations completed successfully!")
        
        print("="*60 + "\n")


def main():
    """Main entry point for the repair script."""
    # Check for --deploy flag
    deploy = "--deploy" in sys.argv
    
    # Load .env file if it exists
    env_file = Path(__file__).parent / ".env"
    if env_file.exists():
        print("📋 Loading environment variables from .env file...")
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    os.environ[key.strip()] = value.strip()
    else:
        print("⚠️  No .env file found. Using environment variables only.")
        print("💡 Tip: Copy .env.example to .env and fill in your values.")
    
    # Create repairer and run
    repairer = DeploymentRepairer()
    success = repairer.repair(deploy=deploy)
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
