export default function Pilot() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>TRYONYOU PILOT</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Experience the future of fashion</p>
      <img 
        src="/assets/pilot-look.jpg" 
        alt="Pilot Look" 
        style={{ maxWidth: '600px', width: '100%', borderRadius: '12px' }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    </div>
  );
}
