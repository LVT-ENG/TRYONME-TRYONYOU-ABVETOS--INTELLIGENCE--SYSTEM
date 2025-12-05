import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-brand">TRYONYOU</p>
          <p className="footer-tagline">LIVE 'IT – Where beauty lives in movement</p>
          <p className="footer-copy">© {new Date().getFullYear()} TRYONYOU. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

