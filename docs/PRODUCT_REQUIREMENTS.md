# Product Requirements — Shadow-Agent Dojo

**Product:** Shadow-Agent Dojo (also referred to as Jolo-Shadow in the repository)  
**Status:** Greenfield product baseline · **Version:** 1.0

## 1. Product vision
Build a multi-tenant SaaS platform that improves customer-facing employee performance through two connected experiences:
- **Dojo:** AI-powered, scenario-based roleplay and training, followed by evaluation, feedback, XP, badges, and personalized practice.
- **Shadow:** a live AI copilot that analyzes customer interactions, retrieves company knowledge, and suggests replies, coaching guidance, and escalation actions.

Company administrators manage employees, teams, departments, knowledge, scenarios, settings, notifications, analytics, and leaderboards. Employees use a mobile-first experience for training, live assistance, profile, achievements, and rankings.

## 2. Problem statement
Customer-facing employees need repeatable practice and in-the-moment guidance. Traditional training may be disconnected from real interactions, while supervisors lack a consistent view of skill gaps and improvement. Company policies and product knowledge are often scattered across documents. The platform combines practice, context-aware support, evaluation, and measurable improvement.

## 3. Product goals
- Support isolated company workspaces with employee and admin access.
- Provide Dojo scenario discovery, roleplay sessions, evaluation, feedback, and gamification.
- Provide Shadow interaction analysis, sentiment/urgency signals, knowledge-grounded reply suggestions, and escalation guidance.
- Let companies upload and manage PDFs, SOPs, FAQs, and policy documents for retrieval.
- Provide admin dashboards, employee/team/company analytics, and leaderboards.
- Detect skill gaps and recommend targeted scenarios or practice.
- Preserve session history, provenance, auditability, and tenant boundaries.

## 4. Personas
### Company administrator / owner
Registers or configures the company, invites employees, manages teams and departments, uploads knowledge, creates scenarios, configures permissions, and reviews organization performance.

### Team lead / manager
Oversees assigned teams, reviews employee performance, monitors skill gaps and escalations, and supports improvement.

### Employee
Signs in to the mobile app, practices scenarios in Dojo, receives evaluations and XP, uses Shadow during customer interactions, and tracks profile, achievements, streak, and leaderboard rank.

### Platform operator
A future operational role with tightly scoped support access across tenants. It must not imply unrestricted access to company content.

## 5. Product modules
1. Identity, company registration, workspaces, memberships, roles, and invitations.
2. Employee, department, team, and team-lead management.
3. Knowledge Base: document uploads, parsing, chunking, embeddings, retrieval, versioning, and document management.
4. Scenario Builder: scenario creation/editing, persona, difficulty, AI generation, and scenario library.
5. Dojo: text chat and optional voice sessions, pause/resume/end, transcript, evaluation, feedback, recommendations.
6. Gamification: XP ledger, levels, badges, streaks, and leaderboard.
7. Shadow: customer interaction capture, sentiment/mood, urgency/risk, grounded reply suggestions, coaching, escalation, suggestion history, and realtime updates.
8. Analytics: employee/team/company performance, skill gaps, sentiment trends, training trends, top performers, and ranking.
9. Continuous Improvement: weak-skill detection, recommendations, personalized training, re-evaluation, and feedback loop.
10. Notifications, company settings, roles/permissions, billing, and security settings.

## 6. Core user journeys
### Company onboarding
Company registration → admin workspace → configure company profile → invite employees or bulk CSV upload → create departments/teams → assign team leads → upload company knowledge → create or generate scenarios → employees join.

### Employee onboarding
Invite acceptance → account activation → employee login → home dashboard → Dojo/Shadow/Leaderboard/Profile.

### Dojo training
Open Dojo → scenario library → browse/filter → scenario details → start session → choose text or voice mode → persona-driven conversation → pause/resume as needed → end session → AI evaluation → communication/empathy/product-knowledge/resolution/response-time dimensions → feedback and improvement recommendations → XP/badge award → home.

### Shadow copilot
Customer interaction begins through a supported channel → capture messages → sentiment/mood and urgency analysis → retrieve relevant company knowledge → generate suggested reply and next-best action → determine whether escalation is needed → manager review or employee response → record resolution and suggestion history → update analytics and future coaching.

### Continuous improvement
Training and interaction performance → analytics → weak-skill detection → skill-gap decision → coaching insights → generate or select targeted scenarios → personalized practice recommendation → retraining → new evaluation → compare improvement → adjust difficulty or provide additional support → update rewards and analytics → feed the next cycle.

## 7. Functional requirements
| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Company registration and tenant-scoped authentication | P0 |
| FR-02 | Employee invitation, lifecycle, and CSV bulk upload | P0 |
| FR-03 | Department, team, membership, and team-lead management | P0 |
| FR-04 | Employee mobile navigation and profile/home | P0 |
| FR-05 | Knowledge upload and document lifecycle | P0 |
| FR-06 | Document extraction, chunking, embeddings, retrieval | P0 |
| FR-07 | Scenario library and builder with personas/difficulty | P0 |
| FR-08 | Dojo session lifecycle and conversation history | P0 |
| FR-09 | Dojo evaluation, feedback, and recommendations | P0 |
| FR-10 | XP, levels, streaks, badges, and leaderboards | P0 |
| FR-11 | Shadow message processing and suggestion history | P0 |
| FR-12 | Sentiment, urgency, risk, and escalation indicators | P0 |
| FR-13 | Knowledge-grounded suggested replies and coaching | P0 |
| FR-14 | Realtime Shadow updates | P1 |
| FR-15 | Company/team/employee analytics | P1 |
| FR-16 | Skill-gap detection and continuous improvement loop | P1 |
| FR-17 | Notifications and announcement history | P1 |
| FR-18 | Billing/subscription management | P2 |
| FR-19 | External CRM/support-channel integrations | P2 |

## 8. Non-goals and safety boundaries
- Do not autonomously send customer replies in MVP; suggestions require employee action.
- Do not make employment, compensation, promotion, or termination decisions solely from AI scores.
- Do not use sensitive traits or proxies for employee ranking or training evaluation.
- Do not claim sentiment or emotion inference is objectively accurate; present it as an uncertain signal.
- Do not ingest documents or interaction data without company authorization and a lawful basis.
- Do not expose one company's employees, conversations, documents, vectors, or metrics to another tenant.
- Avoid a sprawling microservice architecture as a solo developer; start modular and split only when justified.

## 9. Success metrics
Measure onboarding completion, invite acceptance, weekly active employees, training sessions per employee, session completion, evaluation reliability, skill-gap closure, practice recommendation adoption, Shadow suggestion acceptance/edit/rejection rates, time-to-suggestion, escalation precision, retrieval relevance, knowledge freshness, and employee/team performance trends. Establish baselines before setting numeric targets.

## 10. Principles
Human-in-control; company-specific knowledge boundaries; transparent evaluation dimensions; explainable recommendations; secure tenant isolation; fair employee analytics; resilient session persistence; minimal collection and retention; and coherent mobile/admin experiences.

## 11. Open validation
Confirm target industries and workflows, exact support channels, voice requirements, evaluation rubric, XP rules, scenario taxonomy, consent/recording policy, AI provider, vector store, hosting, billing model, notification channels, and data retention with intended customers.
