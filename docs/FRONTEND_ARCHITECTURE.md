# Frontend Architecture — Shadow-Agent Dojo

## Client strategy
Two focused clients share API contracts but have distinct interaction priorities:
- Admin web: React + TypeScript + Vite + Tailwind + shadcn/ui as specified in the earlier plan.
- Employee mobile: Expo + React Native + TypeScript, Zustand, React Navigation, Socket.IO client as specified in the earlier plan.

Do not force a shared UI component library across web and native. Share schemas/types where practical.

## Admin web route map
- Public: landing/company registration/login.
- Overview dashboard.
- Employee list/detail/invite/bulk upload.
- Department and team management.
- Knowledge Base: documents, uploads, processing status.
- Scenario Builder: list/create/edit/preview/publish.
- Analytics: team performance, skill gaps, sentiment trends, top performers.
- Leaderboards: company/team/individual.
- Notifications and announcement history.
- Settings: company profile, roles/permissions, billing, security.

## Employee mobile navigation
Public: splash, login, signup/invite activation.  
Private primary tabs: Home, Dojo, Shadow, Leaderboard, Profile.  
Profile subviews: personal information, achievements, XP history, streak calendar, settings, logout.  
Notifications: training alerts, challenge updates, system notifications.

## Mobile Dojo screens
Scenario library → scenario details → start → select text/voice mode → live conversation → pause/resume → end → evaluation results → feedback/recommendations → XP/badges.

## Mobile Shadow screens
Interaction/session context → live message/activity view → sentiment/urgency indicator → suggested reply card → coaching/knowledge context → escalation alert → suggestion history.

## State management
- Server state belongs in query/cache layer with explicit invalidation.
- Zustand handles small cross-screen client state (auth snapshot, selected workspace/company context, transient session UI).
- Never treat client company ID or role as authoritative.
- Persist only the minimum necessary session state securely.
- On reconnect, refetch authoritative session state and resume from server cursor.

## Component groups
Admin: AppShell, CompanySwitcher (if multi-company membership exists), EmployeeTable, EmployeeDetail, InviteDialog, BulkUploadWizard, TeamTree, DocumentUploader, DocumentStatus, ScenarioEditor, PersonaSelector, DifficultyPicker, AnalyticsChart, LeaderboardTable, RolePermissionMatrix.
Mobile: AppNavigator, BottomTabs, HomeMetricCard, ScenarioCard, ChatMessage, SessionControls, EvaluationScoreCard, XPProgress, BadgeGrid, ShadowSuggestionCard, SentimentIndicator, EscalationBanner, ActivityTimeline, ProfileHeader.

## API integration
Use typed API client, runtime response parsing, refresh token handling, centralized errors, retry policy only for safe requests, and upload progress. Keep access tokens out of insecure storage. Socket event schemas are versioned and validated.

## UX states and accessibility
Include loading, empty, offline, reconnecting, partial, failed, and permission-denied states. Web targets WCAG 2.2 AA; mobile supports screen readers, scalable text, touch target size, and reduced motion. Do not signal employee quality by color alone.

## Testing
Web component/integration/E2E tests for organization, knowledge, scenarios and analytics. Mobile tests for navigation, auth, Dojo lifecycle, Shadow updates, socket reconnection, rewards and offline/error states. Validate layouts on small Android devices as well as larger phones.
