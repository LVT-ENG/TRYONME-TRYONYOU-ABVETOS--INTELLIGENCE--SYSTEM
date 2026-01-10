# Git Commits API

## Overview
This API endpoint retrieves all git commits from the repository history.

## Endpoint
- **URL**: `/api/commits`
- **Method**: `GET`
- **Content-Type**: `application/json`

## Response Format

### Success Response (200)
```json
{
  "success": true,
  "total": 2,
  "commits": [
    {
      "hash": "eb7c28c8a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      "author": "John Doe",
      "email": "john.doe@example.com",
      "date": "2026-01-10 19:58:57 +0000",
      "message": "Initial commit"
    }
  ]
}
```

### Error Response (500)
```json
{
  "success": false,
  "error": "Error message",
  "message": "Failed to retrieve git commits"
}
```

## Usage Examples

### Using fetch in JavaScript
```javascript
fetch('/api/commits')
  .then(response => response.json())
  .then(data => {
    console.log(`Total commits: ${data.total}`);
    data.commits.forEach(commit => {
      console.log(`${commit.hash.substring(0, 7)} - ${commit.message}`);
    });
  })
  .catch(error => console.error('Error:', error));
```

### Using curl
```bash
curl https://your-domain.vercel.app/api/commits
```

### Using Python requests
```python
import requests

response = requests.get('https://your-domain.vercel.app/api/commits')
data = response.json()

if data['success']:
    print(f"Total commits: {data['total']}")
    for commit in data['commits']:
        print(f"{commit['hash'][:7]} - {commit['message']}")
```

## Deployment
This endpoint is designed to work with Vercel's serverless functions. It will be automatically deployed when the code is pushed to the repository.

## Local Testing
To test the endpoint locally:
```bash
python3 api/commits.py
```

## Notes
- The endpoint uses git log under the hood to retrieve commit history
- Commits are returned in chronological order (newest first)
- CORS is enabled for cross-origin requests
- The endpoint works with Vercel's serverless function format
