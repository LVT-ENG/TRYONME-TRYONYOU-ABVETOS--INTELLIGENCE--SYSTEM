"""
Git utilities for fetching commit information
"""
import subprocess
import json
from datetime import datetime

def get_commits(limit=20, branch=None):
    """
    Get git commit information from the repository
    
    Args:
        limit (int): Number of commits to retrieve (default: 20)
        branch (str): Specific branch to get commits from (default: current branch)
    
    Returns:
        list: List of commit dictionaries with hash, author, date, and message
    """
    try:
        # Build git log command
        cmd = [
            'git', 'log',
            f'-{limit}',
            '--pretty=format:%H|%an|%ae|%at|%s',
            '--no-merges'
        ]
        
        if branch:
            cmd.append(branch)
        
        # Execute git log command
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=True
        )
        
        # Parse the output
        commits = []
        for line in result.stdout.strip().split('\n'):
            if line:
                parts = line.split('|')
                if len(parts) == 5:
                    hash_val, author, email, timestamp, message = parts
                    commits.append({
                        'hash': hash_val,
                        'short_hash': hash_val[:7],
                        'author': author,
                        'email': email,
                        'date': datetime.fromtimestamp(int(timestamp)).isoformat(),
                        'message': message,
                        'timestamp': int(timestamp)
                    })
        
        return {
            'success': True,
            'commits': commits,
            'count': len(commits)
        }
    
    except subprocess.CalledProcessError as e:
        return {
            'success': False,
            'error': f'Git command failed: {e.stderr}',
            'commits': []
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'commits': []
        }

def get_commit_stats():
    """
    Get repository statistics
    
    Returns:
        dict: Statistics about the repository
    """
    try:
        # Get total commit count
        total_commits = subprocess.run(
            ['git', 'rev-list', '--count', 'HEAD'],
            capture_output=True,
            text=True,
            check=True
        ).stdout.strip()
        
        # Get current branch
        current_branch = subprocess.run(
            ['git', 'rev-parse', '--abbrev-ref', 'HEAD'],
            capture_output=True,
            text=True,
            check=True
        ).stdout.strip()
        
        # Get list of contributors
        contributors = subprocess.run(
            ['git', 'log', '--format=%an', '--no-merges'],
            capture_output=True,
            text=True,
            check=True
        ).stdout.strip().split('\n')
        
        unique_contributors = len(set(contributors))
        
        return {
            'success': True,
            'stats': {
                'total_commits': int(total_commits),
                'current_branch': current_branch,
                'contributors': unique_contributors
            }
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'stats': {}
        }
