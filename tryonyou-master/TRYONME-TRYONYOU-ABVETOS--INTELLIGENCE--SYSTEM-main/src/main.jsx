import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import './styles/index.css'
import './styles/lazy-loading.css'
import { initPerformanceOptimizations } from './utils/prefetch'

// Initialize performance optimizations
initPerformanceOptimizations()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
