# Shadow-Agent Dojo (Jolo-Shadow)

An AI-powered employee training and live customer-interaction copilot platform.

> **Current ownership:** Solo-maintained project. The original project plan assigned backend, mobile, admin web, and AI to four different members. The current plan consolidates all responsibilities under one developer and sequences the work to make solo delivery realistic.

## Product overview

**Dojo** helps employees practice customer-facing situations through AI roleplay. Employees select scenarios and personas, complete text (voice is a later option) sessions, receive rubric-based feedback, and earn XP and badges.

**Shadow** supports employees during live customer interactions. It analyzes incoming messages for sentiment/urgency signals, retrieves company-specific knowledge, suggests replies and next-best actions, and recommends escalation when appropriate. The employee remains in control of the final response.

**Company Admin** manages employees, departments, teams, knowledge documents, scenarios, analytics, leaderboards, notifications, permissions, settings, and (later) billing.

**Continuous Improvement** uses training and interaction results to identify skill gaps, recommend targeted practice, and evaluate progress over time.

## Core modules

- Company registration, authentication, tenant isolation, RBAC.
- Employee invitations, bulk CSV upload, suspend/unsuspend/remove.
- Departments, teams, team leads, member management.
- Knowledge Base: PDFs, SOPs, FAQs, document parsing, chunking, embeddings and RAG.
- Scenario Builder: personas, difficulty, AI-assisted drafts and publishing.
- Dojo: scenario library, roleplay session, pause/resume/end, evaluation, feedback.
- Gamification: XP, levels, streaks, badges, leaderboards.
- Shadow: message capture, sentiment/urgency, grounded suggestions, coaching, escalation, history.
- Analytics and skill-gap-based continuous improvement.
- Realtime notifications and live suggestion updates.

## Documentation

All planning documents are in [`docs/`](./docs/).

| Document | Purpose |
|---|---|
| [Product Requirements](./docs/PRODUCT_REQUIREMENTS.md) | Product problem, roles, flows and features |
| [Project Requirements](./docs/PROJECT_REQUIREMENTS.md) | Scope, solo constraints and technical baseline |
| [Master Feature Implementation](./docs/MASTER_FEATURE_IMPLEMENTATION.md) | Phased end-to-end build sequence |
| [Implementation Tracker](./docs/IMPLEMENTATION_TRACKER.md) | Phase status and verification evidence |
| [Architecture](./docs/ARCHITECTURE.md) | API, clients, AI, RAG, realtime and data flow |
| [Database Schema](./docs/DATABASE_SCHEMA.md) | Logical entities, relationships and tenant rules |
| [API Specification](./docs/API_SPECIFICATION.md) | REST endpoints, socket events and contracts |
| [Frontend Architecture](./docs/FRONTEND_ARCHITECTURE.md) | Admin web and employee mobile structure |
| [Design System](./docs/DESIGN_SYSTEM.md) | Brand palette, tokens and component states |
| [UI/UX Guidelines](./docs/UI_UX_GUIDELINES.md) | Admin, Dojo, Shadow and improvement experiences |
| [Security Guidelines](./docs/SECURITY_GUIDELINES.md) | Auth, RBAC, tenant isolation, AI/RAG and privacy |
| [Testing Strategy](./docs/TESTING_STRATEGY.md) | Unit, integration, E2E, AI and security testing |
| [Development Guide](./docs/DEVELOPMENT_GUIDE.md) | Solo workflow, stack candidates and coding practices |
| [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md) | Environments, CI/CD, storage, recovery and release |
| [Decisions](./docs/DECISIONS.md) | Source references and ADRs |

## Solo implementation sequence

Follow Phase 0–12 in [Master Feature Implementation](./docs/MASTER_FEATURE_IMPLEMENTATION.md).

Recommended MVP order:
1. Company/auth and tenant isolation.
2. Employee/team administration.
3. Knowledge ingestion and tenant-scoped retrieval.
4. Scenario builder and library.
5. Text-based Dojo sessions.
6. Evaluation, XP and badges.
7. Shadow suggestions with human control.
8. Basic admin analytics.
9. Socket.IO realtime and notifications.
10. Continuous improvement, voice, billing and external integrations.

Do not use the former 21-day team schedule as a solo deadline. Keep one end-to-end flow stable before broadening features.

## Design direction

Distinct AI-training palette:
- Midnight: `#111827`
- Navy: `#1E2A4A`
- Violet AI accent: `#6D5CE8`
- Aqua progress/action: `#18B6A4`
- Cloud: `#F5F7FB`
- White: `#FFFFFF`

See [Design System](./docs/DESIGN_SYSTEM.md).

## Important architecture decision pending

The original Lovesh backend task plan names MongoDB, while the architecture diagrams and ER diagram use PostgreSQL. The database choice is intentionally marked open in [DECISIONS.md](./docs/DECISIONS.md); settle it before implementing the production schema.

## Project status

The documentation is a greenfield product and implementation baseline based on the supplied flow diagrams and team task plans. The tracker starts all phases as **Not started**. Planned features, external providers, deployment and production readiness are not represented as completed.

## License
No license is declared in this planning baseline. Add one after selecting the intended license.
