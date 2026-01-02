# Git Commit Retrieval System

This system provides functionality to retrieve and display git commit information from the repository through both backend API endpoints and frontend React components.

## Backend Implementation

### Python Module: `core/git_utils.py`

Provides two main functions:

#### `get_commits(limit=20, branch=None)`
Retrieves git commit history from the repository.

**Parameters:**
- `limit` (int): Number of commits to retrieve (default: 20)
- `branch` (str): Specific branch to get commits from (default: current branch)

**Returns:**
```json
{
  "success": true,
  "commits": [
    {
      "hash": "full_commit_hash",
      "short_hash": "7_char_hash",
      "author": "Author Name",
      "email": "author@email.com",
      "date": "2026-01-02T13:27:52",
      "message": "Commit message",
      "timestamp": 1767360472
    }
  ],
  "count": 2
}
```

#### `get_commit_stats()`
Retrieves repository statistics.

**Returns:**
```json
{
  "success": true,
  "stats": {
    "total_commits": 123,
    "current_branch": "main",
    "contributors": 5
  }
}
```

### API Endpoints

The endpoints are integrated into `master_brain.py`:

#### `GET /api/commits?limit=20&branch=main`
Fetches commit history.

**Query Parameters:**
- `limit` (optional): Number of commits to retrieve
- `branch` (optional): Branch name to get commits from

#### `GET /api/commit-stats`
Fetches repository statistics.

### Testing the API

Use the test server for standalone testing:

```bash
# Start the test server
python3 test_git_server.py

# Test commits endpoint
curl http://localhost:8080/api/commits?limit=5

# Test stats endpoint
curl http://localhost:8080/api/commit-stats
```

## Frontend Implementation

### React Component: `src/components/CommitHistory.jsx`

A ready-to-use React component for displaying commit history.

**Usage:**
```jsx
import CommitHistory from './components/CommitHistory';

function MyPage() {
  return (
    <div>
      <h1>Project Activity</h1>
      <CommitHistory limit={20} showStats={true} />
    </div>
  );
}
```

**Props:**
- `limit` (number): Number of commits to display (default: 20)
- `showStats` (boolean): Whether to show repository statistics (default: true)

### JavaScript Utilities: `src/utils/gitApi.js`

Helper functions for fetching git data:

#### `fetchCommits(limit, branch)`
Fetches commits from the API.

```javascript
import { fetchCommits } from '../utils/gitApi';

const data = await fetchCommits(10);
console.log(data.commits);
```

#### `fetchCommitStats()`
Fetches repository statistics.

```javascript
import { fetchCommitStats } from '../utils/gitApi';

const data = await fetchCommitStats();
console.log(data.stats);
```

#### `formatCommitDate(isoDate)`
Formats ISO date strings to human-readable relative time.

```javascript
import { formatCommitDate } from '../utils/gitApi';

const formatted = formatCommitDate('2026-01-02T13:27:52');
// Returns: "5 minutes ago" or "2 hours ago" etc.
```

## Integration Examples

### Adding to Existing Pages

```jsx
import CommitHistory from '../components/CommitHistory';

export default function InvestorsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1>Development Progress</h1>
      <CommitHistory limit={10} showStats={true} />
    </div>
  );
}
```

### Custom Implementation

```jsx
import { useState, useEffect } from 'react';
import { fetchCommits } from '../utils/gitApi';

export default function CustomCommitDisplay() {
  const [commits, setCommits] = useState([]);
  
  useEffect(() => {
    fetchCommits(5).then(data => {
      setCommits(data.commits);
    });
  }, []);
  
  return (
    <div>
      {commits.map(commit => (
        <div key={commit.hash}>
          <strong>{commit.short_hash}</strong>: {commit.message}
        </div>
      ))}
    </div>
  );
}
```

## Environment Configuration

Set the API URL in your `.env` file:

```
VITE_API_URL=http://localhost:8080
```

For production:
```
VITE_API_URL=https://your-api-domain.com
```

## Features

- ✅ Retrieve git commit history with customizable limit
- ✅ Filter commits by branch
- ✅ Get repository statistics (total commits, current branch, contributors)
- ✅ Beautiful, responsive UI component with glassmorphism design
- ✅ Relative time formatting ("5 minutes ago", "2 days ago")
- ✅ Error handling and loading states
- ✅ CORS-enabled API endpoints
- ✅ Standalone test server for development

## Styling

The component uses Tailwind CSS with the project's color scheme:
- Gold accent: `#C5A46D`
- Dark background: `#0A0A0A`
- Smoke: `#1A1A2E`

The design features:
- Glassmorphism effects
- Gradient backgrounds
- Smooth hover transitions
- Responsive grid layout for statistics
- Monospace font for commit hashes

## Notes

- The backend requires git to be installed and accessible
- Commits are retrieved from the current repository location
- The `--no-merges` flag is used to exclude merge commits for cleaner history
- All dates are converted to ISO format for consistent parsing
- The component gracefully handles API errors with user-friendly messages
