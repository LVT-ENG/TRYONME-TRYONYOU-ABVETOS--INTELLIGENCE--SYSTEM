/**
 * Unit Tests for PAU-CHECK Validation System
 * 
 * Tests cover all three validation steps:
 * - Identity (baoClient)
 * - Beauty (beautyClient)
 * - Dignity (dignityClient)
 * 
 * Includes pass/fail scenarios and edge cases
 */

import { describe, it, expect } from 'vitest';
import { baoClient, beautyClient, dignityClient, runPauCheck } from './pauCheck.js';

describe('PAU-CHECK Validation System', () => {
  
  // ============================================================================
  // IDENTITY VALIDATION (baoClient) TESTS
  // ============================================================================
  
  describe('baoClient - Identity Validation', () => {
    
    describe('Success Scenarios', () => {
      it('should pass validation with valid identity data', async () => {
        const validIdentity = {
          userId: 'user123',
          biometricData: '1234567890abcdef'
        };
        
        const result = await baoClient.validate(validIdentity);
        
        expect(result.valid).toBe(true);
        expect(result.reason).toBeUndefined();
      });

      it('should pass with minimal valid data', async () => {
        const minimalIdentity = {
          userId: 'abc',
          biometricData: '0123456789'
        };
        
        const result = await baoClient.validate(minimalIdentity);
        
        expect(result.valid).toBe(true);
      });
    });

    describe('Failure Scenarios', () => {
      it('should fail when identity data is null', async () => {
        const result = await baoClient.validate(null);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Identity data is required');
      });

      it('should fail when identity data is undefined', async () => {
        const result = await baoClient.validate(undefined);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Identity data is required');
      });

      it('should fail when userId is missing', async () => {
        const invalidIdentity = {
          biometricData: '1234567890abcdef'
        };
        
        const result = await baoClient.validate(invalidIdentity);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('User ID is required');
      });

      it('should fail when biometricData is missing', async () => {
        const invalidIdentity = {
          userId: 'user123'
        };
        
        const result = await baoClient.validate(invalidIdentity);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Biometric data is required');
      });

      it('should fail when userId is too short', async () => {
        const invalidIdentity = {
          userId: 'ab',
          biometricData: '1234567890abcdef'
        };
        
        const result = await baoClient.validate(invalidIdentity);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('User ID must be at least 3 characters');
      });

      it('should fail when biometricData is too short', async () => {
        const invalidIdentity = {
          userId: 'user123',
          biometricData: '123'
        };
        
        const result = await baoClient.validate(invalidIdentity);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Invalid biometric data format');
      });
    });

    describe('Edge Cases', () => {
      it('should fail with empty object', async () => {
        const result = await baoClient.validate({});
        
        expect(result.valid).toBe(false);
      });

      it('should fail with empty strings', async () => {
        const emptyIdentity = {
          userId: '',
          biometricData: ''
        };
        
        const result = await baoClient.validate(emptyIdentity);
        
        expect(result.valid).toBe(false);
      });

      it('should handle whitespace in userId', async () => {
        const identity = {
          userId: '   ',
          biometricData: '1234567890abcdef'
        };
        
        const result = await baoClient.validate(identity);
        
        expect(result.valid).toBe(false);
      });
    });
  });

  // ============================================================================
  // BEAUTY VALIDATION (beautyClient) TESTS
  // ============================================================================
  
  describe('beautyClient - Beauty Validation', () => {
    
    describe('Success Scenarios', () => {
      it('should pass validation with valid aesthetic data', async () => {
        const validAesthetics = {
          style: 'elegant',
          eleganceScore: 75
        };
        
        const result = await beautyClient.validate(validAesthetics);
        
        expect(result.valid).toBe(true);
        expect(result.reason).toBeUndefined();
      });

      it('should pass with minimum acceptable elegance score', async () => {
        const aesthetics = {
          style: 'casual',
          eleganceScore: 50
        };
        
        const result = await beautyClient.validate(aesthetics);
        
        expect(result.valid).toBe(true);
      });

      it('should pass with maximum elegance score', async () => {
        const aesthetics = {
          style: 'luxury',
          eleganceScore: 100
        };
        
        const result = await beautyClient.validate(aesthetics);
        
        expect(result.valid).toBe(true);
      });
    });

    describe('Failure Scenarios', () => {
      it('should fail when aesthetic data is null', async () => {
        const result = await beautyClient.validate(null);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Aesthetic data is required');
      });

      it('should fail when aesthetic data is undefined', async () => {
        const result = await beautyClient.validate(undefined);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Aesthetic data is required');
      });

      it('should fail when style is missing', async () => {
        const invalidAesthetics = {
          eleganceScore: 75
        };
        
        const result = await beautyClient.validate(invalidAesthetics);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Style preference is required');
      });

      it('should fail when eleganceScore is missing', async () => {
        const invalidAesthetics = {
          style: 'elegant'
        };
        
        const result = await beautyClient.validate(invalidAesthetics);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Elegance score is required');
      });

      it('should fail when eleganceScore is below 0', async () => {
        const invalidAesthetics = {
          style: 'elegant',
          eleganceScore: -1
        };
        
        const result = await beautyClient.validate(invalidAesthetics);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Elegance score must be between 0 and 100');
      });

      it('should fail when eleganceScore is above 100', async () => {
        const invalidAesthetics = {
          style: 'elegant',
          eleganceScore: 101
        };
        
        const result = await beautyClient.validate(invalidAesthetics);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Elegance score must be between 0 and 100');
      });

      it('should fail when eleganceScore is below minimum threshold', async () => {
        const invalidAesthetics = {
          style: 'casual',
          eleganceScore: 49
        };
        
        const result = await beautyClient.validate(invalidAesthetics);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Elegance score below minimum threshold');
      });
    });

    describe('Edge Cases', () => {
      it('should fail with empty object', async () => {
        const result = await beautyClient.validate({});
        
        expect(result.valid).toBe(false);
      });

      it('should handle eleganceScore of 0', async () => {
        const aesthetics = {
          style: 'basic',
          eleganceScore: 0
        };
        
        const result = await beautyClient.validate(aesthetics);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Elegance score below minimum threshold');
      });

      it('should handle null eleganceScore', async () => {
        const aesthetics = {
          style: 'elegant',
          eleganceScore: null
        };
        
        const result = await beautyClient.validate(aesthetics);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Elegance score is required');
      });
    });
  });

  // ============================================================================
  // DIGNITY VALIDATION (dignityClient) TESTS
  // ============================================================================
  
  describe('dignityClient - Dignity Validation', () => {
    
    describe('Success Scenarios', () => {
      it('should pass validation with valid ethical data', async () => {
        const validEthical = {
          consentGiven: true,
          privacyLevel: 'private'
        };
        
        const result = await dignityClient.validate(validEthical);
        
        expect(result.valid).toBe(true);
        expect(result.reason).toBeUndefined();
      });

      it('should pass with public privacy level', async () => {
        const ethical = {
          consentGiven: true,
          privacyLevel: 'public'
        };
        
        const result = await dignityClient.validate(ethical);
        
        expect(result.valid).toBe(true);
      });

      it('should pass with anonymous privacy level', async () => {
        const ethical = {
          consentGiven: true,
          privacyLevel: 'anonymous'
        };
        
        const result = await dignityClient.validate(ethical);
        
        expect(result.valid).toBe(true);
      });
    });

    describe('Failure Scenarios', () => {
      it('should fail when ethical data is null', async () => {
        const result = await dignityClient.validate(null);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Ethical data is required');
      });

      it('should fail when ethical data is undefined', async () => {
        const result = await dignityClient.validate(undefined);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Ethical data is required');
      });

      it('should fail when consentGiven is missing', async () => {
        const invalidEthical = {
          privacyLevel: 'private'
        };
        
        const result = await dignityClient.validate(invalidEthical);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Consent status is required');
      });

      it('should fail when consent is false', async () => {
        const invalidEthical = {
          consentGiven: false,
          privacyLevel: 'private'
        };
        
        const result = await dignityClient.validate(invalidEthical);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('User consent is required');
      });

      it('should fail when privacyLevel is missing', async () => {
        const invalidEthical = {
          consentGiven: true
        };
        
        const result = await dignityClient.validate(invalidEthical);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Privacy level is required');
      });

      it('should fail when privacyLevel is invalid', async () => {
        const invalidEthical = {
          consentGiven: true,
          privacyLevel: 'invalid-level'
        };
        
        const result = await dignityClient.validate(invalidEthical);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Invalid privacy level');
      });
    });

    describe('Edge Cases', () => {
      it('should fail with empty object', async () => {
        const result = await dignityClient.validate({});
        
        expect(result.valid).toBe(false);
      });

      it('should handle null consentGiven', async () => {
        const ethical = {
          consentGiven: null,
          privacyLevel: 'private'
        };
        
        const result = await dignityClient.validate(ethical);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Consent status is required');
      });

      it('should handle empty string for privacyLevel', async () => {
        const ethical = {
          consentGiven: true,
          privacyLevel: ''
        };
        
        const result = await dignityClient.validate(ethical);
        
        expect(result.valid).toBe(false);
        expect(result.reason).toBe('Privacy level is required');
      });
    });
  });

  // ============================================================================
  // INTEGRATED runPauCheck TESTS
  // ============================================================================
  
  describe('runPauCheck - Integrated Validation', () => {
    
    describe('Success Scenarios', () => {
      it('should pass when all validations succeed', async () => {
        const validCheckData = {
          identity: {
            userId: 'user123',
            biometricData: '1234567890abcdef'
          },
          aesthetics: {
            style: 'elegant',
            eleganceScore: 80
          },
          ethical: {
            consentGiven: true,
            privacyLevel: 'private'
          }
        };
        
        const result = await runPauCheck(validCheckData);
        
        expect(result.success).toBe(true);
        expect(result.results.identity.valid).toBe(true);
        expect(result.results.beauty.valid).toBe(true);
        expect(result.results.dignity.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should provide detailed results for each validation step', async () => {
        const validCheckData = {
          identity: {
            userId: 'testuser',
            biometricData: 'validbiometricdata123'
          },
          aesthetics: {
            style: 'casual',
            eleganceScore: 65
          },
          ethical: {
            consentGiven: true,
            privacyLevel: 'anonymous'
          }
        };
        
        const result = await runPauCheck(validCheckData);
        
        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('results');
        expect(result).toHaveProperty('errors');
        expect(result.results).toHaveProperty('identity');
        expect(result.results).toHaveProperty('beauty');
        expect(result.results).toHaveProperty('dignity');
      });
    });

    describe('Failure Scenarios - Individual Validations', () => {
      it('should fail when identity validation fails', async () => {
        const checkData = {
          identity: {
            userId: 'ab', // Too short
            biometricData: '1234567890abcdef'
          },
          aesthetics: {
            style: 'elegant',
            eleganceScore: 80
          },
          ethical: {
            consentGiven: true,
            privacyLevel: 'private'
          }
        };
        
        const result = await runPauCheck(checkData);
        
        expect(result.success).toBe(false);
        expect(result.results.identity.valid).toBe(false);
        expect(result.results.beauty.valid).toBe(true);
        expect(result.results.dignity.valid).toBe(true);
        expect(result.errors).toContain('Identity: User ID must be at least 3 characters');
      });

      it('should fail when beauty validation fails', async () => {
        const checkData = {
          identity: {
            userId: 'user123',
            biometricData: '1234567890abcdef'
          },
          aesthetics: {
            style: 'elegant',
            eleganceScore: 30 // Below threshold
          },
          ethical: {
            consentGiven: true,
            privacyLevel: 'private'
          }
        };
        
        const result = await runPauCheck(checkData);
        
        expect(result.success).toBe(false);
        expect(result.results.identity.valid).toBe(true);
        expect(result.results.beauty.valid).toBe(false);
        expect(result.results.dignity.valid).toBe(true);
        expect(result.errors).toContain('Beauty: Elegance score below minimum threshold');
      });

      it('should fail when dignity validation fails', async () => {
        const checkData = {
          identity: {
            userId: 'user123',
            biometricData: '1234567890abcdef'
          },
          aesthetics: {
            style: 'elegant',
            eleganceScore: 80
          },
          ethical: {
            consentGiven: false, // Consent not given
            privacyLevel: 'private'
          }
        };
        
        const result = await runPauCheck(checkData);
        
        expect(result.success).toBe(false);
        expect(result.results.identity.valid).toBe(true);
        expect(result.results.beauty.valid).toBe(true);
        expect(result.results.dignity.valid).toBe(false);
        expect(result.errors).toContain('Dignity: User consent is required');
      });
    });

    describe('Failure Scenarios - Multiple Validations', () => {
      it('should fail when multiple validations fail', async () => {
        const checkData = {
          identity: {
            userId: 'ab', // Too short
            biometricData: '1234567890abcdef'
          },
          aesthetics: {
            style: 'elegant',
            eleganceScore: 30 // Below threshold
          },
          ethical: {
            consentGiven: true,
            privacyLevel: 'private'
          }
        };
        
        const result = await runPauCheck(checkData);
        
        expect(result.success).toBe(false);
        expect(result.results.identity.valid).toBe(false);
        expect(result.results.beauty.valid).toBe(false);
        expect(result.results.dignity.valid).toBe(true);
        expect(result.errors.length).toBeGreaterThan(1);
      });

      it('should fail when all validations fail', async () => {
        const checkData = {
          identity: {
            userId: '', // Empty
            biometricData: ''
          },
          aesthetics: {
            style: '',
            eleganceScore: -5 // Invalid
          },
          ethical: {
            consentGiven: false,
            privacyLevel: 'invalid'
          }
        };
        
        const result = await runPauCheck(checkData);
        
        expect(result.success).toBe(false);
        expect(result.results.identity.valid).toBe(false);
        expect(result.results.beauty.valid).toBe(false);
        expect(result.results.dignity.valid).toBe(false);
        expect(result.errors.length).toBe(3);
      });
    });

    describe('Edge Cases', () => {
      it('should fail when checkData is null', async () => {
        const result = await runPauCheck(null);
        
        expect(result.success).toBe(false);
        expect(result.errors).toContain('Check data is required');
      });

      it('should fail when checkData is undefined', async () => {
        const result = await runPauCheck(undefined);
        
        expect(result.success).toBe(false);
        expect(result.errors).toContain('Check data is required');
      });

      it('should handle empty checkData object', async () => {
        const result = await runPauCheck({});
        
        expect(result.success).toBe(false);
        expect(result.results.identity.valid).toBe(false);
        expect(result.results.beauty.valid).toBe(false);
        expect(result.results.dignity.valid).toBe(false);
      });

      it('should handle partial checkData with missing sections', async () => {
        const checkData = {
          identity: {
            userId: 'user123',
            biometricData: '1234567890abcdef'
          }
          // Missing aesthetics and ethical
        };
        
        const result = await runPauCheck(checkData);
        
        expect(result.success).toBe(false);
        expect(result.results.identity.valid).toBe(true);
        expect(result.results.beauty.valid).toBe(false);
        expect(result.results.dignity.valid).toBe(false);
      });

      it('should continue validation even if one step fails', async () => {
        const checkData = {
          identity: null, // Will fail
          aesthetics: {
            style: 'elegant',
            eleganceScore: 80
          },
          ethical: {
            consentGiven: true,
            privacyLevel: 'private'
          }
        };
        
        const result = await runPauCheck(checkData);
        
        expect(result.success).toBe(false);
        expect(result.results.identity).toBeDefined();
        expect(result.results.beauty).toBeDefined();
        expect(result.results.dignity).toBeDefined();
        expect(result.results.beauty.valid).toBe(true);
        expect(result.results.dignity.valid).toBe(true);
      });
    });

    describe('Error Handling', () => {
      it('should handle validation errors gracefully', async () => {
        const checkData = {
          identity: { userId: 'u', biometricData: 'b' },
          aesthetics: { style: 's', eleganceScore: 200 },
          ethical: { consentGiven: false, privacyLevel: 'wrong' }
        };
        
        const result = await runPauCheck(checkData);
        
        expect(result).toHaveProperty('success', false);
        expect(result).toHaveProperty('results');
        expect(result).toHaveProperty('errors');
        expect(Array.isArray(result.errors)).toBe(true);
      });

      it('should collect all error messages', async () => {
        const checkData = {
          identity: { userId: 'ab', biometricData: '123' },
          aesthetics: { style: 'test', eleganceScore: 20 },
          ethical: { consentGiven: false, privacyLevel: 'test' }
        };
        
        const result = await runPauCheck(checkData);
        
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors.some(e => e.includes('Identity'))).toBe(true);
        expect(result.errors.some(e => e.includes('Beauty'))).toBe(true);
        expect(result.errors.some(e => e.includes('Dignity'))).toBe(true);
      });
    });
  });
});
