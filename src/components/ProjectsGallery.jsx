import React, { useState } from 'react'
import './ProjectsGallery.css'

function ProjectsGallery() {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'Deploy Express Dashboard',
      description: 'Real-time deployment monitoring system with automatic file classification and Telegram notifications.',
      category: 'infrastructure',
      url: '/deploy-express-dashboard.html',
      icon: '🦚',
      status: 'live',
      tech: ['Bash', 'inotifywait', 'GitHub Actions']
    },
    {
      id: 2,
      title: 'Investor Portal',
      description: 'Premium investor launch announcement with deck and dossier access.',
      category: 'business',
      url: '/press/investor-launch.html',
      icon: '📊',
      status: 'live',
      tech: ['HTML', 'CSS', 'Nine Gold Beige']
    },
    {
      id: 3,
      title: 'ABVETOS Dashboard',
      description: 'System metrics, deployment status, and active agents monitoring.',
      category: 'infrastructure',
      url: '/dashboard/index.html',
      icon: '📈',
      status: 'live',
      tech: ['React', 'Real-time', 'Analytics']
    },
    {
      id: 4,
      title: 'Corset Kimono Capsule',
      description: 'Exclusive fashion capsule collection showcasing design innovation.',
      category: 'fashion',
      url: '/capsules/corset-kimono/index.html',
      icon: '👘',
      status: 'live',
      tech: ['3D', 'Fashion Design', 'CAP']
    },
    {
      id: 5,
      title: 'Module Showcase',
      description: 'Interactive demonstration of all 8 core TRYONYOU modules.',
      category: 'product',
      url: '/modules/',
      icon: '⚙️',
      status: 'live',
      tech: ['React', 'Interactive', 'Demo']
    },
    {
      id: 6,
      title: 'PAU Avatar System',
      description: 'Emotional AI peacock assistant with 3D avatar generation.',
      category: 'product',
      url: '#pau',
      icon: '🦚',
      status: 'live',
      tech: ['AI', '3D Avatar', 'Biometrics']
    },
    {
      id: 7,
      title: 'ABVET Payment Demo',
      description: 'Dual-biometric payment system (iris + voice recognition).',
      category: 'product',
      url: '#abvet',
      icon: '👁️',
      status: 'live',
      tech: ['Biometric', 'Security', 'Payment']
    },
    {
      id: 8,
      title: 'Smart Wardrobe',
      description: 'Intelligent closet management with circular fashion integration.',
      category: 'product',
      url: '#wardrobe',
      icon: '👔',
      status: 'live',
      tech: ['AI', 'Sustainability', 'IoT']
    },
    {
      id: 9,
      title: 'Fashion Trend Tracker',
      description: 'Real-time trend analysis from social media, runways, and sales data.',
      category: 'analytics',
      url: '#ftt',
      icon: '📊',
      status: 'live',
      tech: ['Big Data', 'ML', 'Trends']
    },
    {
      id: 10,
      title: 'LiveIt Factory',
      description: 'Just-in-time production orchestration and supply chain optimization.',
      category: 'production',
      url: '#factory',
      icon: '🏭',
      status: 'live',
      tech: ['IoT', 'Automation', 'JIT']
    },
    {
      id: 11,
      title: 'Documentation Hub',
      description: 'Complete technical and business documentation repository.',
      category: 'docs',
      url: '/docs/',
      icon: '📚',
      status: 'live',
      tech: ['Markdown', 'PDF', 'API Docs']
    },
    {
      id: 12,
      title: 'Media Gallery',
      description: 'High-resolution images, videos, and promotional materials.',
      category: 'media',
      url: '/media/',
      icon: '🎬',
      status: 'live',
      tech: ['Video', 'Images', 'Assets']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Projects', icon: '🌐' },
    { id: 'product', label: 'Products', icon: '⚙️' },
    { id: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'fashion', label: 'Fashion', icon: '👗' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'production', label: 'Production', icon: '🏭' },
    { id: 'docs', label: 'Documentation', icon: '📚' },
    { id: 'media', label: 'Media', icon: '🎬' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  return (
    <section className="projects-gallery" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">Explore Our Ecosystem</h2>
          <p className="projects-subtitle">
            Discover all the interconnected modules, dashboards, and tools that power the TRYONYOU platform.
            Each project represents a piece of our comprehensive fashion intelligence system.
          </p>
        </div>

        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-tab ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span className="tab-label">{cat.label}</span>
              <span className="tab-count">
                {cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <a
              key={project.id}
              href={project.url}
              className="project-card"
              target={project.url.startsWith('http') ? '_blank' : '_self'}
              rel={project.url.startsWith('http') ? 'noopener noreferrer' : ''}
            >
              <div className="project-icon">{project.icon}</div>
              <div className="project-status">{project.status}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>
              <div className="project-link-arrow">→</div>
            </a>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-results">
            <p>No projects found in this category.</p>
          </div>
        )}

        <div className="projects-footer">
          <p>
            <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'projects'} available
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProjectsGallery

