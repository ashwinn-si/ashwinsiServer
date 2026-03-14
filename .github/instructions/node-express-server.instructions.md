---
description: "Use when editing this Node.js Express MongoDB backend, including routes, controllers, models, middleware, authentication, and API responses."
name: "Node Express Backend Patterns"
applyTo:
  - "server.js"
  - "src/routes/**/*.js"
  - "src/controllers/**/*.js"
  - "src/models/**/*.js"
  - "src/middlewares/**/*.js"
  - "src/utils/**/*.js"
---
# Node Express Backend Patterns

- Treat these as preferred patterns for this repository. When existing code differs, follow local file conventions unless the task asks for normalization.
- Use CommonJS consistently: `require(...)` and `module.exports`.
- Keep feature structure aligned: route files in `src/routes`, controllers in `src/controllers/<feature>`, models in `src/models`, and middleware in `src/middlewares`.
- In route files, wire handlers directly as `router.<method>(path, [middleware], controller)`.
- Use async controller handlers with `try/catch` for all async database or external calls.
- Return JSON for API responses. Standardize new endpoints to these payload shapes:
  - Success: `{ message, data }`
  - Error: `{ message, error? }`
- Use appropriate status codes. Authentication failures should return `401`.
- Keep JWT auth flow cookie-based for admin auth (`httpOnly`, `sameSite`, `secure`, `maxAge`) unless explicitly changing auth design.
- For Mongoose models, use one schema/model per file and export via `module.exports`.
- Keep names descriptive and consistent with existing conventions:
  - Controllers: `*Controller` (camelCase file names)
  - Models: `*Model`
  - Utils: `*Utils`
- Avoid introducing framework-level changes (ESM migration, stateful global patterns, or new architecture layers) unless explicitly requested.
