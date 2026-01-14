import React from 'react';
import { ArrowLeft, Sparkles, Terminal, Video, Code, Box, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Section = ({ title, icon: Icon, children }) => (
  <section className="mb-16 border-l-2 border-gray-800 pl-6 hover:border-gold transition-colors duration-300">
    <div className="flex items-center gap-3 mb-6">
      {Icon && <Icon className="w-6 h-6 text-gold" />}
      <h2 className="text-3xl font-light tracking-wide text-white">{title}</h2>
    </div>
    <div className="space-y-4 text-gray-300 leading-relaxed font-light">
      {children}
    </div>
  </section>
);

const FeatureList = ({ items }) => (
  <ul className="space-y-3 mt-4">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
        <span>
          <strong className="text-white font-medium">{item.title}</strong>
          {item.desc && <span className="text-gray-400"> — {item.desc}</span>}
        </span>
      </li>
    ))}
  </ul>
);

const GoogleNews = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-sm font-mono tracking-widest text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            BACK TO PILOT
          </button>
          <div className="text-xs font-mono text-gold border border-gold px-2 py-1">
            PLATFORM UPDATE
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Google Platform News
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            Recent updates and roadmap integration plans highlighting key advancements in AI models, developer tools, and creative generation.
          </p>
        </div>

        <Section title="Gemini 3 Pro" icon={Sparkles}>
          <div className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 text-xs font-mono mb-4 rounded">
            ROLLED OUT TO JULES (DEC 2025)
          </div>
          <p>
            Gemini 3 Pro is Google's most intelligent model, now integrated into Jules, the always-on autonomous coding agent.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="text-white font-medium mb-3">Capabilities</h3>
              <p className="text-sm">Surpasses Gemini 2.5 Pro in coding, mastering agentic workflows and complex zero-shot tasks.</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">Improvements</h3>
              <FeatureList items={[
                { title: "Clearer Reasoning", desc: "Better handling of multi-step tasks." },
                { title: "Stronger Intent Alignment", desc: "Understands user goals more accurately." },
                { title: "Reliability", desc: "Significant lift in day-to-day reliability for complex tasks." }
              ]} />
            </div>
          </div>
        </Section>

        <Section title="Jules" icon={Terminal}>
          <p className="text-lg text-white mb-2">The Always-On Autonomous Coding Agent</p>
          <p>
            Jules has been updated to integrate Gemini 3 Pro, expanding its capabilities and surface area.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-8 bg-gray-900/30 p-6 rounded-lg border border-white/5">
            <div>
              <h3 className="text-gold font-mono text-sm mb-4">NEW SURFACES</h3>
              <FeatureList items={[
                { title: "Jules Tools", desc: "Terminal integration." },
                { title: "Gemini CLI Extension", desc: "Access Jules directly from the command line." },
                { title: "Jules API", desc: "Stable API for custom workflows and automation." }
              ]} />
            </div>
            <div>
              <h3 className="text-gold font-mono text-sm mb-4">NEW FEATURES</h3>
              <FeatureList items={[
                { title: "Parallel Runs", desc: "Support for parallel execution in CLI." },
                { title: "Diff Viewer", desc: "Review changes before applying them." },
                { title: "Windows Support", desc: "Improved compatibility." },
                { title: "Critic Agent", desc: "Re-engages more reliably to keep tasks on track." }
              ]} />
            </div>
          </div>
        </Section>

        <Section title="Veo 3.1" icon={Video}>
          <p>
            Veo 3.1 introduces significant upgrades in video quality, audio generation, and creative control.
          </p>
          <div className="mt-4">
            <h3 className="text-white font-medium mb-2">New Capabilities</h3>
            <FeatureList items={[
              { title: "Ingredients to Video", desc: "Use up to 3 reference images to guide generation, ensuring character and style consistency." },
              { title: "Scene Extension", desc: "Create longer videos by generating new clips based on the final second of the previous clip." },
              { title: "First and Last Frame", desc: "Generate smooth transitions between a specific starting and ending image." }
            ]} />
          </div>
        </Section>

        <Section title="Antigravity" icon={Box}>
          <p className="mb-4">
            "Antigravity" (Google's new agentic IDE based on VS Code) focuses on integrating AI agents deeply into the development workflow.
          </p>
          <FeatureList items={[
            { title: "Agent Manager", desc: "Manage and orchestrate AI agents." },
            { title: "Artifacts", desc: "Dynamic primitives generated by the model." },
            { title: "Chrome Integration", desc: "Allows for computer use and video recording of agent actions." }
          ]} />
        </Section>

        <Section title="Conductor" icon={Layers}>
          <p className="mb-4">
            Context-Driven Development for AI-Assisted Coding. Designed to solve the "context window" problem in long-running AI coding sessions.
          </p>

          <div className="bg-gray-900 p-4 rounded border-l-4 border-blue-500 my-6">
            <h3 className="text-blue-400 font-mono text-sm mb-2">CONTEXT FILES</h3>
            <div className="grid grid-cols-2 gap-4 text-sm font-mono">
              <div>product.md</div>
              <div>techstack.md</div>
              <div>tracks.md</div>
              <div>plan.md</div>
            </div>
          </div>

          <h3 className="text-white font-medium mb-2">Workflow</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-400">
            <li><strong className="text-white">Setup (Interview)</strong>: Understands the project.</li>
            <li><strong className="text-white">Planning (Deliberation)</strong>: Creates a plan before coding.</li>
            <li><strong className="text-white">Execution (Implementation)</strong>: Executes the approved plan.</li>
          </ol>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center">
        <p className="text-gray-600 font-mono text-xs">
          POWERED BY GOOGLE PLATFORM &bull; JULES ENGINE V7
        </p>
      </footer>
    </div>
  );
};

export default GoogleNews;
