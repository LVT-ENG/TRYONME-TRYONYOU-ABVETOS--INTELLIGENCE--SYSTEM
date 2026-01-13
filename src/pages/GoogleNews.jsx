import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function GoogleNews() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="mb-12 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-light tracking-wider">GOOGLE PLATFORM NEWS</h1>
          <p className="text-gray-400 mt-2">Recent updates and roadmap integration plans.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto space-y-16">

        {/* Gemini 3 Pro */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-white/20 pb-2">
            <h2 className="text-2xl font-bold text-blue-400">Gemini 3 Pro</h2>
            <span className="text-xs font-mono text-gray-500">ROLLED OUT TO JULES (DEC 2025)</span>
          </div>
          <p className="text-gray-300">
            Gemini 3 Pro is Google's most intelligent model, now integrated into Jules, the always-on autonomous coding agent.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li><span className="text-white">Capabilities:</span> Surpasses Gemini 2.5 Pro in coding, mastering agentic workflows.</li>
            <li>
              <span className="text-white">Improvements:</span>
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>Clearer Reasoning & handling of multi-step tasks.</li>
                <li>Stronger Intent Alignment.</li>
                <li>Significant lift in day-to-day reliability.</li>
              </ul>
            </li>
            <li><span className="text-white">Availability:</span> Rolling out to Google AI Ultra and Pro subscribers.</li>
          </ul>
        </section>

        {/* Jules */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-white/20 pb-2">
            <h2 className="text-2xl font-bold text-purple-400">Jules</h2>
            <span className="text-xs font-mono text-gray-500">ALWAYS-ON AUTONOMOUS AGENT</span>
          </div>
          <p className="text-gray-300">
            Jules has been updated to integrate Gemini 3 Pro, expanding its capabilities and surface area.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li><span className="text-white">Integration:</span> Powered by Gemini 3 Pro.</li>
            <li>
              <span className="text-white">New Surfaces:</span>
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>Jules Tools (Terminal integration)</li>
                <li>Gemini CLI Extension</li>
                <li>Jules API</li>
              </ul>
            </li>
            <li>
              <span className="text-white">Features:</span> Parallel runs, Diff Viewer, Windows Support, Critic Agent.
            </li>
          </ul>
        </section>

        {/* Veo 3.1 */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-white/20 pb-2">
            <h2 className="text-2xl font-bold text-green-400">Veo 3.1</h2>
            <span className="text-xs font-mono text-gray-500">ADVANCED VIDEO GENERATION</span>
          </div>
          <p className="text-gray-300">
            Significant upgrades in video quality, audio generation, and creative control.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li><span className="text-white">Audio:</span> Richer native audio, including conversations.</li>
            <li><span className="text-white">New Capabilities:</span> Ingredients to Video (ref images), Scene Extension, First and Last Frame transitions.</li>
            <li><span className="text-white">Availability:</span> Paid preview in Gemini API.</li>
          </ul>
        </section>

        {/* Antigravity */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-white/20 pb-2">
            <h2 className="text-2xl font-bold text-orange-400">Antigravity</h2>
            <span className="text-xs font-mono text-gray-500">AGENTIC IDE</span>
          </div>
          <p className="text-gray-300">
            Google's new agentic IDE based on VS Code, focusing on integrating AI agents deeply into the development workflow.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li><span className="text-white">Core:</span> Based on VS Code.</li>
            <li><span className="text-white">Agent Manager:</span> Manage and orchestrate AI agents.</li>
            <li><span className="text-white">Chrome Integration:</span> Allows for computer use and video recording of agent actions.</li>
          </ul>
        </section>

        {/* Conductor */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-white/20 pb-2">
            <h2 className="text-2xl font-bold text-yellow-400">Conductor</h2>
            <span className="text-xs font-mono text-gray-500">CONTEXT-DRIVEN DEVELOPMENT</span>
          </div>
          <p className="text-gray-300">
            Open-source extension for Gemini CLI designed to solve the "context window" problem.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li><span className="text-white">Problem Solved:</span> Addresses context loss in long-running sessions.</li>
            <li><span className="text-white">Method:</span> Uses markdown files (product.md, techstack.md, etc.) to maintain state.</li>
            <li><span className="text-white">Workflow:</span> Setup (Interview) -> Planning (Deliberation) -> Execution (Implementation).</li>
          </ul>
        </section>

      </div>

      <footer className="mt-20 text-center text-xs text-gray-600 font-mono">
        GOOGLE PLATFORM NEWS | JULES INTEGRATION
      </footer>
    </div>
  );
}
