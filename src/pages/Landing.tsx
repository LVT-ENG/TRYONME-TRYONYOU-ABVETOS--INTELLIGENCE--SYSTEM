import { useEffect, useRef, useState } from "react";

type RecommendationResponse = {
  recommendation: string;
  confidence?: number;
};

export default function Landing() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendationResponse | null>(null);

  /* 1️⃣ Request camera access */
  useEffect(() => {
    async function initCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play();
        }
      } catch (err) {
        setError("Camera access denied or not available.");
      }
    }

    initCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 2️⃣ Capture frame from video */
  const captureAndSend = async () => {
    if (!videoRef.current || !canvasRef.current || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setError("Canvas not supported.");
      setLoading(false);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    /* 3️⃣ Convert canvas to Blob */
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          setError("Failed to capture image.");
          setLoading(false);
          return;
        }

        try {
          const formData = new FormData();
          formData.append("file", blob, "biometry.png");

          /* 4️⃣ Send to backend */
          const response = await fetch("/api/process-biometry", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Backend error: ${response.status} ${errorText}`);
          }

          const data: RecommendationResponse = await response.json();
          setResult(data);
        } catch (err) {
            if (err instanceof Error) {
                 setError(`Failed to process image: ${err.message}`);
            } else {
                 setError("An unknown error occurred while processing the image.");
            }
        } finally {
          setLoading(false);
        }
      },
      "image/png",
      0.95
    );
  };

  const getStatusMessage = () => {
      if (loading) return "Analizando Biometría... Espere un momento.";
      if (error) return `Error: ${error}`;
      if (result) return `${result.recommendation}`;
      if (!stream) return "Iniciando cámara...";
      return "Listo para el escaneo.";
  }

  return (
    <div style={{backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh', textAlign: 'center', padding: '50px', fontFamily: 'sans-serif'}}>
        <nav style={{marginBottom: '40px'}}><img src="/assets/logo_tryonyou.png" style={{height: '40px'}} alt="TryOnYou Logo" /></nav>
        <h1 style={{fontSize: '2.5rem', color: '#c5a059'}}>La fin des retours est arrivée.</h1>
        <p style={{fontSize: '1.2rem', marginBottom: '40px'}}>Système d'Intelligence de Mode pour Lafayette.</p>

        <div style={{border: '2px solid #c5a059', padding: '20px', margin: '20px auto', maxWidth: '640px', borderRadius: '10px'}}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            <h2 style={{marginTop: '20px', minHeight: '50px'}}>{getStatusMessage()}</h2>

            <button
                onClick={captureAndSend}
                disabled={loading || !stream}
                style={{
                    background: loading || !stream ? '#555' : '#c5a059',
                    color: 'black',
                    padding: '15px 30px',
                    fontWeight: 'bold',
                    cursor: loading || !stream ? 'not-allowed' : 'pointer',
                    marginTop: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    transition: 'background-color 0.3s'
                }}
            >
                {loading ? "ANALIZANDO..." : "LANZAR ESCÁNER BIOMÉTRICO"}
            </button>
        </div>
    </div>
  );
}
