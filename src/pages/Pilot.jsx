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
      <div style={{ 
        maxWidth: '600px', 
        width: '100%', 
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #333',
        borderRadius: '12px',
        backgroundColor: '#111'
      }}>
        <img 
          src="/assets/pilot-look.jpg" 
          alt="Pilot Look" 
          style={{ 
            maxWidth: '100%', 
            width: '100%', 
            borderRadius: '12px',
            display: 'block'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem;">Add pilot-look.jpg to /public/assets/</p>';
          }}
        />
      </div>
    </div>
  );
}
