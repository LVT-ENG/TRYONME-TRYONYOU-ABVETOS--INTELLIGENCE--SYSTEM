export default function Pilot() {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const message = document.createElement('p');
    message.textContent = 'Add pilot-look.jpg to /public/assets/';
    message.style.color = '#666';
    message.style.textAlign = 'center';
    message.style.padding = '2rem';
    e.target.parentElement.appendChild(message);
  };

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
          onError={handleImageError}
        />
      </div>
    </div>
  );
}
