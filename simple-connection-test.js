// Simple Supabase Connection Test (without external dependencies)
const fs = require('fs');
const https = require('https');

console.log('🔄 Testing Supabase Connection...\n');

// Read .env file manually
let envContent = '';
try {
    envContent = fs.readFileSync('.env', 'utf8');
} catch (err) {
    console.error('❌ Cannot read .env file:', err.message);
    process.exit(1);
}

// Parse environment variables
const envVars = {};
envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            envVars[key.trim()] = valueParts.join('=').trim();
        }
    }
});

console.log('Environment Variables:');
console.log('SUPABASE_URL:', envVars.SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('SUPABASE_ANON_KEY:', envVars.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');
console.log('');

if (!envVars.SUPABASE_URL || !envVars.SUPABASE_ANON_KEY) {
    console.error('❌ Missing Supabase environment variables!');
    process.exit(1);
}

// Test basic connection to Supabase
function testSupabaseConnection() {
    const url = new URL(envVars.SUPABASE_URL + '/rest/v1/departments?select=count');
    
    const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
            'apikey': envVars.SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${envVars.SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
        }
    };

    console.log('🔄 Testing connection to:', envVars.SUPABASE_URL);
    
    const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('📡 Response Status:', res.statusCode);
            
            if (res.statusCode === 200) {
                console.log('✅ Successfully connected to Supabase!');
                console.log('📊 Response:', data);
                console.log('\n✅ Your Supabase connection is working!');
                console.log('\n📋 Next steps:');
                console.log('1. Run: npm install');
                console.log('2. Create tables by running supabase-schema.sql in your Supabase dashboard');
                console.log('3. Update your controllers to use the Supabase controller');
            } else if (res.statusCode === 404) {
                console.log('⚠️  Connected to Supabase, but "departments" table not found');
                console.log('💡 Please run the SQL schema in your Supabase dashboard:');
                console.log('   1. Go to your Supabase project');
                console.log('   2. Navigate to SQL Editor');
                console.log('   3. Copy and paste the contents of supabase-schema.sql');
                console.log('   4. Run the SQL');
            } else {
                console.log('❌ Connection issue. Response:', data);
            }
        });
    });
    
    req.on('error', (err) => {
        console.error('❌ Connection failed:', err.message);
        console.log('💡 Please check:');
        console.log('   - Your internet connection');
        console.log('   - Your Supabase URL and API key');
        console.log('   - Your Supabase project is active');
    });
    
    req.setTimeout(10000, () => {
        console.error('❌ Connection timeout');
        req.destroy();
    });
    
    req.end();
}

testSupabaseConnection();