import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DemoBrands from './DemoBrands';

describe('DemoBrands Page', () => {
  it('should render the page title', () => {
    render(<DemoBrands />);
    const heading = screen.getByText(/Instant Demo Access/);
    expect(heading).toBeDefined();
  });

  it('should render the subtitle', () => {
    render(<DemoBrands />);
    const subtitle = screen.getByText(/for Fashion Brands/);
    expect(subtitle).toBeDefined();
  });

  it('should render the main description', () => {
    render(<DemoBrands />);
    const description = screen.getByText(/Experience the power of TRYONYOU's AI-driven styling platform/);
    expect(description).toBeDefined();
  });

  it('should render "How the Demo Works" section', () => {
    render(<DemoBrands />);
    const heading = screen.getByText('How the Demo Works');
    expect(heading).toBeDefined();
  });

  it('should render 3 feature cards', () => {
    render(<DemoBrands />);
    
    const aiPoweredStyling = screen.getByText('AI-Powered Styling');
    const analyticsDashboard = screen.getByText('Analytics Dashboard');
    const fullIntegration = screen.getByText('Full Integration');
    
    expect(aiPoweredStyling).toBeDefined();
    expect(analyticsDashboard).toBeDefined();
    expect(fullIntegration).toBeDefined();
  });

  it('should render "What\'s Included in Your Demo" section', () => {
    render(<DemoBrands />);
    const heading = screen.getByText("What's Included in Your Demo");
    expect(heading).toBeDefined();
  });

  it('should render all included features', () => {
    render(<DemoBrands />);
    
    const features = [
      'PAU Empathic Stylist access',
      'Smart Wardrobe integration',
      'Real-time analytics dashboard',
      'Customer recommendation engine',
      'Inventory management tools',
      'ABVETOS Payment integration',
      'Brand customization options',
      'Technical support & training'
    ];
    
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeDefined();
    });
  });

  it('should render pricing section', () => {
    render(<DemoBrands />);
    const heading = screen.getByText('Demo Pricing Plans');
    expect(heading).toBeDefined();
  });

  it('should render 3 pricing plans', () => {
    render(<DemoBrands />);
    
    const starterDemo = screen.getByText('Starter Demo');
    const professionalDemo = screen.getByText('Professional Demo');
    const enterpriseDemo = screen.getByText('Enterprise Demo');
    
    expect(starterDemo).toBeDefined();
    expect(professionalDemo).toBeDefined();
    expect(enterpriseDemo).toBeDefined();
  });

  it('should render pricing amounts', () => {
    render(<DemoBrands />);
    
    expect(screen.getByText('$499')).toBeDefined();
    expect(screen.getByText('$1,499')).toBeDefined();
    expect(screen.getByText('Custom')).toBeDefined();
  });

  it('should render pricing durations', () => {
    render(<DemoBrands />);
    
    expect(screen.getByText('7 days')).toBeDefined();
    expect(screen.getByText('30 days')).toBeDefined();
    expect(screen.getByText('90 days')).toBeDefined();
  });

  it('should render "Request Demo" buttons', () => {
    render(<DemoBrands />);
    
    const buttons = screen.getAllByText('Request Demo');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('should render CTA section', () => {
    render(<DemoBrands />);
    const heading = screen.getByText('Ready to Transform Your Brand?');
    expect(heading).toBeDefined();
  });

  it('should render navigation header', () => {
    render(<DemoBrands />);
    const logo = screen.getByText('TRYONYOU');
    expect(logo).toBeDefined();
  });

  it('should render footer', () => {
    render(<DemoBrands />);
    const footer = screen.getByText(/© 2024 TRYONYOU — ABVETOS/);
    expect(footer).toBeDefined();
  });

  it('should have proper page structure', () => {
    const { container } = render(<DemoBrands />);
    
    const header = container.querySelector('header');
    const sections = container.querySelectorAll('section');
    const footer = container.querySelector('footer');
    
    expect(header).toBeDefined();
    expect(sections.length).toBeGreaterThanOrEqual(3);
    expect(footer).toBeDefined();
  });
});
