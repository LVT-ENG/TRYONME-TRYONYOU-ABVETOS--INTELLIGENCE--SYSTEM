import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Share2, Printer } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import LookSheet from '../components/demo/LookSheet'
import texts from '../data/texts.json'

const LookSheetPage = () => {
  const { isDark } = useTheme()

  const handleExport = (format) => {
    alert(`Exporting Look Sheet as ${format}...`)
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Hero Section */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-b from-tryonyou-black/80 via-tryonyou-black/60 to-tryonyou-black' 
              : 'bg-gradient-to-b from-white/60 via-white/40 to-[#FAFAFA]'
          }`}></div>
          <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-orange-500/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <FileText size={18} className={isDark ? 'text-amber-400' : 'text-amber-500'} />
              <span className={`font-semibold ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>Look Sheet Export</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              Look Sheet Export
            </h1>
            
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-white/80' : 'text-anthracite/80'}`}>
              Générer un récapitulatif de looks pour le client ou l'enseigne.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Export Actions */}
      <section className={`py-6 ${isDark ? 'bg-tryonyou-smoke/30' : 'bg-gray-100'}`}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => handleExport('PDF')}
              className="btn-primary flex items-center gap-2"
            >
              <Download size={18} />
              Export PDF
            </button>
            <button 
              onClick={() => handleExport('Image')}
              className="btn-metallic flex items-center gap-2"
            >
              <Share2 size={18} />
              Share
            </button>
            <button 
              onClick={() => window.print()}
              className="btn-metallic flex items-center gap-2"
            >
              <Printer size={18} />
              Print
            </button>
          </div>
        </div>
      </section>

      {/* Look Sheet Content */}
      <section className="section-container">
        <LookSheet />
      </section>
    </div>
  )
}

export default LookSheetPage
