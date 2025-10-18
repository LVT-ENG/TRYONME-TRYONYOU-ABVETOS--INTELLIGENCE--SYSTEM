# EPIC Monitor Dashboard

Real-time system orchestration and API status monitoring for the TRYONYOU Intelligence System.

## 📁 Directory Structure

```
EPIC_MONITOR_DASHBOARD/
├── src/dashboard/
│   ├── index.html           # Main dashboard HTML interface
│   ├── dashboard.css        # Dashboard styling (matches project theme)
│   ├── dashboard.js         # Dashboard logic and real-time updates
│   └── apiStatus.json       # API status configuration and metrics
├── .github/workflows/
│   └── system-orchestration-report.yml  # Automated reporting workflow
├── reports/                 # Generated orchestration reports (auto-created)
└── README.md               # This file
```

## 🎯 Features

### Real-Time Monitoring
- **System Metrics Overview**: Track overall uptime, response times, success rates, and security scores
- **API Status Cards**: Monitor all 17+ API endpoints with real-time status indicators
- **Agent Performance**: Track the 50 intelligent agents across 7 functional blocks
- **Auto-Refresh**: Dashboard automatically refreshes every 30 seconds

### Interactive Filtering
- **Category Filter**: Filter APIs by service category (Core, Payment, Community, etc.)
- **Status Filter**: Show only operational, degraded, outage, or maintenance APIs
- **Dynamic Updates**: Filters update the view in real-time

### Visual Design
- **Premium Theme**: Matches the TRYONYOU luxury design system
- **Status Indicators**: Color-coded status with pulsing animations
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Premium dark mode with gold and peacock accents

## 🚀 Quick Start

### Local Development

1. **Open the Dashboard**
   ```bash
   cd EPIC_MONITOR_DASHBOARD/src/dashboard
   # Open index.html in your browser
   # Or use a local server:
   python -m http.server 8080
   # Then visit: http://localhost:8080
   ```

2. **Update API Status**
   Edit `apiStatus.json` to update metrics and status information.

### Automated Reporting

The `system-orchestration-report.yml` workflow automatically:
- Runs every 6 hours (or can be triggered manually)
- Analyzes API status data
- Generates markdown reports
- Commits reports to the `reports/` directory
- Creates GitHub Actions summary

**Manual Trigger:**
1. Go to GitHub Actions
2. Select "System Orchestration Report" workflow
3. Click "Run workflow"

## 📊 API Categories

### Core Services (3 APIs)
- 3D Avatar Generation API
- Garment Comparison Engine
- Pau Emotional Recommender

### Payment Services (1 API)
- ABVET Biometric Payment

### Community Services (1 API)
- AutoDonate Solidarity System

### External Integrations (3 APIs)
- Shopify Integration API
- Amazon Marketplace API
- EPCT/WIPO Patent API

### AI Services (1 API)
- Fashion Trends Intelligence

### Agent Management (7 APIs)
- 50 Agents Orchestration Hub
- Deployment & Production Block (13 agents)
- Style, Avatars & Modulation Block (6 agents)
- Business & Strategy Block (6 agents)
- External Automation Block (5 agents)
- Video & Visual Block (4 agents)
- Live It - Style & Collection Block (11 agents)
- Private Management Block (5 agents)

## 🎨 Design System

The dashboard uses the TRYONYOU premium design system:

### Colors
- **Luxury Gold**: `#D3B26A` - Primary accent color
- **Peacock Deep**: `#0E6B6B` - Secondary accent color
- **Anthracite Dark**: `#141619` - Background color
- **Bone Light**: `#F5EFE6` - Text color

### Status Colors
- **Operational**: `#10b981` (Green)
- **Degraded**: `#f59e0b` (Amber)
- **Outage**: `#ef4444` (Red)
- **Maintenance**: `#6366f1` (Indigo)

## 🔧 Configuration

### API Status Configuration (`apiStatus.json`)

The JSON file contains:
- **System metadata**: Name, version, last update timestamp
- **API endpoints**: Status, uptime, response times, categories
- **Agent statistics**: Total agents, efficiency, task completion
- **System metrics**: Overall performance indicators

### Workflow Configuration

Edit `.github/workflows/system-orchestration-report.yml` to:
- Change report frequency (default: every 6 hours)
- Modify report format
- Add notifications or integrations

## 📈 Metrics Explained

### System Metrics
- **Overall Uptime**: Percentage of time the system is operational (target: >99%)
- **Average Response Time**: Mean API response time in milliseconds (target: <250ms)
- **Success Rate**: Percentage of successful API requests (target: >99%)
- **Security Score**: Overall security rating (target: >98)

### Agent Performance
- **Total Agents**: Total number of intelligent agents (50)
- **Active Agents**: Currently running agents
- **Average Efficiency**: Mean performance across all agents (target: >90%)
- **Success Rate**: Percentage of successfully completed tasks (target: >98%)

### API Endpoint Metrics
- **Uptime**: Percentage of time the endpoint is available
- **Response Time**: Average response time for the endpoint
- **Status**: Current operational status (operational/degraded/outage/maintenance)
- **Category**: Service category classification

## 🔗 Integration

### With Main Application
The dashboard can be integrated into the main TRYONYOU application:
```html
<iframe src="/EPIC_MONITOR_DASHBOARD/src/dashboard/index.html" 
        width="100%" 
        height="800px" 
        frameborder="0">
</iframe>
```

### API Endpoints
To connect to live data, update the `loadApiStatus()` function in `dashboard.js`:
```javascript
async function loadApiStatus() {
  const response = await fetch('/api/system/status');
  apiData = await response.json();
  // ...
}
```

## 🛠️ Development

### File Structure

**index.html**
- Main HTML structure
- Semantic sections for metrics, filters, API cards, and agent stats
- Links to CSS and JS files

**dashboard.css**
- Complete styling system
- Responsive design
- Animations and transitions
- Matches TRYONYOU design system

**dashboard.js**
- Data loading and parsing
- Dynamic rendering
- Filter logic
- Auto-refresh functionality

**apiStatus.json**
- API configuration
- Current status data
- Performance metrics
- Agent statistics

### Adding New APIs

To add a new API endpoint to the dashboard:

1. Edit `apiStatus.json`:
```json
{
  "id": "new-api",
  "name": "New API Service",
  "endpoint": "/api/new/endpoint",
  "status": "operational",
  "uptime": 99.5,
  "responseTime": 200,
  "lastCheck": "2025-10-15T01:00:00.000Z",
  "category": "Core Services"
}
```

2. The dashboard will automatically include it on next refresh.

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop**: Multi-column grid layout with all features
- **Tablet**: Adjusted grid spacing and font sizes
- **Mobile**: Single-column layout, stacked cards

## 🔒 Security

- No sensitive data is exposed in the dashboard
- API endpoints are references only (not live credentials)
- Status data is read-only
- Workflow has minimal required permissions

## 🎯 Future Enhancements

Potential improvements:
- [ ] Real-time WebSocket updates
- [ ] Historical data charts and graphs
- [ ] Alert notifications for degraded services
- [ ] Detailed error logs and debugging info
- [ ] Export reports to PDF/CSV
- [ ] Integration with monitoring tools (Datadog, New Relic, etc.)
- [ ] Custom alert thresholds
- [ ] Service dependency visualization

## 📞 Support

For issues or questions about the EPIC Monitor Dashboard:
- Open an issue in the main repository
- Contact the development team
- Check the GitHub Actions logs for workflow issues

---

**Built with ❤️ by the TRYONYOU Development Team**

*Part of the TRYONYOU Intelligence System - Revolutionizing Fashion Through AI and Innovation*
