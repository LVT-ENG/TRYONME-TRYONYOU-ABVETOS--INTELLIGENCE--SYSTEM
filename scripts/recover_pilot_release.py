import os
import subprocess
import sys

def run_command(command, description):
    """Executes a shell command with Jules-style logging."""
    print(f"🤖 JULES: {description}...")
    try:
        # Run command and capture output
        result = subprocess.run(
            command, 
            shell=True, 
            check=True, 
            text=True, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE
        )
        print(f"✅ Success: {command.split()[0]}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error executing {description}:")
        print(f"   Command: {command}")
        print(f"   Stderr: {e.stderr}")
        return False

def main():
    print("🚀 JULES AGENT: Starting Manual Pilot Release Recovery")
    print("=====================================================")

    # 1. Ensure Documentation Directory Exists
    if not os.path.exists("docs/arquitectura_empresa"):
        try:
            os.makedirs("docs/arquitectura_empresa")
            print("✅ JULES: Created 'docs/arquitectura_empresa'")
        except OSError as e:
            print(f"❌ JULES: Failed to create directory: {e}")
            sys.exit(1)
    else:
        print("ℹ️  JULES: Docs directory already exists.")

    # 2. Stage All Changes (Including jules_pilot_session.py)
    if not run_command("git add .", "Staging all Pilot files"):
        sys.exit(1)

    # 3. Commit with Release Message
    commit_msg = "FEAT: DIVINEO V7 PILOT RELEASE - INSTANT PUBLICATION READY"
    commit_cmd = f'git commit -m "{commit_msg}"'
    
    print(f"🤖 JULES: Committing release artifact...")
    try:
        subprocess.run(commit_cmd, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print("✅ JULES: Commit successful.")
    except subprocess.CalledProcessError:
        print("⚠️ JULES: Nothing to commit (clean working tree). Proceeding to push...")

    # 4. Push to Production (Main)
    print("🤖 JULES: Pushing to origin main...")
    push_success = run_command("git push origin main", "Pushing to Production")

    if push_success:
        print("\n✅✅✅ PILOT RELEASE DEPLOYED SUCCESSFULLY ✅✅✅")
    else:
        print("\n❌ Push failed. You may need to check permissions.")

if __name__ == "__main__":
    main()
