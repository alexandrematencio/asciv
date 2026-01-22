const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...\n');

  // Read the SQL schema file
  const schemaPath = path.join(__dirname, '..', 'supabase-schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  console.log('📝 SQL Schema loaded\n');
  console.log('⚠️  Note: For security reasons, we cannot execute raw SQL from client-side code.');
  console.log('📋 Please follow these steps:\n');
  console.log('1. Open your Supabase dashboard: https://supabase.com/dashboard/project/wpljstnjssqahbjhaxmi');
  console.log('2. Click on "SQL Editor" in the left sidebar');
  console.log('3. Click "New query"');
  console.log('4. Copy and paste the content from supabase-schema.sql');
  console.log('5. Click "Run" to execute the schema\n');
  console.log('✅ The schema file is ready at: supabase-schema.sql\n');

  // Test connection
  console.log('🔍 Testing Supabase connection...');
  const { data, error } = await supabase.from('templates').select('count');

  if (error) {
    if (error.message.includes('relation') || error.message.includes('does not exist')) {
      console.log('✅ Connection successful, but tables not yet created');
      console.log('👉 Please execute the SQL schema in the Supabase dashboard as described above\n');
    } else {
      console.error('❌ Connection error:', error.message);
    }
  } else {
    console.log('✅ Connection successful! Tables already exist.');
    console.log('📊 Current templates count:', data);
  }
}

setupDatabase().catch(console.error);
