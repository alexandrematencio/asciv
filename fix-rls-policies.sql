-- ============================================
-- FIX RLS POLICIES ON EXISTING TABLES
-- ============================================
-- This script updates RLS policies without recreating tables
-- Safe to run on database with existing data

-- ============================================
-- STEP 1: DROP INSECURE POLICIES
-- ============================================

-- Templates
DROP POLICY IF EXISTS "Allow all operations on templates" ON templates;

-- Applications
DROP POLICY IF EXISTS "Allow all operations on applications" ON applications;

-- CV Versions
DROP POLICY IF EXISTS "Allow all operations on cv_versions" ON cv_versions;

-- Cover Letters
DROP POLICY IF EXISTS "Allow all operations on cover_letters" ON cover_letters;

-- Status History
DROP POLICY IF EXISTS "Allow all operations on status_history" ON status_history;

-- Application Tracking
DROP POLICY IF EXISTS "Allow all operations on application_tracking" ON application_tracking;

-- ============================================
-- STEP 2: CREATE SECURE USER-ISOLATED POLICIES
-- ============================================

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
-- VERIFICATION QUERIES
-- ============================================

-- After running, verify policies are correct:
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename IN ('templates', 'applications', 'cv_versions', 'cover_letters', 'status_history', 'application_tracking')
ORDER BY tablename, cmd;

-- Expected result: Should NOT see any "USING (true)" policies
