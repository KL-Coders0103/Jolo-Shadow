# Testing Strategy — Shadow-Agent Dojo

## 1. Goals
Validate tenant isolation, session integrity, Dojo lifecycle, rubric-based evaluation, exactly-once XP, RAG boundaries, Shadow suggestion quality, realtime reliability, mobile usability, and fair analytics.

## 2. Unit tests
- Auth token/session and RBAC policy.
- Tenant context and resource ownership policy.
- Employee/team lifecycle.
- Scenario validation/versioning.
- Dojo session state machine and message sequencing.
- Evaluation rubric aggregation and boundary cases.
- XP/badge idempotency and streak date logic.
- Sentiment/urgency schema validation and safe fallback.
- Retrieval filters and citation mapping.
- Continuous improvement sample thresholds and recommendations.

## 3. Integration tests
- Database relations, tenant scoping, transactions.
- Invitation accept/expire/revoke.
- CSV import partial success and idempotency.
- File upload, parsing, chunking, indexing and deletion.
- Dojo session persistence, pause/resume/reconnect/end.
- Evaluation and rewards persisted exactly once.
- Shadow analysis, retrieval and suggestion history.
- Socket authentication, company/user rooms and reconnect.
- Notification read state and delivery failure.
- Billing webhook signature/idempotency if billing is enabled.

## 4. End-to-end tests
Admin: register company → invite employee → create team → upload FAQ/SOP → create/publish scenario → inspect analytics.  
Employee: accept invite → login → start Dojo → converse → end → see evaluation and XP → view leaderboard/profile.  
Shadow: start session → submit customer message → receive sentiment/urgency and cited suggestion → accept/edit/reject → escalate if necessary → inspect history.  
Improvement: detect gap → recommend scenario → complete training → compare evaluation.

## 5. AI evaluation
Maintain fixed synthetic/approved datasets:
- Dojo personas: angry, hesitant, technical support, refund, escalation.
- Roleplay consistency, memory, scenario adherence and safety.
- Evaluation consistency against a human-reviewed rubric.
- Shadow messages covering neutral, frustrated, confused, cancellation risk, escalation risk and ambiguity.
- RAG tests for exact policy answer, missing evidence, conflicting versions, cross-tenant canary leakage and prompt injection.

Track retrieval precision/recall or judged relevance, citation correctness, unsupported-claim rate, suggestion usefulness, latency, token cost, human accept/edit/reject, evaluation agreement, and harmful-output rate. Use deterministic fake AI adapters in normal CI; live provider evaluation is a separately controlled suite.

## 6. Security tests
Cross-tenant REST/socket/storage/vector isolation; role escalation; IDOR; JWT expiry/revocation; upload abuse; prompt injection; transcript leakage; XSS/CSV formula injection; rate limiting; webhook replay; and audit completeness.

## 7. Mobile and accessibility
Test navigation and auth on physical Android device and emulator; interrupted network, socket reconnect, app background/foreground, token refresh, font scaling, screen readers, touch targets, reduced motion and empty/error states. Web admin has keyboard, responsive, screen-reader and chart-description checks.

## 8. Performance and resilience
Measure concurrent Dojo sessions, socket count, message-to-suggestion latency, document indexing throughput, vector retrieval latency, provider timeouts, queue backlog and dashboard query performance. Test provider outage, vector DB outage, queue outage and partial failure without losing session history.

## 9. Quality gates
PR: lint, typecheck, unit and integration tests, relevant client tests. Release: tenant security suite, E2E flows, AI evaluation, migration rehearsal, backup restore, mobile smoke tests and staging UAT. Do not call a model demo sufficient proof.
