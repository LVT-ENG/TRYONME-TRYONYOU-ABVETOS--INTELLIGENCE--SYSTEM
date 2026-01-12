import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import IntelligentSystem from './IntelligentSystem';

describe('IntelligentSystem Component', () => {
  it('should render the section with correct title', () => {
    render(<IntelligentSystem />);
    const title = screen.getByText('Intelligent System');
    expect(title).toBeDefined();
    expect(title.tagName).toBe('H2');
  });

  it('should render all 4 modules', () => {
    render(<IntelligentSystem />);
    
    const pau = screen.getByText('PAU');
    const smartWardrobe = screen.getByText('Smart Wardrobe');
    const solidarityWardrobe = screen.getByText('Solidarity Wardrobe');
    const abvetosPayment = screen.getByText('ABVETOS Payment');
    
    expect(pau).toBeDefined();
    expect(smartWardrobe).toBeDefined();
    expect(solidarityWardrobe).toBeDefined();
    expect(abvetosPayment).toBeDefined();
  });

  it('should render module subtitles', () => {
    render(<IntelligentSystem />);
    
    const empaticStylist = screen.getByText('Empathic Stylist');
    const intelligentCloset = screen.getByText('Intelligent Closet');
    const sustainableFashion = screen.getByText('Sustainable Fashion');
    const secureTransactions = screen.getByText('Secure Transactions');
    
    expect(empaticStylist).toBeDefined();
    expect(intelligentCloset).toBeDefined();
    expect(sustainableFashion).toBeDefined();
    expect(secureTransactions).toBeDefined();
  });

  it('should render "Learn More" buttons for each module', () => {
    render(<IntelligentSystem />);
    
    const buttons = screen.getAllByText('Learn More');
    expect(buttons.length).toBe(4);
    
    buttons.forEach((button: HTMLElement) => {
      expect(button.tagName).toBe('BUTTON');
    });
  });

  it('should have correct CSS classes for styling', () => {
    const { container } = render(<IntelligentSystem />);
    
    const section = container.querySelector('#intelligent-system');
    expect(section?.classList.contains('intelligent-system')).toBe(true);
    
    const cards = container.querySelectorAll('.intelligent-system__card');
    expect(cards.length).toBe(4);
  });

  it('should render module descriptions', () => {
    render(<IntelligentSystem />);
    
    const pauDescription = screen.getByText(/AI-powered personal styling assistant/);
    const smartWardrobeDescription = screen.getByText(/Organize and manage your wardrobe/);
    const solidarityDescription = screen.getByText(/Support ethical fashion/);
    const paymentDescription = screen.getByText(/Fast, secure, and reliable payment system/);
    
    expect(pauDescription).toBeDefined();
    expect(smartWardrobeDescription).toBeDefined();
    expect(solidarityDescription).toBeDefined();
    expect(paymentDescription).toBeDefined();
  });

  it('should have proper section structure', () => {
    const { container } = render(<IntelligentSystem />);
    
    const section = container.querySelector('section#intelligent-system');
    expect(section).toBeDefined();
    
    const header = container.querySelector('.intelligent-system__header');
    expect(header).toBeDefined();
    
    const grid = container.querySelector('.intelligent-system__grid');
    expect(grid).toBeDefined();
  });
});
