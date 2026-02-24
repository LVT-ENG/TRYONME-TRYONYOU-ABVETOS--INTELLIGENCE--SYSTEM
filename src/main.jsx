/**
 * main.jsx — Application entry point.
 *
 * Mounts the React application into the DOM element with id="root"
 * (defined in index.html) using React 19 concurrent rendering.
 * StrictMode is enabled to surface potential issues during development.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot enables React 19 concurrent features.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
