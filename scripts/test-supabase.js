const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection and checking tables...\n');

  const tables = [
    'templates',
    'applications',
    'cv_versions',
    'cover_letters',
    'status_history',
    'application_tracking'
  ];

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('count');

    if (error) {
      console.log(`❌ Table "${table}": NOT FOUND`);
      console.log(`   Error: ${error.message}\n`);
    } else {
      console.log(`✅ Table "${table}": EXISTS`);
    }
  }

  console.log('\n📋 Next steps:');
  console.log('If tables are missing, execute the SQL schema in Supabase dashboard:');
  console.log('1. Go to: https://supabase.com/dashboard/project/wpljstnjssqahbjhaxmi/sql/new');
  console.log('2. Paste content from: supabase-schema.sql');
  console.log('3. Click "Run"\n');
}

testConnection().catch(console.error);
