import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8">GALERIES LAFAYETTE</h1>
        <p className="text-xl mb-8">Virtual Try-On Experience</p>
        <Link to="/demo" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
          Start Experience <ArrowRight className="inline ml-2" />
        </Link>
      </div>
    </div>
  )
}
export default Home
