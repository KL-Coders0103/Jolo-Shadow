# Project Requirements — Shadow-Agent Dojo

## 1. Project charter
This project is now maintained and implemented by one developer. Earlier artifacts describe a four-person team allocation (Lovesh/backend, Shravani/mobile, Tanvi/admin web, Vaishnavi/AI). Those role allocations are retained only as historical context. The active plan consolidates all product, engineering, integration, QA, and release responsibility under the solo maintainer.

## 2. Confirmed source-derived product scope
The supplied DIG lists and flow diagrams establish:
- Admin website: employee management, team management, knowledge base, scenario builder, analytics, leaderboards, notifications, settings, roles/permissions, billing, and security settings.
- Employee mobile app: Dojo, Shadow, leaderboard, profile, achievements, XP history, streak calendar, and notifications.
- Dojo: scenario library/details, text or voice conversation, session pause/resume/end, AI evaluation, category scores, feedback, improvement recommendations, XP, and badges.
- Shadow: live interaction capture, sentiment/mood, suggested replies, knowledge retrieval, next-best action, escalation path, manager review, suggestion history, analytics.
- Continuous improvement: weak-skill detection, scenario generation/selection, personalized practice, re-evaluation, and a feedback loop.
- Backend concepts: API gateway, authentication/role validation, domain APIs/services, PostgreSQL in some architecture diagrams, a vector database, AI engine, and OpenAI/Gemini provider examples.
- Earlier Lovesh backend plan: Node.js, Express, TypeScript, MongoDB, Socket.IO, JWT, Cloudinary, Railway or Render.
- Earlier mobile plan: Expo, React Native, TypeScript, Zustand, React Navigation, Socket.IO client.
- Earlier admin web plan: React, TypeScript, Vite, Tailwind, shadcn/ui, Framer Motion, Socket.IO client.
- Earlier AI plan: OpenAI API, LangChain, Pinecone or Chroma, Python/Node AI services, optional Whisper.

Where source artifacts disagree (for example PostgreSQL in architecture images versus MongoDB in the backend task plan), this specification marks the selection as an open decision rather than silently presenting both as finalized.

## 3. Recommended solo-maintainer technical baseline
Keep the existing documented stack choices as candidates, but confirm against actual current project constraints before implementation:
- Backend: Node.js + Express + TypeScript; modular monolith.
- Database: choose one primary transactional database. MongoDB is the explicit choice in Lovesh's task plan; PostgreSQL appears in the architecture and ER diagram. ADR-001 records the decision required.
- Admin web: React + TypeScript + Vite + Tailwind + shadcn/ui.
- Employee mobile: React Native + Expo + TypeScript + Zustand + React Navigation.
- Realtime: Socket.IO for Shadow events and live dashboard updates.
- Authentication: short-lived access JWT plus refresh/session rotation, secure storage appropriate to web/mobile.
- Files: Cloudinary or private object storage; the source tasks mention Cloudinary or Firebase Storage.
- AI: provider adapter for OpenAI/Gemini or a validated alternative. LangChain is optional, not mandatory.
- RAG: company-scoped document pipeline, embeddings, vector search (Chroma/Pinecone or another selected service).
- Hosting: Railway or Render are candidates from the backend task plan.

This is a proposed direction, not an assertion that every technology is already implemented or selected.

## 4. Solo development constraints
- Deliver one primary user journey at a time.
- Start with backend contracts and a minimal end-to-end employee flow before polishing all screens.
- Use a modular monolith and one deployable backend initially.
- Avoid building mobile and web simultaneously at full breadth; use shared API contracts and staged milestones.
- Prefer managed services where they reduce operational burden, but control recurring AI/storage costs.
- Use deterministic mocks for AI-dependent tests.
- Keep production releases small, reversible, and documented.

## 5. Delivery surfaces
- Admin web app: company setup, people/teams, knowledge, scenarios, analytics, settings.
- Employee mobile app: login, home, Dojo, Shadow, leaderboard, profile, notifications.
- Backend API: auth, tenant context, employees, teams, knowledge, scenarios, sessions, evaluations, gamification, Shadow, analytics, notifications, billing (later).
- AI/RAG subsystem: extraction, chunking, embeddings, retrieval, roleplay, evaluation, sentiment/urgency signals, suggestions, recommendations.
- Realtime subsystem: authenticated socket events scoped to company and user.

## 6. Non-functional requirements
Security, tenant isolation, data privacy, auditability, accessibility, reliable session persistence, API versioning, typed validation, bounded AI cost/latency, mobile network resilience, backups, logging without sensitive transcript leakage, and recoverable background processing.

## 7. Suggested environments
Local development, CI/test, staging, production. Use synthetic training conversations in development/test. Never copy live employee/customer conversations to unapproved environments.

## 8. Definition of ready
User story, actor/tenant boundary, permissions, state model, API input/output, data retention, AI prompt/data policy, UI states, error handling, test cases, and completion criteria are defined.

## 9. Definition of done
Feature tested across relevant client and API, authorization verified, tenant isolation tests pass, loading/empty/offline/error states exist, AI behavior evaluated or mocked, audit/telemetry implemented, docs/tracker updated, and migration/release risks considered.

## 10. Open decisions
Primary database, AI provider, vector DB, deployment host, storage provider, voice stack, socket topology, notification channel, payment provider, and exact business scoring/evaluation rules.
