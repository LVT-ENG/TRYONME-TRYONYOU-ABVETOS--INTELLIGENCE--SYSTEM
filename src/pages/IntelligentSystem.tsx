import React from 'react';
import '../styles/intelligent-system.css';
import { Zap, Shirt, Heart, CreditCard, LucideIcon } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: 'gold' | 'white';
}

/**
 * IntelligentSystem Component
 * Displays the 4 core modules of TRYONYOU:
 * - PAU (Empathic Stylist)
 * - Smart Wardrobe
 * - Solidarity Wardrobe
 * - ABVETOS Payment
 */
export default function IntelligentSystem() {
  const modules: Module[] = [
    {
      id: 'pau',
      title: 'PAU',
      subtitle: 'Empathic Stylist',
      description: 'AI-powered personal styling assistant that understands your preferences and body type.',
      icon: Zap,
      color: 'gold',
    },
    {
      id: 'smart-wardrobe',
      title: 'Smart Wardrobe',
      subtitle: 'Intelligent Closet',
      description: 'Organize and manage your wardrobe with AI recommendations for perfect outfits.',
      icon: Shirt,
      color: 'white',
    },
    {
      id: 'solidarity-wardrobe',
      title: 'Solidarity Wardrobe',
      subtitle: 'Sustainable Fashion',
      description: 'Support ethical fashion and sustainability through conscious clothing choices.',
      icon: Heart,
      color: 'white',
    },
    {
      id: 'abvetos-payment',
      title: 'ABVETOS Payment',
      subtitle: 'Secure Transactions',
      description: 'Fast, secure, and reliable payment system for all your fashion purchases.',
      icon: CreditCard,
      color: 'gold',
    },
  ];

  return (
    <section id="intelligent-system" className="intelligent-system">
      <div className="intelligent-system__container">
        <div className="intelligent-system__header">
          <h2 className="intelligent-system__title">Intelligent System</h2>
          <p className="intelligent-system__subtitle">
            Four powerful modules working together to revolutionize your fashion experience
          </p>
        </div>

        <div className="intelligent-system__grid">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <div
                key={module.id}
                className={`intelligent-system__card intelligent-system__card--${module.color}`}
              >
                <div className="intelligent-system__icon-wrapper">
                  <IconComponent className="intelligent-system__icon" />
                </div>
                <h3 className="intelligent-system__card-title">{module.title}</h3>
                <p className="intelligent-system__card-subtitle">{module.subtitle}</p>
                <p className="intelligent-system__card-description">{module.description}</p>
                <button className="intelligent-system__card-button">Learn More</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
