import json
import subprocess
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
        """Retrieve all git commits"""
        try:
            import os
            # Try to determine the repository root directory
            # First try the Vercel task directory, then LAMBDA_TASK_ROOT (AWS), then current directory
            repo_paths = [
                os.environ.get('LAMBDA_TASK_ROOT', '/var/task'),
                os.getcwd(),
                os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            ]
            
            result = None
            for repo_path in repo_paths:
                if os.path.exists(repo_path):
                    result = subprocess.run(
                        ['git', 'log', '--all', '--pretty=format:%H|%an|%ae|%ad|%s', '--date=iso'],
                        capture_output=True,
                        text=True,
                        cwd=repo_path
                    )
                    if result.returncode == 0:
                        break
            
            if result is None or result.returncode != 0:
                raise Exception(f"Git command failed: {result.stderr if result else 'No valid repository path found'}")
            
            # Parse the output into structured data
            commits = []
            for line in result.stdout.strip().split('\n'):
                if line:
                    parts = line.split('|', 4)
                    if len(parts) == 5:
                        commits.append({
                            'hash': parts[0],
                            'author': parts[1],
                            'email': parts[2],
                            'date': parts[3],
                            'message': parts[4]
                        })
            
            response = {
                'success': True,
                'total': len(commits),
                'commits': commits
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
                'message': 'Failed to retrieve git commits'
            }
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode('utf-8'))

# Local test
if __name__ == "__main__":
    import os
    try:
        # Test git log command
        result = subprocess.run(
            ['git', 'log', '--all', '--pretty=format:%H|%an|%ae|%ad|%s', '--date=iso', '-10'],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            commits = []
            for line in result.stdout.strip().split('\n'):
                if line:
                    parts = line.split('|', 4)
                    if len(parts) == 5:
                        commits.append({
                            'hash': parts[0][:8],  # Short hash for display
                            'author': parts[1],
                            'email': parts[2],
                            'date': parts[3],
                            'message': parts[4]
                        })
            
            print("✅ Git commits retrieved successfully!")
            print(f"Total commits: {len(commits)}")
            print("\nFirst few commits:")
            print(json.dumps(commits[:3], indent=2, ensure_ascii=False))
        else:
            print(f"❌ Error: {result.stderr}")
    except Exception as e:
        print(f"❌ Exception: {e}")
