# MLUE Master Plan — LMS & Career Ecosystem (17 Features / 5 Epics)

Status legend: ⬜ Not started · 🟨 Partially exists · 🟩 Schema approved/in progress · ✅ Shipped

## EPIC 1 — Career & B2B Integration
1. ✅ **Auto CV Builder** — 1-click PDF generation of a student's resume from completed courses, XP, and medals. Shipped: `/cv` page + portfolio project add/delete in the Karyera Mərkəzi tab.
2. 🟩 **Micro-Internships Board** — job-board style section for companies to post real tasks students complete for portfolio credit. Schema support approved (real `companies`/`internship_postings`/`internship_applications` tables); UI still reads the old hardcoded mock list until the board is rebuilt.
3. 🟩 **B2B Corporate Portal** — Studio sub-panel with RBAC for company managers to track their employees' course progress. Schema/RBAC approved (`company_manager` staff role, company-scoped RLS); Studio UI not yet built.
4. ⬜ **Digital Marketplace** — e-commerce for students to sell digital assets (templates, design tokens, code snippets). *Deferred — needs its own payment-processing design pass; no schema designed yet.*

## EPIC 2 — Gamification & UX
5. ⬜ In-Video Quizzes — pop-up questions that pause playback at a timestamp; resumes only on a correct answer.
6. ⬜ Audio/Podcast Mode — Spotify-style background audio playback toggle for courses.
7. ⬜ Daily Streak System — Duolingo-style flame/streak tracking. (`profiles.current_streak`/`last_activity_at` already exist and are used by the Achievements panel — mostly a UI/visibility upgrade, not new schema.)
8. ⬜ Co-Study Rooms — real-time virtual rooms (Supabase Realtime) with Pomodoro timers + lo-fi audio.

## EPIC 3 — Analytics & Studio Management
9. ⬜ Video Heatmaps — Studio visualization of which video segments are replayed/skipped.
10. ⬜ Revenue Split System — automated payout division between co-creators/group mates (e.g. 50/50). Builds on the existing `instructor_earnings`/`payout_requests` ledger.
11. ⬜ Student "Risk" Index — table of inactive students with a 1-click encouragement-email trigger.

## EPIC 4 — Trust, Security & Offline
12. ⬜ QR Verified Certificates — unique QR codes on certificates linking to a public verification page.
13. ⬜ PWA Offline Mode — service workers for downloading courses over Wi-Fi for offline in-app viewing.
14. ⬜ Plagiarism Checker — automated scan of student project submissions for copied content.

## EPIC 5 — Sales & Monetization
15. ⬜ "Gift a Course" — checkout flow to purchase a course as a shareable gift link.
16. ⬜ Bundle Subscriptions — grouped courses sold under a single recurring monthly subscription.
17. ⬜ Alumni Network — locked, LinkedIn-style forum for high-XP graduates/professionals.

## Execution Protocol
- One epic (or sub-feature) at a time: schema/design → user approval → components → verify → ship → MLUE NEWS changelog entry, per this project's established workflow (see `CLAUDE.md`).
- Epic 1 schema is approved (2026-07-29) — see the migration delivered alongside this roadmap (`companies`, `company_members`, `company_join_codes`, `internship_postings`, `internship_applications`, `portfolio_projects` extension, `staff_role`/`studio_invites.role` extended with `'company_manager'`). Component work for Epic 1 starts only after that SQL has been run in Supabase and confirmed.
