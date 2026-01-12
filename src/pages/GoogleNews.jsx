import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const GoogleNews = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#141619] text-[#EEF0F3] font-sans p-6 md:p-12">
      <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.button
          variants={ITEM_VARIANTS}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#D3B26A] hover:text-[#b09050] transition mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </motion.button>

        <motion.header variants={ITEM_VARIANTS} className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D3B26A] to-[#F5EFE6]">
            Google Platform News
          </h1>
          <p className="text-xl text-gray-400">
            Latest technologies integrated into the TRYONYOU ecosystem (Nov/Dec 2025).
          </p>
        </motion.header>

        <motion.section variants={ITEM_VARIANTS} className="mb-16">
          <h2 className="text-2xl font-bold text-[#D3B26A] mb-8 border-l-4 border-[#D3B26A] pl-4">Core Technologies</h2>

          <div className="grid gap-8">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-blue-400">Gemini 3 Pro</h3>
                <span className="text-xs bg-blue-900/50 text-blue-200 px-2 py-1 rounded">Nov 19, 2025</span>
              </div>
              <p className="text-gray-300 mb-4">
                The foundational large language model powering the "Master Brain" and autonomous agents.
                Features enhanced reasoning, larger context window, and native multimodal understanding.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-emerald-500/50 transition duration-300">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Veo 3.1</h3>
              <p className="text-gray-300">
                Generative video tool available via the Gemini API. Used for dynamic content generation
                and future fabric movement simulations.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-violet-500/50 transition duration-300">
              <h3 className="text-2xl font-bold text-violet-400 mb-4">Antigravity</h3>
              <p className="text-gray-300">
                High-performance serverless infrastructure providing the scalable backend computation layer
                for biometric processing and 3D rendering.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-pink-500/50 transition duration-300">
              <h3 className="text-2xl font-bold text-pink-400 mb-4">Jules</h3>
              <p className="text-gray-300 mb-2">
                <strong>Autonomous Coding Agent.</strong> An always-on engineer powered by Gemini 3 Pro.
              </p>
              <p className="text-gray-400 italic text-sm">
                "Responsible for maintaining the codebase, implementing features, and solving bugs autonomously."
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-orange-500/50 transition duration-300">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Conductor</h3>
              <p className="text-gray-300">
                AI Agent Orchestration Layer. Manages the lifecycle and coordination of 53 specialized AI agents
                (e.g., Agent 001 PAU, Agent 015 Drape-Aware Physics).
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section variants={ITEM_VARIANTS} className="mb-12">
           <h2 className="text-2xl font-bold text-[#D3B26A] mb-8 border-l-4 border-[#D3B26A] pl-4">Impact on TRYONYOU</h2>
           <ul className="grid md:grid-cols-2 gap-4">
             <li className="bg-white/5 p-4 rounded-lg border border-white/10">
               <strong className="block text-white mb-1">Autonomous Evolution</strong>
               <span className="text-gray-400 text-sm">Platform self-improves via Jules.</span>
             </li>
             <li className="bg-white/5 p-4 rounded-lg border border-white/10">
               <strong className="block text-white mb-1">Real-time Intelligence</strong>
               <span className="text-gray-400 text-sm">53 Agents coordinated by Conductor.</span>
             </li>
             <li className="bg-white/5 p-4 rounded-lg border border-white/10">
               <strong className="block text-white mb-1">Hyper-Realistic Media</strong>
               <span className="text-gray-400 text-sm">Veo 3.1 creates indistinguishable visuals.</span>
             </li>
             <li className="bg-white/5 p-4 rounded-lg border border-white/10">
               <strong className="block text-white mb-1">Infinite Scalability</strong>
               <span className="text-gray-400 text-sm">Antigravity handles heavy compute loads.</span>
             </li>
           </ul>
        </motion.section>

        <motion.footer variants={ITEM_VARIANTS} className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          Last Updated: Dec 2025
        </motion.footer>
      </motion.div>
    </div>
  )
}

export default GoogleNews
