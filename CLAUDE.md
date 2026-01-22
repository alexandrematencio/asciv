---
# Claude Code Project Instructions
# This file MUST NOT be deleted or have sections removed
# Only additions and updates are allowed
version: "1.0"
project: resume-builder
last_updated: 2026-01-21
---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Turbopack disabled due to Tailwind issues)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

This is a **Job Application Management** app built with Next.js 16 (App Router), React 19, Supabase, and Tailwind CSS. Users can track job applications, generate AI-powered CVs/cover letters, and manage their professional profile with role-specific customizations.

### Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript 5, Tailwind CSS 3.4
- **Backend**: Supabase (PostgreSQL + Auth), Anthropic Claude API
- **Libraries**: React Hook Form + Zod (validation), React Dropzone (file uploads), pdf-parse (PDF extraction), html2canvas + jsPDF (CV export)

---

## Core Data Model

All types are defined in `app/types.ts`:

### Application Types
- **Application**: Main entity with company, role, job description, status, and nested:
  - `cvVersions: CVVersion[]` - Generated or manual CV versions
  - `coverLetters: CoverLetter[]` - With styles: french_formal, french_modern, american_standard, american_creative
  - `statusHistory: StatusChange[]` - Timeline of status changes
  - `tracking: ApplicationTracking` - Sent date, interview info, outcome

- **ApplicationStatus**: draft | sent | waiting | interview | offer | rejected | closed

### User Profile Types
- **UserProfile**: Central user identity with personal info, professional summary, and arrays:
  - `education: Education[]`
  - `workExperience: WorkExperience[]`
  - `skills: Skill[]` (with category: technical/soft/language/tool and proficiency levels)
  - `certifications: Certification[]`
  - `languages: Language[]`
  - `portfolioLinks: PortfolioLink[]`

- **RoleProfile**: Job-specific CV variations with:
  - Custom summary per role
  - Selected experiences, skills, education to highlight
  - Custom achievements per experience
  - Icon and color customization

---

## Database Layer

Supabase with Row Level Security (RLS) for user data isolation.

### Database Files
- `lib/supabase-browser.ts` - Client-side Supabase client
- `lib/supabase-server.ts` - Server-side Supabase client for SSR/API routes
- `lib/supabase-db.ts` - Application CRUD (applications, templates, CV versions, cover letters)
- `lib/profile-db.ts` - Profile CRUD (user profiles, role profiles, completeness calculation)

### Tables (defined in `supabase-schema.sql`)
- **templates** - CV templates
- **applications** - Job applications
- **cv_versions** - Versioned CV content
- **cover_letters** - Versioned cover letters
- **status_history** - Timeline of status changes
- **application_tracking** - Interview scheduling, outcomes
- **user_profiles** - User profile data (JSONB for nested arrays)
- **role_profiles** - Role-based CV customizations

---

## Authentication

Supabase Auth with email/password:
- `app/contexts/AuthContext.tsx` - Provides `useAuth()` hook with `user`, `signIn`, `signUp`, `signOut`
- `middleware.ts` - Route protection: redirects unauthenticated users to `/login`
- **Public routes**: `/login`, `/signup`, `/auth/callback`
- **Protected routes**: `/` (dashboard), `/account`

---

## Context Providers

### AuthContext (`app/contexts/AuthContext.tsx`)
Manages authentication state and Supabase session.

### ProfileContext (`app/contexts/ProfileContext.tsx`)
Manages user profile and role profiles:
```typescript
const { profile, updateProfile, roleProfiles, saveRoleProfile } = useProfile();
```
- Auto-loads profile when user authenticates
- Creates empty profile on first login
- Tracks profile completeness percentage

---

## API Routes

### `/api/generate-resume` - CV Generation
Calls Claude API to generate tailored CV content.

### `/api/generate-cover-letter` - Cover Letter Generation
Calls Claude API to generate cover letters with style options.

### `/api/parse-cv-section` - AI-Powered CV Parsing
Parses CV text into structured data for bulk import:
```typescript
POST /api/parse-cv-section
{
  section: 'education' | 'experience' | 'skills',
  content: string
}
// Returns structured data + uncertainty flags for fields AI wasn't sure about
```

### `/api/extract-pdf-text` - PDF Text Extraction
Extracts text from uploaded PDF files:
- Uses `pdf-parse` v2 (class-based API: `new PDFParse({ data })`)
- Validates PDF magic bytes (%PDF)
- Max file size: 8MB
- Handles password-protected and image-based PDFs with appropriate errors

---

## Account Management System

Located in `app/account/` with 8 tabs:

1. **Core Info** (`PersonalInfoForm.tsx`) - Name, email, phone, location
2. **Education** (`EducationForm.tsx`) - Degrees with import support
3. **Experience** (`WorkExperienceForm.tsx`) - Work history with achievements
4. **Skills** (`SkillsForm.tsx`) - Skills with category and proficiency
5. **Certifications** (`CertificationsForm.tsx`) - Professional certifications
6. **Languages** (`LanguagesForm.tsx`) - Language proficiencies
7. **Links** (`LinksForm.tsx`) - Portfolio, GitHub, LinkedIn, etc.
8. **Role Profiles** (`RoleProfilesTab.tsx`) - Job-specific CV variations

### CV Import Feature
- `CVImportSection.tsx` - PDF upload or text paste interface
- `ImportPreviewModal.tsx` - Review and edit parsed data before saving
- Supports "Add" (append) or "Replace" (overwrite) modes

---

## Key Components

### Dashboard (`app/page.tsx`)
- Application list with status filtering
- KPI dashboard (counts by status)
- Interview tracking

### Modals
- `CVDetailModal.tsx` - View/edit application details, CV versions, cover letters
- `NewApplicationModal.tsx` - Create new applications
- `CoverLetterModal.tsx` - Cover letter generation and editing

### Editors
- `CVEditor.tsx` - CV content editing
- `CoverLetterEditor.tsx` - Cover letter editing
- `CVRenderer.tsx` - CV preview rendering

---

## Key Data Flows

### CV Import Flow
```
User uploads PDF → /api/extract-pdf-text → text extraction
                                         ↓
                  /api/parse-cv-section ← text content
                                         ↓
ImportPreviewModal shows parsed data with uncertainty highlighting
                                         ↓
User edits and confirms → saveUserProfile() → Supabase
```

### Application Workflow
```
Create Application → Track status (draft → sent → interview → offer)
                   → Generate/upload CV versions
                   → Generate/upload cover letters
                   → Schedule interviews → Record outcomes
```

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
```

---

## Development Notes

### pdf-parse v2 API
The project uses `pdf-parse` v2.4.5 which has a different API than v1:
```typescript
// v2 API (current)
import { PDFParse } from 'pdf-parse';
const pdfParser = new PDFParse({ data: uint8Array });
const result = await pdfParser.getText();
await pdfParser.destroy(); // cleanup

// NOT v1 API (old style)
// const pdfParse = require('pdf-parse');
// const data = await pdfParse(buffer);
```

### Turbopack
Turbopack is disabled in dev script due to Tailwind CSS compatibility issues. The workaround is in `package.json`:
```json
"dev": "NEXT_PRIVATE_TURBOPACK=0 next dev"
```

### Profile Completeness
Calculated in `lib/profile-db.ts` with weighted scoring:
- Work Experience: 20 points
- Professional Summary: 15 points
- Skills: 15 points
- Education: 15 points
- Portfolio Links: 10 points
- Other fields: 5 points each
- Complete threshold: 80%

---

## Future Roadmap

### Job Filtering/Matching System (Planned)
The application will evolve to include intelligent job filtering and matching based on:
- User profile analysis (skills, experience, education)
- Job description parsing and requirement extraction
- Skill gap identification
- Match scoring algorithm
- Personalized job recommendations

### Planned Features
1. **Job Scraping Integration** - Import jobs from LinkedIn, Indeed, etc.
2. **Match Score Dashboard** - Visual indication of profile-job compatibility
3. **Skill Gap Analysis** - Identify missing skills for target roles
4. **Auto-tagging** - Automatic categorization of applications by match quality
