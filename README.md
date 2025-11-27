# Biketours

New architecture scaffold for the Biketours migration to an Azure Functions back end and React SPA front end.

## Repository layout
- `apps/frontend`: React + Vite SPA shell using shared domain types.
- `apps/functions`: Azure Functions (TypeScript) with sample HTTP endpoints for trips.
- `packages/shared`: Reusable TypeScript domain interfaces shared across frontend and functions.

Install dependencies with your preferred package manager (e.g., `pnpm install` to leverage workspaces) and build each workspace via its scripts. The shared package is referenced via workspace paths to keep types consistent end-to-end.
