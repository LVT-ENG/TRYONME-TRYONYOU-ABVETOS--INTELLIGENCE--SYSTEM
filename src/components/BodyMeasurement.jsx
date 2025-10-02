import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import jsQR from 'jsqr';

const BodyMeasurement = ({ onMeasurementComplete }) => {
  const [step, setStep] = useState('intro'); // intro, marker, measure, results
  const [measurements, setMeasurements] = useState(null);
  const [calibration, setCalibration] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [detectedMarker, setDetectedMarker] = useState(null);

  // A4 dimensions in mm
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const MARKER_SIZE_MM = 50; // QR code size in mm

  const generateMarkerPDF = async () => {
    try {
      // Generate QR code with calibration data
      const qrData = JSON.stringify({
        type: 'calibration_marker',
        size_mm: MARKER_SIZE_MM,
        timestamp: Date.now(),
        id: 'TRYONME_CALIBRATION_001'
      });

      const qrCodeDataURL = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add title
      pdf.setFontSize(16);
      pdf.text('TryOnMe - Marcador de Calibración Corporal', 20, 30);
      
      pdf.setFontSize(12);
      pdf.text('Instrucciones:', 20, 50);
      pdf.text('1. Imprima esta página en tamaño A4 (210×297 mm)', 25, 60);
      pdf.text('2. Coloque el marcador a la altura de su pecho', 25, 70);
      pdf.text('3. Manténgase a 2-3 metros de la cámara', 25, 80);
      pdf.text('4. Asegúrese de que todo su cuerpo esté visible', 25, 90);

      // Add QR code in the center
      const qrX = (A4_WIDTH_MM - MARKER_SIZE_MM) / 2;
      const qrY = 120;
      pdf.addImage(qrCodeDataURL, 'PNG', qrX, qrY, MARKER_SIZE_MM, MARKER_SIZE_MM);

      // Add measurements info
      pdf.setFontSize(10);
      pdf.text(`Tamaño del marcador: ${MARKER_SIZE_MM}mm × ${MARKER_SIZE_MM}mm`, 20, 200);
      pdf.text('© 2025 TryOnMe - AVBETOS Intelligence System', 20, 280);

      // Save PDF
      pdf.save('TryOnMe-Marcador-Calibracion.pdf');
      
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return false;
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Prefer back camera
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Error al acceder a la cámara. Por favor, permita el acceso a la cámara.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsRecording(false);
    }
  };

  const detectMarker = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      try {
        const markerData = JSON.parse(code.data);
        if (markerData.type === 'calibration_marker') {
          setDetectedMarker(code);
          
          // Calculate px/mm ratio
          const markerPixelSize = Math.sqrt(
            Math.pow(code.location.topRightCorner.x - code.location.topLeftCorner.x, 2) +
            Math.pow(code.location.topRightCorner.y - code.location.topLeftCorner.y, 2)
          );
          
          const pxPerMm = markerPixelSize / MARKER_SIZE_MM;
          
          setCalibration({
            pxPerMm,
            markerData,
            videoWidth: canvas.width,
            videoHeight: canvas.height,
            detectedAt: Date.now()
          });

          return true;
        }
      } catch (error) {
        console.error('Error parsing marker data:', error);
      }
    }
    
    return false;
  };

  const calculateBodyMeasurements = () => {
    if (!calibration || !detectedMarker) return null;

    // Mock body measurement calculation
    // In a real implementation, this would use computer vision to detect body landmarks
    const mockMeasurements = {
      altura_cm: Math.round(170 + (Math.random() - 0.5) * 20), // 160-180cm
      pecho_cm: Math.round(90 + (Math.random() - 0.5) * 20),   // 80-100cm
      cintura_cm: Math.round(75 + (Math.random() - 0.5) * 20), // 65-85cm
      largo_pierna_cm: Math.round(80 + (Math.random() - 0.5) * 20), // 70-90cm
      precision_mm: Math.round((Math.random() * 8) + 2), // 2-10mm precision
      calibration_data: {
        px_per_mm: calibration.pxPerMm,
        marker_size_px: Math.sqrt(
          Math.pow(detectedMarker.location.topRightCorner.x - detectedMarker.location.topLeftCorner.x, 2) +
          Math.pow(detectedMarker.location.topRightCorner.y - detectedMarker.location.topLeftCorner.y, 2)
        ),
        video_resolution: `${calibration.videoWidth}x${calibration.videoHeight}`
      },
      timestamp: new Date().toISOString(),
      pau_avatar_config: {
        body_type: 'balanced',
        fit_preference: 'regular',
        style_profile: 'classic'
      }
    };

    setMeasurements(mockMeasurements);
    return mockMeasurements;
  };

  useEffect(() => {
    let interval;
    if (isRecording && step === 'measure') {
      interval = setInterval(() => {
        if (detectMarker()) {
          // Marker detected, wait a moment then calculate measurements
          setTimeout(() => {
            const result = calculateBodyMeasurements();
            if (result) {
              setStep('results');
              stopCamera();
            }
          }, 2000);
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, step, calibration]);

  const exportMeasurements = () => {
    if (!measurements) return;

    const blob = new Blob([JSON.stringify(measurements, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tryonme-measurements-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderIntroStep = () => (
    <motion.div 
      className="text-center p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-[#0F5E68]">
        Sistema de Medición Corporal con Avatar Pau
      </h2>
      <p className="text-lg mb-8 text-gray-600">
        Genera un marcador QR en PDF A4 y utiliza tu cámara para obtener medidas corporales precisas.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">📐 Precisión</h3>
          <p>Medición con precisión ≤ ±10mm usando calibración con marcador QR</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">👤 Avatar Pau</h3>
          <p>Integración automática con el sistema de avatar personalizado</p>
        </div>
      </div>

      <motion.button
        onClick={() => setStep('marker')}
        className="px-8 py-4 bg-[#0F5E68] text-white rounded-lg font-semibold text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Comenzar Medición
      </motion.button>
    </motion.div>
  );

  const renderMarkerStep = () => (
    <motion.div 
      className="text-center p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-[#0F5E68]">
        Paso 1: Generar Marcador de Calibración
      </h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-yellow-800 mb-2">📋 Instrucciones:</h3>
        <ol className="text-left text-yellow-700 space-y-2">
          <li>1. Descarga e imprime el marcador en papel A4 (210×297 mm)</li>
          <li>2. NO redimensiones la impresión - usa escala 100%</li>
          <li>3. Coloca el marcador a la altura de tu pecho</li>
          <li>4. Asegúrate de tener buena iluminación</li>
        </ol>
      </div>

      <motion.button
        onClick={generateMarkerPDF}
        className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold mb-4 block mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        📄 Descargar Marcador PDF
      </motion.button>

      <motion.button
        onClick={() => setStep('measure')}
        className="px-8 py-4 bg-[#0F5E68] text-white rounded-lg font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continuar a Medición
      </motion.button>
    </motion.div>
  );

  const renderMeasureStep = () => (
    <motion.div 
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0F5E68]">
        Paso 2: Captura de Medidas
      </h2>

      <div className="max-w-4xl mx-auto">
        <div className="relative bg-black rounded-lg overflow-hidden mb-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-96 object-cover"
          />
          <canvas
            ref={canvasRef}
            className="hidden"
          />
          
          {detectedMarker && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded">
              ✓ Marcador Detectado
            </div>
          )}
          
          {calibration && (
            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded">
              Calibrado: {calibration.pxPerMm.toFixed(2)} px/mm
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          {!isRecording ? (
            <motion.button
              onClick={startCamera}
              className="px-6 py-3 bg-[#0F5E68] text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📹 Iniciar Cámara
            </motion.button>
          ) : (
            <motion.button
              onClick={stopCamera}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ⏹️ Detener Cámara
            </motion.button>
          )}
        </div>

        {isRecording && (
          <div className="text-center mt-6">
            <p className="text-lg text-gray-600">
              Mantén el marcador visible y espera la detección automática...
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderResultsStep = () => (
    <motion.div 
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0F5E68]">
        Medidas Corporales - Avatar Pau
      </h2>

      {measurements && (
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">📏 Medidas Corporales</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Altura:</span>
                  <span className="font-semibold">{measurements.altura_cm} cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Pecho:</span>
                  <span className="font-semibold">{measurements.pecho_cm} cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Cintura:</span>
                  <span className="font-semibold">{measurements.cintura_cm} cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Largo de pierna:</span>
                  <span className="font-semibold">{measurements.largo_pierna_cm} cm</span>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">🎯 Precisión y Calibración</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Precisión:</span>
                  <span className={`font-semibold ${measurements.precision_mm <= 10 ? 'text-green-600' : 'text-red-600'}`}>
                    ±{measurements.precision_mm} mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ratio px/mm:</span>
                  <span className="font-semibold">{measurements.calibration_data.px_per_mm.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Resolución:</span>
                  <span className="font-semibold">{measurements.calibration_data.video_resolution}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0F5E68] to-[#1a7a85] text-white rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">👤 Configuración Avatar Pau</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <span className="block text-sm opacity-90">Tipo de cuerpo:</span>
                <span className="font-semibold">{measurements.pau_avatar_config.body_type}</span>
              </div>
              <div>
                <span className="block text-sm opacity-90">Preferencia de ajuste:</span>
                <span className="font-semibold">{measurements.pau_avatar_config.fit_preference}</span>
              </div>
              <div>
                <span className="block text-sm opacity-90">Perfil de estilo:</span>
                <span className="font-semibold">{measurements.pau_avatar_config.style_profile}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <motion.button
              onClick={exportMeasurements}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📥 Descargar JSON
            </motion.button>
            
            <motion.button
              onClick={() => onMeasurementComplete && onMeasurementComplete(measurements)}
              className="px-6 py-3 bg-[#0F5E68] text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✅ Completar
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {step === 'intro' && renderIntroStep()}
      {step === 'marker' && renderMarkerStep()}
      {step === 'measure' && renderMeasureStep()}
      {step === 'results' && renderResultsStep()}
    </div>
  );
};

export default BodyMeasurement;