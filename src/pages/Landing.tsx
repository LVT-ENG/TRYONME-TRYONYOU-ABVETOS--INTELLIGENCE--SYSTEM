import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Landing = () => {
    const [look, setLook] = useState(1);

    return (
        <div className="bg-dark text-white min-h-screen font-sans">
            <nav className="p-5 flex justify-between items-center border-b border-gray-800">
                <img src="/assets/logo_tryonyou.png" className="h-11" alt="TryOnYou Logo" />
                <div className="text-green-400 text-sm flex items-center">
                    <span className="pulse-dot mr-2"></span> SYSTÈME IA CONNECTÉ
                </div>
            </nav>

            <header className="text-center py-16 px-5">
                <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto leading-tight">
                    Allez-vous vraiment essayer 510 pantalons pour trouver celui qui vous va le mieux ?
                </h1>
                <p className="text-xl mt-6 text-gray-400">Le futur du fitting millimétré est ici.</p>
                <img src="/assets/montana_pantalones.png" className="w-3/4 md:w-1/2 mx-auto mt-10 rounded-xl opacity-80" alt="Montana Collection" />
            </header>

            <main className="flex flex-col md:flex-row justify-center items-center gap-16 py-12 px-5">
                {/* PAU - El Activador */}
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setLook((look % 3) + 1)}
                    className="cursor-pointer text-center group"
                >
                    <img src="/assets/pau_blanco_chasquido.png" className="w-48 mx-auto drop-shadow-2xl" alt="PAU Assistant" />
                    <p className="text-gold font-bold mt-5 tracking-widest uppercase text-sm group-hover:text-white transition-colors">
                        Cliquez pour le "Chasquement"
                    </p>
                </motion.div>

                {/* Espejo Mágico */}
                <div className="mirror-frame relative w-full max-w-md h-[550px] bg-black">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={look}
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            src={`/assets/look${look}.png`}
                            className="w-full h-full object-cover block"
                            alt={`Virtual Look ${look}`}
                        />
                    </AnimatePresence>

                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                            Biometría Activa: Look {look}
                        </span>
                    </div>
                </div>
            </main>

            <section className="py-12 border-t border-gray-800">
                <h2 className="text-center text-gray-500 mb-8 uppercase tracking-widest text-sm">Validación Técnica</h2>
                <div className="flex justify-center gap-4 flex-wrap px-4">
                     {/* Marcadores de posición para las capturas técnicas */}
                    {[1,2,3,4,5].map(n => (
                        <div key={n} className="w-24 h-16 border border-gray-700 rounded bg-gray-900 flex items-center justify-center text-xs text-gray-600">
                            System {n}
                        </div>
                    ))}
                </div>
            </section>

            <footer className="text-center py-24 bg-zinc-900 mt-20">
                <h2 className="text-gold text-2xl font-bold">TryOnYou : The Fashion Intelligence System</h2>
                <p className="max-w-xl mx-auto mt-4 text-gray-400">Le fin des retours est arrivée. Vivez-le.</p>
                <button className="bg-gold text-black px-12 py-5 font-black rounded-sm mt-8 hover:bg-white transition-colors uppercase tracking-wider">
                    CRÉER MON AVATAR LAFAYETTE
                </button>
            </footer>
        </div>
    );
};
export default Landing;