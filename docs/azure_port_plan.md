# Migration Plan: Biketours to Azure Functions + SPA

## Objectives
- Re-platform the legacy blogging site onto a serverless back end (Azure Functions) and a modern single-page application (SPA) front end.
- Preserve the journey logging workflow (day-by-day A→B entries with stories and photos) while improving scalability, maintainability, and developer experience.

## Proposed Architecture
- **Front end:** SPA built with React + TypeScript (Vite tooling) to enable fast builds, modern routing, and component-driven UI. Host via Azure Static Web Apps.
- **Back end:** Azure Functions (TypeScript/Node) with HTTP triggers for APIs and timer triggers for maintenance tasks (e.g., thumbnail cleanup). Deploy via Functions Premium or Consumption plan depending on workload.
- **Data layer:**
  - Azure Cosmos DB (Mongo API) for trip posts, daily segments, comments, and user profiles.
  - Azure Blob Storage for original images and generated thumbnails; use Azure CDN for delivery.
  - Azure Cognitive Services (optional) for image moderation and caption suggestions.
- **Auth:** Azure AD B2C for user sign-in; integrate via Static Web Apps authentication/authorization.
- **Observability:** Application Insights for logs, metrics, and distributed tracing across Functions and front end telemetry.

## Domain Model Draft
- **User**: id, displayName, avatarUrl, bio, social links.
- **Trip**: id, ownerId, title, summary, startDate, endDate, coverImage, privacy setting.
- **Stage (day leg)**: id, tripId, sequence, startLocation, endLocation, narrative, photos, map route reference, stats (distance, duration, elevation, weather summary).
- **Comment**: id, stageId or tripId, authorId, body, createdAt, visibility.
- **Media**: storage path, thumbnail paths, EXIF/location data, dominant color, processed flags.

## Azure Functions API Surface (initial)
- `POST /api/trips` – create trip
- `GET /api/trips/{id}` – fetch trip with stages
- `POST /api/trips/{id}/stages` – append stage with photos and route metadata
- `PATCH /api/stages/{id}` – edit stage
- `POST /api/stages/{id}/comments` – add comment
- `GET /api/feed` – list recent public trips/stages with pagination
- `POST /api/media/upload-url` – generate SAS URL for direct-to-blob upload
- `POST /api/media/process` – queue thumbnail generation (timer/queue trigger worker)

## SPA Feature Outline
- Authenticated dashboard with trip management (create/edit/publish, privacy controls).
- Stage editor: map picker (Bing Maps/Azure Maps), photo uploader with progress, WYSIWYG narrative editor.
- Public trip viewer: timeline of stages, map overview, photo gallery/lightbox, share links.
- Activity feed and search filters (location, tags, distance, bike type).
- Offline-friendly drafts stored locally until published.

## Migration Steps
1. **Code discovery**: Import legacy assets into `legacy/` folder; identify reusable data/models.
2. **Front-end bootstrap**: Scaffold React + Vite + TypeScript, set up routing, state (TanStack Query), and design system (MUI/Chakra/Tailwind).
3. **API contracts**: Define OpenAPI spec for endpoints above; generate client SDK for the SPA.
4. **Function app setup**: Initialize Azure Functions (TypeScript), implement HTTP triggers with validation (Zod) and authentication middleware.
5. **Data persistence**: Create Cosmos DB collections and Blob containers; implement repository layer and SAS upload flow.
6. **Media processing**: Add queue/timer-triggered Function for thumbnailing via Sharp; write storage event to update stage media metadata.
7. **Deployment pipeline**: GitHub Actions for CI (lint/test/build), CD to Azure Static Web Apps and Functions with environment-specific settings.
8. **Cutover**: Migrate existing content (if available) into Cosmos/Blob; run smoke tests; enable CDN; monitor with Application Insights.

## Work Breakdown (MVP)
1. Repo restructuring: `apps/frontend`, `apps/functions`, `packages/shared` for types and API clients.
2. Implement auth + basic CRUD for trips/stages.
3. Add media upload + thumbnail worker.
4. Build public trip viewer + dashboard UX.
5. Harden with observability, caching (CDN), rate limiting, and privacy controls.

## Open Questions
- Do we need offline GPS track import (GPX/KML) and map overlays?
- Any legacy database to migrate, or start fresh?
- Requirements for multi-language content and accessibility (WCAG level)?
- Usage expectations to size Functions plan (Premium vs Consumption) and CDN caching strategy.

