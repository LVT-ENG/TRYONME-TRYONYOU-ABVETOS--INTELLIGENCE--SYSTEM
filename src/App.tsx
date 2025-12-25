import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
    const [look, setLook] = useState(1);
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#c5a059] selection:text-black">
            <nav className="p-6 border-b border-white/10 flex justify-between items-center">
                <div className="text-2xl font-bold tracking-tighter">TRYONYOU</div>
                <div className="text-[#00ff88] text-xs font-mono flex items-center gap-2">
                    <span className="pulse-dot"></span> SYSTEM ONLINE
                </div>
            </nav>
            <main className="flex flex-col items-center justify-center p-10 text-center">
                <header className="mb-12 max-w-2xl">
                    <h1 className="text-5xl font-bold mb-4 leading-tight">La fin des retours est arrivée.</h1>
                    <p className="text-gray-400 text-lg">Système d'Intelligence de Mode pour Lafayette.</p>
                </header>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setLook((look % 3) + 1)}
                        className="cursor-pointer group relative"
                    >
                        <div className="absolute inset-0 bg-[#c5a059]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img src="/assets/pau_blanco_chasquido.png" className="w-64 relative z-10" alt="PAU" />
                        <p className="mt-4 text-[#c5a059] font-bold text-sm tracking-widest uppercase">Cliquez pour le "Snap"</p>
                    </motion.div>

                    <div className="relative border-4 border-[#c5a059] rounded-2xl overflow-hidden h-[500px] w-[350px] shadow-[0_0_40px_rgba(197,160,89,0.3)]">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={look}
                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0 }}
                                src={`/assets/look${look}.png`}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}