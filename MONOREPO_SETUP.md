# TRYONYOU Monorepo Setup

This document describes the monorepo structure implemented for the TRYONYOU-ABVETOS-INTELLIGENCE-SYSTEM project.

## Structure

```
├── apps/
│   ├── web/           # Main React/Vite application (@tryonyou/web)
│   └── legacy/        # Placeholder for tryon-app integration
├── packages/
│   ├── ui/            # Shared UI components (@tryonyou/ui)
│   └── config/        # Shared configuration (@tryonyou/config)
├── pnpm-workspace.yaml # Workspace configuration
└── package.json       # Root package.json
```

## Features

- **pnpm workspaces**: Modern package manager with efficient dependency management
- **Scoped packages**: All packages follow `@tryonyou/*` naming convention
- **Shared dependencies**: Common dependencies managed at workspace level
- **Filtered commands**: Run commands for specific packages using `pnpm --filter`

## Usage

### Install dependencies
```bash
pnpm install
```

### Build specific apps
```bash
# Build the web app
pnpm --filter @tryonyou/web build

# Run dev server for web app
pnpm --filter @tryonyou/web dev
```

### List all workspaces
```bash
pnpm list -r --depth=0
```

## Migration Notes

The following files were moved from root to `apps/web/`:
- `src/` directory
- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.ts`

## Future Integrations

The `apps/legacy/` directory is prepared for integration with the tryon-app repository as mentioned in issue requirements.