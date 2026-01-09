import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'wouter'

const RegisterPartner = () => {
  const [, navigate] = useLocation()
  const [formData, setFormData] = useState({
    storeName: '',
    contactName: '',
    email: '',
    position: 'Manager',
    interest: 'Full Pilot'
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder for submission logic
    console.log('Partner Registration:', formData)
    alert('Request Received. We will contact you shortly.')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-[#141619] text-[#EEF0F3] font-sans flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#141619]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1
            className="text-2xl font-bold tracking-widest text-[#D3B26A] cursor-pointer"
            onClick={() => navigate('/')}
          >
            TRYONYOU
          </h1>
          <div className="text-sm text-gray-400 hidden md:block">B2B Partner Program</div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#D3B26A] mb-4">
                Unlock the Future of Retail
              </h1>
              <p className="text-xl text-gray-300">
                Join the exclusive pilot program for luxury retailers.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#1A1D21] p-8 rounded-2xl border border-gray-800 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#D3B26A] mb-2">Store Name</label>
                  <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#141619] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D3B26A] focus:ring-1 focus:ring-[#D3B26A] transition-colors"
                    placeholder="e.g. Galeries Lafayette"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#D3B26A] mb-2">Contact Name</label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#141619] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D3B26A] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#D3B26A] mb-2">Position</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full bg-[#141619] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D3B26A] transition-colors"
                    >
                      <option>Owner</option>
                      <option>Manager</option>
                      <option>Buyer</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#D3B26A] mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#141619] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D3B26A] transition-colors"
                    placeholder="contact@store.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#D3B26A] mb-2">Program Interest</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D3B26A] transition-colors"
                  >
                    <option>Full Pilot (Scanner + Wardrobe)</option>
                    <option>Magic Mirror Demo Only</option>
                    <option>Investor Information</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#D3B26A] hover:bg-[#b09050] text-[#141619] font-bold py-4 rounded-lg shadow-lg transition-all uppercase tracking-wider"
                >
                  Request Access
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 bg-[#141619] text-center">
        <p className="text-gray-500 text-sm">
          TRYONYOU B2B © 2024 | Exclusive Partner Program
        </p>
      </footer>
    </div>
  )
}

export default RegisterPartner
