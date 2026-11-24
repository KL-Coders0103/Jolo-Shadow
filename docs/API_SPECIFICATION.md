# API Specification — Shadow-Agent Dojo

## Conventions
Proposed base path: `/api/v1`. JSON over HTTPS; multipart for private file upload. Authenticated routes resolve company context from verified identity/membership. Standardize response and error shapes before client implementation.

Success:
```json
{ "data": {}, "meta": { "requestId": "req_123", "timestamp": "2026-11-25T00:00:00Z" } }
```
Error:
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Invalid request", "details": [] }, "meta": { "requestId": "req_123" } }
```

## Auth and company
- `POST /auth/signup` company registration or invited employee activation (separate flows).
- `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`.
- `GET /auth/me`.
- `GET /companies/current`, `PATCH /companies/current`.

## Employee and organization
- `GET /employees`, `POST /employees/invitations`, `POST /employees/bulk-upload`.
- `GET /employees/:id`, `PATCH /employees/:id`.
- `POST /employees/:id/suspend`, `POST /employees/:id/unsuspend`, `DELETE /employees/:id` (soft removal policy).
- `GET/POST /departments`, `PATCH/DELETE /departments/:id`.
- `GET/POST /teams`, `GET/PATCH/DELETE /teams/:id`.
- `POST /teams/:id/lead`, `POST /teams/:id/members`, `DELETE /teams/:id/members/:employeeId`.

## Knowledge
- `POST /knowledge/documents` upload.
- `GET /knowledge/documents`, `GET /knowledge/documents/:id`.
- `POST /knowledge/documents/:id/reindex`, `DELETE /knowledge/documents/:id`.
- `GET /knowledge/search` internal/authorized retrieval diagnostic.
Support PDFs, SOPs and FAQs; add file-format allowlist and processing status.

## Scenario Builder
- `GET/POST /scenarios`, `GET/PATCH/DELETE /scenarios/:id`.
- `POST /scenarios/generate` AI draft generation.
- `POST /scenarios/:id/publish`, `POST /scenarios/:id/archive`.
- `GET /personas`, `POST /personas` where tenant custom personas are supported.

## Dojo
- `GET /dojo/scenarios`, `GET /dojo/scenarios/:id`.
- `POST /dojo/sessions` start session.
- `GET /dojo/sessions/:id`.
- `POST /dojo/sessions/:id/messages`.
- `POST /dojo/sessions/:id/pause`, `/resume`, `/end`.
- `GET /dojo/sessions/:id/evaluation`.
- `GET /dojo/sessions/:id/feedback`.
- `GET /employees/me/xp`, `GET /employees/me/badges`, `GET /employees/me/streak`.

## Leaderboard and analytics
- `GET /leaderboards/company`, `/team`, `/individual`.
- `GET /analytics/company`, `/analytics/teams/:id`, `/analytics/employees/:id`.
- `GET /analytics/skill-gaps`, `GET /analytics/sentiment`, `GET /analytics/training`.

## Shadow
- `POST /shadow/sessions` start interaction.
- `POST /shadow/sessions/:id/messages` capture message.
- `GET /shadow/sessions/:id`, `GET /shadow/sessions/:id/suggestions`.
- `POST /shadow/suggestions/:id/feedback` accept/edit/reject.
- `POST /shadow/sessions/:id/escalate`.
- Realtime Socket.IO events: `shadow:message`, `shadow:analysis`, `shadow:suggestion`, `shadow:escalation`, `shadow:status` (final event names to be frozen with contracts).

## Continuous improvement and notifications
- `GET /recommendations/me`, `POST /recommendations/:id/complete`.
- `GET /notifications`, `POST /notifications/:id/read`.
- Admin announcement create/history endpoints under `/announcements`.

## Security and API behavior
Use pagination and allowlisted filters/sorts. Validate every body/query/param. Use idempotency on session message, end-session reward, upload, and webhook flows. Enforce role and company scope on every request. Return 404 for out-of-scope resources where existence should not be disclosed. Apply rate limits to auth, AI, upload, search, and sockets. Document event payloads and reconnect semantics.

## Illustrative AI reply payload
```json
{
  "sentiment": { "label": "frustrated", "confidence": 0.76 },
  "urgency": "HIGH",
  "suggestedReply": "I understand the issue. Let me check the order details...",
  "coachingTip": "Acknowledge the concern before explaining the next step.",
  "nextBestAction": "VERIFY_ORDER",
  "sources": [{ "documentId": "doc_1", "chunkId": "chunk_4", "title": "Refund SOP" }],
  "requiresHumanReview": true
}
```
This is illustrative; exact enums and schema require product approval. Sentiment is an uncertain signal, and suggestions never auto-send.

## API acceptance
Maintain an OpenAPI specification and contract tests for auth, tenant isolation, RBAC, pagination, rate limits, idempotency, session transitions, socket payloads and AI failure handling.
