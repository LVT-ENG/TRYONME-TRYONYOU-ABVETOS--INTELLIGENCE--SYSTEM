/**
 * Gemini AI Service for biometric measurements analysis
 * Processes body photos with A4 paper reference to calculate measurements
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Warn if API key is missing in production
if (!GEMINI_API_KEY && import.meta.env.PROD) {
  console.warn('VITE_GEMINI_API_KEY is not set. Using mock data for measurements.');
}

/**
 * Converts image file to base64 string
 * @param {File} file - Image file to convert
 * @returns {Promise<string>} Base64 encoded image
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Analyzes hand on A4 paper for calibration
 * @param {File} imageFile - Image containing hand on A4 paper
 * @returns {Promise<Object>} Calibration data including scale factor
 */
export const analyzeHandCalibration = async (imageFile) => {
  if (!GEMINI_API_KEY) {
    // Mock response for development without API key
    return {
      success: true,
      calibrated: true,
      scaleFactor: 1.0,
      handDetected: true,
      paperDetected: true,
      confidence: 0.95,
      message: 'Hand and A4 paper detected successfully'
    };
  }

  try {
    const base64Image = await fileToBase64(imageFile);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: `Analyze this image for hand calibration. The image should contain a hand placed on an A4 paper (21cm x 29.7cm). 
              Please verify:
              1. Is an A4 paper visible in the image?
              2. Is a hand clearly placed on the paper?
              3. Are the paper edges visible for scale reference?
              
              Respond in JSON format with: 
              {
                "paperDetected": boolean,
                "handDetected": boolean,
                "calibrated": boolean,
                "scaleFactor": number (1.0 if successful),
                "confidence": number (0-1),
                "message": string
              }`
            },
            {
              inline_data: {
                mime_type: imageFile.type,
                data: base64Image
              }
            }
          ]
        }]
      })
    });

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Extract JSON from response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        success: true,
        ...result
      };
    }

    throw new Error('Invalid response format from Gemini API');
  } catch (error) {
    console.error('Hand calibration analysis error:', error);
    return {
      success: false,
      error: error.message,
      calibrated: false,
      message: 'Unable to analyze the hand calibration image. Please retake the photo making sure the A4 paper is fully visible and flat, your hand is clearly on top of it, the image is in focus (not blurry), and the scene is well lit, then try again.'
    };
  }
};

/**
 * Analyzes palm for verification and refinement
 * @param {File} imageFile - Image of open palm
 * @returns {Promise<Object>} Palm analysis data
 */
export const analyzePalmVerification = async (imageFile) => {
  if (!GEMINI_API_KEY) {
    // Mock response for development
    return {
      success: true,
      palmDetected: true,
      calibrationValid: true,
      handSize: 18.5, // cm
      confidence: 0.93,
      message: 'Palm verified successfully'
    };
  }

  try {
    const base64Image = await fileToBase64(imageFile);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: `Analyze this image of an open palm. Verify the palm is clearly visible and estimate hand size.
              
              Respond in JSON format with:
              {
                "palmDetected": boolean,
                "calibrationValid": boolean,
                "handSize": number (in cm, typical range 17-20),
                "confidence": number (0-1),
                "message": string
              }`
            },
            {
              inline_data: {
                mime_type: imageFile.type,
                data: base64Image
              }
            }
          ]
        }]
      })
    });

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        success: true,
        ...result
      };
    }

    throw new Error('Invalid response format from Gemini API');
  } catch (error) {
    console.error('Palm verification analysis error:', error);
    return {
      success: false,
      error: error.message,
      palmDetected: false,
      message: 'Failed to analyze palm'
    };
  }
};

/**
 * Processes body photos to extract measurements using A4 paper as reference
 * @param {Object} photos - Object containing frontPhoto, leftPhoto, rightPhoto (File objects)
 * @param {number} scaleFactor - Calibration scale factor from hand calibration
 * @returns {Promise<Object>} Body measurements
 */
export const analyzeBodyMeasurements = async (photos, scaleFactor = 1.0) => {
  if (!GEMINI_API_KEY) {
    // Mock response for development - using fixed values for consistent testing
    return {
      success: true,
      measurements: {
        height: 175,
        chest: 92,
        waist: 78,
        hips: 98,
        shoulders: 42,
        inseam: 80
      },
      confidence: 0.88,
      message: 'Body measurements calculated successfully'
    };
  }

  try {
    const frontBase64 = await fileToBase64(photos.frontPhoto);
    const leftBase64 = await fileToBase64(photos.leftPhoto);
    const rightBase64 = await fileToBase64(photos.rightPhoto);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: `Analyze these three body photos (front, left side, right side) to calculate body measurements.
              Use any visible A4 paper (21cm x 29.7cm) as a scale reference and the scale factor: ${scaleFactor}.
              
              Calculate and return measurements in centimeters:
              - Height (total body height)
              - Chest (circumference at widest part)
              - Waist (circumference at narrowest part)
              - Hips (circumference at widest part)
              - Shoulders (width across)
              - Inseam (inner leg length)
              
              Respond in JSON format:
              {
                "measurements": {
                  "height": number,
                  "chest": number,
                  "waist": number,
                  "hips": number,
                  "shoulders": number,
                  "inseam": number
                },
                "confidence": number (0-1),
                "message": string
              }`
            },
            {
              inline_data: {
                mime_type: photos.frontPhoto.type,
                data: frontBase64
              }
            },
            {
              inline_data: {
                mime_type: photos.leftPhoto.type,
                data: leftBase64
              }
            },
            {
              inline_data: {
                mime_type: photos.rightPhoto.type,
                data: rightBase64
              }
            }
          ]
        }]
      })
    });

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        success: true,
        ...result
      };
    }

    throw new Error('Invalid response format from Gemini API');
  } catch (error) {
    console.error('Body measurements analysis error:', error);
    return {
      success: false,
      error: error.message,
      measurements: null,
      message: 'Unable to analyze your body measurements from the photos provided. Please make sure all required photos (front, left, and right) clearly show your full body, that an A4 sheet of paper is fully visible and not covered, and that the images are well lit and not blurry, then try again.'
    };
  }
};

export default {
  analyzeHandCalibration,
  analyzePalmVerification,
  analyzeBodyMeasurements
};
