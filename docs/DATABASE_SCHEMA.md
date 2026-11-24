# Database Schema — Shadow-Agent Dojo

## Important database decision
The source materials are inconsistent: Lovesh's backend task plan specifies MongoDB models; the backend architecture and ER diagram show PostgreSQL-style relational entities. Select one primary transactional database before writing production schema. This file describes logical entities and relationships independent of vendor.

## Modeling principles
- Every company-owned record includes `companyId` or an equivalent tenant key.
- All tenant-owned relations must be validated at write and read boundaries.
- Store UTC timestamps and stable IDs.
- Preserve session messages and evaluation history.
- Track version for scenarios, rubrics, prompts, documents, and policy.
- Keep the XP ledger immutable; derive current XP from ledger or a reconciled aggregate.
- Vector records must be filterable by company, document and version.

## Core entities
### Company
`id, companyName, industry, subscriptionPlan, status, settings, createdAt, updatedAt`.

### User
`id, name, emailNormalized, passwordHashOrIdentitySubject, role, status, companyId, profile, createdAt, updatedAt, lastLoginAt`. Never store plaintext password. For richer RBAC use company membership records and permissions.

### Department
`id, companyId, name, description, createdAt, updatedAt`.

### Team
`id, companyId, departmentId, teamName, teamLeadId, createdAt, updatedAt`.

### TeamMembership
`id, companyId, teamId, employeeId, joinedAt, endedAt`. Unique active membership rules are product-defined.

### Invitation
`id, companyId, emailNormalized, role, tokenHash, invitedBy, expiresAt, acceptedAt, status, createdAt`.

### KnowledgeDocument
`id, companyId, title, type, storageKey, sourceFileName, mimeType, sizeBytes, status, version, uploadedBy, checksum, createdAt, indexedAt, retentionAt`.

### KnowledgeChunk
`id, companyId, documentId, documentVersion, ordinal, content, metadata, embeddingRef, tokenCount, createdAt`. Actual vectors may be held externally; never omit company/document filters.

### Scenario
`id, companyId, title, description, difficulty, personaId, category, scenarioPrompt, objective, rubricVersion, status, version, createdBy, createdAt, updatedAt`.

### Persona
`id, companyId (or approved global catalog scope), name, traits, behaviorRules, tone, escalationTriggers, version`.

### TrainingSession
`id, companyId, employeeId, scenarioId, personaVersion, status, mode, startedAt, pausedAt, endedAt, durationSeconds, createdAt`.

### TrainingMessage
`id, companyId, sessionId, sequence, senderType, content, createdAt, metadata`. Preserve ordered sequence and idempotency.

### Evaluation
`id, companyId, sessionId, rubricVersion, empathyScore, communicationScore, productKnowledgeScore, resolutionScore, responseTimeScore, overallScore, evidence, feedback, evaluatedAt`.

### Recommendation
`id, companyId, employeeId, sourceEvaluationId, skill, recommendation, scenarioId, status, createdAt, completedAt`.

### XPTransaction
`id, companyId, employeeId, sessionId, ruleVersion, amount, reason, idempotencyKey, createdAt`. Unique idempotency key.

### Badge / EmployeeBadge / Streak
Badge: `id, companyId or catalogScope, name, description, criteriaVersion`.  
EmployeeBadge: `id, companyId, employeeId, badgeId, awardedAt`.  
Streak: `id, companyId, employeeId, currentCount, bestCount, lastActivityDate`.

### ShadowSession
`id, companyId, employeeId, channel, status, externalConversationRef, startedAt, endedAt`.

### ShadowMessage
`id, companyId, shadowSessionId, sequence, senderType, content, receivedAt, metadata`.

### ShadowAnalysis
`id, companyId, shadowSessionId, messageId, sentimentLabel, sentimentConfidence, urgency, riskFlags, modelVersion, createdAt`.

### ShadowSuggestion
`id, companyId, shadowSessionId, messageId, suggestedReply, coachingTip, nextBestAction, retrievedChunkRefs, confidence, status, employeeFeedback, createdAt, resolvedAt`.

### Notification
`id, companyId, recipientUserId, type, title, body, payload, readAt, createdAt`.

### AuditEvent
`id, companyId, actorUserId, action, resourceType, resourceId, requestId, beforeSnapshot, afterSnapshot, createdAt`.

### Subscription / BillingEvent (later)
Model provider customer/subscription IDs, plan, status, period dates and webhook event idempotency. Do not store card data.

## Relationships
Company 1—N users, departments, teams, documents, scenarios, training sessions, shadow sessions, notifications. Department 1—N teams. Team N—N employees via TeamMembership. Employee 1—N training sessions, evaluations (through sessions), XP transactions, badges, and shadow sessions. Scenario 1—N training sessions. Document 1—N chunks. Session 1—N messages and optionally 1—N evaluation versions. ShadowSession 1—N messages, analyses and suggestions.

## Tenant integrity
- Parent and child company IDs must match.
- Team lead must be active member of the same company/team.
- Employee session must reference a scenario available to that company.
- Retrieval must filter by companyId and allowed document status/version.
- Socket rooms must be derived from authenticated membership.
- Never accept companyId from client as sufficient authorization.
- Global personas/badges require explicit global catalog semantics, not accidental cross-tenant sharing.

## Indexing
Index companyId with common query fields: status, createdAt, employeeId, teamId, scenarioId. Add unique normalized email within the intended identity/tenant scope. Index session message order. For MongoDB use compound indexes; for PostgreSQL use relational indexes and constraints. Tune from query plans.

## Retention
Specify retention for raw interaction messages, audio/transcripts, AI prompts/responses, uploaded documents, vector embeddings, evaluations, and audit events. Deletion must include object storage, vector records, indexes, backups per policy, and provider-side retention as feasible.
