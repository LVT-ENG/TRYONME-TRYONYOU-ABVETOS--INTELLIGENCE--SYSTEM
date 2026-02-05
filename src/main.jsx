import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/Main.css'
import VirtualFitting from './pages/VirtualFitting.jsx'
import LafayettePilot from './pages/LafayettePilot.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LafayettePilot />} />
        <Route path="/legacy-fitting" element={<VirtualFitting />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
