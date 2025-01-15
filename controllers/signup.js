var express = require ('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/supabase_controller');
var nodemailer = require('nodemailer');
var randomToken = require ('random-token');
const { check, validationResult } = require('express-validator');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/',function(req,res){
    res.render('auth/signup');
});

router.post('/',[
    check('username').notEmpty().withMessage("Username is required"),
    check('password').notEmpty().withMessage("Password is required"),
    check('email').notEmpty().isEmail().withMessage('Valid Email required')
], function(req , res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    var email_status = "not_verified";
    var email = req.body.email;
    var username = req.body.username;
    var token = randomToken(8);

    // First, create the user
    db.signup(req.body.username, req.body.email, req.body.password, email_status, function(err, result) {
        if (err) {
            console.error('Signup error:', err);
            res.send('Error creating account. Please try again.');
            return;
        }

        // Then create verification token
        db.verify(req.body.username, email, token, function(err, verifyResult) {
            if (err) {
                console.error('Verification token error:', err);
                res.send('Account created but verification email failed. Please contact support.');
                return;
            }

            // Get user ID for email
            db.getuserid(email, function(err, userResult) {
                if (err || !userResult || userResult.length === 0) {
                    console.error('Get user ID error:', err);
                    res.send('Account created successfully! Please check your email for verification instructions.');
                    return;
                }

                var id = userResult[0].id;
                var output = `
                    <p>Dear ${username}, </p>
                    <p>Thanks for signing up. Your verification id and token is given below:</p>
                   
                    <ul>
                        <li>User ID: ${id}</li>
                        <li>Token: ${token}</li>
                    </ul>
                    <p>Verify Link: <a href="http://localhost:3000/verify">Verify</a></p>
                    
                    <p><strong>This is an automatically generated mail. Please do not reply back.</strong></p>
                    
                    <p>Regards,</p>
                    <p>Hospital Management System</p>
                `;

                // For now, just show success message without email
                // You can configure email later
                res.send(`
                    <h2>Account Created Successfully!</h2>
                    <p>Your verification details:</p>
                    <ul>
                        <li>User ID: ${id}</li>
                        <li>Token: ${token}</li>
                    </ul>
                    <p><a href="/verify">Click here to verify your account</a></p>
                    <p><a href="/login">Go to Login</a></p>
                `);

                // Uncomment below to enable email sending
                /*
                var transporter = nodemailer.createTransporter({
                    service: 'gmail',
                    auth: {
                        user: 'your-email@gmail.com',
                        pass: 'your-app-password'
                    }
                });

                var mailOptions = {
                    from: 'your-email@gmail.com', 
                    to: email, 
                    subject: 'Email Verification',
                    html: output
                };

                transporter.sendMail(mailOptions, function(err, info) {
                    if (err) {
                        console.log('Email error:', err);
                        res.send('Account created successfully! Please check your email for verification instructions.');
                    } else {
                        console.log('Email sent:', info);
                        res.send('Account created successfully! Check your email for verification token.');
                    }
                });
                */
            });
        });
    });
});

module.exports = router;// Updated: 2026-03-27 08:54:45
// Updated: 2026-03-27 08:54:45
