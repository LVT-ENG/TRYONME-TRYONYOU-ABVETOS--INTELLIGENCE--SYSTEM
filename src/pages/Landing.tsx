import React, { useState, useRef, useEffect } from 'react';

const Pilot = () => {
    const [result, setResult] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Function to start the camera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsScanning(true);
            setResult("Posiciónate para el escaneo.");
        } catch (error) {
            console.error("Error accessing camera:", error);
            setResult("Error al acceder a la cámara. Por favor, concede permiso.");
        }
    };

    // Function to capture image and send to backend
    const captureAndProcess = async () => {
        if (!videoRef.current || !canvasRef.current) {
            return;
        }

        setResult("Capturando y analizando biometría...");
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame to the canvas
        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        // Convert canvas image to blob
        canvas.toBlob(async (blob) => {
            if (!blob) {
                setResult("Error al capturar la imagen.");
                return;
            }

            // Stop the camera stream
            if (video.srcObject) {
                const stream = video.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
            setIsScanning(false);

            // Send the image to the backend
            const formData = new FormData();
            formData.append('file', blob, 'scan.jpg');

            try {
                const response = await fetch('/api/process-biometry', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setResult(data.recommendation || "No se pudo obtener una recomendación.");

            } catch (error) {
                console.error("Error processing biometry:", error);
                setResult("Error al procesar el escaneo. Inténtalo de nuevo.");
            }

        }, 'image/jpeg');
    };

    const startScanFlow = () => {
        if (!isScanning) {
            startCamera();
        } else {
            captureAndProcess();
        }
    };

    // Clean up camera stream on component unmount
    useEffect(() => {
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);


    return (
        <div style={{backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh', textAlign: 'center', padding: '50px'}}>
            <nav><img src="/assets/logo_tryonyou.png" style={{height: '40px'}} /></nav>
            <h1>La fin des retours est arrivée.</h1>
            <p>Système d'Intelligence de Mode pour Lafayette.</p>

            <div style={{border: '2px solid #c5a059', padding: '20px', margin: '20px auto', maxWidth: '640px'}}>
                {isScanning ? (
                    <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: '8px' }}></video>
                ) : (
                    <img src="/assets/pau_blanco_chasquido.png" style={{width: '150px'}} alt="Static intro" />
                )}

                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

                <h2>{result || "Listo para el escaneo"}</h2>

                <button
                    onClick={startScanFlow}
                    style={{background: '#c5a059', color: 'black', padding: '15px 30px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px'}}
                >
                    {isScanning ? "CAPTURAR Y ANALIZAR" : "LANZAR ESCÁNER BIOMÉTRICO"}
                </button>
            </div>
        </div>
    );
};
export default Pilot;
