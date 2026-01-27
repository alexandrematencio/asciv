# PRD – Asciv Platform

> Product Requirements Document
> Version 1.2 | Last updated: 2026-01-24

---

## Core Offering

### What Makes Asciv Unique

Asciv is **not** a job board. It is **not** an application tracker. It is an **AI-powered job evaluation and application preparation platform** that answers one question before any other:

> **"Is this job worth my time?"**

### The Three Pillars

| Pillar | Description | Status |
|--------|-------------|--------|
| **1. AI Profile-to-Job Matching** | Import any job description. AI scores it against your profile — skills match, salary fit, location, remote policy, perks. Hard blockers are surfaced. A match score (0-100) tells you at a glance if it's worth pursuing. | ✅ Live |
| **2. AI Document Generation** | Your profile + job requirements = tailored CV and cover letter per application. AI restructures your experience to highlight what matters most for each role. Multiple styles (french formal, american creative, etc.). | ✅ Live |
| **3. Complete Application Pipeline** | From job evaluation → application creation → interview tracking → offer/rejection. One tool for the entire lifecycle. | ✅ Live |

### What We Are NOT

- Not a job board (we don't source jobs — the user imports them)
- Not volume-driven (quality of match over quantity of applications)
- Not a black box (every score is transparent, every suggestion is editable)
- Not addictive (no gamification, no FOMO, no streak counters)

### Differentiation vs Competitors

| | Asciv | Huntr | Teal | LinkedIn |
|--|-----------|-------|------|----------|
| Job evaluation before applying | ✅ AI matching + blockers | ❌ | Partial | ❌ |
| Skills gap analysis | ✅ Per job | ❌ | Partial | ❌ |
| AI CV tailoring per job | ✅ | ❌ | ✅ | ❌ |
| Cover letter generation | ✅ Multi-style | ❌ | ✅ | ❌ |
| Salary/location hard blockers | ✅ | ❌ | ❌ | ❌ |
| Role-specific profiles | ✅ | ❌ | ❌ | ❌ |
| Anti-addiction by design | ✅ | ❌ | ❌ | ❌ |

---

## Overview & Vision

**Asciv** is a premium career management platform that empowers professionals to take control of their job search with confidence, clarity, and dignity.

### Mission Statement

> Your career deserves clarity, not chaos.
>
> Asciv helps professionals make informed, regret-free career decisions through intelligent tools that respect their time, autonomy, and emotional wellbeing.

### Vision Moodboard

| Attribute | We Are | We Are Not |
|-----------|--------|------------|
| Tone | Calm, confident, respectful | Pushy, urgent, gamified |
| Intelligence | Advisor who explains | Black box that decides |
| Success | One right match | 100 applications sent |
| Emotion | Empowered, in control | Anxious, overwhelmed |
| Design | Refined, minimal, premium | Flashy, cluttered, cheap |

### Product Positioning

| Attribute | Asciv | Competitors |
|-----------|------------|-------------|
| Philosophy | Quality over quantity | Volume-driven |
| UX Priority | Reduce anxiety & fatigue | Maximize engagement |
| AI Role | Advisor, not autopilot | Full automation |
| Success Metric | Meaningful matches | Applications sent |

### Target Users

**Primary**: Mid-to-senior professionals (5-15 years experience) seeking career transitions or new opportunities in tech, design, and business roles.

**Characteristics**:
- Value quality of fit over application volume
- Prefer control and transparency over "black box" AI
- Sensitive to manipulation and dark patterns
- Willing to invest time upfront for better outcomes

### Jobs To Be Done (JTBD)

| When I... | I want to... | So I can... |
|-----------|--------------|-------------|
| Find an interesting job posting | Quickly assess if it's worth my time | Focus energy on high-fit opportunities |
| Prepare for an application | Tailor my CV to the specific role | Increase my chances of getting noticed |
| Track my job search | See my pipeline at a glance | Feel organized and in control |
| Receive a rejection | Understand what went wrong | Improve for next time |
| Feel overwhelmed by options | Get honest, actionable guidance | Make confident decisions |

---

## Core Values & Priorities

### UX Priorities (from DESIGN-SYSTEM.md)

| Priority | Principle | Rationale |
|----------|-----------|-----------|
| 1 | **Reliability & Trust** | First 5 seconds must convey professionalism |
| 2 | **Anti-Fatigue** | Minimize decision fatigue and post-action regret |
| 3 | **Empowerment** | User always feels in control |
| 4 | **Inclusivity** | Accessible design, even at aesthetic cost |
| 5 | **Anti-Addiction** | Never optimize for "time spent" or "volume" |

### Brand Personality (from BRAND-IDENTITY.md)

1. **Moderne** – Contemporary, not trendy
2. **Professionnel** – Serious without being cold
3. **Minimaliste** – Every element earns its place
4. **Calme** – Reduces anxiety, never creates it
5. **Raffiné** – Thoughtful details, premium feel
6. **Premium** – Worth paying for
7. **Bienveillant** – User's advocate, not a sales tool

### Forbidden Patterns

- Gamification of job applications
- Infinite scroll on job listings
- Celebratory micro-interactions
- "You've applied to X jobs!" metrics
- Dark patterns to increase engagement
- Excessive AI automation without user control

---

## Phase 1 – MVP (Implemented)

### 1.1 Resume Builder & CV Management

**Status**: ✅ Complete

| Feature | Description |
|---------|-------------|
| Profile Management | 8-tab account system (personal info, education, experience, skills, certifications, languages, links, role profiles) |
| CV Import | PDF upload or text paste with AI parsing |
| CV Generation | AI-powered CV tailoring per job description |
| CV Versioning | Multiple versions per application |
| CV Export | PDF generation with professional templates |

### 1.2 Cover Letter System

**Status**: ✅ Complete

| Feature | Description |
|---------|-------------|
| Style Options | French formal, French modern, American standard, American creative |
| AI Generation | Context-aware generation from job description + profile |
| Recipient Info | Company, contact, address management |
| Versioning | Multiple versions per application |

### 1.3 Application Tracking

**Status**: ✅ Complete

| Feature | Description |
|---------|-------------|
| Status Pipeline | draft → sent → waiting → interview → offer → rejected → closed |
| Status History | Full timeline of status changes |
| Interview Tracking | Date, type (phone/video/onsite), notes |
| Outcome Recording | Offer details, rejection feedback |
| KPI Dashboard | Counts by status, response rates |

### 1.4 Role Profiles

**Status**: ✅ Complete

| Feature | Description |
|---------|-------------|
| Custom Profiles | Create role-specific CV variations |
| Selective Content | Choose which experiences, skills, education to highlight |
| Custom Achievements | Role-specific achievement rewording |
| Visual Identity | Icon and color per role |

---

## Phase 2 – Job Intelligence Engine (Complete)

### 2.1 Overview

The Job Intelligence Engine helps users evaluate job opportunities against their profile, preferences, and career goals. Unlike traditional job boards that optimize for application volume, this system prioritizes **match quality** and **informed decision-making**.

### 2.2 User Stories

#### Epic 1: Job Preferences

| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| P1-01 | Job seeker | Define my salary expectations (annual, hourly, daily rates) | Jobs below my minimum are flagged | Must |
| P1-02 | Job seeker | Specify allowed locations (countries, cities) | I only see relevant geographic matches | Must |
| P1-03 | Job seeker | Set my remote work preference | Work mode mismatches are surfaced | Must |
| P1-04 | Job seeker | Configure working hours range | Part-time vs full-time is clear | Should |
| P1-05 | Job seeker | Select preferred perks | Benefit alignment is scored | Could |
| P1-06 | Job seeker | Adjust scoring weight
s | My priorities are reflected in scores | Should |

#### Epic 2: Job Import & Parsing

| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| P2-01 | Job seeker | Paste a job description | It's parsed into structured data | Must |
| P2-02 | Job seeker | Import from URL | Content is auto-fetched and parsed | Must |
| P2-03 | Job seeker | Review parsed data before saving | I can correct AI errors | Must |
| P2-04 | Job seeker | Edit extracted fields | Inaccurate parsing is fixable | Should |

#### Epic 3: Job Analysis & Matching

| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| P3-01 | Job seeker | See a match score (0-100) | I quickly assess fit | Must |
| P3-02 | Job seeker | See why a job is "blocked" | Hard blockers are transparent | Must |
| P3-03 | Job seeker | View skills match percentage | Skill gaps are clear | Must |
| P3-04 | Job seeker | Read AI-generated strengths | I know what to highlight | Should |
| P3-05 | Job seeker | See identified skill gaps | I can address weaknesses | Should |
| P3-06 | Job seeker | Get strategic application advice | I improve my approach | Could |
| P3-07 | Job seeker | View language proficiency match | Language requirements are checked | Must |

#### Epic 4: Job Management

| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| P4-01 | Job seeker | View all imported jobs | I have a central repository | Must |
| P4-02 | Job seeker | Filter by status/score | I focus on relevant opportunities | Should |
| P4-03 | Job seeker | Mark jobs as saved/applied/dismissed | Status is tracked | Should |
| P4-04 | Job seeker | Link to an application | Job → Application flow is seamless | ✅ Done |
| P4-05 | Job seeker | Analyze matching from an existing application | I can evaluate fit without re-entering data | ✅ Done |

### 2.3 Acceptance Criteria

#### AC-01: Preference-Based Blocking

```gherkin
GIVEN a user has set minSalary = €50,000/year
WHEN a job offers max €45,000/year
THEN the job is marked as "blocked"
AND the block reason shows "Salary below minimum"
AND the job is still visible (not hidden)
```

#### AC-02: Multi-Rate Salary Handling

```gherkin
GIVEN a user has set:
  - minSalary = €50,000/year (for CDI)
  - minHourlyRate = €50/hour (for freelance)
  - minDailyRate = €400/day (for TJM)
WHEN a job specifies "35€/hour"
THEN the system compares against minHourlyRate (not minSalary)
AND marks as blocked if below €50/hour
```

#### AC-03: URL Import Auto-Fetch

```gherkin
GIVEN a user enters a job posting URL
WHEN they click "Fetch & Parse"
THEN the system fetches the page content
AND extracts the job description
AND parses it into structured fields
AND shows preview for review
```

#### AC-04: Language Proficiency Matching

```gherkin
GIVEN a user has "French: Native, English: Bilingual" in profile
WHEN analyzing a job requiring "French language proficiency"
THEN the AI recognizes the match
AND does NOT flag French as a skill gap
```

#### AC-05: Score Transparency

```gherkin
GIVEN a job has been analyzed
WHEN viewing job details
THEN the user sees:
  - Overall score (0-100)
  - Skills match percentage
  - Perks match count
  - Block status with reasons (if any)
  - Matched skills list
  - Missing skills list
```

### 2.4 Prioritization

#### MoSCoW Summary

| Category | Features |
|----------|----------|
| **Must Have** | Job parsing, Preference blockers, Match scoring, Skills match, URL import |
| **Should Have** | AI insights (strengths/gaps/advice), Scoring weights, Status management, Filters |
| **Could Have** | Strategic advice, Culture fit analysis, Growth potential, Red flags detection |
| **Won't Have (v1)** | Job scraping, Auto-apply, Integration with job boards, Notifications |

#### RICE Scoring (Phase 2 Features)

| Feature | Reach | Impact | Confidence | Effort | RICE Score | Priority |
|---------|-------|--------|------------|--------|------------|----------|
| Job Parsing (paste) | 100% | 3 | 95% | M | 285 | P0 |
| Preference Blockers | 90% | 3 | 90% | M | 243 | P0 |
| Match Scoring | 100% | 3 | 85% | L | 170 | P0 |
| URL Auto-Fetch | 70% | 2 | 70% | M | 98 | P1 |
| AI Insights | 80% | 2 | 75% | L | 80 | P1 |
| Scoring Weights | 40% | 2 | 90% | S | 144 | P1 |
| Job Filters | 60% | 1 | 95% | S | 114 | P2 |
| Culture Fit Analysis | 30% | 2 | 50% | L | 20 | P3 |

*Reach: % of users who will use it | Impact: 1-3 scale | Confidence: certainty % | Effort: S/M/L*

#### Effort Estimates

| Effort | Definition | Examples |
|--------|------------|----------|
| **S** (Small) | <1 day | Scoring weights UI, filter toggles |
| **M** (Medium) | 1-3 days | URL fetching, preference form, job cards |
| **L** (Large) | 3-5 days | AI analysis pipeline, full job detail page |
| **XL** (Extra Large) | >5 days | Job scraping integration (out of scope v1) |

### 2.5 Implementation Status

| Component | Status | Location |
|-----------|--------|----------|
| Database Schema | ✅ Done | `supabase-schema.sql` |
| TypeScript Types | ✅ Done | `app/types.ts` |
| Database Layer | ✅ Done | `lib/job-intelligence-db.ts` |
| Filter Service | ✅ Done | `lib/job-filter-service.ts` |
| Parse Job API | ✅ Done | `app/api/parse-job-description/route.ts` |
| Analyze Job API | ✅ Done | `app/api/analyze-job/route.ts` |
| Fetch URL API | ✅ Done | `app/api/fetch-job-url/route.ts` |
| Context Provider | ✅ Done | `app/contexts/JobIntelligenceContext.tsx` |
| Jobs Page | ✅ Done | `app/jobs/page.tsx` |
| Job Detail Page | ✅ Done | `app/jobs/[id]/page.tsx` |
| Preferences Form | ✅ Done | `app/components/jobs/JobPreferencesForm.tsx` |
| Job Card | ✅ Done | `app/components/jobs/JobOfferCard.tsx` |
| Jobs List | ✅ Done | `app/components/jobs/JobOffersList.tsx` |
| Import Modal | ✅ Done | `app/components/jobs/JobImportModal.tsx` |
| Intelligence View | ✅ Done | `app/components/jobs/JobIntelligenceView.tsx` |

### 2.6 KPIs

#### User Success Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| Profile-to-Match Accuracy | >85% | AI insights match user perception |
| Time to First Analysis | <30s | Quick value demonstration |
| Block Reason Clarity | >90% NPS | Users understand why jobs are blocked |
| Skill Gap Actionability | >70% | Users can act on gap feedback |

#### Anti-Addiction Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| Jobs Analyzed per Session | <10 | Quality over quantity |
| Session Duration | <15min | Focused, not addictive |
| Return Visit Rate | Weekly | Healthy engagement pattern |

#### Business Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| Feature Adoption | >60% | Users who try job analysis |
| Preference Completion | >80% | Users who configure preferences |
| Analysis-to-Application Conversion | >20% | Quality leads to action |

### 2.7 Risks & Trade-offs

#### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| URL fetch blocked by sites | High | Medium | Graceful fallback to paste mode |
| AI parsing errors | Medium | Medium | User review/edit step before save |
| Rate limiting on Claude API | Low | High | Fallback insights, caching |

#### UX Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Score anxiety | Medium | High | Explain scoring as "fit", not "worth" |
| Analysis paralysis | Medium | Medium | Limit concurrent analyses, add guidance |
| Over-reliance on AI | Low | Medium | Always show "AI suggestion" labels |

#### Privacy Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| PII in logs | Medium | High | ✅ Removed sensitive console.logs |
| Profile data exposure | Low | Critical | RLS policies, server-side processing |
| Job URL tracking | Low | Medium | No analytics on URLs, ephemeral storage |

### 2.8 Privacy & GDPR Compliance

#### Data Flow (Job Analysis)

```
User Profile (Supabase)     Job Description (User Input)
        │                              │
        └──────────┬───────────────────┘
                   ▼
        API Route (Server-side)
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
  Anthropic API          Supabase DB
  (Analysis)             (Job Storage)
        │                     │
        └──────────┬──────────┘
                   ▼
           Client (Results)
```

#### GDPR Compliance Checklist

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Data minimization | ✅ | Only required fields stored |
| Purpose limitation | ✅ | Data used only for job matching |
| Storage limitation | ⚠️ | Need: auto-delete old jobs policy |
| Right to erasure | ✅ | Cascade delete on user deletion |
| Data portability | ❌ | TODO: Export user data feature |
| Consent | ⚠️ | Need: explicit opt-in for AI analysis |
| Processing transparency | ✅ | AI suggestions labeled as such |

#### Security Controls

| Control | Status | Notes |
|---------|--------|-------|
| RLS (Row Level Security) | ✅ | All tables protected |
| Server-side API keys | ✅ | Never exposed to client |
| Input validation | ✅ | Zod schemas on all inputs |
| Rate limiting | ⚠️ | TODO: Implement on AI endpoints |
| Audit logging | ❌ | TODO: Track data access |
| Encryption at rest | ✅ | Supabase default |
| Encryption in transit | ✅ | HTTPS enforced |

#### Data Retention Policy (Proposed)

| Data Type | Retention | Rationale |
|-----------|-----------|-----------|
| User Profile | Until deletion | Core user data |
| Job Offers | 90 days inactive | Reduce storage, GDPR |
| Analysis Results | With job offer | Tied to job lifecycle |
| Feedback | 1 year | Improve AI quality |

### 2.9 UX & Brand Alignment

#### Emotional Heatmap (Job Analysis Flow)

| Stage | Emotion | Score | Design Response |
|-------|---------|-------|-----------------|
| Import Job | Curiosity | 7 | Clean, inviting modal |
| Waiting for Parse | Mild Anxiety | 5 | Calm loading state, no countdown |
| Review Parsed Data | Control | 8 | Editable fields, clear feedback |
| Waiting for Analysis | Anticipation | 6 | Purposeful animation, no hype |
| Viewing Results | Vulnerable | 4 | Neutral presentation, no judgment |
| Reading Blocked Reason | Defensiveness | 3 | Factual tone, respect dignity |
| Seeing Strengths | Confidence | 8 | Validate without flattery |
| Seeing Gaps | Exposed | 4 | Actionable, not critical |

#### Value Alignment Score

| Principle | Score | Notes |
|-----------|-------|-------|
| Fiabilité | 85/100 | Transparent scoring, editable data |
| Anti-fatigue | 80/100 | Clear hierarchy, no overwhelm |
| Empowerment | 90/100 | User controls preferences, reviews AI |
| Inclusivité | 75/100 | Need to test with screen readers |
| Anti-addiction | 95/100 | No gamification, no volume metrics |

#### Regret-Minimization Checklist

- [x] Can user undo/edit after parsing? → Yes
- [x] Is blocking reason transparent? → Yes
- [x] Can user override AI suggestions? → Partial (can edit, not override score)
- [x] Is there a "slow mode" option? → No (consider for v2)
- [x] Are negative results presented with dignity? → Yes

### 2.10 Voice & Tone Guidelines

#### Micro-Copy Principles

| Context | Do | Don't |
|---------|----|----|
| Success states | "Job saved." | "Awesome! Job saved! 🎉" |
| Error states | "Unable to fetch URL. Try pasting the description." | "Oops! Something went wrong!" |
| Loading states | "Analyzing..." | "Hold tight! Magic happening!" |
| Empty states | "No jobs yet. Import one to get started." | "Looks empty here! 😢" |
| Blocked jobs | "Below your minimum salary." | "This job doesn't pay enough!" |
| Match scores | "72% match with your profile" | "Great match! You should apply!" |

#### Tone Matrix

| Situation | Tone | Example |
|-----------|------|---------|
| Positive result | Factual, understated | "Strong alignment with your skills." |
| Negative result | Respectful, actionable | "Missing: React, TypeScript. Consider highlighting related experience." |
| User error | Helpful, no blame | "Please enter a valid URL." |
| System error | Honest, solution-focused | "Analysis unavailable. Your data is saved." |
| Onboarding | Welcoming, minimal | "Set your preferences to get started." |

#### Words to Avoid

| Avoid | Use Instead | Reason |
|-------|-------------|--------|
| Amazing, Awesome, Great | Good, Strong, Clear | Over-enthusiasm feels cheap |
| Oops, Uh-oh | (nothing, just state fact) | Infantilizing |
| Sorry | (rephrase without apology) | Over-apologizing weakens trust |
| Just, Simply | (remove) | Implies task is trivial |
| AI-powered, Smart | (describe what it does) | Buzzword fatigue |

---

## Appendix

### A. Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript 5, Tailwind CSS 3.4 |
| Backend | Supabase (PostgreSQL + Auth), Anthropic Claude API |
| State | React Context, React Hook Form + Zod |
| Files | pdf-parse v2, React Dropzone, html2canvas + jsPDF |

### B. API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/generate-resume` | POST | Generate tailored CV |
| `/api/generate-cover-letter` | POST | Generate cover letter |
| `/api/parse-cv-section` | POST | Parse CV text |
| `/api/extract-pdf-text` | POST | Extract PDF content |
| `/api/parse-job-description` | POST | Parse job posting |
| `/api/analyze-job` | POST | Analyze job-profile fit |
| `/api/fetch-job-url` | POST | Fetch job page content |

### C. Database Tables

| Table | Purpose |
|-------|---------|
| `user_profiles` | User identity and career data |
| `role_profiles` | Role-specific CV variations |
| `applications` | Job applications |
| `cv_versions` | CV content versions |
| `cover_letters` | Cover letter versions |
| `job_preferences` | User job search criteria |
| `job_offers` | Imported job postings (with optional `source_application_id` link) |
| `job_analysis_feedback` | User feedback on analysis |

---

## Recent Changes (January 2026)

### Navigation & Information Architecture
- Section "Jobs" renamed to **"Matching"** with `Target` icon (was `Briefcase`)
- Empty state onboarding copy updated: "Evaluate jobs before you apply."
- Stat card: "Total Jobs" → "Imported"
- Account back button: uses `router.back()` (context-aware) instead of hardcoded `/`

### Landing Page Overhaul
- Hero: "Know which jobs fit you **before you apply.**"
- Removed all "coming soon" / "waitlist" language (Job Intelligence is live)
- Features reordered: matching → filtering → CV → cover letters → role profiles → pipeline
- Dark section: "Coming Soon" → "Core Feature" highlight
- How It Works: 3 steps → 4 steps (includes matching flow)
- CTA: "Stop guessing. Start matching."
- Removed fake social proof

### Interview Filter Fix
- Applications with status `offer`, `rejected`, or `closed` are now excluded from the Interview filter tab and stat count (previously they lingered if `interviewScheduled` was set)

### Job Analysis Improvements
- Cross-language skill matching (French ↔ English equivalents)
- Work experience achievements used as evidence of skills
- AI insights include: strengths, skill gaps, strategic advice, culture fit, growth potential, red flags

### Application → Matching Bridge
- "Analyze Matching" button in CVDetailModal (accent blue, same size as Edit/Delete)
- One-click matching analysis from any existing application with job description
- JobImportModal `from-application` mode: pre-fills company, role, description
- `source_application_id` column links job_offers to their source application
- Duplicate detection: re-clicking redirects to existing analysis instead of creating new
- JobIntelligenceProvider added to main Applications page

### Match Statistics Redesign
- **Skills Detail** (3-row breakdown):
  - Matched Skills (green badges, or "no match found")
  - Required but Missing (neutral with border)
  - Your Additional Skills (all user skills not required by the job)
- **Perks Detail** (3-row breakdown):
  - Matched Perks (green, or "no perks offered")
  - Perks Offered (all job perks)
  - Your Preferences Not Matched (user's desired perks missing from offer)
- Client-side skill matching uses substring logic (same as API) for real-time accuracy
- No 8-item cap on skill display; all skills shown in each category

### New Application Flow Improvements
- Manual entry option: description updated to mention profile prefill behavior
- Role profile save prompt: when using a role profile and modifying data in step 3, a confirmation modal asks whether to update the role profile with changes before creating the application

### Attention Indicators & Dynamic Sorting
- **Visual Hierarchy System** (Left Border Accent):
  - `interview-soon` (HIGH): 4px red border (`error-500`) + subtle red background (`error-50/30`) + Calendar icon (`w-5 h-5`, `error-600`)
  - `sent-stale` (MEDIUM): 4px amber border (`warning-500`) + subtle amber background (`warning-50/30`) + Clock icon (`w-5 h-5`, `warning-600`)
  - `draft-old` (LOW): 4px gray border (`primary-300`) + no background + FileText icon (`w-5 h-5`, `primary-400`)
- **Dynamic Sorting on Stat Filter Click**:
  - When clicking stat cards (Attention, Active, Responses), matching applications bubble to the top
  - Non-matching applications fade to `opacity-40` and move to bottom
  - For "Attention" filter: apps sort by priority (interview-soon > sent-stale > draft-old)
  - Secondary sort always by creation date (newest first)
- **Accessibility** (WCAG AA Triple Encoding):
  - Color: Red/Amber/Gray borders
  - Shape: Different icons (Calendar/Clock/FileText)
  - Text: Descriptive `aria-label` tooltips (e.g., "Interview in 2 day(s)")
- **Brand Alignment**:
  - Red for interview-soon avoids conflict with violet interview badges
  - No pulse animations (violates "calm, professional" brand guideline)
  - Static indicators with urgent colors reduce anxiety without creating stress

---

*Document maintained by the Asciv Product Team*
*Last updated: 2026-01-26*

