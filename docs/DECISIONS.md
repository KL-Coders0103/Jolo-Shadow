# Product and Architecture Decisions — Shadow-Agent Dojo

This decision log distinguishes source-confirmed concepts from proposals. Proposed decisions are not final until accepted and dated.

## Source references summarized
- All Dig List: ten design/architecture flows and earlier member responsibilities.
- Team Task: Shadow-Agent Dojo is an AI-powered employee training and live copilot SaaS platform; earlier team had four functional owners.
- Lovesh Task: Node + Express + TypeScript + MongoDB + Socket.IO + JWT, storage and Railway/Render candidates.
- Shravani Task: Expo/React Native/TypeScript, Zustand, React Navigation and Socket.IO client.
- Tanvi Task: React/TypeScript/Vite/Tailwind/shadcn and admin dashboard.
- Vaishnavi Task: OpenAI, LangChain, Pinecone/Chroma, RAG, Dojo persona/evaluation, Shadow sentiment/suggestion.
- Architecture images show PostgreSQL, vector DB and AI engine/provider paths; ER diagram shows company, employee, team, scenario, session, evaluation, XP, badge, shadow, notification and knowledge entities.

## ADR-001 — Solo-maintainer ownership
**Status:** Accepted · **Date:** 2026-11-25  
**Context:** Project was initially a multi-member team project, but current implementation is undertaken by one developer.  
**Decision:** One maintainer owns product, architecture, backend, database, web, mobile, AI/RAG, integration, QA and deployment. Former member assignments are historical context only.  
**Consequences:** Reduce parallel scope; build in phases and vertical slices; use automation and managed infrastructure where practical.

## ADR-002 — Primary database selection
**Status:** Open  
**Context:** Lovesh task plan specifies MongoDB; architecture and ER diagrams show PostgreSQL.  
**Options:** MongoDB, PostgreSQL.  
**Decision:** Do not silently assume both. Evaluate transaction needs, tenant filters, session/message relations, analytics, vector provider integration, ORM fit, and current working baseline before choosing one.  
**Revisit trigger:** Phase 0 architecture freeze.

## ADR-003 — Modular monolith before microservices
**Status:** Proposed  
**Decision:** Start Express API as a modular monolith with worker processes for heavy document/AI jobs.  
**Reason:** Solo operation and simpler deployment. Extract components only after measured scaling need.

## ADR-004 — Two client experiences
**Status:** Proposed  
**Decision:** Admin web and employee mobile remain separate UX surfaces on shared versioned APIs.  
**Reason:** The supplied flows define distinct admin and employee journeys.

## ADR-005 — Human-controlled Shadow suggestions
**Status:** Proposed  
**Decision:** Shadow drafts replies and next actions; an employee explicitly chooses what to use. Automatic sending is out of MVP scope.  
**Reason:** Avoid unintended customer communication and preserve employee judgment.

## ADR-006 — RAG is company-scoped
**Status:** Proposed  
**Decision:** Every retrieval request, chunk and vector record is constrained to authorized company/document scope.  
**Reason:** Company documents may contain private policies and customer information.

## ADR-007 — Brand palette
**Status:** Proposed  
**Decision:** Midnight/Navy + Violet AI accent + Aqua progress, with Cloud/White surfaces.  
**Palette:** `#111827`, `#1E2A4A`, `#6D5CE8`, `#18B6A4`, `#F5F7FB`, `#FFFFFF`.  
**Reason:** Distinguish Dojo/AI and growth/progress from generic blue admin SaaS palettes.

## ADR template
### ADR-XXX — Title
- Status: Proposed / Accepted / Superseded
- Date and owner
- Context and constraints
- Options considered
- Decision
- Consequences
- Revisit trigger
