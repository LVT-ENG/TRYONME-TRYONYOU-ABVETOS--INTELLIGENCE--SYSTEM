// ═══════════════════════════════════════════════════════════════════
// QR CODE GENERATOR & IMAGE SANITIZER V9.0
// Patent PCT/EP2025/067317 — TryOnYou Intelligence System
// Version 9.0 "L'Ajustement Parfait"
//
// Issue #1871: Elena Grandini - Galeries Lafayette Paris Haussmann
// Módulo de generación de QR + Exportación de imágenes sin datos sensibles
//
// Funcionalidad:
// 1. Generar QR codes para reserva en cabina física
// 2. Exportar imágenes limpias (sin datos biométricos)
// 3. Zero-Display compliance: Sin números sensibles
// ═══════════════════════════════════════════════════════════════════

/**
 * Genera un código QR usando API pública de qrcode
 * Retorna la URL del QR generado
 */
export function generateQRCode(data) {
  // Usando API de qrcode.show (sin dependencias externas)
  const encoded = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
}

/**
 * Genera datos de reserva para QR
 * Incluye solo: producto, horma, timestamp (sin datos biométricos)
 */
export function createReservationQR(data) {
  const reservationPayload = {
    product: data.productName,
    designer: data.designer,
    horma: data.horma,
    timestamp: data.timestamp,
    location: data.location,
    fit: data.fitQuality,
    // NO incluimos datos biométricos
  };

  const jsonData = JSON.stringify(reservationPayload);
  return generateQRCode(jsonData);
}

/**
 * Sanitiza datos para compartir en redes sociales
 * Elimina cualquier dato sensible (biométricos, etc.)
 */
export function sanitizeForSharing(productData, includeMetadata = false) {
  return {
    productName: productData.name,
    designer: productData.designer,
    fabric: productData.fabric || productData.material,
    // Solo etiquetas cualitativas, NO fitScore numérico
    fitLabel: productData.fitScore >= 95 
      ? "L'Ajustement Parfait" 
      : productData.fitScore >= 85 
      ? "Excellent Fit" 
      : "Made-to-Measure",
    pauMessage: includeMetadata ? productData.pauLine?.fr : undefined,
    timestamp: Date.now(),
  };
}

/**
 * Genera una URL para compartir en redes sociales
 * Datos totalmente limpios y Zero-Display compliant
 */
export function generateShareURL(imageData, platform = 'whatsapp') {
  const baseText = `✨ ${imageData.productName} by ${imageData.designer} - ${imageData.fitLabel} ✨`;
  const hashtags = 'TryOnYou,GaleriesLafayette,FashionTech';
  
  switch (platform) {
    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(baseText)}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(baseText)}&hashtags=${hashtags}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(baseText)}`;
    case 'instagram':
      // Instagram no permite compartir por URL directamente
      // Retornamos el texto para clipboard
      return `clipboard:${baseText}`;
    default:
      return `https://wa.me/?text=${encodeURIComponent(baseText)}`;
  }
}

/**
 * Copia texto al portapapeles (para compartir)
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback para navegadores antiguos
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    return false;
  }
}

/**
 * Descarga QR code como imagen
 */
export function downloadQRCode(qrURL, filename = 'reservation-qr.png') {
  const link = document.createElement('a');
  link.href = qrURL;
  link.download = filename;
  link.click();
}

export default {
  generateQRCode,
  createReservationQR,
  sanitizeForSharing,
  generateShareURL,
  copyToClipboard,
  downloadQRCode,
};
