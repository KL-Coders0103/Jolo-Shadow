# Deployment Guide — Shadow-Agent Dojo

## 1. Status
No production host, domain, managed database, storage account, vector database or provider secret is confirmed by the supplied project material. Railway/Render, Cloudinary/Firebase Storage, Pinecone/Chroma are options listed in the original task plans, not final decisions.

## 2. Proposed deployment topology
- Admin web frontend.
- Express API and Socket.IO server.
- Background worker for document processing/evaluation.
- Transactional database.
- Private object storage for knowledge documents.
- Vector database/index.
- AI provider account and managed secrets.
- Email/notification service as selected.

Keep API and worker builds compatible. Do not publicly expose database/vector/storage services.

## 3. Environments
Local, automated test, staging, production. Separate credentials and datasets. Use synthetic training transcripts in local/CI. Staging may use approved masked data; production transcripts are restricted.

## 4. CI/CD
Install from lockfile → lint/typecheck → unit/integration → build web/API/mobile → secret/dependency scans → deploy staging → migrations/index checks → smoke/E2E/socket/RAG tests → approval → progressive production rollout → monitor and verify rollback.

## 5. Database and vector index
Back up before migration. Test empty install and upgrade path. Keep migrations reviewed. Ensure vector index is rebuildable from authorized document/chunk records. A document deletion/version retirement must remove or deactivate corresponding vector entries.

## 6. File storage
Use private bucket/container, short-lived signed access after authorization, random keys, malware scanning where available, size limits, and lifecycle rules. Never serve internal knowledge files from a public bucket.

## 7. Secrets and AI provider
Use platform secret management; never expose API keys in mobile/web environment variables. Configure provider data retention and allowed model settings. Establish per-tenant or global rate/cost budgets with abuse protection.

## 8. Realtime operations
Monitor socket connections, disconnect/reconnect rates, event delivery failures, room authorization, and message-to-suggestion latency. Socket state is not a substitute for persisted session state.

## 9. Monitoring
Track availability, API errors/latency, DB health, worker backlog, document indexing failures, retrieval latency, AI token spend, provider errors, socket health, upload failures, and unusual transcript access/export.

## 10. Backup/recovery
Define RPO/RTO, encrypted backups, point-in-time recovery, vector index rebuild process, object-storage retention, and restore drills. Verify restoration rather than assuming backups work.

## 11. Rollback
Use backward-compatible schema changes. Keep previous application artifact. Document data migration repair and vector reindex steps; code rollback alone does not reverse persisted changes.

## 12. Release checklist
- [ ] Tenant and RBAC security tests pass.
- [ ] Consent, retention and deletion are configured.
- [ ] Database backup and restore verified.
- [ ] Vector index isolation and rebuild tested.
- [ ] AI provider data terms and budget approved.
- [ ] Socket auth/reconnect tested.
- [ ] Mobile build/signing and admin domain configured.
- [ ] Alerts and incident runbook ready.
- [ ] Named owner for production operations (solo maintainer) and emergency access plan documented.
