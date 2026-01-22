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

-- RLS Policies (for now, allow all - you can add auth later)
CREATE POLICY "Allow all operations on templates" ON templates FOR ALL USING (true);
CREATE POLICY "Allow all operations on applications" ON applications FOR ALL USING (true);
CREATE POLICY "Allow all operations on cv_versions" ON cv_versions FOR ALL USING (true);
CREATE POLICY "Allow all operations on cover_letters" ON cover_letters FOR ALL USING (true);
CREATE POLICY "Allow all operations on status_history" ON status_history FOR ALL USING (true);
CREATE POLICY "Allow all operations on application_tracking" ON application_tracking FOR ALL USING (true);
