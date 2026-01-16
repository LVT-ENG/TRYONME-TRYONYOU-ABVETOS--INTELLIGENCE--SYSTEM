import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PauAgent() {
  const [messages, setMessages] = useState([
    { role: "agent", text: "Bonjour. I am Pau, your personal style curator at Galeries Lafayette. How may I assist you with your wardrobe today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "agent", 
        text: "An excellent choice. Based on your biometric profile, I would recommend the Burberry Trench in size 48 for a perfect fit." 
      }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-black/90 backdrop-blur-md border-b border-white/10">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:text-red-500 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> EXIT
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-red-500" />
          <span className="text-lg font-serif tracking-widest">PAU LE PAON</span>
        </div>
        <div className="w-10" />
      </header>

      {/* Chat Area */}
      <main className="flex-1 pt-24 pb-24 px-4 container mx-auto max-w-3xl flex flex-col gap-6">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 relative">
            <img 
              src="/assets/branding/pau_tuxedo_agent.png" 
              alt="Pau Agent" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"; // Fallback
              }}
            />
          </div>
        </div>

        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-white text-black rounded-tr-none' 
                : 'bg-neutral-900 border border-white/10 text-neutral-200 rounded-tl-none'
            }`}>
              <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-white/10 p-4">
        <div className="container mx-auto max-w-3xl flex gap-4">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Pau about style, sizing, or trends..."
            className="bg-neutral-900 border-white/10 text-white focus:ring-red-500"
          />
          <Button onClick={handleSend} className="bg-white text-black hover:bg-red-600 hover:text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
