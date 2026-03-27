// Test if database tables exist
require('dotenv').config();
const db = require('./models/supabase_controller');

console.log('🔍 Testing database connection and tables...\n');

// Test 1: Try to get all users
console.log('📊 Testing users table...');
db.getuserdetails('admin', function(err, result) {
    if (err) {
        console.error('❌ Users table error:', err.message);
        console.log('💡 You need to create the users table in Supabase');
        console.log('📋 Go to: https://supabase.com/dashboard/project/lojzhgkzbcblmryyebxb');
        console.log('🔧 SQL Editor → Run the content from create-user-table.sql');
    } else {
        console.log('✅ Users table exists and working!');
        if (result) {
            console.log('👤 Found user:', result.username);
        } else {
            console.log('👤 No admin user found - you can create one via signup');
        }
    }
});

// Test 2: Try to get departments
console.log('\n📊 Testing departments table...');
db.getalldept(function(err, result) {
    if (err) {
        console.error('❌ Departments table error:', err.message);
        console.log('💡 You need to create the departments table in Supabase');
    } else {
        console.log('✅ Departments table exists!');
        console.log('🏥 Found', result ? result.length : 0, 'departments');
    }
});

setTimeout(() => {
    console.log('\n🎯 Summary:');
    console.log('If you see errors above, please:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Run the SQL from supabase-schema.sql or create-user-table.sql');
    console.log('4. Restart your server');
    process.exit(0);
}, 2000);