import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...\n');

  // Read the SQL schema file
  const schemaPath = path.join(__dirname, '..', 'supabase-schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  // Split into individual statements
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';

    // Skip comments
    if (statement.trim().startsWith('--')) continue;

    console.log(`⚙️  Executing statement ${i + 1}/${statements.length}...`);

    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        query: statement
      });

      if (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error);
        console.error('Statement:', statement.substring(0, 100) + '...');
      } else {
        console.log(`✅ Statement ${i + 1} executed successfully`);
      }
    } catch (err) {
      console.error(`❌ Exception executing statement ${i + 1}:`, err);
      console.error('Statement:', statement.substring(0, 100) + '...');
    }
  }

  console.log('\n✨ Database setup complete!');
}

setupDatabase().catch(console.error);
