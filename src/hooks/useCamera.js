/**
 * TRYONYOU Camera Management Hook
 * Patent: PCT/EP2025/067317
 * 
 * Handles camera permissions, stream lifecycle, and device selection
 * for biometric capture and AR try-on experiences.
 * 
 * @module hooks/useCamera
 * @copyright 2025 TRYONYOU - ABVETOS Intelligence System
 */

import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for camera management
 * Handles device permissions, stream lifecycle, and error handling
 */
export function useCamera() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  /**
   * Get available video devices
   */
  const getDevices = async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceList.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      return videoDevices;
    } catch (err) {
      console.error('Error enumerating devices:', err);
      return [];
    }
  };

  /**
   * Start camera stream
   */
  const startCamera = async (facingMode = 'user') => {
    try {
      setError(null);
      
      const constraints = {
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsActive(true);
      console.log('📷 Camera started successfully');
      return stream;
    } catch (err) {
      const errorMessages = {
        'NotAllowedError': 'Acceso a la cámara denegado. Por favor, permite el acceso en la configuración de tu navegador.',
        'NotFoundError': 'No se encontró ninguna cámara. Verifica que tu dispositivo tenga una cámara conectada.',
        'NotReadableError': 'La cámara está siendo usada por otra aplicación.',
        'OverconstrainedError': 'No se pudo satisfacer los requisitos de la cámara.',
      };

      const message = errorMessages[err.name] || `Error al acceder a la cámara: ${err.message}`;
      setError(message);
      console.error('Camera error:', err);
      throw new Error(message);
    }
  };

  /**
   * Stop camera stream
   */
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log(`🛑 Stopped track: ${track.kind}`);
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsActive(false);
    console.log('📷 Camera stopped');
  };

  /**
   * Capture current frame as image
   */
  const captureFrame = () => {
    if (!videoRef.current) {
      throw new Error('Video reference not available');
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    
    return canvas.toDataURL('image/jpeg', 0.92);
  };

  /**
   * Switch between front and back camera
   */
  const switchCamera = async () => {
    const currentFacingMode = streamRef.current
      ?.getVideoTracks()[0]
      ?.getSettings()
      ?.facingMode || 'user';
    
    stopCamera();
    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    await startCamera(newFacingMode);
  };

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    isActive,
    error,
    devices,
    startCamera,
    stopCamera,
    captureFrame,
    switchCamera,
    getDevices,
  };
}
