// Manual Supabase Setup Verification
console.log('🔍 Verifying Supabase Setup...\n');

// Check if required files exist
const fs = require('fs');

const requiredFiles = [
    '.env',
    'models/supabase_controller.js',
    'supabase-schema.sql'
];

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} - Found`);
    } else {
        console.log(`❌ ${file} - Missing`);
    }
});

// Check .env content
console.log('\n🔧 Checking .env configuration:');
try {
    const envContent = fs.readFileSync('.env', 'utf8');
    
    if (envContent.includes('https://lojzhgkzbcblmryyebxb.supabase.co')) {
        console.log('✅ SUPABASE_URL - Configured');
    } else {
        console.log('❌ SUPABASE_URL - Not configured or incorrect');
    }
    
    if (envContent.includes('sb_publishable_K5t9AR9aS9otxEjGgcg-FQ_vt1N-GB9')) {
        console.log('✅ SUPABASE_ANON_KEY - Configured');
    } else {
        console.log('❌ SUPABASE_ANON_KEY - Not configured or incorrect');
    }
    
} catch (err) {
    console.log('❌ Cannot read .env file');
}

// Check package.json dependencies
console.log('\n📦 Checking package.json dependencies:');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (packageJson.dependencies['@supabase/supabase-js']) {
        console.log('✅ @supabase/supabase-js - Listed in dependencies');
    } else {
        console.log('❌ @supabase/supabase-js - Missing from dependencies');
    }
    
    if (packageJson.dependencies['dotenv']) {
        console.log('✅ dotenv - Listed in dependencies');
    } else {
        console.log('❌ dotenv - Missing from dependencies');
    }
    
} catch (err) {
    console.log('❌ Cannot read package.json');
}

console.log('\n📋 Next Steps:');
console.log('1. Run: npm install (to install dependencies)');
console.log('2. Go to your Supabase dashboard');
console.log('3. Navigate to SQL Editor');
console.log('4. Copy and paste the contents of supabase-schema.sql');
console.log('5. Run the SQL to create tables');
console.log('6. Update your controllers to use models/supabase_controller.js');

console.log('\n🔗 Your Supabase Project URL: https://lojzhgkzbcblmryyebxb.supabase.co');
console.log('📊 Dashboard: https://supabase.com/dashboard/project/lojzhgkzbcblmryyebxb');