# UI / UX Guidelines — Shadow-Agent Dojo

## 1. Product experience
The platform links employee practice, in-the-moment assistance, and manager visibility. Keep employee interactions encouraging and low-friction; keep admin operations clear, auditable, and data-dense without overwhelming users.

## 2. Company admin journey
After login, admin lands on dashboard with total employees, active employees, sessions, average performance, key alerts and quick actions. Sidebar sections: Employees, Teams/Departments, Knowledge Base, Scenario Builder, Analytics, Leaderboards, Notifications, Settings.

## 3. Employee management
Employee list supports search, filters, status, role, team, and detail navigation. Employee detail includes profile, XP, performance, training history and achievements. Actions include invite, bulk CSV upload, suspend, unsuspend, and remove; destructive actions require confirmation and audit reason where policy requires.

## 4. Team management
Create teams, assign team lead, define department structure, manage team members. Prevent invalid cross-company membership and clearly show unassigned employees.

## 5. Knowledge Base
Support upload PDFs, SOPs and FAQs. Show file constraints, upload progress, parsing/indexing state, failed rows/files, version and owner. Document deletion/replacement must explain its impact on retrieval and any active sessions. Display processing failure and retry states.

## 6. Scenario Builder
Fields: title, objective, category, difficulty, persona, customer context, company knowledge constraints, success criteria, rubric mapping. AI-generated scenarios are drafts and require admin review before publish. Scenario editing is versioned so in-progress sessions retain the correct snapshot.

## 7. Dojo experience
Make the scenario goal and persona clear before start. During session show conversation, timer, connection state, and pause/end controls. Confirm ending. Do not interrupt conversation with intrusive animations. Results separate each rubric dimension, evidence, strengths, gaps, and next steps. XP and badges should reflect deterministic rules and show why they were awarded.

## 8. Shadow experience
Show live state and customer message context, sentiment/urgency as uncertain signals, suggested reply, relevant knowledge citations, coaching tip, next action, and escalation option. Employee remains in control. Provide copy/insert/accept/edit/reject actions according to integration support. Never auto-send. Maintain a clear stale/failed analysis state.

## 9. Continuous improvement
Show skill trends and suggested practice with evidence and sample counts. Avoid labeling employees based on one session. Explain why a scenario is recommended and how improvement is measured. Managers see aggregate patterns; individual detailed transcripts require permissions.

## 10. Leaderboards and fairness
Define time period, eligibility, minimum sessions, metric and tie handling. Exclude inactive/insufficient-data employees appropriately. Avoid public shaming; consider opt-in visibility and team-level alternatives. Do not use sensitive traits.

## 11. Realtime and notifications
Distinguish live updates from refreshes. Show reconnect state and last update. Notification types include training alerts, challenge updates and system notifications; announcement history remains searchable and permission-aware.

## 12. Responsive/accessibility
Admin web is responsive across desktop/tablet; mobile app is designed for phones. Keyboard navigation, screen reader labels, scalable type, adequate contrast, 44px mobile targets, reduced motion, semantic headings, and chart descriptions are required.

## 13. UX anti-patterns
Avoid unexplained employee scores, ungrounded suggestions, hidden document citations, automatic customer replies, fake realtime indicators, irreversible bulk actions without preview, and analytics without metric definitions.
