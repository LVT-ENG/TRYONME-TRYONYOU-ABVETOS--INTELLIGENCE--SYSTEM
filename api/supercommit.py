import json
import subprocess
import os
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """Handle preflight CORS requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        """Retrieve supercommit script information and status"""
        try:
            # Try to determine the repository root directory
            repo_paths = [
                os.environ.get('LAMBDA_TASK_ROOT', '/var/task'),
                os.getcwd(),
                os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            ]
            
            repo_path = None
            for path in repo_paths:
                if os.path.exists(path):
                    repo_path = path
                    break
            
            if not repo_path:
                raise Exception("No valid repository path found")
            
            # Get git status
            git_status = subprocess.run(
                ['git', 'status', '--short'],
                capture_output=True,
                text=True,
                cwd=repo_path
            )
            
            # Get current branch
            git_branch = subprocess.run(
                ['git', 'branch', '--show-current'],
                capture_output=True,
                text=True,
                cwd=repo_path
            )
            
            # Get last commit info
            last_commit = subprocess.run(
                ['git', 'log', '-1', '--pretty=format:%H|%an|%ad|%s', '--date=iso'],
                capture_output=True,
                text=True,
                cwd=repo_path
            )
            
            # Parse last commit
            last_commit_info = None
            if last_commit.returncode == 0 and last_commit.stdout:
                parts = last_commit.stdout.split('|', 3)
                if len(parts) == 4:
                    last_commit_info = {
                        'hash': parts[0][:8],
                        'author': parts[1],
                        'date': parts[2],
                        'message': parts[3]
                    }
            
            # Check for available supercommit scripts
            supercommit_scripts = []
            script_files = ['supercommit.sh', 'SUPERCOMMIT_MAX.sh', 'TRYONYOU_SUPERCOMMIT_MAX.sh']
            
            for script in script_files:
                script_path = os.path.join(repo_path, script)
                if os.path.exists(script_path):
                    # Get file size
                    file_size = os.path.getsize(script_path)
                    # Get file modification time
                    mtime = os.path.getmtime(script_path)
                    
                    supercommit_scripts.append({
                        'name': script,
                        'path': script,
                        'exists': True,
                        'size': file_size,
                        'modified': mtime
                    })
            
            # Count uncommitted changes
            uncommitted_files = len([line for line in git_status.stdout.strip().splitlines() if line])
            
            response = {
                'success': True,
                'status': {
                    'branch': git_branch.stdout.strip() if git_branch.returncode == 0 else 'unknown',
                    'uncommitted_changes': uncommitted_files if git_status.returncode == 0 else 0,
                    'has_changes': bool(git_status.stdout.strip()) if git_status.returncode == 0 else False,
                    'last_commit': last_commit_info
                },
                'scripts': supercommit_scripts,
                'total_scripts': len(supercommit_scripts),
                'description': 'SuperCommit MAX is an automated deployment and commit system for TRYONYOU-ABVETOS'
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response, indent=2).encode('utf-8'))
            
        except Exception as e:
            error_response = {
                'success': False,
                'error': str(e),
                'message': 'Failed to retrieve supercommit information'
            }
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode('utf-8'))

# Local test
if __name__ == "__main__":
    try:
        import time
        
        # Get git status
        git_status = subprocess.run(
            ['git', 'status', '--short'],
            capture_output=True,
            text=True
        )
        
        git_branch = subprocess.run(
            ['git', 'branch', '--show-current'],
            capture_output=True,
            text=True
        )
        
        print("✅ Supercommit API test successful!")
        print(f"Current branch: {git_branch.stdout.strip()}")
        print(f"Uncommitted changes: {len([line for line in git_status.stdout.strip().splitlines() if line])}")
        
        # Check for scripts
        script_files = ['supercommit.sh', 'SUPERCOMMIT_MAX.sh', 'TRYONYOU_SUPERCOMMIT_MAX.sh']
        print("\nAvailable supercommit scripts:")
        for script in script_files:
            if os.path.exists(script):
                print(f"  ✓ {script}")
            else:
                print(f"  ✗ {script} (not found)")
                
    except Exception as e:
        print(f"❌ Exception: {e}")
