/**
 * Voice and Ocular challenge routes for additional biometric verification
 */

const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { 
  saveChallengeAttempt, 
  getChallengeById, 
  getUserByEmail,
  logBiometricAttempt 
} = require('../utils/database');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'voiceRecording') {
      // Accept audio files
      if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
      } else {
        cb(new Error('Only audio files are allowed for voice recording'));
      }
    } else if (file.fieldname === 'ocularImage') {
      // Accept image files
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for ocular scan'));
      }
    } else {
      cb(new Error('Unknown file field'));
    }
  }
});

// Generate voice challenge phrase
function generateVoicePhrase() {
  const phrases = [
    "AVBET secure payment authorization",
    "Biometric verification for transaction",
    "Voice authentication enabled",
    "Authorize payment with voice signature",
    "AVBET voice verification active",
    "Secure transaction voice confirmation",
    "Biometric voice pattern recognition",
    "AVBET payment voice authorization"
  ];
  
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  const timestamp = new Date().toLocaleTimeString();
  const uniqueNumber = Math.floor(Math.random() * 9999);
  
  return `${randomPhrase} - ${timestamp} - ${uniqueNumber}`;
}

// Start voice challenge
router.post('/voice/start', async (req, res) => {
  try {
    const { email, paymentId } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Missing email',
        message: 'Email is required'
      });
    }

    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User not found'
      });
    }

    // Generate challenge
    const challengeId = uuidv4();
    const phrase = generateVoicePhrase();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save challenge
    await saveChallengeAttempt({
      id: challengeId,
      userId: user.id,
      type: 'voice',
      phrase,
      status: 'pending',
      expiresAt: expiresAt.toISOString(),
      paymentId: paymentId || null
    });

    // Log challenge start
    await logBiometricAttempt({
      userId: user.id,
      type: 'voice_challenge_start',
      success: true,
      metadata: { challengeId, paymentId }
    });

    res.json({
      success: true,
      data: {
        challengeId,
        phrase,
        expiresAt: expiresAt.toISOString(),
        instructions: [
          "Please record yourself saying the phrase clearly",
          "Speak in a normal voice and pace",
          "Ensure you are in a quiet environment",
          "The recording should be 3-10 seconds long"
        ]
      }
    });
  } catch (error) {
    console.error('Voice challenge start error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to start voice challenge'
    });
  }
});

// Verify voice challenge
router.post('/voice/verify', upload.single('voiceRecording'), async (req, res) => {
  try {
    const { challengeId } = req.body;
    const voiceFile = req.file;

    if (!challengeId || !voiceFile) {
      return res.status(400).json({
        error: 'Missing data',
        message: 'Challenge ID and voice recording are required'
      });
    }

    // Get challenge
    const challenge = await getChallengeById(challengeId);
    if (!challenge) {
      return res.status(404).json({
        error: 'Challenge not found',
        message: 'Voice challenge not found'
      });
    }

    // Check if challenge has expired
    if (new Date() > new Date(challenge.expiresAt)) {
      await saveChallengeAttempt({
        id: challengeId,
        status: 'expired'
      });

      await logBiometricAttempt({
        userId: challenge.userId,
        type: 'voice_challenge_verify',
        success: false,
        error: 'Challenge expired',
        metadata: { challengeId }
      });

      return res.status(400).json({
        error: 'Challenge expired',
        message: 'Voice challenge has expired, please start a new one'
      });
    }

    // Mock voice verification (in production, use actual voice recognition)
    const mockVerificationResult = mockVoiceVerification(voiceFile, challenge.phrase);

    if (mockVerificationResult.success) {
      // Update challenge status
      await saveChallengeAttempt({
        id: challengeId,
        status: 'verified',
        verifiedAt: new Date().toISOString(),
        confidence: mockVerificationResult.confidence,
        audioMetadata: JSON.stringify({
          duration: mockVerificationResult.duration,
          format: voiceFile.mimetype,
          size: voiceFile.size
        })
      });

      // Log successful verification
      await logBiometricAttempt({
        userId: challenge.userId,
        type: 'voice_challenge_verify',
        success: true,
        metadata: { 
          challengeId, 
          confidence: mockVerificationResult.confidence,
          duration: mockVerificationResult.duration
        }
      });

      res.json({
        success: true,
        data: {
          challengeId,
          verified: true,
          confidence: mockVerificationResult.confidence,
          message: 'Voice verification successful'
        }
      });
    } else {
      // Update challenge status
      await saveChallengeAttempt({
        id: challengeId,
        status: 'failed',
        verifiedAt: new Date().toISOString(),
        confidence: mockVerificationResult.confidence,
        error: mockVerificationResult.error
      });

      // Log failed verification
      await logBiometricAttempt({
        userId: challenge.userId,
        type: 'voice_challenge_verify',
        success: false,
        error: mockVerificationResult.error,
        metadata: { challengeId, confidence: mockVerificationResult.confidence }
      });

      res.status(400).json({
        error: 'Verification failed',
        message: mockVerificationResult.error
      });
    }
  } catch (error) {
    console.error('Voice challenge verify error:', error);
    
    // Log error
    if (req.body.challengeId) {
      try {
        const challenge = await getChallengeById(req.body.challengeId);
        if (challenge) {
          await logBiometricAttempt({
            userId: challenge.userId,
            type: 'voice_challenge_verify',
            success: false,
            error: error.message,
            metadata: { challengeId: req.body.challengeId }
          });
        }
      } catch (logError) {
        console.error('Error logging voice challenge attempt:', logError);
      }
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to verify voice challenge'
    });
  }
});

// Start ocular challenge
router.post('/ocular/start', async (req, res) => {
  try {
    const { email, paymentId } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Missing email',
        message: 'Email is required'
      });
    }

    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User not found'
      });
    }

    // Generate challenge
    const challengeId = uuidv4();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save challenge
    await saveChallengeAttempt({
      id: challengeId,
      userId: user.id,
      type: 'ocular',
      status: 'pending',
      expiresAt: expiresAt.toISOString(),
      paymentId: paymentId || null
    });

    // Log challenge start
    await logBiometricAttempt({
      userId: user.id,
      type: 'ocular_challenge_start',
      success: true,
      metadata: { challengeId, paymentId }
    });

    res.json({
      success: true,
      data: {
        challengeId,
        expiresAt: expiresAt.toISOString(),
        instructions: [
          "Position your eyes 12-18 inches from the camera",
          "Look directly at the camera lens",
          "Ensure good lighting on your face",
          "Keep your eyes open and steady",
          "Take a clear photo when ready"
        ]
      }
    });
  } catch (error) {
    console.error('Ocular challenge start error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to start ocular challenge'
    });
  }
});

// Verify ocular challenge
router.post('/ocular/verify', upload.single('ocularImage'), async (req, res) => {
  try {
    const { challengeId } = req.body;
    const imageFile = req.file;

    if (!challengeId || !imageFile) {
      return res.status(400).json({
        error: 'Missing data',
        message: 'Challenge ID and ocular image are required'
      });
    }

    // Get challenge
    const challenge = await getChallengeById(challengeId);
    if (!challenge) {
      return res.status(404).json({
        error: 'Challenge not found',
        message: 'Ocular challenge not found'
      });
    }

    // Check if challenge has expired
    if (new Date() > new Date(challenge.expiresAt)) {
      await saveChallengeAttempt({
        id: challengeId,
        status: 'expired'
      });

      await logBiometricAttempt({
        userId: challenge.userId,
        type: 'ocular_challenge_verify',
        success: false,
        error: 'Challenge expired',
        metadata: { challengeId }
      });

      return res.status(400).json({
        error: 'Challenge expired',
        message: 'Ocular challenge has expired, please start a new one'
      });
    }

    // Mock ocular verification (in production, use actual biometric recognition)
    const mockVerificationResult = mockOcularVerification(imageFile);

    if (mockVerificationResult.success) {
      // Update challenge status
      await saveChallengeAttempt({
        id: challengeId,
        status: 'verified',
        verifiedAt: new Date().toISOString(),
        confidence: mockVerificationResult.confidence,
        audioMetadata: JSON.stringify({
          format: imageFile.mimetype,
          size: imageFile.size,
          features: mockVerificationResult.features
        })
      });

      // Log successful verification
      await logBiometricAttempt({
        userId: challenge.userId,
        type: 'ocular_challenge_verify',
        success: true,
        metadata: { 
          challengeId, 
          confidence: mockVerificationResult.confidence,
          features: mockVerificationResult.features
        }
      });

      res.json({
        success: true,
        data: {
          challengeId,
          verified: true,
          confidence: mockVerificationResult.confidence,
          features: mockVerificationResult.features,
          message: 'Ocular verification successful'
        }
      });
    } else {
      // Update challenge status
      await saveChallengeAttempt({
        id: challengeId,
        status: 'failed',
        verifiedAt: new Date().toISOString(),
        confidence: mockVerificationResult.confidence,
        error: mockVerificationResult.error
      });

      // Log failed verification
      await logBiometricAttempt({
        userId: challenge.userId,
        type: 'ocular_challenge_verify',
        success: false,
        error: mockVerificationResult.error,
        metadata: { challengeId, confidence: mockVerificationResult.confidence }
      });

      res.status(400).json({
        error: 'Verification failed',
        message: mockVerificationResult.error
      });
    }
  } catch (error) {
    console.error('Ocular challenge verify error:', error);
    
    // Log error
    if (req.body.challengeId) {
      try {
        const challenge = await getChallengeById(req.body.challengeId);
        if (challenge) {
          await logBiometricAttempt({
            userId: challenge.userId,
            type: 'ocular_challenge_verify',
            success: false,
            error: error.message,
            metadata: { challengeId: req.body.challengeId }
          });
        }
      } catch (logError) {
        console.error('Error logging ocular challenge attempt:', logError);
      }
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to verify ocular challenge'
    });
  }
});

// Get challenge status
router.get('/status/:challengeId', async (req, res) => {
  try {
    const { challengeId } = req.params;

    const challenge = await getChallengeById(challengeId);
    if (!challenge) {
      return res.status(404).json({
        error: 'Challenge not found',
        message: 'Challenge not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: challenge.id,
        type: challenge.type,
        status: challenge.status,
        phrase: challenge.phrase, // Only for voice challenges
        confidence: challenge.confidence,
        createdAt: challenge.createdAt,
        expiresAt: challenge.expiresAt,
        verifiedAt: challenge.verifiedAt
      }
    });
  } catch (error) {
    console.error('Get challenge status error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to get challenge status'
    });
  }
});

// Mock voice verification function
function mockVoiceVerification(audioFile, expectedPhrase) {
  // Simulate voice processing
  const duration = Math.random() * 7 + 3; // 3-10 seconds
  const confidence = Math.random() * 30 + 70; // 70-100%
  
  // Simple validation based on file properties
  if (audioFile.size < 1000) {
    return {
      success: false,
      confidence: 0,
      duration,
      error: 'Audio file too short'
    };
  }
  
  if (audioFile.size > 5 * 1024 * 1024) {
    return {
      success: false,
      confidence: 0,
      duration,
      error: 'Audio file too long'
    };
  }
  
  // Mock success based on confidence threshold
  return {
    success: confidence > 75,
    confidence: Math.round(confidence),
    duration: Math.round(duration * 10) / 10,
    error: confidence <= 75 ? 'Voice pattern did not match sufficiently' : null
  };
}

// Mock ocular verification function
function mockOcularVerification(imageFile) {
  // Simulate ocular processing
  const confidence = Math.random() * 40 + 60; // 60-100%
  const features = {
    eyeDistance: Math.round(Math.random() * 10 + 60), // 60-70mm
    irisPattern: `pattern_${Math.floor(Math.random() * 1000)}`,
    quality: Math.round(Math.random() * 30 + 70) // 70-100%
  };
  
  // Simple validation based on file properties
  if (imageFile.size < 10000) {
    return {
      success: false,
      confidence: 0,
      features: null,
      error: 'Image quality too low'
    };
  }
  
  if (imageFile.size > 8 * 1024 * 1024) {
    return {
      success: false,
      confidence: 0,
      features: null,
      error: 'Image file too large'
    };
  }
  
  // Mock success based on confidence and quality
  const success = confidence > 80 && features.quality > 75;
  
  return {
    success,
    confidence: Math.round(confidence),
    features: success ? features : null,
    error: !success ? 'Ocular pattern recognition failed' : null
  };
}

module.exports = router;