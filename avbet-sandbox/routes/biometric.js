/**
 * Biometric authentication routes using WebAuthn
 */

const express = require('express');
const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse
} = require('@simplewebauthn/server');
const { v4: uuidv4 } = require('uuid');
const { 
  saveUser, 
  getUserByEmail, 
  saveAuthenticator, 
  getAuthenticatorsByUserId,
  logBiometricAttempt 
} = require('../utils/database');

const router = express.Router();

// WebAuthn configuration
const rpName = 'AVBET Biometric Sandbox';
const rpID = process.env.RP_ID || 'localhost';
const origin = process.env.ORIGIN || `http://localhost:3003`;

// Start WebAuthn registration
router.post('/register/begin', async (req, res) => {
  try {
    const { email, username } = req.body;
    
    if (!email || !username) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email and username are required'
      });
    }

    // Check if user already exists
    let user = await getUserByEmail(email);
    if (!user) {
      // Create new user
      const userId = uuidv4();
      await saveUser({
        id: userId,
        email,
        username,
        isVerified: false
      });
      user = { id: userId, email, username };
    }

    // Get existing authenticators for this user
    const userAuthenticators = await getAuthenticatorsByUserId(user.id);

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: Buffer.from(user.id),
      userName: email,
      userDisplayName: username,
      timeout: 60000,
      attestationType: 'none',
      excludeCredentials: userAuthenticators.map(authenticator => ({
        id: Buffer.from(authenticator.credentialID, 'base64'),
        type: 'public-key',
        transports: authenticator.transports ? JSON.parse(authenticator.transports) : []
      })),
      authenticatorSelection: {
        residentKey: 'discouraged',
        userVerification: 'preferred',
        authenticatorAttachment: 'platform' // Prefer platform authenticators (TouchID, FaceID)
      },
      supportedAlgorithmIDs: [-7, -257] // ES256, RS256
    });

    // Store challenge temporarily (in production, use Redis or session store)
    req.session = req.session || {};
    req.session.challenge = options.challenge;
    req.session.userId = user.id;

    // Log biometric attempt
    await logBiometricAttempt({
      userId: user.id,
      type: 'webauthn_registration_start',
      success: true,
      metadata: { email, username }
    });

    res.json({
      success: true,
      data: {
        options,
        userId: user.id
      }
    });
  } catch (error) {
    console.error('WebAuthn registration start error:', error);
    
    // Log failed attempt
    if (req.body.email) {
      try {
        const user = await getUserByEmail(req.body.email);
        if (user) {
          await logBiometricAttempt({
            userId: user.id,
            type: 'webauthn_registration_start',
            success: false,
            error: error.message
          });
        }
      } catch (logError) {
        console.error('Error logging biometric attempt:', logError);
      }
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to start WebAuthn registration'
    });
  }
});

// Complete WebAuthn registration
router.post('/register/complete', async (req, res) => {
  try {
    const { credential, userId } = req.body;
    
    if (!credential || !userId) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Credential and userId are required'
      });
    }

    // Get user
    const user = await getUserByEmail(req.body.email) || { id: userId };
    
    // Verify the registration response
    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: req.session?.challenge || credential.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: true
    });

    if (verification.verified && verification.registrationInfo) {
      const { credentialID, credentialPublicKey, counter } = verification.registrationInfo;

      // Save the authenticator
      await saveAuthenticator({
        userId: user.id,
        credentialID: Buffer.from(credentialID).toString('base64'),
        credentialPublicKey: Buffer.from(credentialPublicKey).toString('base64'),
        counter,
        transports: credential.response.transports ? JSON.stringify(credential.response.transports) : null
      });

      // Update user verification status
      await saveUser({
        id: user.id,
        isVerified: true
      });

      // Log successful registration
      await logBiometricAttempt({
        userId: user.id,
        type: 'webauthn_registration_complete',
        success: true,
        metadata: { credentialID: Buffer.from(credentialID).toString('base64') }
      });

      res.json({
        success: true,
        data: {
          verified: true,
          message: 'WebAuthn registration completed successfully',
          userId: user.id
        }
      });
    } else {
      // Log failed registration
      await logBiometricAttempt({
        userId: user.id,
        type: 'webauthn_registration_complete',
        success: false,
        error: 'Verification failed'
      });

      res.status(400).json({
        error: 'Verification Failed',
        message: 'WebAuthn registration verification failed'
      });
    }
  } catch (error) {
    console.error('WebAuthn registration complete error:', error);
    
    // Log error
    if (req.body.userId) {
      await logBiometricAttempt({
        userId: req.body.userId,
        type: 'webauthn_registration_complete',
        success: false,
        error: error.message
      });
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to complete WebAuthn registration'
    });
  }
});

// Start WebAuthn authentication
router.post('/authenticate/begin', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email is required'
      });
    }

    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    // Get user's authenticators
    const userAuthenticators = await getAuthenticatorsByUserId(user.id);
    
    if (userAuthenticators.length === 0) {
      return res.status(400).json({
        error: 'No Authenticators',
        message: 'No authenticators registered for this user'
      });
    }

    const options = await generateAuthenticationOptions({
      timeout: 60000,
      allowCredentials: userAuthenticators.map(authenticator => ({
        id: Buffer.from(authenticator.credentialID, 'base64'),
        type: 'public-key',
        transports: authenticator.transports ? JSON.parse(authenticator.transports) : []
      })),
      userVerification: 'preferred',
      rpID
    });

    // Store challenge temporarily
    req.session = req.session || {};
    req.session.challenge = options.challenge;
    req.session.userId = user.id;

    // Log authentication start
    await logBiometricAttempt({
      userId: user.id,
      type: 'webauthn_authentication_start',
      success: true,
      metadata: { email }
    });

    res.json({
      success: true,
      data: {
        options,
        userId: user.id
      }
    });
  } catch (error) {
    console.error('WebAuthn authentication start error:', error);
    
    // Log failed attempt
    if (req.body.email) {
      try {
        const user = await getUserByEmail(req.body.email);
        if (user) {
          await logBiometricAttempt({
            userId: user.id,
            type: 'webauthn_authentication_start',
            success: false,
            error: error.message
          });
        }
      } catch (logError) {
        console.error('Error logging biometric attempt:', logError);
      }
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to start WebAuthn authentication'
    });
  }
});

// Complete WebAuthn authentication
router.post('/authenticate/complete', async (req, res) => {
  try {
    const { credential, email } = req.body;
    
    if (!credential || !email) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Credential and email are required'
      });
    }

    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    // Get the authenticator
    const userAuthenticators = await getAuthenticatorsByUserId(user.id);
    const authenticator = userAuthenticators.find(auth => 
      auth.credentialID === Buffer.from(credential.id, 'base64url').toString('base64')
    );

    if (!authenticator) {
      await logBiometricAttempt({
        userId: user.id,
        type: 'webauthn_authentication_complete',
        success: false,
        error: 'Authenticator not found'
      });

      return res.status(400).json({
        error: 'Authenticator Not Found',
        message: 'Authenticator not registered for this user'
      });
    }

    // Verify the authentication response
    const verification = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge: req.session?.challenge || credential.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: {
        credentialID: Buffer.from(authenticator.credentialID, 'base64'),
        credentialPublicKey: Buffer.from(authenticator.credentialPublicKey, 'base64'),
        counter: authenticator.counter
      },
      requireUserVerification: true
    });

    if (verification.verified) {
      // Update authenticator counter
      await saveAuthenticator({
        userId: user.id,
        credentialID: authenticator.credentialID,
        counter: verification.authenticationInfo.newCounter
      });

      // Generate session token (in production, use JWT or proper session management)
      const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

      // Log successful authentication
      await logBiometricAttempt({
        userId: user.id,
        type: 'webauthn_authentication_complete',
        success: true,
        metadata: { 
          credentialID: authenticator.credentialID,
          sessionToken: sessionToken.substring(0, 10) + '...'
        }
      });

      res.json({
        success: true,
        data: {
          verified: true,
          message: 'WebAuthn authentication successful',
          userId: user.id,
          sessionToken,
          user: {
            id: user.id,
            email: user.email,
            username: user.username
          }
        }
      });
    } else {
      // Log failed authentication
      await logBiometricAttempt({
        userId: user.id,
        type: 'webauthn_authentication_complete',
        success: false,
        error: 'Verification failed'
      });

      res.status(400).json({
        error: 'Verification Failed',
        message: 'WebAuthn authentication verification failed'
      });
    }
  } catch (error) {
    console.error('WebAuthn authentication complete error:', error);
    
    // Log error
    if (req.body.email) {
      try {
        const user = await getUserByEmail(req.body.email);
        if (user) {
          await logBiometricAttempt({
            userId: user.id,
            type: 'webauthn_authentication_complete',
            success: false,
            error: error.message
          });
        }
      } catch (logError) {
        console.error('Error logging biometric attempt:', logError);
      }
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to complete WebAuthn authentication'
    });
  }
});

// Get user biometric status
router.get('/status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await getUserByEmail(userId) || { id: userId };
    const authenticators = await getAuthenticatorsByUserId(user.id);

    res.json({
      success: true,
      data: {
        userId: user.id,
        isRegistered: authenticators.length > 0,
        authenticatorCount: authenticators.length,
        isVerified: user.isVerified || false,
        lastActivity: user.lastActivity || null
      }
    });
  } catch (error) {
    console.error('Get biometric status error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to get biometric status'
    });
  }
});

module.exports = router;