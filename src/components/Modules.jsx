import React, { useState } from 'react'

function Modules() {
  const [selectedModule, setSelectedModule] = useState(null)

  const modules = [
    {
      id: 'avatar',
      name: 'Avatar 3D (PAU)',
      title: 'Personal Avatar Universe',
      description: 'Generate photorealistic 3D avatars with precise body measurements for a perfect fit every time.',
      image: '/avatar-module.png',
      features: [
        'Millimeter-precise body scanning',
        'Photorealistic 3D rendering',
        'Real-time garment simulation',
        'Multi-angle visualization'
      ]
    },
    {
      id: 'pau',
      name: 'PAU Recommender',
      title: 'AI-Powered Style Intelligence',
      description: 'Your personal fashion AI that learns your style and recommends items that perfectly match your taste and body.',
      image: '/avatar-module.png',
      features: [
        'Style DNA profiling',
        'Context-aware recommendations',
        'Trend integration',
        'Personalized lookbooks'
      ]
    },
    {
      id: 'cap',
      name: 'CAP System',
      title: 'Creative Auto-Production',
      description: 'Transform designs into reality with automated, on-demand production that minimizes waste and maximizes creativity.',
      image: '/wardrobe-module.png',
      features: [
        'Design-to-production automation',
        'Mass customization at scale',
        'Quality control AI',
        'Sustainable manufacturing'
      ]
    },
    {
      id: 'abvet',
      name: 'ABVET Payment',
      title: 'Biometric Authentication',
      description: 'Secure, frictionless payments using advanced iris and voice recognition technology.',
      image: '/payment-module.png',
      features: [
        'Iris recognition',
        'Voice biometrics',
        'Multi-factor authentication',
        'Sub-second checkout'
      ]
    },
    {
      id: 'wardrobes',
      name: 'Smart Wardrobes',
      title: 'Digital Closet Management',
      description: 'Digitize your entire wardrobe and get AI-powered outfit recommendations based on weather, occasion, and trends.',
      image: '/wardrobe-module.png',
      features: [
        'Wardrobe digitization',
        'Outfit generation',
        'Weather integration',
        'Occasion matching'
      ]
    },
    {
      id: 'ftt',
      name: 'Fashion Trend Tracker',
      title: 'Real-Time Trend Analysis',
      description: 'Stay ahead of the curve with AI-powered trend forecasting and real-time fashion intelligence.',
      image: '/wardrobe-module.png',
      features: [
        'Trend prediction AI',
        'Social media analysis',
        'Runway integration',
        'Market insights'
      ]
    },
    {
      id: 'liveit',
      name: 'LiveIt Factory',
      title: 'Intelligent Production Orchestration',
      description: 'Optimize your supply chain with AI-driven factory management and just-in-time manufacturing.',
      image: '/avatar-module.png',
      features: [
        'JIT orchestration',
        'Resource optimization',
        'Quality assurance',
        'Logistics integration'
      ]
    },
    {
      id: 'solidarity',
      name: 'Solidarity Wardrobe',
      title: 'Sustainable Fashion Ecosystem',
      description: 'Participate in a circular fashion economy by donating, exchanging, and recycling clothing sustainably.',
      image: '/wardrobe-module.png',
      features: [
        'Donation platform',
        'Clothing exchange',
        'Recycling programs',
        'Impact tracking'
      ]
    }
  ]

  return (
    <section className="modules" id="modules">
      <div className="modules-container">
        <h2 className="section-title">Our Core Modules</h2>
        <p className="modules-intro">
          Eight intelligent modules working in perfect harmony to revolutionize the fashion industry
        </p>

        <div className="modules-grid">
          {modules.map((module) => (
            <div 
              key={module.id}
              className={`module-card ${selectedModule === module.id ? 'active' : ''}`}
              onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
            >
              <div className="module-image">
                <img src={module.image} alt={module.name} />
              </div>
              <div className="module-content">
                <h3 className="module-name">{module.name}</h3>
                <h4 className="module-title">{module.title}</h4>
                <p className="module-description">{module.description}</p>
                
                {selectedModule === module.id && (
                  <ul className="module-features">
                    {module.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Modules
