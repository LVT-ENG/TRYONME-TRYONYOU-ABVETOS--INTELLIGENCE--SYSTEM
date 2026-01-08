import React, { useState } from 'react';
import { analyzeUserFit } from '../services/ai_vision';

export default function MagicMirror() {
  const [recommendation, setRecommendation] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [collectionIndex, setCollectionIndex] = useState(0);

  const handleScan = async () => {
    setIsScanning(true);
    // Simulating Slow Tech transition
    document.body.style.filter = "blur(4px) scale(0.98)";
    setTimeout(() => {
       document.body.style.filter = "none";
    }, 1000);

    // Mock blob for vision service
    const mockBlob = new Blob([], { type: 'image/png' });
    const result = await analyzeUserFit(mockBlob);

    console.log("LAFAYETTE JIT PROTOCOL: Match Successful");
    setRecommendation(result);
    setCollectionIndex(prev => prev + 1);
    setIsScanning(false);
  };

  return (
    <div style={{backgroundColor: '#121212', color: '#C5A46D', minHeight: '100vh', padding: '40px', textAlign: 'center'}}>
      <h1>✨ TRYONYOU: MAGIC MIRROR LIVE</h1>
      <div style={{border: '2px solid #C5A46D', margin: '20px auto', width: '80%', height: '500px', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        {recommendation ? (
           <>
             <h2>{recommendation.matchPercentage}% Match</h2>
             <p>{recommendation.recommendation}</p>
             <p style={{fontStyle: 'italic'}}>"{recommendation.message}"</p>
           </>
        ) : (
           <p>📸 Click CHANGER to start... <br/> 👗 Waiting for Lafayette connection...</p>
        )}
      </div>
      <button
        onClick={handleScan}
        style={{padding: '15px 30px', backgroundColor: '#C5A46D', border: 'none', color: 'black', fontWeight: 'bold', cursor: 'pointer'}}>
        CHANGER
      </button>
    </div>
  );
}
