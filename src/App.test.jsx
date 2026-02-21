import { render, act, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React, { useState, useContext } from 'react';
import App from './App';
import { LanguageContext } from './contexts/LanguageContext';

// Capture values
let capturedValues = [];

// Mock wouter to render our Spy
// We need to match the usage in App.jsx: <Route path="..." component={...} /> or <Route>...</Route>
vi.mock('wouter', () => ({
  Switch: ({ children }) => <>{children}</>,
  Route: () => <ContextSpy />,
  Link: ({ children }) => <a>{children}</a>
}));

const ContextSpy = () => {
  const value = useContext(LanguageContext);
  capturedValues.push(value);
  return <div data-testid="spy">Spy</div>;
};

describe('App Context Performance', () => {
  it('provides a stable LanguageContext reference across re-renders', async () => {
    capturedValues = [];

    const Wrapper = () => {
      const [, setCount] = useState(0);
      return (
        <div>
          <button data-testid="update-btn" onClick={() => setCount(c => c + 1)}>Update</button>
          <App />
        </div>
      );
    };

    render(<Wrapper />);

    // Initial capture
    expect(capturedValues.length).toBeGreaterThan(0);
    const value1 = capturedValues[0];

    // Force App re-render
    await act(async () => {
      screen.getByTestId('update-btn').click();
    });

    // Check subsequent capture
    const value2 = capturedValues[capturedValues.length - 1];

    // Verify stability
    expect(value1).toBe(value2);
  });
});
