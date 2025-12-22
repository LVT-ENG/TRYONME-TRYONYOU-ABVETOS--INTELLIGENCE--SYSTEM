# PAU-CHECK Validation System - Tests

This directory contains comprehensive unit tests for the PAU-CHECK validation system.

## Overview

The PAU-CHECK system validates three critical aspects:
1. **Identity** (baoClient) - Validates user identity through biometric and credential checks
2. **Beauty** (beautyClient) - Validates aesthetic and presentation criteria
3. **Dignity** (dignityClient) - Validates ethical standards and user consent

## Test Coverage

The test suite includes **50 comprehensive tests** covering:

### Identity Validation (baoClient)
- ✅ Valid identity data
- ✅ Missing or invalid user IDs
- ✅ Missing or invalid biometric data
- ✅ Edge cases (null, undefined, empty strings, whitespace)

### Beauty Validation (beautyClient)
- ✅ Valid aesthetic data
- ✅ Elegance score validation (0-100 range)
- ✅ Minimum threshold enforcement (score ≥ 50)
- ✅ Edge cases (null, undefined, out of range values)

### Dignity Validation (dignityClient)
- ✅ Valid ethical data
- ✅ Consent requirement validation
- ✅ Privacy level validation (public, private, anonymous)
- ✅ Edge cases (false consent, invalid privacy levels)

### Integration Tests (runPauCheck)
- ✅ Complete validation flow with all three steps
- ✅ Individual validation failures
- ✅ Multiple validation failures
- ✅ Error collection and reporting
- ✅ Edge cases (null data, partial data)

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm test -- --coverage
```

## Test Structure

Each validation client test suite follows this structure:

```
describe('ClientName - Validation Type', () => {
  describe('Success Scenarios', () => {
    // Tests that should pass validation
  });

  describe('Failure Scenarios', () => {
    // Tests that should fail validation
  });

  describe('Edge Cases', () => {
    // Tests for boundary conditions and unusual inputs
  });
});
```

## Example Usage

```javascript
import { runPauCheck } from './pauCheck.js';

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
    consentGiven: true,
    privacyLevel: 'private'
  }
};

const result = await runPauCheck(checkData);

if (result.success) {
  console.log('All validations passed!');
} else {
  console.error('Validation errors:', result.errors);
}
```

## Test Results

All 50 tests pass successfully:
- ✅ 11 Identity validation tests
- ✅ 13 Beauty validation tests  
- ✅ 11 Dignity validation tests
- ✅ 15 Integration tests

## Adding New Tests

When adding new tests:
1. Follow the existing test structure
2. Use descriptive test names
3. Cover both success and failure scenarios
4. Include edge cases
5. Ensure tests are independent and can run in any order

## Dependencies

- **Vitest** - Fast unit test framework for Vite projects
- **@vitest/ui** - Optional UI for running and viewing tests

## Notes

- All validation functions are async to support future API integrations
- Tests use the AAA pattern (Arrange, Act, Assert)
- Error messages are specific and actionable
- Each validation step continues even if previous steps fail
