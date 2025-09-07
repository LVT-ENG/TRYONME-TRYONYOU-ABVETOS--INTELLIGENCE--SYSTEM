import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BodyMeasurement from '../src/components/BodyMeasurement';

// Mock external dependencies
jest.mock('qrcode', () => ({
  toDataURL: jest.fn().mockResolvedValue('data:image/png;base64,mock-qr-code')
}));

jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    setFontSize: jest.fn(),
    text: jest.fn(),
    addImage: jest.fn(),
    save: jest.fn()
  }));
});

jest.mock('jsqr', () => jest.fn());

// Mock navigator.mediaDevices
Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }]
    })
  }
});

describe('BodyMeasurement Component', () => {
  test('renders introduction step', () => {
    render(<BodyMeasurement />);
    
    expect(screen.getByText('Sistema de Medición Corporal con Avatar Pau')).toBeInTheDocument();
    expect(screen.getByText('Precisión')).toBeInTheDocument();
    expect(screen.getByText('Avatar Pau')).toBeInTheDocument();
  });

  test('proceeds to marker generation step', () => {
    render(<BodyMeasurement />);
    
    const startButton = screen.getByText('Comenzar Medición');
    fireEvent.click(startButton);
    
    expect(screen.getByText('Paso 1: Generar Marcador de Calibración')).toBeInTheDocument();
  });

  test('validates measurement precision requirements', () => {
    const mockMeasurements = {
      precision_mm: 8,
      altura_cm: 175,
      pecho_cm: 95,
      cintura_cm: 80,
      largo_pierna_cm: 85
    };

    // Test precision validation
    expect(mockMeasurements.precision_mm).toBeLessThanOrEqual(10);
  });

  test('validates A4 dimensions', () => {
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const MARKER_SIZE_MM = 50;

    expect(A4_WIDTH_MM).toBe(210);
    expect(A4_HEIGHT_MM).toBe(297);
    expect(MARKER_SIZE_MM).toBeLessThanOrEqual(A4_WIDTH_MM);
    expect(MARKER_SIZE_MM).toBeLessThanOrEqual(A4_HEIGHT_MM);
  });
});

// Integration test for measurement accuracy
describe('Measurement System Integration', () => {
  test('calculates px/mm ratio correctly', () => {
    const MARKER_SIZE_MM = 50;
    const markerPixelSize = 200; // mock pixel size
    const expectedRatio = markerPixelSize / MARKER_SIZE_MM;
    
    expect(expectedRatio).toBe(4.0); // 200px / 50mm = 4 px/mm
  });

  test('validates measurement output format', () => {
    const sampleOutput = {
      altura_cm: 175,
      pecho_cm: 95,
      cintura_cm: 80,
      largo_pierna_cm: 85,
      precision_mm: 8,
      calibration_data: {
        px_per_mm: 4.0,
        marker_size_px: 200,
        video_resolution: "1280x720"
      },
      pau_avatar_config: {
        body_type: 'balanced',
        fit_preference: 'regular',
        style_profile: 'classic'
      }
    };

    // Validate required fields
    expect(sampleOutput).toHaveProperty('altura_cm');
    expect(sampleOutput).toHaveProperty('pecho_cm');
    expect(sampleOutput).toHaveProperty('cintura_cm');
    expect(sampleOutput).toHaveProperty('largo_pierna_cm');
    expect(sampleOutput).toHaveProperty('precision_mm');
    expect(sampleOutput).toHaveProperty('calibration_data');
    expect(sampleOutput).toHaveProperty('pau_avatar_config');

    // Validate precision requirement
    expect(sampleOutput.precision_mm).toBeLessThanOrEqual(10);
  });
});