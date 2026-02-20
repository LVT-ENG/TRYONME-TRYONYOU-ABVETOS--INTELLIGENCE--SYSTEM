# AGENTS.md — Instructions for Google Jules

This file is read automatically by Jules before starting any task in this repository.

## Repository Overview

This is **TRYONYOU–ABVETOS–INTELLIGENCE–SYSTEM**, a virtual try-on system for the "Piloto Lafayette" built with React 19, Vite, TypeScript, and Tailwind CSS.

- **Zero Tallas Policy:** Never use the words `peso`, `talla`, `size`, or `weight` in `src/`. The only exception is `font-size`, `resize`, `background-size`, and `inventory_index.json`.
- **Build command:** `npm run build`
- **Dev command:** `npm run dev`
- **Linting:** `npm run lint`

## Mandatory Notification Step

When you finish generating a model, a new feature, or a successful test for the **CAP/LIVEIT** module (or any module tagged with `#make-notify`), you **must** notify the logistics and orchestration system by running the following command before opening your Pull Request:

```bash
curl -X POST "https://hook.make.com/YOUR_WEBHOOK_ID_HERE" \
  -H "Content-Type: application/json" \
  -d "{
    \"event\": \"jules_task_complete\",
    \"repository\": \"LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM\",
    \"module\": \"<name of the module you worked on>\",
    \"status\": \"success\",
    \"summary\": \"<one-sentence description of what was done>\"
  }"
```

> **Important:** Replace `YOUR_WEBHOOK_ID_HERE` with the webhook ID shown in Make.com's Custom Webhook module URL. The full URL is stored in the repository secret `MAKE_WEBHOOK_URL`.

## Code Style Guidelines

- Follow existing component patterns in `src/components/`.
- Prefer CSS keyframe animations over `setInterval`/`setTimeout` for UI animations (see `.jules/bolt.md` for prior learnings).
- Extract frequently-updating state into leaf-node components to avoid unnecessary re-renders of heavy components like `Webcam`.

## Pull Request Instructions

1. Create a feature branch from `main`.
2. Run `npm run build` and confirm it passes before opening a PR.
3. Send the Make.com notification (see above) after a successful build.
4. Open a Pull Request against `main` with a clear title and description of what was changed and why.
