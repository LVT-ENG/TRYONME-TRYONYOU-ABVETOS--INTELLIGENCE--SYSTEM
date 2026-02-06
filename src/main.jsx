import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/Main.css'
import LafayettePilot from './pages/LafayettePilot.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LafayettePilot />} />
        <Route path="/pilot/lafayette-v7" element={<LafayettePilot />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
