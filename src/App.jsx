import React from 'react';

export default function App() {
  return (
    <div className='bg-black text-white min-h-screen font-light tracking-wide'>
      {/* HERO */}
      <section className='h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-black to-neutral-900'>
        <h1 className='text-6xl md:text-8xl font-extralight italic'>
          TRYONYOU
        </h1>
        <p className='mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed'>
          The future of fashion fitting.  
          Elegance, precision, and zero returns.
        </p>
        <a
          href='#discover'
          className='mt-10 px-10 py-4 border border-white rounded-full hover:bg-white hover:text-black transition'
        >
          Discover the Collection
        </a>
      </section>

      {/* LOOKBOOK */}
      <section id='discover' className='py-32 px-6 bg-black'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12'>
          <div className='bg-neutral-900 aspect-[3/4] flex items-center justify-center'>
            <span className='text-gray-400'>Model Shot 01</span>
          </div>
          <div className='flex flex-col justify-center'>
            <h2 className='text-4xl font-thin mb-4'>Perfect Fit</h2>
            <p className='text-gray-400 leading-relaxed'>
              Our 3D avatar adapts to your body and preferences, creating a
              flawless fitting experience before you even try the garment.
            </p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT */}
      <section className='py-40 px-6 bg-gradient-to-b from-neutral-900 to-black text-center'>
        <h2 className='text-5xl font-extralight italic mb-6'>
          Zero Returns, Pure Style
        </h2>
        <p className='text-gray-400 mb-10'>
          AI fashion meets couture. Secure payment, ethical choices,
          and a seamless journey from desire to delivery.
        </p>
        <a
          href='https://tryonyou.app'
          className='px-12 py-4 bg-white text-black font-medium tracking-wider uppercase rounded-full hover:bg-gray-200 transition'
        >
          Enter TryOnYou
        </a>
      </section>

      {/* FOOTER */}
      <footer className='py-10 text-center text-gray-500 text-xs tracking-widest uppercase'>
        © {new Date().getFullYear()} TRYONYOU · Crafted with AI Elegance
      </footer>
    </div>
  );
}
