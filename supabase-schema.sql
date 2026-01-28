-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('design', 'dev', 'business', 'custom')),
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at BIGINT NOT NULL,
  last_modified BIGINT NOT NULL,
  usage_count INTEGER DEFAULT 0,
  success_rate NUMERIC DEFAULT 0,
  user_id TEXT,
  created_at_timestamp TIMESTAMPTZ DEFAULT NOW(),
  updated_at_timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  job_description TEXT NOT NULL,
  job_url TEXT,
  selected_template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'waiting', 'interview', 'offer', 'rejected', 'closed')),
  created_at BIGINT NOT NULL,
  applied_at BIGINT,
  notes TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  is_favorite BOOLEAN DEFAULT FALSE,
  user_id TEXT,
  created_at_timestamp TIMESTAMPTZ DEFAULT NOW(),
  updated_at_timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- CV Versions table
CREATE TABLE IF NOT EXISTS cv_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content TEXT NOT NULL,
  generated_by TEXT NOT NULL CHECK (generated_by IN ('ai', 'manual')),
  created_at BIGINT NOT NULL,
  modified_at BIGINT,
  created_at_timestamp TIMESTAMPTZ DEFAULT NOW(),
  updated_at_timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Cover Letters table
CREATE TABLE IF NOT EXISTS cover_letters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content TEXT NOT NULL,
  style TEXT NOT NULL CHECK (style IN ('french_formal', 'french_modern', 'american_standard', 'american_creative')),
  recipient_info JSONB NOT NULL,
  generated_by TEXT NOT NULL CHECK (generated_by IN ('ai', 'manual')),
  created_at BIGINT NOT NULL,
  modified_at BIGINT,
  created_at_timestamp TIMESTAMPTZ DEFAULT NOW(),
  updated_at_timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Status History table
CREATE TABLE IF NOT EXISTS status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  note TEXT,
  created_at_timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Application Tracking table
CREATE TABLE IF NOT EXISTS application_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL UNIQUE REFERENCES applications(id) ON DELETE CASCADE,
  sent_date BIGINT,
  sent_via TEXT CHECK (sent_via IN ('indeed', 'linkedin', 'email', 'company_site', 'other')),
  follow_up_dates BIGINT[] DEFAULT '{}',
  interview_scheduled JSONB,
  outcome JSONB,
  closed_reason TEXT CHECK (closed_reason IN ('accepted', 'declined', 'expired')),
  closed_date BIGINT,
  created_at_timestamp TIMESTAMPTZ DEFAULT NOW(),
  updated_at_timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cv_versions_application_id ON cv_versions(application_id);
CREATE INDEX IF NOT EXISTS idx_cover_letters_application_id ON cover_letters(application_id);
CREATE INDEX IF NOT EXISTS idx_status_history_application_id ON status_history(application_id);
CREATE INDEX IF NOT EXISTS idx_application_tracking_application_id ON application_tracking(application_id);

-- Enable Row Level Security (RLS)
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies (proper user isolation for GDPR compliance)

-- Templates (user_id is TEXT, need cast until migrated to UUID)
CREATE POLICY "Users can read shared and own templates"
  ON templates FOR SELECT USING (user_id IS NULL OR user_id = auth.uid()::text);
CREATE POLICY "Users can create templates"
  ON templates FOR INSERT WITH CHECK (user_id = auth.uid()::text);
CREATE POLICY "Users can update own templates"
  ON templates FOR UPDATE USING (user_id = auth.uid()::text);
CREATE POLICY "Users can delete own templates"
  ON templates FOR DELETE USING (user_id = auth.uid()::text);

-- Applications (user_id is TEXT)
CREATE POLICY "Users can read own applications"
  ON applications FOR SELECT USING (user_id = auth.uid()::text);
CREATE POLICY "Users can create applications"
  ON applications FOR INSERT WITH CHECK (user_id = auth.uid()::text);
CREATE POLICY "Users can update own applications"
  ON applications FOR UPDATE USING (user_id = auth.uid()::text);
CREATE POLICY "Users can delete own applications"
  ON applications FOR DELETE USING (user_id = auth.uid()::text);

-- CV Versions (check via parent application)
CREATE POLICY "Users can manage CVs for own applications"
  ON cv_versions FOR ALL USING (
    application_id IN (SELECT id FROM applications WHERE user_id = auth.uid()::text)
  );

-- Cover Letters (check via parent application)
CREATE POLICY "Users can manage cover letters for own applications"
  ON cover_letters FOR ALL USING (
    application_id IN (SELECT id FROM applications WHERE user_id = auth.uid()::text)
  );

-- Status History (check via parent application)
CREATE POLICY "Users can manage status for own applications"
  ON status_history FOR ALL USING (
    application_id IN (SELECT id FROM applications WHERE user_id = auth.uid()::text)
  );

-- Application Tracking (check via parent application)
CREATE POLICY "Users can manage tracking for own applications"
  ON application_tracking FOR ALL USING (
    application_id IN (SELECT id FROM applications WHERE user_id = auth.uid()::text)
  );

-- ============================================
-- JOB INTELLIGENCE ENGINE TABLES
-- ============================================

-- Job Preferences (user filtering criteria)
CREATE TABLE IF NOT EXISTS job_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Location preferences
  allowed_countries TEXT[] DEFAULT '{}',
  allowed_cities TEXT[] DEFAULT '{}',

  -- Salary preferences
  min_salary INTEGER,
  salary_currency TEXT DEFAULT 'EUR',

  -- Hours preferences
  min_hours_per_week INTEGER DEFAULT 35,
  max_hours_per_week INTEGER DEFAULT 45,

  -- Presence preferences
  remote_preference TEXT CHECK (remote_preference IN ('full_remote', 'hybrid', 'on_site', 'any')) DEFAULT 'any',

  -- Perks preferences
  preferred_perks TEXT[] DEFAULT '{}',

  -- Scoring weights (0-100, total should equal 100)
  weight_salary INTEGER DEFAULT 30,
  weight_skills INTEGER DEFAULT 50,
  weight_perks INTEGER DEFAULT 20,

  -- Thresholds
  min_skills_match_percent INTEGER DEFAULT 65,

  -- GDPR Consent
  ai_consent BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id)
);

-- Job Offers (imported/analyzed jobs)
CREATE TABLE IF NOT EXISTS job_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Basic info
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  country TEXT,
  city TEXT,

  -- Compensation
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT,
  salary_rate_type TEXT CHECK (salary_rate_type IN ('annual', 'monthly', 'hourly', 'daily')),

  -- Work conditions
  hours_per_week INTEGER,
  presence_type TEXT CHECK (presence_type IN ('full_remote', 'hybrid', 'on_site')),
  contract_type TEXT,

  -- Content
  description TEXT,
  required_skills TEXT[] DEFAULT '{}',
  nice_to_have_skills TEXT[] DEFAULT '{}',
  perks TEXT[] DEFAULT '{}',

  -- Source
  source_url TEXT,
  source_platform TEXT,
  source_application_id UUID REFERENCES applications(id) ON DELETE SET NULL,

  -- Analysis results
  is_blocked BOOLEAN DEFAULT FALSE,
  block_reasons TEXT[] DEFAULT '{}',
  skills_match_percent INTEGER,
  perks_match_count INTEGER,
  overall_score INTEGER,

  -- AI insights (stored as JSONB)
  ai_insights JSONB,

  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'analyzed', 'saved', 'applied', 'rejected', 'archived')),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  analyzed_at TIMESTAMPTZ
);

-- Index for looking up job offers linked to an application
CREATE INDEX idx_job_offers_source_application_id
ON job_offers(source_application_id)
WHERE source_application_id IS NOT NULL;

-- Job Analysis Feedback (for feedback loop)
CREATE TABLE IF NOT EXISTS job_analysis_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_offer_id UUID NOT NULL REFERENCES job_offers(id) ON DELETE CASCADE,

  -- User feedback
  feedback_type TEXT CHECK (feedback_type IN ('helpful', 'not_helpful', 'wrong_score', 'good_match', 'bad_match')),
  feedback_notes TEXT,

  -- What the user did
  user_action TEXT CHECK (user_action IN ('saved', 'applied', 'dismissed', 'ignored')),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for job intelligence tables
ALTER TABLE job_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_analysis_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job intelligence tables
CREATE POLICY "Users can manage their own job preferences"
  ON job_preferences FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own job offers"
  ON job_offers FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own job feedback"
  ON job_analysis_feedback FOR ALL USING (auth.uid() = user_id);

-- Indexes for job intelligence tables
CREATE INDEX IF NOT EXISTS idx_job_offers_user_status ON job_offers(user_id, status);
CREATE INDEX IF NOT EXISTS idx_job_offers_overall_score ON job_offers(user_id, overall_score DESC);
CREATE INDEX IF NOT EXISTS idx_job_preferences_user_id ON job_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_job_analysis_feedback_job_offer_id ON job_analysis_feedback(job_offer_id);

-- ============================================
-- USER PROFILE TABLES
-- ============================================

-- User Profiles (main profile data)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Personal info
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT,
  date_of_birth TEXT,
  city TEXT,
  country TEXT,

  -- Professional
  professional_summary TEXT,

  -- JSON arrays for complex data
  education JSONB DEFAULT '[]'::jsonb,
  work_experience JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  awards JSONB DEFAULT '[]'::jsonb,
  languages JSONB DEFAULT '[]'::jsonb,
  affiliations JSONB DEFAULT '[]'::jsonb,
  volunteer_experience JSONB DEFAULT '[]'::jsonb,
  portfolio_links JSONB DEFAULT '[]'::jsonb,

  -- Metadata
  profile_completeness INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role Profiles (job-specific CV variations)
CREATE TABLE IF NOT EXISTS role_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Identification
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '🎯',
  color TEXT DEFAULT '#6366f1',

  -- Customization
  custom_summary TEXT,
  selected_experience_ids TEXT[] DEFAULT '{}',
  experience_order TEXT[] DEFAULT '{}',
  selected_skill_ids TEXT[] DEFAULT '{}',
  skill_priority TEXT[] DEFAULT '{}',
  selected_education_ids TEXT[] DEFAULT '{}',
  selected_certification_ids TEXT[] DEFAULT '{}',
  additional_skills JSONB DEFAULT '[]'::jsonb,
  custom_achievements JSONB DEFAULT '[]'::jsonb,

  -- Status
  is_default BOOLEAN DEFAULT FALSE,
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies (proper user isolation)
CREATE POLICY "Users can manage their own profile"
  ON user_profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own role profiles"
  ON role_profiles FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_role_profiles_user_id ON role_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_role_profiles_is_default
  ON role_profiles(user_id, is_default) WHERE is_default = true;
