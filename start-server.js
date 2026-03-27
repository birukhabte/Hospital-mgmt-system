// Start the Medical Management System Server
console.log('🚀 Starting Medical Management System...\n');

// Load environment variables
require('dotenv').config();

// Check if environment variables are loaded
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error('❌ Missing Supabase environment variables!');
    console.log('Please check your .env file');
    process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('📊 Supabase URL:', process.env.SUPABASE_URL);

// Import required modules
var express = require('express');
var session = require('express-session');
var cookie = require('cookie-parser');
var path = require('path');
var ejs = require('ejs');
var multer = require('multer');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var bodyParser = require('body-parser');

// Import controllers
var login = require('./controllers/login');
var home = require('./controllers/home');
var signup = require('./controllers/signup');
var add_doc = require('./controllers/add_doctor');
var doc_controller = require('./controllers/doc_controller');
var reset = require('./controllers/reset_controller');
var set = require('./controllers/set_controller');
var employee = require('./controllers/employee.js');
var logout = require('./controllers/logout');
var verify = require('./controllers/verify');
var store = require('./controllers/store');
var landing = require('./controllers/landing');
var complain = require('./controllers/complain');
var inbox = require('./controllers/inbox');
var appointment = require('./controllers/appointment');
var receipt = require('./controllers/receipt');
var chat = require('./controllers/chat');

// Import Supabase database controller
var db = require('./models/supabase_controller');

console.log('✅ All modules loaded successfully');

// Create Express app
var app = express();

// Configure Express
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookie());

// Configure session
app.use(session({
    secret: 'hospital-management-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

console.log('✅ Express configured');

// Setup routes
app.use('/login', login);
app.use('/home', home);
app.use('/signup', signup);
app.use('/doctors', doc_controller);
app.use('/resetpassword', reset);
app.use('/setpassword', set);
app.use('/employee', employee);
app.use('/logout', logout);
app.use('/verify', verify);
app.use('/store', store);
app.use('/', landing);
app.use('/complain', complain);
app.use('/inbox', inbox);
app.use('/appointment', appointment);
app.use('/receipt', receipt);

console.log('✅ Routes configured');

// Start server
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function() {
    console.log('\n🎉 Medical Management System Started Successfully!');
    console.log('🌐 Server running on: http://localhost:' + PORT);
    console.log('📱 Frontend: http://localhost:' + PORT);
    console.log('🔧 Backend API: http://localhost:' + PORT);
    console.log('🏥 Landing Page: http://localhost:' + PORT);
    console.log('🔐 Login Page: http://localhost:' + PORT + '/login');
    console.log('📝 Signup Page: http://localhost:' + PORT + '/signup');
    console.log('\n📊 Database: Supabase PostgreSQL');
    console.log('🔗 Supabase Project: https://lojzhgkzbcblmryyebxb.supabase.co');
    console.log('\n✅ Both Frontend and Backend are running!');
    console.log('💡 Press Ctrl+C to stop the server');
});

// Handle server errors
server.on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
        console.error('❌ Port ' + PORT + ' is already in use!');
        console.log('💡 Try a different port or stop the existing server');
    } else {
        console.error('❌ Server error:', err.message);
    }
});

// Handle graceful shutdown
process.on('SIGINT', function() {
    console.log('\n🛑 Shutting down server...');
    server.close(function() {
        console.log('✅ Server stopped successfully');
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    console.log('\n🛑 Shutting down server...');
    server.close(function() {
        console.log('✅ Server stopped successfully');
        process.exit(0);
    });
});