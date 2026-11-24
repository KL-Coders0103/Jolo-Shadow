# Development Guide — Shadow-Agent Dojo

## 1. Solo-maintainer workflow
The earlier work plans split ownership across four contributors. Current development assumes one developer owns every layer. Work in thin slices, keep a single prioritized backlog, and avoid building web/mobile/AI in parallel without a working contract.

## 2. Stack candidates from supplied plans
Backend: Node.js + Express + TypeScript, MongoDB (task plan) or PostgreSQL (architecture/ER diagrams; decision pending), JWT, Socket.IO.  
Admin web: React + TypeScript + Vite + Tailwind + shadcn/ui + optional Framer Motion.  
Mobile: Expo + React Native + TypeScript + Zustand + React Navigation + Socket.IO client.  
AI/RAG: OpenAI or Gemini provider, optional LangChain, Pinecone or Chroma, Node/Python service, optional Whisper voice path.  
Files/hosting candidates: Cloudinary or Firebase Storage; Railway or Render.

Pin exact stable versions only after validating compatibility, supported runtime and hosting. Avoid installing every candidate technology.

## 3. Suggested repository organization
```
apps/
  api/                 # Express REST + Socket.IO
  admin-web/           # React/Vite admin portal
  employee-mobile/     # Expo React Native app
packages/
  contracts/           # shared schemas and API types
  config/              # lint/tsconfig conventions if useful
services/
  ai/                  # optional separate Python/Node service
docs/
  product and engineering specs
```
A simpler single-backend plus separate client folders is acceptable. Do not adopt a monorepo tool unless it reduces friction.

## 4. Environment categories
Database URL, JWT/session secrets, web/mobile API origins, CORS origins, file storage credentials, AI provider key/model/timeouts, vector database credentials, Socket.IO origin, email provider, billing provider (later), and observability configuration. Keep secrets in local ignored env files and managed deployment secrets. Validate configuration on startup.

## 5. Development sequence
1. Establish contracts and auth.
2. Add organization/team management.
3. Build the admin vertical slice.
4. Build mobile shell and employee auth.
5. Ingest and retrieve company knowledge.
6. Build scenario and text Dojo.
7. Add evaluation and XP.
8. Build Shadow core and realtime.
9. Add analytics and improvement loop.
10. Harden and deploy.

## 6. Engineering practices
Strict TypeScript, runtime schema validation, typed service boundaries, centralized error handling, structured logs with redaction, API versioning, database indexes, migrations, idempotency, and tests. Never let client role/company data authorize a request.

## 7. AI engineering
Abstract providers; version system prompts and rubrics; keep synthetic fixtures; validate structured model output; bound token/latency/cost; persist model and prompt version; evaluate against golden examples; add failure cases to tests. Do not expose provider credentials to clients.

## 8. Git workflow
Use short-lived feature branches and small commits. Suggested conventional commit prefixes: feat, fix, refactor, test, docs, chore. Keep main deployable. Tag release candidates and document migrations.

## 9. Pull request/self-review checklist
- [ ] Tenant scope enforced in API and data layer.
- [ ] Permissions verified server-side.
- [ ] Validation and error states complete.
- [ ] Tests added for positive, negative and failure cases.
- [ ] Mobile/web UI responsive and accessible.
- [ ] AI provider and prompts bounded/versioned.
- [ ] Logs contain no secrets or unnecessary personal data.
- [ ] Docs, API contract and tracker updated.
- [ ] Deployment/recovery impact reviewed.
