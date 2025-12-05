import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Brands from './pages/Brands'
import Avatar3D from './pages/Avatar3D'
import Wardrobe from './pages/Wardrobe'
import Showroom from './pages/Showroom'
import Recommendation from './pages/Recommendation'
import IntelligentSystem from './pages/IntelligentSystem'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/avatar" element={<Avatar3D />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/showroom" element={<Showroom />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/ai-system" element={<IntelligentSystem />} />
      </Route>
    </Routes>
  )
}
