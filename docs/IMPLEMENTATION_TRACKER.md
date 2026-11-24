# Implementation Tracker — Shadow-Agent Dojo

**Execution model:** Solo developer  
**Status vocabulary:** Not started · In progress · Blocked · In review · Verified

| Phase | Area | Status | Evidence required |
|---|---|---|---|
| 0 | Product/architecture decisions | Not started | ADRs and local setup |
| 1 | Backend foundation/auth | Not started | Auth flow and tenant tests |
| 2 | Tenant/org management | Not started | Invite/CSV/team lifecycle tests |
| 3 | Admin web foundation | Not started | Employee/team admin browser flow |
| 4 | Employee mobile foundation | Not started | Auth/navigation/home on device |
| 5 | Knowledge Base/RAG | Not started | Tenant-filtered retrieval evaluation |
| 6 | Scenario Builder/library | Not started | Create/publish/browse workflow |
| 7 | Dojo session engine | Not started | Persisted text roleplay E2E |
| 8 | Evaluation/gamification | Not started | Rubric, reward idempotency, tests |
| 9 | Shadow copilot core | Not started | Grounded suggestion with human control |
| 10 | Realtime/notifications | Not started | Socket auth/reconnect tests |
| 11 | Analytics/continuous improvement | Not started | Skill-gap recommendation loop |
| 12 | Hardening/release | Not started | Security, restore, UAT, runbooks |

## Solo workload guidance
Keep the current milestone limited to one main feature and one enabling dependency. Do not treat the old four-member 21-day hackathon schedule as a feasible solo deadline. Prefer stable weekly outcomes and working vertical slices over parallel unfinished modules.

## Verification policy
- Mark a phase verified only with code, automated test, device/browser evidence, or accepted decision record.
- Add links to commits, PRs, CI runs, screenshots, and evaluation reports.
- Log blockers with the dependency and resolution condition.
- Keep AI evaluation results separate from subjective demos.
- Track provider token use, vector-store usage, storage, and hosting cost.

## Current baseline
Documentation defines intended scope; implementation state is not assessed by this tracker. All phases begin as Not started until inspected and verified during implementation.

## Log
| Date | Update | Evidence |
|---|---|---|
| 2026-11-25 | Solo-maintainer greenfield baseline prepared from provided project flows and plans | Uploaded DIGs, diagrams, and task documents |
