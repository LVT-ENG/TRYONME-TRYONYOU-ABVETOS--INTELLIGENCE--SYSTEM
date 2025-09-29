# GitHub Copilot Instructions

## Project Overview

This repository contains the **TryOnMe / TryOnYou - AVBETOS Intelligence System**, a proprietary and patented advanced intelligence system for fashion recommendations and preference analysis.

## Coding Guidelines

### Language and Framework Standards
- **Google Apps Script**: Follow Apps Script best practices for the recommendation engine
- **JavaScript/Node.js**: Use ES6+ syntax, follow ESLint configuration
- **PHP**: Follow PSR-12 coding standards for mailer.php and backend scripts
- **HTML/CSS**: Semantic HTML5, responsive design principles

### Code Style
- Use descriptive variable and function names in English
- Add JSDoc comments for all functions
- Follow conventional commits for commit messages
- Maintain consistency with existing code patterns

### Testing
- Add unit tests for new Google Apps Script functions
- Test all API endpoints with sample data
- Validate email functionality with test scenarios
- Ensure responsive design works across devices

### Security
- Never commit API keys or sensitive data
- Use environment variables for all secrets
- Validate all user inputs
- Follow GDPR compliance requirements

### Documentation
- Update README.md for any architectural changes
- Document Google Apps Script deployment steps
- Maintain inline code documentation
- Update DEPLOYMENT.md when adding new features

## Project Structure

```
├── google-apps-script/          # Motor de recomendaciones (Google Apps Script)
│   ├── motor.gs                 # Función principal initTryOnMe()
│   ├── helpers.gs               # Funciones auxiliares
│   ├── utils.gs                 # Utilidades de mantenimiento
│   ├── appsscript.json         # Configuración del proyecto
│   └── DEPLOYMENT.md           # Guía de despliegue
├── AVBETOS_repo_package/       # Módulo core AVBETOS
├── src/                        # Código fuente adicional
├── tests/                      # Pruebas
└── docs/                       # Documentación
```

## Specific Instructions

### For Google Apps Script Development
- Always test functions in the Apps Script editor before committing
- Use the `initTryOnMe()` function as the entry point
- Maintain backwards compatibility with existing spreadsheet structures
- Add validation for all user inputs

### For Web Interface
- Maintain the premium aesthetic (scroll infinito, animaciones)
- Ensure mobile responsiveness
- Test email functionality thoroughly
- Keep loading times minimal

### For AVBETOS Package
- Follow modular architecture principles
- Maintain API compatibility
- Document all public interfaces
- Add comprehensive error handling

## Quality Gates

Before submitting any PR:
- [ ] Code follows established patterns
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No secrets are committed
- [ ] Code is reviewed for security issues
- [ ] Performance impact is considered

## Deployment Notes

- Google Apps Script components require manual deployment
- Web interface deploys automatically via GitHub Actions
- Always test in staging environment first
- Monitor error rates after deployment