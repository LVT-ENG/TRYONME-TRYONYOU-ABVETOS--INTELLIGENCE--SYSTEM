# Conventional Commits Setup

Este repositorio utiliza [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial de commits estructurado y automatizar el versionado.

## 📋 Formato de Commits

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Tipos Permitidos

- **feat**: nueva funcionalidad
- **fix**: corrección de bug
- **docs**: cambios en documentación
- **style**: formateo, punto y coma faltante, etc; sin cambio de código
- **refactor**: refactoring de código de producción
- **perf**: cambio de código que mejora performance
- **test**: añadir tests, refactoring tests; sin cambio de código de producción
- **build**: cambios que afectan el sistema de build o dependencias externas
- **ci**: cambios a archivos y scripts de CI
- **chore**: otras tareas que no modifican src o test files
- **revert**: revierte un commit previo

### Scopes Disponibles

- `core`: funcionalidad principal del sistema
- `ui`: interfaz de usuario
- `api`: endpoints y servicios
- `auth`: autenticación y autorización
- `db`: base de datos
- `deploy`: despliegue y configuración
- `config`: archivos de configuración
- `docs`: documentación
- `test`: testing
- `build`: sistema de build y artefactos
- `avbetos`: sistema AVBETOS específico
- `tryonme`: funcionalidad TryOnMe
- `tryonyou`: funcionalidad TryOnYou
- `health`: health checks y monitoring
- `workflow`: GitHub Actions y workflows

## 🔧 Comandos Útiles

### Validar commits localmente
```bash
npm run lint:commits
```

### Instalar dependencias de commitlint
```bash
npm install
```

## 📝 Templates de Issues

Se han creado templates para diferentes tipos de issues:

- **Feature Request**: `feat(scope): descripción breve`
- **Bug Report**: `fix(scope): descripción del bug`
- **Documentation**: `docs(scope): descripción breve`

## 🚀 Validación Automática

### GitHub Actions

Los siguientes workflows validan automáticamente:

1. **Conventional Commits Workflow** (`.github/workflows/conventional-commits.yml`)
   - Valida el formato de commits en PRs
   - Valida títulos de PRs
   - Ejecuta en push a main/develop

2. **Reglas aplicadas**:
   - Header máximo 72 caracteres
   - Scope obligatorio
   - Subject en minúsculas
   - Sin punto final en subject

### Configuración Local

El archivo `commitlint.config.js` contiene todas las reglas. Para añadir un hook local:

```bash
# Instalar husky (opcional)
npm install --save-dev husky
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

## ✅ Ejemplos Válidos

```bash
feat(core): add new recommendation algorithm
fix(ui): resolve mobile responsive issues
docs(api): update endpoint documentation
style(ui): format code with prettier
refactor(avbetos): improve data processing pipeline
perf(db): optimize query performance
test(core): add unit tests for recommendation engine
build(deps): upgrade React to v18
ci(workflow): add conventional commit validation
chore(config): update environment variables
```

## ❌ Ejemplos Inválidos

```bash
# Sin scope
feat: add new feature

# Scope inválido
feat(invalidScope): add new feature

# Subject que empieza con mayúscula
feat(core): Add new feature

# Header muy largo
feat(core): this is a very long commit message that exceeds the maximum allowed length

# Tipo inválido
feature(core): add new feature
```

## 🔍 Troubleshooting

### Error: "header must not be longer than 72 characters"
- Acorta el mensaje del commit
- Usa el body para detalles adicionales

### Error: "scope must be one of [...]"
- Usa uno de los scopes definidos en la lista
- O propón añadir un nuevo scope al equipo

### Error: "subject must not start with uppercase"
- Usa minúsculas al inicio del subject
- Ejemplo: `feat(core): add feature` ✅

Para más información, consulta la [documentación oficial de Conventional Commits](https://www.conventionalcommits.org/).