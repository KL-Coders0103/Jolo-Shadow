# Security Guidelines — Shadow-Agent Dojo

## 1. Security goals
Protect company tenant boundaries, employee identity/profile, customer interaction transcripts, training sessions, uploaded knowledge, embeddings, AI prompts/responses, subscription records, socket sessions, and audit logs.

## 2. Threat model
Key threats: cross-tenant IDOR, JWT theft, privilege escalation, malicious CSV/PDF, prompt injection in uploaded documents or customer messages, vector retrieval leakage, socket room spoofing, replayed reward grants, session transcript exposure, AI provider data retention, webhook forgery, and abuse/cost exhaustion.

## 3. Authentication and sessions
- Hash passwords with a modern adaptive password hash; never encrypt/recover plaintext passwords.
- Use short-lived access tokens and rotated refresh tokens or secure server sessions.
- Store web refresh/session credentials in Secure, HttpOnly, SameSite cookies; store mobile credentials in platform secure storage.
- Verify issuer, audience, expiry, signature and allowed algorithm.
- Revoke sessions on logout, account suspension, or security event.
- Rate-limit login, signup, invitation acceptance and recovery; prevent account enumeration.

## 4. RBAC
Suggested company roles:
- **Company Owner:** subscription, company settings, member/role management, all company resources.
- **Company Admin:** delegated employee/team/knowledge/scenario/analytics administration.
- **Team Lead:** assigned team members, team analytics, permitted coaching/escalation review.
- **Employee:** own profile, own training, allowed scenarios, own Shadow sessions, own rewards.
- **Platform Operator:** future cross-tenant support role with just-in-time, audited, minimal access; not a normal tenant role.

Permission matrix (baseline):
| Action | Owner | Admin | Team Lead | Employee |
|---|---:|---:|---:|---:|
| Company settings | Yes | Delegated | No | No |
| Invite/manage employees | Yes | Yes | No | No |
| Suspend/remove account | Yes | Yes | No | No |
| Manage teams/departments | Yes | Yes | Scoped | No |
| Upload/manage knowledge | Yes | Yes | Optional | No |
| Create/publish scenarios | Yes | Yes | Optional | No |
| Start own Dojo session | Yes | Yes | Yes | Yes |
| View own evaluation/XP | Yes | Yes | Yes | Yes |
| View employee transcript | Restricted | Restricted | Team/policy | Own |
| Use own Shadow session | Yes | Yes | Yes | Yes |
| View company analytics | Yes | Yes | No | No |
| View team analytics | Yes | Yes | Scoped | No |
| Change roles/billing | Yes | Delegated | No | No |

Every operation is checked server-side; hiding UI controls is not authorization. Company ID is derived from verified membership, never trusted from request body alone.

## 5. Tenant and vector isolation
- Add companyId to every tenant-owned collection/table and compound index with it.
- Query by companyId and resource ID together.
- Validate all parent-child company IDs on create/update.
- Scope object-storage paths and signed URLs by company authorization.
- Apply companyId filters to vector search and verify returned document IDs against the database.
- Global personas/scenarios require explicit shared-catalog semantics.
- Never trust client-supplied socket room names; compute room membership server-side.
- Add automated cross-tenant tests for every API, socket event, file and RAG retrieval path.

## 6. AI and prompt-injection controls
Treat documents and customer messages as untrusted content. Delimit retrieved content as data, not instructions. The model must not execute instructions embedded in source documents, expose other tenants, alter permissions, send messages, or perform arbitrary tools. Use field allowlists, structured outputs, bounded context, prompt versioning, provider timeouts and content safety review. Do not send more personal data than required.

## 7. File uploads and RAG
Allowlist PDF and approved document formats; validate size and content type; scan/quarantine where possible; generate random object keys; keep storage private; parse in bounded workers; enforce page/size/time limits; prevent archive/path attacks; delete vectors on document deletion/version retirement. Display citations and reject unsupported retrieval rather than fabricating sources.

## 8. Realtime
Authenticate socket handshake; authorize each subscription and action; bind rooms from database membership; rate-limit messages; validate event schemas; use stable event IDs; persist state before emitting; support revocation and reconnect authorization.

## 9. Data privacy
Define notice, consent and lawful basis for recording/transcription. Minimize transcript retention and restrict audio. Redact PII from logs, traces and crash reports. Encrypt transport and managed storage. Define export/deletion across database, object store, vector DB and provider data. Employee analytics must not be used as the sole basis for employment decisions.

## 10. Billing and webhooks
Do not store card data. Verify payment-provider webhook signatures; enforce event idempotency; validate subscription status server-side; separate billing permissions from training content.

## 11. Audit and incident response
Audit invitations, role changes, account lifecycle, document uploads/deletes, scenario publishing, transcript access/export, scoring/rubric changes, billing changes and privileged support access. Maintain secret rotation, containment, backup restore and notification runbooks.

## 12. Release checklist
- [ ] Tenant isolation tests cover REST, Socket.IO, storage and vector retrieval.
- [ ] RBAC tested for all roles and actions.
- [ ] No secrets/transcripts in client builds or logs.
- [ ] Prompt injection and malformed upload tests complete.
- [ ] Token rotation/revocation verified.
- [ ] Consent/retention/deletion policy approved.
- [ ] Provider data terms reviewed.
- [ ] Backups and restore tested.
- [ ] Rate limits and cost alerts configured.
