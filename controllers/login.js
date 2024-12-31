var express = require ('express');
var home = require('./home');
var session = require ('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/supabase_controller');
var  sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');

router.get('/', function(req ,res){
    res.render('auth/login');
});

router.use(session({
    secret: 'secret',
    resave : true ,
    saveUninitialized : true 
}));

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.post('/',[
    check('username').notEmpty().withMessage("Username is required"),
    check('password').notEmpty().withMessage("Password is required")
], function(request , response){
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

    var username = request.body.username;
    var password = request.body.password;

    if (username && password){
        // Use Supabase controller to find user
        db.getuserdetails(username, function(error, results){
            if (error) {
                console.error('Database error:', error);
                response.send('Database connection error. Please try again.');
                return;
            }
            
            if (results && results.password === password) {
                request.session.loggedin = true; 
                request.session.username = username;
                response.cookie('username', username);
                
                var status = results.email_status;
                
                // BYPASS EMAIL VERIFICATION FOR TESTING
                // Comment out these lines to re-enable email verification
                /*
                if (status === "not_verified") {
                    response.send("Please verify your email");
                    return;
                }
                */
                
                // Always redirect to home for testing
                console.log('✅ User logged in:', username, 'Status:', status);
                response.redirect('/home');
                
            } else {
                response.send('Incorrect username / password');
            }
        });
    } else {
        response.send('Please enter username and password');
    }
});

module.exports = router;// Updated: 2026-03-27 08:54:45
