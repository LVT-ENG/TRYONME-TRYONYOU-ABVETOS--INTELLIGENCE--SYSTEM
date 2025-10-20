# ABVETOS Dashboard - Quick Integration Guide

This is the modular, component-based version of the ABVETOS Dashboard designed for easy integration into the TRYONYOU web application.

## 📁 Structure

```
apps/web/src/dashboard/abvetos-dashboard/
├── Dashboard.jsx                 # Main dashboard component
├── components/
│   ├── MetricsCard.jsx          # Reusable metrics card
│   ├── DeployList.jsx           # Deployment list component
│   ├── GitHubActionsStatus.jsx  # GitHub Actions workflow status
│   └── SystemHealthGraph.jsx    # System health metrics grid
├── styles/
│   └── dashboard.css            # Dashboard-specific styles
└── index.js                     # Entry point & exports
```

## 🚀 Usage

### Import the Dashboard

```jsx
import Dashboard from './apps/web/src/dashboard/abvetos-dashboard'

function App() {
  return <Dashboard />
}
```

### Import Individual Components

```jsx
import { 
  MetricsCard, 
  DeployList, 
  GitHubActionsStatus,
  SystemHealthGraph 
} from './apps/web/src/dashboard/abvetos-dashboard'
```

## 🔧 Integration Steps

1. **Copy this directory** to your React app's component structure
2. **Import the Dashboard component** where needed
3. **Include the CSS** in your build process
4. **Configure environment variables** (optional, uses defaults)

## 📝 Environment Variables (Optional)

```bash
VITE_GITHUB_REPO=LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
VITE_PRODUCTION_URL=https://tryonyou.app
```

## 🎨 Customization

### Styles
Edit `styles/dashboard.css` to customize colors, layout, and responsive breakpoints.

### Components
Each component is standalone and can be used independently:

- **MetricsCard**: Display system metrics with icons and progress bars
- **DeployList**: Show deployment history with status indicators
- **GitHubActionsStatus**: Display GitHub workflow runs
- **SystemHealthGraph**: Grid layout for multiple metrics

### Data Sources
The dashboard fetches data from:
- **GitHub Actions API**: Workflow runs and build status
- **Simulated Metrics**: CPU, Memory, Requests, Uptime (replace with real data)

## 🔗 Dependencies

Required packages (already in the main dashboard package.json):
- `react` ^19.1.0
- `react-dom` ^19.1.0
- `lucide-react` ^0.510.0

## 📚 Full Documentation

For complete documentation, see:
- [README_ABVETOS_DASHBOARD_SYNC.md](../../../../README_ABVETOS_DASHBOARD_SYNC.md)
- [dashboard/abvetos-dashboard/README.md](../../../../dashboard/abvetos-dashboard/README.md)

## 🔄 Deployment

This modular structure integrates with:
- **GitHub Actions**: `.github/workflows/abvetos-dashboard-deploy.yml`
- **Deployment Script**: `scripts/deploy_abvetos_dashboard.sh`
- **Vercel**: Automatic deployment on push to main

## ✅ Features

- ✅ Real-time GitHub Actions integration
- ✅ Auto-refresh every 30 seconds
- ✅ Responsive design (mobile/desktop)
- ✅ Status indicators (success/failed/in-progress)
- ✅ Direct links to GitHub and production
- ✅ Modular component architecture
- ✅ Standalone CSS (no conflicts)

---

**Version**: 1.0.0  
**Last Updated**: October 20, 2025  
**Status**: ✅ Ready for Integration
