module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // nueva funcionalidad
        'fix',      // corrección de bug
        'docs',     // cambios en documentación
        'style',    // formateo, punto y coma faltante, etc; sin cambio de código
        'refactor', // refactoring de código de producción
        'perf',     // cambio de código que mejora performance
        'test',     // añadir tests, refactoring tests; sin cambio de código de producción
        'build',    // cambios que afectan el sistema de build o dependencias externas
        'ci',       // cambios a archivos y scripts de CI
        'chore',    // otras tareas que no modifican src o test files
        'revert'    // revierte un commit previo
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'core',       // funcionalidad principal del sistema
        'ui',         // interfaz de usuario
        'api',        // endpoints y servicios
        'auth',       // autenticación y autorización
        'db',         // base de datos
        'deploy',     // despliegue y configuración
        'config',     // archivos de configuración
        'docs',       // documentación
        'test',       // testing
        'build',      // sistema de build y artefactos
        'avbetos',    // sistema AVBETOS específico
        'tryonme',    // funcionalidad TryOnMe
        'tryonyou',   // funcionalidad TryOnYou
        'health',     // health checks y monitoring
        'workflow'    // GitHub Actions y workflows
      ]
    ],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always']
  }
};