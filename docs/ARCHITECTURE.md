# System Architecture — Shadow-Agent Dojo

## 1. Architecture style
For a solo maintainer, begin with a modular monolith backend and independently runnable background jobs. Avoid premature microservices. Keep admin web and employee mobile as separate clients over a versioned API. The AI subsystem is accessed through internal adapters rather than direct client calls.

## 2. Logical system
- Admin Website: company administration, employees, teams, knowledge, scenarios, analytics, settings.
- Employee Mobile App: Dojo, Shadow, leaderboard, profile, XP, achievements, notifications.
- API Gateway / Express API: authentication, tenant context, request validation, RBAC, versioned routes.
- Domain modules: Auth, Company, Employee, Department, Team, Knowledge, Scenario, Dojo, Evaluation, Gamification, Shadow, Analytics, Notification, Billing (later).
- AI Engine: provider abstraction for roleplay, evaluation, sentiment/risk signals, reply suggestion, coaching and recommendations.
- RAG subsystem: file ingestion, parsing, chunking, embedding, tenant-scoped retrieval and citation.
- Persistence: one transactional primary database plus vector index selected by ADR.
- Realtime: Socket.IO server with tenant-scoped rooms and authorized events.
- File storage: private object storage with controlled access.

## 3. Request flow
Client → API Gateway → authentication → membership/role validation → domain use case → database/queue/AI adapter → validated response. All authorization and tenant scoping occur server-side.

## 4. Dojo flow
Employee starts published scenario → session is created → persona/context loaded → message submitted → AI roleplay response generated under scenario constraints → message pair persisted → session ends → transcript evaluated against versioned rubric → feedback and recommendations created → reward ledger grants XP/badge once → analytics aggregates are updated.

Voice mode is optional and later-stage. Define speech-to-text/text-to-speech components only after text flow is stable and consent/recording policy is approved.

## 5. Shadow flow
Interaction source → message/session persistence → sentiment/urgency/risk analysis → tenant-filtered knowledge retrieval → grounded reply/coaching/next-action generation → policy/escalation check → client receives suggestion → employee accepts/edits/rejects or escalates → activity/history stored. Never send a customer response without an explicit user action in the MVP.

## 6. RAG flow
Authorized document upload → file validation and malware scanning → extraction → text normalization → chunking with source metadata → embeddings → tenant/document/version scoped index → retrieval with filters → reranking (optional) → context assembly with citations → AI response → source display. Re-indexing and deletion must update vector records as well as source records.

## 7. Continuous improvement
Session and Shadow outcomes → analytics aggregates → skill signal calculation with sample-size threshold → skill gap → targeted scenario recommendation → retraining → re-evaluation → trend comparison → update learning plan. Do not make high-stakes employment decisions from these outputs.

## 8. Realtime architecture
Authenticate socket handshake; verify session, company membership and roles; join only server-computed rooms. Events should include stable IDs, timestamps, schema version and tenant identifier for server validation (never trust a client-supplied tenant room). Support reconnect/resync through persisted state.

## 9. Reliability
Persist session messages before emitting accepted events. Use idempotency keys for session actions and reward grants. Use background jobs/outbox for document processing and evaluation. Bound model calls and retries. Retry transient errors only; expose failed processing state. Use timeouts, cancellation, and provider fallback where safe.

## 10. Security architecture
Tenant context is derived from verified membership. Every query and vector retrieval has a tenant filter. Use field-level permissions for employee PII and conversation transcripts. Store files privately. Keep AI keys server-side. Audit admin actions, role changes, knowledge updates, and data exports.

## 11. Deployment topology
Initially: Admin web host, mobile distribution through selected app channel, Express API, database, private file storage, vector service, and optional queue/worker. Railway/Render, Cloudinary/Firebase, and Pinecone/Chroma are candidates from the supplied plans, not final decisions.

## 12. Growth path
Measure API latency, concurrent sessions, socket connection count, AI cost, retrieval latency, and job backlog. Scale workers and database indexes before extracting services. Revisit architecture when independent scaling or ownership is proven necessary.
