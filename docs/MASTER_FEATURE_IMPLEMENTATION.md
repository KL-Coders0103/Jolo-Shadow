# Master Feature Implementation Plan — Shadow-Agent Dojo

## Solo execution rule
The former team plan divided work among four people. The active plan treats one developer as owner of product decisions, backend, database, web, mobile, AI/RAG, integration, testing, and deployment. Work in vertical slices; keep scope deliberately staged.

## Phase 0 — Re-baseline and architecture decisions
- Confirm product requirements and MVP use case.
- Resolve database conflict (MongoDB vs PostgreSQL).
- Choose AI provider, vector store, file storage, hosting, and voice scope.
- Confirm tenant model, user roles, consent/recording policy, and evaluation rubric.
- Define monorepo/repo layout and environment strategy.
**Exit:** ADRs accepted and local environment reproducible.

## Phase 1 — Backend foundation and identity
- Node/Express/TypeScript foundation, API versioning, config validation, logging, error handling.
- Database connection and migration/index strategy.
- Company/workspace, user, membership, roles, signup/login, token/session lifecycle.
- Auth and authorization middleware.
**Exit:** company and employee authentication with tenant-scoped route tests.

## Phase 2 — Tenant model and organization
- Company profile and settings.
- Employee invitations, suspend/unsuspend/remove lifecycle.
- CSV employee upload with row-level errors and idempotency.
- Departments, teams, team-lead assignment, membership management.
**Exit:** admin manages one company's organization without cross-tenant leakage.

## Phase 3 — Admin web foundation
- React/Vite/TypeScript/Tailwind/shadcn setup.
- Authenticated shell, sidebar, dashboard cards, company context.
- Employee list/detail and team/department screens.
- API integration and responsive states.
**Exit:** admin can manage employees and teams end-to-end.

## Phase 4 — Employee mobile foundation
- Expo/React Native/TypeScript setup; navigation and auth.
- Home dashboard with XP, level, sessions, streak, quick start.
- Profile, settings, notification shell.
- Secure token/session handling and API client.
**Exit:** employee can authenticate and navigate all primary tabs.

## Phase 5 — Knowledge Base and RAG ingestion
- Secure upload of PDFs, SOPs, FAQs and supported documents.
- File validation, parsing, chunking, metadata and versioning.
- Generate embeddings and index by company/document/version.
- Retrieval evaluation and document management.
**Exit:** retrieval returns relevant chunks only from the requesting tenant's allowed knowledge.

## Phase 6 — Scenario Builder and library
- Admin creates/edits scenarios, persona and difficulty.
- AI-assisted scenario generation with human review.
- Publish/archive/version scenarios.
- Employee scenario library, filters, detail and availability.
**Exit:** admin-published scenarios are available to the correct company employees.

## Phase 7 — Dojo session engine
- Start/get/pause/resume/end session APIs and state machine.
- Text roleplay with persona behavior and conversation memory.
- Session transcript persistence and reconnect/recovery.
- Mobile chat UI and session states.
**Exit:** employee completes a text-based scenario with persisted transcript.

## Phase 8 — Dojo evaluation and gamification
- Evaluation dimensions based on source artifacts: empathy, communication, product knowledge, resolution, response time/tone where rubric is approved.
- Rubric/versioned evaluation and evidence-linked feedback.
- Improvement recommendations.
- XP ledger, level, streak, badge unlock rules.
- Result screen and profile/XP history.
**Exit:** completed session produces explainable evaluation and exactly-once rewards.

## Phase 9 — Shadow copilot core
- Define supported customer interaction capture method (manual paste/demo input first, connector later).
- Session/message persistence.
- Sentiment/mood and urgency/risk signal as uncertain indicators.
- Grounded knowledge retrieval and suggested reply.
- Next-best action and escalation recommendation.
- Suggestion history with accept/edit/reject feedback.
**Exit:** employee sees a grounded suggestion with sources, risk signal and explicit human control.

## Phase 10 — Realtime Shadow and notifications
- Authenticated Socket.IO connection and tenant/user rooms.
- Incoming message, analysis status, suggestion-ready, escalation, and history events.
- Reconnect/resync, authorization on every subscription, idempotent updates.
- Notifications and announcement history.
**Exit:** realtime suggestions and alerts work under disconnect/reconnect tests.

## Phase 11 — Analytics and continuous improvement
- Aggregate employee/team/company performance, session trends, sentiment trends, rankings.
- Detect weak skills using approved rubric dimensions and minimum sample thresholds.
- Recommend targeted scenarios and practice.
- Re-evaluate after training; compare before/after with uncertainty and context.
- Top performers and leaderboard views.
**Exit:** skill-gap-to-practice-to-re-evaluation loop is traceable and explainable.

## Phase 12 — Security, billing, deployment, and release hardening
- Tenant isolation, RBAC, upload security, data retention, audit, abuse/rate limits.
- Backup/restore, monitoring, cost controls, API docs, mobile release config.
- Billing only after core product and payment/business model are confirmed.
- Staging UAT, production deployment, rollback and incident runbooks.
**Exit:** operational readiness evidence and release checklist signed off.

## Solo prioritization
**MVP order:** company/auth → employees/teams → knowledge/RAG → scenario library → text Dojo → evaluation/XP → Shadow suggestion flow → basic admin analytics → realtime → advanced improvement loop → voice/billing/integrations.

Do not parallelize all clients and AI features at once. Keep one thin end-to-end path working and expand it.

## Completion template
For each feature: requirement, actor/permission, API/data model, UI states, AI contract/prompt version if applicable, audit/telemetry, unit/integration/E2E tests, cost/latency budget, rollback, and tracker evidence.
