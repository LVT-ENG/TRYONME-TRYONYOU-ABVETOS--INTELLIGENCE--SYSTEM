import React, { useState, useRef, useEffect } from 'react';
import { getSystemAdvice } from '../services/geminiService';
import { Send, Terminal } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const SystemChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: "ABVETOS SYSTEM ONLINE. I am your fashion intelligence unit. How may I assist with your styling protocols today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build history for context
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await getSystemAdvice(userMsg.text, history);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-1">SYSTEM LOGS</h2>
        <p className="text-zinc-400 font-mono text-sm">DIRECT COMMUNICATION LINK</p>
      </header>

      <div className="flex-1 bg-black border border-zinc-800 rounded-lg flex flex-col overflow-hidden shadow-2xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-lg font-mono text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-tr-none' 
                  : 'bg-zinc-900/80 text-emerald-400 border border-emerald-900/30 rounded-tl-none'
                }`}
              >
                <div className="text-[10px] opacity-50 mb-1 uppercase tracking-wider font-bold">
                  {msg.role === 'user' ? 'USER_INPUT' : 'SYSTEM_RESPONSE'} :: {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900/80 p-4 rounded-lg rounded-tl-none border border-emerald-900/30 flex items-center space-x-2">
                 <Terminal size={14} className="text-emerald-500 animate-pulse" />
                 <span className="text-emerald-500 font-mono text-xs animate-pulse">PROCESSING REQUEST...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-900">
           <div className="flex items-center space-x-2 bg-black border border-zinc-700 rounded px-4 py-2 focus-within:border-emerald-500 transition-colors">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command or query..."
                className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none placeholder-zinc-600"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="text-zinc-400 hover:text-white disabled:opacity-50"
              >
                <Send size={18} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemChat;
