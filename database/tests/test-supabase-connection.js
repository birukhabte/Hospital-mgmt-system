// Test Supabase Connection
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

console.log('Testing Supabase Connection...\n');

// Check environment variables
console.log('Environment Variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✓ Set' : '✗ Missing');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing');
console.log('');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error('❌ Missing Supabase environment variables!');
    console.log('Please check your .env file');
    process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function testConnection() {
    try {
        console.log('🔄 Testing Supabase connection...');
        
        // Test 1: Basic connection
        const { data, error } = await supabase
            .from('departments')
            .select('count(*)')
            .limit(1);
        
        if (error) {
            console.error('❌ Connection failed:', error.message);
            
            if (error.message.includes('relation "departments" does not exist')) {
                console.log('\n💡 The "departments" table doesn\'t exist yet.');
                console.log('Please run the SQL schema in your Supabase dashboard:');
                console.log('1. Go to your Supabase project');
                console.log('2. Navigate to SQL Editor');
                console.log('3. Copy and paste the contents of supabase-schema.sql');
                console.log('4. Run the SQL');
            }
            
            return false;
        }
        
        console.log('✅ Successfully connected to Supabase!');
        console.log('📊 Database response:', data);
        
        // Test 2: Check if tables exist
        console.log('\n🔄 Checking database tables...');
        
        const tables = ['users', 'doctor', 'employee', 'appointment', 'departments', 'store', 'complain', 'leaves'];
        
        for (const table of tables) {
            try {
                const { data, error } = await supabase
                    .from(table)
                    .select('count(*)')
                    .limit(1);
                
                if (error) {
                    console.log(`❌ Table "${table}": ${error.message}`);
                } else {
                    console.log(`✅ Table "${table}": Available`);
                }
            } catch (err) {
                console.log(`❌ Table "${table}": ${err.message}`);
            }
        }
        
        return true;
        
    } catch (err) {
        console.error('❌ Connection test failed:', err.message);
        return false;
    }
}

// Test the database controller
async function testController() {
    console.log('\n🔄 Testing Supabase controller...');
    
    try {
        const db = require('./models/supabase_controller');
        
        // Test getting departments
        db.getalldept((err, result) => {
            if (err) {
                console.error('❌ Controller test failed:', err.message);
            } else {
                console.log('✅ Controller working! Found', result?.length || 0, 'departments');
                if (result && result.length > 0) {
                    console.log('📋 Sample department:', result[0].department_name);
                }
            }
        });
        
    } catch (err) {
        console.error('❌ Controller test failed:', err.message);
        console.log('💡 Make sure you have installed dependencies: npm install');
    }
}

// Run tests
testConnection().then(success => {
    if (success) {
        setTimeout(testController, 1000); // Wait a bit before testing controller
    }
});